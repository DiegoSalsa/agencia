import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { sendEmail } from "@/lib/emailService";
import { generateChangeStatusEmail } from "@/lib/portalEmails";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// ── PATCH: Update a change request (status, price, notes) ──
export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id: projectId } = await context.params;
    const body = await request.json();
    const { changeId, status, price, adminNotes, clientNotes, completionDate } = body;

    if (!changeId) {
      return NextResponse.json({ ok: false, error: "changeId requerido" }, { status: 400 });
    }

    // Verify the change belongs to this project
    const change = await prisma.changeRequest.findUnique({
      where: { id: changeId },
      include: { project: true },
    });

    if (!change || change.projectId !== projectId) {
      return NextResponse.json({ ok: false, error: "Solicitud no encontrada" }, { status: 404 });
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (status !== undefined) updateData.status = status;
    if (price !== undefined) updateData.price = price;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes || null;
    if (clientNotes !== undefined) updateData.clientNotes = clientNotes || null;
    if (completionDate !== undefined) updateData.completionDate = completionDate || null;

    const updated = await prisma.changeRequest.update({
      where: { id: changeId },
      data: updateData,
    });

    // If status changed, send notification to client
    if (status && status !== change.status) {
      const html = generateChangeStatusEmail(
        change.project.clientFirstName,
        change.project.projectName,
        status,
        clientNotes || null
      );
      await sendEmail({
        to: change.project.clientEmail,
        subject: `Tu solicitud fue ${getStatusVerb(status)} ${change.project.projectName}`,
        html,
      });
    }

    return NextResponse.json({ ok: true, change: updated });
  } catch (error) {
    console.error("[Admin Changes PATCH] Error:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

function getStatusVerb(status: string): string {
  const verbs: Record<string, string> = {
    accepted: "aceptada",
    in_progress: "puesta en progreso",
    completed: "completada",
    cancelled: "cancelada",
  };
  return verbs[status] || "actualizada";
}
