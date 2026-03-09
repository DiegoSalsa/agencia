"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  RefreshCw,
  Eye,
  Search,
  Users,
  AlertCircle,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LoadingState, EmptyState } from "@/components/admin";
import { PROJECT_STATUS_CONFIG, PROJECT_TYPE_LABELS } from "@/lib/admin/constants";
import type { ProjectSummary } from "@/types/admin";

export default function AdminProjectsPage() {
  const { token, isLoading: authLoading, authHeaders } = useAdminAuth();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProjects = useCallback(async (adminToken: string) => {
    try {
      const res = await fetch("/api/admin/projects", {
        headers: { "x-admin-token": adminToken },
      });
      const data = await res.json();
      if (data.ok) setProjects(data.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && token) fetchProjects(token);
  }, [authLoading, token, fetchProjects]);

  const filtered = projects.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.projectName.toLowerCase().includes(q) ||
      p.clientEmail.toLowerCase().includes(q) ||
      p.clientFirstName.toLowerCase().includes(q) ||
      p.clientLastNameP.toLowerCase().includes(q)
    );
  });

  if (loading || authLoading) return <LoadingState message="Cargando proyectos..." />;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Users size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Proyectos de Clientes</h1>
            <p className="text-white/40 text-sm">{projects.length} proyecto{projects.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchProjects(token)}
            className="p-2 bg-white/[0.04] border border-white/10 rounded-lg hover:bg-white/[0.08] transition-colors"
          >
            <RefreshCw size={16} className="text-slate-400" />
          </button>
          <Link
            href="/admin/dashboard/projects/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Plus size={16} />
            Nuevo Proyecto
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={40} className="text-slate-700" />}
          title={projects.length === 0 ? "No hay proyectos aún" : "Sin resultados"}
          description={projects.length === 0 ? "Crea tu primer proyecto de cliente" : "Intenta con otra búsqueda"}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const status = PROJECT_STATUS_CONFIG[p.status] || PROJECT_STATUS_CONFIG.development;
            return (
              <Link
                key={p.id}
                href={`/admin/dashboard/projects/${p.id}`}
                className="block bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">{p.projectName}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full border ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </span>
                      {p.pendingChanges > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
                          <AlertCircle size={10} />
                          {p.pendingChanges}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{p.clientFirstName} {p.clientLastNameP}</span>
                      <span className="text-slate-600">•</span>
                      <span>{p.clientEmail}</span>
                      <span className="text-slate-600">•</span>
                      <span>{PROJECT_TYPE_LABELS[p.projectType] || p.projectType}</span>
                    </div>
                  </div>
                  <Eye size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
