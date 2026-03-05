import { FormData } from "@/types/briefing";

// ── Pricing Engine ─────────────────────────────────────────
// Calcula precio estimado basado en las selecciones del formulario
// Soporta LANDING, WEB_CORPORATIVA y ECOMMERCE

export interface PriceBreakdownItem {
    category: string;
    label: string;
    amount: number;
}

export interface PricingResult {
    basePrice: number;
    totalMin: number;
    breakdown: PriceBreakdownItem[];
    sectionsCount: number;
    featuresCount: number;
}

// ══════════════════════════════════════════════════════════
// LANDING — section-based pricing
// ══════════════════════════════════════════════════════════

const SECTION_PRICES: Record<string, { label: string; price: number }> = {
    hero: { label: "Hero / Banner principal", price: 0 },
    servicios: { label: "Servicios", price: 5_000 },
    proceso: { label: "Proceso", price: 3_000 },
    sobre_mi: { label: "Sobre nosotros", price: 3_000 },
    portafolio: { label: "Portafolio / Galería", price: 8_000 },
    testimonios: { label: "Testimonios", price: 3_000 },
    equipo: { label: "Equipo", price: 5_000 },
    precios: { label: "Precios / Planes", price: 5_000 },
    faq: { label: "Preguntas frecuentes", price: 3_000 },
    blog: { label: "Blog / Noticias", price: 10_000 },
    contacto: { label: "Formulario de contacto", price: 5_000 },
    ubicacion: { label: "Mapa / Ubicación", price: 3_000 },
    estadisticas: { label: "Estadísticas", price: 3_000 },
    clientes: { label: "Logos de clientes", price: 3_000 },
};

// ══════════════════════════════════════════════════════════
// WEB CORPORATIVA — page-based pricing
// ══════════════════════════════════════════════════════════

const PAGE_PRICES: Record<string, { label: string; price: number }> = {
    inicio: { label: "Página de Inicio", price: 0 },
    servicios: { label: "Servicios / Productos", price: 25_000 },
    nosotros: { label: "Nosotros", price: 15_000 },
    contacto: { label: "Contacto", price: 25_000 },
    portafolio: { label: "Portafolio", price: 30_000 },
    galeria: { label: "Galería", price: 20_000 },
    blog: { label: "Blog", price: 45_000 },
    faq: { label: "Preguntas frecuentes", price: 15_000 },
    casos_exito: { label: "Casos de éxito", price: 35_000 },
    precios: { label: "Precios", price: 25_000 },
};

// ══════════════════════════════════════════════════════════
// ECOMMERCE — pricing tables
// ══════════════════════════════════════════════════════════

const ECOMMERCE_PAGE_PRICES: Record<string, { label: string; price: number }> = {
    inicio: { label: "Inicio", price: 0 },
    catalogo: { label: "Catálogo / Tienda", price: 0 },
    producto_detalle: { label: "Página de Producto", price: 0 },
    carrito: { label: "Carrito de Compras", price: 0 },
    checkout: { label: "Checkout / Pago", price: 0 },
    cuenta_usuario: { label: "Mi Cuenta / Panel", price: 35_000 },
    nosotros: { label: "Nosotros", price: 15_000 },
    contacto: { label: "Contacto", price: 10_000 },
    blog: { label: "Blog", price: 45_000 },
    faq: { label: "Preguntas Frecuentes", price: 15_000 },
    politicas: { label: "Políticas", price: 5_000 },
    tracking_pedidos: { label: "Seguimiento de Pedidos", price: 40_000 },
};

const PRODUCT_COUNT_PRICES: Record<string, { label: string; price: number }> = {
    "1_20": { label: "1-20 productos", price: 0 },
    "21_50": { label: "21-50 productos", price: 50_000 },
    "51_200": { label: "51-200 productos", price: 120_000 },
    "201_500": { label: "201-500 productos", price: 250_000 },
    "500_plus": { label: "500+ productos", price: 450_000 },
};

const PAYMENT_METHOD_PRICES: Record<string, { label: string; price: number }> = {
    transbank_webpay: { label: "Transbank (Webpay)", price: 50_000 },
    mercadopago: { label: "MercadoPago", price: 35_000 },
    transferencia_bancaria: { label: "Transferencia bancaria", price: 15_000 },
    contra_entrega: { label: "Pago contra entrega", price: 0 },
    otro_medio: { label: "Otro medio de pago", price: 20_000 },
};

const SHIPPING_MODEL_PRICES: Record<string, { label: string; price: number }> = {
    tarifa_plana: { label: "Envío tarifa plana", price: 15_000 },
    por_zona_distancia: { label: "Envío por zona/distancia", price: 40_000 },
    gratis_sobre_monto: { label: "Envío gratis sobre monto", price: 25_000 },
    retiro_en_tienda: { label: "Retiro en tienda", price: 10_000 },
    solo_digital: { label: "Sin envío (digital)", price: 0 },
};

