import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";

export async function GET(request: NextRequest) {
    try {
        if (!requireAdmin(request)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id param required" }, { status: 400 });
        }

        const briefing = await prisma.briefing.findUnique({ where: { id } });
        if (!briefing) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const contact = JSON.parse(briefing.contactData);
        const content = JSON.parse(briefing.contentData);
        const design = JSON.parse(briefing.designData);
        const extra = JSON.parse(briefing.extraData);

        const typeLabels: Record<string, string> = {
            LANDING: "Landing Page",
            WEB_CORPORATIVA: "Web Corporativa",
            ECOMMERCE: "E-commerce",
        };

        const children: Paragraph[] = [
            // Title
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Briefing — ${typeLabels[briefing.type] || briefing.type}`,
                        bold: true,
                        size: 36,
                        color: "2B2D42",
                    }),
                ],
                heading: HeadingLevel.HEADING_1,
                spacing: { after: 200 },
            }),

            // Client info
            new Paragraph({
                children: [
                    new TextRun({ text: `Cliente: `, bold: true, size: 24 }),
                    new TextRun({ text: briefing.clientName, size: 24 }),
                ],
                spacing: { after: 100 },
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: `Email: `, bold: true, size: 24 }),
                    new TextRun({ text: briefing.clientEmail, size: 24 }),
                ],
                spacing: { after: 100 },
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: `Fecha: `, bold: true, size: 24 }),
                    new TextRun({ text: briefing.createdAt.toLocaleDateString("es-CL"), size: 24 }),
                ],
                spacing: { after: 100 },
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: `Estado: `, bold: true, size: 24 }),
                    new TextRun({ text: briefing.status, size: 24 }),
                ],
                spacing: { after: 300 },
            }),

            // Separator
            new Paragraph({
                border: {
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                },
                spacing: { after: 300 },
            }),
        ];

        // Add section helper
        const addSection = (title: string, data: Record<string, unknown>) => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: title, bold: true, size: 28, color: "4361EE" }),
                    ],
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 150 },
                })
            );

            for (const [key, value] of Object.entries(data)) {
                const displayKey = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
                const displayValue = Array.isArray(value) ? value.join(", ") : String(value ?? "—");
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `${displayKey}: `,
                                bold: true,
                                size: 22,
                                font: "Calibri",
                            }),
                            new TextRun({
                                text: displayValue,
                                size: 22,
                                font: "Calibri",
                            }),
                        ],
                        spacing: { after: 80 },
                    })
                );
            }
        };

        addSection("1. Datos de Contacto", contact);
        addSection("2. Contenido y Objetivos", content);
        addSection("3. Diseño", design);
        addSection("4. Extras y Entrega", extra);

        // Summary if exists
        if (briefing.summary) {
            children.push(
                new Paragraph({
                    border: {
                        bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                    },
                    spacing: { before: 300, after: 200 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Resumen / Notas", bold: true, size: 28, color: "4361EE" }),
                    ],
                    heading: HeadingLevel.HEADING_2,
                    spacing: { after: 150 },
                }),
                new Paragraph({
                    children: [new TextRun({ text: briefing.summary, size: 22 })],
                    alignment: AlignmentType.LEFT,
                })
            );
        }

        const doc = new Document({
            sections: [{ children }],
        });

        const buffer = await Packer.toBuffer(doc);
        const uint8 = new Uint8Array(buffer);

        return new NextResponse(uint8, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="briefing_${briefing.clientName.replace(/\s+/g, "_")}_${briefing.id.slice(0, 8)}.docx"`,
            },
        });
    } catch (error) {
        console.error("DOCX export error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
