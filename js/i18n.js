/* ========================================
   Sistema de Internacionalización (i18n)
   Detección de país, moneda e idioma
   ======================================== */

// Configuración de monedas por región
const CURRENCY_CONFIG = {
    CLP: { symbol: '$', name: 'CLP', rate: 1, decimals: 0, format: 'es-CL' },
    USD: { symbol: '$', name: 'USD', rate: 0.0011, decimals: 0, format: 'en-US' },
    EUR: { symbol: '€', name: 'EUR', rate: 0.0010, decimals: 0, format: 'de-DE' },
    MXN: { symbol: '$', name: 'MXN', rate: 0.019, decimals: 0, format: 'es-MX' },
    ARS: { symbol: '$', name: 'ARS', rate: 0.97, decimals: 0, format: 'es-AR' },
    COP: { symbol: '$', name: 'COP', rate: 4.5, decimals: 0, format: 'es-CO' },
    PEN: { symbol: 'S/', name: 'PEN', rate: 0.0041, decimals: 0, format: 'es-PE' },
    BRL: { symbol: 'R$', name: 'BRL', rate: 0.0055, decimals: 0, format: 'pt-BR' }
};

// Mapeo de países a monedas
const COUNTRY_CURRENCY = {
    CL: 'CLP', US: 'USD', CA: 'USD', GB: 'EUR', DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR',
    MX: 'MXN', AR: 'ARS', CO: 'COP', PE: 'PEN', BR: 'BRL',
    EC: 'USD', PA: 'USD', SV: 'USD', // Países dolarizados
    UY: 'USD', PY: 'USD', BO: 'USD', VE: 'USD', CR: 'USD', GT: 'USD', HN: 'USD', NI: 'USD'
};

// Mapeo de países a idiomas
const COUNTRY_LANG = {
    US: 'en', CA: 'en', GB: 'en', AU: 'en', NZ: 'en', IE: 'en',
    // El resto es español por defecto
};

