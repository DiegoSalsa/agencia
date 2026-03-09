"use client";

import React from "react";
import { BRIEFING_STATUS_CONFIG } from "@/lib/admin/constants";

interface Props {
  status: string;
  size?: "sm" | "md";
}

export default function StatusBadge({ status, size = "sm" }: Props) {
  const config = BRIEFING_STATUS_CONFIG[status] || BRIEFING_STATUS_CONFIG.nuevo;
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium w-fit ${config.bg} ${config.color} ${sizeClass}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
