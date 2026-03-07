interface BriefingData {
    type: string;
    clientName: string;
    clientEmail: string;
    contactData: Record<string, unknown>;
    contentData: Record<string, unknown>;
    designData: Record<string, unknown>;
    extraData: Record<string, unknown>;
}

import { translateValue } from "./valueLabels";
import { calculatePrice, formatCLP } from "./pricingEngine";
import { FormData } from "@/types/briefing";

const FIELD_LABELS: Record<string, string> = {
    firstName: "Nombre",
    lastNameP: "Apellido paterno",
    lastNameM: "Apellido materno",
    businessName: "Nombre del negocio",
    industry: "Rubro / Industria",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    instagramUrl: "Instagram",
    facebookUrl: "Facebook",
    twitterUrl: "Twitter / X",
    mainGoal: "Objetivo principal",
    targetAudience: "Público objetivo",
    mainCTA: "Llamada a la acción",
    uniqueValue: "Propuesta de valor",
    sections: "Secciones seleccionadas",
    sectionNotes: "Notas sobre secciones",
    designStyle: "Estilo de diseño",
    primaryColor: "Color principal",
    secondaryColor: "Color secundario",
    referenceUrls: "URLs de referencia",
    hasLogo: "¿Tiene logo?",
    hasPhotos: "¿Tiene fotos?",
    hasTexts: "¿Tiene textos?",
    additionalContent: "Contenido adicional",
    features: "Funcionalidades extras",
    hasDomain: "¿Tiene dominio?",
    domainName: "Dominio",
    socialMedia: "Redes sociales",
    urgency: "Urgencia",
    budget: "Presupuesto",
    additionalNotes: "Notas adicionales",
};

// Reconstruct FormData from briefing data groups for pricing
function buildFormDataForPricing(data: BriefingData): FormData {
    const fd: FormData = {};
    for (const group of [data.contactData, data.contentData, data.designData, data.extraData]) {
        for (const [k, v] of Object.entries(group || {})) {
            fd[k] = v as string | string[] | boolean;
        }
    }
    return fd;
}

const TYPE_LABELS: Record<string, string> = {
    LANDING: "Landing Page",
    WEB_CORPORATIVA: "Web Corporativa",
    ECOMMERCE: "E-commerce",
};

function formatValue(value: unknown): string {
    const result = translateValue(value);
    return result === "No especificado" ? "" : result;
}

function getLabel(key: string): string {
    return FIELD_LABELS[key] || key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
}

function renderSection(title: string, data: Record<string, unknown>): string {
    const entries = Object.entries(data || {});
    if (entries.length === 0) return "";

    const rows = entries
        .filter(([, v]) => formatValue(v))
        .map(
            ([key, value]) => `
            <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6; width: 35%; vertical-align: top;">
                    ${getLabel(key)}
                </td>
                <td style="padding: 8px 12px; color: #4b5563; border-bottom: 1px solid #f3f4f6; vertical-align: top;">
                    ${formatValue(value).replace(/\n/g, "<br>")}
                </td>
            </tr>`
        )
        .join("");

    return `
        <div style="margin-bottom: 24px;">
            <h2 style="color: #4361EE; font-size: 18px; font-weight: 700; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #4361EE;">
                ${title}
            </h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                ${rows}
            </table>
        </div>`;
}