// Traducciones
const TRANSLATIONS = {
    es: {
        // Header
        nav_portfolio: 'Portafolio',
        nav_services: 'Servicios',
        nav_pricing: 'Precios',
        nav_contact: 'Contacto',
        nav_cta: 'Comenzar Proyecto',
        
        // Hero
        hero_badge: 'Transformacion Digital Premium',
        hero_title: 'Creamos Software que',
        hero_title_highlight: 'Impulsa Negocios',
        hero_subtitle: 'Desarrollo web de alta gama, soluciones SaaS escalables y experiencias digitales que convierten visitantes en clientes.',
        hero_cta_primary: 'Ver Proyectos',
        hero_cta_secondary: 'Cotizar Ahora',
        
        // Tech Stack
        tech_title: 'Nuestro Ecosistema Tecnologico',
        tech_1_title: 'Stack Moderno',
        tech_1_desc: 'React, Next.js y TypeScript para interfaces fluidas y rapidas.',
        tech_2_title: 'Cloud Native',
        tech_2_desc: 'AWS & Vercel: infraestructuras escalables y optimizadas.',
        tech_3_title: 'Data & AI',
        tech_3_desc: 'Integracion de inteligencia artificial y analisis de datos.',
        tech_4_title: 'Seguridad Primero',
        tech_4_desc: 'Arquitecturas blindadas con los mas altos estandares.',
        
        // Portfolio
        portfolio_webs_title: 'Nuestras Webs',
        portfolio_webs_subtitle: 'Experiencias digitales que convierten y cautivan.',
        portfolio_saas_title: 'Soluciones SaaS',
        portfolio_saas_subtitle: 'Software robusto disenado para escalar sin limites.',
        
        // Services
        services_tag: 'Experiencia',
        services_title: 'Soluciones digitales premium para',
        services_title_2: 'escalar marcas modernas.',
        service_1_title: 'Desarrollo Web Moderno',
        service_1_desc: 'Creamos interfaces de alto rendimiento y responsivas que entregan experiencias de usuario excepcionales. Enfocados en velocidad, accesibilidad y codigo limpio.',
        service_2_title: 'Mantenimiento',
        service_2_desc: 'Soporte dedicado 24/7, parches de seguridad y optimizacion continua de rendimiento.',
        service_3_title: 'Soluciones SaaS',
        service_3_desc: 'Arquitecturas multi-inquilino escalables disenadas para un crecimiento rapido. Manejamos la complejidad tecnica para que usted se enfoque en su hoja de ruta.',
        learn_more: 'Saber mas',
        explore: 'Explorar',
        
        // Process
        process_tag: 'Metodologia Premium',
        process_title: 'Como Trabajamos',
        process_subtitle: 'Transformamos ideas complejas en productos digitales de clase mundial a traves de un proceso agil y transparente.',
        process_1_title: 'Descubrimiento',
        process_1_desc: 'Iniciamos con reuniones estrategicas para entender tu vision y definir objetivos.',
        process_2_title: 'Diseno & UX',
        process_2_desc: 'Creamos prototipos de alta fidelidad centrados en el usuario final.',
        process_3_title: 'Desarrollo',
        process_3_desc: 'Implementamos con arquitecturas escalables y codigo limpio bajo metodologia Agile.',
        process_4_title: 'Lanzamiento',
        process_4_desc: 'Deploy optimizado con monitoreo continuo y soporte post-lanzamiento.',
        
        // Stats
        stat_1_label: 'Proyectos Exitosos',
        stat_1_trend: '+12% este ano',
        stat_2_label: 'Tiempo Entrega',
        stat_2_note: 'vs promedio industria',
        stat_3_label: 'Satisfaccion',
        
        // Pricing
        pricing_badge: 'Oferta por Tiempo Limitado',
        pricing_title: 'Planes y Precios',
        pricing_subtitle: 'Soluciones digitales de alto impacto disenadas para escalar tu negocio.',
        pricing_from: 'Desde',
        pricing_contact: 'Contactar',
        pricing_popular: 'Mas Popular',
        
        // Plan names
        plan_landing: 'Landing Page',
        plan_landing_desc: 'Ideal para lanzamientos y campanas de marketing.',
        plan_corp: 'Web Corporativa',
        plan_corp_desc: 'Presencia profesional con multiples secciones.',
        plan_ecommerce: 'E-commerce',
        plan_ecommerce_desc: 'Tienda online completa con pagos y gestion.',
        
        // Features
        feature_hosting: 'Dominio y Hosting GRATIS 1 ano',
        feature_responsive: 'Diseno Responsivo UX/UI',
        feature_seo: 'Optimizacion SEO Base',
        feature_form: 'Formulario de Contacto',
        feature_sections: 'Hasta 5 Secciones Personalizadas',
        feature_social: 'Integracion Redes Sociales',
        feature_support: 'Soporte Tecnico 3 Meses',
        feature_payments: 'Pasarela de Pagos (Webpay/Flow)',
        feature_admin: 'Panel de Administracion',
        feature_inventory: 'Gestion de Inventario',
        feature_support_6: 'Soporte Tecnico 6 Meses',
        
        // Quoter
        quoter_title: 'Cotizador Instantaneo',
        quoter_subtitle: 'Calcula el precio de tu proyecto en segundos',
        quoter_project_type: 'Tipo de Proyecto',
        quoter_sections: 'Secciones Adicionales',
        quoter_extras: 'Funcionalidades Extra',
        quoter_summary: 'Resumen',
        quoter_base: 'Proyecto base:',
        quoter_sections_cost: 'Secciones adicionales:',
        quoter_extras_cost: 'Funcionalidades extra:',
        quoter_total: 'Total Estimado',
        quoter_cta: 'Solicitar Cotizacion Formal',
        quoter_note: 'Precio referencial. El valor final puede variar segun requerimientos especificos.',
        
        // Extras
        extra_blog: 'Blog / Noticias',
        extra_chat: 'Chat en Vivo / WhatsApp',
        extra_booking: 'Sistema de Reservas',
        extra_multilang: 'Multi-idioma',
        extra_admin_pro: 'Panel Administrador Pro',
        extra_cms: 'Gestor de Contenido',
        
        // Contact
        contact_tag: 'Conversemos',
        contact_title: 'Construyamos algo increible',
        contact_name: 'Nombre completo',
        contact_email: 'Email',
        contact_message: 'Cuentanos sobre tu proyecto...',
        contact_send: 'Enviar Mensaje',
        
        // Footer
        footer_desc: 'Ingenieria de software de alta gama para visionarios. Transformamos desafios complejos en soluciones elegantes.',
        footer_services: 'Plataforma',
        footer_company: 'Compania',
        footer_rights: 'Todos los derechos reservados.',
        
        // Contact
        contact_tag: 'Conversemos',
        contact_title: '¿Listo para transformar tu presencia digital?',
        contact_subtitle: 'Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.',
        contact_name: 'Nombre completo',
        contact_email: 'Email',
        contact_phone: 'Teléfono (opcional)',
        contact_message: 'Cuéntanos sobre tu proyecto...',
        contact_send: 'Enviar Mensaje',
        contact_info_title: 'Información de Contacto',
        contact_response: 'Respuesta en menos de 24h',
        contact_schedule: 'Agenda una llamada',
        
        // Footer
        footer_desc: 'Transformamos ideas en productos digitales de clase mundial.',
        footer_services: 'Servicios',
        footer_company: 'Empresa',
        footer_contact: 'Contacto',
        footer_rights: 'Todos los derechos reservados.',
        
        // Language selector
        lang_select: 'Idioma',
        currency_select: 'Moneda'
    },
    en: {
        // Header
        nav_portfolio: 'Portfolio',
        nav_services: 'Services',
        nav_pricing: 'Pricing',
        nav_contact: 'Contact',
        nav_cta: 'Start Project',
        
        // Hero
        hero_badge: 'Premium Digital Transformation',
        hero_title: 'We Create Software that',
        hero_title_highlight: 'Drives Business',
        hero_subtitle: 'High-end web development, scalable SaaS solutions, and digital experiences that turn visitors into customers.',
        hero_cta_primary: 'View Projects',
        hero_cta_secondary: 'Get a Quote',
        
        // Tech Stack
        tech_title: 'Our Technology Ecosystem',
        tech_1_title: 'Modern Stack',
        tech_1_desc: 'React, Next.js and TypeScript for fluid and fast interfaces.',
        tech_2_title: 'Cloud Native',
        tech_2_desc: 'AWS & Vercel: scalable and optimized infrastructures.',
        tech_3_title: 'Data & AI',
        tech_3_desc: 'Artificial intelligence integration and data analytics.',
        tech_4_title: 'Security First',
        tech_4_desc: 'Armored architectures with the highest standards.',
        
        // Portfolio
        portfolio_webs_title: 'Our Websites',
        portfolio_webs_subtitle: 'Digital experiences that convert and captivate.',
        portfolio_saas_title: 'SaaS Solutions',
        portfolio_saas_subtitle: 'Robust software designed to scale without limits.',
        
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
        pricing_badge: 'Limited Time Offer',
        pricing_title: 'Plans & Pricing',
        pricing_subtitle: 'High-impact digital solutions designed to scale your business.',
        pricing_from: 'From',
        pricing_contact: 'Contact Us',
        pricing_popular: 'Most Popular',
        
        // Plan names
        plan_landing: 'Landing Page',
        plan_landing_desc: 'Ideal for launches and marketing campaigns.',
        plan_corp: 'Corporate Website',
        plan_corp_desc: 'Professional presence with multiple sections.',
        plan_ecommerce: 'E-commerce',
        plan_ecommerce_desc: 'Complete online store with payments and management.',
        
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
        
        // Quoter
        quoter_title: 'Instant Quote Calculator',
        quoter_subtitle: 'Calculate your project price in seconds',
        quoter_project_type: 'Project Type',
        quoter_sections: 'Additional Sections',
        quoter_extras: 'Extra Features',
        quoter_summary: 'Summary',
        quoter_base: 'Base project:',
        quoter_sections_cost: 'Additional sections:',
        quoter_extras_cost: 'Extra features:',
        quoter_total: 'Estimated Total',
        quoter_cta: 'Request Formal Quote',
        quoter_note: 'Reference price. Final value may vary according to specific requirements.',
        
        // Extras
        extra_blog: 'Blog / News',
        extra_chat: 'Live Chat / WhatsApp',
        extra_booking: 'Booking System',
        extra_multilang: 'Multi-language',
        extra_admin_pro: 'Pro Admin Panel',
        extra_cms: 'Content Manager',
        
        // Contact
        contact_tag: "Let's Talk",
        contact_title: 'Build Something Amazing Together',
        contact_name: 'Full name',
        contact_email: 'Email',
        contact_message: 'Tell us about your project...',
        contact_send: 'Send Message',
        
        // Footer
        footer_desc: 'High-end software engineering for visionaries. We transform complex challenges into elegant solutions.',
        footer_services: 'Platform',
        footer_company: 'Company',
        footer_rights: 'All rights reserved.',
        contact_info_title: 'Contact Information',
        contact_response: 'Response within 24h',
        contact_schedule: 'Schedule a call',
        
        // Language selector
        lang_select: 'Language',
        currency_select: 'Currency'
    }
};

