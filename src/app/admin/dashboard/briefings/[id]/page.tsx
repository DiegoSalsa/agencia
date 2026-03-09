"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BriefingRecord } from "@/types/briefing";
import {
  ArrowLeft,
  FileText,
  Save,
  Copy,
  Check,
  Trash2,
  Mail,
  Calendar,
  DollarSign,
  Palette,
  Target,
  Settings,
  MessageSquare,
  ExternalLink,
  Printer,
  Loader2,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/context/ToastContext";
import {
  BRIEFING_STATUS_CONFIG,
  BRIEFING_TYPE_CONFIG,
  BRIEFING_STATUS_OPTIONS,
  FIELD_LABELS,
} from "@/lib/admin/constants";
import { LoadingState, NotFoundState, ConfirmModal, StatusBadge } from "@/components/admin";

type Tab = "contacto" | "contenido" | "diseno" | "extras" | "notas";

export default function BriefingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAdminAuth();
  const toast = useToast();

  const [briefing, setBriefing] = useState<BriefingRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("contacto");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/briefings/${params.id}`, { headers: { "x-admin-token": token } })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setBriefing(data);
          setSummary(data.summary || "");
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id, token]);

  const handleSaveSummary = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await fetch(`/api/briefings/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ summary }),
      });
      toast.success("Notas guardadas");
    } catch {
      toast.error("Error al guardar notas");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/briefings/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      setBriefing(data);
      toast.success("Estado actualizado");
    } catch {
      toast.error("Error al cambiar estado");
    }
  };

  const handleExportDocx = async () => {
    if (!token || !briefing) return;
    const res = await fetch(`/api/briefings/export/docx?id=${briefing.id}`, {
      headers: { "x-admin-token": token },
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `briefing_${briefing.clientName.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = async () => {
    if (!token || !briefing) return;
    setDeleting(true);
    try {
      await fetch(`/api/briefings/${briefing.id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      toast.success("Briefing eliminado");
      router.push("/admin/dashboard/briefings");
    } catch {
      toast.error("Error al eliminar");
      setDeleting(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopiedField(null), 1500);
  };

  if (loading) return <LoadingState message="Cargando briefing..." />;
  if (!briefing) return <NotFoundState title="Briefing no encontrado" backHref="/admin/dashboard/briefings" backLabel="Volver a briefings" />;

  const sc = BRIEFING_STATUS_CONFIG[briefing.status] || BRIEFING_STATUS_CONFIG.nuevo;
  const tc = BRIEFING_TYPE_CONFIG[briefing.type] || BRIEFING_TYPE_CONFIG.LANDING;

  const tabs: { id: Tab; label: string; icon: React.ReactNode; data?: Record<string, unknown> }[] = [
    { id: "contacto", label: "Contacto", icon: <Mail size={14} />, data: briefing.contactData },
    { id: "contenido", label: "Contenido", icon: <Target size={14} />, data: briefing.contentData },
    { id: "diseno", label: "Diseño", icon: <Palette size={14} />, data: briefing.designData },
    { id: "extras", label: "Extras", icon: <Settings size={14} />, data: briefing.extraData },
    { id: "notas", label: "Notas", icon: <MessageSquare size={14} /> },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab);

  const renderValue = (key: string, value: unknown) => {
    if (Array.isArray(value)) return value.join(", ");
    if (key.includes("Color") && typeof value === "string" && value.startsWith("#")) {
      return (
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md border border-white/20 inline-block flex-shrink-0" style={{ backgroundColor: value }} />
          <span className="font-mono text-xs">{value}</span>
        </span>
      );
    }
    if (key.includes("Url") || key.includes("url") || key.includes("reference")) {
      const url = String(value);
      if (url.startsWith("http")) {
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 flex items-center gap-1">
            {url.replace(/^https?:\/\//, "").slice(0, 40)}{url.length > 50 ? "..." : ""}
            <ExternalLink size={10} />
          </a>
        );
      }
    }
    return String(value);
  };

  const renderDataSection = (data: Record<string, unknown>) => {
    const entries = Object.entries(data).filter(([, v]) => v !== undefined && v !== null && v !== "");
    if (entries.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-sm text-white/30">No hay datos en esta sección</p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-white/5">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 group">
            <span className="text-xs text-white/40 sm:w-44 flex-shrink-0 font-medium pt-0.5">
              {FIELD_LABELS[key] || key}
            </span>
            <div className="flex-1 text-sm text-white/80 flex items-start gap-2">
              <span className="flex-1">{renderValue(key, value)}</span>
              <button
                onClick={() => copyToClipboard(Array.isArray(value) ? value.join(", ") : String(value), key)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-white/20 hover:text-white/60 flex-shrink-0"
                title="Copiar"
              >
                {copiedField === key ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 print:bg-white">
      {/* ─── Top Bar ─── */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/admin/dashboard/briefings"
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Briefings</span>
        </Link>
        <div className="flex items-center gap-2">
          <select
            value={briefing.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 focus:outline-none cursor-pointer"
          >
            {BRIEFING_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
            ))}
          </select>
          <button
            onClick={handleExportDocx}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs hover:bg-indigo-500/20 transition-all"
          >
            <FileText size={12} /><span className="hidden sm:inline">DOCX</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg text-xs hover:bg-white/10 hover:text-white/60 transition-all"
          >
            <Printer size={12} /><span className="hidden sm:inline">Imprimir</span>
          </button>
          <button
            onClick={() => setShowDelete(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/30 rounded-lg text-xs hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* ─── Hero Card ─── */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 print:border-gray-200 print:bg-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl font-bold text-white print:text-black">{briefing.clientName}</h1>
              <StatusBadge status={briefing.status} />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              {briefing.clientEmail && (
                <button
                  onClick={() => copyToClipboard(briefing.clientEmail!, "hero-email")}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors group"
                >
                  <Mail size={12} /><span>{briefing.clientEmail}</span>
                  {copiedField === "hero-email" ? (
                    <Check size={10} className="text-emerald-400" />
                  ) : (
                    <Copy size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              )}
              <div className="flex items-center gap-1.5 text-xs text-white/30">
                <Calendar size={12} />
                <span>
                  {new Date(briefing.createdAt).toLocaleString("es-CL", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border font-medium ${tc.color}`}>
              {tc.label}
            </span>
            <div className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-emerald-400/70" />
              <span className="text-lg font-bold text-emerald-400/90">{tc.price}</span>
              <span className="text-xs text-white/20">CLP</span>
            </div>
          </div>
        </div>

        {/* Status pipeline */}
        <div className="mt-6 pt-5 border-t border-white/5 print:border-gray-200">
          <div className="flex items-center gap-1">
            {Object.entries(BRIEFING_STATUS_CONFIG).map(([key, cfg], i, arr) => {
              const isActive = briefing.status === key;
              const isPast = Object.keys(BRIEFING_STATUS_CONFIG).indexOf(briefing.status) > i;
              return (
                <React.Fragment key={key}>
                  {i > 0 && <div className={`flex-1 h-0.5 rounded-full ${isPast ? "bg-indigo-500/40" : "bg-white/5"}`} />}
                  <button
                    onClick={() => handleStatusChange(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? `${cfg.bg} ${cfg.color} border`
                        : isPast
                          ? "text-white/50 bg-white/[0.03]"
                          : "text-white/20 hover:text-white/40 hover:bg-white/[0.03]"
                    }`}
                  >
                    {cfg.icon}<span className="hidden sm:inline">{cfg.label}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden print:border-gray-200">
        <div className="flex border-b border-white/5 overflow-x-auto print:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                  : "border-transparent text-white/40 hover:text-white/60 hover:bg-white/[0.02]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.data && (
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                  activeTab === tab.id ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-white/25"
                }`}>
                  {Object.entries(tab.data).filter(([, v]) => v !== undefined && v !== null && v !== "").length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "notas" ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/70">Notas internas / Resumen</h3>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={8}
                placeholder="Agrega notas internas, resumen del proyecto, pendientes, acuerdos con el cliente..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y min-h-[120px]"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/20">{summary.length} caracteres</span>
                <button
                  onClick={handleSaveSummary}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/20 transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>{saving ? "Guardando..." : "Guardar notas"}</span>
                </button>
              </div>
            </div>
          ) : activeTabData?.data ? (
            renderDataSection(activeTabData.data)
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-white/30">No hay datos en esta sección</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Print-only ─── */}
      <div className="hidden print:block space-y-6">
        {tabs
          .filter((t) => t.data)
          .map((tab) => (
            <div key={tab.id} className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {tab.icon} {tab.label}
              </h3>
              {tab.data && renderDataSection(tab.data)}
            </div>
          ))}
        {summary && (
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Notas</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </div>

      {/* ─── Quick Actions Footer ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-white/5 print:hidden">
        <div className="flex items-center gap-2">
          {briefing.clientEmail && (
            <a
              href={`mailto:${briefing.clientEmail}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg text-xs hover:bg-white/10 hover:text-white/60 transition-all"
            >
              <Mail size={12} /> Enviar email
            </a>
          )}
          <button
            onClick={() => {
              const text = `Briefing: ${briefing.clientName}\nTipo: ${tc.label}\nEstado: ${sc.label}\nPrecio: ${tc.price} CLP\nFecha: ${new Date(briefing.createdAt).toLocaleString("es-CL")}`;
              copyToClipboard(text, "summary-copy");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg text-xs hover:bg-white/10 hover:text-white/60 transition-all"
          >
            {copiedField === "summary-copy" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            Copiar resumen
          </button>
        </div>
        <div className="text-[10px] text-white/15">ID: {briefing.id.slice(0, 8)}...</div>
      </div>

      {/* ─── Delete Modal ─── */}
      <ConfirmModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Eliminar briefing"
        message={`¿Estás seguro? Se eliminará permanentemente el briefing de ${briefing.clientName} y todos sus datos. Esta acción no se puede deshacer.`}
        confirmLabel={deleting ? "Eliminando..." : "Eliminar"}
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
