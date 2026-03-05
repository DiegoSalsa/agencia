"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertCircle, Eye, EyeOff, Shield, Zap } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const token = sessionStorage.getItem("admin_token");
        if (token) router.push("/admin/dashboard");
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                const data = await res.json();
                sessionStorage.setItem("admin_token", data.token);
                router.push("/admin/dashboard");
            } else {
                setError("Contraseña incorrecta");
                setPassword("");
            }
        } catch {
            setError("Error de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/[0.08] rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }} />
            </div>

            <div className={`relative z-10 w-full max-w-md px-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {/* Badge */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-400">
                        <Shield size={12} />
                        <span>Panel de Administración</span>
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-black/20">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="relative w-20 h-20 mx-auto mb-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-6 opacity-20" />
                            <div className="relative w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center">
                                <Lock size={32} className="text-indigo-400" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Puro<span className="text-indigo-400">Code</span>
                        </h1>
                        <p className="text-sm text-white/40 mt-2">Ingresa tu contraseña para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="Contraseña"
                                className={`w-full px-4 py-3.5 pr-12 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                                    error
                                        ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50"
                                        : "border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                                }`}
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                                <AlertCircle size={14} className="flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-40 transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Verificando...</span>
                                </>
                            ) : (
                                <>
                                    <Zap size={16} className="group-hover:scale-110 transition-transform" />
                                    <span>Acceder al Panel</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-white/5 text-center">
                        <p className="text-xs text-white/20">
                            Sesión protegida con JWT · Expira en 24h
                        </p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                        ← Volver al sitio
                    </a>
                </div>
            </div>
        </main>
    );
}
