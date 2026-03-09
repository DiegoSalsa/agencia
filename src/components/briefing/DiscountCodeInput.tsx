"use client";

import React, { useState, useCallback } from "react";
import { Tag, Check, X, Loader2 } from "lucide-react";

interface DiscountResult {
    type: "percent" | "fixed";
    value: number;
    label: string;
}

interface DiscountCodeInputProps {
    onApply: (discount: DiscountResult | null) => void;
    promotionId?: string;
}

export function DiscountCodeInput({ onApply, promotionId }: DiscountCodeInputProps) {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [appliedCode, setAppliedCode] = useState<string | null>(null);

    const validate = useCallback(async () => {
        if (!code.trim()) return;
        setStatus("loading");

        try {
            const res = await fetch("/api/promotions/validate-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: code.trim(),
                    ...(promotionId ? { promotionId } : {}),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setMessage(data.error || "Código inválido");
                onApply(null);
                return;
            }

            setStatus("success");
            setMessage(data.label);
            setAppliedCode(code.trim().toUpperCase());
            onApply(data as DiscountResult);
        } catch {
            setStatus("error");
            setMessage("Error al validar el código");
            onApply(null);
        }
    }, [code, promotionId, onApply]);

    const remove = useCallback(() => {
        setCode("");
        setStatus("idle");
        setMessage("");
        setAppliedCode(null);
        onApply(null);
    }, [onApply]);

    if (appliedCode) {
        return (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Tag size={14} className="text-emerald-400 shrink-0" />
                <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-emerald-400">{appliedCode}</span>
                    <span className="text-xs text-emerald-400/70 ml-1.5">— {message}</span>
                </div>
                <button
                    onClick={remove}
                    className="p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
                    aria-label="Quitar código"
                >
                    <X size={14} />
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-1.5">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            if (status === "error") {
                                setStatus("idle");
                                setMessage("");
                            }
                        }}
                        onKeyDown={(e) => e.key === "Enter" && validate()}
                        placeholder="Código de descuento"
                        className="w-full pl-9 pr-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                    />
                </div>
                <button
                    onClick={validate}
                    disabled={!code.trim() || status === "loading"}
                    className="px-4 py-2.5 bg-violet-500/15 border border-violet-500/25 rounded-xl text-xs font-semibold text-violet-400 hover:bg-violet-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                >
                    {status === "loading" ? (
                        <Loader2 size={13} className="animate-spin" />
                    ) : (
                        <Check size={13} />
                    )}
                    Aplicar
                </button>
            </div>
            {status === "error" && message && (
                <p className="text-xs text-red-400 flex items-center gap-1 pl-1">
                    <X size={11} /> {message}
                </p>
            )}
        </div>
    );
}
