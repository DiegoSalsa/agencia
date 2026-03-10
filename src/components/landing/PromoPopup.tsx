"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Users, Clock, Check } from "lucide-react";
import { usePromo } from "@/context/PromoContext";

export default function PromoPopup() {
    const { promos, loading } = usePromo();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (loading) return;

        const wasShown = sessionStorage.getItem("promo_popup_shown");
        if (wasShown) return;

        const p = promos.find((d) => d.showPopup);
        if (!p) return;

        const timer = setTimeout(() => {
            setVisible(true);
            sessionStorage.setItem("promo_popup_shown", "1");
        }, 3000);

        return () => clearTimeout(timer);
    }, [promos, loading]);

    const handleClose = () => setVisible(false);

    const promo = promos.find((d) => d.showPopup);
    if (!promo || !visible) return null;

    const discount = Math.round(
        ((promo.originalPrice - promo.price) / promo.originalPrice) * 100
    );

    const features = [
        "Diseño profesional responsive",
        "5 secciones predefinidas",
        "Hosting + dominio incluido",
        "Entrega en 7-10 días hábiles",
    ];

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeInOverlay"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-md bg-white/95 dark:bg-[rgba(9,9,11,0.92)] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/40 overflow-hidden animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                    <X size={16} />
                </button>

                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

                {/* Header */}
                <div className="bg-gradient-to-br from-violet-600/15 via-purple-500/10 to-emerald-500/10 px-6 pt-6 pb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 p-1.5">
                            <Image src="/img/logo.svg" alt="PuroCode" width={24} height={24} className="w-full h-full" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[var(--text)]">
                                {promo.popupTitle || "¡Oferta Especial!"}
                            </h2>
                            <p className="text-xs text-[var(--text-tertiary)]">PuroCode · Tiempo limitado</p>
                        </div>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {promo.popupBody || promo.description || "Obtén tu landing page profesional a precio reducido"}
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-extrabold text-[var(--text)]">
                            ${promo.price.toLocaleString("es-CL")}
                        </span>
                        <span className="text-lg text-[var(--text-tertiary)] line-through decoration-red-400/60">
                            ${promo.originalPrice.toLocaleString("es-CL")}
                        </span>
                        <span className="text-xs font-bold text-violet-300 bg-violet-500/15 px-2 py-0.5 rounded-md">
                            -{discount}%
                        </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-5">
                        {features.map((f) => (
                            <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                                <Check size={14} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Cupos + time */}
                    <div className="flex items-center gap-4 mb-5 text-xs text-[var(--text-tertiary)]">
                        <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-amber-500 dark:text-amber-400" />
                            <span><strong className="text-amber-500 dark:text-amber-400">{promo.remainingSlots}</strong> cupos disponibles</span>
                        </div>
                        {promo.endsAt && (
                            <div className="flex items-center gap-1.5">
                                <Clock size={12} className="text-violet-500 dark:text-violet-400" />
                                <span>Hasta {new Date(promo.endsAt).toLocaleDateString("es-CL")}</span>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/formulario/oferta"
                        onClick={handleClose}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/20 transition-all"
                    >
                        Quiero esta oferta
                        <ArrowRight size={15} />
                    </Link>

                    <button
                        onClick={handleClose}
                        className="w-full mt-2 py-2 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors text-center cursor-pointer"
                    >
                        No, gracias
                    </button>
                </div>
            </div>
        </div>
    );
}
