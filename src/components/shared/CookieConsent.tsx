"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CookieConsent.module.css";

type ConsentValue = "all" | "essential" | null;

function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cookie_consent") as ConsentValue;
}

function setConsent(value: "all" | "essential") {
  localStorage.setItem("cookie_consent", value);
  // Also set a cookie so server can read it if needed
  document.cookie = `cookie_consent=${value};path=/;max-age=${365 * 86400};SameSite=Lax`;
  // Dispatch event so GoogleAnalytics component can react
  window.dispatchEvent(new Event("consent-updated"));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Saved consent is also applied by the pre-paint layout script, so this
    // inline notice reserves its own space and never overlays project content.
    setVisible(!getConsent());
  }, []);
  useEffect(() => {
    if (!visible || !banner.current) return;
    const updateVisible = () => {
      const rect = banner.current?.getBoundingClientRect();
      document.documentElement.style.setProperty("--cookie-visible-height", `${rect ? Math.max(0, Math.min(rect.height, rect.bottom)) : 0}px`);
    };
    const update = () => {
      document.documentElement.style.setProperty("--cookie-notice-height", `${banner.current?.getBoundingClientRect().height || 0}px`);
      updateVisible();
    };
    update();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(banner.current);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", updateVisible, { passive: true });
    return () => {
      observer?.disconnect(); window.removeEventListener("scroll", updateVisible);
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--cookie-notice-height");
      document.documentElement.style.removeProperty("--cookie-visible-height");
    };
  }, [visible]);

  function handleAcceptAll() {
    setConsent("all");
    setVisible(false);
  }

  function handleEssentialOnly() {
    setConsent("essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={banner}
      role="dialog"
      aria-label="Configuración de cookies"
      className={styles.banner}
    >
      <div className={styles.content}>
          <div className={styles.copy}>
            <h3>
              🍪 Uso de Cookies
            </h3>
            <p>
              Usamos cookies esenciales para que el sitio funcione y Google Analytics,
              si lo aceptas, para mejorar la experiencia.{" "}
              <a
                href="/privacidad"
              >
                Política de privacidad
              </a>
            </p>
          </div>
          <div className={styles.actions}>
            <button
              onClick={handleEssentialOnly}
              className={styles.essential}
            >
              Solo esenciales
            </button>
            <button
              onClick={handleAcceptAll}
              className={styles.all}
            >
              Aceptar todas
            </button>
          </div>
      </div>
    </div>
  );
}
