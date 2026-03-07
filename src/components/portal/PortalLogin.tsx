"use client";

import React, { useState } from "react";
import { Mail, Loader2, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

interface PortalLoginProps {
  error?: string | null;
}

export default function PortalLogin({ error }: PortalLoginProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const errorMessages: Record<string, string> = {
    expired: "Tu enlace ha expirado. Solicita uno nuevo.",
    invalid: "Enlace inválido. Solicita uno nuevo.",
    missing: "Enlace incompleto. Solicita uno nuevo.",
    server: "Error del servidor. Intenta más tarde.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/portal/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        setErrorMsg(data.message || "Error al enviar el enlace");
      }
    } catch {
      setErrorMsg("Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-3">Revisa tu email</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Si tu email está registrado, recibirás un enlace de acceso en los próximos minutos. Revisa también tu carpeta de spam.
        </p>
        <button
          onClick={() => { setSent(false); setEmail(""); }}
          className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
        >
          Usar otro email
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center">
          <Mail size={28} className="text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Portal de Clientes</h2>
        <p className="text-slate-400 text-sm">
          Ingresa tu email para recibir un enlace de acceso.
        </p>
      </div>

      {/* Show error from URL params */}
      {error && errorMessages[error] && (
        <div className="flex items-center gap-2 p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{errorMessages[error]}</p>
        </div>
      )}

      {/* Show form error */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            autoComplete="email"
            className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Enviar enlace de acceso
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
