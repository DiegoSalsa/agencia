import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ── GET: Get single promotion ──
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const promotion = await prisma.promotion.findUnique({
            where: { id },
            include: { codes: { orderBy: { createdAt: "desc" } } },
        });

        if (!promotion) {
            return NextResponse.json({ error: "Promoción no encontrada" }, { status: 404 });
        }

        return NextResponse.json({
            ok: true,
            data: {
                ...promotion,
                fixedSections: safeParseJSON(promotion.fixedSections, []),
            },
        });
    } catch (error) {
        console.error("[Admin Promotions GET/:id]", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

// ── PATCH: Update promotion ──
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await request.json();
        const updateData: Record<string, unknown> = {};

        // Only update fields that are provided
        const stringFields = [
            "title", "slug", "description",
            "bannerText", "popupTitle", "popupBody", "formType",
        ];
        const numFields = ["price", "originalPrice", "totalSlots", "remainingSlots"];
        const boolFields = ["isActive", "showBanner", "showPopup", "showPricingCard"];

        for (const f of stringFields) {
            if (body[f] !== undefined) updateData[f] = body[f];
        }
        for (const f of numFields) {
            if (body[f] !== undefined) updateData[f] = Number(body[f]);
        }
        for (const f of boolFields) {
            if (body[f] !== undefined) updateData[f] = Boolean(body[f]);
        }

        if (body.fixedSections !== undefined) {
            updateData.fixedSections = JSON.stringify(body.fixedSections);
        }
        if (body.startsAt !== undefined) {
            updateData.startsAt = body.startsAt ? new Date(body.startsAt) : null;
        }
        if (body.endsAt !== undefined) {
            updateData.endsAt = body.endsAt ? new Date(body.endsAt) : null;
        }

        const promotion = await prisma.promotion.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ ok: true, data: promotion });
    } catch (error) {
        console.error("[Admin Promotions PATCH]", error);
        return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
}

// ── DELETE: Delete promotion ──
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    try {
        await prisma.promotion.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[Admin Promotions DELETE]", error);
        return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    }
}

function safeParseJSON(str: string | null, fallback: unknown) {
    if (!str) return fallback;
    try { return JSON.parse(str); } catch { return fallback; }
}
