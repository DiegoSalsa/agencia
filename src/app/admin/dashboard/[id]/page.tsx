"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BriefingRecord } from "@/types/briefing";
import {
    ArrowLeft,
    FileText,
    Loader2,
    Save,
    Copy,
    Check,
    CheckCircle2,
    Clock,
    Eye,
    Inbox,
    Trash2,
    AlertTriangle,
    Mail,
    Phone,
    Building,
    Calendar,
    DollarSign,
    Palette,
    Target,
    Settings,
    MessageSquare,
    ExternalLink,
    Printer,
} from "lucide-react";

/* ─── Config ─── */
const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    nuevo: { label: "Nuevo", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/25", icon: <Inbox size={14} /> },
    revisado: { label: "Revisado", color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/25", icon: <Eye size={14} /> },
    en_progreso: { label: "En Progreso", color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/25", icon: <Clock size={14} /> },
    completado: { label: "Completado", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/25", icon: <CheckCircle2 size={14} /> },
};

const typeConfig: Record<string, { label: string; color: string; price: string }> = {
    LANDING: { label: "Landing Page", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25", price: "$220.000" },
    WEB_CORPORATIVA: { label: "Web Corporativa", color: "bg-amber-500/15 text-amber-400 border-amber-500/25", price: "$380.000" },
    ECOMMERCE: { label: "E-commerce", color: "bg-rose-500/15 text-rose-400 border-rose-500/25", price: "$550.000" },
};

const fieldLabels: Record<string, string> = {
    firstName: "Nombre", lastNameP: "Apellido paterno", lastNameM: "Apellido materno",
    businessName: "Nombre del negocio", industry: "Rubro",
    email: "Email", phone: "Teléfono", mainGoal: "Objetivo principal",
    targetAudience: "Público objetivo", mainCTA: "Acción principal (CTA)",
    uniqueValue: "Valor diferencial", sections: "Secciones", sectionNotes: "Notas de secciones",
    designStyle: "Estilo visual", primaryColor: "Color principal", secondaryColor: "Color secundario",
    referenceUrls: "URLs de referencia", hasLogo: "Tiene logo", hasPhotos: "Tiene fotos",
    hasTexts: "Tiene textos", additionalContent: "Contenido adicional", features: "Funcionalidades",
    hasDomain: "Tiene dominio", domainName: "Nombre de dominio", socialMedia: "Redes sociales",
    urgency: "Urgencia", budget: "Presupuesto", additionalNotes: "Notas adicionales",
    instagramUrl: "Instagram", facebookUrl: "Facebook", websiteUrl: "Sitio web actual",
    storeObjective: "Objetivo de la tienda", competitorUrls: "URLs de competencia",
    expectedRevenue: "Facturación mensual esperada", productCount: "Cantidad de productos",
    productType: "Tipo de productos", hasVariants: "¿Tiene variantes?",
    categoryCount: "Cantidad de categorías", productDescription: "Descripción de productos",
    hasBulkImport: "¿Importación masiva?", pages: "Páginas del sitio",
    pagesDescription: "Descripción de páginas", paymentMethods: "Métodos de pago",
    paymentAccountStatus: "Estado de cuentas de pago", needsInvoicing: "¿Necesita facturación?",
    currencies: "Monedas aceptadas", paymentNotes: "Notas de pago", shippingModel: "Modelo de envío",
    shippingZones: "Zonas de envío", freeShippingThreshold: "Umbral envío gratis",
    handlesOwnShipping: "¿Gestiona su propio envío?", shippingNotes: "Notas de envío",
    accountSystem: "Sistema de cuentas", guestTrackingMethod: "Seguimiento invitados",
    customerFeatures: "Funciones de cliente", inventoryLevel: "Nivel de inventario",
    customerNotes: "Notas de clientes", accentColor: "Color de acento",
    hasProductPhotos: "¿Tiene fotos de productos?", productDescriptionStyle: "Estilo de descripciones",
    marketingFeatures: "Funciones de marketing", socialPlatforms: "Plataformas sociales",
    seoLevel: "Nivel de SEO", marketingNotes: "Notas de marketing",
    ecommerceFeatures: "Funcionalidades e-commerce",
};

type Tab = "contacto" | "contenido" | "diseno" | "extras" | "notas";

export default function BriefingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [briefing, setBriefing] = useState<BriefingRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>("contacto");
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [showDelete, setShowDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("admin_token");
        if (!token) { router.push("/admin"); return; }

        fetch(`/api/briefings/${params.id}`, { headers: { "x-admin-token": token } })
            .then((res) => { if (res.status === 401) { router.push("/admin"); return null; } return res.json(); })
            .then((data) => { if (data) { setBriefing(data); setSummary(data.summary || ""); } setLoading(false); })
            .catch(() => setLoading(false));
    }, [params.id, router]);

    const handleSaveSummary = async () => {
        const token = sessionStorage.getItem("admin_token");
        if (!token) return;
        setSaving(true);
        try {
            await fetch(`/api/briefings/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "x-admin-token": token },
                body: JSON.stringify({ summary }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) { console.error("Save error:", err); }
        finally { setSaving(false); }
    };

    const handleStatusChange = async (newStatus: string) => {
        const token = sessionStorage.getItem("admin_token");
        if (!token) return;
        try {
            const res = await fetch(`/api/briefings/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "x-admin-token": token },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            setBriefing(data);
        } catch (err) { console.error("Status change error:", err); }
    };

    const handleExportDocx = async () => {
        const token = sessionStorage.getItem("admin_token");
        if (!token || !briefing) return;
        const res = await fetch(`/api/briefings/export/docx?id=${briefing.id}`, { headers: { "x-admin-token": token } });
        if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url;
            a.download = `briefing_${briefing.clientName.replace(/\s+/g, "_")}.docx`;
            a.click(); URL.revokeObjectURL(url);
        }
    };

    const handleDelete = async () => {
        const token = sessionStorage.getItem("admin_token");
        if (!token || !briefing) return;
        setDeleting(true);
        try {
            await fetch(`/api/briefings/${briefing.id}`, { method: "DELETE", headers: { "x-admin-token": token } });
            router.push("/admin/dashboard");
        } catch (err) { console.error("Delete error:", err); setDeleting(false); }
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 1500);
    };

    const handlePrint = () => window.print();

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 size={32} className="text-indigo-500 animate-spin" />
                    <p className="text-sm text-white/30">Cargando briefing...</p>
                </div>
            </main>
        );
    }

    if (!briefing) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={28} className="text-white/20" />
                    </div>
                    <h1 className="text-xl font-bold text-white mb-2">Briefing no encontrado</h1>
                    <p className="text-sm text-white/40 mb-6">El briefing fue eliminado o no existe</p>
                    <Link href="/admin/dashboard" className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/20 transition-all">
                        Volver al dashboard
                    </Link>
                </div>
            </main>
        );
    }

    const sc = statusConfig[briefing.status] || statusConfig.nuevo;
    const tc = typeConfig[briefing.type] || typeConfig.LANDING;

    const tabs: { id: Tab; label: string; icon: React.ReactNode; data?: Record<string, unknown> }[] = [
        { id: "contacto", label: "Contacto", icon: <Mail size={14} />, data: briefing.contactData },
        { id: "contenido", label: "Contenido", icon: <Target size={14} />, data: briefing.contentData },
        { id: "diseno", label: "Diseño", icon: <Palette size={14} />, data: briefing.designData },
        { id: "extras", label: "Extras", icon: <Settings size={14} />, data: briefing.extraData },
        { id: "notas", label: "Notas", icon: <MessageSquare size={14} /> },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);

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
        if (entries.length === 0) return (
            <div className="text-center py-12">
                <p className="text-sm text-white/30">No hay datos en esta sección</p>
            </div>
        );

        return (
            <div className="divide-y divide-white/5">
                {entries.map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 group">
                        <span className="text-xs text-white/40 sm:w-44 flex-shrink-0 font-medium pt-0.5">
                            {fieldLabels[key] || key}
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
        <main className="min-h-screen bg-slate-950 print:bg-white">
            {/* ─── Header ─── */}
            <div className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-xl border-b border-white/5 print:hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        <Link href="/admin/dashboard"
                            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
                            <ArrowLeft size={16} />
                            <span>Dashboard</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <select value={briefing.status} onChange={(e) => handleStatusChange(e.target.value)}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 focus:outline-none cursor-pointer">
                                <option value="nuevo" className="bg-slate-900">Nuevo</option>
                                <option value="revisado" className="bg-slate-900">Revisado</option>
                                <option value="en_progreso" className="bg-slate-900">En Progreso</option>
                                <option value="completado" className="bg-slate-900">Completado</option>
                            </select>
                            <button onClick={handleExportDocx}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs hover:bg-indigo-500/20 transition-all">
                                <FileText size={12} /><span className="hidden sm:inline">DOCX</span>
                            </button>
                            <button onClick={handlePrint}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg text-xs hover:bg-white/10 hover:text-white/60 transition-all">
                                <Printer size={12} /><span className="hidden sm:inline">Imprimir</span>
                            </button>
                            <button onClick={() => setShowDelete(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/30 rounded-lg text-xs hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* ─── Hero Card ─── */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 print:border-gray-200 print:bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                                <h1 className="text-2xl font-bold text-white print:text-black">{briefing.clientName}</h1>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${sc.bg} ${sc.color}`}>
                                    {sc.icon}{sc.label}
                                </span>
                            </div>

                            {/* Quick info chips */}
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                {briefing.clientEmail && (
                                    <button onClick={() => copyToClipboard(briefing.clientEmail!, "hero-email")}
                                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors group">
                                        <Mail size={12} /><span>{briefing.clientEmail}</span>
                                        {copiedField === "hero-email"
                                            ? <Check size={10} className="text-emerald-400" />
                                            : <Copy size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                                    </button>
                                )}
                                <div className="flex items-center gap-1.5 text-xs text-white/30">
                                    <Calendar size={12} />
                                    <span>{new Date(briefing.createdAt).toLocaleString("es-CL", {
                                        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                                    })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Type & Price */}
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
                            {Object.entries(statusConfig).map(([key, cfg], i) => {
                                const isActive = briefing.status === key;
                                const isPast = Object.keys(statusConfig).indexOf(briefing.status) > i;
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
                    {/* Tab bar */}
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

                    {/* Tab content */}
                    <div className="p-6">
                        {activeTab === "notas" ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-white/70">Notas internas / Resumen</h3>
                                    {saved && (
                                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                                            <Check size={12} /> Guardado
                                        </span>
                                    )}
                                </div>
                                <textarea
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    rows={8}
                                    placeholder="Agrega notas internas, resumen del proyecto, pendientes, acuerdos con el cliente..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y min-h-[120px]"
                                />
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-white/20">{summary.length} caracteres</span>
                                    <button onClick={handleSaveSummary} disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/20 transition-all disabled:opacity-50">
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

                {/* ─── Print-only: show all sections ─── */}
                <div className="hidden print:block space-y-6">
                    {tabs.filter(t => t.data).map(tab => (
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
                            <a href={`mailto:${briefing.clientEmail}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg text-xs hover:bg-white/10 hover:text-white/60 transition-all">
                                <Mail size={12} /> Enviar email
                            </a>
                        )}
                        <button onClick={() => {
                            const text = `Briefing: ${briefing.clientName}\nTipo: ${tc.label}\nEstado: ${sc.label}\nPrecio: ${tc.price} CLP\nFecha: ${new Date(briefing.createdAt).toLocaleString("es-CL")}`;
                            copyToClipboard(text, "summary-copy");
                        }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg text-xs hover:bg-white/10 hover:text-white/60 transition-all">
                            {copiedField === "summary-copy" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            Copiar resumen
                        </button>
                    </div>
                    <div className="text-[10px] text-white/15">
                        ID: {briefing.id.slice(0, 8)}...
                    </div>
                </div>
            </div>

            {/* ─── Delete Modal ─── */}
            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center">
                                <AlertTriangle size={20} className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">Eliminar briefing</h3>
                                <p className="text-xs text-white/40">de {briefing.clientName}</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/60 mb-6">
                            ¿Estás seguro? Se eliminará permanentemente el briefing y todos sus datos. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowDelete(false)}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all">
                                Cancelar
                            </button>
                            <button onClick={handleDelete} disabled={deleting}
                                className="flex-1 px-4 py-2 bg-red-500/15 border border-red-500/25 text-red-400 rounded-xl text-sm hover:bg-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                {deleting ? "Eliminando..." : "Eliminar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
