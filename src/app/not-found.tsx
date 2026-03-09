import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Página no encontrada",
  description: "La página que buscas no existe o fue movida.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* 404 Number */}
        <div className="relative mb-6">
          <span className="text-[10rem] md:text-[14rem] font-black leading-none bg-gradient-to-br from-purple-500 via-violet-500 to-emerald-400 bg-clip-text text-transparent select-none">
            404
          </span>
        </div>

        {/* Logo icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-bold text-xl">&lt;/&gt;</span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Página no encontrada</h1>
        <p className="text-[var(--text-secondary)] mb-10 text-base leading-relaxed">
          La página que buscas no existe, fue movida o cambió de dirección.
          <br className="hidden md:block" />
          Pero no te preocupes, tenemos mucho más para ti.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-sm hover:from-purple-700 hover:to-violet-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Volver al inicio
          </Link>
          <Link
            href="/formulario"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] font-semibold text-sm hover:bg-[var(--surface-hover)] transition-all"
          >
            Cotiza tu proyecto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Subtle footer */}
        <p className="mt-16 text-xs text-[var(--text-tertiary)]">
          PuroCode — Agencia de Desarrollo Web
        </p>
      </div>
    </div>
  );
}
