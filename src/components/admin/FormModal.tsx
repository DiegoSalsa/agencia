"use client";

import React, { type ReactNode } from "react";
import { X, Loader2, Save } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  saveLabel?: string;
  saving?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
  wide?: boolean;
}

export default function FormModal({
  open,
  title,
  saveLabel = "Guardar",
  saving = false,
  disabled = false,
  onClose,
  onSave,
  children,
  wide = false,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeInOverlay">
      <div
        className={`bg-slate-900 border border-white/10 rounded-2xl shadow-2xl animate-fadeIn w-full flex flex-col ${
          wide ? "max-w-2xl max-h-[85vh]" : "max-w-lg max-h-[80vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 flex-shrink-0">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-white/30 hover:text-white/60 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">{children}</div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-5 border-t border-white/5 flex-shrink-0">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving || disabled}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
