"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { BriefingFormProvider, useBriefingForm } from "@/modules/briefingEngine/context";
import { StepRenderer } from "@/modules/briefingEngine/StepRenderer";
import { StepIndicator } from "@/components/briefing/StepIndicator";
import { LiveLandingPreview } from "@/components/briefing/LiveLandingPreview";
import { LiveWebCorporativaPreview } from "@/components/briefing/LiveWebCorporativaPreview";
import { LiveEcommercePreview } from "@/components/briefing/LiveEcommercePreview";
import { getBriefingConfig } from "@/modules/briefingEngine";
import { BriefingTypeConfig } from "@/types/briefing";
import { ArrowLeft, ArrowRight, Send, Loader2, Eye, EyeOff, ChevronLeft, Maximize2, X } from "lucide-react";
import Link from "next/link";
import { PriceSummary } from "@/components/briefing/PriceSummary";

// ── Types that support live preview ──
const PREVIEW_TYPES = ["LANDING", "WEB_CORPORATIVA", "ECOMMERCE"];
function hasPreview(type: string) { return PREVIEW_TYPES.includes(type); }

function PreviewByType({ type }: { type: string }) {
    if (type === "ECOMMERCE") return <LiveEcommercePreview />;
    if (type === "WEB_CORPORATIVA") return <LiveWebCorporativaPreview />;
    return <LiveLandingPreview />;
}

// ── Fullscreen Preview Modal ──────────────────────────────
function FullscreenPreviewModal({ onClose, type }: { onClose: () => void; type: string }) {
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Prevent body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
                <X size={20} />
            </button>
            {/* Preview container — click inside must NOT close */}
            <div
                className="w-full h-full max-w-5xl mx-auto px-4 py-12 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-w-3xl mx-auto rounded-2xl shadow-2xl">
                    <PreviewByType type={type} />
                </div>
            </div>
        </div>
    );
}

function BriefingFormContent({ config }: { config: BriefingTypeConfig }) {
    const {
        currentStep,
        nextStep,
        prevStep,
        setStep,
        setConfig,
        submitForm,
        isStepValid,
        isSubmitting,
        totalSteps,
        formData,
    } = useBriefingForm();

    const router = useRouter();
    const [showPreview, setShowPreview] = useState(false);
    const [fullscreenPreview, setFullscreenPreview] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Auto-dismiss error after 3 seconds
    const setErrorWithDismiss = useCallback((msg: string | null) => {
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
        setError(msg);
        if (msg) {
            errorTimerRef.current = setTimeout(() => setError(null), 3000);
        }
    }, []);

    // ── History API: sync steps with browser back/forward ──
    const isHistoryNavRef = useRef(false);
    const initializedRef = useRef(false);

    // Listen for browser back/forward (popstate)
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

    // Push/replace history when step changes
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

    // ── Warn before leaving with unsaved data ──
    useEffect(() => {
        const hasData = Object.keys(formData).some((k) => {
            const v = formData[k];
            if (v === undefined || v === "" || v === false) return false;
            if (Array.isArray(v) && v.length === 0) return false;
            return true;
        });
        if (!hasData) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [formData]);

    useEffect(() => {
        setConfig(config);
    }, [config, setConfig]);

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const currentStepConfig = config.steps[currentStep];
    const isLastStep = currentStep === totalSteps - 1;
    const canProceed = isStepValid(currentStep);

    const handleNext = () => {
        if (isLastStep) {
            handleSubmit();
        } else {
            nextStep();
        }
    };

    const handleSubmit = async () => {
        try {
            setError(null);
            await submitForm();
            router.push("/formulario/success");
        } catch {
            setErrorWithDismiss("Hubo un error al enviar. Por favor intenta de nuevo.");
        }
    };

    const closeFullscreen = useCallback(() => setFullscreenPreview(false), []);

    // Handle "Volver al inicio" with confirmation if form has data
    const handleGoHome = useCallback((e: React.MouseEvent) => {
        const hasData = Object.keys(formData).some((k) => {
            const v = formData[k];
            if (v === undefined || v === "" || v === false) return false;
            if (Array.isArray(v) && v.length === 0) return false;
            return true;
        });
        if (hasData) {
            const confirmed = window.confirm(
                "¿Estás seguro? Se perderán los datos del formulario."
            );
            if (!confirmed) {
                e.preventDefault();
            }
        }
    }, [formData]);

    if (!currentStepConfig) return null;

    return (
        <main className="min-h-screen relative">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950 to-purple-950/30 -z-10" />
            <div className="fixed top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-20 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Fullscreen preview modal */}
            {fullscreenPreview && hasPreview(config.type) && (
                <FullscreenPreviewModal onClose={closeFullscreen} type={config.type} />
            )}

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
                        <h1 className="text-sm font-medium text-white/80">
                            Briefing — {config.label}
                        </h1>
                        {hasPreview(config.type) && <PriceSummary compact />}
                    </div>
                    {hasPreview(config.type) && (
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span>Preview</span>
                        </button>
                    )}
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

                        {/* Price Summary — full breakdown on last step */}
                        {hasPreview(config.type) && isLastStep && (
                            <PriceSummary />
                        )}

                        {/* Error — auto-dismisses in 3s, can be closed manually */}
                        {error && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-between animate-fadeIn">
                                <span>{error}</span>
                                <button
                                    onClick={() => setError(null)}
                                    className="ml-3 text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0"
                                    aria-label="Cerrar error"
                                >
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
                                disabled={!canProceed || isSubmitting}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isLastStep
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                                    : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25"
                                    }`}
                            >
                                {isSubmitting ? (
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

                    {/* Live Preview — reads from context, no props needed */}
                    {showPreview && hasPreview(config.type) && (
                        <div className="animate-fadeIn lg:sticky lg:top-24">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-sm font-medium text-white/60">Vista previa en tiempo real</h3>
                                <button
                                    onClick={() => setFullscreenPreview(true)}
                                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    <Maximize2 size={12} />
                                    <span>Expandir</span>
                                </button>
                            </div>
                            <PreviewByType type={config.type} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function BriefingPage() {
    const params = useParams();
    const type = (params.type as string)?.toUpperCase().replace(/-/g, '_');
    const config = getBriefingConfig(type || "");

    if (!config) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Tipo de briefing no encontrado</h1>
                    <Link
                        href="/"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <BriefingFormProvider>
            <BriefingFormContent config={config} />
        </BriefingFormProvider>
    );
}
