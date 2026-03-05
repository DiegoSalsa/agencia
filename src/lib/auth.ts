import { createHmac, randomBytes } from "crypto";
import bcrypt from "bcryptjs";

// ── Secret for signing tokens ──
function getSecret(): string {
    return process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "fallback-secret-change-me";
}

// ── Token payload ──
interface TokenPayload {
    role: "admin";
    iat: number;
    exp: number;
    jti: string;
}

// ── Sign a token (HMAC-SHA256, 24h expiry) ──
export function signToken(expiresInHours: number = 24): string {
    const payload: TokenPayload = {
        role: "admin",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expiresInHours * 3600,
        jti: randomBytes(16).toString("hex"),
    };

    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = createHmac("sha256", getSecret())
        .update(`${header}.${body}`)
        .digest("base64url");

    return `${header}.${body}.${signature}`;
}

// ── Verify a token ──
export function verifyToken(token: string): TokenPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const [header, body, signature] = parts;

        const expectedSig = createHmac("sha256", getSecret())
            .update(`${header}.${body}`)
            .digest("base64url");

        if (signature !== expectedSig) return null;

        const payload: TokenPayload = JSON.parse(
            Buffer.from(body, "base64url").toString("utf8")
        );

        if (payload.exp < Math.floor(Date.now() / 1000)) return null;
        if (payload.role !== "admin") return null;

        return payload;
    } catch {
        return null;
    }
}

// ── Verify admin password (supports bcrypt hash or plaintext) ──
export async function verifyPassword(input: string): Promise<boolean> {
    const stored = process.env.ADMIN_PASSWORD;
    if (!stored) return false;

    // If stored password is a bcrypt hash
    if (stored.startsWith("$2")) {
        return bcrypt.compare(input, stored);
    }

    // Plaintext comparison (dev convenience)
    return input === stored;
}

// ── Check admin auth from request headers ──
export function requireAdmin(request: Request): boolean {
    const authHeader = request.headers.get("x-admin-token");
    if (!authHeader) return false;
    return verifyToken(authHeader) !== null;
}
