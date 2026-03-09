"use client";

import React, { type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface Props {
  title?: string;
  message?: string;
  backHref?: string;
  backLabel?: string;
}

export default function NotFoundState({
  title = "No encontrado",
  message = "El recurso que buscas no existe o fue eliminado.",
  backHref = "/admin/dashboard",
  backLabel = "Volver al Dashboard",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
        <AlertTriangle size={24} className="text-amber-400" />
      </div>
      <div className="text-center">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-white/40 text-sm mt-1">{message}</p>
      </div>
      <Link
        href={backHref}
        className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm hover:bg-white/10 transition-all"
      >
        {backLabel}
      </Link>
    </div>
  );
}
