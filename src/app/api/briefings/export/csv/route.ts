import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Papa from "papaparse";

export async function GET(request: NextRequest) {
    try {
        if (!requireAdmin(request)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        const where: Record<string, string> = {};
        if (type) where.type = type;

        const briefings = await prisma.briefing.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        // Flatten JSON fields for CSV
        const flatData = briefings.map((b: typeof briefings[number]) => {
            const contact = JSON.parse(b.contactData);
            const content = JSON.parse(b.contentData);
            const design = JSON.parse(b.designData);
            const extra = JSON.parse(b.extraData);

            return {
                id: b.id,
                fecha: b.createdAt.toISOString().split("T")[0],
                tipo: b.type,
                estado: b.status,
                nombre_cliente: b.clientName,
                email_cliente: b.clientEmail,
                resumen: b.summary || "",
                ...flattenObject(contact, "contacto"),
                ...flattenObject(content, "contenido"),
                ...flattenObject(design, "diseno"),
                ...flattenObject(extra, "extra"),
            };
        });

        const csv = Papa.unparse(flatData);

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="briefings_${new Date().toISOString().split("T")[0]}.csv"`,
            },
        });
    } catch (error) {
        console.error("CSV export error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

function flattenObject(obj: Record<string, unknown>, prefix: string): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
        const flatKey = `${prefix}_${key}`;
        if (Array.isArray(value)) {
            result[flatKey] = value.join(", ");
        } else if (typeof value === "object" && value !== null) {
            result[flatKey] = JSON.stringify(value);
        } else {
            result[flatKey] = String(value ?? "");
        }
    }
    return result;
}
