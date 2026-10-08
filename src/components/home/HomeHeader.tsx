"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";
import styles from "./home.module.css";

// Routes and translation keys are preserved from landing/Header at 5fcca07.
export const homeNavigation = [
  { key: "nav_services", href: "/servicios" },
  { key: "nav_portfolio", children: [
    { key: "nav_dropdown_web", href: "/portafolio" },
    { key: "nav_dropdown_saas", href: "/labs" },
  ] },
  { key: "nav_process", href: "/proceso" },
  { key: "nav_pricing", children: [
    { key: "nav_dropdown_dev", href: "/planes" },
    { key: "nav_dropdown_maint", href: "/mantenimiento" },
  ] },
  { key: "nav_faq", href: "/faq" },
  { key: "nav_contact", href: "/contacto" },
];

export default function HomeHeader() {
  const { theme, toggleTheme } = useTheme();
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const close = () => { setOpen(false); setDropdown(null); };
  useEffect(() => {
    if (!open && !dropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (open) toggleRef.current?.focus();
      else if (dropdown) dropdownRefs.current[dropdown]?.focus();
      setOpen(false); setDropdown(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) { setOpen(false); setDropdown(null); }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown); };
  }, [open, dropdown]);
  const languages = (mobile = false) => (
    <div className={mobile ? styles.mobileLanguages : styles.languages} role="group" aria-label={t("lang_select")}>
      {(["es", "en"] as const).map(value => <button key={value} type="button" aria-label={value === "es" ? "Español" : "English"} aria-pressed={lang === value} onClick={() => setLang(value)}>{value.toUpperCase()}</button>)}
    </div>
  );
  return (
    <header ref={headerRef} className={styles.header}>
      <Link href="/#hero" className={styles.brand} aria-label="PuroCode, inicio" onClick={close}><span className={styles.logoMark} aria-hidden="true" /><span>PuroCode</span></Link>
      <nav className={styles.desktopNav} aria-label="Navegación principal">
        {homeNavigation.map(item => item.children ? (
          <div key={item.key} className={styles.navGroup}>
            <button ref={el => { dropdownRefs.current[item.key] = el; }} type="button" aria-expanded={dropdown === item.key} aria-controls={`home-${item.key}`} onClick={() => setDropdown(dropdown === item.key ? null : item.key)}>{t(item.key)}<ChevronDown size={13} aria-hidden="true" /></button>
            <div id={`home-${item.key}`} className={styles.navDropdown} hidden={dropdown !== item.key}>
              {item.children.map(child => <Link key={child.href} href={child.href} onClick={close}>{t(child.key)}</Link>)}
            </div>
          </div>
        ) : <Link key={item.key} href={item.href!}>{t(item.key)}</Link>)}
      </nav>
      <div className={styles.headerActions}>
        {languages()}
        <button type="button" className={styles.themeButton} onClick={toggleTheme} aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"} title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>{theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}</button>
        <Link href="/formulario" className={styles.headerContact}>{t("nav_cta")} <span aria-hidden="true">→</span></Link>
        <button ref={toggleRef} type="button" className={styles.menuButton} aria-expanded={open} aria-controls="home-mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => { setOpen(!open); setDropdown(null); }}>{open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}</button>
      </div>
      <nav id="home-mobile-menu" className={styles.mobileNav} aria-label="Navegación móvil" hidden={!open}>
        {homeNavigation.map(item => item.children ? (
          <div key={item.key} className={styles.mobileGroup}><p>{t(item.key)}</p>{item.children.map(child => <Link key={child.href} href={child.href} onClick={close}>{t(child.key)}</Link>)}</div>
        ) : <Link key={item.key} href={item.href!} onClick={close}>{t(item.key)}</Link>)}
        {languages(true)}
        <Link href="/formulario" onClick={close} className={styles.mobileQuote}>{t("nav_cta")} <span aria-hidden="true">→</span></Link>
      </nav>
    </header>
  );
}
