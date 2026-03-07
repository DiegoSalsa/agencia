import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Sitio | PuroCode",
  description: "Portal de clientes PuroCode — Revisa el estado de tu proyecto, solicita modificaciones y descarga documentos.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-indigo-400">Puro</span>
              <span className="text-white">Code</span>
            </span>
          </a>
        </div>

        {children}
      </div>
    </main>
  );
}
