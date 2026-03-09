"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            !
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[var(--text)] mb-2">
          Algo salió mal
        </h1>
        <p className="text-[var(--muted)] mb-8 text-sm leading-relaxed">
          Ocurrió un error inesperado. Puedes intentar recargar la sección o volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
          >
            Volver al inicio
          </a>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-[var(--muted)]/50">
            Código: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
