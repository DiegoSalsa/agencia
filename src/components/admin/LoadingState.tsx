"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface Props {
  message?: string;
}

export default function LoadingState({ message = "Cargando..." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 size={28} className="text-indigo-400 animate-spin" />
      <p className="text-sm text-white/30">{message}</p>
    </div>
  );
}
