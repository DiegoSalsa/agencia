import { NextRequest, NextResponse } from "next/server";
import { sendEmail, checkRateLimit, isValidEmail } from "@/lib/emailService";

function sanitize(str: string, maxLen = 1000): string {
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/\0/g, "")
    .trim()
    .slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: "Demasiadas solicitudes. Intenta en un minuto." },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Error al leer los datos." },
        { status: 400 }
      );
    }

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(body.name || "", 200);
    const email = sanitize(body.email || "", 320);
    const message = sanitize(body.message || "", 2000);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, message: "El nombre es obligatorio." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Email inválido." },
        { status: 400 }
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { ok: false, message: "El mensaje debe tener al menos 10 caracteres." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #6d28d9, #4c1d95); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">📬 Nuevo mensaje de contacto</h1>
        </div>
        <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 12px;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin: 0 0 12px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 0 0 8px;"><strong>Mensaje:</strong></p>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-wrap;">${message}</div>
        </div>
      </div>
    `;

    await sendEmail({
      to: "contactopurocode@gmail.com",
      subject: `[PuroCode Contacto] Mensaje de ${name}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno. Intenta más tarde." },
      { status: 500 }
    );
  }
}
