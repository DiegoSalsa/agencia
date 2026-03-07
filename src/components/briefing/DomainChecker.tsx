"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useBriefingForm } from "@/modules/briefingEngine/context";
import { Check, X, Loader2, Globe } from "lucide-react";

interface DomainResult {
    domain: string;
    extension: string;
    available: boolean;
}

export function DomainChecker() {
    const { formData, updateField } = useBriefingForm();
    const hasDomain = (formData.hasDomain as string) || "";
    const domainName = (formData.domainName as string) || "";
    const [results, setResults] = useState<DomainResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastCheckedRef = useRef<string>("");

    const shouldCheck = hasDomain === "necesito" || hasDomain === "no_se";

    // Clean the input to extract base name
    const extractBaseName = useCallback((input: string): string => {
        let name = input.toLowerCase().trim();
        // Remove protocol
        name = name.replace(/^(https?:\/\/)?(www\.)?/, "");
        // Remove extension if present
        name = name.replace(/\.(com|net|io|cl|org|co|dev|app).*$/, "");
        // Remove invalid chars
        name = name.replace(/[^a-z0-9-]/g, "");
        // Trim hyphens
        name = name.replace(/^-+|-+$/g, "");
        return name;
    }, []);

    const checkDomain = useCallback(async (baseName: string) => {
        if (baseName.length < 2) {
            setResults([]);
            setHasChecked(false);
            return;
        }

        if (baseName === lastCheckedRef.current) return;
        lastCheckedRef.current = baseName;

        setIsLoading(true);
        setHasChecked(false);

        try {
            const response = await fetch("/api/domains/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: baseName }),
            });

            const data = await response.json();

            if (data.ok && data.results) {
                setResults(data.results);
                // Save results to form data
                updateField("domainResults", data.results);
            } else {
                setResults([]);
            }
        } catch {
            setResults([]);
        } finally {
            setIsLoading(false);
            setHasChecked(true);
        }
    }, [updateField]);

    // Debounced check when domain name changes
    useEffect(() => {
        if (!shouldCheck || !domainName) {
            setResults([]);
            setHasChecked(false);
            lastCheckedRef.current = "";
            return;
        }

        const baseName = extractBaseName(domainName);
        if (baseName.length < 2) {
            setResults([]);
            setHasChecked(false);
            return;
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            checkDomain(baseName);
        }, 1500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [domainName, shouldCheck, extractBaseName, checkDomain]);

    // Don't render checker if user already has a domain
    if (!shouldCheck) return null;

    return (
        <div className="mt-3 space-y-2">
            {/* Loading state */}
            {isLoading && (
                <div className="flex items-center gap-2 py-2 px-3 bg-white/[0.03] rounded-lg border border-white/5">
                    <Loader2 size={14} className="text-indigo-400 animate-spin" />
                    <span className="text-xs text-white/50">Verificando disponibilidad...</span>
                </div>
            )}

            {/* Results */}
            {!isLoading && hasChecked && results.length > 0 && (
                <div className="bg-white/[0.03] rounded-xl border border-white/10 overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
                        <Globe size={12} className="text-indigo-400" />
                        <span className="text-xs text-white/50 font-medium">Disponibilidad de dominio</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {results.map((result) => (
                            <div
                                key={result.domain}
                                className="flex items-center justify-between px-3 py-2.5"
                            >
                                <span className="text-sm text-white/80 font-mono">
                                    {result.domain}
                                </span>
                                {result.available ? (
                                    <div className="flex items-center gap-1.5">
                                        <Check size={14} className="text-emerald-400" />
                                        <span className="text-xs text-emerald-400 font-medium">
                                            Disponible
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5">
                                        <X size={14} className="text-red-400/70" />
                                        <span className="text-xs text-red-400/70 font-medium">
                                            No disponible
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No results */}
            {!isLoading && hasChecked && results.length === 0 && domainName && extractBaseName(domainName).length >= 2 && (
                <div className="py-2 px-3 bg-white/[0.02] rounded-lg border border-white/5">
                    <span className="text-xs text-white/30">
                        No pudimos verificar la disponibilidad en este momento.
                    </span>
                </div>
            )}

            {/* Hint */}
            {!isLoading && !hasChecked && domainName && extractBaseName(domainName).length >= 2 && (
                <p className="text-[10px] text-white/25">
                    Verificaremos la disponibilidad automáticamente...
                </p>
            )}
        </div>
    );
}
