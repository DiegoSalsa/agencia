/* ========================================
   Sistema de Internacionalización (i18n)
   ======================================== */

export type Lang = 'es' | 'en';
export type Currency = 'CLP' | 'USD' | 'EUR' | 'MXN' | 'ARS' | 'COP' | 'PEN' | 'BRL';

export interface CurrencyConfig {
  symbol: string;
  name: string;
  rate: number;
  decimals: number;
  format: string;
}

export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  CLP: { symbol: '$', name: 'CLP', rate: 1, decimals: 0, format: 'es-CL' },
  USD: { symbol: '$', name: 'USD', rate: 0.00149, decimals: 0, format: 'en-US' },
  EUR: { symbol: '€', name: 'EUR', rate: 0.00135, decimals: 0, format: 'de-DE' },
  MXN: { symbol: '$', name: 'MXN', rate: 0.019, decimals: 0, format: 'es-MX' },
  ARS: { symbol: '$', name: 'ARS', rate: 0.97, decimals: 0, format: 'es-AR' },
  COP: { symbol: '$', name: 'COP', rate: 4.5, decimals: 0, format: 'es-CO' },
  PEN: { symbol: 'S/', name: 'PEN', rate: 0.0041, decimals: 0, format: 'es-PE' },
  BRL: { symbol: 'R$', name: 'BRL', rate: 0.0055, decimals: 0, format: 'pt-BR' },
};

export const COUNTRY_CURRENCY: Record<string, Currency> = {
  CL: 'CLP', US: 'USD', CA: 'USD', GB: 'EUR', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR',
  MX: 'MXN', AR: 'ARS', CO: 'COP', PE: 'PEN', BR: 'BRL',
  EC: 'USD', PA: 'USD', SV: 'USD',
  UY: 'USD', PY: 'USD', BO: 'USD', VE: 'USD', CR: 'USD', GT: 'USD', HN: 'USD', NI: 'USD',
};

export const COUNTRY_LANG: Record<string, Lang> = {
  US: 'en', CA: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en',
};

export const BASE_PRICES = {
  landing: 220000,
  corporate: 380000,
  ecommerce: 550000,
  section: 25000,
  extras: {
    blog: 45000,
    chat: 25000,
    booking: 120000,
    multilang: 60000,
    admin_pro: 150000,
    cms: 85000,
  },
};

export type PlanKey = 'landing' | 'corporate' | 'ecommerce';

export const REGIONAL_PRICES: Record<Currency, Record<PlanKey, number>> = {
  CLP: { landing: 220000, corporate: 380000, ecommerce: 550000 },
  USD: { landing: 350, corporate: 600, ecommerce: 900 },
  EUR: { landing: 350, corporate: 600, ecommerce: 900 },
  MXN: { landing: 6900, corporate: 11900, ecommerce: 17900 },
  ARS: { landing: 350000, corporate: 600000, ecommerce: 900000 },
  COP: { landing: 1400000, corporate: 2400000, ecommerce: 3600000 },
  PEN: { landing: 1300, corporate: 2200, ecommerce: 3300 },
  BRL: { landing: 1900, corporate: 3300, ecommerce: 4900 },
};

