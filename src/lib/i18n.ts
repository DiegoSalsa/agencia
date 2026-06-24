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
    nav_dropdown_dev: 'Desarrollo y Software a Medida',
    nav_dropdown_maint: 'Mantenimiento y Soporte',
    nav_dropdown_web: 'Proyectos Web',
    nav_dropdown_saas: 'PuroCode Labs',
    nav_faq: 'FAQ',
    nav_cta: 'Cotiza tu Proyecto',

    // Hero
    hero_badge: 'Transformación Digital Premium',
    hero_title: 'Creamos Software que',
    hero_title_highlight: 'Impulsa Negocios',
    hero_title_highlights: 'Impulsa Negocios,Convierte Visitantes,Escala tu Marca',
    hero_subtitle: 'Desarrollo web de alta gama, soluciones SaaS escalables y experiencias digitales que convierten visitantes en clientes.',
    hero_cta_primary: 'Cotiza tu Proyecto',
    hero_cta_secondary: 'Ver Planes',
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
    portfolio_9_desc: 'Sistema de reservas y gestión para negocios con suscripciones y agendamiento online.',
    portfolio_10_desc: 'Web corporativa para Agencia Brújula — diseño moderno, profesional y enfocado en resultados.',
    portfolio_11_desc: 'Landing Page para Detecciones Adolfo Gonzales — diseño directo y optimizado para captar clientes.',
    portfolio_web_title: 'Páginas Webs',
    portfolio_saas_title: 'Plataformas SaaS',

    // Services
    services_tag: 'Experiencia',
    services_title: 'Soluciones digitales premium para',
    services_title_2: 'escalar marcas modernas.',
    service_1_title: 'Desarrollo Web Moderno',
    service_1_desc: 'Creamos interfaces de alto rendimiento y responsivas que entregan experiencias de usuario excepcionales. Enfocados en velocidad, accesibilidad y código limpio.',
    service_2_title: 'Mantenimiento',
    service_2_desc: 'Soporte dedicado 24/7, parches de seguridad y optimización continua de rendimiento.',
    service_ecom_title: 'E-commerce & Ventas',
    service_ecom_desc: 'Tiendas online optimizadas para convertir visitantes en clientes, integrando pagos locales, carritos veloces y gestión de stock.',
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
    svc_feat_ecom_1: 'Pasarelas de Pago locales',
    svc_feat_ecom_2: 'Gestión de Inventario avanzada',
    svc_feat_ecom_3: 'Recuperación de Carritos',
    svc_feat_ecom_4: 'Checkouts optimizados',
    svc_feat_ecom_5: 'Integración CRM/ERP',
    svc_feat_ecom_6: 'Seguridad PCI DSS',
    svc_stat_1: 'Lighthouse Score',
    svc_stat_2: 'Uptime',
    svc_stat_3: 'Escalabilidad',
    svc_stat_ecom: 'Ventas Incrementadas',
    learn_more: 'Saber más',
    explore: 'Explorar',

    // Process
    process_tag: 'Metodología Premium',
    process_title: 'Cómo Trabajamos',
    process_subtitle: 'Transformamos ideas complejas en productos digitales de clase mundial a través de un proceso ágil y transparente.',
    process_1_title: 'Descubrimiento & Estrategia',
    process_1_desc: 'Comenzamos con una inmersión profunda en tu modelo de negocio, auditando sistemas existentes y definiendo la arquitectura técnica necesaria para escalar.',
    process_1_deliverables: 'Arquitectura de Información, Requerimientos Técnicos, Presupuesto Detallado',
    process_1_tools: 'Notion, Miro, Zoom',
    
    process_2_title: 'Diseño UI/UX (Pixel Perfect)',
    process_2_desc: 'Creamos prototipos interactivos de alta fidelidad centrados en la retención del usuario final. No escribimos una línea de código sin tu aprobación visual total.',
    process_2_deliverables: 'Wireframes, Sistema de Diseño, Prototipo Navegable en Figma',
    process_2_tools: 'Figma, Adobe Creative Cloud',
    
    process_3_title: 'Desarrollo Frontend & Backend',
    process_3_desc: 'Implementamos la solución con arquitecturas modernas y escalables (Headless, Serverless). Trabajamos en Sprints con metodologías ágiles para asegurar entregas continuas.',
    process_3_deliverables: 'Base de Datos, Entorno de Staging (Pruebas)',
    process_3_tools: 'React/Next.js, Node.js, PostgreSQL, GitHub',
    
    process_4_title: 'Lanzamiento & Monitoreo (QA)',
    process_4_desc: 'Ejecutamos auditorías de seguridad, pruebas de carga y optimización SEO antes de salir a producción. Despliegue en infraestructuras cloud preparadas para alto tráfico.',
    process_4_deliverables: 'Pase a Producción, Documentación, Integración de Analytics',
    process_4_tools: 'Vercel, AWS, Google Analytics',

    // Stats
    stat_1_label: 'Proyectos Exitosos',
    stat_1_trend: '+12% este año',
    stat_2_label: 'Tiempo Entrega',
    stat_2_note: 'vs promedio industria',
    stat_3_label: 'Satisfacción',

    // Maintenance
    maint_tag: 'Soporte Continuo',
    maint_title: 'Mantenimiento Web',
    maint_subtitle: 'Asegura la estabilidad, seguridad y evolución de tus sistemas con nuestros planes de soporte técnico.',
    
    maint_plan_basic: 'Mantenimiento Básico',
    maint_plan_basic_desc: 'Ideal para webs informativas que necesitan seguridad y actualizaciones regulares.',
    maint_plan_basic_subtitle: 'Preventivo',
    maint_feature_basic_1: 'Actualizaciones de seguridad (CMS/Plugins)',
    maint_feature_basic_2: 'Respaldos semanales en la nube',
    maint_feature_basic_3: 'Monitoreo de Uptime 24/7',
    
    maint_plan_pro: 'Soporte Pro',
    maint_plan_pro_desc: 'Para e-commerce y webs corporativas activas que requieren cambios frecuentes y soporte rápido.',
    maint_plan_pro_subtitle: 'Reactivo + Evolutivo',
    maint_feature_pro_1: 'Todo lo del plan Básico',
    maint_feature_pro_2: 'Hasta 5 horas de desarrollo mensual',
    maint_feature_pro_3: 'Optimización de velocidad (Web Vitals)',
    
    maint_plan_adv: 'Plan Avanzado',
    maint_plan_adv_desc: 'Para negocios que necesitan un equipo externo constante. Desarrollo continuo, optimización extrema y prioridad alta.',
    maint_plan_adv_subtitle: 'Crecimiento Continuo',
    maint_feature_adv_1: 'Todo lo del plan Pro',
    maint_feature_adv_2: 'Hasta 12 horas de desarrollo mensual',
    maint_feature_adv_3: 'Estrategia SEO técnica & Performance',
    
    maint_plan_sla: 'SLA Enterprise',
    maint_plan_sla_desc: 'Soporte crítico para sistemas complejos y SaaS. Tiempos de respuesta garantizados por contrato.',
    maint_plan_sla_subtitle: 'Crítico',
    maint_feature_sla_1: 'Auditoría de seguridad trimestral',
    maint_feature_sla_2: 'Ingeniero dedicado y canal de Slack',
    maint_feature_sla_3: 'SLA: Respuesta menor a 2 horas',

    // Pricing
    pricing_tag: 'Inversión',
    pricing_title: 'Paquetes Base',
    pricing_subtitle: 'Proyectos a medida diseñados para escalar, estructurados con entregables claros y metodologías rigurosas.',
    pricing_from: 'Inversión Base Desde',
    pricing_contact: 'Consultoría Especializada',
    pricing_popular: 'Recomendado',
    pricing_cta: 'Agendar Evaluación',
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
    faq_q8: '¿Qué pasa si deseo finalizar el servicio?',
    faq_a8: 'Te facilitamos todo lo necesario para migrar tu contenido y base de datos a otro proveedor, asegurando que mantengas tu información a salvo.',
    faq_q9: '¿Qué pasa si mi negocio crece y necesito escalar la plataforma?',
    faq_a9: 'Nuestra arquitectura (basada en Next.js y React) es la misma que usan gigantes como Netflix o Twitch. Está diseñada para escalar. Podrás agregar funciones complejas en el futuro sin tener que reconstruir todo desde cero.',

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

    // Ecosistema Digital Page
    eco_page_title: 'Cuando una gran plataforma',
    eco_page_highlight: 'necesita una gran estrategia',
    eco_page_subtitle: 'En PuroCode construimos el motor de tu negocio digital. Para acelerar su crecimiento y maximizar su impacto, colaboramos con especialistas en marketing y conversión.',
    
    eco_sec1_tag: 'Nuestro Foco',
    eco_sec1_title: 'Qué hace PuroCode',
    eco_sec1_desc_1: 'Nos especializamos exclusivamente en ingeniería de software y ',
    eco_sec1_desc_link: 'desarrollo web de alta gama',
    eco_sec1_desc_2: '. Este es nuestro core business y donde aportamos el máximo valor.',
    eco_sec1_f1: 'Desarrollo Web Premium',
    eco_sec1_f2: 'E-commerce Escalables',
    eco_sec1_f3: 'Software a Medida',
    eco_sec1_f4: 'Plataformas SaaS',
    eco_sec1_f5: 'Optimización Técnica',

    eco_origin_tag: 'El Origen',
    eco_origin_title: 'El desarrollo web es solo el comienzo',
    eco_origin_desc: 'Nuestros clientes en Concepción, la Región del Biobío y todo Chile llegan buscando plataformas escalables, pero posteriormente necesitan tráfico, posicionamiento y crecimiento. Para ofrecer resultados reales sin perder nuestra especialización en ingeniería, complementamos nuestro trabajo con expertos en marketing digital.',

    eco_sec2_tag: 'Colaboración Horizontal',
    eco_sec2_title: 'Una gran plataforma necesita crecimiento',
    eco_sec2_desc: 'Desarrollar tecnología de alto rendimiento es el primer paso. Para que esa inversión retorne, se requiere una estrategia constante de atracción y conversión. En nuestro ecosistema, el desarrollo técnico y el marketing digital operan como fuerzas complementarias de igual importancia.',

    eco_sec3_title: 'Agencia Brújula',
    eco_sec3_desc_1: 'Expertos en estrategia digital y atracción de clientes. ',
    eco_sec3_desc_link: 'conoce la visión complementaria desde Agencia Brújula',
    eco_sec3_desc_2: '.',
    eco_sec3_f1: 'Marketing Digital Estratégico',
    eco_sec3_f2: 'Gestión de Redes Sociales',
    eco_sec3_f3: 'Creación de Contenido (Reels)',
    eco_sec3_f4: 'Publicidad Digital (Ads)',
    eco_sec3_f5: 'Estrategias de Crecimiento',
    eco_sec3_cta: 'Visitar Agencia Brújula',

    eco_sec4_tag: 'Proceso',
    eco_sec4_title: 'Cómo Trabajamos',
    eco_sec4_desc_1: 'Somos empresas independientes con un modelo de colaboración bidireccional. Puedes llegar a nosotros buscando ',
    eco_sec4_desc_link: 'desarrollo web y software',
    eco_sec4_desc_2: ' y apoyarte en Brújula para el crecimiento, o venir desde Brújula y contar con nosotros como tu partner tecnológico.',

    eco_sec5_tag: 'Ventajas',
    eco_sec5_title: 'Beneficios para el cliente',
    eco_sec5_b1_title: 'Gestión Centralizada',
    eco_sec5_b1_desc: 'Tu estrategia técnica y de marketing convergen sin fricciones, trabajando por un mismo objetivo.',
    eco_sec5_b2_title: 'Ejecución Acelerada',
    eco_sec5_b2_desc: 'Equipos que ya conocen sus procesos. Menos tiempo gestionando flujos y más tiempo viendo resultados.',
    eco_sec5_b3_title: 'Foco Absoluto',
    eco_sec5_b3_desc: 'Sin agencias "todoterreno". Tendrás a ingenieros construyendo tu plataforma y a marketers ejecutando tus campañas.',
    eco_sec5_b4_title: 'Estrategias Alineadas',
    eco_sec5_b4_desc: 'El desarrollo web técnico se sincroniza perfectamente con tus objetivos comerciales y publicitarios.',

    // EEAT Section
    eco_eeat_title: 'Especialización antes que improvisación',
    eco_eeat_desc: 'En el desarrollo de plataformas escalables no hay espacio para medias tintas. PuroCode se enfoca 100% en ingeniería y tecnología. Agencia Brújula se enfoca 100% en rendimiento y marketing. Cada empresa mantiene su independencia operativa, pero la colaboración constante entre ambos equipos nos permite entregar mejores resultados sin perder la calidad premium que exige el mercado.',

    // Editorial SEO Section
    eco_seo_title: 'Desarrollo Web y Marketing Digital: una combinación estratégica',
    eco_seo_p1: 'Una empresa moderna necesita mucho más que un simple sitio web. En un mercado altamente competitivo, una presencia online exitosa comienza con una base técnica sólida. Es aquí donde la ingeniería de software se encuentra con el crecimiento empresarial. Contar con un producto digital de alta calidad es indispensable, pero sin una estrategia que dirija tráfico hacia él, incluso el mejor código pierde su efectividad.',
    eco_seo_p2_1: 'La optimización de velocidad, la arquitectura técnica y una excelente experiencia de usuario (UX) son fundamentales. Nuestro servicio de ',
    eco_seo_link_1: 'desarrollo web en Concepción',
    eco_seo_p2_2: ' y todo Chile asegura que la plataforma cumpla con los estándares más estrictos de Lighthouse. Sin embargo, el marketing digital es el motor que atrae tráfico cualificado, permitiendo que esta plataforma alcance su verdadero potencial de conversión.',
    eco_seo_p3_1: 'Para proyectos más complejos, el ',
    eco_seo_link_2: 'desarrollo de software a medida',
    eco_seo_p3_2: ' se vuelve esencial. Desde CRMs personalizados hasta integraciones empresariales complejas, la tecnología debe adaptarse a los procesos del negocio. Pero cuando esta tecnología está expuesta al mercado, requiere estrategias de publicidad digital y gestión de redes sociales que alimenten su embudo de ventas. En PuroCode nos encargamos de que la tecnología funcione impecablemente, y Agencia Brújula se encarga de posicionarla frente a la audiencia correcta.',
    eco_seo_p4_1: 'Esta sinergia es vital para e-commerce y plataformas SaaS. Al integrar el ',
    eco_seo_link_3: 'desarrollo de aplicaciones web',
    eco_seo_p4_2: ' con estrategias avanzadas de posicionamiento web (SEO) y posicionamiento de marca, creamos ecosistemas que no solo retienen usuarios mediante una UX superior, sino que atraen constantemente nuevos clientes. La transformación digital profunda requiere de este nivel de especialización dual.',

    // FAQ Section
    eco_faq_title: 'Preguntas Frecuentes',
    eco_faq_q1: '¿Por qué una empresa necesita desarrollo web y marketing digital?',
    eco_faq_a1: 'El desarrollo web construye la infraestructura técnica y la experiencia del usuario de tu negocio digital. El marketing digital atrae a los usuarios hacia esa plataforma. Ninguno alcanza su máximo potencial por sí solo: una web excelente sin tráfico no genera ventas, y el tráfico dirigido a una web lenta o confusa resulta en un desperdicio del presupuesto publicitario.',
    eco_faq_q2: '¿Qué diferencia existe entre una página web y una estrategia digital?',
    eco_faq_a2: 'Una página web es un activo digital, como un local comercial. Una estrategia digital integral incluye no solo la construcción de la web, sino también el SEO, la publicidad, el contenido en redes sociales y la optimización de tasas de conversión para asegurar que el negocio crezca sistemáticamente.',
    eco_faq_q3: '¿Qué beneficios tiene combinar desarrollo web con publicidad digital?',
    eco_faq_a3: 'Permite reducir los costos de adquisición de clientes (CAC). Una web rápida, accesible y técnicamente optimizada recibe mejores puntuaciones de calidad en plataformas como Google Ads o Meta Ads, lo que disminuye el costo por clic y mejora el posicionamiento orgánico, maximizando la rentabilidad de las campañas publicitarias.',
    eco_faq_q4: '¿Cuándo una empresa necesita software a medida?',
    eco_faq_a4: 'Una empresa debe invertir en software a medida cuando las plataformas estándar (como plantillas de WordPress o Shopify) ya no pueden soportar sus flujos de trabajo únicos, cuando requieren integraciones complejas con sistemas internos (ERPs, inventarios) o cuando el volumen de tráfico exige una arquitectura escalable dedicada.',
    eco_faq_q5: '¿Cómo ayuda el SEO a captar clientes?',
    eco_faq_a5: 'El SEO (posicionamiento en buscadores) aumenta la visibilidad de tu negocio cuando potenciales clientes buscan activamente tus servicios. A través de optimización técnica, código semántico y velocidad de carga excepcional, aseguramos que los motores de búsqueda prioricen tu sitio, generando un flujo constante de clientes cualificados a largo plazo.',

    eco_cta_title: '¿Necesitas desarrollo web, marketing digital o ambas cosas?',
    eco_cta_desc: 'Cuéntanos tu proyecto y te ayudaremos a encontrar la mejor estrategia para hacerlo crecer.',
    eco_cta_primary: 'Cotiza tu proyecto',
    eco_cta_secondary: 'Conocer Agencia Brújula',

    cta_eco_question: '¿Necesitas apoyo en marketing digital?',
    cta_eco_desc: 'Conoce nuestro ecosistema de partners estratégicos.',
    cta_eco_button: 'Ver Ecosistema Digital',

    // Language selector
    lang_select: 'Idioma',
    currency_select: 'Moneda',
  },
  en: {
    // Header
    nav_portfolio: 'Portfolio',
    nav_services: 'Services',
    nav_contact: 'Contact',
    nav_pricing: 'Pricing',
    nav_dropdown_dev: 'Custom Software & Web Development',
    nav_dropdown_maint: 'Maintenance & Support',
    nav_dropdown_web: 'Web Projects',
    nav_dropdown_saas: 'PuroCode Labs',
    nav_faq: 'FAQ',
    nav_cta: 'Get a Quote',

    // Hero
    hero_badge: 'Premium Digital Transformation',
    hero_title: 'We Create Software that',
    hero_title_highlight: 'Drives Business',
    hero_title_highlights: 'Drives Business,Converts Visitors,Scales Your Brand',
    hero_subtitle: 'High-end web development, scalable SaaS solutions, and digital experiences that turn visitors into customers.',
    hero_cta_primary: 'Get a Quote',
    hero_cta_secondary: 'View Plans',
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
    portfolio_9_desc: 'Booking and management system for businesses with subscriptions and online scheduling.',
    portfolio_10_desc: 'Corporate website for Agencia Brújula — modern, professional design focused on results.',
    portfolio_11_desc: 'Landing Page for Detecciones Adolfo Gonzales — straightforward design optimized for client acquisition.',
    portfolio_web_title: 'Websites',
    portfolio_saas_title: 'SaaS Platforms',

    // Services
    services_tag: 'Experience',
    services_title: 'Premium digital solutions to',
    services_title_2: 'scale modern brands.',
    service_1_title: 'Modern Web Development',
    service_1_desc: 'We create high-performance, responsive interfaces that deliver exceptional user experiences. Focused on speed, accessibility, and clean code.',
    service_2_title: 'Maintenance',
    service_2_desc: 'Dedicated 24/7 support, security patches, and continuous performance optimization.',
    service_ecom_title: 'E-commerce & Sales',
    service_ecom_desc: 'Online stores optimized to convert visitors into customers, integrating local payments, fast carts, and stock management.',
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
    svc_feat_ecom_1: 'Local Payment Gateways',
    svc_feat_ecom_2: 'Advanced Inventory Management',
    svc_feat_ecom_3: 'Cart Recovery',
    svc_feat_ecom_4: 'Optimized Checkouts',
    svc_feat_ecom_5: 'CRM/ERP Integration',
    svc_feat_ecom_6: 'PCI DSS Security',
    svc_stat_1: 'Lighthouse Score',
    svc_stat_2: 'Uptime',
    svc_stat_3: 'Scalability',
    svc_stat_ecom: 'Increased Sales',
    learn_more: 'Learn more',
    explore: 'Explore',

    // Process
    process_tag: 'Premium Methodology',
    process_title: 'How We Work',
    process_subtitle: 'We transform complex ideas into world-class digital products through an agile and transparent process.',
    process_1_title: 'Discovery & Strategy',
    process_1_desc: 'We start with a deep dive into your business model, auditing existing systems and defining the technical architecture needed to scale.',
    process_1_deliverables: 'Information Architecture, Technical Requirements, Detailed Budget',
    process_1_tools: 'Notion, Miro, Zoom',
    process_2_title: 'UI/UX Design (Pixel Perfect)',
    process_2_desc: 'We create high-fidelity interactive prototypes focused on end-user retention. We don\'t write a single line of code without your full visual approval.',
    process_2_deliverables: 'Wireframes, Design System, Navigable Prototype in Figma',
    process_2_tools: 'Figma, Adobe Creative Cloud',
    process_3_title: 'Frontend & Backend Development',
    process_3_desc: 'We implement the solution with modern and scalable architectures (Headless, Serverless). We work in Sprints with agile methodologies to ensure continuous delivery.',
    process_3_deliverables: 'Database, Staging Environment',
    process_3_tools: 'React/Next.js, Node.js, PostgreSQL, GitHub',
    process_4_title: 'Launch & Monitoring (QA)',
    process_4_desc: 'We execute security audits, load testing, and SEO optimization before going to production. Deployment on cloud infrastructures prepared for high traffic.',
    process_4_deliverables: 'Production Deployment, Documentation, Analytics Integration',
    process_4_tools: 'Vercel, AWS, Google Analytics',

    // Stats
    stat_1_label: 'Successful Projects',
    stat_1_trend: '+12% this year',
    stat_2_label: 'Delivery Time',
    stat_2_note: 'vs industry average',
    stat_3_label: 'Satisfaction',

    // Maintenance
    maint_tag: 'Continuous Support',
    maint_title: 'Web Maintenance',
    maint_subtitle: 'Ensure the stability, security, and evolution of your systems with our technical support plans.',
    
    maint_plan_basic: 'Basic Maintenance',
    maint_plan_basic_desc: 'Ideal for informative websites that need regular security updates.',
    maint_plan_basic_subtitle: 'Preventive',
    maint_feature_basic_1: 'Security updates (CMS/Plugins)',
    maint_feature_basic_2: 'Weekly cloud backups',
    maint_feature_basic_3: '24/7 Uptime monitoring',
    
    maint_plan_pro: 'Pro Support',
    maint_plan_pro_desc: 'For active e-commerce and corporate sites requiring frequent changes and fast support.',
    maint_plan_pro_subtitle: 'Reactive + Evolutive',
    maint_feature_pro_1: 'Everything in Basic',
    maint_feature_pro_2: 'Up to 5 hours of monthly development',
    maint_feature_pro_3: 'Speed optimization (Core Web Vitals)',
    
    maint_plan_adv: 'Advanced Plan',
    maint_plan_adv_desc: 'For businesses needing a constant external team. Continuous development, extreme optimization, and high priority.',
    maint_plan_adv_subtitle: 'Continuous Growth',
    maint_feature_adv_1: 'Everything in Pro plan',
    maint_feature_adv_2: 'Up to 12 hours of monthly development',
    maint_feature_adv_3: 'Technical SEO & Performance Strategy',
    
    maint_plan_sla: 'SLA Enterprise',
    maint_plan_sla_desc: 'Critical support for complex systems and SaaS. Guaranteed response times by contract.',
    maint_plan_sla_subtitle: 'Mission Critical',
    maint_feature_sla_1: 'Quarterly security audit',
    maint_feature_sla_2: 'Dedicated engineer & Slack channel',
    maint_feature_sla_3: 'SLA: Response under 2 hours',

    // Pricing
    pricing_tag: 'Investment',
    pricing_title: 'Base Packages',
    pricing_subtitle: 'Custom projects designed to scale, structured with clear deliverables and rigorous methodologies.',
    pricing_from: 'Base Investment From',
    pricing_contact: 'Specialized Consulting',
    pricing_popular: 'Recommended',
    pricing_cta: 'Schedule Evaluation',
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
    faq_q8: 'What happens if I want to cancel the service?',
    faq_a8: 'We provide you with everything necessary to migrate your content and database to another provider, ensuring you keep your data safe.',
    faq_q9: 'What if my business grows and I need to scale the platform?',
    faq_a9: 'Our architecture (based on Next.js and React) is the same used by giants like Netflix or Twitch. It is designed to scale. You can add complex features in the future without having to rebuild everything from scratch.',

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

    // Ecosistema Digital Page
    eco_page_title: 'When a great platform',
    eco_page_highlight: 'needs a great strategy',
    eco_page_subtitle: 'At PuroCode we build the engine of your digital business. To accelerate its growth and maximize its impact, we collaborate with specialists in marketing and conversion.',
    
    eco_sec1_tag: 'Our Focus',
    eco_sec1_title: 'What PuroCode Does',
    eco_sec1_desc_1: 'We specialize exclusively in software engineering and ',
    eco_sec1_desc_link: 'high-end web development',
    eco_sec1_desc_2: '. This is our core business and where we provide maximum value.',
    eco_sec1_f1: 'Premium Web Development',
    eco_sec1_f2: 'Scalable E-commerce',
    eco_sec1_f3: 'Custom Software',
    eco_sec1_f4: 'SaaS Platforms',
    eco_sec1_f5: 'Technical Optimization',

    eco_origin_tag: 'The Origin',
    eco_origin_title: 'Web development is just the beginning',
    eco_origin_desc: 'Our clients in Concepción, the Biobío Region, and throughout Chile come to us looking for scalable platforms, but soon they need traffic, positioning, and growth. To deliver real results without losing our engineering focus, we complement our work with digital marketing experts.',

    eco_sec2_tag: 'Horizontal Collaboration',
    eco_sec2_title: 'A great platform needs growth',
    eco_sec2_desc: 'Developing high-performance technology is the first step. To get a return on that investment, a constant attraction and conversion strategy is required. In our ecosystem, technical development and digital marketing operate as complementary forces of equal importance.',

    eco_sec3_title: 'Agencia Brújula',
    eco_sec3_desc_1: 'Experts in digital strategy and customer acquisition. ',
    eco_sec3_desc_link: 'discover the complementary vision from Agencia Brújula',
    eco_sec3_desc_2: '.',
    eco_sec3_f1: 'Strategic Digital Marketing',
    eco_sec3_f2: 'Social Media Management',
    eco_sec3_f3: 'Content Creation (Reels)',
    eco_sec3_f4: 'Digital Advertising (Ads)',
    eco_sec3_f5: 'Growth Strategies',
    eco_sec3_cta: 'Visit Agencia Brújula',

    eco_sec4_tag: 'Process',
    eco_sec4_title: 'How We Work',
    eco_sec4_desc_1: 'We are independent companies with a bidirectional collaboration model. You can come to us for ',
    eco_sec4_desc_link: 'web and software development',
    eco_sec4_desc_2: ' and rely on Brújula for growth, or start with Brújula and count on us as your technological partner.',

    eco_sec5_tag: 'Advantages',
    eco_sec5_title: 'Benefits for the client',
    eco_sec5_b1_title: 'Centralized Management',
    eco_sec5_b1_desc: 'Your technical and marketing strategies converge without friction, working towards the same goal.',
    eco_sec5_b2_title: 'Accelerated Execution',
    eco_sec5_b2_desc: 'Teams that already know their processes. Less time managing flows and more time seeing results.',
    eco_sec5_b3_title: 'Absolute Focus',
    eco_sec5_b3_desc: 'No "jack-of-all-trades" agencies. You will have engineers building your platform and marketers executing your campaigns.',
    eco_sec5_b4_title: 'Aligned Strategies',
    eco_sec5_b4_desc: 'Technical web development syncs perfectly with your commercial and advertising goals.',

    eco_eeat_title: 'Specialization before improvisation',
    eco_eeat_desc: 'In the development of scalable platforms, there is no room for half measures. PuroCode focuses 100% on engineering and technology. Agencia Brújula focuses 100% on performance and marketing. Each company maintains its operational independence, but constant collaboration between both teams allows us to deliver better results without losing the premium quality the market demands.',

    eco_seo_title: 'Web Development and Digital Marketing: a strategic combination',
    eco_seo_p1: 'A modern company needs much more than just a website. In a highly competitive market, a successful online presence starts with a solid technical foundation. This is where software engineering meets business growth. Having a high-quality digital product is essential, but without a strategy to drive traffic to it, even the best code loses its effectiveness.',
    eco_seo_p2_1: 'Speed optimization, technical architecture, and excellent user experience (UX) are fundamental. Our ',
    eco_seo_link_1: 'web development in Concepción',
    eco_seo_p2_2: ' and throughout Chile ensures the platform meets the strictest Lighthouse standards. However, digital marketing is the engine that attracts qualified traffic, allowing this platform to reach its true conversion potential.',
    eco_seo_p3_1: 'For more complex projects, ',
    eco_seo_link_2: 'custom software development',
    eco_seo_p3_2: ' becomes essential. From custom CRMs to complex enterprise integrations, technology must adapt to business processes. But when this technology faces the market, it requires digital advertising and social media management strategies to feed its sales funnel. At PuroCode we ensure the technology works flawlessly, and Agencia Brújula positions it in front of the right audience.',
    eco_seo_p4_1: 'This synergy is vital for e-commerce and SaaS platforms. By integrating ',
    eco_seo_link_3: 'web application development',
    eco_seo_p4_2: ' with advanced SEO and brand positioning strategies, we create ecosystems that not only retain users through superior UX but also constantly attract new customers. Deep digital transformation requires this level of dual specialization.',

    eco_faq_title: 'Frequently Asked Questions',
    eco_faq_q1: 'Why does a company need web development and digital marketing?',
    eco_faq_a1: 'Web development builds the technical infrastructure and user experience of your digital business. Digital marketing attracts users to that platform. Neither reaches its maximum potential alone: an excellent website without traffic generates no sales, and traffic directed to a slow or confusing website wastes advertising budget.',
    eco_faq_q2: 'What is the difference between a website and a digital strategy?',
    eco_faq_a2: 'A website is a digital asset, like a storefront. A comprehensive digital strategy includes not only building the website but also SEO, advertising, social media content, and conversion rate optimization to ensure the business grows systematically.',
    eco_faq_q3: 'What are the benefits of combining web development with digital advertising?',
    eco_faq_a3: 'It lowers customer acquisition costs (CAC). A fast, accessible, and technically optimized website receives better quality scores on platforms like Google Ads or Meta Ads, which lowers cost-per-click and improves organic positioning, maximizing ad campaign ROI.',
    eco_faq_q4: 'When does a company need custom software?',
    eco_faq_a4: 'A company should invest in custom software when standard platforms (like WordPress templates or Shopify) can no longer support their unique workflows, when they require complex integrations with internal systems (ERPs, inventory), or when traffic volume demands a dedicated scalable architecture.',
    eco_faq_q5: 'How does SEO help attract customers?',
    eco_faq_a5: 'SEO (Search Engine Optimization) increases your business visibility when potential clients actively search for your services. Through technical optimization, semantic code, and exceptional load speeds, we ensure search engines prioritize your site, generating a steady stream of qualified leads over the long term.',

    eco_cta_title: 'Do you need web development, digital marketing, or both?',
    eco_cta_desc: 'Tell us about your project and we will help you find the best strategy to make it grow.',
    eco_cta_primary: 'Quote your project',
    eco_cta_secondary: 'Meet Agencia Brújula',

    cta_eco_question: 'Need digital marketing support?',
    cta_eco_desc: 'Discover our ecosystem of strategic partners.',
    cta_eco_button: 'View Digital Ecosystem',

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
