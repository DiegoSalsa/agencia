import nodemailer from "nodemailer";
import { Resend } from "resend";

// ── Types ──────────────────────────────────────────────────
interface EmailAttachment {
    filename: string;
    content: Buffer;
    contentType: string;
}

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    attachments?: EmailAttachment[];
}

interface SendEmailResult {
    success: boolean;
    provider: "resend" | "gmail-oauth2" | "sendgrid" | "gmail-apppass" | "none";
    error?: string;
}

// ── Rate Limiting (in-memory, per-IP) ─────────────────────
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

/**
 * Returns true if the request is within rate limits, false if throttled.
 */
export function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return true;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return false;
    }

    entry.count++;
    return true;
}

// ── Validation Helpers ────────────────────────────────────

/**
 * Strict email validation (RFC 5322 simplified).
 */
export function isValidEmail(email: string): boolean {
    if (!email || email.length > 254) return false;
    const re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(email);
}

/**
 * Sanitize email subject to prevent header injection.
 * Strips CR/LF and limits length.
 */
export function sanitizeSubject(subject: string): string {
    return subject.replace(/[\r\n\t]/g, "").slice(0, 200);
}

// ── Transporter Factories ─────────────────────────────────

/**
 * Check if a value looks like a real credential (not a placeholder).
 */
function isRealCredential(val: string | undefined): boolean {
    if (!val) return false;
    const placeholders = ["...", "your_", "xxx", "placeholder", "CHANGE_ME", "TODO"];
    const lower = val.toLowerCase();
    return !placeholders.some((p) => lower.includes(p.toLowerCase()));
}

/**
 * Gmail OAuth2 transporter — uses refresh token to auto-generate access tokens.
 * Requires: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, EMAIL_FROM.
 */
function createGmailOAuth2(): nodemailer.Transporter | null {
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const user = process.env.EMAIL_FROM;

    // Skip if any credential is missing or still placeholder
    if (!isRealCredential(clientId) || !isRealCredential(clientSecret) || !isRealCredential(refreshToken) || !user) {
        console.log("[EmailService] Gmail OAuth2: skipped (credentials not configured)");
        return null;
    }

    console.log("[EmailService] Gmail OAuth2: attempting...");
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user,
            clientId,
            clientSecret,
            refreshToken,
        },
    });
}

/**
 * Gmail App Password transporter (legacy fallback).
 * Less secure than OAuth2 but works immediately with existing setup.
 * Requires: EMAIL_USER, EMAIL_PASS.
 */
function createGmailAppPass(): nodemailer.Transporter | null {
    const user = process.env.EMAIL_USER;
    const rawPass = process.env.EMAIL_PASS;

    // Strip spaces — Google shows App Passwords as "xxxx xxxx xxxx xxxx" but they work without spaces
    const pass = rawPass?.replace(/\s+/g, "") || "";

    if (!user || !pass || !isRealCredential(pass)) {
        console.log(`[EmailService] Gmail App Password: skipped (USER=${user ? "SET" : "MISSING"}, PASS=${rawPass ? "SET" : "MISSING"})`);
        return null;
    }

    console.log(`[EmailService] Gmail App Password: attempting with user=${user}, passLength=${pass.length}`);
    const smtpHost = process.env.SMTP_HOST || ["smtp", "gmail", "com"].join(".");
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    return nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user, pass },
        tls: {
            rejectUnauthorized: false,
        },
    });
}

/**
 * SendGrid SMTP fallback transporter.
 * Requires: SENDGRID_API_KEY, EMAIL_FROM.
 */
function createSendGrid(): nodemailer.Transporter | null {
    const apiKey = process.env.SENDGRID_API_KEY;
    const user = process.env.EMAIL_FROM;

    if (!apiKey || !user || !isRealCredential(apiKey)) {
        console.log("[EmailService] SendGrid: skipped (not configured)");
        return null;
    }

    console.log("[EmailService] SendGrid: attempting...");
    const sgHost = process.env.SENDGRID_SMTP_HOST || ["smtp", "sendgrid", "net"].join(".");
    return nodemailer.createTransport({
        host: sgHost,
        port: 587,
        secure: false,
        auth: {
            user: "apikey",
            pass: apiKey,
        },
    });
}