export function getRegionalPrice(plan: PlanKey, currency: Currency): string {
  const price = REGIONAL_PRICES[currency]?.[plan] ?? REGIONAL_PRICES.USD[plan];
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  return new Intl.NumberFormat(config.format, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const DISCOUNT_MULTIPLIER = 1.4; // fake "original" price = 40% higher

export function getOriginalPrice(plan: PlanKey, currency: Currency): string {
  const price = REGIONAL_PRICES[currency]?.[plan] ?? REGIONAL_PRICES.USD[plan];
  const original = Math.round(price * DISCOUNT_MULTIPLIER / 1000) * 1000 || Math.round(price * DISCOUNT_MULTIPLIER);
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  return new Intl.NumberFormat(config.format, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(original);
}

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  es: {
    // Header
    nav_portfolio: 'Portafolio',
    nav_services: 'Servicios',
    nav_pricing: 'Planes',
    nav_process: 'Proceso',
    nav_contact: 'Contacto',
    nav_cta: 'Cotiza tu Proyecto',

    // Hero
    hero_badge: 'Transformación Digital Premium',
    hero_title: 'Creamos Software que',
    hero_title_highlight: 'Impulsa Negocios',
    hero_subtitle: 'Desarrollo web de alta gama, soluciones SaaS escalables y experiencias digitales que convierten visitantes en clientes.',
    hero_cta_primary: 'Cotiza tu Proyecto',
    hero_cta_secondary: 'Ver Portafolio',
    hero_cta_briefing: 'Completar Cuestionario',
    hero_payment_note: '50% al inicio · 50% al entregar',

    // Portfolio
    portfolio_tag: 'Nuestro Trabajo',
    portfolio_title: 'Proyectos Reales',
    portfolio_subtitle: 'Cada proyecto refleja nuestra dedicación al detalle y al rendimiento.',
    portfolio_1_desc: 'Landing profesional para clínica de podología — diseño limpio, optimizada para conversión.',
    portfolio_2_desc: 'Sitio web para podóloga clínica en Ñuñoa — diseño enfocado en confianza y contacto.',
    portfolio_3_desc: 'Tienda online de florería artesanal — experiencia visual cuidada y pedidos directos.',
    portfolio_4_desc: 'Demo de landing moderna para marca deportiva — diseño audaz y dinámico.',
    portfolio_5_desc: 'Demo de landing para restaurante japonés — estética elegante y menú interactivo.',
    portfolio_6_desc: 'Web corporativa de soluciones agroindustriales — información clara y profesional.',
    portfolio_7_desc: 'Plataforma SaaS de encuestas de satisfacción — dashboards y análisis en tiempo real.',

    // Services
    services_tag: 'Experiencia',
    services_title: 'Soluciones digitales premium para',
    services_title_2: 'escalar marcas modernas.',
    service_1_title: 'Desarrollo Web Moderno',
    service_1_desc: 'Creamos interfaces de alto rendimiento y responsivas que entregan experiencias de usuario excepcionales. Enfocados en velocidad, accesibilidad y código limpio.',
    service_2_title: 'Mantenimiento',
    service_2_desc: 'Soporte dedicado 24/7, parches de seguridad y optimización continua de rendimiento.',
    service_3_title: 'Soluciones SaaS',
    service_3_desc: 'Arquitecturas multi-inquilino escalables diseñadas para un crecimiento rápido. Manejamos la complejidad técnica para que usted se enfoque en su hoja de ruta.',
    learn_more: 'Saber más',
    explore: 'Explorar',

    // Process
    process_tag: 'Metodología Premium',
    process_title: 'Cómo Trabajamos',
    process_subtitle: 'Transformamos ideas complejas en productos digitales de clase mundial a través de un proceso ágil y transparente.',
    process_1_title: 'Descubrimiento',
    process_1_desc: 'Iniciamos con reuniones estratégicas para entender tu visión y definir objetivos.',
    process_2_title: 'Diseño & UX',
    process_2_desc: 'Creamos prototipos de alta fidelidad centrados en el usuario final.',
    process_3_title: 'Desarrollo',
    process_3_desc: 'Implementamos con arquitecturas escalables y código limpio bajo metodología Agile.',
    process_4_title: 'Lanzamiento',
    process_4_desc: 'Deploy optimizado con monitoreo continuo y soporte post-lanzamiento.',

    // Stats
    stat_1_label: 'Proyectos Exitosos',
    stat_1_trend: '+12% este año',
    stat_2_label: 'Tiempo Entrega',
    stat_2_note: 'vs promedio industria',
    stat_3_label: 'Satisfacción',

    // Pricing
    pricing_tag: 'Inversión',
    pricing_title: 'Planes y Precios',
    pricing_subtitle: 'Soluciones digitales de alto impacto diseñadas para escalar tu negocio.',
    pricing_from: 'Desde',
    pricing_contact: 'Contactar',
    pricing_popular: 'Más Popular',
    pricing_cta: 'Comenzar Proyecto',
    pricing_cta_briefing: 'Iniciar Briefing',
    pricing_payment_note: '50% al inicio · 50% a la entrega',

    // Plan names
    plan_landing: 'Landing Page',
    plan_landing_desc: 'Ideal para lanzamientos y campañas de marketing.',
    plan_landing_subtitle: 'Impacto inmediato',
    plan_corp: 'Web Corporativa',
    plan_corp_desc: 'Presencia profesional con múltiples secciones.',
    plan_corp_subtitle: 'Presencia profesional',
    plan_ecommerce: 'E-commerce',
    plan_ecommerce_desc: 'Tienda online completa con pagos y gestión.',
    plan_ecommerce_subtitle: 'Vende en línea',

    // Features
    feature_hosting: 'Dominio y Hosting GRATIS 1 año',
    feature_responsive: 'Diseño Responsivo UX/UI',
    feature_seo: 'Optimización SEO Base',
    feature_form: 'Formulario de Contacto',
    feature_sections: 'Hasta 5 Secciones Personalizadas',
    feature_social: 'Integración Redes Sociales',
    feature_support: 'Soporte Técnico 3 Meses',
    feature_payments: 'Pasarela de Pagos (Webpay/Flow)',
    feature_admin: 'Panel de Administración',
    feature_inventory: 'Gestión de Inventario',
    feature_support_6: 'Soporte Técnico 6 Meses',

    // CTA Banner
    cta_badge: 'Empecemos',
    cta_title: '¿Tienes un proyecto en mente?',
    cta_subtitle: 'Cuéntanos tu idea y te entregaremos una cotización personalizada sin compromiso.',
    cta_button: 'Cotizar Gratis',

    // Contact
    contact_tag: 'Conversemos',
    contact_title: '¿Listo para transformar tu presencia digital?',
    contact_subtitle: 'Escríbenos por cualquier canal y te responderemos en menos de 24 horas.',
    contact_email_title: 'Email',
    contact_wsp_title: 'WhatsApp',
    contact_ig_title: 'Instagram',
    contact_fb_title: 'Facebook',
    contact_info_title: 'Información de Contacto',

    // Footer
    footer_desc: 'Transformamos ideas en productos digitales de clase mundial.',
    footer_services: 'Servicios',
    footer_company: 'Empresa',
    footer_contact: 'Contacto',
    footer_rights: 'Todos los derechos reservados.',
    footer_terms: 'Términos de Servicio',
    footer_privacy: 'Política de Privacidad',

    // Language selector
    lang_select: 'Idioma',
    currency_select: 'Moneda',
  },
  en: {
    // Header
    nav_portfolio: 'Portfolio',
    nav_services: 'Services',
    nav_pricing: 'Plans',
    nav_process: 'Process',
    nav_contact: 'Contact',
    nav_cta: 'Get a Quote',

    // Hero
    hero_badge: 'Premium Digital Transformation',
    hero_title: 'We Create Software that',
    hero_title_highlight: 'Drives Business',
    hero_subtitle: 'High-end web development, scalable SaaS solutions, and digital experiences that turn visitors into customers.',
    hero_cta_primary: 'Get a Quote',
    hero_cta_secondary: 'View Portfolio',
    hero_cta_briefing: 'Complete Questionnaire',
    hero_payment_note: '50% upfront · 50% on delivery',

    // Portfolio
    portfolio_tag: 'Our Work',
    portfolio_title: 'Real Projects',
    portfolio_subtitle: 'Each project reflects our dedication to detail and performance.',
    portfolio_1_desc: 'Professional landing for a podiatry clinic — clean design, optimized for conversion.',
    portfolio_2_desc: 'Website for a clinical podiatrist in Ñuñoa — trust-focused design with easy contact.',
    portfolio_3_desc: 'Artisan flower shop online store — curated visual experience and direct orders.',
    portfolio_4_desc: 'Modern landing demo for a sports brand — bold and dynamic design.',
    portfolio_5_desc: 'Landing demo for a Japanese restaurant — elegant aesthetic and interactive menu.',
    portfolio_6_desc: 'Corporate website for agro-industrial solutions — clear and professional information.',
    portfolio_7_desc: 'SaaS satisfaction survey platform — dashboards and real-time analytics.',

    // Services
    services_tag: 'Experience',
    services_title: 'Premium digital solutions to',
    services_title_2: 'scale modern brands.',
    service_1_title: 'Modern Web Development',
    service_1_desc: 'We create high-performance, responsive interfaces that deliver exceptional user experiences. Focused on speed, accessibility, and clean code.',
    service_2_title: 'Maintenance',
    service_2_desc: 'Dedicated 24/7 support, security patches, and continuous performance optimization.',
    service_3_title: 'SaaS Solutions',
    service_3_desc: 'Scalable multi-tenant architectures designed for rapid growth. We handle the technical complexity so you can focus on your roadmap.',
    learn_more: 'Learn more',
    explore: 'Explore',

    // Process
    process_tag: 'Premium Methodology',
    process_title: 'How We Work',
    process_subtitle: 'We transform complex ideas into world-class digital products through an agile and transparent process.',
    process_1_title: 'Discovery',
    process_1_desc: 'We start with strategic meetings to understand your vision and define objectives.',
    process_2_title: 'Design & UX',
    process_2_desc: 'We create high-fidelity prototypes focused on the end user.',
    process_3_title: 'Development',
    process_3_desc: 'We implement with scalable architectures and clean code under Agile methodology.',
    process_4_title: 'Launch',
    process_4_desc: 'Optimized deployment with continuous monitoring and post-launch support.',

    // Stats
    stat_1_label: 'Successful Projects',
    stat_1_trend: '+12% this year',
    stat_2_label: 'Delivery Time',
    stat_2_note: 'vs industry average',
    stat_3_label: 'Satisfaction',

    // Pricing
    pricing_tag: 'Investment',
    pricing_title: 'Plans & Pricing',
    pricing_subtitle: 'High-impact digital solutions designed to scale your business.',
    pricing_from: 'From',
    pricing_contact: 'Contact Us',
    pricing_popular: 'Most Popular',
    pricing_cta: 'Start Project',
    pricing_cta_briefing: 'Start Briefing',
    pricing_payment_note: '50% upfront · 50% on delivery',

    // Plan names
    plan_landing: 'Landing Page',
    plan_landing_desc: 'Ideal for launches and marketing campaigns.',
    plan_landing_subtitle: 'Instant impact',
    plan_corp: 'Corporate Website',
    plan_corp_desc: 'Professional presence with multiple sections.',
    plan_corp_subtitle: 'Professional presence',
    plan_ecommerce: 'E-commerce',
    plan_ecommerce_desc: 'Complete online store with payments and management.',
    plan_ecommerce_subtitle: 'Sell online',

    // Features
    feature_hosting: 'FREE Domain and Hosting for 1 year',
    feature_responsive: 'Responsive UX/UI Design',
    feature_seo: 'Basic SEO Optimization',
    feature_form: 'Contact Form',
    feature_sections: 'Up to 5 Custom Sections',
    feature_social: 'Social Media Integration',
    feature_support: '3 Months Technical Support',
    feature_payments: 'Payment Gateway (Stripe/PayPal)',
    feature_admin: 'Admin Panel',
    feature_inventory: 'Inventory Management',
    feature_support_6: '6 Months Technical Support',

    // CTA Banner
    cta_badge: "Let's Start",
    cta_title: 'Have a project in mind?',
    cta_subtitle: 'Tell us your idea and we\'ll deliver a custom quote with no strings attached.',
    cta_button: 'Get Free Quote',

    // Contact
    contact_tag: "Let's Talk",
    contact_title: 'Ready to transform your digital presence?',
    contact_subtitle: 'Reach out on any channel and we\'ll respond within 24 hours.',
    contact_email_title: 'Email',
    contact_wsp_title: 'WhatsApp',
    contact_ig_title: 'Instagram',
    contact_fb_title: 'Facebook',
    contact_info_title: 'Contact Information',

    // Footer
    footer_desc: 'We transform ideas into world-class digital products.',
    footer_services: 'Services',
    footer_company: 'Company',
    footer_contact: 'Contact',
    footer_rights: 'All rights reserved.',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',

    // Language selector
    lang_select: 'Language',
    currency_select: 'Currency',
  },
};

export function formatPrice(priceInCLP: number, currency: Currency = 'CLP'): string {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  let convertedPrice = priceInCLP * config.rate;

  if (currency === 'CLP') {
    return new Intl.NumberFormat(config.format, {
      style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(Math.round(convertedPrice));
  }

  if (currency === 'USD' || currency === 'EUR') {
    convertedPrice = Math.ceil(convertedPrice / 10) * 10;
  } else if (currency === 'COP' || currency === 'ARS') {
    convertedPrice = Math.ceil(convertedPrice / 1000) * 1000;
  } else if (currency === 'MXN' || currency === 'BRL' || currency === 'PEN') {
    convertedPrice = Math.ceil(convertedPrice / 100) * 100;
  }

  return new Intl.NumberFormat(config.format, {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(convertedPrice);
}

export function t(key: string, lang: Lang = 'es'): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.es[key] || key;
}

export async function detectCountry(): Promise<{ country: string; currency: Currency; lang: Lang }> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const country = data.country_code || 'CL';
    const currency = COUNTRY_CURRENCY[country] || 'USD';
    const lang = COUNTRY_LANG[country] || 'es';
    return { country, currency, lang };
  } catch {
    return { country: 'CL', currency: 'CLP', lang: 'es' };
  }
}