const ACCOUNT_SYSTEM_PRICES: Record<string, { label: string; price: number }> = {
    registro_completo: { label: "Sistema de cuentas", price: 40_000 },
    ambos_registro_e_invitado: { label: "Cuentas + invitado", price: 55_000 },
    solo_invitado: { label: "Solo invitado", price: 0 },
};

const INVENTORY_PRICES: Record<string, { label: string; price: number }> = {
    sin_control: { label: "Sin control de stock", price: 0 },
    stock_basico: { label: "Stock básico", price: 20_000 },
    stock_avanzado: { label: "Stock avanzado", price: 50_000 },
};

const ECOMMERCE_FEATURE_PRICES: Record<string, { label: string; price: number }> = {
    resenas_valoraciones: { label: "Reseñas / Valoraciones", price: 25_000 },
    comparador_productos: { label: "Comparador de productos", price: 40_000 },
    zoom_producto: { label: "Zoom de producto", price: 15_000 },
    productos_relacionados: { label: "Productos relacionados", price: 20_000 },
    filtros_avanzados: { label: "Filtros avanzados", price: 35_000 },
    busqueda_inteligente: { label: "Búsqueda inteligente", price: 45_000 },
    notificaciones_stock: { label: "Notificaciones de stock", price: 20_000 },
    chat_en_vivo: { label: "Chat en vivo", price: 25_000 },
    multi_idioma: { label: "Multi-idioma", price: 60_000 },
    dark_mode: { label: "Modo oscuro / claro", price: 15_000 },
    pwa_app_movil: { label: "PWA / App móvil", price: 80_000 },
};

const MARKETING_FEATURE_PRICES: Record<string, { label: string; price: number }> = {
    newsletter_email: { label: "Email marketing", price: 25_000 },
    banners_promocionales: { label: "Banners promocionales", price: 15_000 },
    analytics_tracking: { label: "Analytics y tracking", price: 15_000 },
    seo_schema_producto: { label: "SEO avanzado (schema)", price: 30_000 },
    redes_sociales_shop: { label: "Tienda en redes sociales", price: 35_000 },
    carritos_abandonados: { label: "Carritos abandonados", price: 45_000 },
    codigos_descuento: { label: "Códigos de descuento", price: 20_000 },
    programa_referidos: { label: "Programa de referidos", price: 40_000 },
};

const VARIANT_PRICES: Record<string, number> = {
    si: 30_000,
    algunos: 15_000,
    no: 0,
};

// ── Shared prices ──

const FEATURE_PRICES: Record<string, { label: string; price: number }> = {
    whatsapp_button: { label: "Redes sociales y WhatsApp", price: 0 },
    google_maps: { label: "Google Maps", price: 3_000 },
    formulario_contacto: { label: "Formulario de contacto", price: 5_000 },
    formulario_avanzado: { label: "Formulario avanzado", price: 10_000 },
    animaciones: { label: "Animaciones y efectos", price: 8_000 },
    multiidioma: { label: "Multi-idioma (ES/EN)", price: 25_000 },
    agenda: { label: "Integración Calendly", price: 8_000 },
    descargables: { label: "Descargables (PDF)", price: 3_000 },
    analytics: { label: "Google Analytics", price: 3_000 },
    seo: { label: "Optimización SEO", price: 8_000 },
    dark_mode: { label: "Modo oscuro / claro", price: 15_000 },
    buscador: { label: "Buscador interno", price: 20_000 },
    chat_en_vivo: { label: "Chat en vivo", price: 25_000 },
};

const DESIGN_PRICES: Record<string, { label: string; price: number }> = {
    moderno: { label: "Diseño moderno", price: 0 },
    minimalista: { label: "Diseño minimalista", price: 0 },
    no_se: { label: "Diseño a elección", price: 0 },
    oscuro: { label: "Diseño dark mode", price: 3_000 },
    calido: { label: "Diseño cálido", price: 3_000 },
    corporativo: { label: "Diseño corporativo", price: 5_000 },
    elegante: { label: "Diseño elegante", price: 8_000 },
    creativo: { label: "Diseño creativo", price: 12_000 },
};

const DEADLINE_PRICES: Record<string, { label: string; price: number }> = {
    sin_prisa: { label: "Sin prisa", price: 0 },
    normal: { label: "2-4 semanas", price: 0 },
    pronto: { label: "1-2 semanas", price: 15_000 },
    urgente: { label: "Esta semana", price: 30_000 },
};

const CONTENT_PRICES = {
    needsLogo: { label: "Diseño de logo", price: 20_000 },
    needsTexts: { label: "Redacción de textos", price: 10_000 },
};

