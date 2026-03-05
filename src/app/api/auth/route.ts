import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        const valid = await verifyPassword(password);

        if (valid) {
            const token = signToken();
            return NextResponse.json({ token, success: true });
        }

        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
