import { NextRequest, NextResponse } from "next/server";
import { checkDomainAvailability } from "@/lib/domainChecker";

// Simple rate limiter for domain checks
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // 10 checks per minute per IP
const RATE_WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
        return true;
    }
    if (entry.count >= RATE_LIMIT) return false;
    entry.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limit
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { ok: false, message: "Demasiadas consultas. Espera un momento." },
                { status: 429 }
            );
        }

        // Parse body
        const body = await request.json();
        const { name } = body;

        if (!name || typeof name !== "string" || name.length < 2 || name.length > 63) {
            return NextResponse.json(
                { ok: false, message: "Nombre de dominio inválido." },
                { status: 400 }
            );
        }

        // Check API keys
        const apiKey = process.env.PORKBUN_API_KEY;
        const secretKey = process.env.PORKBUN_SECRET_KEY;

        if (!apiKey || !secretKey) {
            return NextResponse.json(
                { ok: false, message: "Servicio de verificación de dominios no configurado." },
                { status: 503 }
            );
        }

        const priceThreshold = parseFloat(process.env.DOMAIN_PRICE_THRESHOLD || "15");

        const results = await checkDomainAvailability(name, apiKey, secretKey, priceThreshold);

        return NextResponse.json({ ok: true, results });
    } catch (error) {
        console.error("[DomainCheck] Error:", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { ok: false, message: "Error al verificar dominios." },
            { status: 500 }
        );
    }
}
