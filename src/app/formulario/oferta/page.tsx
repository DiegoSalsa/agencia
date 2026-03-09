"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BriefingFormProvider, useBriefingForm } from "@/modules/briefingEngine/context";
import { StepRenderer } from "@/modules/briefingEngine/StepRenderer";
import { StepIndicator } from "@/components/briefing/StepIndicator";
import { LiveLandingPreview } from "@/components/briefing/LiveLandingPreview";
import { getBriefingConfig } from "@/modules/briefingEngine";
import {
    ArrowLeft, ArrowRight, Send, Loader2, Eye, EyeOff,
    ChevronLeft, X, Zap, Clock, Users, BadgePercent,
} from "lucide-react";
import Link from "next/link";

interface ActivePromotion {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    originalPrice: number;
    totalSlots: number;
    remainingSlots: number;
    fixedSections: string[];
    endsAt: string | null;
}

function formatCLP(amount: number): string {
    return `$${amount.toLocaleString("es-CL")}`;
}

// ── Promo Price Card ──
function PromoPriceCard({ promo }: { promo: ActivePromotion }) {
    const discount = Math.round(
        ((promo.originalPrice - promo.price) / promo.originalPrice) * 100
    );

    return (
        <div className="bg-gradient-to-br from-emerald-500/10 to-violet-500/10 border border-emerald-500/20 rounded-2xl p-5 mt-6">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <BadgePercent size={16} className="text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">Precio Oferta</h3>
                    <p className="text-[10px] text-white/40">Promoción por tiempo limitado</p>
                </div>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-extrabold text-emerald-400">
                    {formatCLP(promo.price)}
                </span>
                <span className="text-sm text-white/30 line-through">
                    {formatCLP(promo.originalPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                    -{discount}%
                </span>
            </div>

            <p className="text-[11px] text-white/30 mb-3">Precio fijo todo incluido · IVA no incluido</p>

            <div className="flex items-center gap-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-amber-400" />
                    <span>
                        <strong className="text-amber-400">{promo.remainingSlots}</strong> cupos disponibles
                    </span>
                </div>
                {promo.endsAt && (
                    <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-violet-400" />
                        <span>Válida hasta {new Date(promo.endsAt).toLocaleDateString("es-CL")}</span>
                    </div>
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[10px] text-white/25">
                    Incluye: Inicio · Servicios · Galería · FAQ · Contacto
                </p>
            </div>
        </div>
    );
}

function OfertaFormContent() {
    const config = getBriefingConfig("OFERTA");
    const {
        currentStep,
        nextStep,
        prevStep,
        setStep,
        setConfig,
        isStepValid,
        isSubmitting,
        totalSteps,
        formData,
    } = useBriefingForm();

    const router = useRouter();
    const [showPreview, setShowPreview] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [promo, setPromo] = useState<ActivePromotion | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const setErrorWithDismiss = useCallback((msg: string | null) => {
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
        setError(msg);
        if (msg) {
            errorTimerRef.current = setTimeout(() => setError(null), 4000);
        }
    }, []);

    // Fetch active promo
    useEffect(() => {
        fetch("/api/promotions/active")
            .then((r) => r.json())
            .then((promos: ActivePromotion[]) => {
                if (Array.isArray(promos) && promos.length > 0) {
                    // Find the first LANDING/OFERTA promo
                    const landingPromo = promos.find(
                        (p: ActivePromotion) => p.fixedSections?.length > 0
                    );
                    if (landingPromo) setPromo(landingPromo);
                }
            })
            .catch(() => { /* silently ignore */ });
    }, []);

    // Set config once loaded
    useEffect(() => {
        if (config) setConfig(config);
    }, [config, setConfig]);

    // History + scroll
    const isHistoryNavRef = useRef(false);
    const initializedRef = useRef(false);

    useEffect(() => {
        const handlePopstate = (e: PopStateEvent) => {
            if (e.state && typeof e.state.briefingStep === "number") {
                isHistoryNavRef.current = true;
                setStep(e.state.briefingStep);
            }
        };
        window.addEventListener("popstate", handlePopstate);
        return () => window.removeEventListener("popstate", handlePopstate);
    }, [setStep]);

    useEffect(() => {
        if (!initializedRef.current) {
            initializedRef.current = true;
            window.history.replaceState({ briefingStep: currentStep }, "");
            return;
        }
        if (isHistoryNavRef.current) {
            isHistoryNavRef.current = false;
            return;
        }
        window.history.pushState({ briefingStep: currentStep }, "");
    }, [currentStep]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    // Warn before leaving
    useEffect(() => {
        const hasData = Object.keys(formData).some((k) => {
            const v = formData[k];
            if (v === undefined || v === "" || v === false) return false;
            if (Array.isArray(v) && v.length === 0) return false;
            return true;
        });
        if (!hasData) return;
        const handleBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [formData]);

    const currentStepConfig = config?.steps[currentStep];
    const isLastStep = currentStep === totalSteps - 1;
    const canProceed = isStepValid(currentStep);

    // Custom submit that injects fixed sections + promo data
    const handleSubmit = useCallback(async () => {
        if (!config || submitting) return;
        setSubmitting(true);
        setError(null);

        try {
            const contactData: Record<string, unknown> = {};
            const contentData: Record<string, unknown> = {};
            const designData: Record<string, unknown> = {};
            const extraData: Record<string, unknown> = {};

            config.steps.forEach((step) => {
                step.fields.forEach((field) => {
                    const value = formData[field.id];
                    if (value !== undefined) {
                        switch (field.dataGroup) {
                            case "contact": contactData[field.id] = value; break;
                            case "content": contentData[field.id] = value; break;
                            case "design": designData[field.id] = value; break;
                            case "extra": extraData[field.id] = value; break;
                        }
                    }
                });
            });

            // Inject fixed sections
            const fixedSections = promo?.fixedSections || ["hero", "servicios", "portafolio", "faq", "contacto"];
            contentData.sections = fixedSections;

            // Inject promo metadata
            extraData.promoId = promo?.id || null;
            extraData.promoSlug = promo?.slug || null;
            extraData.promoPrice = promo?.price || 170000;

            const payload = {
                type: "OFERTA",
                clientName: [
                    formData.firstName,
                    formData.lastNameP,
                    formData.lastNameM,
                ].filter(Boolean).join(" ").trim() || "Sin nombre",
                clientEmail: (formData.email as string) || "",
                contactData,
                contentData,
                designData,
                extraData,
            };

            const response = await fetch("/api/briefings/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Error al enviar");

            setSubmitted(true);
        } catch {
            setErrorWithDismiss("Hubo un error al enviar. Por favor intenta de nuevo.");
        } finally {
            setSubmitting(false);
        }
    }, [config, formData, promo, submitting, setErrorWithDismiss]);

    const handleNext = () => {
        if (isLastStep) {
            handleSubmit();
        } else {
            nextStep();
        }
    };

    const handleGoHome = useCallback((e: React.MouseEvent) => {
        const hasData = Object.keys(formData).some((k) => {
            const v = formData[k];
            if (v === undefined || v === "" || v === false) return false;
            if (Array.isArray(v) && v.length === 0) return false;
            return true;
        });
        if (hasData) {
            const confirmed = window.confirm("¿Estás seguro? Se perderán los datos del formulario.");
            if (!confirmed) e.preventDefault();
        }
    }, [formData]);

    // Success state
    if (submitted) {
        return (
            <main className="min-h-screen flex items-center justify-center relative">
                <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950 to-emerald-950/30 -z-10" />
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Zap size={28} className="text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">¡Briefing enviado!</h1>
                    <p className="text-white/50 mb-2">
                        Recibimos tu solicitud de landing page promocional.
                    </p>
                    <p className="text-white/40 text-sm mb-8">
                        Te contactaremos pronto para comenzar a trabajar en tu proyecto
                        {promo && <> al precio especial de <strong className="text-emerald-400">{formatCLP(promo.price)} CLP</strong></>}.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </main>
        );
    }

    if (!config || !currentStepConfig) return null;

    return (
        <main className="min-h-screen relative">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-violet-950/20 -z-10" />
            <div className="fixed top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-20 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            {/* Top nav */}
            <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        href="/"
                        onClick={handleGoHome}
                        className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                    >
                        <ChevronLeft size={16} />
                        <span>Volver</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-emerald-400" />
                            <h1 className="text-sm font-medium text-white/80">
                                Oferta Especial
                            </h1>
                        </div>
                        {promo && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-fadeIn">
                                <span className="text-xs text-emerald-300 font-medium">
                                    {formatCLP(promo.price)} CLP
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span>Preview</span>
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Step Indicator */}
                <div className="mb-10">
                    <StepIndicator
                        steps={config.steps.map((s) => ({ id: s.id, title: s.title }))}
                        currentStep={currentStep}
                        isStepValid={isStepValid}
                    />
                </div>

                <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-2xl mx-auto"}`}>
                    {/* Form */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
                        <StepRenderer step={currentStepConfig} />

                        {/* Promo Price Card on last step */}
                        {isLastStep && promo && <PromoPriceCard promo={promo} />}

                        {/* Error */}
                        {error && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-between animate-fadeIn">
                                <span>{error}</span>
                                <button onClick={() => setError(null)} className="ml-3 text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0">
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ArrowLeft size={16} />
                                <span>Anterior</span>
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!canProceed || submitting}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isLastStep
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                                    : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25"
                                    }`}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Enviando...</span>
                                    </>
                                ) : isLastStep ? (
                                    <>
                                        <span>Enviar Briefing</span>
                                        <Send size={16} />
                                    </>
                                ) : (
                                    <>
                                        <span>Siguiente</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Live Preview */}
                    {showPreview && (
                        <div className="animate-fadeIn lg:sticky lg:top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto thin-scrollbar">
                            <div className="mb-3 flex items-center justify-between sticky top-0 z-10 bg-slate-950/90 backdrop-blur-sm py-2">
                                <h3 className="text-sm font-medium text-white/60">Vista previa en tiempo real</h3>
                            </div>
                            <LiveLandingPreview />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function OfertaPage() {
    return (
        <BriefingFormProvider>
            <OfertaFormContent />
        </BriefingFormProvider>
    );
}
