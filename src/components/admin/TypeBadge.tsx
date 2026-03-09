"use client";

import React from "react";
import { BRIEFING_TYPE_CONFIG } from "@/lib/admin/constants";

interface Props {
  type: string;
  size?: "sm" | "md";
}

export default function TypeBadge({ type, size = "sm" }: Props) {
  const config = BRIEFING_TYPE_CONFIG[type] || BRIEFING_TYPE_CONFIG.LANDING;
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span className={`inline-flex items-center rounded-full border font-medium w-fit ${config.color} ${sizeClass}`}>
      {config.label}
    </span>
  );
}
