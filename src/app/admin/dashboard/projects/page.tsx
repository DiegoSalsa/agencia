"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  RefreshCw,
  Loader2,
  Eye,
  Search,
  Code2,
  CheckCircle2,
  Wrench,
  Pause,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";

interface ProjectSummary {
  id: string;
  clientFirstName: string;
  clientLastNameP: string;
  clientLastNameM: string | null;
  clientEmail: string;
  projectName: string;
  projectType: string;
  status: string;
  createdAt: string;
  pendingChanges: number;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  development: { label: "Desarrollo", color: "bg-blue-500/15 text-blue-400 border-blue-500/25", icon: <Code2 size={12} /> },
  delivered: { label: "Entregado", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", icon: <CheckCircle2 size={12} /> },
  maintenance: { label: "Mantenimiento", color: "bg-amber-500/15 text-amber-400 border-amber-500/25", icon: <Wrench size={12} /> },
  paused: { label: "Pausado", color: "bg-slate-500/15 text-slate-400 border-slate-500/25", icon: <Pause size={12} /> },
};

const TYPE_LABELS: Record<string, string> = {
  LANDING: "Landing Page",
  WEB_CORPORATIVA: "Web Corporativa",
  ECOMMERCE: "E-commerce",
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");

  const fetchProjects = useCallback(async (adminToken: string) => {
    try {
      const res = await fetch("/api/admin/projects", {
        headers: { "x-admin-token": adminToken },
      });
      if (res.status === 401) { router.push("/admin"); return; }
      const data = await res.json();
      if (data.ok) setProjects(data.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const t = sessionStorage.getItem("admin_token");
    if (!t) { router.push("/admin"); return; }
    setToken(t);
    fetchProjects(t);
  }, [fetchProjects, router]);

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
              <ArrowLeft size={18} className="text-slate-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users size={24} className="text-indigo-400" />
                Proyectos de Clientes
              </h1>
              <p className="text-slate-400 text-sm mt-1">{projects.length} proyecto{projects.length !== 1 ? "s" : ""}</p>
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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-indigo-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-500">
              {projects.length === 0 ? "No hay proyectos aún" : "Sin resultados para tu búsqueda"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => {
              const status = STATUS_CONFIG[p.status] || STATUS_CONFIG.development;
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
                        <span>{TYPE_LABELS[p.projectType] || p.projectType}</span>
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
    </main>
  );
}
