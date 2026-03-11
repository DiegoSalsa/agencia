import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ── GET: List all client projects ──────────────────────────
export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const projects = await prisma.clientProject.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        changes: {
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { changes: true },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      data: projects.map((p: typeof projects[number]) => ({
        ...p,
        technologies: safeParseJSON(p.technologies, []),
        documents: safeParseJSON(p.documents, []),
        pendingChanges: p.changes.filter((c: { status: string }) => c.status === "pending").length,
      })),
    });
  } catch (error) {
    console.error("[Admin Projects GET] Error:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ── POST: Create a new client project ──────────────────────
export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      clientFirstName,
      clientLastNameP,
      clientLastNameM,
      clientEmail,
      projectName,
      projectUrl,
      projectType,
      status,
      deliveryDate,
      technologies,
      adminNotes,
    } = body;

    // Basic validation
    if (!clientFirstName || !clientLastNameP || !clientEmail || !projectName || !projectType) {
      return NextResponse.json(
        { ok: false, error: "Campos obligatorios: nombre, apellido paterno, email, nombre proyecto, tipo" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await prisma.clientProject.findUnique({
      where: { clientEmail: clientEmail.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { ok: false, error: "Ya existe un proyecto con ese email" },
        { status: 409 }
      );
    }

    const project = await prisma.clientProject.create({
      data: {
        clientFirstName: clientFirstName.trim(),
        clientLastNameP: clientLastNameP.trim(),
        clientLastNameM: clientLastNameM?.trim() || null,
        clientEmail: clientEmail.toLowerCase().trim(),
        projectName: projectName.trim(),
        projectUrl: projectUrl?.trim() || null,
        projectType,
        status: status || "development",
        deliveryDate: deliveryDate || null,
        technologies: JSON.stringify(technologies || []),
        adminNotes: adminNotes?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (error) {
    console.error("[Admin Projects POST] Error:", error);
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
