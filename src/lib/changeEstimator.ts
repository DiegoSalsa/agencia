// ── Estimación automática de precios por análisis de texto ──
// Se usa cuando un cliente solicita una modificación desde el portal.
// Busca keywords en la descripción y aplica multiplicador de prioridad.

const CHANGE_PRICE_KEYWORDS: { keywords: string[]; basePrice: number }[] = [
  { keywords: ["color", "colores", "fuente", "font", "tipografía"], basePrice: 10_000 },
  { keywords: ["texto", "contenido", "copy", "descripción"], basePrice: 12_000 },
  { keywords: ["imagen", "foto", "logo", "ícono", "banner"], basePrice: 15_000 },
  { keywords: ["sección", "componente", "bloque"], basePrice: 25_000 },
  { keywords: ["página", "page", "vista", "ruta"], basePrice: 35_000 },
  { keywords: ["formulario", "form", "contacto"], basePrice: 30_000 },
  { keywords: ["animación", "transición", "efecto"], basePrice: 20_000 },
  { keywords: ["responsive", "móvil", "celular"], basePrice: 20_000 },
  { keywords: ["blog", "cms", "artículos"], basePrice: 45_000 },
  { keywords: ["e-commerce", "carrito", "productos", "pago"], basePrice: 60_000 },
  { keywords: ["login", "registro", "autenticación"], basePrice: 50_000 },
  { keywords: ["api", "integración", "terceros"], basePrice: 55_000 },
  { keywords: ["seo", "meta", "analytics"], basePrice: 15_000 },
  { keywords: ["dominio", "dns", "hosting"], basePrice: 10_000 },
];

const PRIORITY_MULTIPLIER: Record<string, number> = {
  low: 1.0,
  medium: 1.0,
  high: 1.2,
  urgent: 1.5,
};

/**
 * Estima el precio de una solicitud de modificación basado en keywords.
 * Usa el precio más alto encontrado (no suma) y aplica multiplicador de prioridad.
 *
 * @example
 * estimateChangePrice("Quiero agregar una nueva página con formulario", "high")
 * // → match "página" ($35k) + "formulario" ($30k) → max = $35k
 * // → prioridad "high" → $35k × 1.2 = $42.000
 */
export function estimateChangePrice(description: string, priority: string): number {
  const lowerDesc = description.toLowerCase();
  let maxPrice = 15_000; // Mínimo por defecto

  for (const { keywords, basePrice } of CHANGE_PRICE_KEYWORDS) {
    if (keywords.some((kw) => lowerDesc.includes(kw))) {
      maxPrice = Math.max(maxPrice, basePrice);
    }
  }

  const multiplier = PRIORITY_MULTIPLIER[priority] || 1.0;
  return Math.round(maxPrice * multiplier);
}

/**
 * Formatea un precio CLP para mostrar al usuario.
 * @example formatCLP(42000) → "$42.000"
 */
export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`;
}

// ── Labels ─────────────────────────────────────────────────

export const PRIORITY_LABELS: Record<string, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  development: "En Desarrollo",
  delivered: "Entregado",
  maintenance: "En Mantenimiento",
  paused: "Pausado",
};

export const CHANGE_STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  accepted: "Aceptada",
  in_progress: "En Progreso",
  completed: "Completada",
  cancelled: "Cancelada",
};
