"use client";

import React from "react";
import {
  Globe,
  Calendar,
  Code2,
  Wrench,
  Pause,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { ProjectData } from "./Dashboard";

interface ProjectCardProps {
  project: ProjectData;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  development: {
    label: "En Desarrollo",
    color: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    icon: <Code2 size={14} />,
  },
  delivered: {
    label: "Entregado",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    icon: <CheckCircle2 size={14} />,
  },
  maintenance: {
    label: "En Mantenimiento",
    color: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    icon: <Wrench size={14} />,
  },
  paused: {
    label: "Pausado",
    color: "bg-slate-500/15 text-slate-400 border-slate-500/25",
    icon: <Pause size={14} />,
  },
};

const TYPE_LABELS: Record<string, string> = {
  LANDING: "Landing Page",
  WEB_CORPORATIVA: "Web Corporativa",
  ECOMMERCE: "E-commerce",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status] || STATUS_CONFIG.development;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
      {/* Project name + status */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{project.projectName}</h2>
          <p className="text-slate-400 text-sm mt-1">
            {TYPE_LABELS[project.projectType] || project.projectType}
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${status.color}`}>
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.projectUrl && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center shrink-0">
              <Globe size={14} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">URL</p>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors truncate block max-w-[200px]"
              >
                {project.projectUrl.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        )}

        {project.deliveryDate && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
              <Calendar size={14} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Entrega</p>
              <p className="text-sm text-slate-300">
                {new Date(project.deliveryDate).toLocaleDateString("es-CL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
            <Clock size={14} className="text-purple-400" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Inicio</p>
            <p className="text-sm text-slate-300">
              {new Date(project.createdAt).toLocaleDateString("es-CL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Technologies */}
      {project.technologies.length > 0 && (
        <div>
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-2">Tecnologías</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/[0.04] border border-white/8 rounded-md text-xs text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
