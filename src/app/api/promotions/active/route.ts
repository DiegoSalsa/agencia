import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ── GET: Get active promotions (public) ──
// Returns only promotions that are active and within date range
export async function GET() {
    try {
        const now = new Date();

        const promotions = await prisma.promotion.findMany({
            where: {
                isActive: true,
                OR: [
                    { startsAt: null },
                    { startsAt: { lte: now } },
                ],
            },
            orderBy: { createdAt: "desc" },
        });

        // Filter out promotions past their end date
        const activePromos = promotions
            .filter((p: typeof promotions[number]) => !p.endsAt || new Date(p.endsAt) >= now)
            .map((p: typeof promotions[number]) => ({
                id: p.id,
                title: p.title,
                slug: p.slug,
                description: p.description,
                price: p.price,
                originalPrice: p.originalPrice,
                totalSlots: p.totalSlots,
                remainingSlots: p.remainingSlots,
                showBanner: p.showBanner,
                showPopup: p.showPopup,
                showPricingCard: p.showPricingCard,
                bannerText: p.bannerText,
                popupTitle: p.popupTitle,
                popupBody: p.popupBody,
                formType: p.formType,
                fixedSections: safeParseJSON(p.fixedSections, []),
                endsAt: p.endsAt,
            }));

        return NextResponse.json(activePromos, {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error) {
        console.error("[Promotions Active GET]", error);
        return NextResponse.json([]);
    }
}

function safeParseJSON(str: string | null, fallback: unknown) {
    if (!str) return fallback;
    try { return JSON.parse(str); } catch { return fallback; }
}
