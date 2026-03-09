"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Zap, ArrowRight } from "lucide-react";
import { usePromo, type ActivePromo } from "@/context/PromoContext";

export default function PromoBanner() {
    const { promos, loading } = usePromo();
    const [dismissed, setDismissed] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    const promo = promos.find((d: ActivePromo) => d.showBanner) || null;

    useEffect(() => {
        const wasDismissed = sessionStorage.getItem("promo_banner_dismissed");
        if (wasDismissed) setDismissed(true);
    }, []);

    // Set CSS custom property for header offset
    useEffect(() => {
        if (promo && !dismissed && !loading && bannerRef.current) {
            const height = bannerRef.current.offsetHeight;
            document.documentElement.style.setProperty("--promo-banner-height", `${height}px`);
        } else {
            document.documentElement.style.setProperty("--promo-banner-height", "0px");
        }
        return () => {
            document.documentElement.style.setProperty("--promo-banner-height", "0px");
        };
    }, [promo, dismissed, loading]);

    const handleDismiss = () => {
        setDismissed(true);
        sessionStorage.setItem("promo_banner_dismissed", "1");
    };

    if (!promo || dismissed || loading) return null;

    const discount = Math.round(
        ((promo.originalPrice - promo.price) / promo.originalPrice) * 100
    );

    return (
        <div ref={bannerRef} className="sticky top-0 z-[55] bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-500 text-white">
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
                <Zap size={14} className="flex-shrink-0 animate-pulse" />
                <span className="font-medium truncate">
                    {promo.bannerText || `🔥 Landing Page Profesional a $${promo.price.toLocaleString("es-CL")} CLP`}
                </span>
                <span className="hidden sm:inline text-white/70 text-xs">
                    (-{discount}% · {promo.remainingSlots} cupos)
                </span>
                <Link
                    href="/formulario/oferta"
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold transition-colors flex-shrink-0"
                >
                    Ver oferta <ArrowRight size={12} />
                </Link>
                <button
                    onClick={handleDismiss}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    aria-label="Cerrar banner"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
