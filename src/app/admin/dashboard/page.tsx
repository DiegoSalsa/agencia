"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    FileDown,
    FileText,
    Filter,
    Loader2,
    LogOut,
    Eye,
    Clock,
    CheckCircle2,
    Inbox,
    RefreshCw,
    Search,
    BarChart3,
    TrendingUp,
    Users,
    Trash2,
    ArrowUpDown,
    LayoutGrid,
    LayoutList,
    Calendar,
    Mail,
    ExternalLink,
    AlertTriangle,
    X,
    Megaphone,
    Tag,
} from "lucide-react";
import { BriefingRecord, BriefingStatus } from "@/types/briefing";

/* ─── Config ─── */
const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    nuevo: { label: "Nuevo", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/25", icon: <Inbox size={12} /> },
    revisado: { label: "Revisado", color: "text-yellow-400", bg: "bg-yellow-500/15 border-yellow-500/25", icon: <Eye size={12} /> },
    en_progreso: { label: "En Progreso", color: "text-purple-400", bg: "bg-purple-500/15 border-purple-500/25", icon: <Clock size={12} /> },
    completado: { label: "Completado", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/25", icon: <CheckCircle2 size={12} /> },
};

const typeConfig: Record<string, { label: string; color: string; price: string }> = {
    LANDING: { label: "Landing Page", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25", price: "$220.000" },
    WEB_CORPORATIVA: { label: "Web Corporativa", color: "bg-amber-500/15 text-amber-400 border-amber-500/25", price: "$380.000" },
    ECOMMERCE: { label: "E-commerce", color: "bg-rose-500/15 text-rose-400 border-rose-500/25", price: "$550.000" },
    OFERTA: { label: "Oferta Landing", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", price: "$170.000" },
};

type SortKey = "date-desc" | "date-asc" | "name-asc" | "name-desc" | "status";
type ViewMode = "list" | "grid";

export default function AdminDashboard() {
    const router = useRouter();
    const [briefings, setBriefings] = useState<BriefingRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortKey>("date-desc");
    const [viewMode, setViewMode] = useState<ViewMode>("list");
    const [token, setToken] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBriefings = useCallback(async (adminToken: string) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterType) params.set("type", filterType);
            if (filterStatus) params.set("status", filterStatus);

            const res = await fetch(`/api/briefings?${params.toString()}`, {
                headers: { "x-admin-token": adminToken },
            });

            if (res.status === 401) {
                sessionStorage.removeItem("admin_token");
                router.push("/admin");
                return;
            }

            const data = await res.json();
            setBriefings(data.data || []);
        } catch (err) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    }, [filterType, filterStatus, router]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchBriefings(token);
        setRefreshing(false);
    };

    useEffect(() => {
        const storedToken = sessionStorage.getItem("admin_token");
        if (!storedToken) { router.push("/admin"); return; }
        setToken(storedToken);
        fetchBriefings(storedToken);
    }, [fetchBriefings, router]);

    /* ─── Stats ─── */
    const stats = useMemo(() => {
        const total = briefings.length;
        const nuevo = briefings.filter(b => b.status === "nuevo").length;
        const enProgreso = briefings.filter(b => b.status === "en_progreso").length;
        const completado = briefings.filter(b => b.status === "completado").length;
        const thisWeek = briefings.filter((b) => {
            const d = new Date(b.createdAt);
            const now = new Date();
            const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
            return diffDays <= 7;
        }).length;
        return { total, nuevo, enProgreso, completado, thisWeek };
    }, [briefings]);

    /* ─── Filtered & sorted ─── */
    const displayedBriefings = useMemo(() => {
        let result = [...briefings];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (b) =>
                    b.clientName.toLowerCase().includes(q) ||
                    (b.clientEmail || "").toLowerCase().includes(q) ||
                    b.type.toLowerCase().includes(q)
            );
        }

        // Sort
        switch (sortBy) {
            case "date-desc":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "date-asc":
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "name-asc":
                result.sort((a, b) => a.clientName.localeCompare(b.clientName));
                break;
            case "name-desc":
                result.sort((a, b) => b.clientName.localeCompare(a.clientName));
                break;
            case "status": {
                const order = ["nuevo", "en_progreso", "revisado", "completado"];
                result.sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));
                break;
            }
        }

        return result;
    }, [briefings, searchQuery, sortBy]);

    /* ─── Actions ─── */
    const handleExportCSV = async () => {
        const params = new URLSearchParams();
        if (filterType) params.set("type", filterType);

        const res = await fetch(`/api/briefings/export/csv?${params.toString()}`, {
            headers: { "x-admin-token": token },
        });

        if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `briefings_${new Date().toISOString().split("T")[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await fetch(`/api/briefings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-token": token,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            // Optimistic update
            setBriefings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: newStatus as BriefingStatus } : b))
            );
        } catch (err) {
            console.error("Status update error:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/briefings/${id}`, {
                method: "DELETE",
                headers: { "x-admin-token": token },
            });
            setBriefings((prev) => prev.filter((b) => b.id !== id));
            setDeleteConfirm(null);
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `hace ${mins}m`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `hace ${hrs}h`;
        const days = Math.floor(hrs / 24);
        if (days < 7) return `hace ${days}d`;
        return new Date(dateStr).toLocaleDateString("es-CL");
    };

    /* ─── Stat Card ─── */
    const StatCard = ({ icon, label, value, color, sub }: { icon: React.ReactNode; label: string; value: number; color: string; sub?: string }) => (
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
                <span className="text-2xl font-bold text-white">{value}</span>
            </div>
            <p className="text-xs text-white/50 font-medium">{label}</p>
            {sub && <p className="text-[10px] text-white/25 mt-0.5">{sub}</p>}
        </div>
    );

    return (
        <main className="min-h-screen bg-slate-950">
            {/* ─── Header ─── */}
            <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-lg font-bold text-white tracking-tight hidden sm:block">
                                Puro<span className="text-indigo-400">Code</span>
                            </h1>
                            <div className="h-5 w-px bg-white/10 hidden sm:block" />
                            <span className="text-sm text-white/50 font-medium">Dashboard</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRefresh}
                                className={`p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all ${refreshing ? "animate-spin" : ""}`}
                                title="Refrescar"
                            >
                                <RefreshCw size={16} />
                            </button>
                            <button
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-all"
                            >
                                <FileDown size={14} />
                                <span className="hidden sm:inline">Exportar CSV</span>
                            </button>
                            <Link
                                href="/admin/dashboard/projects"
                                className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-xs hover:bg-purple-500/20 transition-all"
                            >
                                <Users size={14} />
                                <span className="hidden sm:inline">Proyectos</span>
                            </Link>
                            <Link
                                href="/admin/dashboard/promotions"
                                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/20 transition-all"
                            >
                                <Megaphone size={14} />
                                <span className="hidden sm:inline">Ofertas</span>
                            </Link>
                            <a
                                href="/formulario"
                                target="_blank"
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs hover:bg-indigo-500/20 transition-all"
                            >
                                <ExternalLink size={14} />
                                <span className="hidden sm:inline">Ver Formulario</span>
                            </a>
                            <button
                                onClick={() => { sessionStorage.removeItem("admin_token"); router.push("/admin"); }}
                                className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                                title="Cerrar sesión"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                {/* ─── Stats Row ─── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard icon={<Users size={18} className="text-indigo-400" />} label="Total Briefings" value={stats.total} color="bg-indigo-500/15" sub={`${stats.thisWeek} esta semana`} />
                    <StatCard icon={<Inbox size={18} className="text-blue-400" />} label="Nuevos" value={stats.nuevo} color="bg-blue-500/15" sub="Pendientes de revisión" />
                    <StatCard icon={<TrendingUp size={18} className="text-purple-400" />} label="En Progreso" value={stats.enProgreso} color="bg-purple-500/15" sub="En desarrollo" />
                    <StatCard icon={<BarChart3 size={18} className="text-emerald-400" />} label="Completados" value={stats.completado} color="bg-emerald-500/15" sub="Proyectos finalizados" />
                </div>

                {/* ─── Search & Filters Bar ─── */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar por nombre, email o tipo..."
                                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {/* Filters */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 text-white/30 text-xs">
                                <Filter size={12} />
                            </div>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
                                <option value="" className="bg-slate-900">Todos los tipos</option>
                                <option value="LANDING" className="bg-slate-900">Landing Page</option>
                                <option value="WEB_CORPORATIVA" className="bg-slate-900">Web Corporativa</option>
                                <option value="ECOMMERCE" className="bg-slate-900">E-commerce</option>
                            </select>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
                                <option value="" className="bg-slate-900">Todos los estados</option>
                                <option value="nuevo" className="bg-slate-900">Nuevo</option>
                                <option value="revisado" className="bg-slate-900">Revisado</option>
                                <option value="en_progreso" className="bg-slate-900">En Progreso</option>
                                <option value="completado" className="bg-slate-900">Completado</option>
                            </select>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}
                                className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
                                <option value="date-desc" className="bg-slate-900">Más reciente</option>
                                <option value="date-asc" className="bg-slate-900">Más antiguo</option>
                                <option value="name-asc" className="bg-slate-900">Nombre A-Z</option>
                                <option value="name-desc" className="bg-slate-900">Nombre Z-A</option>
                                <option value="status" className="bg-slate-900">Por estado</option>
                            </select>
                            <div className="hidden sm:flex items-center border border-white/10 rounded-lg overflow-hidden">
                                <button onClick={() => setViewMode("list")}
                                    className={`p-2 transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}>
                                    <LayoutList size={14} />
                                </button>
                                <button onClick={() => setViewMode("grid")}
                                    className={`p-2 transition-colors ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}>
                                    <LayoutGrid size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Active filters count */}
                    {(filterType || filterStatus || searchQuery) && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                            <span className="text-[10px] text-white/30">
                                {displayedBriefings.length} de {briefings.length} resultados
                            </span>
                            <button onClick={() => { setFilterType(""); setFilterStatus(""); setSearchQuery(""); }}
                                className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* ─── Content ─── */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 size={32} className="text-indigo-500 animate-spin" />
                        <p className="text-sm text-white/30">Cargando briefings...</p>
                    </div>
                ) : displayedBriefings.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Inbox size={28} className="text-white/20" />
                        </div>
                        <p className="text-white/40 text-lg font-medium">
                            {searchQuery ? "Sin resultados" : "No hay briefings todavía"}
                        </p>
                        <p className="text-white/20 text-sm mt-2 max-w-sm mx-auto">
                            {searchQuery
                                ? `No se encontraron briefings para "${searchQuery}"`
                                : "Los briefings aparecerán aquí cuando tus clientes los envíen desde el formulario"}
                        </p>
                        {!searchQuery && (
                            <a href="/formulario" target="_blank"
                                className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm hover:bg-indigo-500/20 transition-all">
                                <ExternalLink size={14} />
                                Ir al formulario
                            </a>
                        )}
                    </div>
                ) : viewMode === "grid" ? (
                    /* ─── Grid View ─── */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedBriefings.map((b) => {
                            const sc = statusConfig[b.status] || statusConfig.nuevo;
                            const tc = typeConfig[b.type] || typeConfig.LANDING;
                            return (
                                <div key={b.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all group flex flex-col">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-white truncate">{b.clientName}</h3>
                                            <p className="text-xs text-white/30 truncate mt-0.5">{b.clientEmail || "Sin email"}</p>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${sc.bg} ${sc.color} flex-shrink-0 ml-2`}>
                                            {sc.icon}{sc.label}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] border ${tc.color}`}>{tc.label}</span>
                                        <span className="text-[10px] text-white/20">·</span>
                                        <span className="text-[10px] text-emerald-400/70 font-medium">{tc.price} CLP</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-[10px] text-white/25 mb-4 mt-auto">
                                        <Calendar size={10} />
                                        <span>{timeAgo(b.createdAt)}</span>
                                    </div>

                                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                                        <select value={b.status} onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                            className="flex-1 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 focus:outline-none cursor-pointer">
                                            <option value="nuevo" className="bg-slate-900">Nuevo</option>
                                            <option value="revisado" className="bg-slate-900">Revisado</option>
                                            <option value="en_progreso" className="bg-slate-900">En Progreso</option>
                                            <option value="completado" className="bg-slate-900">Completado</option>
                                        </select>
                                        <Link href={`/admin/dashboard/${b.id}`}
                                            className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all">
                                            <Eye size={12} />
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                const res = await fetch(`/api/briefings/export/docx?id=${b.id}`, { headers: { "x-admin-token": token } });
                                                if (res.ok) {
                                                    const blob = await res.blob();
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement("a"); a.href = url;
                                                    a.download = `briefing_${b.clientName.replace(/\s+/g, "_")}.docx`;
                                                    a.click(); URL.revokeObjectURL(url);
                                                }
                                            }}
                                            className="p-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg hover:bg-white/10 hover:text-white/70 transition-all">
                                            <FileText size={12} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(b.id)}
                                            className="p-1.5 bg-white/5 border border-white/10 text-white/30 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* ─── List View ─── */
                    <div className="space-y-2">
                        {/* Table header */}
                        <div className="hidden sm:grid grid-cols-[1fr_120px_110px_100px_80px_180px] gap-4 px-4 py-2 text-[10px] text-white/30 font-medium uppercase tracking-wider">
                            <span>Cliente</span>
                            <span>Tipo</span>
                            <span>Estado</span>
                            <span>Precio</span>
                            <span>Fecha</span>
                            <span className="text-right">Acciones</span>
                        </div>
                        {displayedBriefings.map((b) => {
                            const sc = statusConfig[b.status] || statusConfig.nuevo;
                            const tc = typeConfig[b.type] || typeConfig.LANDING;
                            return (
                                <div key={b.id}
                                    className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                                    <div className="sm:grid sm:grid-cols-[1fr_120px_110px_100px_80px_180px] sm:gap-4 sm:items-center space-y-3 sm:space-y-0">
                                        {/* Client */}
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-semibold text-white truncate">{b.clientName}</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <Mail size={10} className="text-white/20" />
                                                <span className="text-[11px] text-white/30 truncate">{b.clientEmail || "Sin email"}</span>
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] border w-fit ${tc.color}`}>
                                            {tc.label}
                                        </span>

                                        {/* Status */}
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border w-fit ${sc.bg} ${sc.color}`}>
                                            {sc.icon}{sc.label}
                                        </span>

                                        {/* Price */}
                                        <span className="text-xs text-emerald-400/70 font-medium">{tc.price}</span>

                                        {/* Date */}
                                        <span className="text-[11px] text-white/25">{timeAgo(b.createdAt)}</span>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1.5 justify-end">
                                            <select value={b.status} onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                                className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 focus:outline-none cursor-pointer">
                                                <option value="nuevo" className="bg-slate-900">Nuevo</option>
                                                <option value="revisado" className="bg-slate-900">Revisado</option>
                                                <option value="en_progreso" className="bg-slate-900">En Progreso</option>
                                                <option value="completado" className="bg-slate-900">Completado</option>
                                            </select>
                                            <Link href={`/admin/dashboard/${b.id}`}
                                                className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-[10px] hover:bg-indigo-500/20 transition-all">
                                                <Eye size={11} /><span>Ver</span>
                                            </Link>
                                            <button
                                                onClick={async () => {
                                                    const res = await fetch(`/api/briefings/export/docx?id=${b.id}`, { headers: { "x-admin-token": token } });
                                                    if (res.ok) {
                                                        const blob = await res.blob();
                                                        const url = URL.createObjectURL(blob);
                                                        const a = document.createElement("a"); a.href = url;
                                                        a.download = `briefing_${b.clientName.replace(/\s+/g, "_")}.docx`;
                                                        a.click(); URL.revokeObjectURL(url);
                                                    }
                                                }}
                                                className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 text-white/40 rounded-lg text-[10px] hover:bg-white/10 hover:text-white/70 transition-all">
                                                <FileText size={11} /><span>DOCX</span>
                                            </button>
                                            <button onClick={() => setDeleteConfirm(b.id)}
                                                className="p-1 bg-white/5 border border-white/10 text-white/25 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100">
                                                <Trash2 size={11} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ─── Delete Confirmation Modal ─── */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-500/15 rounded-xl flex items-center justify-center">
                                <AlertTriangle size={20} className="text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">Eliminar briefing</h3>
                                <p className="text-xs text-white/40">Esta acción no se puede deshacer</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/60 mb-6">
                            ¿Estás seguro de que quieres eliminar este briefing permanentemente?
                        </p>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all">
                                Cancelar
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-4 py-2 bg-red-500/15 border border-red-500/25 text-red-400 rounded-xl text-sm hover:bg-red-500/25 transition-all">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
