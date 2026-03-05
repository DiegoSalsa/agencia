/**
 * Mapeo centralizado de valores internos a etiquetas legibles.
 * Extraído de las opciones definidas en configs/landing.ts.
 * Usado por generateDocx, generateXlsx y generateEmailHtml.
 */

const VALUE_LABELS: Record<string, string> = {
    // ── Rubro / Industria ──
    gastronomia: "Gastronomía / Restaurante",
    salud: "Salud / Medicina",
    belleza: "Belleza / Estética",
    educacion: "Educación / Cursos",
    tecnologia: "Tecnología / Software",
    inmobiliaria: "Inmobiliaria / Bienes raíces",
    legal: "Legal / Abogados",
    fitness: "Fitness / Deporte",
    construccion: "Construcción / Remodelación",
    automotriz: "Automotriz",
    agricultura: "Agricultura / Agro",
    consultoria: "Consultoría / Asesoría",
    marketing: "Marketing / Publicidad",

    // ── Objetivo principal ──
    captar_leads: "Captar clientes potenciales (leads)",
    vender_servicio: "Promocionar y vender un servicio",
    vender_producto: "Promocionar un producto",
    informar: "Dar a conocer mi negocio",
    evento: "Promocionar un evento",
    portafolio: "Mostrar mi portafolio / trabajo",
    // Web Corporativa objectives
    presencia_online: "Establecer presencia profesional en internet",
    generar_confianza: "Generar confianza y credibilidad",
    mostrar_catalogo: "Mostrar catálogo de productos o servicios",
    captar_clientes: "Captar nuevos clientes",
    informar_empresa: "Informar sobre la empresa y su trayectoria",

    // ── Llamada a la acción (CTA) ──
    whatsapp: "Contactar por WhatsApp",
    formulario: "Llenar un formulario de contacto",
    llamar: "Llamar por teléfono",
    agendar: "Agendar una cita / reunión",
    comprar: "Comprar un producto / servicio",
    descargar: "Descargar algo (PDF, catálogo, etc.)",

    // ── Secciones de la landing ──
    hero: "Hero / Banner principal",
    servicios: "Servicios / Lo que ofrezco",
    proceso: "Proceso / Cómo trabajamos",
    sobre_mi: "Sobre mí / Nosotros",
    // portafolio ya mapeado arriba ("Mostrar mi portafolio / trabajo")
    testimonios: "Testimonios / Reseñas",
    equipo: "Equipo de trabajo",
    precios: "Precios / Planes",
    faq: "Preguntas frecuentes (FAQ)",
    blog: "Blog / Noticias",
    contacto: "Formulario de contacto",
    ubicacion: "Mapa / Ubicación",
    estadisticas: "Cifras / Estadísticas",
    clientes: "Logos de clientes",

    // ── Páginas Web Corporativa ──
    inicio: "Página de Inicio",
    nosotros: "Nosotros / Quiénes somos",
    galeria: "Galería de imágenes",
    casos_exito: "Casos de éxito",

    // ── Estilo de diseño ──
    moderno: "Moderno y limpio",
    elegante: "Elegante y sofisticado",
    minimalista: "Minimalista",
    corporativo: "Corporativo / Profesional",
    creativo: "Creativo y colorido",
    oscuro: "Dark mode / Oscuro",
    calido: "Cálido y acogedor",

    // ── Logo ──
    si: "Sí",
    no_necesito: "No tengo, pero lo necesito",
    no_no_necesito: "No tengo y no lo necesito por ahora",

    // ── Fotos ──
    algunas: "Tengo algunas, necesitaría más",

    // ── Textos ──
    borrador: "Tengo un borrador / ideas",

    // ── Funcionalidades extras ──
    whatsapp_button: "Redes sociales flotante",
    google_maps: "Google Maps integrado",
    formulario_contacto: "Formulario de contacto",
    formulario_avanzado: "Formulario avanzado (más campos)",
    animaciones: "Animaciones y efectos",
    multiidioma: "Multi-idioma (ES/EN)",
    agenda: "Integración con agenda (Calendly)",
    descargables: "Descargables (PDF / Catálogo)",
    analytics: "Google Analytics",
    seo: "Optimización SEO",
    // Web Corporativa features
    dark_mode: "Modo oscuro / claro",
    buscador: "Buscador interno",
    chat_en_vivo: "Chat en vivo",

    // ── Dominio ──
    necesito: "No, necesito uno",
    no_se: "No estoy seguro / No sé",

    // ── Plazo de entrega ──
    urgente: "Esta semana",
    pronto: "En 1-2 semanas",
    normal: "En 2-3 semanas",
    sin_prisa: "Sin prisa, cuando esté listo",

    // ── Presupuesto ──
    basico: "Básico",
    medio: "Medio",
    premium: "Premium",

    // ── Genéricos ──
    otro: "Otro",
    no: "No",

    // ═══════════════════════════════════════════════════════
    // E-COMMERCE — Valores específicos
    // ═══════════════════════════════════════════════════════

    // ── Rubros e-commerce ──
    moda_vestuario: "Moda / Vestuario / Calzado",
    alimentos_bebidas: "Alimentos y Bebidas",
    tecnologia_electronica: "Tecnología / Electrónica",
    belleza_cosmeticos: "Belleza / Cosméticos",
    deportes: "Deportes / Fitness",
    hogar_decoracion: "Hogar / Decoración / Muebles",
    juguetes: "Juguetes / Infantil",
    mascotas: "Mascotas",
    libros_papeleria: "Libros / Papelería",
    joyeria_accesorios: "Joyería / Accesorios",
    productos_digitales: "Productos Digitales",

    // ── Objetivos de tienda ──
    vender_online: "Comenzar a vender por internet",
    expandir_canal: "Agregar canal de venta digital",
    reemplazar_tienda_fisica: "Migrar de tienda física a online",
    lanzar_marca: "Lanzar marca nueva online",
    dropshipping: "Negocio de dropshipping",
    marketplace_propio: "Marketplace / Multi-vendedor",

    // ── Facturación esperada ──
    bajo_1m: "Menos de $1.000.000 mensual",
    "1m_5m": "$1.000.000 – $5.000.000 mensual",
    "5m_15m": "$5.000.000 – $15.000.000 mensual",
    "15m_plus": "Más de $15.000.000 mensual",

    // ── Cantidad de productos ──
    "1_20": "1 a 20 productos",
    "21_50": "21 a 50 productos",
    "51_200": "51 a 200 productos",
    "201_500": "201 a 500 productos",
    "500_plus": "Más de 500 productos",

    // ── Tipos de producto ──
    fisicos: "Productos físicos",
    digitales: "Productos digitales",
    servicios_digitales: "Servicios",
    suscripciones: "Suscripciones / Membresías",
    personalizados: "Productos personalizados",

    // ── Variantes ──
    algunos: "Algunos productos",

    // ── Categorías ──
    "1_3": "1 a 3 categorías",
    "4_10": "4 a 10 categorías",
    "11_30": "11 a 30 categorías",
    "30_plus": "Más de 30 categorías",

    // ── Páginas ecommerce ──
    catalogo: "Catálogo / Tienda",
    producto_detalle: "Página de Producto",
    carrito: "Carrito de Compras",
    checkout: "Checkout / Pago",
    cuenta_usuario: "Mi Cuenta / Panel de Usuario",
    politicas: "Políticas (privacidad, devoluciones, envíos)",
    tracking_pedidos: "Seguimiento de Pedidos",

    // ── Métodos de pago ──
    transbank_webpay: "Transbank (Webpay Plus)",
    mercadopago: "MercadoPago",
    transferencia_bancaria: "Transferencia bancaria manual",
    contra_entrega: "Pago contra entrega",
    otro_medio: "Otro medio de pago",

    // ── Estado de cuentas de pago ──
    ya_tengo_cuentas: "Ya tiene cuentas creadas",
    necesito_registrarme: "Necesita registrarse",

    // ── Facturación electrónica ──
    // si: ya mapeado arriba

    // ── Monedas ──
    clp: "Pesos Chilenos (CLP)",
    usd: "Dólares (USD)",
    ambas: "Multi-moneda (CLP + USD)",

    // ── Modelo de envío ──
    tarifa_plana: "Tarifa plana",
    por_zona_distancia: "Por zona o distancia",
    gratis_sobre_monto: "Gratis sobre cierto monto",
    retiro_en_tienda: "Retiro en tienda / local",
    solo_digital: "Sin envío (productos digitales)",

    // ── Zonas de envío ──
    local_misma_ciudad: "Local (misma ciudad)",
    regional: "Regional (misma región)",
    nacional: "Nacional (todo Chile)",
    internacional: "Internacional",

    // ── Manejo de envío ──
    si_propio: "Envío propio / delivery",
    courier_externo: "Courier / empresa de envíos",
    // ambos: ya mapeado

    // ── Sistema de cuentas ──
    registro_completo: "Solo registro obligatorio",
    solo_invitado: "Solo compra como invitado",
    ambos_registro_e_invitado: "Registro + invitado",

    // ── Tracking invitado ──
    por_email: "Actualizaciones por email",
    por_numero_pedido: "Nº de pedido + email",
    sin_tracking_invitado: "Sin seguimiento para invitados",

    // ── Features de cliente ──
    historial_pedidos: "Historial de pedidos",
    direcciones_guardadas: "Direcciones guardadas",
    lista_deseos: "Lista de deseos / Wishlist",
    puntos_fidelidad: "Programa de puntos / Fidelidad",
    referidos: "Sistema de referidos",

    // ── Nivel de inventario ──
    sin_control: "Sin control de stock",
    stock_basico: "Stock básico",
    stock_avanzado: "Stock avanzado (alertas, por variante)",

    // ── Fotos de producto ──
    si_profesionales: "Fotos profesionales listas",
    si_propias: "Fotos propias / amateur",
    necesito_servicio: "Necesita servicio de fotografía",
    usare_mockups: "Mockups / imágenes de proveedor",

    // ── Estilo de descripción de producto ──
    breve_ficha_tecnica: "Ficha técnica breve",
    descriptivo_comercial: "Descriptivo comercial",
    storytelling: "Storytelling (historia + emoción)",

    // ── Tiene idea de logo ──
    tengo_idea: "Tiene idea de cómo lo quiere",

    // ── Features ecommerce ──
    resenas_valoraciones: "Reseñas y valoraciones",
    comparador_productos: "Comparador de productos",
    zoom_producto: "Zoom de imagen de producto",
    productos_relacionados: "Productos relacionados",
    filtros_avanzados: "Filtros avanzados",
    busqueda_inteligente: "Búsqueda inteligente",
    notificaciones_stock: "Notificaciones de stock",
    multi_idioma: "Multi-idioma (ES/EN)",
    pwa_app_movil: "PWA / App móvil",

    // ── Marketing features ──
    newsletter_email: "Email marketing / Newsletter",
    banners_promocionales: "Banners promocionales",
    analytics_tracking: "Analytics y tracking",
    seo_schema_producto: "SEO avanzado (schema de producto)",
    redes_sociales_shop: "Integración redes sociales",
    carritos_abandonados: "Carritos abandonados",
    codigos_descuento: "Códigos de descuento / Cupones",
    programa_referidos: "Programa de referidos",

    // ── Plataformas sociales ──
    instagram_shopping: "Instagram Shopping",
    facebook_shop: "Facebook Shop",
    tiktok_shop: "TikTok Shop",
    google_shopping: "Google Shopping",
    pinterest: "Pinterest",

    // ── SEO level ──
    avanzado: "Avanzado",
    seo_no_necesito: "No necesita por ahora",

    // ── Dominio ecommerce ──
    si_tengo: "Ya tiene dominio",

    // ── Import masivo ──
    // si, no, no_se ya mapeados

    // ── Tiene dominio ──
    // necesito already mapped

};

/**
 * Traduce un valor crudo a su etiqueta legible.
 * Si el valor es un array, traduce cada elemento.
 * Si no hay traducción, devuelve el valor tal cual (formateado).
 */
export function translateValue(value: unknown): string {
    if (value === undefined || value === null || value === "") return "No especificado";

    if (Array.isArray(value)) {
        return value
            .map((v) => VALUE_LABELS[String(v)] || String(v).replace(/_/g, " "))
            .join(", ");
    }

    if (typeof value === "boolean") return value ? "Sí" : "No";

    const str = String(value);
    return VALUE_LABELS[str] || str;
}

export { VALUE_LABELS };
