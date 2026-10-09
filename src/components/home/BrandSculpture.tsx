"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { BrandRenderer } from "./brand-renderer";
import styles from "./home.module.css";

export default function BrandSculpture() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const engine = useRef<BrandRenderer | null>(null);
  const { theme } = useTheme();
  const [eligible, setEligible] = useState(false);
  const [requested, setRequested] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !("IntersectionObserver" in window) || !("ResizeObserver" in window)) return;
    // Check the same breakpoint as the mobile composition BEFORE importing
    // the renderer: CSS hiding alone would still download Three and geometry.
    const desktop = window.matchMedia("(min-width: 901px)");
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const updateMotion = () => setEligible(desktop.matches && motion.matches);
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setRequested(true);
    });
    observer.observe(scene);
    updateMotion(); updateVisibility();
    motion.addEventListener("change", updateMotion);
    desktop.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { observer.disconnect(); motion.removeEventListener("change", updateMotion); desktop.removeEventListener("change", updateMotion); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);
  useEffect(() => {
    const host = hostRef.current;
    if (!eligible || !requested || !host) return;
    const controller = new AbortController();
    let disposed = false;
    import("./brand-renderer").then(module => module.mountBrandRenderer(host, controller.signal, () => {
      setReady(false);
      engine.current?.dispose();
      engine.current = null;
    })).then(renderer => {
      if (disposed) { renderer.dispose(); return; }
      engine.current = renderer;
      setReady(true);
    }).catch(() => {
      // The exact, mask-free SVG stays visible when WebGL or loading fails.
      if (!disposed) setReady(false);
    });
    return () => { disposed = true; controller.abort(); engine.current?.dispose(); engine.current = null; setReady(false); };
  }, [eligible, requested]);
  useEffect(() => {
    engine.current?.setTheme(theme);
    engine.current?.setRunning(ready && eligible && inView && visible);
  }, [ready, eligible, inView, visible, theme]);
  return (
    <div ref={sceneRef} className={styles.brandScene} data-ready={ready}>
      <div className={styles.sculptureVisual} aria-hidden="true">
        <div ref={hostRef} className={styles.canvasHost} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.sculptureFallback} src="/img/pc-mark.svg" alt="" width={252} height={282} />
      </div>
    </div>
  );
}
