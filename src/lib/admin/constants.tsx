import React from "react";
import {
  Inbox,
  Eye,
  Clock,
  CheckCircle2,
  Code2,
  Wrench,
  Pause,
  ArrowRight,
  XCircle,
} from "lucide-react";
import type { StatusConfigItem, TypeConfigItem } from "@/types/admin";

/* ══════════════════════════════════════════════════════
   Briefing status config
   ══════════════════════════════════════════════════════ */

export const BRIEFING_STATUS_CONFIG: Record<string, StatusConfigItem> = {
  nuevo: {
    label: "Nuevo",
    color: "text-blue-400",
    bg: "bg-blue-500/15 border-blue-500/25",
    icon: <Inbox size={12} />,
  },
  revisado: {
    label: "Revisado",
    color: "text-yellow-400",
    bg: "bg-yellow-500/15 border-yellow-500/25",
    icon: <Eye size={12} />,
  },
  en_progreso: {
    label: "En Progreso",
    color: "text-purple-400",
    bg: "bg-purple-500/15 border-purple-500/25",
    icon: <Clock size={12} />,
  },
  completado: {
    label: "Completado",
    color: "text-emerald-400",
    bg: "bg-emerald-500/15 border-emerald-500/25",
    icon: <CheckCircle2 size={12} />,
  },
};

export const BRIEFING_STATUS_OPTIONS = [
  { value: "nuevo", label: "Nuevo" },
  { value: "revisado", label: "Revisado" },
  { value: "en_progreso", label: "En Progreso" },
  { value: "completado", label: "Completado" },
] as const;

/* ══════════════════════════════════════════════════════
   Briefing type config
   ══════════════════════════════════════════════════════ */

export const BRIEFING_TYPE_CONFIG: Record<string, TypeConfigItem> = {
  LANDING: {
    label: "Landing Page",
    color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    price: "$220.000",
  },
  WEB_CORPORATIVA: {
    label: "Web Corporativa",
    color: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    price: "$380.000",
  },
  ECOMMERCE: {
    label: "E-commerce",
    color: "bg-rose-500/15 text-rose-400 border-rose-500/25",
    price: "$550.000",
  },
  OFERTA: {
    label: "Oferta Landing",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    price: "$170.000",
  },
};

export const BRIEFING_TYPE_OPTIONS = [
  { value: "LANDING", label: "Landing Page" },
  { value: "WEB_CORPORATIVA", label: "Web Corporativa" },
  { value: "ECOMMERCE", label: "E-commerce" },
] as const;

/* ══════════════════════════════════════════════════════
   Project status config
   ══════════════════════════════════════════════════════ */

export const PROJECT_STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  development: {
    label: "Desarrollo",
    color: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    icon: <Code2 size={12} />,
  },
  delivered: {
    label: "Entregado",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    icon: <CheckCircle2 size={12} />,
  },
  maintenance: {
    label: "Mantenimiento",
    color: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    icon: <Wrench size={12} />,
  },
  paused: {
    label: "Pausado",
    color: "bg-slate-500/15 text-slate-400 border-slate-500/25",
    icon: <Pause size={12} />,
  },
};

export const PROJECT_STATUS_OPTIONS = [
  { value: "development", label: "En Desarrollo" },
  { value: "delivered", label: "Entregado" },
  { value: "maintenance", label: "En Mantenimiento" },
  { value: "paused", label: "Pausado" },
] as const;

export const PROJECT_TYPE_OPTIONS = [
  { value: "LANDING", label: "Landing Page" },
  { value: "WEB_CORPORATIVA", label: "Web Corporativa" },
  { value: "ECOMMERCE", label: "E-commerce" },
] as const;

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  LANDING: "Landing Page",
  WEB_CORPORATIVA: "Web Corporativa",
  ECOMMERCE: "E-commerce",
};

/* ══════════════════════════════════════════════════════
   Change request config
   ══════════════════════════════════════════════════════ */

export const CHANGE_STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pendiente",
    color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    icon: <Clock size={12} />,
  },
  accepted: {
    label: "Aceptada",
    color: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    icon: <CheckCircle2 size={12} />,
  },
  in_progress: {
    label: "En Progreso",
    color: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    icon: <ArrowRight size={12} />,
  },
  completed: {
    label: "Completada",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    icon: <CheckCircle2 size={12} />,
  },
  cancelled: {
    label: "Cancelada",
    color: "bg-slate-500/15 text-slate-400 border-slate-500/25",
    icon: <XCircle size={12} />,
  },
};

