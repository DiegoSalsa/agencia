import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { PRICE_MAP } from "@/lib/admin/constants";

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const prisma = getPrisma();

    // Fetch all briefings for calculations
    const briefings: { id: string; type: string; status: string; createdAt: Date }[] = await prisma.briefing.findMany({
      select: {
        id: true,
        type: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();

    /* ── Totals ── */
    const total = briefings.length;
    const nuevo = briefings.filter((b) => b.status === "nuevo").length;
    const enProgreso = briefings.filter((b) => b.status === "en_progreso").length;
    const completado = briefings.filter((b) => b.status === "completado").length;

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = briefings.filter((b) => new Date(b.createdAt) >= weekAgo).length;

    const estimatedRevenue = briefings.reduce(
      (sum, b) => sum + (PRICE_MAP[b.type] || 0),
      0
    );

    /* ── Weekly briefings (last 8 weeks) ── */
    const weeklyBriefings: {
      week: string;
      landing: number;
      corporativa: number;
      ecommerce: number;
      oferta: number;
      total: number;
    }[] = [];

    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      const weekEnd = new Date(now);
      weekEnd.setDate(weekEnd.getDate() - i * 7);

      const weekBriefings = briefings.filter((b) => {
        const d = new Date(b.createdAt);
        return d >= weekStart && d < weekEnd;
      });

      const weekLabel = weekStart.toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
      });

      weeklyBriefings.push({
        week: weekLabel,
        landing: weekBriefings.filter((b) => b.type === "LANDING").length,
        corporativa: weekBriefings.filter((b) => b.type === "WEB_CORPORATIVA")
          .length,
        ecommerce: weekBriefings.filter((b) => b.type === "ECOMMERCE").length,
        oferta: weekBriefings.filter((b) => b.type === "OFERTA").length,
        total: weekBriefings.length,
      });
    }

    /* ── Monthly revenue (last 6 months) ── */
    const monthlyRevenue: { month: string; revenue: number; count: number }[] =
      [];

    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const monthBriefings = briefings.filter((b) => {
        const d = new Date(b.createdAt);
        return d >= monthStart && d <= monthEnd;
      });

      const monthLabel = monthStart.toLocaleDateString("es-CL", {
        month: "short",
        year:
          monthStart.getFullYear() !== now.getFullYear()
            ? "numeric"
            : undefined,
      });

      monthlyRevenue.push({
        month: monthLabel,
        revenue: monthBriefings.reduce(
          (sum, b) => sum + (PRICE_MAP[b.type] || 0),
          0
        ),
        count: monthBriefings.length,
      });
    }

    /* ── Type distribution ── */
    const typeCounts: Record<string, number> = {};
    for (const b of briefings) {
      typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
    }
    const typeDistribution = Object.entries(typeCounts).map(
      ([type, count]) => ({
        type,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      })
    );

    /* ── Recent activity (last 5 briefings) ── */
    const recentBriefings = await prisma.briefing.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        clientName: true,
        clientEmail: true,
        type: true,
        status: true,
        createdAt: true,
      },
    });

    /* ── Active projects count ── */
    const activeProjects = await prisma.clientProject.count({
      where: { status: "development" },
    });

    /* ── Active promotions ── */
    const activePromos = await prisma.promotion.count({
      where: { isActive: true },
    });

    return NextResponse.json({
      ok: true,
      data: {
        weeklyBriefings,
        monthlyRevenue,
        typeDistribution,
        totals: {
          briefings: total,
          nuevo,
          enProgreso,
          completado,
          thisWeek,
          estimatedRevenue,
          activeProjects,
          activePromos,
        },
        recentBriefings,
      },
    });
  } catch (error) {
    console.error("[Admin Stats GET]", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    );
  }
}
