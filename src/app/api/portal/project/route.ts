import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPortalSession } from "@/lib/portalAuth";

export async function GET(request: NextRequest) {
  try {
    const session = getPortalSession(request);
    if (!session) {
      return NextResponse.json({ ok: false, message: "No autorizado" }, { status: 401 });
    }

    const project = await prisma.clientProject.findUnique({
      where: { id: session.projectId },
      include: {
        changes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ ok: false, message: "Proyecto no encontrado" }, { status: 404 });
    }

    // Parse JSON fields for the response
    const technologies = safeParseJSON(project.technologies, []);
    const documents = safeParseJSON(project.documents, []);

    return NextResponse.json({
      ok: true,
      project: {
        id: project.id,
        clientFirstName: project.clientFirstName,
        clientLastNameP: project.clientLastNameP,
        clientLastNameM: project.clientLastNameM,
        clientEmail: project.clientEmail,
        projectName: project.projectName,
        projectUrl: project.projectUrl,
        projectType: project.projectType,
        status: project.status,
        deliveryDate: project.deliveryDate,
        technologies,
        documents,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        changes: project.changes.map((c: typeof project.changes[number]) => ({
          id: c.id,
          description: c.description,
          priority: c.priority,
          status: c.status,
          price: c.price,
          estimatedPrice: c.estimatedPrice,
          completionDate: c.completionDate,
          clientNotes: c.clientNotes,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        })),
      },
    });
  } catch (error) {
    console.error("[Portal Project] Error:", error);
    return NextResponse.json({ ok: false, message: "Error interno" }, { status: 500 });
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
