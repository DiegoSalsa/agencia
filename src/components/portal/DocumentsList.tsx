"use client";

import React from "react";
import { FileText, Download } from "lucide-react";
import type { ProjectDocument } from "./Dashboard";

interface DocumentsListProps {
  documents: ProjectDocument[];
}

export default function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) return null;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <FileText size={16} className="text-indigo-400" />
        Documentos
      </h3>
      <div className="space-y-2">
        {documents.map((doc, i) => (
          <a
            key={i}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/8 rounded-lg hover:bg-white/[0.05] transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText size={14} className="text-indigo-400" />
              </div>
              <span className="text-sm text-slate-300 truncate">{doc.name}</span>
            </div>
            <Download size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
