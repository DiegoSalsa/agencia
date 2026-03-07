"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  LogOut,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import ProjectCard from "./ProjectCard";
import ChangeHistory from "./ChangeHistory";
import ChangeRequestForm from "./ChangeRequestForm";
import DocumentsList from "./DocumentsList";

// ── Types ──────────────────────────────────────────────────
export interface ChangeRequestData {
  id: string;
  description: string;
  priority: string;
  status: string;
  price: number | null;
  estimatedPrice: number | null;
  completionDate: string | null;
  clientNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDocument {
  name: string;
  url: string;
}

export interface ProjectData {
  id: string;
  clientFirstName: string;
  clientLastNameP: string;
  clientLastNameM: string | null;
  clientEmail: string;
  projectName: string;
  projectUrl: string | null;
  projectType: string;
  status: string;
  deliveryDate: string | null;
  technologies: string[];
  documents: ProjectDocument[];
  createdAt: string;
  updatedAt: string;
  changes: ChangeRequestData[];
}

export default function Dashboard() {
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/project");

      if (res.status === 401) {
        router.push("/mi-sitio?error=expired");
        return;
      }

      const data = await res.json();
      if (data.ok) {
        setProject(data.project);
      } else {
        setError(data.message || "Error al cargar el proyecto");
      }
    } catch {
      setError("Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProject();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/portal/logout", { method: "POST" });
    } finally {
      router.push("/mi-sitio");
      router.refresh();
    }
  };

  const handleChangeCreated = () => {
    setShowChangeForm(false);
    fetchProject();
  };

  const handleCancelChange = async (changeId: string) => {
    try {
      const res = await fetch("/api/portal/changes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changeId }),
      });

      if (res.ok) {
        fetchProject();
      }
    } catch (err) {
      console.error("Error cancelling change:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-indigo-400" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-sm">{error || "Proyecto no encontrado"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hola, {project.clientFirstName} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Bienvenido a tu portal de cliente
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 bg-white/[0.04] border border-white/10 rounded-lg hover:bg-white/[0.08] transition-colors disabled:opacity-50"
            title="Actualizar"
          >
            <RefreshCw size={16} className={`text-slate-400 ${refreshing ? "animate-spin" : ""}`} />
          </button>
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg hover:bg-white/[0.08] transition-colors text-slate-400 text-sm"
            >
              <ExternalLink size={14} />
              Ver sitio
            </a>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg hover:bg-white/[0.08] transition-colors text-slate-400 text-sm"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Project Card */}
      <ProjectCard project={project} />

      {/* Documents */}
      {project.documents.length > 0 && (
        <DocumentsList documents={project.documents} />
      )}

      {/* Change Request CTA */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Solicitudes de Modificación</h2>
        <button
          onClick={() => setShowChangeForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all"
        >
          Nueva Solicitud
        </button>
      </div>

      {/* Change Request Form Modal */}
      {showChangeForm && (
        <ChangeRequestForm
          onClose={() => setShowChangeForm(false)}
          onCreated={handleChangeCreated}
        />
      )}

      {/* Change History */}
      <ChangeHistory
        changes={project.changes}
        onCancel={handleCancelChange}
      />
    </div>
  );
}
