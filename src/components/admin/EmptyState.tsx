"use client";

import React, { type ReactNode } from "react";
import { Inbox } from "lucide-react";

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon = <Inbox size={28} className="text-white/20" />,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="text-center py-16">
      <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <p className="text-white/40 text-base font-medium">{title}</p>
      {description && <p className="text-white/20 text-sm mt-2 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
