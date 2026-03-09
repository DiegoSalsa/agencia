"use client";

import { useState, useEffect } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't flash on page load
    const timer = setTimeout(() => {
      if (!getConsent()) setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
      role="dialog"
      aria-label="Configuración de cookies"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl backdrop-blur-xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[var(--text)] mb-1">
              🍪 Uso de Cookies
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Usamos cookies esenciales para el funcionamiento del sitio y cookies analíticas
              (Google Analytics) para mejorar tu experiencia. Puedes aceptar todas o solo las
              esenciales.{" "}
              <a
                href="/privacidad"
                className="text-[var(--primary)] hover:underline"
              >
                Política de privacidad
              </a>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleEssentialOnly}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors cursor-pointer"
            >
              Solo esenciales
            </button>
            <button
              onClick={handleAcceptAll}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
