"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, X, Users, ChevronRight, ChevronUp, Instagram, Facebook } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useI18n } from "@/context/I18nContext";
import { isPublicSiteRoute } from "@/lib/navigation";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import styles from "./FloatingGilberto.module.css";

const GilbertoChat = dynamic(() => import("@/components/chat/GilbertoChat"), { ssr: false });

export default function FloatingGilberto() {
  const [open, setOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();
  const { lang } = useI18n();
  const hasDock = isPublicSiteRoute(pathname);
  const widget = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const socialTrigger = useRef<HTMLButtonElement>(null);
  const socialMenu = useRef<HTMLDivElement>(null);
  const previousPathname = useRef(pathname);
  const focusTrigger = useCallback(() => {
    const activeTrigger = hasDock && window.matchMedia("(max-width: 900px)").matches ? mobileTrigger : trigger;
    activeTrigger.current?.focus();
  }, [hasDock]);
  const closeChat = () => { setOpen(false); focusTrigger(); };
  const toggleChat = () => { setSocialOpen(false); setOpen(current => !current); };

  useEffect(() => {
    if (socialOpen) socialMenu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [socialOpen]);
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setOpen(false); setSocialOpen(false);
  }, [pathname]);
  useEffect(() => {
    const updateScroll = () => setShowScrollTop(window.scrollY > 600);
    const desktop = window.matchMedia("(min-width: 901px)");
    const onBreakpointChange = () => setSocialOpen(false);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    desktop.addEventListener("change", onBreakpointChange);
    return () => { window.removeEventListener("scroll", updateScroll); desktop.removeEventListener("change", onBreakpointChange); };
  }, []);
  useEffect(() => {
    if (!open && !socialOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (open) { setOpen(false); focusTrigger(); }
      if (socialOpen) { setSocialOpen(false); socialTrigger.current?.focus(); }
    };
    const onOutside = (event: PointerEvent) => {
      if (!widget.current?.contains(event.target as Node)) setSocialOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onOutside); };
  }, [open, socialOpen, focusTrigger]);

  const talkLabel = lang === "en" ? "Talk to Gilberto" : "Hablar con Gilberto";
  const closeLabel = lang === "en" ? "Close Gilberto" : "Cerrar Gilberto";
  const networksLabel = lang === "en" ? "Socials" : "Redes";
  const scrollTop = () => {
    setSocialOpen(false);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div ref={widget} className={`gilberto-widget ${styles.widget} ${hasDock ? styles.withDock : ""}`}>
      {open && (
        <div id="gilberto-panel" role="dialog" aria-label={lang === "en" ? "Gilberto, PuroCode assistant" : "Gilberto, asistente de PuroCode"} className={`${styles.panel} mb-4 w-[400px] max-w-full origin-bottom-right shadow-2xl rounded-lg overflow-hidden`}>
          <div className="mb-2 flex justify-end px-2">
            <button
              type="button"
              onClick={closeChat}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] shadow-xl transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
              title="Cerrar Chat"
              aria-label={lang === "en" ? "Close chat" : "Cerrar chat"}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          <GilbertoChat autoFocus className={`${styles.chat} max-w-none shadow-none`} />
        </div>
      )}
      <button
        ref={trigger}
        type="button"
        onClick={toggleChat}
        className={`${styles.desktopTrigger} ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95`}
        title={open ? closeLabel : talkLabel}
        aria-label={open ? closeLabel : talkLabel}
        aria-expanded={open}
        aria-controls="gilberto-panel"
      >
        {open ? <X size={24} strokeWidth={1.8} /> : <Bot size={28} strokeWidth={1.8} />}
      </button>
      {hasDock && <>
        <div ref={socialMenu} id="mobile-social-menu" role="region" aria-label={lang === "en" ? "Social networks" : "Redes sociales"} className={styles.socialMenu} hidden={!socialOpen}>
          <div className={styles.socialHeading}><span>{lang === "en" ? "Find PuroCode" : "Encuentra a PuroCode"}</span><button type="button" aria-label={lang === "en" ? "Close socials" : "Cerrar redes"} onClick={() => { setSocialOpen(false); socialTrigger.current?.focus(); }}><X size={18} /></button></div>
          <a href="https://wa.me/56949255006" target="_blank" rel="noopener noreferrer" onClick={() => setSocialOpen(false)}><WhatsAppIcon size={20} /><span>WhatsApp <small>+56 9 4925 5006</small></span><ChevronRight size={16} /></a>
          <a href="https://www.instagram.com/purocodecl/" target="_blank" rel="noopener noreferrer" onClick={() => setSocialOpen(false)}><Instagram size={20} /><span>Instagram</span><ChevronRight size={16} /></a>
          <a href="https://www.facebook.com/PuroCode.com" target="_blank" rel="noopener noreferrer" onClick={() => setSocialOpen(false)}><Facebook size={20} /><span>Facebook</span><ChevronRight size={16} /></a>
        </div>
        <div id="mobile-contact-dock" className={styles.dock} role="group" aria-label={lang === "en" ? "Contact and assistance" : "Contacto y asistencia"}>
          {showScrollTop && <button type="button" onClick={scrollTop} className={styles.scrollTop} aria-label={lang === "en" ? "Back to top" : "Volver arriba"}><ChevronUp size={19} /></button>}
          <button ref={socialTrigger} type="button" aria-expanded={socialOpen} aria-controls="mobile-social-menu" onClick={() => { setOpen(false); setSocialOpen(current => !current); }}><Users size={18} aria-hidden="true" /><span>{networksLabel}</span><ChevronRight size={14} aria-hidden="true" /></button>
          <button ref={mobileTrigger} type="button" onClick={toggleChat} aria-label={open ? closeLabel : talkLabel} aria-expanded={open} aria-controls="gilberto-panel">{open ? <X size={19} aria-hidden="true" /> : <Bot size={19} aria-hidden="true" />}<span>Gilberto</span><ChevronRight size={14} aria-hidden="true" /></button>
        </div>
      </>}
    </div>
  );
}
