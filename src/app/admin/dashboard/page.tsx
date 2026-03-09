"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Users,
  Inbox,
  Eye,
  Clock,
  DollarSign,
  FolderKanban,
  Megaphone,
  ArrowRight,
  RefreshCw,
  Calendar,
  Mail,
  ExternalLink,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { BRIEFING_STATUS_CONFIG, BRIEFING_TYPE_CONFIG, timeAgo, formatCLP } from "@/lib/admin/constants";
import type { AdminStats } from "@/types/admin";
import { LoadingState } from "@/components/admin";

/* ─── Chart colors ─── */
const CHART_COLORS = {
  landing: "#06b6d4",
  corporativa: "#f59e0b",
  ecommerce: "#f43f5e",
  oferta: "#10b981",
};

const PIE_COLORS = ["#06b6d4", "#f59e0b", "#f43f5e", "#10b981"];

const TYPE_LABELS: Record<string, string> = {
  LANDING: "Landing",
  WEB_CORPORATIVA: "Corporativa",
  ECOMMERCE: "E-commerce",
  OFERTA: "Oferta",
};

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[10px] text-white/40 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { "x-admin-token": token },
      });
      if (res.ok) {
        const json = await res.json();
        setStats(json.data);
      }
    } catch (err) {
      console.error("Stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  /* ─── Derived data ─── */
  const recentBriefings = useMemo(() => {
    if (!stats) return [];
    return (stats as AdminStats & { recentBriefings?: Array<{ id: string; clientName: string; clientEmail: string; type: string; status: string; createdAt: string }> }).recentBriefings || [];
  }, [stats]);

  if (loading) return <LoadingState message="Cargando dashboard..." />;

  const totals = stats?.totals || {
    briefings: 0,
    nuevo: 0,
    enProgreso: 0,
    completado: 0,
    thisWeek: 0,
    estimatedRevenue: 0,
    activeProjects: 0,
    activePromos: 0,
  };

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-white/40 mt-0.5">Vista general de tu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-all ${refreshing ? "animate-spin" : ""}`}
            title="Refrescar"
          >
            <RefreshCw size={16} />
          </button>
          <a
            href="/formulario"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs hover:bg-indigo-500/20 transition-all"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Ver Formulario</span>
          </a>
        </div>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<Users size={18} />}
          label="Total Briefings"
          value={totals.briefings}
          color="bg-indigo-500/15 text-indigo-400"
          sub={`${totals.thisWeek} esta semana`}
          trend={totals.thisWeek > 0 ? `+${totals.thisWeek}` : undefined}
        />
        <StatCard
          icon={<Inbox size={18} />}
          label="Nuevos"
          value={totals.nuevo}
          color="bg-blue-500/15 text-blue-400"
          sub="Pendientes de revisión"
          highlight={totals.nuevo > 0}
        />
        <StatCard
          icon={<DollarSign size={18} />}
          label="Ingresos Est."
          value={formatCLP(totals.estimatedRevenue)}
          color="bg-emerald-500/15 text-emerald-400"
          sub="En base a tipos"
          isText
        />
        <StatCard
          icon={<FolderKanban size={18} />}
          label="Proyectos Activos"
          value={totals.activeProjects}
          color="bg-purple-500/15 text-purple-400"
          sub={`${totals.activePromos} promos activas`}
        />
      </div>

      {/* ─── Charts Row ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Briefings Chart */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Briefings por Semana</h3>
            <span className="text-[10px] text-white/30">Últimas 8 semanas</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.weeklyBriefings || []} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="landing" name="Landing" fill={CHART_COLORS.landing} radius={[3, 3, 0, 0]} stackId="stack" />
                <Bar dataKey="corporativa" name="Corporativa" fill={CHART_COLORS.corporativa} radius={[0, 0, 0, 0]} stackId="stack" />
                <Bar dataKey="ecommerce" name="E-commerce" fill={CHART_COLORS.ecommerce} radius={[0, 0, 0, 0]} stackId="stack" />
                <Bar dataKey="oferta" name="Oferta" fill={CHART_COLORS.oferta} radius={[3, 3, 0, 0]} stackId="stack" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
            {Object.entries(CHART_COLORS).map(([key, color]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[10px] text-white/40 capitalize">{key === "corporativa" ? "Corp." : key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Ingresos Estimados</h3>
            <span className="text-[10px] text-white/30">Últimos 6 meses</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.monthlyRevenue || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;
                    return (
                      <div className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
                        <p className="text-[10px] text-white/40 mb-1">{label}</p>
                        <p className="text-xs text-emerald-400 font-medium">
                          {formatCLP(payload[0].value as number)}
                        </p>
                        <p className="text-[10px] text-white/30">
                          {(payload[1]?.value as number) || 0} briefings
                        </p>
                      </div>
                    );
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ─── Bottom Row ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Type Distribution */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Distribución por Tipo</h3>
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.typeDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="type"
                >
                  {(stats?.typeDistribution || []).map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
                        <p className="text-xs text-white font-medium">{TYPE_LABELS[d.type] || d.type}</p>
                        <p className="text-[10px] text-white/40">{d.count} ({d.percentage}%)</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {(stats?.typeDistribution || []).map((d, i) => (
              <div key={d.type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-xs text-white/60">{TYPE_LABELS[d.type] || d.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white">{d.count}</span>
                  <span className="text-[10px] text-white/30">{d.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Briefings */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Briefings Recientes</h3>
            <Link
              href="/admin/dashboard/briefings"
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          {recentBriefings.length === 0 ? (
            <div className="text-center py-8">
              <Inbox size={24} className="text-white/15 mx-auto mb-2" />
              <p className="text-xs text-white/30">No hay briefings aún</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentBriefings.map((b) => {
                const sc = BRIEFING_STATUS_CONFIG[b.status] || BRIEFING_STATUS_CONFIG.nuevo;
                const tc = BRIEFING_TYPE_CONFIG[b.type] || BRIEFING_TYPE_CONFIG.LANDING;
                return (
                  <Link
                    key={b.id}
                    href={`/admin/dashboard/briefings/${b.id}`}
                    className="flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white truncate">{b.clientName}</span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] border ${tc.color}`}>
                          {tc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Mail size={10} className="text-white/20" />
                        <span className="text-[11px] text-white/30 truncate">{b.clientEmail || "Sin email"}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${sc.bg} ${sc.color}`}>
                      {sc.icon}{sc.label}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-white/25">
                      <Calendar size={10} />
                      <span>{timeAgo(b.createdAt)}</span>
                    </div>
                    <Eye size={14} className="text-white/15 group-hover:text-indigo-400 transition-colors" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── Quick Actions ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <QuickAction href="/admin/dashboard/briefings" icon={<Inbox size={16} />} label="Briefings" count={totals.briefings} color="text-blue-400" />
        <QuickAction href="/admin/dashboard/projects" icon={<FolderKanban size={16} />} label="Proyectos" count={totals.activeProjects} color="text-purple-400" />
        <QuickAction href="/admin/dashboard/promotions" icon={<Megaphone size={16} />} label="Ofertas" count={totals.activePromos} color="text-emerald-400" />
        <QuickAction href="/admin/dashboard/projects/new" icon={<Users size={16} />} label="Nuevo Proyecto" color="text-indigo-400" isNew />
      </div>
    </div>
  );
}

/* ─── Stat Card Component ─── */
function StatCard({
  icon,
  label,
  value,
  color,
  sub,
  trend,
  highlight,
  isText,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  sub?: string;
  trend?: string;
  highlight?: boolean;
  isText?: boolean;
}) {
  return (
    <div className={`bg-white/[0.02] border rounded-xl p-4 hover:bg-white/[0.04] transition-all ${highlight ? "border-blue-500/30 bg-blue-500/[0.03]" : "border-white/5 hover:border-white/10"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
        <div className="text-right">
          <span className={`font-bold text-white ${isText ? "text-lg" : "text-2xl"}`}>{value}</span>
          {trend && (
            <div className="flex items-center gap-0.5 justify-end mt-0.5">
              <TrendingUp size={10} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-medium">{trend}</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-white/50 font-medium">{label}</p>
      {sub && <p className="text-[10px] text-white/25 mt-0.5">{sub}</p>}
    </div>
  );
}

/* ─── Quick Action Card ─── */
function QuickAction({
  href,
  icon,
  label,
  count,
  color,
  isNew,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  color: string;
  isNew?: boolean;
}) {
  return (
    <Link
      href={href}
      className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] hover:border-white/10 transition-all group flex items-center gap-3"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 ${color} group-hover:bg-white/10 transition-colors`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-white">{label}</span>
        {count !== undefined && (
          <p className="text-[10px] text-white/30">{count} activos</p>
        )}
        {isNew && (
          <p className="text-[10px] text-indigo-400">+ Crear</p>
        )}
      </div>
      <ArrowRight size={14} className="text-white/15 group-hover:text-white/40 transition-colors" />
    </Link>
  );
}
