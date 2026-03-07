import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signPortalToken, setPortalCookie } from "@/lib/portalAuth";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/mi-sitio?error=missing", request.url));
    }

    // Find the magic token
    const magicToken = await prisma.magicToken.findUnique({
      where: { token },
      include: { project: true },
    });

    if (!magicToken) {
      return NextResponse.redirect(new URL("/mi-sitio?error=invalid", request.url));
    }

    // Check expiry
    if (new Date() > magicToken.expiresAt) {
      return NextResponse.redirect(new URL("/mi-sitio?error=expired", request.url));
    }

    // Create JWT session
    const jwt = signPortalToken(magicToken.projectId, magicToken.project.clientEmail);

    // Mark token as used (but still reusable within 30 min window)
    if (!magicToken.used) {
      await prisma.magicToken.update({
        where: { id: magicToken.id },
        data: { used: true },
      });
    }

    // Set cookie and redirect to portal (without token in URL)
    const response = NextResponse.redirect(new URL("/mi-sitio", request.url));
    setPortalCookie(response, jwt);

    return response;
  } catch (error) {
    console.error("[Portal Validate] Error:", error);
    return NextResponse.redirect(new URL("/mi-sitio?error=server", request.url));
  }
}
