"use client";

import Link from "next/link";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";

export default function SuccessPage() {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-slate-950 to-indigo-950/30" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center px-4 max-w-lg animate-slideUp">
                {/* Success Icon */}
                <div className="mb-8 relative inline-block">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={48} className="text-emerald-400" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                        <Sparkles size={24} className="text-yellow-400 animate-pulse" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    ¡Briefing enviado{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        exitosamente
                    </span>
                    !
                </h1>

                <p className="text-white/50 text-lg mb-8 leading-relaxed">
                    Hemos recibido toda la información de tu proyecto.
                    Nos pondremos en contacto contigo pronto para comenzar a trabajar en tu página web.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                    <h3 className="text-sm font-semibold text-white/80 mb-3">¿Qué sigue?</h3>
                    <ul className="text-sm text-white/50 space-y-2 text-left">
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-0.5">1.</span>
                            <span>Revisaremos tu briefing en las próximas horas</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-0.5">2.</span>
                            <span>Te contactaremos para aclarar cualquier duda</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-0.5">3.</span>
                            <span>Comenzaremos a diseñar tu página web</span>
                        </li>
                    </ul>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                    <ArrowLeft size={16} />
                    <span>Volver al inicio</span>
                </Link>
            </div>
        </main>
    );
}
