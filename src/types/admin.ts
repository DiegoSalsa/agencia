/* ─── Admin shared types ─── */
import type { ReactNode } from "react";

// ── Briefing configs (used across dashboard + detail) ──

export interface StatusConfigItem {
  label: string;
  color: string;
  bg: string;
  icon: ReactNode;
}

export interface TypeConfigItem {
  label: string;
  color: string;
  price: string;
}

// ── Project ──

export interface ProjectSummary {
  id: string;
  clientFirstName: string;
  clientLastNameP: string;
  clientLastNameM: string | null;
  clientEmail: string;
  projectName: string;
  projectType: string;
  status: string;
  createdAt: string;
  pendingChanges: number;
}

export interface ProjectDetail {
  id: string;
  clientFirstName: string;
  clientLastNameP: string;
  clientLastNameM: string | null;
  clientEmail: string;
  projectName: string;
  projectUrl: string | null;
  projectType: string;
  status: string;
  deliveryDate: string | null;
  technologies: string[];
  documents: { name: string; url: string }[];
  adminNotes: string | null;
  createdAt: string;
  changes: ChangeRequest[];
}

export type ProjectStatus = "development" | "delivered" | "maintenance" | "paused";
export type ProjectType = "LANDING" | "WEB_CORPORATIVA" | "ECOMMERCE";

// ── Change request ──

export interface ChangeRequest {
  id: string;
  description: string;
  priority: string;
  status: string;
  price: number | null;
  estimatedPrice: number | null;
  completionDate: string | null;
  adminNotes: string | null;
  clientNotes: string | null;
  createdAt: string;
}

export type ChangeRequestStatus = "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
export type Priority = "low" | "medium" | "high" | "urgent";

// ── Promotion ──

export interface Promotion {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  originalPrice: number;
  totalSlots: number;
  remainingSlots: number;
  isActive: boolean;
  showBanner: boolean;
  showPopup: boolean;
  showPricingCard: boolean;
  bannerText: string | null;
  popupTitle: string | null;
  popupBody: string | null;
  formType: string;
  fixedSections: string[];
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  _count?: { codes: number };
}

export interface DiscountCode {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  promotionId: string | null;
}

// ── Notifications ──

export interface AdminNotifications {
  newBriefings: number;
  pendingChanges: number;
  expiringPromos: number;
}

// ── Stats ──

export interface WeeklyStats {
  week: string;
  landing: number;
  corporativa: number;
  ecommerce: number;
  oferta: number;
  total: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  count: number;
}

export interface AdminStats {
  weeklyBriefings: WeeklyStats[];
  monthlyRevenue: MonthlyRevenue[];
  typeDistribution: { type: string; count: number; percentage: number }[];
  totals: {
    briefings: number;
    nuevo: number;
    enProgreso: number;
    completado: number;
    thisWeek: number;
    estimatedRevenue: number;
    activeProjects: number;
    activePromos: number;
  };
  recentBriefings: {
    id: string;
    clientName: string;
    clientEmail: string | null;
    type: string;
    status: string;
    createdAt: string;
  }[];
}