export const CHANGE_STATUS_OPTIONS = [
  { value: "pending", label: "Pendiente" },
  { value: "accepted", label: "Aceptada" },
  { value: "in_progress", label: "En Progreso" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

export const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  low: { label: "Baja", color: "text-slate-400" },
  medium: { label: "Media", color: "text-blue-400" },
  high: { label: "Alta", color: "text-amber-400" },
  urgent: { label: "Urgente", color: "text-red-400" },
};

/* ══════════════════════════════════════════════════════
   Briefing field labels (for detail view)
   ══════════════════════════════════════════════════════ */

export const FIELD_LABELS: Record<string, string> = {
  firstName: "Nombre",
  lastNameP: "Apellido paterno",
  lastNameM: "Apellido materno",
  businessName: "Nombre del negocio",
  industry: "Rubro",
  email: "Email",
  phone: "Teléfono",
  mainGoal: "Objetivo principal",
  targetAudience: "Público objetivo",
  mainCTA: "Acción principal (CTA)",
  uniqueValue: "Valor diferencial",
  sections: "Secciones",
  sectionNotes: "Notas de secciones",
  designStyle: "Estilo visual",
  primaryColor: "Color principal",
  secondaryColor: "Color secundario",
  referenceUrls: "URLs de referencia",
  hasLogo: "Tiene logo",
  hasPhotos: "Tiene fotos",
  hasTexts: "Tiene textos",
  additionalContent: "Contenido adicional",
  features: "Funcionalidades",
  hasDomain: "Tiene dominio",
  domainName: "Nombre de dominio",
  socialMedia: "Redes sociales",
  urgency: "Urgencia",
  budget: "Presupuesto",
  additionalNotes: "Notas adicionales",
  instagramUrl: "Instagram",
  facebookUrl: "Facebook",
  websiteUrl: "Sitio web actual",
  storeObjective: "Objetivo de la tienda",
  competitorUrls: "URLs de competencia",
  expectedRevenue: "Facturación mensual esperada",
  productCount: "Cantidad de productos",
  productType: "Tipo de productos",
  hasVariants: "¿Tiene variantes?",
  categoryCount: "Cantidad de categorías",
  productDescription: "Descripción de productos",
  hasBulkImport: "¿Importación masiva?",
  pages: "Páginas del sitio",
  pagesDescription: "Descripción de páginas",
  paymentMethods: "Métodos de pago",
  paymentAccountStatus: "Estado de cuentas de pago",
  needsInvoicing: "¿Necesita facturación?",
  currencies: "Monedas aceptadas",
  paymentNotes: "Notas de pago",
  shippingModel: "Modelo de envío",
  shippingZones: "Zonas de envío",
  freeShippingThreshold: "Umbral envío gratis",
  handlesOwnShipping: "¿Gestiona su propio envío?",
  shippingNotes: "Notas de envío",
  accountSystem: "Sistema de cuentas",
  guestTrackingMethod: "Seguimiento invitados",
  customerFeatures: "Funciones de cliente",
  inventoryLevel: "Nivel de inventario",
  customerNotes: "Notas de clientes",
  accentColor: "Color de acento",
  hasProductPhotos: "¿Tiene fotos de productos?",
  productDescriptionStyle: "Estilo de descripciones",
  marketingFeatures: "Funciones de marketing",
  socialPlatforms: "Plataformas sociales",
  seoLevel: "Nivel de SEO",
  marketingNotes: "Notas de marketing",
  ecommerceFeatures: "Funcionalidades e-commerce",
};

/* ══════════════════════════════════════════════════════
   Promotion defaults
   ══════════════════════════════════════════════════════ */

export const DEFAULT_PROMO_SECTIONS = ["hero", "servicios", "portafolio", "faq", "contacto"];

export const EMPTY_PROMO_FORM = {
  title: "",
  slug: "",
  description: "",
  price: 170000,
  originalPrice: 220000,
  totalSlots: 10,
  remainingSlots: 10,
  isActive: true,
  showBanner: true,
  showPopup: true,
  showPricingCard: true,
  bannerText: "🔥 Landing Page Profesional a $170.000 CLP",
  popupTitle: "¡Oferta Especial!",
  popupBody: "Landing page profesional con todo incluido.",
  formType: "LANDING",
  fixedSections: DEFAULT_PROMO_SECTIONS,
  startsAt: "",
  endsAt: "",
};

export const EMPTY_CODE_FORM = {
  code: "",
  type: "percent" as "percent" | "fixed",
  value: 10,
  maxUses: 0,
  isActive: true,
  promotionId: null as string | null,
};

/* ══════════════════════════════════════════════════════
   Price values (for stats calculations)
   ══════════════════════════════════════════════════════ */

export const PRICE_MAP: Record<string, number> = {
  LANDING: 220000,
  WEB_CORPORATIVA: 380000,
  ECOMMERCE: 550000,
  OFERTA: 170000,
};

/* ══════════════════════════════════════════════════════
   Shared styles
   ══════════════════════════════════════════════════════ */

export const INPUT_CLASS =
  "w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all";

export const SELECT_CLASS =
  "px-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-white/70 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer";

/* ══════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════ */

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `hace ${days}d`;
  if (days < 30) return `hace ${Math.floor(days / 7)}sem`;
  return new Date(dateStr).toLocaleDateString("es-CL", { day: "numeric", month: "short" });
}

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString("es-CL")}`;
}