// Precios base en CLP
const BASE_PRICES = {
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
        cms: 85000
    }
};

// Estado global
let currentLang = 'es';
let currentCurrency = 'CLP';
let userCountry = 'CL';

// Detectar país por IP
async function detectCountry() {
    try {
        // Usar API gratuita para detectar país
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        userCountry = data.country_code || 'CL';
        
        // Establecer moneda e idioma según país
        currentCurrency = COUNTRY_CURRENCY[userCountry] || 'USD';
        currentLang = COUNTRY_LANG[userCountry] || 'es';
        
        // Guardar en localStorage
        if (!localStorage.getItem('userCurrency')) {
            localStorage.setItem('userCurrency', currentCurrency);
        }
        if (!localStorage.getItem('userLang')) {
            localStorage.setItem('userLang', currentLang);
        }
        
        return { country: userCountry, currency: currentCurrency, lang: currentLang };
    } catch (error) {
        console.log('No se pudo detectar el país, usando valores por defecto');
        return { country: 'CL', currency: 'CLP', lang: 'es' };
    }
}

// Formatear precio según moneda
function formatPrice(priceInCLP, currency = currentCurrency) {
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
    const convertedPrice = Math.round(priceInCLP * config.rate);
    
    return new Intl.NumberFormat(config.format, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: config.decimals,
        maximumFractionDigits: config.decimals
    }).format(convertedPrice);
}

