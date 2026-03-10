"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  FileDown,
  FileText,
  Filter,
  Eye,
  Inbox,
  RefreshCw,
  Search,
  Trash2,
  LayoutGrid,
  LayoutList,
  Calendar,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
} from "lucide-react";
import { BriefingRecord, BriefingStatus } from "@/types/briefing";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/context/ToastContext";
import {
  BRIEFING_STATUS_CONFIG,
  BRIEFING_TYPE_CONFIG,
  BRIEFING_STATUS_OPTIONS,
  BRIEFING_TYPE_OPTIONS,
  timeAgo,
} from "@/lib/admin/constants";
import { LoadingState, EmptyState, ConfirmModal, StatusBadge, TypeBadge } from "@/components/admin";

const ITEMS_PER_PAGE = 15;

type SortKey = "date-desc" | "date-asc" | "name-asc" | "name-desc" | "status";
type ViewMode = "list" | "grid";

export default function BriefingsPage() {
  const { token } = useAdminAuth();
  const toast = useToast();

  const [briefings, setBriefings] = useState<BriefingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("date-desc");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState("");

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ─── Fetch ─── */
  const fetchBriefings = useCallback(
    async () => {
      if (!token) return;
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filterType) params.set("type", filterType);
        if (filterStatus) params.set("status", filterStatus);

        const res = await fetch(`/api/briefings?${params.toString()}`, {
          headers: { "x-admin-token": token },
        });

        if (res.ok) {
          const data = await res.json();
          setBriefings(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching:", err);
        toast.error("Error al cargar briefings");
      } finally {
        setLoading(false);
      }
    },
    [token, filterType, filterStatus, toast]
  );

  useEffect(() => {
    if (token) fetchBriefings();
  }, [token, fetchBriefings]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBriefings();
    setRefreshing(false);
  };

  /* ─── Filtered & sorted ─── */
  const displayedBriefings = useMemo(() => {
    let result = [...briefings];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.clientName.toLowerCase().includes(q) ||
          (b.clientEmail || "").toLowerCase().includes(q) ||
          b.type.toLowerCase().includes(q)
      );
    }

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

  /* ─── Pagination ─── */
  const totalPages = Math.ceil(displayedBriefings.length / ITEMS_PER_PAGE);
  const paginatedBriefings = useMemo(
    () => displayedBriefings.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [displayedBriefings, currentPage]
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, filterStatus, sortBy]);

  /* ─── Actions ─── */
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/briefings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ status: newStatus }),
      });
      setBriefings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus as BriefingStatus } : b))
      );
      toast.success("Estado actualizado");
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/briefings/${deleteTarget}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      setBriefings((prev) => prev.filter((b) => b.id !== deleteTarget));
      setDeleteTarget(null);
      toast.success("Briefing eliminado");
    } catch {
      toast.error("Error al eliminar");
    } finally {
      setDeleting(false);
    }
  };

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
      toast.success("CSV exportado");
    }
  };

  const handleDocxExport = async (b: BriefingRecord) => {
    const res = await fetch(`/api/briefings/export/docx?id=${b.id}`, {
      headers: { "x-admin-token": token },
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `briefing_${b.clientName.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  /* ─── Bulk Actions ─── */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedBriefings.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedBriefings.map((b) => b.id)));
    }
  };

  const executeBulkAction = async () => {
    if (!bulkAction || selectedIds.size === 0) return;

    if (bulkAction === "delete") {
      try {
        await Promise.all(
          Array.from(selectedIds).map((id) =>
            fetch(`/api/briefings/${id}`, {
              method: "DELETE",
              headers: { "x-admin-token": token },
            })
          )
        );
        setBriefings((prev) => prev.filter((b) => !selectedIds.has(b.id)));
        toast.success(`${selectedIds.size} briefings eliminados`);
      } catch {
        toast.error("Error en acción masiva");
      }
    } else {
      // Status change
      try {
        await Promise.all(
          Array.from(selectedIds).map((id) =>
            fetch(`/api/briefings/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json", "x-admin-token": token },
              body: JSON.stringify({ status: bulkAction }),
            })
          )
        );
        setBriefings((prev) =>
          prev.map((b) =>
            selectedIds.has(b.id) ? { ...b, status: bulkAction as BriefingStatus } : b
          )
        );
        toast.success(`${selectedIds.size} briefings actualizados`);
      } catch {
        toast.error("Error en acción masiva");
      }
    }

    setSelectedIds(new Set());
    setBulkAction("");
  };

  if (loading) return <LoadingState message="Cargando briefings..." />;

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Briefings</h1>
          <p className="text-sm text-white/40 mt-0.5">
            {briefings.length} briefing{briefings.length !== 1 ? "s" : ""} en total
          </p>
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
        </div>
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
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
            >
              <option value="" className="bg-slate-900">Todos los tipos</option>
              {BRIEFING_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
            >
              <option value="" className="bg-slate-900">Todos los estados</option>
              {BRIEFING_STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
            >
              <option value="date-desc" className="bg-slate-900">Más reciente</option>
              <option value="date-asc" className="bg-slate-900">Más antiguo</option>
              <option value="name-asc" className="bg-slate-900">Nombre A-Z</option>
              <option value="name-desc" className="bg-slate-900">Nombre Z-A</option>
              <option value="status" className="bg-slate-900">Por estado</option>
            </select>
            <div className="hidden sm:flex items-center border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
              >
                <LayoutList size={14} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
              >
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
            <button
              onClick={() => { setFilterType(""); setFilterStatus(""); setSearchQuery(""); }}
              className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* ─── Bulk Actions Bar ─── */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 animate-slideUp">
          <span className="text-sm text-indigo-400 font-medium">
            {selectedIds.size} seleccionado{selectedIds.size > 1 ? "s" : ""}
          </span>
          <div className="h-4 w-px bg-white/10" />
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 focus:outline-none cursor-pointer"
          >
            <option value="" className="bg-slate-900">Acción masiva...</option>
            {BRIEFING_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900">
                Cambiar a: {opt.label}
              </option>
            ))}
            <option value="delete" className="bg-slate-900">Eliminar seleccionados</option>
          </select>
          <button
            onClick={executeBulkAction}
            disabled={!bulkAction}
            className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-lg text-xs hover:bg-indigo-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Aplicar
          </button>
          <button
            onClick={() => { setSelectedIds(new Set()); setBulkAction(""); }}
            className="ml-auto text-[10px] text-white/30 hover:text-white/60 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* ─── Content ─── */}
      {displayedBriefings.length === 0 ? (
        <EmptyState
          icon={<Inbox size={28} />}
          title={searchQuery ? "Sin resultados" : "No hay briefings todavía"}
          description={
            searchQuery
              ? `No se encontraron briefings para "${searchQuery}"`
              : "Los briefings aparecerán aquí cuando tus clientes los envíen desde el formulario"
          }
        />
      ) : viewMode === "grid" ? (
        /* ─── Grid View ─── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedBriefings.map((b) => {
            const tc = BRIEFING_TYPE_CONFIG[b.type] || BRIEFING_TYPE_CONFIG.LANDING;
            const isSelected = selectedIds.has(b.id);
            return (
              <div
                key={b.id}
                className={`bg-white/[0.02] border rounded-xl p-5 hover:bg-white/[0.04] transition-all group flex flex-col ${
                  isSelected ? "border-indigo-500/40 bg-indigo-500/[0.03]" : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <button onClick={() => toggleSelect(b.id)} className="text-white/20 hover:text-white/60 transition-colors flex-shrink-0">
                      {isSelected ? <CheckSquare size={14} className="text-indigo-400" /> : <Square size={14} />}
                    </button>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{b.clientName}</h3>
                      <p className="text-xs text-white/30 truncate mt-0.5">{b.clientEmail || "Sin email"}</p>
                    </div>
                  </div>
                  <StatusBadge status={b.status} size="sm" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <TypeBadge type={b.type} />
                  <span className="text-[10px] text-white/20">·</span>
                  <span className="text-[10px] text-emerald-400/70 font-medium">{tc.price} CLP</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white/25 mb-4 mt-auto">
                  <Calendar size={10} />
                  <span>{timeAgo(b.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="flex-1 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 focus:outline-none cursor-pointer"
                  >
                    {BRIEFING_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                    ))}
                  </select>
                  <Link
                    href={`/admin/dashboard/briefings/${b.id}`}
                    className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-all"
                  >
                    <Eye size={12} />
                  </Link>
                  <button
                    onClick={() => handleDocxExport(b)}
                    className="p-1.5 bg-white/5 border border-white/10 text-white/40 rounded-lg hover:bg-white/10 hover:text-white/70 transition-all"
                  >
                    <FileText size={12} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(b.id)}
                    className="p-1.5 bg-white/5 border border-white/10 text-white/30 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
                  >
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
          <div className="hidden sm:grid grid-cols-[32px_1fr_120px_110px_100px_120px_200px] gap-4 px-4 py-2 text-[10px] text-white/30 font-medium uppercase tracking-wider">
            <button onClick={toggleSelectAll} className="text-white/20 hover:text-white/60 transition-colors">
              {selectedIds.size === paginatedBriefings.length && paginatedBriefings.length > 0 ? (
                <CheckSquare size={14} className="text-indigo-400" />
              ) : (
                <Square size={14} />
              )}
            </button>
            <span>Cliente</span>
            <span>Tipo</span>
            <span>Estado</span>
            <span>Precio</span>
            <span>Fecha</span>
            <span className="text-right">Acciones</span>
          </div>
          {paginatedBriefings.map((b) => {
            const tc = BRIEFING_TYPE_CONFIG[b.type] || BRIEFING_TYPE_CONFIG.LANDING;
            const isSelected = selectedIds.has(b.id);
            return (
              <div
                key={b.id}
                className={`border rounded-xl px-4 py-3 hover:bg-white/[0.04] transition-all group ${
                  isSelected
                    ? "bg-indigo-500/[0.03] border-indigo-500/30"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="sm:grid sm:grid-cols-[32px_1fr_120px_110px_100px_120px_200px] sm:gap-4 sm:items-center space-y-3 sm:space-y-0">
                  {/* Checkbox */}
                  <button onClick={() => toggleSelect(b.id)} className="text-white/20 hover:text-white/60 transition-colors hidden sm:block">
                    {isSelected ? <CheckSquare size={14} className="text-indigo-400" /> : <Square size={14} />}
                  </button>

                  {/* Client */}
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{b.clientName}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Mail size={10} className="text-white/20 flex-shrink-0" />
                      <span className="text-[11px] text-white/30 truncate">{b.clientEmail || "Sin email"}</span>
                    </div>
                  </div>

                  {/* Type */}
                  <TypeBadge type={b.type} />

                  {/* Status */}
                  <StatusBadge status={b.status} size="sm" />

                  {/* Price */}
                  <span className="text-xs text-emerald-400/70 font-medium">{tc.price}</span>

                  {/* Date */}
                  <span className="text-[11px] text-white/30 whitespace-nowrap overflow-hidden text-ellipsis">{timeAgo(b.createdAt)}</span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 justify-end flex-shrink-0">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/50 focus:outline-none cursor-pointer"
                    >
                      {BRIEFING_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                      ))}
                    </select>
                    <Link
                      href={`/admin/dashboard/briefings/${b.id}`}
                      className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-[10px] hover:bg-indigo-500/20 transition-all"
                    >
                      <Eye size={11} /><span>Ver</span>
                    </Link>
                    <button
                      onClick={() => handleDocxExport(b)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 text-white/40 rounded-lg text-[10px] hover:bg-white/10 hover:text-white/70 transition-all"
                    >
                      <FileText size={11} /><span>DOCX</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(b.id)}
                      className="p-1 bg-white/5 border border-white/10 text-white/25 rounded-lg hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Pagination ─── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] text-white/30">
            Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, displayedBriefings.length)} de {displayedBriefings.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-white/40 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, i, arr) => (
                <React.Fragment key={page}>
                  {i > 0 && arr[i - 1] !== page - 1 && (
                    <span className="text-[10px] text-white/20 px-1">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs transition-all ${
                      page === currentPage
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                        : "text-white/40 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg text-white/40 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ─── Delete Modal ─── */}
      <ConfirmModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Eliminar briefing"
        message="¿Estás seguro de que quieres eliminar este briefing permanentemente?"
        confirmLabel="Eliminar"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
