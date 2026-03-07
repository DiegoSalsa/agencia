import ExcelJS from "exceljs";
import { translateValue } from "./valueLabels";

interface BriefingData {
    type: string;
    clientName: string;
    clientEmail: string;
    contactData: Record<string, unknown>;
    contentData: Record<string, unknown>;
    designData: Record<string, unknown>;
    extraData: Record<string, unknown>;
}

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
    mainCTA: "Llamada a la acción principal",
    uniqueValue: "Propuesta de valor única",
    sections: "Secciones seleccionadas",
    sectionNotes: "Notas sobre secciones",
    designStyle: "Estilo de diseño",
    primaryColor: "Color principal",
    secondaryColor: "Color secundario",
    referenceUrls: "URLs de referencia",
    hasLogo: "¿Tiene logo?",
    hasPhotos: "¿Tiene fotos propias?",
    hasTexts: "¿Tiene textos listos?",
    additionalContent: "Contenido adicional",
    features: "Funcionalidades extras",
    hasDomain: "¿Tiene dominio?",
    domainName: "Nombre de dominio",
    socialMedia: "Redes sociales",
    urgency: "Urgencia",
    budget: "Presupuesto",
    additionalNotes: "Notas adicionales",
};

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

export async function generateXlsxBuffer(data: BriefingData): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Briefing System";
    workbook.created = new Date();

    // ── Sheet 1: Detailed Briefing ──
    const ws1 = workbook.addWorksheet("Briefing Detallado");

    // Header styling
    ws1.columns = [
        { header: "Sección", key: "section", width: 25 },
        { header: "Campo", key: "field", width: 35 },
        { header: "Valor", key: "value", width: 60 },
    ];

    // Style header row
    const headerRow = ws1.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
    headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4361EE" } };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.height = 30;

    // Add title row
    const titleRow = ws1.insertRow(1, [`BRIEFING — ${TYPE_LABELS[data.type] || data.type}`]);
    ws1.mergeCells("A1:C1");
    titleRow.font = { bold: true, size: 16, color: { argb: "FF1A1A2E" } };
    titleRow.alignment = { horizontal: "center", vertical: "middle" };
    titleRow.height = 40;

    // Move column headers to row 2 (already there after insert)

    // Add client info
    const sectionConfigs = [
        { title: "Datos del Cliente", data: { clientName: data.clientName, clientEmail: data.clientEmail, ...data.contactData } },
        { title: "Objetivo y Estrategia", data: data.contentData },
        { title: "Diseño Visual", data: data.designData },
        { title: "Extras y Entrega", data: data.extraData },
    ];

    for (const section of sectionConfigs) {
        const entries = Object.entries(section.data || {});
        if (entries.length === 0) continue;

        let isFirst = true;
        for (const [key, value] of entries) {
            const formatted = formatValue(value);
            if (!formatted) continue;

            const row = ws1.addRow({
                section: isFirst ? section.title : "",
                field: getLabel(key),
                value: formatted,
            });

            if (isFirst) {
                row.getCell(1).font = { bold: true, size: 11, color: { argb: "FF4361EE" } };
                isFirst = false;
            }

            row.getCell(2).font = { bold: true, size: 10 };
            row.getCell(3).alignment = { wrapText: true };
        }

        // Add empty separator row
        ws1.addRow({});
    }

    // Add date footer
    ws1.addRow({});
    const dateRow = ws1.addRow({
        section: "",
        field: "Fecha de generación",
        value: new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" }),
    });
    dateRow.font = { italic: true, color: { argb: "FF999999" } };

    // ── Sheet 2: Flat Summary ──
    const ws2 = workbook.addWorksheet("Resumen Plano");

    ws2.columns = [
        { header: "Campo", key: "campo", width: 40 },
        { header: "Valor", key: "valor", width: 70 },
    ];

    const flatHeaderRow = ws2.getRow(1);
    flatHeaderRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
    flatHeaderRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4361EE" } };
    flatHeaderRow.alignment = { vertical: "middle", horizontal: "center" };
    flatHeaderRow.height = 30;

    // Flatten all data
    const allData: Record<string, unknown> = {
        tipo: TYPE_LABELS[data.type] || data.type,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        ...data.contactData,
        ...data.contentData,
        ...data.designData,
        ...data.extraData,
    };

    for (const [key, value] of Object.entries(allData)) {
        const formatted = formatValue(value);
        if (!formatted) continue;

        const row = ws2.addRow({ campo: getLabel(key), valor: formatted });
        row.getCell(1).font = { bold: true };
        row.getCell(2).alignment = { wrapText: true };
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
}
