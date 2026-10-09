"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useI18n } from "@/context/I18nContext";
import { siteNavigation, isPublicSiteRoute, needsHeaderSpace } from "@/lib/navigation";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const previousPathname = useRef(pathname);
  const close = () => { setOpen(false); setDropdown(null); };

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setOpen(false); setDropdown(null);
  }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const onBreakpointChange = () => { setOpen(false); setDropdown(null); };
    desktop.addEventListener("change", onBreakpointChange);
    return () => desktop.removeEventListener("change", onBreakpointChange);
  }, []);
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

  // Native navigation on briefing pages lets their existing beforeunload
  // protection run; a Next Link would bypass that protection during soft routing.
  const briefing = pathname.startsWith("/formulario/") && pathname !== "/formulario/success";
  const navLink = (href: string, children: ReactNode, className?: string, label?: string) => {
    const props = { href, className, onClick: close, "aria-label": label, "aria-current": pathname === href ? "page" as const : undefined };
    return briefing || href === "/formulario" ? <a {...props}>{children}</a> : <Link {...props}>{children}</Link>;
  };
  const languages = (mobile = false) => (
    <div className={mobile ? styles.mobileLanguages : styles.languages} role="group" aria-label={t("lang_select")}>
      {(["es", "en"] as const).map(value => <button key={value} type="button" aria-label={value === "es" ? "Español" : "English"} aria-pressed={lang === value} onClick={() => setLang(value)}>{value.toUpperCase()}</button>)}
    </div>
  );
  if (!isPublicSiteRoute(pathname)) return null;

  return (<>
    <header id="site-header" ref={headerRef} className={styles.header}>
      <div className={styles.inner}>
        {navLink("/#hero", <><span className={styles.logoMark} aria-hidden="true" /><span>PuroCode</span></>, styles.brand, "PuroCode, inicio")}
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {siteNavigation.map(item => "children" in item ? (
            <div key={item.key} className={styles.navGroup}>
              <button ref={el => { dropdownRefs.current[item.key] = el; }} type="button" data-active={item.children.some(child => child.href === pathname)} aria-expanded={dropdown === item.key} aria-controls={`site-${item.key}`} onClick={() => setDropdown(dropdown === item.key ? null : item.key)}>{t(item.key)}<ChevronDown size={13} aria-hidden="true" /></button>
              <div id={`site-${item.key}`} className={styles.navDropdown} hidden={dropdown !== item.key}>
                {item.children.map(child => <div key={child.href}>{navLink(child.href, t(child.key))}</div>)}
              </div>
            </div>
          ) : <div key={item.href}>{navLink(item.href, t(item.key))}</div>)}
        </nav>
        <div className={styles.headerActions}>
          {languages()}
          <button type="button" className={styles.themeButton} onClick={toggleTheme} aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"} title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>{theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}</button>
          {navLink("/formulario", <>{t("nav_cta")} <span aria-hidden="true">→</span></>, styles.headerContact)}
          <button ref={toggleRef} type="button" className={styles.menuButton} aria-expanded={open} aria-controls="site-mobile-menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => { setOpen(!open); setDropdown(null); }}>{open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}</button>
        </div>
        <nav id="site-mobile-menu" className={styles.mobileNav} aria-label="Navegación móvil" hidden={!open}>
          {siteNavigation.map(item => "children" in item ? (
            <div key={item.key} className={styles.mobileGroup}><p>{t(item.key)}</p>{item.children.map(child => <div key={child.href}>{navLink(child.href, t(child.key))}</div>)}</div>
          ) : <div key={item.href}>{navLink(item.href, t(item.key))}</div>)}
          {languages(true)}
          {navLink("/formulario", <>{t("nav_cta")} <span aria-hidden="true">→</span></>, styles.mobileQuote)}
        </nav>
      </div>
    </header>
    {needsHeaderSpace(pathname) && <div aria-hidden="true" className={styles.spacer} />}
  </>);
}
