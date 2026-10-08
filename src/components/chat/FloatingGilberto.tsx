"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, X } from "lucide-react";
import dynamic from "next/dynamic";

const GilbertoChat = dynamic(() => import("@/components/chat/GilbertoChat"), { ssr: false });

export default function FloatingGilberto() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="gilberto-widget fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-[9999] flex flex-col items-end">
      {open && (
        <div id="gilberto-panel" role="dialog" aria-label="Gilberto, asistente de PuroCode" className="mb-4 w-[400px] max-w-full origin-bottom-right shadow-2xl rounded-lg overflow-hidden">
          <div className="mb-2 flex justify-end px-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] shadow-xl transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
              title="Cerrar Chat"
              aria-label="Cerrar chat"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          <GilbertoChat className="h-[min(680px,calc(100dvh-10rem))] max-w-none shadow-none" />
        </div>
      )}
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95"
        title={open ? "Cerrar Gilberto" : "Hablar con Gilberto"}
        aria-label={open ? "Cerrar Gilberto" : "Hablar con Gilberto"}
        aria-expanded={open}
        aria-controls="gilberto-panel"
      >
        {open ? <X size={24} strokeWidth={1.8} /> : <Bot size={28} strokeWidth={1.8} />}
      </button>
    </div>
  );
}
