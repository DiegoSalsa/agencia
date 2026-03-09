"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Megaphone,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Command,
} from "lucide-react";
import type { AdminNotifications } from "@/types/admin";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface Props {
  onLogout: () => void;
  onCommandPalette?: () => void;
}

export default function Sidebar({ onLogout, onCommandPalette }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotifications>({
    newBriefings: 0,
    pendingChanges: 0,
    expiringPromos: 0,
  });

  // Fetch notification counts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = sessionStorage.getItem("admin_token");
        if (!token) return;
        const res = await fetch("/api/admin/notifications", {
          headers: { "x-admin-token": token },
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch {}
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Briefings",
      href: "/admin/dashboard/briefings",
      icon: <FileText size={20} />,
      badge: notifications.newBriefings || undefined,
    },
    {
      label: "Proyectos",
      href: "/admin/dashboard/projects",
      icon: <Users size={20} />,
      badge: notifications.pendingChanges || undefined,
    },
    {
      label: "Ofertas",
      href: "/admin/dashboard/promotions",
      icon: <Megaphone size={20} />,
      badge: notifications.expiringPromos || undefined,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 h-16 border-b border-white/5 flex-shrink-0 ${collapsed ? "justify-center" : ""}`}>
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              Puro<span className="text-indigo-400">Code</span>
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
        )}
      </div>

      {/* Command palette trigger */}
      {onCommandPalette && (
        <div className={`px-3 mt-4 ${collapsed ? "px-2" : ""}`}>
          <button
            onClick={onCommandPalette}
            className={`w-full flex items-center gap-2 text-white/30 hover:text-white/50 hover:bg-white/[0.04] rounded-lg transition-all cursor-pointer ${
              collapsed ? "justify-center p-2" : "px-3 py-2 text-xs"
            }`}
          >
            <Command size={14} />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Buscar...</span>
                <kbd className="text-[10px] text-white/20 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">
                  ⌘K
                </kbd>
              </>
            )}
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className={`text-[10px] font-semibold text-white/20 uppercase tracking-wider mb-3 ${collapsed ? "text-center" : "px-3"}`}>
          {collapsed ? "—" : "Menú"}
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg transition-all group relative ${
                collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
              } ${
                active
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <span className={active ? "text-indigo-400" : "text-white/40 group-hover:text-white/70"}>
                {item.icon}
              </span>
              {!collapsed && <span className="text-sm font-medium flex-1">{item.label}</span>}
              {item.badge && item.badge > 0 && (
                <span
                  className={`flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 ${
                    collapsed ? "absolute -top-1 -right-1" : ""
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <div className="absolute left-full ml-2 py-1 px-2.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-white/10">
                  {item.label}
                  {item.badge ? ` (${item.badge})` : ""}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1 border-t border-white/5 pt-4 flex-shrink-0">
        <Link
          href="/admin/dashboard/settings"
          className={`flex items-center gap-3 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all ${
            collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
          } ${pathname === "/admin/dashboard/settings" ? "bg-white/[0.04] text-white/60" : ""}`}
        >
          <Settings size={18} />
          {!collapsed && <span className="text-sm">Configuración</span>}
        </Link>

        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer ${
            collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm">Cerrar sesión</span>}
        </button>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex w-full items-center gap-3 rounded-lg text-white/20 hover:text-white/40 hover:bg-white/[0.03] transition-all cursor-pointer mt-2 ${
            collapsed ? "justify-center p-2.5" : "px-3 py-2.5"
          }`}
        >
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && <span className="text-xs">Colapsar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-lg text-white/60 hover:text-white cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="w-64 h-full bg-slate-950 border-r border-white/5 animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 text-white/40 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-slate-950 border-r border-white/[0.06] z-30 transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-60"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
