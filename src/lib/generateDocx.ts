import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
} from "docx";
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

// Field labels for human-readable output
const FIELD_LABELS: Record<string, string> = {
    clientName: "Nombre y Apellido",
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
    deadline: "Plazo de entrega",
    budget: "Presupuesto",
    additionalNotes: "Notas adicionales",
};

const TYPE_LABELS: Record<string, string> = {
    LANDING: "Landing Page",
    WEB_CORPORATIVA: "Web Corporativa",
    ECOMMERCE: "E-commerce",
};

function formatValue(value: unknown): string {
    return translateValue(value);
}

function getLabel(key: string): string {
    return FIELD_LABELS[key] || key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
}

export async function generateDocxBuffer(data: BriefingData): Promise<Buffer> {
    const children: Paragraph[] = [];

    // ── Title ──
    children.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: "BRIEFING LANDING PAGE",
                    bold: true,
                    size: 48,
                    color: "1a1a2e",
                    font: "Calibri",
                }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: TYPE_LABELS[data.type] || data.type,
                    size: 28,
                    color: "4361EE",
                    font: "Calibri",
                    italics: true,
                }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
        })
    );

    // ── Separator ──
    children.push(
        new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "4361EE" } },
            spacing: { after: 300 },
        })
    );

    // ── Client info block ──
    const clientFields = [
        ["Nombre", data.clientName],
        ["Negocio", formatValue(data.contactData.businessName)],
        ["Email", data.clientEmail],
        ["WhatsApp", formatValue(data.contactData.phone)],
        ["Ciudad", formatValue(data.contactData.city || data.contactData.ubicacion || "")],
    ];

    children.push(
        new Paragraph({
            children: [new TextRun({ text: "DATOS DEL CLIENTE", bold: true, size: 28, color: "4361EE", font: "Calibri" })],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
        })
    );

    for (const [label, value] of clientFields) {
        if (value && value !== "No especificado") {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${label}: `, bold: true, size: 22, font: "Calibri" }),
                        new TextRun({ text: String(value), size: 22, font: "Calibri" }),
                    ],
                    spacing: { after: 80 },
                })
            );
        }
    }

    // ── Sections ──
    const sectionConfigs = [
        { num: "1", title: "IDENTIDAD Y CONTACTO", data: data.contactData },
        { num: "2", title: "OBJETIVO Y ESTRATEGIA", data: data.contentData },
        { num: "3", title: "DISEÑO VISUAL", data: data.designData },
        { num: "4", title: "EXTRAS Y ENTREGA", data: data.extraData },
    ];

    for (const section of sectionConfigs) {
        children.push(
            new Paragraph({
                border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
                spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: `${section.num}. ${section.title}`, bold: true, size: 26, color: "4361EE", font: "Calibri" }),
                ],
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 150 },
            })
        );

        const entries = Object.entries(section.data || {});
        if (entries.length === 0) {
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: "Sin datos ingresados", italics: true, size: 20, color: "999999", font: "Calibri" })],
                    spacing: { after: 100 },
                })
            );
        } else {
            for (const [key, value] of entries) {
                const label = getLabel(key);
                const formatted = formatValue(value);
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: `${label}: `, bold: true, size: 22, font: "Calibri" }),
                            new TextRun({ text: formatted, size: 22, font: "Calibri" }),
                        ],
                        spacing: { after: 80 },
                    })
                );
            }
        }
    }

    // ── Footer ──
    children.push(
        new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "4361EE" } },
            spacing: { before: 400, after: 200 },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: `Generado automáticamente — ${new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}`,
                    italics: true,
                    size: 18,
                    color: "999999",
                    font: "Calibri",
                }),
            ],
            alignment: AlignmentType.CENTER,
        })
    );

    const doc = new Document({
        sections: [{ children }],
        creator: "Briefing System",
        title: `Briefing - ${data.clientName}`,
        description: `Briefing ${TYPE_LABELS[data.type] || data.type} para ${data.contactData.businessName || data.clientName}`,
    });

    const buffer = await Packer.toBuffer(doc);
    return Buffer.from(buffer);
}
