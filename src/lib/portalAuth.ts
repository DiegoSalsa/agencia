import { createHmac, randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// ── Types ──────────────────────────────────────────────────
export interface PortalTokenPayload {
  projectId: string;
  email: string;
  iat: number;
  exp: number;
  jti: string;
}

// ── Secret ─────────────────────────────────────────────────
function getPortalSecret(): string {
  const secret = process.env.PORTAL_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("PORTAL_JWT_SECRET must be set and be at least 32 characters");
  }
  return secret;
}

// ── Sign a portal JWT (7 days) ─────────────────────────────
export function signPortalToken(projectId: string, email: string): string {
  const payload: PortalTokenPayload = {
    projectId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600, // 7 days
    jti: randomBytes(16).toString("hex"),
  };

  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getPortalSecret())
    .update(`${header}.${body}`)
    .digest("base64url");

  return `${header}.${body}.${signature}`;
}

// ── Verify a portal JWT ────────────────────────────────────
export function verifyPortalToken(token: string): PortalTokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;

    const expectedSig = createHmac("sha256", getPortalSecret())
      .update(`${header}.${body}`)
      .digest("base64url");

    if (signature !== expectedSig) return null;

    const payload: PortalTokenPayload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!payload.projectId || !payload.email) return null;

    return payload;
  } catch {
    return null;
  }
}

// ── Cookie Management ──────────────────────────────────────

const COOKIE_NAME = "portal_session";
const COOKIE_MAX_AGE = 7 * 24 * 3600; // 7 days in seconds

/**
 * Set the portal session cookie on a response.
 */
export function setPortalCookie(response: NextResponse, jwt: string): NextResponse {
  response.cookies.set(COOKIE_NAME, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return response;
}

/**
 * Clear the portal session cookie.
 */
export function clearPortalCookie(response: NextResponse): NextResponse {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

/**
 * Get the portal session from the request cookie.
 * Returns the payload if valid, null otherwise.
 */
export function getPortalSession(request: NextRequest): PortalTokenPayload | null {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifyPortalToken(cookie.value);
}

/**
 * Get the portal session from the cookies() async helper (for Server Components).
 */
export async function getPortalSessionFromCookies(): Promise<PortalTokenPayload | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifyPortalToken(cookie.value);
}

// ── Magic Token ────────────────────────────────────────────

/**
 * Generate a magic link token (UUID).
 */
export function generateMagicToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Get magic token expiration (30 minutes from now).
 */
export function getMagicTokenExpiry(): Date {
  return new Date(Date.now() + 30 * 60 * 1000);
}
