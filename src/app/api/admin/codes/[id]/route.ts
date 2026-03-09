import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ── PATCH: Update discount code ──
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

        if (body.code !== undefined) updateData.code = body.code.toUpperCase().replace(/\s+/g, "");
        if (body.type !== undefined) updateData.type = body.type;
        if (body.value !== undefined) updateData.value = Number(body.value);
        if (body.maxUses !== undefined) updateData.maxUses = Number(body.maxUses);
        if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
        if (body.promotionId !== undefined) updateData.promotionId = body.promotionId || null;

        const code = await prisma.discountCode.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ ok: true, data: code });
    } catch (error) {
        console.error("[Admin Codes PATCH]", error);
        return NextResponse.json({ error: "Error al actualizar código" }, { status: 500 });
    }
}

// ── DELETE: Delete discount code ──
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    try {
        await prisma.discountCode.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("[Admin Codes DELETE]", error);
        return NextResponse.json({ error: "Error al eliminar código" }, { status: 500 });
    }
}
