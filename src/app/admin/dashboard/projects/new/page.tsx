"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Plus } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/context/ToastContext";
import { PROJECT_TYPE_OPTIONS, PROJECT_STATUS_OPTIONS, INPUT_CLASS } from "@/lib/admin/constants";

export default function NewProjectPage() {
  const router = useRouter();
  const { token, authHeaders } = useAdminAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    clientFirstName: "",
    clientLastNameP: "",
    clientLastNameM: "",
    clientEmail: "",
    projectName: "",
    projectUrl: "",
    projectType: "LANDING",
    status: "development",
    deliveryDate: "",
    technologies: "",
    adminNotes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techArray = form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...form,
          technologies: techArray,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        toast.success("Proyecto creado exitosamente");
        router.push("/admin/dashboard/projects");
      } else {
        toast.error(data.error || "Error al crear el proyecto");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/dashboard/projects" className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
          <ArrowLeft size={18} className="text-slate-400" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus size={20} className="text-indigo-400" />
            Nuevo Proyecto
          </h1>
          <p className="text-white/40 text-sm mt-1">Registra un nuevo proyecto de cliente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Client Info */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Datos del Cliente</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Nombre *</label>
              <input name="clientFirstName" value={form.clientFirstName} onChange={handleChange} required placeholder="Jessica" className={INPUT_CLASS} />
            </div>
            <div>
              <label className={labelClass}>Apellido Paterno *</label>
              <input name="clientLastNameP" value={form.clientLastNameP} onChange={handleChange} required placeholder="Belmar" className={INPUT_CLASS} />
            </div>
            <div>
              <label className={labelClass}>Apellido Materno</label>
              <input name="clientLastNameM" value={form.clientLastNameM} onChange={handleChange} placeholder="García" className={INPUT_CLASS} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email *</label>
            <input name="clientEmail" type="email" value={form.clientEmail} onChange={handleChange} required placeholder="cliente@ejemplo.com" className={INPUT_CLASS} />
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Datos del Proyecto</h2>

          <div>
            <label className={labelClass}>Nombre del Proyecto *</label>
            <input name="projectName" value={form.projectName} onChange={handleChange} required placeholder="PodoMed Clinical" className={INPUT_CLASS} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tipo *</label>
              <select name="projectType" value={form.projectType} onChange={handleChange} className={INPUT_CLASS}>
                {PROJECT_TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value} className="bg-slate-900">{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select name="status" value={form.status} onChange={handleChange} className={INPUT_CLASS}>
                {PROJECT_STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value} className="bg-slate-900">{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>URL del Proyecto</label>
              <input name="projectUrl" value={form.projectUrl} onChange={handleChange} placeholder="https://ejemplo.com" className={INPUT_CLASS} />
            </div>
            <div>
              <label className={labelClass}>Fecha de Entrega</label>
              <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} className={INPUT_CLASS} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tecnologías</label>
            <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="Next.js, Tailwind, Vercel (separadas por coma)" className={INPUT_CLASS} />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Notas Internas</h2>
          <textarea
            name="adminNotes"
            value={form.adminNotes}
            onChange={handleChange}
            placeholder="Notas internas (no visibles para el cliente)..."
            rows={3}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/dashboard/projects"
            className="px-4 py-2.5 text-sm text-slate-400 hover:text-slate-300 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Save size={16} />
                Crear Proyecto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
