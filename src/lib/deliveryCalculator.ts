import { FormData } from "@/types/briefing";

// ══════════════════════════════════════════════════════════
// Delivery Calculator — Tiempos de entrega dinámicos
// ══════════════════════════════════════════════════════════

export interface UrgencyOption {
    id: string;
    label: string;
    surchargePercent: number;
    daysMin: number;
    daysMax: number;
    surchargeAmount: number;
    dayType: string; // "días hábiles" o "días corridos"
}

export interface DeliveryEstimate {
    baseDaysRaw: number;
    baseDaysMin: number;
    baseDaysMax: number;
    urgencyOptions: UrgencyOption[];
}

// ── Tiempos base por tipo (días) ──
const BASE_DAYS: Record<string, number> = {
    LANDING: 3,
    WEB_CORPORATIVA: 15,
    ECOMMERCE: 45,
};

// ── Mínimos absolutos (nunca se baja de esto) ──
const MIN_DAYS: Record<string, number> = {
    LANDING: 3,
    WEB_CORPORATIVA: 14,
    ECOMMERCE: 45,
};

// ── Niveles de urgencia ──
const URGENCY_LEVELS = [
    {
        id: "normal",
        label: "Normal",
        surchargePercent: 0,
        timeReduction: 0,
        usesBusinessDays: true,
    },
    {
        id: "prioridad",
        label: "Prioridad",
        surchargePercent: 15,
        timeReduction: 0.25,
        usesBusinessDays: true,
    },
    {
        id: "express",
        label: "Express",
        surchargePercent: 30,
        timeReduction: 0.40,
        usesBusinessDays: false,
    },
    {
        id: "urgente",
        label: "Urgente",
        surchargePercent: 50,
        timeReduction: 0.60,
        usesBusinessDays: false,
    },
];

// ── Días por feature (compartidas) ──
const FEATURE_DAYS: Record<string, number> = {
    formulario_contacto: 0.5,
    formulario_avanzado: 1,
    animaciones: 1.5,
    multiidioma: 2,
    agenda: 1,
    descargables: 0.5,
    analytics: 0.5,
    seo: 1,
    whatsapp_button: 0.25,
    google_maps: 0.25,
    newsletter: 0.5,
    dark_mode: 0.5,
    buscador: 1,
    chat_en_vivo: 1,
    // E-commerce features
    resenas_valoraciones: 1,
    comparador_productos: 1.5,
    zoom_producto: 0.5,
    productos_relacionados: 0.5,
    filtros_avanzados: 1.5,
    busqueda_inteligente: 2,
    notificaciones_stock: 1,
    multi_idioma: 2,
    pwa_app_movil: 3,
};

// ── Secciones extra landing (las que suman días) ──
const LANDING_EXTRA_SECTION_DAYS: Record<string, number> = {
    portafolio: 1,
    blog: 2,
    equipo: 0.5,
    precios: 0.5,
    galeria: 1,
    estadisticas: 0.5,
    ubicacion: 0.25,
    clientes: 0.25,
};
// Secciones base que no suman: hero, servicios, proceso, sobre_mi, testimonios, contacto, faq

// ── Páginas extra corporativa ──
const CORP_EXTRA_PAGE_DAYS: Record<string, number> = {
    portafolio: 1.5,
    blog: 2,
    casos_exito: 2,
    galeria: 1,
    precios: 1,
    faq: 0.5,
};
// Páginas base que no suman: inicio, servicios, nosotros, contacto

// ── Pesos ecommerce adicionales ──
const ECOMMERCE_EXTRA_DAYS: Record<string, number> = {
    // Páginas
    cuenta_usuario: 1.5,
    blog: 2,
    tracking_pedidos: 2,
    // Métodos de pago
    transbank_webpay: 1.5,
    mercadopago: 1,
    transferencia_bancaria: 0.5,
    otro_medio: 0.5,
    // Envío
    por_zona_distancia: 1,
    gratis_sobre_monto: 0.5,
    // Cuentas
    registro_completo: 1,
    ambos_registro_e_invitado: 1.5,
    // Inventario
    stock_basico: 0.5,
    stock_avanzado: 1.5,
    // Marketing
    newsletter_email: 0.5,
    analytics_tracking: 0.5,
    seo_schema_producto: 1,
    redes_sociales_shop: 1.5,
    carritos_abandonados: 2,
    codigos_descuento: 1,
    programa_referidos: 2,
    banners_promocionales: 0.5,
    // Customer features
    historial_pedidos: 0.5,
    direcciones_guardadas: 0.5,
    lista_deseos: 1,
    puntos_fidelidad: 2,
    referidos: 2,
};

// Días extra por cantidad de productos
const PRODUCT_COUNT_DAYS: Record<string, number> = {
    "1_20": 0,
    "21_50": 1,
    "51_200": 3,
    "201_500": 5,
    "500_plus": 8,
};

