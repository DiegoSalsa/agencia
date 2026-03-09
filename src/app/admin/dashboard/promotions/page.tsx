"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    Plus,
    Trash2,
    Pencil,
    Eye,
    EyeOff,
    Loader2,
    Megaphone,
    Tag,
    Users,
    Clock,
    Save,
    X,
    Copy,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/context/ToastContext";
import { LoadingState, EmptyState, ConfirmModal } from "@/components/admin";
import { EMPTY_PROMO_FORM, EMPTY_CODE_FORM, DEFAULT_PROMO_SECTIONS } from "@/lib/admin/constants";
import type { Promotion, DiscountCode } from "@/types/admin";

export default function PromotionsAdmin() {
    const { token, isLoading: authLoading, authHeaders } = useAdminAuth();
    const toast = useToast();
    const [loading, setLoading] = useState(true);
    const [promos, setPromos] = useState<Promotion[]>([]);
    const [codes, setCodes] = useState<DiscountCode[]>([]);
    const [tab, setTab] = useState<"promos" | "codes">("promos");

    // Forms
    const [showPromoForm, setShowPromoForm] = useState(false);
    const [editingPromo, setEditingPromo] = useState<string | null>(null);
    const [promoForm, setPromoForm] = useState(EMPTY_PROMO_FORM);
    const [showCodeForm, setShowCodeForm] = useState(false);
    const [codeForm, setCodeForm] = useState(EMPTY_CODE_FORM);
    const [saving, setSaving] = useState(false);

    // Delete confirmation
    const [deleteTarget, setDeleteTarget] = useState<{ type: "promo" | "code"; id: string } | null>(null);

    const fetchData = useCallback(async (adminToken: string) => {
        setLoading(true);
        try {
            const [promosRes, codesRes] = await Promise.all([
                fetch("/api/admin/promotions", { headers: { "x-admin-token": adminToken } }),
                fetch("/api/admin/codes", { headers: { "x-admin-token": adminToken } }),
            ]);
            const promosData = await promosRes.json();
            const codesData = await codesRes.json();
            setPromos(promosData.data || []);
            setCodes(codesData.data || []);
        } catch (err) {
            console.error("Error fetching promotions:", err);
            toast.error("Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        if (!authLoading && token) fetchData(token);
    }, [authLoading, token, fetchData]);

    /* ─── Promo CRUD ─── */
    const savePromo = async () => {
        setSaving(true);
        try {
            const body = {
                ...promoForm,
                startsAt: promoForm.startsAt || null,
                endsAt: promoForm.endsAt || null,
            };

            if (editingPromo) {
                await fetch(`/api/admin/promotions/${editingPromo}`, {
                    method: "PATCH",
                    headers: authHeaders(),
                    body: JSON.stringify(body),
                });
                toast.success("Promoción actualizada");
            } else {
                await fetch("/api/admin/promotions", {
                    method: "POST",
                    headers: authHeaders(),
                    body: JSON.stringify(body),
                });
                toast.success("Promoción creada");
            }
            setShowPromoForm(false);
            setEditingPromo(null);
            setPromoForm(EMPTY_PROMO_FORM);
            await fetchData(token);
        } catch (err) {
            console.error("Error saving promo:", err);
            toast.error("Error al guardar la promoción");
        } finally {
            setSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        try {
            if (deleteTarget.type === "promo") {
                await fetch(`/api/admin/promotions/${deleteTarget.id}`, { method: "DELETE", headers: authHeaders() });
                toast.success("Promoción eliminada");
            } else {
                await fetch(`/api/admin/codes/${deleteTarget.id}`, { method: "DELETE", headers: authHeaders() });
                toast.success("Código eliminado");
            }
            await fetchData(token);
        } catch {
            toast.error("Error al eliminar");
        } finally {
            setDeleteTarget(null);
        }
    };

    const togglePromoActive = async (id: string, isActive: boolean) => {
        await fetch(`/api/admin/promotions/${id}`, {
            method: "PATCH",
            headers: authHeaders(),
            body: JSON.stringify({ isActive: !isActive }),
        });
        toast.info(isActive ? "Promoción desactivada" : "Promoción activada");
        await fetchData(token);
    };

    const editPromo = (promo: Promotion) => {
        setPromoForm({
            title: promo.title,
            slug: promo.slug,
            description: promo.description || "",
            price: promo.price,
            originalPrice: promo.originalPrice,
            totalSlots: promo.totalSlots,
            remainingSlots: promo.remainingSlots,
            isActive: promo.isActive,
            showBanner: promo.showBanner,
            showPopup: promo.showPopup,
            showPricingCard: promo.showPricingCard,
            bannerText: promo.bannerText || "",
            popupTitle: promo.popupTitle || "",
            popupBody: promo.popupBody || "",
            formType: promo.formType,
            fixedSections: promo.fixedSections || DEFAULT_PROMO_SECTIONS,
            startsAt: promo.startsAt ? promo.startsAt.split("T")[0] : "",
            endsAt: promo.endsAt ? promo.endsAt.split("T")[0] : "",
        });
        setEditingPromo(promo.id);
        setShowPromoForm(true);
    };

    /* ─── Code CRUD ─── */
    const saveCode = async () => {
        setSaving(true);
        try {
            await fetch("/api/admin/codes", {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify(codeForm),
            });
            toast.success("Código creado");
            setShowCodeForm(false);
            setCodeForm(EMPTY_CODE_FORM);
            await fetchData(token);
        } catch (err) {
            console.error("Error saving code:", err);
            toast.error("Error al crear el código");
        } finally {
            setSaving(false);
        }
    };

    const toggleCodeActive = async (id: string, isActive: boolean) => {
        await fetch(`/api/admin/codes/${id}`, {
            method: "PATCH",
            headers: authHeaders(),
            body: JSON.stringify({ isActive: !isActive }),
        });
        toast.info(isActive ? "Código desactivado" : "Código activado");
        await fetchData(token);
    };

    if (loading || authLoading) {
        return <LoadingState message="Cargando ofertas..." />
    }

    return (
        <div>
            {/* Page header with tabs */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Megaphone size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Ofertas y Códigos</h1>
                        <p className="text-white/40 text-sm">{promos.length} promociones · {codes.length} códigos</p>
                    </div>
                </div>
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white/[0.03] rounded-lg p-1 border border-white/5">
                    <button
                        onClick={() => setTab("promos")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${tab === "promos" ? "bg-emerald-500/20 text-emerald-400" : "text-white/40 hover:text-white/60"}`}
                    >
                        Promociones ({promos.length})
                    </button>
                    <button
                        onClick={() => setTab("codes")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${tab === "codes" ? "bg-violet-500/20 text-violet-400" : "text-white/40 hover:text-white/60"}`}
                    >
                        Códigos ({codes.length})
                    </button>
                </div>
            </div>

            <div>
                {/* ─── PROMOTIONS TAB ─── */}
                {tab === "promos" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Promociones</h2>
                            <button
                                onClick={() => { setShowPromoForm(true); setEditingPromo(null); setPromoForm(EMPTY_PROMO_FORM); }}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/25 transition-all"
                            >
                                <Plus size={15} /> Nueva Promoción
                            </button>
                        </div>

                        {/* Promo Form Modal */}
                        {showPromoForm && (
                            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 overflow-y-auto">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl mb-8">
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                        <h3 className="text-base font-semibold text-white">
                                            {editingPromo ? "Editar Promoción" : "Nueva Promoción"}
                                        </h3>
                                        <button onClick={() => setShowPromoForm(false)} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5">
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                                        {/* Basic */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Título</label>
                                                <input value={promoForm.title} onChange={e => setPromoForm(p => ({ ...p, title: e.target.value }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Slug (URL)</label>
                                                <input value={promoForm.slug} onChange={e => setPromoForm(p => ({ ...p, slug: e.target.value }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50 font-medium mb-1.5 block">Descripción</label>
                                            <textarea value={promoForm.description} onChange={e => setPromoForm(p => ({ ...p, description: e.target.value }))}
                                                rows={2} className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none resize-none" />
                                        </div>

                                        {/* Pricing */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Precio Oferta (CLP)</label>
                                                <input type="number" value={promoForm.price} onChange={e => setPromoForm(p => ({ ...p, price: Number(e.target.value) }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Precio Original (CLP)</label>
                                                <input type="number" value={promoForm.originalPrice} onChange={e => setPromoForm(p => ({ ...p, originalPrice: Number(e.target.value) }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                        </div>

                                        {/* Slots */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Cupos Totales</label>
                                                <input type="number" value={promoForm.totalSlots} onChange={e => setPromoForm(p => ({ ...p, totalSlots: Number(e.target.value) }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Cupos Restantes</label>
                                                <input type="number" value={promoForm.remainingSlots} onChange={e => setPromoForm(p => ({ ...p, remainingSlots: Number(e.target.value) }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                        </div>

                                        {/* Visibility toggles */}
                                        <div>
                                            <label className="text-xs text-white/50 font-medium mb-3 block">Visibilidad</label>
                                            <div className="flex flex-wrap gap-3">
                                                {([
                                                    { key: "isActive", label: "Activa" },
                                                    { key: "showBanner", label: "Banner" },
                                                    { key: "showPopup", label: "Popup" },
                                                    { key: "showPricingCard", label: "Card Pricing" },
                                                ] as const).map(({ key, label }) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setPromoForm(p => ({ ...p, [key]: !p[key] }))}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${promoForm[key]
                                                            ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                                                            : "bg-white/[0.02] border-white/10 text-white/30"}`}
                                                    >
                                                        {promoForm[key] ? <Eye size={12} className="inline mr-1" /> : <EyeOff size={12} className="inline mr-1" />}
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Text fields */}
                                        <div>
                                            <label className="text-xs text-white/50 font-medium mb-1.5 block">Texto del Banner</label>
                                            <input value={promoForm.bannerText} onChange={e => setPromoForm(p => ({ ...p, bannerText: e.target.value }))}
                                                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Título Popup</label>
                                                <input value={promoForm.popupTitle} onChange={e => setPromoForm(p => ({ ...p, popupTitle: e.target.value }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Cuerpo Popup</label>
                                                <input value={promoForm.popupBody} onChange={e => setPromoForm(p => ({ ...p, popupBody: e.target.value }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Inicio</label>
                                                <input type="date" value={promoForm.startsAt} onChange={e => setPromoForm(p => ({ ...p, startsAt: e.target.value }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Fin</label>
                                                <input type="date" value={promoForm.endsAt} onChange={e => setPromoForm(p => ({ ...p, endsAt: e.target.value }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-emerald-500/40 focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/5">
                                        <button onClick={() => setShowPromoForm(false)} className="px-4 py-2 text-xs text-white/40 hover:text-white transition-all">
                                            Cancelar
                                        </button>
                                        <button onClick={savePromo} disabled={saving || !promoForm.title || !promoForm.slug}
                                            className="flex items-center gap-2 px-5 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-500/30 disabled:opacity-40 transition-all">
                                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                            {editingPromo ? "Guardar Cambios" : "Crear Promoción"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Promo List */}
                        {promos.length === 0 ? (
                            <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <Megaphone size={32} className="text-white/10 mx-auto mb-3" />
                                <p className="text-white/30 text-sm">No hay promociones creadas</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {promos.map(promo => {
                                    const discount = Math.round((1 - promo.price / promo.originalPrice) * 100);
                                    return (
                                        <div key={promo.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-sm font-semibold text-white truncate">{promo.title}</h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${promo.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                                                            {promo.isActive ? "Activa" : "Inactiva"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
                                                        <span className="flex items-center gap-1"><Tag size={11} /> {promo.slug}</span>
                                                        <span className="flex items-center gap-1"><Users size={11} /> {promo.remainingSlots}/{promo.totalSlots} cupos</span>
                                                        <span className="text-emerald-400 font-semibold">${promo.price.toLocaleString("es-CL")} <span className="text-white/25 font-normal">(-{discount}%)</span></span>
                                                        {promo._count && <span className="flex items-center gap-1"><Copy size={11} /> {promo._count.codes} códigos</span>}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {promo.showBanner && <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/10 text-blue-400">Banner</span>}
                                                        {promo.showPopup && <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/10 text-purple-400">Popup</span>}
                                                        {promo.showPricingCard && <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400">Pricing</span>}
                                                        {promo.endsAt && (
                                                            <span className="flex items-center gap-1 text-[10px] text-white/30">
                                                                <Clock size={10} /> Hasta {new Date(promo.endsAt).toLocaleDateString("es-CL")}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    <button onClick={() => togglePromoActive(promo.id, promo.isActive)}
                                                        className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all" title={promo.isActive ? "Desactivar" : "Activar"}>
                                                        {promo.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    </button>
                                                    <button onClick={() => editPromo(promo)}
                                                        className="p-2 rounded-lg text-white/30 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all" title="Editar">
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button onClick={() => setDeleteTarget({ type: 'promo', id: promo.id })}
                                                        className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Eliminar">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ─── CODES TAB ─── */}
                {tab === "codes" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Códigos de Descuento</h2>
                            <button
                                onClick={() => { setShowCodeForm(true); setCodeForm(EMPTY_CODE_FORM); }}
                                className="flex items-center gap-2 px-4 py-2 bg-violet-500/15 border border-violet-500/25 text-violet-400 rounded-xl text-sm font-medium hover:bg-violet-500/25 transition-all"
                            >
                                <Plus size={15} /> Nuevo Código
                            </button>
                        </div>

                        {/* Code Form Modal */}
                        {showCodeForm && (
                            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                        <h3 className="text-base font-semibold text-white">Nuevo Código de Descuento</h3>
                                        <button onClick={() => setShowCodeForm(false)} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5">
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <label className="text-xs text-white/50 font-medium mb-1.5 block">Código</label>
                                            <input value={codeForm.code} onChange={e => setCodeForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                                                placeholder="DESCUENTO20" className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white font-mono focus:border-violet-500/40 focus:outline-none" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Tipo</label>
                                                <select value={codeForm.type} onChange={e => setCodeForm(p => ({ ...p, type: e.target.value as "percent" | "fixed" }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-violet-500/40 focus:outline-none">
                                                    <option value="percent">Porcentaje (%)</option>
                                                    <option value="fixed">Monto Fijo ($)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs text-white/50 font-medium mb-1.5 block">Valor</label>
                                                <input type="number" value={codeForm.value} onChange={e => setCodeForm(p => ({ ...p, value: Number(e.target.value) }))}
                                                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-violet-500/40 focus:outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50 font-medium mb-1.5 block">Usos Máximos (0 = ilimitado)</label>
                                            <input type="number" value={codeForm.maxUses} onChange={e => setCodeForm(p => ({ ...p, maxUses: Number(e.target.value) }))}
                                                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-violet-500/40 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50 font-medium mb-1.5 block">Asociar a Promoción (opcional)</label>
                                            <select value={codeForm.promotionId || ""} onChange={e => setCodeForm(p => ({ ...p, promotionId: e.target.value || null }))}
                                                className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white focus:border-violet-500/40 focus:outline-none">
                                                <option value="">Sin asociar</option>
                                                {promos.map(p => (
                                                    <option key={p.id} value={p.id}>{p.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/5">
                                        <button onClick={() => setShowCodeForm(false)} className="px-4 py-2 text-xs text-white/40 hover:text-white transition-all">Cancelar</button>
                                        <button onClick={saveCode} disabled={saving || !codeForm.code}
                                            className="flex items-center gap-2 px-5 py-2 bg-violet-500/20 border border-violet-500/30 text-violet-400 rounded-xl text-sm font-medium hover:bg-violet-500/30 disabled:opacity-40 transition-all">
                                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                            Crear Código
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Codes List */}
                        {codes.length === 0 ? (
                            <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <Tag size={32} className="text-white/10 mx-auto mb-3" />
                                <p className="text-white/30 text-sm">No hay códigos de descuento</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {codes.map(code => (
                                    <div key={code.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                                                    <span className="text-sm font-mono font-bold text-violet-400">{code.code}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-white/40">
                                                    <span className="text-white/60 font-medium">
                                                        {code.type === "percent" ? `${code.value}%` : `$${code.value.toLocaleString("es-CL")}`}
                                                    </span>
                                                    <span>{code.usedCount}/{code.maxUses === 0 ? "∞" : code.maxUses} usos</span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${code.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                                                        {code.isActive ? "Activo" : "Inactivo"}
                                                    </span>
                                                    {code.promotionId && (
                                                        <span className="text-emerald-400/60">
                                                            → {promos.find(p => p.id === code.promotionId)?.title || "Promo"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <button onClick={() => toggleCodeActive(code.id, code.isActive)}
                                                    className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
                                                    {code.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                                <button onClick={() => setDeleteTarget({ type: 'code', id: code.id })}
                                                    className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Delete confirmation modal */}
            <ConfirmModal
                open={!!deleteTarget}
                title={deleteTarget?.type === "promo" ? "Eliminar Promoción" : "Eliminar Código"}
                message={deleteTarget?.type === "promo"
                    ? "¿Estás seguro de que deseas eliminar esta promoción? Se eliminarán también los códigos asociados."
                    : "¿Estás seguro de que deseas eliminar este código de descuento?"
                }
                confirmLabel="Eliminar"
                variant="danger"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}
