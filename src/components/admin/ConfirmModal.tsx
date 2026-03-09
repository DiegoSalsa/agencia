"use client";

import React, { type ReactNode } from "react";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "warning";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Eliminar",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  const isDanger = variant === "danger";
  const iconBg = isDanger ? "bg-red-500/15" : "bg-amber-500/15";
  const iconColor = isDanger ? "text-red-400" : "text-amber-400";
  const btnClass = isDanger
    ? "bg-red-500/15 border-red-500/25 text-red-400 hover:bg-red-500/25"
    : "bg-amber-500/15 border-amber-500/25 text-amber-400 hover:bg-amber-500/25";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeInOverlay">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
            {isDanger ? <Trash2 size={18} className={iconColor} /> : <AlertTriangle size={18} className={iconColor} />}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-white/40">Esta acción no se puede deshacer</p>
          </div>
        </div>
        <p className="text-sm text-white/60 mb-6">{message}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2 border rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${btnClass}`}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
