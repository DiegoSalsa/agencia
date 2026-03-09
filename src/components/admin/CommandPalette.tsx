"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  Users,
  Megaphone,
  LayoutDashboard,
  Settings,
  ArrowRight,
} from "lucide-react";

interface SearchResult {
  id: string;
  label: string;
  subtitle?: string;
  type: "briefing" | "project" | "promotion" | "page";
  href: string;
  icon: React.ReactNode;
}

const QUICK_LINKS: SearchResult[] = [
  { id: "nav-dashboard", label: "Dashboard", type: "page", href: "/admin/dashboard", icon: <LayoutDashboard size={16} /> },
  { id: "nav-briefings", label: "Briefings", type: "page", href: "/admin/dashboard/briefings", icon: <FileText size={16} /> },
  { id: "nav-projects", label: "Proyectos", type: "page", href: "/admin/dashboard/projects", icon: <Users size={16} /> },
  { id: "nav-promotions", label: "Ofertas y Códigos", type: "page", href: "/admin/dashboard/promotions", icon: <Megaphone size={16} /> },
  { id: "nav-settings", label: "Configuración", type: "page", href: "/admin/dashboard/settings", icon: <Settings size={16} /> },
  { id: "nav-new-project", label: "Crear Proyecto", type: "page", href: "/admin/dashboard/projects/new", icon: <Users size={16} /> },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searching, setSearching] = useState(false);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search API on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setSearching(true);
      try {
        const token = sessionStorage.getItem("admin_token");
        if (!token) return;

        const q = query.toLowerCase();

        // Search briefings
        const briefingsRes = await fetch(`/api/briefings?search=${encodeURIComponent(q)}`, {
          headers: { "x-admin-token": token },
        });
        const briefingsData = briefingsRes.ok ? await briefingsRes.json() : { data: [] };

        // Search projects
        const projectsRes = await fetch("/api/admin/projects", {
          headers: { "x-admin-token": token },
        });
        const projectsData = projectsRes.ok ? await projectsRes.json() : { data: [] };

        // Search promotions
        const promosRes = await fetch("/api/admin/promotions", {
          headers: { "x-admin-token": token },
        });
        const promosData = promosRes.ok ? await promosRes.json() : { data: [] };

        const searchResults: SearchResult[] = [];

        // Filter briefings
        (briefingsData.data || [])
          .filter((b: any) =>
            b.clientName?.toLowerCase().includes(q) ||
            b.clientEmail?.toLowerCase().includes(q)
          )
          .slice(0, 5)
          .forEach((b: any) => {
            searchResults.push({
              id: `b-${b.id}`,
              label: b.clientName,
              subtitle: b.clientEmail || b.type,
              type: "briefing",
              href: `/admin/dashboard/briefings/${b.id}`,
              icon: <FileText size={16} />,
            });
          });

        // Filter projects
        (projectsData.data || [])
          .filter((p: any) =>
            p.projectName?.toLowerCase().includes(q) ||
            p.clientEmail?.toLowerCase().includes(q) ||
            p.clientFirstName?.toLowerCase().includes(q)
          )
          .slice(0, 3)
          .forEach((p: any) => {
            searchResults.push({
              id: `p-${p.id}`,
              label: p.projectName,
              subtitle: `${p.clientFirstName} ${p.clientLastNameP}`,
              type: "project",
              href: `/admin/dashboard/projects/${p.id}`,
              icon: <Users size={16} />,
            });
          });

        // Filter promotions
        (promosData.data || [])
          .filter((pr: any) => pr.title?.toLowerCase().includes(q))
          .slice(0, 3)
          .forEach((pr: any) => {
            searchResults.push({
              id: `pr-${pr.id}`,
              label: pr.title,
              subtitle: pr.isActive ? "Activa" : "Inactiva",
              type: "promotion",
              href: "/admin/dashboard/promotions",
              icon: <Megaphone size={16} />,
            });
          });

        // Filter quick links
        QUICK_LINKS.filter((l) => l.label.toLowerCase().includes(q)).forEach((l) => {
          searchResults.push(l);
        });

        setResults(searchResults);
        setSelectedIdx(0);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const displayResults = query.trim() ? results : QUICK_LINKS;

  const navigate = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [router, onClose]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, displayResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && displayResults[selectedIdx]) {
      e.preventDefault();
      navigate(displayResults[selectedIdx].href);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  const typeColors: Record<string, string> = {
    briefing: "text-cyan-400/60",
    project: "text-purple-400/60",
    promotion: "text-emerald-400/60",
    page: "text-white/30",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm animate-fadeInOverlay p-4" onClick={onClose}>
      <div
        className="bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <Search size={18} className="text-white/30 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar briefings, proyectos, páginas..."
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
          />
          <kbd className="text-[10px] text-white/20 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {!query.trim() && (
            <p className="px-4 py-1 text-[10px] font-semibold text-white/20 uppercase tracking-wider">
              Navegación rápida
            </p>
          )}
          {displayResults.length === 0 && query.trim() && (
            <p className="text-center text-sm text-white/30 py-8">
              {searching ? "Buscando..." : "Sin resultados"}
            </p>
          )}
          {displayResults.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => navigate(item.href)}
              onMouseEnter={() => setSelectedIdx(idx)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                idx === selectedIdx ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
              }`}
            >
              <span className={typeColors[item.type] || "text-white/30"}>{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 truncate">{item.label}</p>
                {item.subtitle && <p className="text-[11px] text-white/25 truncate">{item.subtitle}</p>}
              </div>
              <ArrowRight size={12} className="text-white/10 flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/5 text-[10px] text-white/20">
          <span>↑↓ navegar</span>
          <span>↵ abrir</span>
          <span>esc cerrar</span>
        </div>
      </div>
    </div>
  );
}
