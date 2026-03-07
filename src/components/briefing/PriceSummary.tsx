"use client";

import React, { useMemo } from "react";
import { useBriefingForm } from "@/modules/briefingEngine/context";
import { calculatePrice, formatCLP } from "@/lib/pricingEngine";
import { calculateDelivery } from "@/lib/deliveryCalculator";
import { Receipt, Sparkles, TrendingUp, Clock } from "lucide-react";

interface PriceSummaryProps {
    /** Modo compacto para mostrar en el sticky/nav */
    compact?: boolean;
}

export function PriceSummary({ compact = false }: PriceSummaryProps) {
    const { formData, config } = useBriefingForm();
    const type = config?.type || "LANDING";

    const pricing = useMemo(() => calculatePrice(formData, type), [formData, type]);

    const delivery = useMemo(() => {
        const urgency = (formData.urgency as string) || "normal";
        const estimate = calculateDelivery(type, formData, pricing.totalMin);
        const selected = estimate.urgencyOptions.find((o) => o.id === urgency);
        return selected || estimate.urgencyOptions[0];
    }, [type, formData, pricing.totalMin]);

    // Cada tipo usa distintos campos para determinar datos mínimos
    const hasMinimumData = type === "ECOMMERCE"
        ? !!(formData.productCount) && (formData.paymentMethods as string[])?.length > 0
        : type === "WEB_CORPORATIVA"
            ? (formData.pages as string[])?.length > 0
            : (formData.sections as string[])?.length > 0;

    if (!hasMinimumData && compact) return null;

    if (compact) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-fadeIn">
                <TrendingUp size={12} className="text-emerald-400" />
                <span className="text-xs text-emerald-300 font-medium">
                    Desde {formatCLP(pricing.totalMin)}
                </span>
            </div>
        );
    }

    if (!hasMinimumData) {
        return (
            <div className="mt-6 bg-white/[0.02] border border-white/5 rounded-xl p-5 text-center">
                <Receipt size={20} className="text-white/20 mx-auto mb-2" />
                <p className="text-xs text-white/30">
                    Completa los pasos anteriores para ver la cotización estimada
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-emerald-500/5 to-indigo-500/5 border border-emerald-500/20 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Receipt size={16} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Cotización estimada</h3>
                        <p className="text-[11px] text-white/40">Basada en tus selecciones</p>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="px-5 py-4 space-y-2.5">
                    {pricing.breakdown.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className={`text-xs ${i === 0 ? "text-white/70 font-medium" : "text-white/50"}`}>
                                {item.label}
                            </span>
                            <span className={`text-xs font-mono ${i === 0 ? "text-white/70" : item.amount > 0 ? "text-white/50" : "text-white/30"}`}>
                                {item.amount === 0 ? "incluido" : `+${formatCLP(item.amount)}`}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="px-5 py-4 bg-white/[0.03] border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/80">Inversión estimada</span>
                        <div className="text-right">
                            <span className="text-lg font-bold text-emerald-400">
                                Desde {formatCLP(pricing.totalMin)}
                            </span>
                        </div>
                    </div>
                    {delivery && (
                        <div className="flex items-center gap-1.5 mt-2">
                            <Clock size={11} className="text-white/30" />
                            <span className="text-[11px] text-white/40">
                                {delivery.daysMin === delivery.daysMax
                                    ? `${delivery.daysMin} ${delivery.dayType}`
                                    : `${delivery.daysMin}-${delivery.daysMax} ${delivery.dayType}`}
                            </span>
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5">
                    <div className="flex items-start gap-2">
                        <Sparkles size={12} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-white/30 leading-relaxed">
                            Este es un estimado referencial. El precio final se confirma al revisar tu briefing en detalle.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
