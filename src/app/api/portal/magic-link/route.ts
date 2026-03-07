import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateMagicToken, getMagicTokenExpiry } from "@/lib/portalAuth";
import { generateMagicLinkEmail } from "@/lib/portalEmails";
import { sendEmail, checkRateLimit, isValidEmail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: true, message: "Si tu email está registrado, recibirás un enlace de acceso." },
        { status: 200 }
      );
    }

    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Email inválido" },
        { status: 400 }
      );
    }

    // Always respond the same way (security: don't reveal if email exists)
    const genericResponse = NextResponse.json({
      ok: true,
      message: "Si tu email está registrado, recibirás un enlace de acceso.",
    });

    // Look up the client project
    const project = await prisma.clientProject.findUnique({
      where: { clientEmail: email },
    });

    if (!project) {
      // Don't reveal that the email doesn't exist
      return genericResponse;
    }

    // Generate magic token
    const token = generateMagicToken();
    const expiresAt = getMagicTokenExpiry();

    await prisma.magicToken.create({
      data: {
        token,
        expiresAt,
        projectId: project.id,
      },
    });

    // Build magic link URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const magicLinkUrl = `${baseUrl}/mi-sitio?token=${token}`;

    // Send email
    const html = generateMagicLinkEmail(project.clientFirstName, magicLinkUrl);
    await sendEmail({
      to: project.clientEmail,
      subject: "Tu enlace de acceso a PuroCode",
      html,
    });

    return genericResponse;
  } catch (error) {
    console.error("[Portal Magic Link] Error:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
