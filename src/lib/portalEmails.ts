// ── Templates de email para el Portal de Clientes ──────────
// Todos los emails del portal usan el mismo estilo visual minimalista.

import { PRIORITY_LABELS, CHANGE_STATUS_LABELS, PROJECT_STATUS_LABELS } from "./changeEstimator";

// ── Base wrapper ───────────────────────────────────────────

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:560px;margin:40px auto;background:#1e293b;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
  <!-- Header -->
  <div style="padding:32px 32px 24px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
    <div style="font-size:24px;font-weight:800;letter-spacing:-0.5px;">
      <span style="color:#818cf8;">Puro</span><span style="color:#e2e8f0;">Code</span>
    </div>
  </div>
  <!-- Content -->
  <div style="padding:32px;">
    ${content}
  </div>
  <!-- Footer -->
  <div style="padding:24px 32px;background:rgba(0,0,0,0.2);text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0;font-size:12px;color:#64748b;">PuroCode &mdash; Desarrollo Web & SaaS Premium</p>
  </div>
</div>
</body>
</html>`;
}

// ── Magic Link Email ───────────────────────────────────────

export function generateMagicLinkEmail(firstName: string, url: string): string {
  return emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e2e8f0;">
      Hola ${firstName} 👋
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">
      Recibimos tu solicitud de acceso al portal de clientes. Haz clic en el botón para acceder:
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${url}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:10px;">
        Acceder al Portal
      </a>
    </div>
    <p style="margin:0 0 8px;font-size:13px;color:#64748b;line-height:1.5;">
      Este enlace expira en <strong style="color:#94a3b8;">30 minutos</strong>.
    </p>
    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
      Si no solicitaste este acceso, puedes ignorar este email.
    </p>
  `);
}

// ── Nueva solicitud de modificación (para PuroCode) ────────

export function generateNewChangeRequestAdminEmail(
  projectName: string,
  clientName: string,
  description: string,
  priority: string,
  estimatedPrice: number
): string {
  const priorityLabel = PRIORITY_LABELS[priority] || priority;
  const priceFormatted = `$${estimatedPrice.toLocaleString("es-CL")}`;

  return emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e2e8f0;">
      Nueva solicitud de modificación
    </h2>
    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:10px;padding:20px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#818cf8;font-weight:600;">PROYECTO</p>
      <p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;font-weight:600;">${projectName}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#818cf8;font-weight:600;">CLIENTE</p>
      <p style="margin:0;font-size:15px;color:#cbd5e1;">${clientName}</p>
    </div>
    <div style="margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">DESCRIPCIÓN</p>
      <p style="margin:0 0 16px;font-size:15px;color:#cbd5e1;line-height:1.6;">${description}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">PRIORIDAD</p>
      <p style="margin:0 0 16px;font-size:15px;color:#e2e8f0;">${priorityLabel}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">PRECIO ESTIMADO</p>
      <p style="margin:0;font-size:18px;color:#818cf8;font-weight:700;">${priceFormatted} CLP</p>
    </div>
  `);
}

// ── Confirmación de solicitud (para el cliente) ────────────

export function generateChangeRequestConfirmationEmail(
  firstName: string,
  projectName: string,
  description: string,
  estimatedPrice: number
): string {
  const priceFormatted = `$${estimatedPrice.toLocaleString("es-CL")}`;

  return emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e2e8f0;">
      Recibimos tu solicitud
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">
      Hola ${firstName}, tu solicitud de modificación para <strong style="color:#e2e8f0;">${projectName}</strong> fue recibida correctamente.
    </p>
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">DESCRIPCIÓN</p>
      <p style="margin:0 0 16px;font-size:14px;color:#cbd5e1;line-height:1.5;">${description}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">PRECIO ESTIMADO</p>
      <p style="margin:0;font-size:16px;color:#818cf8;font-weight:600;">~${priceFormatted} CLP</p>
    </div>
    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
      Te notificaremos cuando revisemos tu solicitud. El precio final puede variar según la complejidad.
    </p>
  `);
}

// ── Cambio de estado de solicitud (para el cliente) ────────

export function generateChangeStatusEmail(
  firstName: string,
  projectName: string,
  newStatus: string,
  clientNotes?: string | null
): string {
  const statusLabel = CHANGE_STATUS_LABELS[newStatus] || newStatus;

  const statusColors: Record<string, string> = {
    accepted: "#22c55e",
    in_progress: "#a855f7",
    completed: "#10b981",
    cancelled: "#ef4444",
  };
  const color = statusColors[newStatus] || "#818cf8";

  return emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e2e8f0;">
      Actualización de tu solicitud
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">
      Hola ${firstName}, hay una actualización sobre tu solicitud para <strong style="color:#e2e8f0;">${projectName}</strong>.
    </p>
    <div style="text-align:center;margin:24px 0;">
      <span style="display:inline-block;padding:10px 24px;background:${color}20;color:${color};border:1px solid ${color}40;border-radius:8px;font-size:15px;font-weight:600;">
        ${statusLabel}
      </span>
    </div>
    ${clientNotes ? `
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;margin:24px 0;">
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">MENSAJE</p>
      <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.5;">${clientNotes}</p>
    </div>` : ""}
    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
      Puedes ver todos los detalles en tu portal de cliente.
    </p>
  `);
}

// ── Cambio de estado del proyecto (para el cliente) ────────

export function generateProjectStatusEmail(
  firstName: string,
  projectName: string,
  newStatus: string
): string {
  const statusLabel = PROJECT_STATUS_LABELS[newStatus] || newStatus;

  const statusMessages: Record<string, string> = {
    development: "Tu proyecto está actualmente en desarrollo.",
    delivered: "Tu proyecto ha sido entregado exitosamente.",
    maintenance: "Tu proyecto está en modo de mantenimiento.",
    paused: "Tu proyecto ha sido pausado temporalmente.",
  };
  const message = statusMessages[newStatus] || `Estado actualizado a: ${statusLabel}`;

  return emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e2e8f0;">
      Actualización de tu proyecto
    </h2>
    <p style="margin:0 0 24px;font-size:15px;color:#94a3b8;line-height:1.6;">
      Hola ${firstName}, hay una actualización sobre <strong style="color:#e2e8f0;">${projectName}</strong>.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#cbd5e1;line-height:1.6;">
      ${message}
    </p>
  `);
}

// ── Solicitud cancelada (para PuroCode) ────────────────────

export function generateCancellationAdminEmail(
  projectName: string,
  clientName: string,
  description: string
): string {
  return emailWrapper(`
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#e2e8f0;">
      Solicitud cancelada
    </h2>
    <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:20px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:13px;color:#f87171;font-weight:600;">PROYECTO</p>
      <p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;font-weight:600;">${projectName}</p>
      <p style="margin:0 0 8px;font-size:13px;color:#f87171;font-weight:600;">CLIENTE</p>
      <p style="margin:0;font-size:15px;color:#cbd5e1;">${clientName}</p>
    </div>
    <div style="margin:0 0 16px;">
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;">SOLICITUD CANCELADA</p>
      <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.5;">${description}</p>
    </div>
  `);
}
