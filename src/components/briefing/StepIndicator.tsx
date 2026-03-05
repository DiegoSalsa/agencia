"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
    steps: { id: string; title: string }[];
    currentStep: number;
    isStepValid: (index: number) => boolean;
}

export function StepIndicator({ steps, currentStep, isStepValid }: StepIndicatorProps) {
    return (
        <div className="w-full">
            {/* Mobile: show progress bar */}
            <div className="sm:hidden">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">
                        Paso {currentStep + 1} de {steps.length}
                    </span>
                    <span className="text-xs font-medium text-indigo-400">{steps[currentStep]?.title}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Desktop: show step circles */}
            <div className="hidden sm:flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep && isStepValid(index);
                    const isCurrent = index === currentStep;
                    const isPast = index < currentStep;

                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isCurrent
                                            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-110"
                                            : isCompleted
                                                ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400"
                                                : isPast
                                                    ? "bg-white/10 border-2 border-white/20 text-white/50"
                                                    : "bg-white/5 border-2 border-white/10 text-white/30"
                                        }`}
                                >
                                    {isCompleted ? <Check size={16} /> : index + 1}
                                </div>
                                <span
                                    className={`text-xs text-center max-w-[80px] leading-tight transition-colors ${isCurrent ? "text-white font-medium" : "text-white/40"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-[2px] mx-2 mt-[-20px] transition-colors duration-300 ${isPast ? "bg-indigo-500/50" : "bg-white/10"
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