// Obtener traducción
function t(key) {
    return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.es[key] || key;
}

// Cambiar idioma
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('userLang', lang);
    updatePageContent();
    updateLanguageSelector();
}

// Cambiar moneda
function setCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem('userCurrency', currency);
    updatePrices();
    updateCurrencySelector();
}

// Actualizar todos los precios en la página
function updatePrices() {
    // Actualizar precios en cards de pricing
    document.querySelectorAll('[data-price]').forEach(el => {
        const basePriceCLP = parseInt(el.dataset.price);
        el.textContent = formatPrice(basePriceCLP);
    });
    
    // Actualizar precios tachados
    document.querySelectorAll('[data-price-old]').forEach(el => {
        const basePriceCLP = parseInt(el.dataset.priceOld);
        el.textContent = formatPrice(basePriceCLP);
    });
    
    // Actualizar cotizador
    if (typeof updateQuote === 'function') {
        updateQuote();
    }
}

// Actualizar contenido de la página
function updatePageContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = t(key);
    });
    
    document.documentElement.lang = currentLang;
}

// Crear selector de idioma/moneda
function createLocaleSelector() {
    const selector = document.createElement('div');
    selector.className = 'locale-selector fixed bottom-6 right-6 z-50 flex flex-col gap-2';
    selector.innerHTML = `
        <div class="locale-toggle bg-card-dark/90 backdrop-blur-md border border-white/10 rounded-full p-2 cursor-pointer hover:border-primary/50 transition-all shadow-xl" id="locale-toggle">
            <span class="material-symbols-outlined text-white text-xl">language</span>
        </div>
        <div class="locale-menu hidden flex-col gap-2 bg-card-dark/95 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]" id="locale-menu">
            <div class="mb-2">
                <label class="text-xs text-slate-400 uppercase tracking-wider font-bold">${t('lang_select')}</label>
                <div class="flex gap-2 mt-2">
                    <button class="lang-btn flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentLang === 'es' ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}" data-lang="es">
                        🇪🇸 ES
                    </button>
                    <button class="lang-btn flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${currentLang === 'en' ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}" data-lang="en">
                        🇺🇸 EN
                    </button>
                </div>
            </div>
            <div>
                <label class="text-xs text-slate-400 uppercase tracking-wider font-bold">${t('currency_select')}</label>
                <select id="currency-select" class="w-full mt-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-primary outline-none">
                    <option value="CLP" ${currentCurrency === 'CLP' ? 'selected' : ''}>🇨🇱 CLP - Peso Chileno</option>
                    <option value="USD" ${currentCurrency === 'USD' ? 'selected' : ''}>🇺🇸 USD - US Dollar</option>
                    <option value="EUR" ${currentCurrency === 'EUR' ? 'selected' : ''}>🇪🇺 EUR - Euro</option>
                    <option value="MXN" ${currentCurrency === 'MXN' ? 'selected' : ''}>🇲🇽 MXN - Peso Mexicano</option>
                    <option value="ARS" ${currentCurrency === 'ARS' ? 'selected' : ''}>🇦🇷 ARS - Peso Argentino</option>
                    <option value="COP" ${currentCurrency === 'COP' ? 'selected' : ''}>🇨🇴 COP - Peso Colombiano</option>
                    <option value="PEN" ${currentCurrency === 'PEN' ? 'selected' : ''}>🇵🇪 PEN - Sol Peruano</option>
                    <option value="BRL" ${currentCurrency === 'BRL' ? 'selected' : ''}>🇧🇷 BRL - Real Brasileño</option>
                </select>
            </div>
            <div class="text-[10px] text-slate-500 mt-2 text-center">
                📍 Detectado: ${userCountry}
            </div>
        </div>
    `;
    
    document.body.appendChild(selector);
    
    // Event listeners
    document.getElementById('locale-toggle').addEventListener('click', () => {
        document.getElementById('locale-menu').classList.toggle('hidden');
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
    
    document.getElementById('currency-select').addEventListener('change', (e) => {
        setCurrency(e.target.value);
    });
    
    // Cerrar al hacer click afuera
    document.addEventListener('click', (e) => {
        if (!selector.contains(e.target)) {
            document.getElementById('locale-menu').classList.add('hidden');
        }
    });
}

function updateLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.remove('bg-white/5', 'text-slate-300', 'hover:bg-white/10');
            btn.classList.add('bg-primary', 'text-white');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-white/5', 'text-slate-300', 'hover:bg-white/10');
        }
    });
}

function updateCurrencySelector() {
    const select = document.getElementById('currency-select');
    if (select) select.value = currentCurrency;
}

// Inicializar sistema i18n
async function initI18n() {
    // Cargar preferencias guardadas
    const savedLang = localStorage.getItem('userLang');
    const savedCurrency = localStorage.getItem('userCurrency');
    
    if (savedLang && savedCurrency) {
        currentLang = savedLang;
        currentCurrency = savedCurrency;
    } else {
        // Detectar por IP
        await detectCountry();
    }
    
    // Crear selector
    createLocaleSelector();
    
    // Actualizar página
    updatePageContent();
    updatePrices();
}

// Exportar funciones globales
window.i18n = {
    t,
    formatPrice,
    setLanguage,
    setCurrency,
    currentLang: () => currentLang,
    currentCurrency: () => currentCurrency,
    BASE_PRICES
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initI18n);
