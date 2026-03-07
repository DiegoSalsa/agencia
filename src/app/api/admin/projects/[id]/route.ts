import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { sendEmail } from "@/lib/emailService";
import { generateProjectStatusEmail } from "@/lib/portalEmails";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// ── GET: Get a single project with full details ────────────
export async function GET(request: NextRequest, context: RouteContext) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    const project = await prisma.clientProject.findUnique({
      where: { id },
      include: {
        changes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ ok: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      project: {
        ...project,
        technologies: safeParseJSON(project.technologies, []),
        documents: safeParseJSON(project.documents, []),
      },
    });
  } catch (error) {
    console.error("[Admin Project GET] Error:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ── PATCH: Update a project ────────────────────────────────
export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    // Get current project for comparison
    const current = await prisma.clientProject.findUnique({
      where: { id },
    });

    if (!current) {
      return NextResponse.json({ ok: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    // Build update data
    const updateData: Record<string, unknown> = {};

    if (body.clientFirstName !== undefined) updateData.clientFirstName = body.clientFirstName.trim();
    if (body.clientLastNameP !== undefined) updateData.clientLastNameP = body.clientLastNameP.trim();
    if (body.clientLastNameM !== undefined) updateData.clientLastNameM = body.clientLastNameM?.trim() || null;
    if (body.clientEmail !== undefined) updateData.clientEmail = body.clientEmail.toLowerCase().trim();
    if (body.projectName !== undefined) updateData.projectName = body.projectName.trim();
    if (body.projectUrl !== undefined) updateData.projectUrl = body.projectUrl?.trim() || null;
    if (body.projectType !== undefined) updateData.projectType = body.projectType;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.deliveryDate !== undefined) updateData.deliveryDate = body.deliveryDate || null;
    if (body.technologies !== undefined) updateData.technologies = JSON.stringify(body.technologies);
    if (body.documents !== undefined) updateData.documents = JSON.stringify(body.documents);
    if (body.adminNotes !== undefined) updateData.adminNotes = body.adminNotes?.trim() || null;

    const updated = await prisma.clientProject.update({
      where: { id },
      data: updateData,
    });

    // If status changed, send notification email to client
    if (body.status && body.status !== current.status) {
      const html = generateProjectStatusEmail(
        current.clientFirstName,
        current.projectName,
        body.status
      );
      await sendEmail({
        to: current.clientEmail,
        subject: `Actualización de tu proyecto ${current.projectName}`,
        html,
      });
    }

    return NextResponse.json({
      ok: true,
      project: {
        ...updated,
        technologies: safeParseJSON(updated.technologies, []),
        documents: safeParseJSON(updated.documents, []),
      },
    });
  } catch (error) {
    console.error("[Admin Project PATCH] Error:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ── DELETE: Delete a project ───────────────────────────────
export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    await prisma.clientProject.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: "Proyecto eliminado" });
  } catch (error) {
    console.error("[Admin Project DELETE] Error:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

function safeParseJSON(value: string | null | undefined, fallback: unknown): unknown {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
