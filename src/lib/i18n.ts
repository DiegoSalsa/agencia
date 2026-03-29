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
    hero_title_highlights: 'Impulsa Negocios,Convierte Visitantes,Escala tu Marca',
    hero_subtitle: 'Desarrollo web de alta gama, soluciones SaaS escalables y experiencias digitales que convierten visitantes en clientes.',
    hero_cta_primary: 'Cotiza tu Proyecto',
    hero_cta_secondary: 'Ver Portafolio',
    hero_cta_briefing: 'Completar Cuestionario',
    hero_payment_note: '50% al inicio · 50% al entregar',

    // Portfolio
    portfolio_tag: 'Nuestro Trabajo',
    portfolio_title: 'Proyectos que Confían en Nosotros',
    portfolio_subtitle: 'Cada proyecto refleja nuestra dedicación al detalle, rendimiento y la confianza de quienes nos eligen.',
    portfolio_trust_badge: '8 clientes satisfechos y contando',
    portfolio_1_desc: 'Landing profesional para clínica de podología — diseño limpio, optimizada para conversión.',
    portfolio_2_desc: 'Sitio web para podóloga clínica en Ñuñoa — diseño enfocado en confianza y contacto.',
    portfolio_3_desc: 'Tienda online de florería artesanal — experiencia visual cuidada y pedidos directos.',
    portfolio_4_desc: 'Demo de landing moderna para marca deportiva — diseño audaz y dinámico.',
    portfolio_5_desc: 'Demo de landing para restaurante japonés — estética elegante y menú interactivo.',
    portfolio_6_desc: 'Web corporativa de soluciones agroindustriales — información clara y profesional.',
    portfolio_7_desc: 'Plataforma SaaS de encuestas de satisfacción — dashboards y análisis en tiempo real.',
    portfolio_8_desc: 'Demo de landing para banquetería premium — catering y eventos con diseño elegante.',

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
    svc_feat_1_1: 'Next.js / React / TypeScript',
    svc_feat_1_2: 'Tailwind CSS + Framer Motion',
    svc_feat_1_3: 'Mobile-First & Responsive',
    svc_feat_1_4: '90+ Lighthouse Performance',
    svc_feat_1_5: 'UI/UX Diseño personalizado',
    svc_feat_1_6: 'SEO Optimizado desde día 1',
    svc_feat_2_1: 'SSL & Seguridad 24/7',
    svc_feat_2_2: 'Uptime 99.9% garantizado',
    svc_feat_2_3: 'Monitoreo en tiempo real',
    svc_feat_2_4: 'Deploy automático CI/CD',
    svc_feat_2_5: 'Mantenimiento preventivo',
    svc_feat_2_6: 'Backups diarios',
    svc_feat_3_1: 'Arquitectura cloud escalable',
    svc_feat_3_2: 'API REST & GraphQL',
    svc_feat_3_3: 'PostgreSQL / MongoDB / Prisma',
    svc_feat_3_4: 'Auth multi-nivel (OAuth2)',
    svc_feat_3_5: 'Dashboards & Analytics',
    svc_feat_3_6: 'Microservicios & Webhooks',
    svc_stat_1: 'Lighthouse Score',
    svc_stat_2: 'Uptime',
    svc_stat_3: 'Escalabilidad',
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
    pricing_cta_whatsapp: 'Cotizar por WhatsApp',
    pricing_payment_note: '50% al inicio · 50% a la entrega',
    pricing_custom_quote: 'Cotización personalizada',

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
    plan_enterprise: 'Enterprise',
    plan_enterprise_desc: 'Solución a medida para operaciones complejas, integraciones y escalamiento empresarial.',
    plan_enterprise_subtitle: 'A medida',

    // Features
    feature_hosting: 'Dominio y Hosting GRATIS 1 año',
    feature_responsive: 'Diseño Responsivo UX/UI',
    feature_seo: 'Optimización SEO Base',
    feature_form: 'Formulario de Contacto',
    feature_sections: 'Hasta 5 Secciones Personalizadas',
    feature_social: 'Integración Redes Sociales',
    feature_support: 'Soporte Técnico 3 Meses',
    feature_payments: 'Pasarela de Pagos (Webpay/Flow/MercadoPago)',
    feature_admin: 'Panel de Administración',
    feature_inventory: 'Gestión de Inventario',
    feature_support_6: 'Soporte Técnico 6 Meses',
    feature_enterprise_audit: 'Diagnóstico técnico y estratégico inicial',
    feature_enterprise_architecture: 'Arquitectura personalizada para alto tráfico',
    feature_enterprise_integrations: 'Integraciones avanzadas con sistemas internos',
    feature_enterprise_sla: 'Soporte prioritario especializado',

    // CTA Banner
    cta_badge: 'Empecemos',
    cta_title: '¿Tienes un proyecto en mente?',
    cta_subtitle: 'Cuéntanos tu idea y te entregaremos una cotización personalizada sin compromiso.',
    cta_button: 'Cotizar Gratis',
    cta_stat_1_value: '10+',
    cta_stat_1_label: 'Proyectos entregados',
    cta_stat_2_value: '100%',
    cta_stat_2_label: 'Clientes satisfechos',
    cta_stat_3_value: '<15 días',
    cta_stat_3_label: 'Entrega promedio',
    cta_testimonial_text: 'Desde el primer día entendieron lo que necesitábamos. El resultado superó nuestras expectativas — la web cargó rápido, los clientes empezaron a llegar y el soporte post-lanzamiento fue impecable.',
    cta_testimonial_name: 'Camila Rojas',
    cta_testimonial_role: 'Fundadora, Florería Wildgarden',
    cta_testimonial_initials: 'CR',

    // Trust strip
    trust_title: 'Empresas que confían en nosotros',

    // FAQ
    faq_tag: 'FAQ',
    faq_title: 'Preguntas Frecuentes',
    faq_subtitle: 'Resolvemos las dudas más comunes sobre nuestros servicios de desarrollo web.',
    faq_q1: '¿Cuánto cuesta crear una página web?',
    faq_a1: 'Nuestros precios varían según el tipo de proyecto. Una Landing Page parte desde $220.000 CLP, un sitio web corporativo desde $380.000 CLP y un e-commerce desde $620.000 CLP. Todos incluyen dominio y hosting gratuito por 1 año. Puedes cotizar gratis en nuestro formulario.',
    faq_q2: '¿Cuánto tiempo toma desarrollar mi sitio web?',
    faq_a2: 'Los tiempos dependen de la complejidad del proyecto. Una Landing Page se entrega en 5-7 días hábiles, un sitio corporativo en 10-15 días y un e-commerce en 15-25 días. Proyectos SaaS se planifican caso a caso.',
    faq_q3: '¿Qué tecnologías utilizan?',
    faq_a3: 'Trabajamos con las tecnologías más modernas del mercado: Next.js, React, TypeScript, Tailwind CSS, Node.js, Prisma y PostgreSQL. Desplegamos en Vercel y AWS para máximo rendimiento y escalabilidad.',
    faq_q4: '¿Incluyen hosting y dominio?',
    faq_a4: 'Sí, todos nuestros planes incluyen dominio .cl o .com y hosting gratuito durante el primer año. Después del primer año, te ayudamos con la renovación a precios competitivos.',
    faq_q5: '¿Cómo es el proceso de trabajo?',
    faq_a5: 'Nuestro proceso tiene 4 etapas: 1) Briefing donde recopilamos tus necesidades, 2) Diseño donde creamos mockups para tu aprobación, 3) Desarrollo donde construimos tu sitio, y 4) Entrega con capacitación incluida. Siempre mantienes comunicación directa con el equipo.',
    faq_q6: '¿Ofrecen mantenimiento después de la entrega?',
    faq_a6: 'Sí, todos los planes incluyen soporte técnico (3 a 6 meses según el plan). Además ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, backups, monitoreo de seguridad y cambios menores.',
    faq_q7: '¿Puedo ver ejemplos de trabajos anteriores?',
    faq_a7: 'Por supuesto. Puedes ver nuestro portafolio completo en la sección de arriba con proyectos reales como BioImpacto, PodomedClinical, Florería Wildgarden y ValoraLocal, entre otros.',

    // Contact
    contact_tag: 'Conversemos',
    contact_title: '¿Listo para transformar tu presencia digital?',
    contact_subtitle: 'Escríbenos por cualquier canal y te responderemos en menos de 24 horas.',
    contact_email_title: 'Email',
    contact_wsp_title: 'WhatsApp',
    contact_ig_title: 'Instagram',
    contact_fb_title: 'Facebook',
    contact_info_title: 'Información de Contacto',
    contact_form_title: 'Envíanos un mensaje',
    contact_form_subtitle: 'Responderemos en menos de 24 horas.',
    contact_form_name: 'Nombre',
    contact_form_name_placeholder: 'Tu nombre completo',
    contact_form_email: 'Email',
    contact_form_email_placeholder: 'tu@email.com',
    contact_form_message: 'Mensaje',
    contact_form_message_placeholder: 'Cuéntanos sobre tu proyecto o consulta...',
    contact_form_submit: 'Enviar Mensaje',
    contact_form_success_title: '¡Mensaje enviado!',
    contact_form_success_desc: 'Te responderemos lo antes posible.',
    contact_form_send_another: 'Enviar otro mensaje',

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
    hero_title_highlights: 'Drives Business,Converts Visitors,Scales Your Brand',
    hero_subtitle: 'High-end web development, scalable SaaS solutions, and digital experiences that turn visitors into customers.',
    hero_cta_primary: 'Get a Quote',
    hero_cta_secondary: 'View Portfolio',
    hero_cta_briefing: 'Complete Questionnaire',
    hero_payment_note: '50% upfront · 50% on delivery',

    // Portfolio
    portfolio_tag: 'Our Work',
    portfolio_title: 'Projects That Trust Us',
    portfolio_subtitle: 'Each project reflects our dedication to detail, performance, and the trust of those who choose us.',
    portfolio_trust_badge: '8 satisfied clients and counting',
    portfolio_1_desc: 'Professional landing for a podiatry clinic — clean design, optimized for conversion.',
    portfolio_2_desc: 'Website for a clinical podiatrist in Ñuñoa — trust-focused design with easy contact.',
    portfolio_3_desc: 'Artisan flower shop online store — curated visual experience and direct orders.',
    portfolio_4_desc: 'Modern landing demo for a sports brand — bold and dynamic design.',
    portfolio_5_desc: 'Landing demo for a Japanese restaurant — elegant aesthetic and interactive menu.',
    portfolio_6_desc: 'Corporate website for agro-industrial solutions — clear and professional information.',
    portfolio_7_desc: 'SaaS satisfaction survey platform — dashboards and real-time analytics.',
    portfolio_8_desc: 'Premium catering landing demo — event planning and elegance in every detail.',

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
    svc_feat_1_1: 'Next.js / React / TypeScript',
    svc_feat_1_2: 'Tailwind CSS + Framer Motion',
    svc_feat_1_3: 'Mobile-First & Responsive',
    svc_feat_1_4: '90+ Lighthouse Performance',
    svc_feat_1_5: 'Custom UI/UX Design',
    svc_feat_1_6: 'SEO Optimized from Day 1',
    svc_feat_2_1: 'SSL & 24/7 Security',
    svc_feat_2_2: '99.9% Uptime Guaranteed',
    svc_feat_2_3: 'Real-time Monitoring',
    svc_feat_2_4: 'Automatic CI/CD Deploy',
    svc_feat_2_5: 'Preventive Maintenance',
    svc_feat_2_6: 'Daily Backups',
    svc_feat_3_1: 'Scalable Cloud Architecture',
    svc_feat_3_2: 'REST & GraphQL API',
    svc_feat_3_3: 'PostgreSQL / MongoDB / Prisma',
    svc_feat_3_4: 'Multi-level Auth (OAuth2)',
    svc_feat_3_5: 'Dashboards & Analytics',
    svc_feat_3_6: 'Microservices & Webhooks',
    svc_stat_1: 'Lighthouse Score',
    svc_stat_2: 'Uptime',
    svc_stat_3: 'Scalability',
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
    pricing_cta_whatsapp: 'Quote on WhatsApp',
    pricing_payment_note: '50% upfront · 50% on delivery',
    pricing_custom_quote: 'Custom quote',

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
    plan_enterprise: 'Enterprise',
    plan_enterprise_desc: 'Tailored solution for complex operations, integrations, and enterprise-scale growth.',
    plan_enterprise_subtitle: 'Tailored',

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
    feature_enterprise_audit: 'Initial technical and strategic audit',
    feature_enterprise_architecture: 'Custom architecture for high-traffic systems',
    feature_enterprise_integrations: 'Advanced integrations with internal systems',
    feature_enterprise_sla: 'Specialized priority support',

    // CTA Banner
    cta_badge: "Let's Start",
    cta_title: 'Have a project in mind?',
    cta_subtitle: 'Tell us your idea and we\'ll deliver a custom quote with no strings attached.',
    cta_button: 'Get Free Quote',
    cta_stat_1_value: '10+',
    cta_stat_1_label: 'Projects delivered',
    cta_stat_2_value: '100%',
    cta_stat_2_label: 'Satisfied clients',
    cta_stat_3_value: '<15 days',
    cta_stat_3_label: 'Avg. delivery',
    cta_testimonial_text: 'From day one they understood what we needed. The result exceeded our expectations — the site loaded fast, customers started coming in, and the post-launch support was flawless.',
    cta_testimonial_name: 'Camila Rojas',
    cta_testimonial_role: 'Founder, Florería Wildgarden',
    cta_testimonial_initials: 'CR',

    // Trust strip
    trust_title: 'Companies that trust us',

    // FAQ
    faq_tag: 'FAQ',
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'We answer the most common questions about our web development services.',
    faq_q1: 'How much does it cost to build a website?',
    faq_a1: 'Our prices vary by project type. A Landing Page starts at ~$250 USD, a corporate website from ~$420 USD, and an e-commerce from ~$690 USD. All plans include free domain and hosting for 1 year. You can get a free quote through our form.',
    faq_q2: 'How long does it take to develop my website?',
    faq_a2: 'Timelines depend on project complexity. A Landing Page is delivered in 5-7 business days, a corporate site in 10-15 days, and an e-commerce in 15-25 days. SaaS projects are planned on a case-by-case basis.',
    faq_q3: 'What technologies do you use?',
    faq_a3: 'We work with the most modern technologies: Next.js, React, TypeScript, Tailwind CSS, Node.js, Prisma, and PostgreSQL. We deploy on Vercel and AWS for maximum performance and scalability.',
    faq_q4: 'Is hosting and domain included?',
    faq_a4: 'Yes, all our plans include a .cl or .com domain and free hosting for the first year. After the first year, we help you with renewal at competitive prices.',
    faq_q5: 'What is the work process like?',
    faq_a5: 'Our process has 4 stages: 1) Briefing where we gather your needs, 2) Design where we create mockups for your approval, 3) Development where we build your site, and 4) Delivery with training included. You always have direct communication with the team.',
    faq_q6: 'Do you offer maintenance after delivery?',
    faq_a6: 'Yes, all plans include technical support (3 to 6 months depending on the plan). We also offer monthly maintenance plans that include updates, backups, security monitoring, and minor changes.',
    faq_q7: 'Can I see examples of previous work?',
    faq_a7: 'Absolutely. You can see our full portfolio in the section above with real projects like BioImpacto, PodomedClinical, Florería Wildgarden, and ValoraLocal, among others.',

    // Contact
    contact_tag: "Let's Talk",
    contact_title: 'Ready to transform your digital presence?',
    contact_subtitle: 'Reach out on any channel and we\'ll respond within 24 hours.',
    contact_email_title: 'Email',
    contact_wsp_title: 'WhatsApp',
    contact_ig_title: 'Instagram',
    contact_fb_title: 'Facebook',
    contact_info_title: 'Contact Information',
    contact_form_title: 'Send us a message',
    contact_form_subtitle: 'We\'ll respond within 24 hours.',
    contact_form_name: 'Name',
    contact_form_name_placeholder: 'Your full name',
    contact_form_email: 'Email',
    contact_form_email_placeholder: 'you@email.com',
    contact_form_message: 'Message',
    contact_form_message_placeholder: 'Tell us about your project or inquiry...',
    contact_form_submit: 'Send Message',
    contact_form_success_title: 'Message sent!',
    contact_form_success_desc: 'We\'ll get back to you as soon as possible.',
    contact_form_send_another: 'Send another message',

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