// ── Base prices ──
const BASE_PRICE_LANDING = 220_000;
const BASE_PRICE_WEB = 380_000;
const BASE_PRICE_ECOMMERCE = 550_000;

// ── Calculador principal — type-aware ──────────────────────
export function calculatePrice(
    formData: FormData,
    type: string = "LANDING"
): PricingResult {
    const isWeb = type === "WEB_CORPORATIVA";
    const isEcommerce = type === "ECOMMERCE";
    const basePrice = isEcommerce
        ? BASE_PRICE_ECOMMERCE
        : isWeb
            ? BASE_PRICE_WEB
            : BASE_PRICE_LANDING;
    const breakdown: PriceBreakdownItem[] = [];
    let total = basePrice;

    breakdown.push({
        category: "base",
        label: isEcommerce
            ? "E-commerce base"
            : isWeb
                ? "Web Corporativa base"
                : "Landing Page base",
        amount: basePrice,
    });

    if (isEcommerce) {
        // ── Cantidad de productos ──
        const productCount = (formData.productCount as string) || "";
        const pcInfo = PRODUCT_COUNT_PRICES[productCount];
        if (pcInfo && pcInfo.price > 0) {
            breakdown.push({ category: "productos", label: pcInfo.label, amount: pcInfo.price });
            total += pcInfo.price;
        }

        // ── Variantes ──
        const hasVariants = (formData.hasVariants as string) || "";
        const variantPrice = VARIANT_PRICES[hasVariants] || 0;
        if (variantPrice > 0) {
            breakdown.push({ category: "productos", label: "Variantes de producto", amount: variantPrice });
            total += variantPrice;
        }

        // ── Import masivo ──
        if (formData.hasBulkImport === "si") {
            breakdown.push({ category: "productos", label: "Importación masiva", amount: 35_000 });
            total += 35_000;
        }

        // ── Páginas ecommerce ──
        const pages = (formData.pages as string[]) || [];
        let pagesTotal = 0;
        for (const pageId of pages) {
            const info = ECOMMERCE_PAGE_PRICES[pageId];
            if (info && info.price > 0) pagesTotal += info.price;
        }
        if (pagesTotal > 0) {
            breakdown.push({ category: "paginas", label: `${pages.length} páginas`, amount: pagesTotal });
            total += pagesTotal;
        }

        // ── Pasarelas de pago ──
        const paymentMethods = (formData.paymentMethods as string[]) || [];
        let paymentsTotal = 0;
        for (const pm of paymentMethods) {
            const info = PAYMENT_METHOD_PRICES[pm];
            if (info && info.price > 0) paymentsTotal += info.price;
        }
        if (paymentsTotal > 0) {
            breakdown.push({ category: "pagos", label: `${paymentMethods.length} pasarelas de pago`, amount: paymentsTotal });
            total += paymentsTotal;
        }

        // ── Facturación electrónica ──
        if (formData.needsInvoicing === "si") {
            breakdown.push({ category: "pagos", label: "Facturación electrónica", amount: 40_000 });
            total += 40_000;
        }

        // ── Modelo de envío ──
        const shippingModel = (formData.shippingModel as string) || "";
        const shipInfo = SHIPPING_MODEL_PRICES[shippingModel];
        if (shipInfo && shipInfo.price > 0) {
            breakdown.push({ category: "envios", label: shipInfo.label, amount: shipInfo.price });
            total += shipInfo.price;
        }

        // ── Sistema de cuentas ──
        const accountSystem = (formData.accountSystem as string) || "";
        const accInfo = ACCOUNT_SYSTEM_PRICES[accountSystem];
        if (accInfo && accInfo.price > 0) {
            breakdown.push({ category: "clientes", label: accInfo.label, amount: accInfo.price });
            total += accInfo.price;
        }

        // ── Nivel de inventario ──
        const inventoryLevel = (formData.inventoryLevel as string) || "";
        const invInfo = INVENTORY_PRICES[inventoryLevel];
        if (invInfo && invInfo.price > 0) {
            breakdown.push({ category: "clientes", label: invInfo.label, amount: invInfo.price });
            total += invInfo.price;
        }

        // ── Features ecommerce ──
        const ecommerceFeatures = (formData.ecommerceFeatures as string[]) || [];
        let ecFeatTotal = 0;
        for (const f of ecommerceFeatures) {
            const info = ECOMMERCE_FEATURE_PRICES[f];
            if (info && info.price > 0) ecFeatTotal += info.price;
        }
        if (ecFeatTotal > 0) {
            breakdown.push({ category: "extras", label: `${ecommerceFeatures.length} funcionalidades`, amount: ecFeatTotal });
            total += ecFeatTotal;
        }

        // ── Marketing features ──
        const marketingFeatures = (formData.marketingFeatures as string[]) || [];
        let mktTotal = 0;
        for (const f of marketingFeatures) {
            const info = MARKETING_FEATURE_PRICES[f];
            if (info && info.price > 0) mktTotal += info.price;
        }
        if (mktTotal > 0) {
            breakdown.push({ category: "marketing", label: `${marketingFeatures.length} herramientas marketing`, amount: mktTotal });
            total += mktTotal;
        }

        // ── Customer features pricing ──
        const customerFeatures = (formData.customerFeatures as string[]) || [];
        const customerFeaturePrices: Record<string, number> = {
            historial_pedidos: 15_000,
            direcciones_guardadas: 10_000,
            lista_deseos: 20_000,
            puntos_fidelidad: 45_000,
            referidos: 40_000,
        };
        let custFeatTotal = 0;
        for (const f of customerFeatures) {
            custFeatTotal += customerFeaturePrices[f] || 0;
        }
        if (custFeatTotal > 0) {
            breakdown.push({ category: "clientes", label: `${customerFeatures.length} funciones de cliente`, amount: custFeatTotal });
            total += custFeatTotal;
        }

    } else if (isWeb) {
        // ── Páginas (WEB_CORPORATIVA) ──
        const pages = (formData.pages as string[]) || [];
        let pagesTotal = 0;
        for (const pageId of pages) {
            const info = PAGE_PRICES[pageId];
            if (info && info.price > 0) pagesTotal += info.price;
        }
        if (pagesTotal > 0) {
            breakdown.push({ category: "paginas", label: `${pages.length} páginas`, amount: pagesTotal });
            total += pagesTotal;
        }
    } else {
        // ── Secciones (LANDING) ──
        const sections = (formData.sections as string[]) || [];
        let sectionsTotal = 0;
        for (const sectionId of sections) {
            const info = SECTION_PRICES[sectionId];
            if (info && info.price > 0) sectionsTotal += info.price;
        }
        if (sectionsTotal > 0) {
            breakdown.push({ category: "secciones", label: `${sections.length} secciones`, amount: sectionsTotal });
            total += sectionsTotal;
        }
    }

    // ── Diseño (shared) ──
    const designStyle = (formData.designStyle as string) || "";
    const designInfo = DESIGN_PRICES[designStyle];
    if (designInfo && designInfo.price > 0) {
        breakdown.push({ category: "diseño", label: designInfo.label, amount: designInfo.price });
        total += designInfo.price;
    }

    // ── Contenido (shared) ──
    const hasLogo = formData.hasLogo as string;
    if (hasLogo === "no_necesito") {
        breakdown.push({ category: "contenido", label: CONTENT_PRICES.needsLogo.label, amount: CONTENT_PRICES.needsLogo.price });
        total += CONTENT_PRICES.needsLogo.price;
    }

    const hasTexts = formData.hasTexts as string;
    if (hasTexts === "no" || hasTexts === "no_necesito") {
        breakdown.push({ category: "contenido", label: CONTENT_PRICES.needsTexts.label, amount: CONTENT_PRICES.needsTexts.price });
        total += CONTENT_PRICES.needsTexts.price;
    }

    // ── Features — Landing / Web Corporativa only ──
    if (!isEcommerce) {
        const features = (formData.features as string[]) || [];
        let featuresTotal = 0;
        const featureLabels: string[] = [];
        for (const featureId of features) {
            const info = FEATURE_PRICES[featureId];
            if (info && info.price > 0) {
                featuresTotal += info.price;
                featureLabels.push(info.label);
            }
        }
        if (featuresTotal > 0) {
            breakdown.push({ category: "extras", label: `${featureLabels.length} funcionalidades`, amount: featuresTotal });
            total += featuresTotal;
        }
    }

    // ── Urgencia (shared) ──
    const deadline = (formData.deadline as string) || "";
    const deadlineInfo = DEADLINE_PRICES[deadline];
    if (deadlineInfo && deadlineInfo.price > 0) {
        breakdown.push({ category: "urgencia", label: `Entrega: ${deadlineInfo.label}`, amount: deadlineInfo.price });
        total += deadlineInfo.price;
    }

    // Item count
    const itemCount = isEcommerce
        ? ((formData.pages as string[]) || []).length
        : isWeb
            ? ((formData.pages as string[]) || []).length
            : ((formData.sections as string[]) || []).length;

    // Feature count
    const featureCount = isEcommerce
        ? ((formData.ecommerceFeatures as string[]) || []).length + ((formData.marketingFeatures as string[]) || []).length
        : ((formData.features as string[]) || []).length;

    return {
        basePrice,
        totalMin: total,
        breakdown,
        sectionsCount: itemCount,
        featuresCount: featureCount,
    };
}

// ── Formateo CLP ──────────────────────────────────────────
export function formatCLP(amount: number): string {
    return `$${amount.toLocaleString("es-CL")}`;
}

