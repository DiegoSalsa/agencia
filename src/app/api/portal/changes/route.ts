import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPortalSession } from "@/lib/portalAuth";
import { estimateChangePrice } from "@/lib/changeEstimator";
import {
  generateNewChangeRequestAdminEmail,
  generateChangeRequestConfirmationEmail,
  generateCancellationAdminEmail,
} from "@/lib/portalEmails";
import { sendEmail } from "@/lib/emailService";

// ── POST: Crear solicitud de modificación ──────────────────
export async function POST(request: NextRequest) {
  try {
    const session = getPortalSession(request);
    if (!session) {
      return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const description = (body.description || "").trim();
    const priority = body.priority || "medium";

    if (!description || description.length < 10) {
      return NextResponse.json(
        { ok: false, message: "La descripción debe tener al menos 10 caracteres" },
        { status: 400 }
      );
    }

    if (description.length > 2000) {
      return NextResponse.json(
        { ok: false, message: "La descripción no puede superar los 2000 caracteres" },
        { status: 400 }
      );
    }

    const validPriorities = ["low", "medium", "high", "urgent"];
    if (!validPriorities.includes(priority)) {
      return NextResponse.json(
        { ok: false, message: "Prioridad inválida" },
        { status: 400 }
      );
    }

    // Get the project
    const project = await prisma.clientProject.findUnique({
      where: { id: session.projectId },
    });

    if (!project) {
      return NextResponse.json({ ok: false, message: "Proyecto no encontrado" }, { status: 404 });
    }

    // Estimate price
    const estimatedPrice = estimateChangePrice(description, priority);

    // Create the change request
    const change = await prisma.changeRequest.create({
      data: {
        description,
        priority,
        estimatedPrice,
        projectId: project.id,
      },
    });

    const clientFullName = [project.clientFirstName, project.clientLastNameP, project.clientLastNameM]
      .filter(Boolean)
      .join(" ");

    const priorityLabels: Record<string, string> = {
      low: "Baja",
      medium: "Media",
      high: "Alta",
      urgent: "Urgente",
    };

    // Send email to PuroCode (admin)
    const adminEmail = process.env.EMAIL_FROM;
    if (adminEmail) {
      const adminHtml = generateNewChangeRequestAdminEmail(
        project.projectName,
        clientFullName,
        description,
        priority,
        estimatedPrice
      );
      await sendEmail({
        to: adminEmail,
        subject: `Nueva solicitud de modificación ${project.projectName} Prioridad ${priorityLabels[priority] || priority}`,
        html: adminHtml,
      });
    }

    // Send confirmation email to client
    const clientHtml = generateChangeRequestConfirmationEmail(
      project.clientFirstName,
      project.projectName,
      description,
      estimatedPrice
    );
    await sendEmail({
      to: project.clientEmail,
      subject: "Recibimos tu solicitud de modificación",
      html: clientHtml,
    });

    return NextResponse.json({
      ok: true,
      change: {
        id: change.id,
        description: change.description,
        priority: change.priority,
        status: change.status,
        estimatedPrice: change.estimatedPrice,
        createdAt: change.createdAt,
      },
    });
  } catch (error) {
    console.error("[Portal Changes POST] Error:", error);
    return NextResponse.json({ ok: false, message: "Error interno" }, { status: 500 });
  }
}

// ── DELETE: Cancelar solicitud pendiente ────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const session = getPortalSession(request);
    if (!session) {
      return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const changeId = body.changeId;

    if (!changeId) {
      return NextResponse.json({ ok: false, message: "ID de solicitud requerido" }, { status: 400 });
    }

    // Find the change request and verify it belongs to this project
    const change = await prisma.changeRequest.findUnique({
      where: { id: changeId },
      include: { project: true },
    });

    if (!change || change.projectId !== session.projectId) {
      return NextResponse.json({ ok: false, message: "Solicitud no encontrada" }, { status: 404 });
    }

    if (change.status !== "pending") {
      return NextResponse.json(
        { ok: false, message: "Solo se pueden cancelar solicitudes pendientes" },
        { status: 400 }
      );
    }

    // Update status to cancelled
    await prisma.changeRequest.update({
      where: { id: changeId },
      data: { status: "cancelled" },
    });

    // Notify PuroCode
    const adminEmail = process.env.EMAIL_FROM;
    if (adminEmail) {
      const clientFullName = [change.project.clientFirstName, change.project.clientLastNameP, change.project.clientLastNameM]
        .filter(Boolean)
        .join(" ");

      const adminHtml = generateCancellationAdminEmail(
        change.project.projectName,
        clientFullName,
        change.description
      );
      await sendEmail({
        to: adminEmail,
        subject: `Solicitud cancelada ${change.project.projectName}`,
        html: adminHtml,
      });
    }

    return NextResponse.json({ ok: true, message: "Solicitud cancelada" });
  } catch (error) {
    console.error("[Portal Changes DELETE] Error:", error);
    return NextResponse.json({ ok: false, message: "Error interno" }, { status: 500 });
  }
}
