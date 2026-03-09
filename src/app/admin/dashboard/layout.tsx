"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import CommandPalette from "@/components/admin/CommandPalette";
import { ToastProvider } from "@/context/ToastContext";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }
    setAuthenticated(true);
  }, [router]);

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("admin_token");
    router.push("/admin");
  }, [router]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950">
        <Sidebar onLogout={handleLogout} onCommandPalette={() => setCommandOpen(true)} />

        {/* Main content - pushed right by sidebar */}
        <div className="lg:pl-60 min-h-screen transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </div>

        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      </div>
    </ToastProvider>
  );
}
