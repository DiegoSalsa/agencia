import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyPortalToken } from "@/lib/portalAuth";
import PortalClient from "./PortalClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MiSitioPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;
  const error = typeof params.error === "string" ? params.error : undefined;

  // If there's a magic link token in the URL, redirect to validate endpoint
  if (token) {
    redirect(`/api/portal/validate?token=${token}`);
  }

  // Check if user has a valid session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("portal_session");
  const session = sessionCookie?.value ? verifyPortalToken(sessionCookie.value) : null;

  return <PortalClient isAuthenticated={!!session} error={error} />;
}
