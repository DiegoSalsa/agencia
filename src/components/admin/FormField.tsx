"use client";

import React, { type ReactNode } from "react";

interface Props {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export default function FormField({ label, required, hint, children }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-white/50">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-white/25">{hint}</p>}
    </div>
  );
}
