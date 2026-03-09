import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ── Simple rate limiter for code validation ──
const codeAttempts = new Map<string, { count: number; resetAt: number }>();
function checkCodeRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = codeAttempts.get(ip);
    if (!entry || now > entry.resetAt) {
        codeAttempts.set(ip, { count: 1, resetAt: now + 60_000 });
        return true;
    }
    entry.count++;
    return entry.count <= 5;
}

// ── POST: Validate a discount code (public) ──
export async function POST(request: NextRequest) {
    try {
        // Rate limit: 5 attempts per minute per IP
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
        if (!checkCodeRateLimit(ip)) {
            return NextResponse.json(
                { ok: false, error: "Demasiados intentos. Espera un momento." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { code, promotionId } = body;

        if (!code) {
            return NextResponse.json(
                { ok: false, error: "Ingresa un código de descuento" },
                { status: 400 }
            );
        }

        const normalizedCode = code.toUpperCase().replace(/\s+/g, "");

        const discountCode = await prisma.discountCode.findUnique({
            where: { code: normalizedCode },
        });

        if (!discountCode) {
            return NextResponse.json(
                { ok: false, error: "Código no válido" },
                { status: 404 }
            );
        }

        if (!discountCode.isActive) {
            return NextResponse.json(
                { ok: false, error: "Este código ha expirado" },
                { status: 410 }
            );
        }

        if (discountCode.maxUses > 0 && discountCode.usedCount >= discountCode.maxUses) {
            return NextResponse.json(
                { ok: false, error: "Este código ya alcanzó su límite de usos" },
                { status: 410 }
            );
        }

        // If code is tied to a specific promotion, validate it matches
        if (discountCode.promotionId && promotionId && discountCode.promotionId !== promotionId) {
            return NextResponse.json(
                { ok: false, error: "Este código no aplica a esta oferta" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            type: discountCode.type,
            value: discountCode.value,
            label: discountCode.type === "percent"
                ? `-${discountCode.value}%`
                : `-$${discountCode.value.toLocaleString("es-CL")} CLP`,
        });
    } catch (error) {
        console.error("[Validate Code POST]", error);
        return NextResponse.json(
            { ok: false, error: "Error al validar código" },
            { status: 500 }
        );
    }
}
