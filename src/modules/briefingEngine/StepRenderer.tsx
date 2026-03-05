"use client";

import React from "react";
import { StepConfig } from "@/types/briefing";
import { FieldRenderer } from "./FieldRenderer";

interface StepRendererProps {
    step: StepConfig;
}

export function StepRenderer({ step }: StepRendererProps) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
                <p className="text-white/50 text-sm">{step.description}</p>
            </div>
            <div className="space-y-6">
                {step.fields.map((field) => (
                    <FieldRenderer key={field.id} field={field} />
                ))}
            </div>
        </div>
    );
}
