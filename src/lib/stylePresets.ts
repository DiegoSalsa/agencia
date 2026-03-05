// ── Shared Design Style Presets ──────────────────────────────────
// Used by LiveLandingPreview and LiveWebCorporativaPreview

export interface StylePreset {
    isDark: boolean;
    bg: string;
    text: string;
    subtext: string;
    card: string;
    divider: string;
    heroOverlay: string;
    fontClass: string;
    borderRadius: string;
    shadow: string;
    headingClass: string;
    sectionPy: string;
    // Hex equivalents for inline styles (style={{ color, background }})
    bgHex: string;
    textHex: string;
    subtextHex: string;
    cardHex: string;
    dividerHex: string;
}

export function getStylePreset(designStyle: string, primaryColor: string): StylePreset {
    switch (designStyle) {
        case "oscuro":
            return {
                isDark: true,
                bg: "bg-gray-950",
                text: "text-white",
                subtext: "text-gray-400",
                card: "bg-white/5 border border-white/10",
                divider: "border-white/5",
                heroOverlay: `linear-gradient(135deg, ${primaryColor}30, ${primaryColor}10)`,
                fontClass: "",
                borderRadius: "rounded-lg",
                shadow: "shadow-none",
                headingClass: "uppercase tracking-wider text-[9px]",
                sectionPy: "py-4 px-5",
                bgHex: "#030712",
                textHex: "#ffffff",
                subtextHex: "#9ca3af",
                cardHex: "#111827",
                dividerHex: "#1f2937",
            };
        case "elegante":
            return {
                isDark: false,
                bg: "bg-stone-50",
                text: "text-stone-900",
                subtext: "text-stone-500",
                card: "bg-white border border-stone-200",
                divider: "border-stone-200",
                heroOverlay: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)`,
                fontClass: "font-serif",
                borderRadius: "rounded-sm",
                shadow: "shadow-none",
                headingClass: "uppercase tracking-[0.2em] text-[9px] font-light",
                sectionPy: "py-6 px-6",
                bgHex: "#fafaf9",
                textHex: "#1c1917",
                subtextHex: "#78716c",
                cardHex: "#ffffff",
                dividerHex: "#e7e5e4",
            };
        case "minimalista":
            return {
                isDark: false,
                bg: "bg-white",
                text: "text-gray-800",
                subtext: "text-gray-400",
                card: "bg-gray-50/50 border border-gray-100",
                divider: "border-gray-50",
                heroOverlay: `linear-gradient(180deg, ${primaryColor}08, transparent)`,
                fontClass: "",
                borderRadius: "rounded-xl",
                shadow: "shadow-none",
                headingClass: "tracking-tight text-[10px] font-light lowercase",
                sectionPy: "py-6 px-8",
                bgHex: "#ffffff",
                textHex: "#1f2937",
                subtextHex: "#9ca3af",
                cardHex: "#fafaf9",
                dividerHex: "#f9fafb",
            };
        case "corporativo":
            return {
                isDark: false,
                bg: "bg-slate-50",
                text: "text-slate-900",
                subtext: "text-slate-500",
                card: "bg-white border border-slate-200",
                divider: "border-slate-200",
                heroOverlay: `linear-gradient(135deg, #1e293b, #334155)`,
                fontClass: "",
                borderRadius: "rounded",
                shadow: "shadow-md",
                headingClass: "uppercase tracking-wide text-[9px] font-bold",
                sectionPy: "py-3 px-4",
                bgHex: "#f8fafc",
                textHex: "#0f172a",
                subtextHex: "#64748b",
                cardHex: "#ffffff",
                dividerHex: "#e2e8f0",
            };
        case "creativo":
            return {
                isDark: false,
                bg: "bg-white",
                text: "text-gray-900",
                subtext: "text-gray-600",
                card: "bg-gradient-to-br from-gray-50 to-white border border-purple-100",
                divider: "border-purple-100",
                heroOverlay: `linear-gradient(135deg, ${primaryColor}30, #a855f740)`,
                fontClass: "",
                borderRadius: "rounded-2xl",
                shadow: "shadow-lg shadow-purple-100/50",
                headingClass: "text-[11px] font-extrabold",
                sectionPy: "py-5 px-5",
                bgHex: "#ffffff",
                textHex: "#111827",
                subtextHex: "#4b5563",
                cardHex: "#ffffff",
                dividerHex: "#ede9fe",
            };
        case "calido":
            return {
                isDark: false,
                bg: "bg-amber-50/30",
                text: "text-amber-950",
                subtext: "text-amber-700/60",
                card: "bg-white border border-amber-100",
                divider: "border-amber-100",
                heroOverlay: `linear-gradient(135deg, ${primaryColor}20, #f59e0b15)`,
                fontClass: "",
                borderRadius: "rounded-2xl",
                shadow: "shadow-sm shadow-amber-100",
                headingClass: "text-[10px] font-medium",
                sectionPy: "py-5 px-6",
                bgHex: "#fffbeb",
                textHex: "#451a03",
                subtextHex: "#b45309",
                cardHex: "#ffffff",
                dividerHex: "#fef3c7",
            };
        case "moderno":
        default:
            return {
                isDark: false,
                bg: "bg-white",
                text: "text-gray-900",
                subtext: "text-gray-600",
                card: "bg-gray-50",
                divider: "border-gray-100",
                heroOverlay: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}08)`,
                fontClass: "",
                borderRadius: "rounded-lg",
                shadow: "shadow-sm",
                headingClass: "text-[10px] font-semibold",
                sectionPy: "py-4 px-5",
                bgHex: "#ffffff",
                textHex: "#111827",
                subtextHex: "#4b5563",
                cardHex: "#f9fafb",
                dividerHex: "#f3f4f6",
            };
    }
}

/** Returns "#000000" or "#ffffff" for maximum contrast against the given hex background. */
export function contrastColor(hex: string): string {
    const c = hex.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    // W3C relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

/** CSS text-shadow for readable text on any background */
export const readableTextShadow = "0 1px 3px rgba(0,0,0,0.3), 0 0 6px rgba(0,0,0,0.15)";
