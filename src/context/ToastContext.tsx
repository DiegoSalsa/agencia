"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

/* ─── Types ─── */
type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/* ─── Config ─── */
const VARIANT_CONFIG: Record<ToastVariant, { icon: ReactNode; bg: string; border: string; text: string }> = {
  success: {
    icon: <CheckCircle2 size={16} />,
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    text: "text-emerald-400",
  },
  error: {
    icon: <XCircle size={16} />,
    bg: "bg-red-500/10",
    border: "border-red-500/25",
    text: "text-red-400",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    text: "text-amber-400",
  },
  info: {
    icon: <Info size={16} />,
    bg: "bg-blue-500/10",
    border: "border-blue-500/25",
    text: "text-blue-400",
  },
};

const DURATION = 4000;

/* ─── Provider ─── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, variant: ToastVariant) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, DURATION);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value: ToastContextValue = {
    success: (m) => addToast(m, "success"),
    error: (m) => addToast(m, "error"),
    warning: (m) => addToast(m, "warning"),
    info: (m) => addToast(m, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          const config = VARIANT_CONFIG[toast.variant];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl shadow-black/40 animate-slideUp ${config.bg} ${config.border}`}
              style={{ minWidth: 280, maxWidth: 420 }}
            >
              <span className={config.text}>{config.icon}</span>
              <span className="text-sm text-white/80 flex-1">{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
