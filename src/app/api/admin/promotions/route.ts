import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ── GET: List all promotions ──
export async function GET(request: NextRequest) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const promotions = await prisma.promotion.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { codes: true } },
            },
        });

        return NextResponse.json({
            ok: true,
            data: promotions.map((p) => ({
                ...p,
                fixedSections: safeParseJSON(p.fixedSections, []),
                codesCount: p._count.codes,
            })),
        });
    } catch (error) {
        console.error("[Admin Promotions GET]", error);
        return NextResponse.json({ error: "Error al obtener promociones" }, { status: 500 });
    }
}

// ── POST: Create a new promotion ──
export async function POST(request: NextRequest) {
    if (!requireAdmin(request)) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const {
            title, slug, description,
            price, originalPrice,
            totalSlots, remainingSlots,
            isActive, showBanner, showPopup, showPricingCard,
            bannerText, popupTitle, popupBody,
            formType, fixedSections,
            startsAt, endsAt,
        } = body;

        if (!title || !slug || !price || !originalPrice) {
            return NextResponse.json(
                { error: "title, slug, price y originalPrice son obligatorios" },
                { status: 400 }
            );
        }

        // Check slug uniqueness
        const existing = await prisma.promotion.findUnique({ where: { slug } });
        if (existing) {
            return NextResponse.json(
                { error: "Ya existe una promoción con ese slug" },
                { status: 409 }
            );
        }

        const promotion = await prisma.promotion.create({
            data: {
                title,
                slug,
                description: description || null,
                price: Number(price),
                originalPrice: Number(originalPrice),
                totalSlots: totalSlots ? Number(totalSlots) : 10,
                remainingSlots: remainingSlots ? Number(remainingSlots) : 6,
                isActive: isActive ?? true,
                showBanner: showBanner ?? true,
                showPopup: showPopup ?? true,
                showPricingCard: showPricingCard ?? true,
                bannerText: bannerText || null,
                popupTitle: popupTitle || null,
                popupBody: popupBody || null,
                formType: formType || "LANDING",
                fixedSections: fixedSections
                    ? JSON.stringify(fixedSections)
                    : JSON.stringify(["hero", "servicios", "portafolio", "faq", "contacto"]),
                startsAt: startsAt ? new Date(startsAt) : null,
                endsAt: endsAt ? new Date(endsAt) : null,
            },
        });

        return NextResponse.json({ ok: true, data: promotion }, { status: 201 });
    } catch (error) {
        console.error("[Admin Promotions POST]", error);
        return NextResponse.json({ error: "Error al crear promoción" }, { status: 500 });
    }
}

function safeParseJSON(str: string | null, fallback: unknown) {
    if (!str) return fallback;
    try { return JSON.parse(str); } catch { return fallback; }
}
