"use client";

import React from "react";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Inbox,
} from "lucide-react";
import type { ChangeRequestData } from "./Dashboard";

interface ChangeHistoryProps {
  changes: ChangeRequestData[];
  onCancel: (changeId: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pendiente",
    color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    icon: <Clock size={12} />,
  },
  accepted: {
    label: "Aceptada",
    color: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    icon: <CheckCircle2 size={12} />,
  },
  in_progress: {
    label: "En Progreso",
    color: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    icon: <ArrowRight size={12} />,
  },
  completed: {
    label: "Completada",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    icon: <CheckCircle2 size={12} />,
  },
  cancelled: {
    label: "Cancelada",
    color: "bg-slate-500/15 text-slate-400 border-slate-500/25",
    icon: <XCircle size={12} />,
  },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  low: { label: "Baja", color: "text-slate-400" },
  medium: { label: "Media", color: "text-blue-400" },
  high: { label: "Alta", color: "text-amber-400" },
  urgent: { label: "Urgente", color: "text-red-400" },
};

function formatPrice(amount: number | null | undefined): string {
  if (amount == null) return "Sin estimar";
  return `$${amount.toLocaleString("es-CL")}`;
}

export default function ChangeHistory({ changes, onCancel }: ChangeHistoryProps) {
  if (changes.length === 0) {
    return (
      <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 text-center">
        <Inbox size={32} className="mx-auto text-slate-600 mb-3" />
        <p className="text-slate-500 text-sm">Aún no has realizado solicitudes de modificación.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {changes.map((change) => {
        const status = STATUS_CONFIG[change.status] || STATUS_CONFIG.pending;
        const priority = PRIORITY_CONFIG[change.priority] || PRIORITY_CONFIG.medium;

        return (
          <div
            key={change.id}
            className="bg-white/[0.03] border border-white/8 rounded-xl p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 leading-relaxed">{change.description}</p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-full border shrink-0 ${status.color}`}>
                {status.icon}
                {status.label}
              </span>
            </div>

            {/* Meta row */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>
                Prioridad: <span className={priority.color}>{priority.label}</span>
              </span>
              <span>
                Precio: <span className="text-slate-300">
                  {change.price != null
                    ? formatPrice(change.price)
                    : `~${formatPrice(change.estimatedPrice)} (estimado)`}
                </span>
              </span>
              <span>
                {new Date(change.createdAt).toLocaleDateString("es-CL", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Client notes from admin */}
            {change.clientNotes && (
              <div className="flex items-start gap-2 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
                <AlertCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed">{change.clientNotes}</p>
              </div>
            )}

            {/* Cancel button (only for pending) */}
            {change.status === "pending" && (
              <button
                onClick={() => onCancel(change.id)}
                className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
              >
                Cancelar solicitud
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
