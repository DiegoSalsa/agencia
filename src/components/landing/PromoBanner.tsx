"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Zap, ArrowRight } from "lucide-react";

interface ActivePromo {
    slug: string;
    price: number;
    originalPrice: number;
    remainingSlots: number;
    bannerText: string | null;
    showBanner: boolean;
}

export default function PromoBanner() {
    const [promo, setPromo] = useState<ActivePromo | null>(null);
    const [dismissed, setDismissed] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if user dismissed this session
        const wasDismissed = sessionStorage.getItem("promo_banner_dismissed");
        if (wasDismissed) return;

        fetch("/api/promotions/active")
            .then((r) => r.json())
            .then((promos: ActivePromo[]) => {
                const p = promos.find((d: ActivePromo) => d.showBanner);
                if (p) setPromo(p);
            })
            .catch(() => { });
    }, []);

    // Set CSS custom property for header offset
    useEffect(() => {
        if (promo && !dismissed && bannerRef.current) {
            const height = bannerRef.current.offsetHeight;
            document.documentElement.style.setProperty("--promo-banner-height", `${height}px`);
        } else {
            document.documentElement.style.setProperty("--promo-banner-height", "0px");
        }
        return () => {
            document.documentElement.style.setProperty("--promo-banner-height", "0px");
        };
    }, [promo, dismissed]);

    const handleDismiss = () => {
        setDismissed(true);
        sessionStorage.setItem("promo_banner_dismissed", "1");
    };

    if (!promo || dismissed) return null;

    const discount = Math.round(
        ((promo.originalPrice - promo.price) / promo.originalPrice) * 100
    );

    return (
        <div ref={bannerRef} className="relative z-[55] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
                <Zap size={14} className="flex-shrink-0 animate-pulse" />
                <span className="font-medium truncate">
                    {promo.bannerText || `🔥 Landing Page Profesional a $${promo.price.toLocaleString("es-CL")} CLP`}
                </span>
                <span className="hidden sm:inline text-emerald-100/80 text-xs">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Cerrar banner"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
