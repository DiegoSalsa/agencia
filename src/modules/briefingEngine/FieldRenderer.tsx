"use client";

import React, { useCallback } from "react";
import { FieldConfig } from "@/types/briefing";
import { useBriefingForm } from "@/modules/briefingEngine/context";
import { Check, AlertTriangle } from "lucide-react";

interface FieldRendererProps {
    field: FieldConfig;
}

// ── Sanitization helpers ──────────────────────────────────

/** Strip HTML tags, script injections, SQL keywords, etc. */
function sanitizeText(input: string): string {
    // Remove HTML tags
    let clean = input.replace(/<[^>]*>/g, "");
    // Remove potential script injections
    clean = clean.replace(/javascript:/gi, "");
    clean = clean.replace(/on\w+\s*=/gi, "");
    // Remove SQL injection patterns
    clean = clean.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE)\b)/gi, "");
    clean = clean.replace(/(--)|(;)|(\/\*)|(\*\/)/g, "");
    clean = clean.replace(/['"]?\s*(OR|AND)\s*['"]?\s*\d+\s*=\s*\d+/gi, "");
    return clean;
}

/** Format Chilean phone number: +56 9 XXXX XXXX */
function formatChileanPhone(input: string): string {
    // Remove everything except digits and +
    let digits = input.replace(/[^\d+]/g, "");

    // Handle +56 prefix
    if (digits.startsWith("+56")) {
        digits = digits.slice(3);
    } else if (digits.startsWith("56") && digits.length > 9) {
        digits = digits.slice(2);
    } else if (digits.startsWith("+")) {
        digits = digits.slice(1);
    }

    // Remove leading 0 if present
    if (digits.startsWith("0")) {
        digits = digits.slice(1);
    }

    // Only keep up to 9 digits
    digits = digits.slice(0, 9);

    if (digits.length === 0) return "";

    // Format: +56 9 XXXX XXXX
    let formatted = "+56 ";
    if (digits.length >= 1) {
        formatted += digits.slice(0, 1);
    }
    if (digits.length > 1) {
        formatted += " " + digits.slice(1, 5);
    }
    if (digits.length > 5) {
        formatted += " " + digits.slice(5, 9);
    }
    return formatted;
}

/** Validate phone number format */
function isValidPhone(value: string): boolean {
    if (!value) return true; // Optional field
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 12;
}

/** Validate email format */
function isValidEmail(value: string): boolean {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Validate URL format */
function isValidUrl(value: string): boolean {
    if (!value) return true;
    // Allow simple URLs
    return /^(https?:\/\/)?[\w.-]+\.\w{2,}(\/.*)?$/.test(value);
}

/** Validate color hex */
function isValidColor(value: string): boolean {
    if (!value) return true;
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}

export function FieldRenderer({ field }: FieldRendererProps) {
    const { formData, updateField } = useBriefingForm();
    const value = formData[field.id];

    const autofillStyle = {
        WebkitBoxShadow: "0 0 0 1000px #0f172a inset", // slate-900 background
        WebkitTextFillColor: "white",
        caretColor: "white",
    };

    const baseInputClass =
        "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200";

    const errorInputClass =
        "w-full px-4 py-3 bg-red-900/20 border border-red-500/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200";


    // Sanitized update with type-specific formatting
    const handleChange = useCallback(
        (fieldId: string, rawValue: string, type: string) => {
            let processed = rawValue;

            if (type === "tel") {
                processed = formatChileanPhone(rawValue);
            } else if (type === "url") {
                // Don't sanitize URLs aggressively — just trim
                processed = rawValue.trim();
            } else if (type !== "color") {
                processed = sanitizeText(rawValue);
            }

            updateField(fieldId, processed);
        },
        [updateField]
    );

    // Get validation error
    const getError = (): string | null => {
        const v = (value as string) || "";
        if (!v) return null;

        switch (field.type) {
            case "email":
                return isValidEmail(v) ? null : "Formato de email inválido";
            case "tel":
                return isValidPhone(v) ? null : "Formato: +56 9 XXXX XXXX";
            case "url":
                return isValidUrl(v) ? null : "URL inválida";
            case "color":
                return isValidColor(v) ? null : "Código hex inválido (ej: #6366f1)";
            default:
                return null;
        }
    };

    const error = getError();
    const inputClass = error ? errorInputClass : baseInputClass;

    switch (field.type) {
        case "text":
        case "email":
        case "url":
            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <input
                        type={field.type}
                        value={(value as string) || ""}
                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                        placeholder={field.placeholder}
                        className={inputClass}
                        maxLength={500}
                        style={autofillStyle}
                    />
                    {error && <ErrorText text={error} />}
                    {!error && field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        case "tel":
            // Strip +56 prefix for display if present
            const displayValue = ((value as string) || "").replace(/^\+56\s?/, "");
            const isError = !!error;

            const containerClass = isError
                ? "w-full px-4 py-3 bg-red-900/20 border border-red-500/50 rounded-xl flex items-center gap-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-red-500/50 focus-within:border-red-500/50"
                : "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50";

            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <div className={containerClass}>
                        <span className="text-gray-500 select-none font-medium">+56</span>
                        <input
                            type="text"
                            value={displayValue}
                            onChange={(e) => {
                                // Combine constant prefix with user input
                                const fullValue = "+56 " + e.target.value;
                                handleChange(field.id, fullValue, "tel");
                            }}
                            placeholder=""
                            className="bg-transparent border-none p-0 w-full text-white placeholder-white/30 focus:outline-none focus:ring-0"
                            maxLength={11}
                            style={autofillStyle}
                        />
                    </div>
                    {error && <ErrorText text={error} />}
                    {!error && field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        case "textarea":
            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <textarea
                        value={(value as string) || ""}
                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                        placeholder={field.placeholder}
                        rows={4}
                        className={`${baseInputClass} resize-none`}
                        maxLength={2000}
                        style={autofillStyle}
                    />
                    <div className="flex justify-between">
                        {field.helperText && <HelperText text={field.helperText} />}
                        <span className="text-[10px] text-white/20 ml-auto">
                            {((value as string) || "").length}/2000
                        </span>
                    </div>
                </div>
            );

        case "select":
            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <select
                        value={(value as string) || ""}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        className={`${baseInputClass} appearance-none cursor-pointer`}
                    >
                        <option value="" className="bg-slate-900">
                            Selecciona una opción...
                        </option>
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-slate-900">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        case "multiselect":
            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {field.options?.map((opt) => {
                            const selected = Array.isArray(value) && value.includes(opt.value);
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        const current = Array.isArray(value) ? value : [];
                                        const next = selected
                                            ? current.filter((v) => v !== opt.value)
                                            : [...current, opt.value];
                                        updateField(field.id, next);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all duration-200 ${selected
                                        ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-indigo-500 border-indigo-500" : "border-white/30"
                                            }`}
                                    >
                                        {selected && <Check size={12} className="text-white" />}
                                    </div>
                                    <span>{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Pricing notes */}
                    {field.maxFree && (() => {
                        const count = Array.isArray(value) ? value.length : 0;
                        const over = count > field.maxFree!;
                        return (
                            <div className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                                over
                                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                                    : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                            }`}>
                                <span>{over ? "⚠️" : "✅"}</span>
                                <span>
                                    {over
                                        ? `Has seleccionado ${count}. Las primeras ${field.maxFree} están incluidas, cada adicional tiene costo extra.`
                                        : `Has seleccionado ${count} de ${field.maxFree} incluidas.`
                                    }
                                </span>
                            </div>
                        );
                    })()}

                    {field.paidBadge && (
                        <div className="flex items-start gap-2 px-3 py-2 rounded-lg text-sm bg-amber-500/10 border border-amber-500/30 text-amber-300">
                            <span>{field.paidBadge}</span>
                        </div>
                    )}

                    {field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        case "radio":
            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <div className="space-y-2">
                        {field.options?.map((opt) => {
                            const selected = value === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => updateField(field.id, opt.value)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all duration-200 ${selected
                                        ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${selected ? "bg-indigo-500 border-indigo-500" : "border-white/30"
                                            }`}
                                    >
                                        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                    <span>{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    {field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        case "color":
            return (
                <div className="space-y-2">
                    <Label field={field} />
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={(value as string) || "#6366f1"}
                            onChange={(e) => updateField(field.id, e.target.value)}
                            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white/10 bg-transparent"
                        />
                        <input
                            type="text"
                            value={(value as string) || ""}
                            onChange={(e) => handleChange(field.id, e.target.value, "color")}
                            placeholder="#000000"
                            className={`${error ? errorInputClass : baseInputClass} flex-1`}
                            maxLength={7}
                            style={autofillStyle}
                        />
                    </div>
                    {error && <ErrorText text={error} />}
                    {!error && field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        case "checkbox":
            return (
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() => updateField(field.id, !value)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${value ? "bg-indigo-500 border-indigo-500" : "border-white/30"
                                }`}
                        >
                            {value && <Check size={12} className="text-white" />}
                        </div>
                        <span className="text-sm text-white/90">{field.label}</span>
                        {field.required && <span className="text-red-400 text-xs">*</span>}
                    </button>
                    {field.helperText && <HelperText text={field.helperText} />}
                </div>
            );

        default:
            return null;
    }
}

function Label({ field }: { field: FieldConfig }) {
    return (
        <label className="block text-sm font-medium text-white/90">
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
        </label>
    );
}

function HelperText({ text }: { text: string }) {
    return <p className="text-xs text-white/40">{text}</p>;
}

function ErrorText({ text }: { text: string }) {
    return (
        <p className="text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle size={11} />
            {text}
        </p>
    );
}
