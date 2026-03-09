import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ── GET: List all discount codes ──
export async function GET(request: NextRequest) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const codes = await prisma.discountCode.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                promotion: { select: { id: true, title: true, slug: true } },
            },
        });

        return NextResponse.json({ ok: true, data: codes });
    } catch (error) {
        console.error("[Admin Codes GET]", error);
        return NextResponse.json({ error: "Error al obtener códigos" }, { status: 500 });
    }
}

// ── POST: Create a new discount code ──
export async function POST(request: NextRequest) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { code, type, value, maxUses, isActive, promotionId } = body;

        if (!code || !value) {
            return NextResponse.json(
                { error: "code y value son obligatorios" },
                { status: 400 }
            );
        }

        // Normalize code to uppercase, no spaces
        const normalizedCode = code.toUpperCase().replace(/\s+/g, "");

        // Check uniqueness
        const existing = await prisma.discountCode.findUnique({
            where: { code: normalizedCode },
        });
        if (existing) {
            return NextResponse.json(
                { error: "Ya existe un código con ese nombre" },
                { status: 409 }
            );
        }

        // Validate type
        const validTypes = ["percent", "fixed"];
        const codeType = type || "percent";
        if (!validTypes.includes(codeType)) {
            return NextResponse.json(
                { error: "Tipo inválido. Usa 'percent' o 'fixed'" },
                { status: 400 }
            );
        }

        // Validate percent range
        if (codeType === "percent" && (Number(value) < 1 || Number(value) > 100)) {
            return NextResponse.json(
                { error: "Porcentaje debe estar entre 1 y 100" },
                { status: 400 }
            );
        }

        const discountCode = await prisma.discountCode.create({
            data: {
                code: normalizedCode,
                type: codeType,
                value: Number(value),
                maxUses: maxUses ? Number(maxUses) : 0,
                isActive: isActive ?? true,
                promotionId: promotionId || null,
            },
        });

        return NextResponse.json({ ok: true, data: discountCode }, { status: 201 });
    } catch (error) {
        console.error("[Admin Codes POST]", error);
        return NextResponse.json({ error: "Error al crear código" }, { status: 500 });
    }
}
