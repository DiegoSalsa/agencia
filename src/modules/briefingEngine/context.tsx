"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { FormData, BriefingTypeConfig } from "@/types/briefing";

interface BriefingFormState {
    currentStep: number;
    formData: FormData;
    config: BriefingTypeConfig | null;
    isSubmitting: boolean;
    isSubmitted: boolean;
}

interface BriefingFormContextType extends BriefingFormState {
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateField: (fieldId: string, value: string | string[] | boolean) => void;
    updateFields: (data: Partial<FormData>) => void;
    setConfig: (config: BriefingTypeConfig) => void;
    submitForm: () => Promise<void>;
    getStepData: (stepId: string) => FormData;
    isStepValid: (stepIndex: number) => boolean;
    totalSteps: number;
}

const BriefingFormContext = createContext<BriefingFormContextType | undefined>(undefined);

export function BriefingFormProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<BriefingFormState>({
        currentStep: 0,
        formData: {},
        config: null,
        isSubmitting: false,
        isSubmitted: false,
    });

    const setConfig = useCallback((config: BriefingTypeConfig) => {
        setState((prev) => ({ ...prev, config }));
    }, []);

    const setStep = useCallback((step: number) => {
        setState((prev) => ({ ...prev, currentStep: step }));
    }, []);

    const nextStep = useCallback(() => {
        setState((prev) => ({
            ...prev,
            currentStep: Math.min(prev.currentStep + 1, (prev.config?.steps.length ?? 1) - 1),
        }));
    }, []);

    const prevStep = useCallback(() => {
        setState((prev) => ({
            ...prev,
            currentStep: Math.max(prev.currentStep - 1, 0),
        }));
    }, []);

    const updateField = useCallback((fieldId: string, value: string | string[] | boolean) => {
        setState((prev) => ({
            ...prev,
            formData: { ...prev.formData, [fieldId]: value },
        }));
    }, []);

    const updateFields = useCallback((data: Partial<FormData>) => {
        setState((prev) => ({
            ...prev,
            formData: { ...prev.formData, ...data },
        }));
    }, []);

    const getStepData = useCallback(
        (stepId: string): FormData => {
            if (!state.config) return {};
            const step = state.config.steps.find((s) => s.id === stepId);
            if (!step) return {};
            const data: FormData = {};
            step.fields.forEach((f) => {
                if (state.formData[f.id] !== undefined) {
                    data[f.id] = state.formData[f.id];
                }
            });
            return data;
        },
        [state.config, state.formData]
    );

    const isStepValid = useCallback(
        (stepIndex: number): boolean => {
            if (!state.config) return false;
            const step = state.config.steps[stepIndex];
            if (!step) return false;
            return step.fields
                .filter((f) => f.required)
                .every((f) => {
                    const val = state.formData[f.id];
                    if (val === undefined || val === "") return false;
                    if (Array.isArray(val) && val.length === 0) return false;
                    return true;
                });
        },
        [state.config, state.formData]
    );

    const submitForm = useCallback(async () => {
        if (!state.config) return;
        setState((prev) => ({ ...prev, isSubmitting: true }));

        try {
            const contactData: Record<string, unknown> = {};
            const contentData: Record<string, unknown> = {};
            const designData: Record<string, unknown> = {};
            const extraData: Record<string, unknown> = {};

            state.config.steps.forEach((step) => {
                step.fields.forEach((field) => {
                    const value = state.formData[field.id];
                    if (value !== undefined) {
                        switch (field.dataGroup) {
                            case "contact":
                                contactData[field.id] = value;
                                break;
                            case "content":
                                contentData[field.id] = value;
                                break;
                            case "design":
                                designData[field.id] = value;
                                break;
                            case "extra":
                                extraData[field.id] = value;
                                break;
                        }
                    }
                });
            });

            const payload = {
                type: state.config.type,
                clientName: (state.formData.clientName as string) || "Sin nombre",
                clientEmail: (state.formData.email as string) || "",
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

            if (!response.ok) {
                throw new Error("Error al enviar el formulario");
            }

            setState((prev) => ({ ...prev, isSubmitted: true, isSubmitting: false }));
        } catch (error) {
            console.error("Submit error:", error);
            setState((prev) => ({ ...prev, isSubmitting: false }));
            throw error;
        }
    }, [state.config, state.formData]);

    const totalSteps = state.config?.steps.length ?? 0;

    return (
        <BriefingFormContext.Provider
            value={{
                ...state,
                setStep,
                nextStep,
                prevStep,
                updateField,
                updateFields,
                setConfig,
                submitForm,
                getStepData,
                isStepValid,
                totalSteps,
            }}
        >
            {children}
        </BriefingFormContext.Provider>
    );
}

export function useBriefingForm() {
    const context = useContext(BriefingFormContext);
    if (context === undefined) {
        throw new Error("useBriefingForm must be used within a BriefingFormProvider");
    }
    return context;
}