// ── Calculador principal ──
export function calculateDelivery(
    type: string,
    formData: FormData,
    totalPriceBeforeUrgency: number
): DeliveryEstimate {
    const baseDays = BASE_DAYS[type] || 3;
    const minDays = MIN_DAYS[type] || 3;
    let rawDays = baseDays;

    const isEcommerce = type === "ECOMMERCE";
    const isWeb = type === "WEB_CORPORATIVA";

    if (isEcommerce) {
        // E-commerce features
        const ecommerceFeatures = (formData.ecommerceFeatures as string[]) || [];
        for (const f of ecommerceFeatures) {
            rawDays += FEATURE_DAYS[f] || 0;
        }

        // Marketing features
        const marketingFeatures = (formData.marketingFeatures as string[]) || [];
        for (const f of marketingFeatures) {
            rawDays += ECOMMERCE_EXTRA_DAYS[f] || 0;
        }

        // Customer features
        const customerFeatures = (formData.customerFeatures as string[]) || [];
        for (const f of customerFeatures) {
            rawDays += ECOMMERCE_EXTRA_DAYS[f] || 0;
        }

        // Páginas extra
        const pages = (formData.pages as string[]) || [];
        for (const p of pages) {
            rawDays += ECOMMERCE_EXTRA_DAYS[p] || 0;
        }

        // Métodos de pago
        const paymentMethods = (formData.paymentMethods as string[]) || [];
        for (const pm of paymentMethods) {
            rawDays += ECOMMERCE_EXTRA_DAYS[pm] || 0;
        }

        // Envío
        const shippingModel = (formData.shippingModel as string) || "";
        rawDays += ECOMMERCE_EXTRA_DAYS[shippingModel] || 0;

        // Cuentas
        const accountSystem = (formData.accountSystem as string) || "";
        rawDays += ECOMMERCE_EXTRA_DAYS[accountSystem] || 0;

        // Inventario
        const inventoryLevel = (formData.inventoryLevel as string) || "";
        rawDays += ECOMMERCE_EXTRA_DAYS[inventoryLevel] || 0;

        // Cantidad de productos
        const productCount = (formData.productCount as string) || "";
        rawDays += PRODUCT_COUNT_DAYS[productCount] || 0;

        // Variantes
        const hasVariants = (formData.hasVariants as string) || "";
        if (hasVariants === "si") rawDays += 1.5;
        else if (hasVariants === "algunos") rawDays += 0.5;

    } else if (isWeb) {
        // Páginas extra
        const pages = (formData.pages as string[]) || [];
        for (const p of pages) {
            rawDays += CORP_EXTRA_PAGE_DAYS[p] || 0;
        }

        // Features compartidas
        const features = (formData.features as string[]) || [];
        for (const f of features) {
            rawDays += FEATURE_DAYS[f] || 0;
        }
    } else {
        // Landing: secciones extra
        const sections = (formData.sections as string[]) || [];
        for (const s of sections) {
            rawDays += LANDING_EXTRA_SECTION_DAYS[s] || 0;
        }

        // Features compartidas
        const features = (formData.features as string[]) || [];
        for (const f of features) {
            rawDays += FEATURE_DAYS[f] || 0;
        }
    }

    // Contenido que suma tiempo
    const hasLogo = formData.hasLogo as string;
    if (hasLogo === "no_necesito") rawDays += 1;

    const hasTexts = formData.hasTexts as string;
    if (hasTexts === "no" || hasTexts === "no_necesito") rawDays += 0.5;

    // Generar rango base
    const baseDaysMin = Math.max(Math.ceil(rawDays * 0.85), minDays);
    const baseDaysMax = Math.max(Math.ceil(rawDays * 1.15), minDays);

    // Calcular opciones de urgencia
    const urgencyOptions: UrgencyOption[] = URGENCY_LEVELS.map((level) => {
        const reducedDays = rawDays * (1 - level.timeReduction);
        let dMin = Math.ceil(reducedDays * 0.85);
        let dMax = Math.ceil(reducedDays * 1.15);

        // Respetar mínimo absoluto
        dMin = Math.max(dMin, minDays);
        dMax = Math.max(dMax, minDays);

        // Asegurar que min <= max
        if (dMin > dMax) dMax = dMin;

        const surchargeAmount = Math.round(totalPriceBeforeUrgency * level.surchargePercent / 100);

        return {
            id: level.id,
            label: level.label,
            surchargePercent: level.surchargePercent,
            daysMin: dMin,
            daysMax: dMax,
            surchargeAmount,
            dayType: level.usesBusinessDays ? "días hábiles" : "días corridos",
        };
    });

    return {
        baseDaysRaw: rawDays,
        baseDaysMin,
        baseDaysMax,
        urgencyOptions,
    };
}

// ── Helper para obtener label de urgencia ──
export function getUrgencyLabel(urgencyId: string): string {
    const level = URGENCY_LEVELS.find((l) => l.id === urgencyId);
    return level?.label || urgencyId;
}

// ── Helper para obtener surcharge ──
export function getUrgencySurchargePercent(urgencyId: string): number {
    const level = URGENCY_LEVELS.find((l) => l.id === urgencyId);
    return level?.surchargePercent || 0;
}
