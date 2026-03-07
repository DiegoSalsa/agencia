"use client";

import PortalLogin from "@/components/portal/PortalLogin";
import Dashboard from "@/components/portal/Dashboard";

interface PortalClientProps {
  isAuthenticated: boolean;
  error?: string | null;
}

export default function PortalClient({ isAuthenticated, error }: PortalClientProps) {
  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
        <PortalLogin error={error} />
      </div>
    </div>
  );
}
