"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Zap, ArrowRight, Users, Clock, Check } from "lucide-react";

interface ActivePromo {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    originalPrice: number;
    remainingSlots: number;
    totalSlots: number;
    showPopup: boolean;
    popupTitle: string | null;
    popupBody: string | null;
    endsAt: string | null;
}

export default function PromoPopup() {
    const [promo, setPromo] = useState<ActivePromo | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show once per session
        const wasShown = sessionStorage.getItem("promo_popup_shown");
        if (wasShown) return;

        // Fetch promo after delay (3s)
        const timer = setTimeout(() => {
            fetch("/api/promotions/active")
                .then((r) => r.json())
                .then((promos: ActivePromo[]) => {
                    if (Array.isArray(promos) && promos.length > 0) {
                        const p = promos.find((d: ActivePromo) => d.showPopup);
                        if (p) {
                            setPromo(p);
                            setVisible(true);
                            sessionStorage.setItem("promo_popup_shown", "1");
                        }
                    }
                })
                .catch(() => { });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

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
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                {/* Gradient header */}
                <div className="bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-violet-500/10 px-6 pt-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                            <Zap size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {promo.popupTitle || "¡Oferta Especial!"}
                            </h2>
                            <p className="text-xs text-white/40">Tiempo limitado</p>
                        </div>
                    </div>

                    <p className="text-sm text-white/50">
                        {promo.popupBody || promo.description || "Obtén tu landing page profesional a precio reducido"}
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-extrabold text-emerald-400">
                            ${promo.price.toLocaleString("es-CL")}
                        </span>
                        <span className="text-lg text-white/30 line-through">
                            ${promo.originalPrice.toLocaleString("es-CL")}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                            -{discount}%
                        </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-5">
                        {features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-white/50">
                                <Check size={14} className="text-emerald-400 flex-shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Cupos + time */}
                    <div className="flex items-center gap-4 mb-5 text-xs text-white/40">
                        <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-amber-400" />
                            <span><strong className="text-amber-400">{promo.remainingSlots}</strong> / {promo.totalSlots} cupos</span>
                        </div>
                        {promo.endsAt && (
                            <div className="flex items-center gap-1.5">
                                <Clock size={12} className="text-violet-400" />
                                <span>Hasta {new Date(promo.endsAt).toLocaleDateString("es-CL")}</span>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/formulario/oferta"
                        onClick={handleClose}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                        Quiero esta oferta
                        <ArrowRight size={15} />
                    </Link>

                    <button
                        onClick={handleClose}
                        className="w-full mt-2 py-2 text-xs text-white/30 hover:text-white/50 transition-colors text-center"
                    >
                        No, gracias
                    </button>
                </div>
            </div>
        </div>
    );
}
