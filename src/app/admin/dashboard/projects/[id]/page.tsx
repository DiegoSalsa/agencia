"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Globe,
  Calendar,
  Trash2,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/context/ToastContext";
import { LoadingState, NotFoundState, ConfirmModal } from "@/components/admin";
import {
  PROJECT_STATUS_OPTIONS,
  CHANGE_STATUS_OPTIONS,
  CHANGE_STATUS_CONFIG,
  PRIORITY_CONFIG,
  INPUT_CLASS,
} from "@/lib/admin/constants";
import type { ProjectDetail, ChangeRequest } from "@/types/admin";

export default function AdminProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { token, isLoading: authLoading, authHeaders } = useAdminAuth();
  const toast = useToast();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Editable fields
  const [status, setStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  // Change request editing
  const [editingChange, setEditingChange] = useState<string | null>(null);
  const [changeStatus, setChangeStatus] = useState("");
  const [changePrice, setChangePrice] = useState("");
  const [changeClientNotes, setChangeClientNotes] = useState("");
  const [savingChange, setSavingChange] = useState(false);

  const fetchProject = useCallback(async (adminToken: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        headers: { "x-admin-token": adminToken },
      });
      const data = await res.json();
      if (data.ok) {
        setProject(data.project);
        setStatus(data.project.status);
        setAdminNotes(data.project.adminNotes || "");
        setDeliveryDate(data.project.deliveryDate || "");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!authLoading && token) fetchProject(token);
  }, [authLoading, token, fetchProject]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          status,
          adminNotes: adminNotes || null,
          deliveryDate: deliveryDate || null,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("Guardado correctamente");
        setProject(data.project);
      }
    } catch {
      toast.error("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      toast.success("Proyecto eliminado");
      window.location.href = "/admin/dashboard/projects";
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const handleUpdateChange = async (changeId: string) => {
    setSavingChange(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/changes`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          changeId,
          status: changeStatus || undefined,
          price: changePrice ? parseInt(changePrice) : undefined,
          clientNotes: changeClientNotes || undefined,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setEditingChange(null);
        toast.success("Solicitud actualizada");
        fetchProject(token);
      }
    } catch {
      toast.error("Error al actualizar solicitud");
    } finally {
      setSavingChange(false);
    }
  };

  const startEditChange = (change: ChangeRequest) => {
    setEditingChange(change.id);
    setChangeStatus(change.status);
    setChangePrice(change.price?.toString() || change.estimatedPrice?.toString() || "");
    setChangeClientNotes(change.clientNotes || "");
  };

  if (loading || authLoading) {
    return <LoadingState message="Cargando proyecto..." />;
  }

  if (!project) {
    return <NotFoundState title="Proyecto no encontrado" backHref="/admin/dashboard/projects" backLabel="Volver a proyectos" />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/projects" className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
            <ArrowLeft size={18} className="text-slate-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">{project.projectName}</h1>
            <p className="text-white/40 text-sm">
              {project.clientFirstName} {project.clientLastNameP} — {project.clientEmail}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
              onClick={() => fetchProject(token)}
              className="p-2 bg-white/[0.04] border border-white/10 rounded-lg hover:bg-white/[0.08] transition-colors"
            >
              <RefreshCw size={16} className="text-slate-400" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Project info + controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Info */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Proyecto</h3>

              {project.projectUrl && (
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-slate-500" />
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 truncate">
                    {project.projectUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-500" />
                <span className="text-sm text-slate-300">
                  Creado: {new Date(project.createdAt).toLocaleDateString("es-CL")}
                </span>
              </div>

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white/[0.04] border border-white/8 rounded text-[11px] text-slate-400">{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Editable controls */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Gestión</h3>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Estado del Proyecto</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={INPUT_CLASS}>
                  {PROJECT_STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value} className="bg-slate-900">{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Fecha de Entrega</label>
                <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className={INPUT_CLASS} />
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Notas Internas</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  placeholder="Solo visible para admins..."
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                Guardar Cambios
              </button>
            </div>
          </div>

          {/* Right: Change requests */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
                Solicitudes de Modificación ({project.changes.length})
              </h3>

              {project.changes.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">Sin solicitudes aún</p>
              ) : (
                <div className="space-y-3">
                  {project.changes.map((change) => {
                    const badge = CHANGE_STATUS_CONFIG[change.status] || CHANGE_STATUS_CONFIG.pending;
                    const pri = PRIORITY_CONFIG[change.priority] || PRIORITY_CONFIG.medium;
                    const isEditing = editingChange === change.id;

                    return (
                      <div key={change.id} className="bg-white/[0.02] border border-white/8 rounded-xl p-4 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm text-slate-200 leading-relaxed flex-1">{change.description}</p>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-full border shrink-0 ${badge.color}`}>
                            {badge.icon}
                            {badge.label}
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span>Prioridad: <span className={pri.color}>{pri.label}</span></span>
                          <span>
                            Estimado: <span className="text-slate-300">${(change.estimatedPrice || 0).toLocaleString("es-CL")}</span>
                          </span>
                          {change.price != null && (
                            <span>
                              Precio real: <span className="text-emerald-400">${change.price.toLocaleString("es-CL")}</span>
                            </span>
                          )}
                          <span>{new Date(change.createdAt).toLocaleDateString("es-CL")}</span>
                        </div>

                        {/* Admin notes */}
                        {change.adminNotes && (
                          <p className="text-xs text-slate-500 italic">Nota interna: {change.adminNotes}</p>
                        )}

                        {/* Edit form */}
                        {isEditing ? (
                          <div className="border-t border-white/8 pt-3 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-500 mb-1">Estado</label>
                                <select value={changeStatus} onChange={(e) => setChangeStatus(e.target.value)} className={INPUT_CLASS}>
                                  {CHANGE_STATUS_OPTIONS.map((s) => (
                                    <option key={s.value} value={s.value} className="bg-slate-900">{s.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[11px] text-slate-500 mb-1">Precio Real (CLP)</label>
                                <input
                                  type="number"
                                  value={changePrice}
                                  onChange={(e) => setChangePrice(e.target.value)}
                                  placeholder="Ej: 35000"
                                  className={INPUT_CLASS}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-500 mb-1">
                                <MessageSquare size={10} className="inline mr-1" />
                                Mensaje para el cliente
                              </label>
                              <textarea
                                value={changeClientNotes}
                                onChange={(e) => setChangeClientNotes(e.target.value)}
                                rows={2}
                                placeholder="Visible para el cliente..."
                                className={`${INPUT_CLASS} resize-none`}
                              />
                            </div>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingChange(null)}
                                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-300"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => handleUpdateChange(change.id)}
                                disabled={savingChange}
                                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg disabled:opacity-50"
                              >
                                {savingChange ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                                Guardar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditChange(change)}
                            className="text-xs text-indigo-400/70 hover:text-indigo-400 transition-colors"
                          >
                            Gestionar solicitud
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete confirmation modal */}
        <ConfirmModal
          open={showDeleteConfirm}
          title="Eliminar Proyecto"
          message="¿Eliminar este proyecto? Esta acción no se puede deshacer. Se eliminarán también todas las solicitudes de cambio asociadas."
          confirmLabel="Eliminar"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </div>
  );
}