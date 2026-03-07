"use client";

import React, { useState } from "react";
import { X, Loader2, Send, AlertCircle } from "lucide-react";

interface ChangeRequestFormProps {
  onClose: () => void;
  onCreated: () => void;
}

const PRIORITIES = [
  { value: "low", label: "Baja", desc: "Sin urgencia", color: "border-slate-500/30 text-slate-400" },
  { value: "medium", label: "Media", desc: "Tiempo normal", color: "border-blue-500/30 text-blue-400" },
  { value: "high", label: "Alta", desc: "+20% precio", color: "border-amber-500/30 text-amber-400" },
  { value: "urgent", label: "Urgente", desc: "+50% precio", color: "border-red-500/30 text-red-400" },
];

export default function ChangeRequestForm({ onClose, onCreated }: ChangeRequestFormProps) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/changes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim(), priority }),
      });

      const data = await res.json();

      if (data.ok) {
        onCreated();
      } else {
        setError(data.message || "Error al crear la solicitud");
      }
    } catch {
      setError("Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <h3 className="text-lg font-semibold text-white">Nueva Solicitud de Modificación</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Describe qué quieres cambiar
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Quiero cambiar el color del banner principal y agregar una nueva sección de testimonios..."
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              {description.length}/2000 caracteres
            </p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Prioridad
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex flex-col items-start p-3 rounded-xl border transition-all text-left ${
                    priority === p.value
                      ? `${p.color} bg-white/[0.06]`
                      : "border-white/8 text-slate-500 hover:border-white/15 hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="text-sm font-medium">{p.label}</span>
                  <span className="text-[11px] opacity-75">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || description.trim().length < 10}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Send size={14} />
                  Enviar Solicitud
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
