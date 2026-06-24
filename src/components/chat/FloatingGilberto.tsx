"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, X } from "lucide-react";
import GilbertoChat from "@/components/chat/GilbertoChat";

export default function FloatingGilberto() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Puedes excluir ciertas rutas donde no quieres que aparezca
  // if (pathname.startsWith("/alguna-ruta")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {open && (
        <div className="mb-3 w-[420px] max-w-[calc(100vw_-_2rem)] shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          <div className="mb-2 flex justify-end px-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-neutral-950 text-neutral-400 shadow-xl transition-colors hover:bg-neutral-900 hover:text-neutral-100"
              title="Cerrar Chat"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          <GilbertoChat className="h-[min(680px,calc(100vh-8rem))] max-w-none shadow-none" />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95"
        title={open ? "Cerrar Gilberto" : "Hablar con Gilberto"}
      >
        {open ? <X size={24} strokeWidth={1.8} /> : <Bot size={28} strokeWidth={1.8} />}
      </button>
    </div>
  );
}
