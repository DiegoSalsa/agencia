import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// POST - Create new briefing
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { type, clientName, clientEmail, contactData, contentData, designData, extraData } = body;

        if (!type || !clientName) {
            return NextResponse.json(
                { error: "type and clientName are required" },
                { status: 400 }
            );
        }

        const validTypes = ["LANDING", "WEB_CORPORATIVA", "ECOMMERCE", "OFERTA"];
        if (!validTypes.includes(type)) {
            return NextResponse.json(
                { error: "Invalid briefing type" },
                { status: 400 }
            );
        }

        // Validate email format if provided
        if (clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // ── Deep sanitization ──────────────────────────────
        /** Sanitize a single string value */
        const sanitizeStr = (str: string, maxLen = 2000): string => {
            let clean = str;
            // Strip HTML tags
            clean = clean.replace(/<[^>]*>/g, "");
            // Remove script injections
            clean = clean.replace(/javascript:/gi, "");
            clean = clean.replace(/on\w+\s*=/gi, "");
            // Remove SQL injection patterns
            clean = clean.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE)\b)/gi, "");
            clean = clean.replace(/(--)|(\/\*)|(\*\/)/g, "");
            clean = clean.replace(/['"]?\s*(OR|AND)\s*['"]?\s*\d+\s*=\s*\d+/gi, "");
            // Remove null bytes
            clean = clean.replace(/\0/g, "");
            return clean.trim().slice(0, maxLen);
        };

        /** Recursively sanitize all strings in an object */
        const sanitizeDeep = (obj: unknown): unknown => {
            if (typeof obj === "string") return sanitizeStr(obj);
            if (Array.isArray(obj)) return obj.map(sanitizeDeep);
            if (obj && typeof obj === "object") {
                const result: Record<string, unknown> = {};
                for (const [key, val] of Object.entries(obj)) {
                    result[sanitizeStr(key, 100)] = sanitizeDeep(val);
                }
                return result;
            }
            return obj;
        };

        const briefing = await prisma.briefing.create({
            data: {
                type,
                clientName: sanitizeStr(clientName, 500),
                clientEmail: sanitizeStr(clientEmail || "", 500),
                contactData: JSON.stringify(sanitizeDeep(contactData || {})),
                contentData: JSON.stringify(sanitizeDeep(contentData || {})),
                designData: JSON.stringify(sanitizeDeep(designData || {})),
                extraData: JSON.stringify(sanitizeDeep(extraData || {})),
            },
        });

        return NextResponse.json({ id: briefing.id, status: "created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating briefing:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET - List briefings (admin)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // JWT auth check
        if (!requireAdmin(request)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Filters
        const type = searchParams.get("type");
        const status = searchParams.get("status");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");

        const where: Record<string, string> = {};
        if (type) where.type = type;
        if (status) where.status = status;

        const [briefings, total] = await Promise.all([
            prisma.briefing.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.briefing.count({ where }),
        ]);

        // Parse JSON fields
        const parsed = briefings.map((b) => ({
            ...b,
            contactData: JSON.parse(b.contactData),
            contentData: JSON.parse(b.contentData),
            designData: JSON.parse(b.designData),
            extraData: JSON.parse(b.extraData),
        }));

        return NextResponse.json({
            data: parsed,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    } catch (error: unknown) {
        // P2021 = table does not exist → return empty list gracefully
        if (error instanceof Error && "code" in error && (error as { code: string }).code === "P2021") {
            return NextResponse.json({
                data: [],
                pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
            });
        }
        console.error("Error listing briefings:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