export function generateEmailHtml(data: BriefingData): string {
    const businessName = (data.contactData.businessName as string) || data.clientName;
    const primaryColor = (data.designData.primaryColor as string) || "#4361EE";
    const sections = (data.contentData.sections as string[]) || [];
    const designStyle = (data.designData.designStyle as string) || "";
    const urgency = (data.extraData.urgency as string) || "";
    const features = (data.extraData.features as string[]) || [];

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <div style="max-width: 640px; margin: 0 auto; padding: 32px 16px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4361EE, #7C3AED); border-radius: 16px 16px 0 0; padding: 40px 32px; text-align: center;">
            <h1 style="color: white; font-size: 28px; font-weight: 800; margin: 0 0 8px 0;">
                Briefing Recibido
            </h1>
            <p style="color: rgba(255,255,255,0.8); font-size: 16px; margin: 0;">
                ${TYPE_LABELS[data.type] || data.type}
            </p>
        </div>

        <!-- Content -->
        <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Client highlight -->
            <div style="background: #f0f4ff; border-radius: 12px; padding: 20px; margin-bottom: 28px; border-left: 4px solid #4361EE;">
                <h2 style="margin: 0 0 4px 0; font-size: 22px; color: #1a1a2e;">
                    ${data.clientName}
                </h2>
                <p style="margin: 0; color: #4361EE; font-size: 16px; font-weight: 600;">
                    ${businessName}
                </p>
                <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">
                    ${data.clientEmail}
                </p>
            </div>

            <!-- Quick summary -->
            <div style="display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap;">
                ${designStyle ? `<span style="background: #ede9fe; color: #7c3aed; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">${translateValue(designStyle)}</span>` : ""}
                ${urgency && urgency !== "normal" ? `<span style="background: #fef3c7; color: #d97706; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">${translateValue(urgency)}</span>` : ""}
                ${primaryColor ? `<span style="background: #f3f4f6; color: #374151; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;">${primaryColor}</span>` : ""}
            </div>

            ${sections.length > 0 ? `
            <!-- Sections selected -->
            <div style="margin-bottom: 24px;">
                <h3 style="color: #374151; font-size: 15px; margin: 0 0 8px 0;">Secciones seleccionadas:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${sections.map((s: string) => `<span style="background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 6px; font-size: 12px;">${translateValue(s)}</span>`).join("")}
                </div>
            </div>` : ""}

            ${features.length > 0 ? `
            <!-- Features -->
            <div style="margin-bottom: 24px;">
                <h3 style="color: #374151; font-size: 15px; margin: 0 0 8px 0;">Extras solicitados:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${features.map((f: string) => `<span style="background: #fce7f3; color: #be185d; padding: 4px 10px; border-radius: 6px; font-size: 12px;">${translateValue(f)}</span>`).join("")}
                </div>
            </div>` : ""}

            <!-- Pricing Estimate -->
            ${(() => {
                const pricingFormData = buildFormDataForPricing(data);
                const pricing = calculatePrice(pricingFormData);
                return `
                <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin-bottom: 28px; border-left: 4px solid #10b981;">
                    <h3 style="color: #065f46; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">Cotización Estimada</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        ${pricing.breakdown.map(item => `
                            <tr>
                                <td style="padding: 4px 0; color: #374151;">${item.label}</td>
                                <td style="padding: 4px 0; color: #065f46; font-weight: 600; text-align: right;">${item.amount === 0 && item.category !== 'base' ? 'incluido' : formatCLP(item.amount)}</td>
                            </tr>
                        `).join('')}
                        <tr>
                            <td style="padding: 12px 0 4px; color: #065f46; font-weight: 700; font-size: 15px; border-top: 2px solid #10b981;">Desde</td>
                            <td style="padding: 12px 0 4px; color: #065f46; font-weight: 700; font-size: 18px; text-align: right; border-top: 2px solid #10b981;">${formatCLP(pricing.totalMin)}</td>
                        </tr>
                    </table>
                </div>`;
            })()}

            <!-- Detailed sections -->
            ${renderSection("1. Identidad y Contacto", data.contactData)}
            ${renderSection("2. Objetivo y Estrategia", data.contentData)}
            ${renderSection("3. Diseño Visual", data.designData)}
            ${renderSection("4. Extras y Entrega", data.extraData)}

            <!-- Footer note -->
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                    Se adjuntan los archivos Word (.docx) y Excel (.xlsx) con el detalle completo del briefing.
                </p>
                <p style="color: #d1d5db; font-size: 11px; margin: 8px 0 0;">
                    Generado automáticamente — ${new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
}