// ── Main Send Function ────────────────────────────────────

/**
 * Send email via Resend (preferred), then Gmail App Password, Gmail OAuth2, SendGrid.
 * Never exposes credentials in error messages.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const emailFrom = process.env.EMAIL_FROM;

    console.log(`[EmailService] sendEmail called: to=${options.to}, subject="${options.subject}", attachments=${options.attachments?.length || 0}`);

    if (!emailFrom) {
        console.warn("[EmailService] EMAIL_FROM not configured — skipping.");
        return { success: false, provider: "none", error: "EMAIL_FROM not configured" };
    }

    if (!isValidEmail(options.to)) {
        console.warn(`[EmailService] Invalid recipient email: "${options.to}"`);
        return { success: false, provider: "none", error: "Invalid recipient email" };
    }

    // ── Attempt 1: Resend (BEST for Vercel) ──
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && isRealCredential(resendKey)) {
        try {
            console.log("[EmailService] Resend: attempting...");
            const resend = new Resend(resendKey);

            // Resend uses "from" with their domain for free tier, or verified domain
            const resendFrom = process.env.RESEND_FROM || "Briefing System <onboarding@resend.dev>";

            const resendAttachments = options.attachments?.map((a) => ({
                filename: a.filename,
                content: a.content,
            }));

            const { error } = await resend.emails.send({
                from: resendFrom,
                to: [options.to],
                subject: sanitizeSubject(options.subject),
                html: options.html,
                attachments: resendAttachments,
            });

            if (error) {
                console.error(`[EmailService] Resend API error: ${error.message}`);
                // Fall through to next provider
            } else {
                console.log(`[EmailService] ✓ Sent to ${options.to} via Resend`);
                return { success: true, provider: "resend" };
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            console.error(`[EmailService] Resend failed: ${msg}`);
        }
    } else {
        console.log("[EmailService] Resend: skipped (RESEND_API_KEY not configured)");
    }

    // Use EMAIL_USER as sender if available (some SMTP providers require sender = auth user)
    const senderEmail = process.env.EMAIL_USER || emailFrom;

    const mailOptions = {
        from: `"Briefing System" <${senderEmail}>`,
        to: options.to,
        subject: sanitizeSubject(options.subject),
        html: options.html,
        attachments: options.attachments?.map((a) => ({
            filename: a.filename,
            content: a.content,
            contentType: a.contentType,
        })),
    };

    // ── Attempt 2: Gmail App Password (most common setup) ──
    const gmailLegacy = createGmailAppPass();
    if (gmailLegacy) {
        try {
            await gmailLegacy.sendMail(mailOptions);
            console.log(`[EmailService] ✓ Sent to ${options.to} via Gmail App Password`);
            return { success: true, provider: "gmail-apppass" };
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            console.error(`[EmailService] Gmail App Password failed: ${msg}`);
            if (err instanceof Error && 'code' in err) {
                console.error(`[EmailService] Gmail error code: ${(err as NodeJS.ErrnoException).code}`);
            }
        }
    }

    // ── Attempt 3: Gmail OAuth2 ──
    const gmail = createGmailOAuth2();
    if (gmail) {
        try {
            await gmail.sendMail(mailOptions);
            console.log(`[EmailService] ✓ Sent to ${options.to} via Gmail OAuth2`);
            return { success: true, provider: "gmail-oauth2" };
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            console.error(`[EmailService] Gmail OAuth2 failed: ${msg}`);
        }
    }

    // ── Attempt 4: SendGrid fallback ──
    const sg = createSendGrid();
    if (sg) {
        try {
            await sg.sendMail(mailOptions);
            console.log(`[EmailService] ✓ Sent to ${options.to} via SendGrid fallback`);
            return { success: true, provider: "sendgrid" };
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            console.error(`[EmailService] SendGrid failed: ${msg}`);
        }
    }

    // ── All failed or none configured ──
    console.warn("[EmailService] No email provider available or all providers failed.");
    return { success: false, provider: "none", error: "All email providers failed" };
}
