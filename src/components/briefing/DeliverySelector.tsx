"use client";

import React, { useMemo, useEffect } from "react";
import { useBriefingForm } from "@/modules/briefingEngine/context";
import { calculatePrice, formatCLP } from "@/lib/pricingEngine";
import { calculateDelivery, UrgencyOption } from "@/lib/deliveryCalculator";
import { Clock, Zap, Rocket, Flame, Check } from "lucide-react";

const URGENCY_ICONS: Record<string, React.ReactNode> = {
    normal: <Clock size={16} />,
    prioridad: <Zap size={16} />,
    express: <Rocket size={16} />,
    urgente: <Flame size={16} />,
};

const URGENCY_COLORS: Record<string, { ring: string; bg: string; text: string; border: string }> = {
    normal: {
        ring: "ring-emerald-500/50",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
    },
    prioridad: {
        ring: "ring-amber-500/50",
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
    },
    express: {
        ring: "ring-orange-500/50",
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        border: "border-orange-500/30",
    },
    urgente: {
        ring: "ring-red-500/50",
        bg: "bg-red-500/10",
        text: "text-red-400",
        border: "border-red-500/30",
    },
};

function formatDaysRange(option: UrgencyOption): string {
    if (option.daysMin === option.daysMax) {
        return `${option.daysMin} ${option.dayType}`;
    }
    return `${option.daysMin}-${option.daysMax} ${option.dayType}`;
}

export function DeliverySelector() {
    const { formData, updateField, config } = useBriefingForm();
    const type = config?.type || "LANDING";
    const selectedUrgency = (formData.urgency as string) || "normal";

    // Set default value on mount so validation passes
    useEffect(() => {
        if (!formData.urgency) {
            updateField("urgency", "normal");
        }
    }, [formData.urgency, updateField]);

    // Calculate price without urgency
    const pricing = useMemo(() => calculatePrice(formData, type), [formData, type]);

    // Calculate delivery estimate
    const delivery = useMemo(
        () => calculateDelivery(type, formData, pricing.totalMin),
        [type, formData, pricing.totalMin]
    );

    const handleSelect = (urgencyId: string) => {
        updateField("urgency", urgencyId);
    };

    return (
        <div className="space-y-4">
            {/* Header with estimated time */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Clock size={14} className="text-indigo-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Tiempo de entrega estimado</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                    Basado en lo que seleccionaste, tu proyecto tomaría aproximadamente{" "}
                    <span className="text-white font-medium">
                        {delivery.baseDaysMin === delivery.baseDaysMax
                            ? `${delivery.baseDaysMin} días hábiles`
                            : `${delivery.baseDaysMin}-${delivery.baseDaysMax} días hábiles`}
                    </span>
                    .
                </p>
            </div>

            {/* Urgency options */}
            <div className="space-y-2">
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                    Elige tu nivel de urgencia
                </p>
                <div className="grid gap-2">
                    {delivery.urgencyOptions.map((option) => {
                        const isSelected = selectedUrgency === option.id;
                        const colors = URGENCY_COLORS[option.id] || URGENCY_COLORS.normal;

                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelect(option.id)}
                                className={`
                                    relative w-full text-left p-3.5 rounded-xl border transition-all duration-200
                                    ${isSelected
                                        ? `${colors.border} ${colors.bg} ring-2 ${colors.ring}`
                                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Selection indicator */}
                                        <div
                                            className={`
                                                w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                                                ${isSelected
                                                    ? `${colors.border} ${colors.bg}`
                                                    : "border-white/20"
                                                }
                                            `}
                                        >
                                            {isSelected && (
                                                <Check size={12} className={colors.text} />
                                            )}
                                        </div>

                                        {/* Icon + label */}
                                        <div className="flex items-center gap-2">
                                            <span className={isSelected ? colors.text : "text-white/40"}>
                                                {URGENCY_ICONS[option.id]}
                                            </span>
                                            <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-white/70"}`}>
                                                {option.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-right">
                                        {/* Days range */}
                                        <span className={`text-xs ${isSelected ? "text-white/70" : "text-white/40"}`}>
                                            {formatDaysRange(option)}
                                        </span>

                                        {/* Surcharge */}
                                        <span className={`text-xs font-medium min-w-[80px] text-right ${
                                            option.surchargeAmount === 0
                                                ? isSelected ? "text-emerald-400" : "text-white/40"
                                                : isSelected ? colors.text : "text-white/40"
                                        }`}>
                                            {option.surchargeAmount === 0
                                                ? "Sin cargo"
                                                : `+${formatCLP(option.surchargeAmount)}`}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
