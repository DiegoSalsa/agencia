import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const prisma = getPrisma();

    const [newBriefings, pendingChanges, expiringPromos] = await Promise.all([
      // Briefings with status "nuevo"
      prisma.briefing.count({ where: { status: "nuevo" } }),

      // Change requests with status "pending"
      prisma.changeRequest.count({ where: { status: "pending" } }),

      // Active promotions expiring within 7 days
      prisma.promotion.count({
        where: {
          isActive: true,
          endsAt: {
            not: null,
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            gte: new Date(),
          },
        },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      data: { newBriefings, pendingChanges, expiringPromos },
    });
  } catch (error) {
    console.error("[Admin Notifications GET]", error);
    return NextResponse.json(
      { error: "Error al obtener notificaciones" },
      { status: 500 }
    );
  }
}
