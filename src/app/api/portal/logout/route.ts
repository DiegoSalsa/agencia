import { NextResponse } from "next/server";
import { clearPortalCookie } from "@/lib/portalAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true, message: "Sesión cerrada" });
  clearPortalCookie(response);
  return response;
}
