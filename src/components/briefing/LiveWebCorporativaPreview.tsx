"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useBriefingForm } from "@/modules/briefingEngine/context";
import { getGenericCopy } from "@/lib/genericCopy";
import { getStylePreset, readableTextShadow } from "@/lib/stylePresets";
import {
    Globe,
    Mail,
    Phone,
    ArrowRight,
    Star,
    MapPin,
    MessageCircle,
    Users,
    HelpCircle,
    DollarSign,
    FileText,
    Image as ImageIcon,
    Briefcase,
    Instagram,
    Facebook,
    Twitter,
    Calendar,
    Download,
    Languages,
    LayoutGrid,
    Monitor,
    Home,
    Camera,
    Trophy,
    Search,
    Moon,
    Sun,
    ChevronLeft,
    ChevronRight,
    Navigation,
} from "lucide-react";

// ── Placeholder images ──────────────────────────────────
const pageImages: Record<string, string[]> = {
    inicio: ["https://picsum.photos/seed/wchero/600/250"],
    servicios: [
        "https://picsum.photos/seed/wcsvc1/120/80",
        "https://picsum.photos/seed/wcsvc2/120/80",
        "https://picsum.photos/seed/wcsvc3/120/80",
        "https://picsum.photos/seed/wcsvc4/120/80",
    ],
    nosotros: ["https://picsum.photos/seed/wcabout/200/120"],
    portafolio: [
        "https://picsum.photos/seed/wcport1/120/100",
        "https://picsum.photos/seed/wcport2/120/100",
        "https://picsum.photos/seed/wcport3/120/100",
        "https://picsum.photos/seed/wcport4/120/100",
        "https://picsum.photos/seed/wcport5/120/100",
        "https://picsum.photos/seed/wcport6/120/100",
    ],
    galeria: [
        "https://picsum.photos/seed/wcgal1/100/100",
        "https://picsum.photos/seed/wcgal2/100/130",
        "https://picsum.photos/seed/wcgal3/100/90",
        "https://picsum.photos/seed/wcgal4/100/110",
        "https://picsum.photos/seed/wcgal5/100/100",
        "https://picsum.photos/seed/wcgal6/100/120",
    ],
    blog: [
        "https://picsum.photos/seed/wcblog1/120/70",
        "https://picsum.photos/seed/wcblog2/120/70",
        "https://picsum.photos/seed/wcblog3/120/70",
    ],
    casos_exito: [
        "https://picsum.photos/seed/wccase1/150/90",
        "https://picsum.photos/seed/wccase2/150/90",
    ],
    equipo: [
        "https://picsum.photos/seed/wcteam1/60/60",
        "https://picsum.photos/seed/wcteam2/60/60",
        "https://picsum.photos/seed/wcteam3/60/60",
    ],
};

// ── Page display order ──────────────────────────────────
const PAGE_ORDER = [
    "inicio", "servicios", "nosotros", "portafolio",
    "galeria", "casos_exito", "blog", "faq", "precios", "contacto",
];

const PAGE_LABELS: Record<string, string> = {
    inicio: "Inicio",
    servicios: "Servicios",
    nosotros: "Nosotros",
    contacto: "Contacto",
    portafolio: "Portafolio",
    galeria: "Galería",
    blog: "Blog",
    faq: "FAQ",
    casos_exito: "Casos de Éxito",
    precios: "Precios",
};

const PAGE_ICONS: Record<string, React.ReactNode> = {
    inicio: <Home size={14} />,
    servicios: <Briefcase size={14} />,
    nosotros: <Users size={14} />,
    contacto: <Mail size={14} />,
    portafolio: <ImageIcon size={14} />,
    galeria: <Camera size={14} />,
    blog: <FileText size={14} />,
    faq: <HelpCircle size={14} />,
    casos_exito: <Trophy size={14} />,
    precios: <DollarSign size={14} />,
};

// ── Link helpers ──────────────────────────────────
function phoneDigits(phone: string): string {
    return phone.replace(/[^\d]/g, "");
}
function buildWhatsAppUrl(phone: string): string {
    const d = phoneDigits(phone);
    return d ? `https://wa.me/${d}` : "#";
}
function buildCtaHref(cta: string, phone: string, email: string): string {
    switch (cta) {
        case "whatsapp": return buildWhatsAppUrl(phone);
        case "llamar": { const d = phoneDigits(phone); return d ? `tel:+${d}` : "#"; }
        case "formulario": case "agendar": return email ? `mailto:${email}` : "#";
        default: return "#";
    }
}
function normalizePhone(phone: string): string {
    return phone.replace(/[\s+\-()]/g, "");
}

// ── Section Title helper ──────────────────────────────
function SectionTitle({ icon, title, color, textClass, headingClass }: {
    icon: React.ReactNode; title: string; color: string; textClass: string; headingClass?: string;
}) {
    return (
        <div className="flex items-center gap-1.5 mb-2">
            <span style={{ color }}>{icon}</span>
            <h4 className={`${headingClass || "text-[10px] font-semibold"} ${textClass}`}>{title}</h4>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export function LiveWebCorporativaPreview() {
    const { formData } = useBriefingForm();

    const primaryColor = (formData.primaryColor as string) || "#6366f1";
    const secondaryColor = (formData.secondaryColor as string) || "";
    const accentColor = secondaryColor || primaryColor;
    const businessName = (formData.businessName as string) || "Tu Empresa";
    const industry = (formData.industry as string) || "";
    const designStyle = (formData.designStyle as string) || "moderno";
    const pages = (formData.pages as string[]) || [];
    const mainCTA = (formData.mainCTA as string) || "whatsapp";
    const features = (formData.features as string[]) || [];
    const phone = (formData.phone as string) || "";
    const email = (formData.email as string) || "";
    const instagramUrl = (formData.instagramUrl as string) || "";
    const facebookUrl = (formData.facebookUrl as string) || "";
    const twitterUrl = (formData.twitterUrl as string) || "";

    const copy = getGenericCopy({ businessName, industry });
    const hasSocial = instagramUrl || facebookUrl || twitterUrl || phone;
    const normalizedPhone = normalizePhone(phone);

    const ctaLabels: Record<string, string> = {
        whatsapp: "Contáctanos por WhatsApp",
        formulario: "Enviar consulta",
        llamar: "Llámanos ahora",
        agendar: "Agendar cita",
        comprar: "Solicitar cotización",
    };

    // ── View mode: pages (tabs) vs navigation vs sitemap ──
    const [viewMode, setViewMode] = useState<"pages" | "navigation" | "sitemap">("pages");

    // ── Active page (for tab navigation) ──
    const [activePage, setActivePage] = useState("inicio");

    // ── Navigation mode: sequential page index ──
    const [navPageIndex, setNavPageIndex] = useState(0);

    // ── Multi-idioma ──
    const [previewLang, setPreviewLang] = useState<"es" | "en">("es");
    const isMultiIdioma = features.includes("multiidioma");

    // ── Dark mode toggle (when feature enabled) ──
    const [darkModeToggle, setDarkModeToggle] = useState(false);
    const hasDarkMode = features.includes("dark_mode");

    // ── Scroll ref ──
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const [showFloating, setShowFloating] = useState(true);

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        const footer = footerRef.current;
        if (!container || !footer) { setShowFloating(true); return; }
        const containerRect = container.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        setShowFloating(footerRect.top - containerRect.bottom > -60);
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Reset active page to first available when pages change
    useEffect(() => {
        const ordered = PAGE_ORDER.filter(p => pages.includes(p));
        if (ordered.length > 0 && !pages.includes(activePage)) {
            setActivePage(ordered[0]);
        }
    }, [pages, activePage]);

    // ── Style ──
    const baseStyle = getStylePreset(designStyle, primaryColor);
    // Override style if dark mode toggle is on
    const style = (hasDarkMode && darkModeToggle)
        ? getStylePreset("oscuro", primaryColor)
        : baseStyle;

    const { isDark, fontClass } = style;
    const bgClass = style.bg;
    const textClass = style.text;
    const subtextClass = style.subtext;
    const cardBg = style.card;
    const dividerColor = style.divider;
    const ctaHref = buildCtaHref(mainCTA, phone, email);

    const activePages = PAGE_ORDER.filter(p => pages.includes(p));

    const i18n = {
        es: {
            services: "Nuestros Servicios", about: "Quiénes Somos", contact: "Contacto",
            portfolio: "Nuestro Portafolio", gallery: "Galería", blog: "Blog",
            faq: "Preguntas Frecuentes", pricing: "Planes y Precios",
            cases: "Casos de Éxito", send: "Enviar", home: "Inicio",
        },
        en: {
            services: "Our Services", about: "About Us", contact: "Contact",
            portfolio: "Our Portfolio", gallery: "Gallery", blog: "Blog",
            faq: "FAQ", pricing: "Plans & Pricing",
            cases: "Case Studies", send: "Send", home: "Home",
        },
    };
    const t = i18n[previewLang];

    // ═══════════════════════════════════════════════════════
    // PAGE RENDERERS
    // ═══════════════════════════════════════════════════════

    const renderInicio = () => (
        <div>
            {/* Hero */}
            <div className="relative overflow-hidden" style={{ background: style.heroOverlay }}>
                <img src={pageImages.inicio[0]} alt="Hero" className="w-full h-32 object-cover opacity-30"
                    style={{ filter: `sepia(0.3) hue-rotate(${parseInt(primaryColor.slice(1), 16) % 360}deg)` }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    {hasSocial && (
                        <div className="flex items-center gap-1.5 mb-2">
                            {normalizedPhone && <a href={`https://wa.me/${normalizedPhone}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full flex items-center justify-center hover:scale-110 transition-transform no-underline" style={{ backgroundColor: "#25D366" }}><MessageCircle size={10} className="text-white" /></a>}
                            {instagramUrl && <a href={instagramUrl.startsWith("http") ? instagramUrl : `https://instagram.com/${instagramUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center hover:scale-110 transition-transform no-underline"><Instagram size={10} className="text-white" /></a>}
                            {facebookUrl && <a href={facebookUrl.startsWith("http") ? facebookUrl : `https://facebook.com/${facebookUrl}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform no-underline"><Facebook size={10} className="text-white" /></a>}
                            {twitterUrl && <a href={twitterUrl.startsWith("http") ? twitterUrl : `https://x.com/${twitterUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform no-underline"><Twitter size={10} className="text-white" /></a>}
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-1" style={{ textShadow: readableTextShadow }}>{businessName}</h3>
                    {industry && <p className="text-[10px] text-white/80 mb-2 capitalize" style={{ textShadow: readableTextShadow }}>{copy.tagline}</p>}
                    <a href={ctaHref} target="_blank" rel="noopener noreferrer"
                        className={`inline-block px-4 py-1.5 ${style.borderRadius} text-white text-[10px] font-medium shadow-lg transition-transform hover:scale-105 no-underline`}
                        style={{ backgroundColor: accentColor }}>
                        <span className="flex items-center gap-1">{ctaLabels[mainCTA] || "Contáctanos"} <ArrowRight size={10} /></span>
                    </a>
                </div>
            </div>
            {/* Highlighted services */}
            <div className={`${style.sectionPy}`}>
                <SectionTitle icon={<Briefcase size={10} />} title={t.services} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                    {pageImages.servicios.slice(0, 3).map((src, i) => (
                        <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} overflow-hidden transition-colors`}>
                            <img src={src} alt={`Servicio ${i + 1}`} className="w-full h-12 object-cover" />
                            <div className="p-1.5">
                                <p className={`text-[8px] font-medium ${textClass} leading-tight`}>{copy.services[i] || `Servicio ${i + 1}`}</p>
                                <p className={`text-[7px] ${subtextClass} mt-0.5`}>Conoce más →</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Stats */}
            <div className={`${style.sectionPy} border-t ${dividerColor}`}>
                <div className="grid grid-cols-3 gap-2 text-center">
                    {[{ n: "150+", l: "Proyectos" }, { n: "98%", l: "Satisfacción" }, { n: "10+", l: "Años" }].map(({ n, l }) => (
                        <div key={l}>
                            <div className="text-sm font-bold" style={{ color: accentColor }}>{n}</div>
                            <div className={`text-[8px] ${subtextClass}`}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderServicios = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<Briefcase size={10} />} title={t.services} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <p className={`text-[8px] ${subtextClass} leading-relaxed -mt-1`}>Soluciones profesionales diseñadas para impulsar tu negocio.</p>
            <div className="grid grid-cols-2 gap-2">
                {pageImages.servicios.map((src, i) => (
                    <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} overflow-hidden transition-colors`}>
                        <img src={src} alt={`Servicio ${i + 1}`} className="w-full h-14 object-cover" />
                        <div className="p-2">
                            <p className={`text-[9px] font-medium ${textClass} leading-tight`}>{copy.services[i] || `Servicio ${i + 1}`}</p>
                            <p className={`text-[7px] ${subtextClass} mt-1 leading-relaxed`}>Descripción detallada del servicio ofrecido para nuestros clientes.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderNosotros = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<Users size={10} />} title={t.about} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <div className="flex gap-3 items-start">
                <img src={pageImages.nosotros[0]} alt="About" className={`w-20 h-20 ${style.borderRadius} object-cover flex-shrink-0`} />
                <div className="flex-1">
                    <p className={`text-[8px] ${textClass} leading-relaxed mb-2`}>{copy.aboutText}</p>
                    <p className={`text-[7px] ${subtextClass} leading-relaxed`}>Nos comprometemos con la excelencia y la satisfacción de nuestros clientes en cada proyecto que emprendemos.</p>
                </div>
            </div>
            {/* Mini team */}
            <div className="mt-3">
                <p className={`text-[9px] font-medium ${textClass} mb-2`}>Nuestro Equipo</p>
                <div className="flex gap-3">
                    {pageImages.equipo.map((src, i) => (
                        <div key={i} className="text-center">
                            <img src={src} alt={`Team ${i + 1}`} className="w-10 h-10 rounded-full object-cover mx-auto mb-1" />
                            <p className={`text-[7px] font-medium ${textClass}`}>{copy.teamNames[i] || `Miembro ${i + 1}`}</p>
                            <p className={`text-[6px] ${subtextClass}`}>Cargo</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPortafolio = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<ImageIcon size={10} />} title={t.portfolio} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <div className="grid grid-cols-3 gap-1.5">
                {pageImages.portafolio.map((src, i) => (
                    <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} overflow-hidden group transition-colors`}>
                        <div className="relative">
                            <img src={src} alt={`Proyecto ${i + 1}`} className="w-full h-16 object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <ArrowRight size={10} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <div className="p-1.5">
                            <p className={`text-[7px] font-medium ${textClass}`}>Proyecto {i + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderGaleria = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<Camera size={10} />} title={t.gallery} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            {/* Masonry-like grid */}
            <div className="columns-3 gap-1.5 space-y-1.5">
                {pageImages.galeria.map((src, i) => (
                    <img key={i} src={src} alt={`Galería ${i + 1}`} className={`w-full ${style.borderRadius} object-cover break-inside-avoid`}
                        style={{ height: `${50 + (i % 3) * 15}px` }} />
                ))}
            </div>
        </div>
    );

    const renderBlog = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<FileText size={10} />} title={t.blog} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <div className="space-y-2">
                {pageImages.blog.map((src, i) => (
                    <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} overflow-hidden flex gap-2 transition-colors`}>
                        <img src={src} alt={`Blog ${i + 1}`} className="w-16 h-14 object-cover flex-shrink-0" />
                        <div className="p-1.5 flex-1">
                            <p className={`text-[6px] ${subtextClass}`}>Mar 2026</p>
                            <p className={`text-[8px] font-medium ${textClass} leading-tight mt-0.5`}>{copy.blogTitles[i] || `Artículo ${i + 1}`}</p>
                            <p className={`text-[7px] ${subtextClass} mt-0.5`}>Leer más →</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFaq = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<HelpCircle size={10} />} title={t.faq} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <div className="space-y-1.5">
                {copy.faqQuestions.map((q, i) => (
                    <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} p-2 flex items-center justify-between transition-colors`}>
                        <span className={`text-[8px] ${textClass}`}>{q}</span>
                        <span className={`text-[10px] ${subtextClass}`}>+</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCasosExito = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<Trophy size={10} />} title={t.cases} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            {/* Featured case */}
            <div className={`${cardBg} ${style.borderRadius} ${style.shadow} overflow-hidden transition-colors`}>
                <img src={pageImages.casos_exito[0]} alt="Caso" className="w-full h-20 object-cover" />
                <div className="p-2">
                    <p className={`text-[9px] font-medium ${textClass}`}>Proyecto Destacado</p>
                    <p className={`text-[7px] ${subtextClass} mt-0.5 leading-relaxed`}>&ldquo;{copy.testimonial.text}&rdquo;</p>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className={`w-4 h-4 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
                        <span className={`text-[7px] font-medium ${subtextClass}`}>{copy.testimonial.author}</span>
                        <div className="flex gap-0.5 ml-auto">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={7} fill={accentColor} color={accentColor} />)}
                        </div>
                    </div>
                </div>
            </div>
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-2 text-center mt-2">
                {[{ n: "95%", l: "Satisfacción" }, { n: "50+", l: "Proyectos" }, { n: "10+", l: "Industrias" }].map(({ n, l }) => (
                    <div key={l} className={`${cardBg} ${style.borderRadius} p-1.5`}>
                        <div className="text-[10px] font-bold" style={{ color: accentColor }}>{n}</div>
                        <div className={`text-[6px] ${subtextClass}`}>{l}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPrecios = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<DollarSign size={10} />} title={t.pricing} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <div className="grid grid-cols-3 gap-1.5">
                {["Básico", "Pro", "Premium"].map((plan, i) => (
                    <div key={plan} className={`${cardBg} ${style.borderRadius} ${style.shadow} p-2 text-center transition-colors`}
                        style={i === 1 ? { boxShadow: `0 0 0 1px ${accentColor}` } : {}}>
                        <div className={`text-[8px] font-medium ${subtextClass}`}>{plan}</div>
                        <div className={`text-xs font-bold ${textClass} my-1`}>${"$".repeat(i + 1)}</div>
                        <p className={`text-[7px] ${subtextClass} leading-tight`}>{copy.pricingDesc[i] || ""}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContacto = () => (
        <div className={`${style.sectionPy} space-y-3`}>
            <SectionTitle icon={<Mail size={10} />} title={t.contact} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
            <p className={`text-[8px] ${subtextClass} leading-relaxed`}>{copy.contactText}</p>
            <div className={`flex gap-4 text-[9px] ${subtextClass}`}>
                {email ? (
                    <a href={`mailto:${email}`} className={`flex items-center gap-1 hover:underline ${subtextClass}`}><Mail size={9} /> {email}</a>
                ) : (
                    <span className="flex items-center gap-1"><Mail size={9} /> Email</span>
                )}
                {phone ? (
                    <a href={`tel:+${phoneDigits(phone)}`} className={`flex items-center gap-1 hover:underline ${subtextClass}`}><Phone size={9} /> {phone}</a>
                ) : (
                    <span className="flex items-center gap-1"><Phone size={9} /> Teléfono</span>
                )}
            </div>
            <div className={`${cardBg} ${style.borderRadius} p-2 space-y-1 transition-colors`}>
                <div className={`h-5 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                <div className={`h-5 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                <div className={`h-10 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                <a href={ctaHref} target="_blank" rel="noopener noreferrer"
                    className={`block h-5 ${style.borderRadius} w-1/3 text-white text-[8px] flex items-center justify-center no-underline`}
                    style={{ backgroundColor: accentColor }}>{t.send}</a>
            </div>
            {/* Map placeholder */}
            {features.includes("google_maps") && (
                <div className="h-16 rounded-lg flex items-center justify-center mt-2" style={{ backgroundColor: `${accentColor}08` }}>
                    <div className="text-center">
                        <MapPin size={14} style={{ color: accentColor }} className="mx-auto mb-0.5" />
                        <span className={`text-[7px] ${subtextClass}`}>Google Maps</span>
                    </div>
                </div>
            )}
        </div>
    );

    const PAGE_RENDERERS: Record<string, () => React.ReactNode> = {
        inicio: renderInicio,
        servicios: renderServicios,
        nosotros: renderNosotros,
        portafolio: renderPortafolio,
        galeria: renderGaleria,
        blog: renderBlog,
        faq: renderFaq,
        casos_exito: renderCasosExito,
        precios: renderPrecios,
        contacto: renderContacto,
    };

    // ═══════════════════════════════════════════════════════
    // SITEMAP VIEW
    // ═══════════════════════════════════════════════════════

    const renderSitemap = () => (
        <div className={`${bgClass} p-4 transition-colors duration-300`} style={{ minHeight: "400px" }}>
            {/* Root node */}
            <div className="flex flex-col items-center mb-4">
                <div className={`${cardBg} ${style.borderRadius} ${style.shadow} px-4 py-2 flex items-center gap-2 transition-colors`}>
                    <Home size={12} style={{ color: accentColor }} />
                    <span className={`text-[10px] font-bold ${textClass}`}>{businessName}</span>
                </div>
                {activePages.length > 0 && (
                    <div className={`w-px h-4 ${isDark ? "bg-white/20" : "bg-gray-300"}`} />
                )}
            </div>

            {/* Connector line */}
            {activePages.length > 0 && (
                <div className="flex justify-center mb-2">
                    <div className={`h-px ${isDark ? "bg-white/20" : "bg-gray-300"}`}
                        style={{ width: `${Math.min(activePages.length * 60, 280)}px` }} />
                </div>
            )}

            {/* Page nodes */}
            <div className="grid grid-cols-3 gap-2">
                {activePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => { setActivePage(page); setViewMode("pages"); }}
                        className={`${cardBg} ${style.borderRadius} ${style.shadow} p-2 text-center transition-all hover:scale-105 cursor-pointer group`}
                    >
                        {/* Connector dot */}
                        <div className="flex justify-center -mt-4 mb-1">
                            <div className={`w-px h-2 ${isDark ? "bg-white/20" : "bg-gray-300"}`} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                                {PAGE_ICONS[page] || <FileText size={12} />}
                            </div>
                            <span className={`text-[8px] font-medium ${textClass} leading-tight`}>{PAGE_LABELS[page]}</span>
                            <span className={`text-[6px] ${subtextClass} group-hover:underline`}>Ver página →</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Features summary */}
            {features.length > 0 && (
                <div className={`mt-4 pt-3 border-t ${dividerColor}`}>
                    <p className={`text-[8px] font-medium ${subtextClass} mb-2`}>Funcionalidades del sitio:</p>
                    <div className="flex flex-wrap gap-1">
                        {features.map(f => (
                            <span key={f} className={`text-[7px] px-1.5 py-0.5 ${style.borderRadius} ${isDark ? "bg-white/5 text-white/60" : "bg-gray-100 text-gray-600"}`}>
                                {f.replace(/_/g, " ")}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    // ═══════════════════════════════════════════════════════
    // NAVIGATION VIEW (simulated browsing)
    // ═══════════════════════════════════════════════════════

    const renderNavigationView = () => {
        const currentPage = activePages[navPageIndex] || activePages[0];

        return (
            <div ref={scrollContainerRef} className={`${bgClass} overflow-y-auto transition-colors duration-300`} style={{ maxHeight: "500px" }}>
                {/* Breadcrumb trail */}
                <div className={`sticky top-0 z-10 ${isDark ? "bg-gray-950/95" : "bg-white/95"} backdrop-blur-sm border-b ${dividerColor} px-3 py-1.5`}>
                    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                        {activePages.slice(0, navPageIndex + 1).map((page, i) => (
                            <React.Fragment key={page}>
                                {i > 0 && <ChevronRight size={8} className="flex-shrink-0" style={{ color: style.subtextHex }} />}
                                <button
                                    onClick={() => setNavPageIndex(i)}
                                    className={`flex-shrink-0 text-[8px] font-medium transition-colors ${i === navPageIndex
                                        ? "font-bold"
                                        : "hover:underline"
                                    }`}
                                    style={i === navPageIndex ? { color: accentColor } : { color: style.subtextHex }}
                                >
                                    {PAGE_LABELS[page]}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Current page content */}
                <div className="animate-fadeIn">
                    {PAGE_RENDERERS[currentPage]?.()}
                </div>

                {/* Navigation controls */}
                <div className={`flex items-center justify-between px-4 py-3 border-t ${dividerColor}`}>
                    <button
                        onClick={() => setNavPageIndex(Math.max(0, navPageIndex - 1))}
                        disabled={navPageIndex === 0}
                        className={`flex items-center gap-1 text-[9px] px-2 py-1 ${style.borderRadius} transition-colors ${navPageIndex === 0
                            ? `${subtextClass} opacity-40 cursor-not-allowed`
                            : `${textClass} hover:bg-black/5 ${isDark ? "hover:bg-white/5" : ""}`
                        }`}
                    >
                        <ChevronLeft size={10} /> Anterior
                    </button>
                    <span className={`text-[8px] ${subtextClass}`}>{navPageIndex + 1} / {activePages.length}</span>
                    <button
                        onClick={() => setNavPageIndex(Math.min(activePages.length - 1, navPageIndex + 1))}
                        disabled={navPageIndex === activePages.length - 1}
                        className={`flex items-center gap-1 text-[9px] px-2 py-1 ${style.borderRadius} transition-colors ${navPageIndex === activePages.length - 1
                            ? `${subtextClass} opacity-40 cursor-not-allowed`
                            : `text-white`
                        }`}
                        style={navPageIndex < activePages.length - 1 ? { backgroundColor: accentColor } : {}}
                    >
                        Siguiente <ChevronRight size={10} />
                    </button>
                </div>

                {/* Footer */}
                <div ref={footerRef} className="px-4 py-3 text-center transition-colors duration-300" style={{ backgroundColor: `${accentColor}10` }}>
                    <p className={`text-[8px] ${subtextClass}`}>© 2026 {businessName} — Todos los derechos reservados</p>
                </div>
            </div>
        );
    };

    // ═══════════════════════════════════════════════════════
    // TABS VIEW (pages)
    // ═══════════════════════════════════════════════════════

    const renderTabsView = () => (
        <div ref={scrollContainerRef} className={`${bgClass} overflow-y-auto transition-colors duration-300`} style={{ maxHeight: "500px" }}>
            {/* Navbar */}
            <div className={`sticky top-0 z-10 ${isDark ? "bg-gray-950/95" : "bg-white/95"} backdrop-blur-sm border-b ${dividerColor}`}>
                <div className="flex items-center px-2 py-1.5 gap-0.5 overflow-x-auto scrollbar-hide">
                    {activePages.map(page => (
                        <button
                            key={page}
                            onClick={() => setActivePage(page)}
                            className={`flex-shrink-0 px-2 py-1 ${style.borderRadius} text-[8px] font-medium transition-all ${activePage === page
                                ? `text-white`
                                : `hover:bg-black/5 ${isDark ? "hover:bg-white/5" : ""}`
                                }`}
                            style={activePage === page ? { backgroundColor: accentColor } : { color: style.textHex }}
                        >
                            {PAGE_LABELS[page]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active page content */}
            <div className="animate-fadeIn">
                {PAGE_RENDERERS[activePage]?.() || (
                    <div className="px-6 py-8 text-center">
                        <p className={`text-xs ${subtextClass}`}>Selecciona páginas para ver la vista previa</p>
                    </div>
                )}
            </div>

            {/* Extra features rendered inline */}
            {activePage === "contacto" && features.includes("formulario_avanzado") && (
                <div className={`${style.sectionPy} border-t ${dividerColor} animate-fadeIn`}>
                    <SectionTitle icon={<FileText size={10} />} title="Formulario Avanzado" color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                    <div className={`${cardBg} ${style.borderRadius} p-2 space-y-1 transition-colors`}>
                        <div className="grid grid-cols-2 gap-1">
                            <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded`} />
                            <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded`} />
                        </div>
                        <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                        <div className={`h-8 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                        <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                        <div className={`h-4 ${style.borderRadius} w-1/3 text-white text-[7px] flex items-center justify-center`} style={{ backgroundColor: accentColor }}>{t.send}</div>
                    </div>
                </div>
            )}

            {activePage === "inicio" && features.includes("agenda") && (
                <div className={`${style.sectionPy} border-t ${dividerColor} animate-fadeIn`}>
                    <SectionTitle icon={<Calendar size={10} />} title="Agendar Cita" color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                    <div className={`${cardBg} ${style.borderRadius} p-3 text-center transition-colors`}>
                        <Calendar size={16} style={{ color: accentColor }} className="mx-auto mb-1" />
                        <p className={`text-[8px] ${textClass} font-medium mb-1`}>Reserva tu cita en línea</p>
                        <div className={`inline-block px-3 py-1 ${style.borderRadius} text-white text-[8px]`} style={{ backgroundColor: accentColor }}>Agendar</div>
                    </div>
                </div>
            )}

            {activePage === "inicio" && features.includes("descargables") && (
                <div className={`${style.sectionPy} border-t ${dividerColor} animate-fadeIn`}>
                    <SectionTitle icon={<Download size={10} />} title="Descargas" color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                    <div className={`${cardBg} ${style.borderRadius} p-3 flex items-center gap-3 transition-colors`}>
                        <div className="w-8 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}15` }}>
                            <Download size={14} style={{ color: accentColor }} />
                        </div>
                        <div className="flex-1">
                            <p className={`text-[8px] font-medium ${textClass}`}>Descargar Catálogo</p>
                            <p className={`text-[7px] ${subtextClass}`}>PDF — 2.4 MB</p>
                        </div>
                        <div className={`px-2 py-0.5 ${style.borderRadius} text-white text-[7px]`} style={{ backgroundColor: accentColor }}><Download size={8} className="inline" /></div>
                    </div>
                </div>
            )}

            {/* Search bar indicator */}
            {features.includes("buscador") && activePage === "inicio" && (
                <div className={`${style.sectionPy} border-t ${dividerColor} animate-fadeIn`}>
                    <div className={`${cardBg} ${style.borderRadius} p-2 flex items-center gap-2 transition-colors`}>
                        <Search size={10} style={{ color: accentColor }} />
                        <span className={`text-[8px] ${subtextClass}`}>Buscar en el sitio...</span>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div ref={footerRef} className="px-4 py-3 text-center transition-colors duration-300" style={{ backgroundColor: `${accentColor}10` }}>
                {hasSocial && (
                    <div className="flex justify-center gap-1.5 mb-2">
                        {normalizedPhone && <a href={`https://wa.me/${normalizedPhone}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform no-underline" style={{ backgroundColor: "#25D366" }}><MessageCircle size={8} className="text-white" /></a>}
                        {instagramUrl && <a href={instagramUrl.startsWith("http") ? instagramUrl : `https://instagram.com/${instagramUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-110 transition-transform no-underline"><Instagram size={8} /></a>}
                        {facebookUrl && <a href={facebookUrl.startsWith("http") ? facebookUrl : `https://facebook.com/${facebookUrl}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform no-underline"><Facebook size={8} /></a>}
                        {twitterUrl && <a href={twitterUrl.startsWith("http") ? twitterUrl : `https://x.com/${twitterUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full bg-gray-800 text-white flex items-center justify-center hover:scale-110 transition-transform no-underline"><Twitter size={8} /></a>}
                    </div>
                )}
                {/* Footer nav links */}
                {activePages.length > 1 && (
                    <div className="flex justify-center gap-2 mb-2 flex-wrap">
                        {activePages.slice(0, 5).map(page => (
                            <button key={page} onClick={() => setActivePage(page)} className={`text-[7px] ${subtextClass} hover:underline`}>{PAGE_LABELS[page]}</button>
                        ))}
                    </div>
                )}
                <p className={`text-[8px] ${subtextClass}`}>© 2026 {businessName} — Todos los derechos reservados</p>
            </div>
        </div>
    );

    // ═══════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════

    return (
        <div className={`w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 transition-all duration-300 relative ${fontClass}`}>
            {/* Browser Chrome */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-2">
                    <div className="bg-slate-700 rounded-md px-3 py-1 flex items-center gap-2 text-xs text-white/50">
                        <Globe size={10} />
                        <span>www.{businessName.toLowerCase().replace(/\s+/g, "")}.cl{viewMode === "pages" && activePage !== "inicio" ? `/${activePage}` : viewMode === "navigation" ? `/${activePages[navPageIndex] || "inicio"}` : ""}</span>
                    </div>
                </div>
                {/* Dark mode toggle */}
                {hasDarkMode && (
                    <button
                        onClick={() => setDarkModeToggle(!darkModeToggle)}
                        className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded text-white/40 hover:text-white/70 transition-colors"
                        title="Toggle dark mode"
                    >
                        {darkModeToggle ? <Sun size={10} /> : <Moon size={10} />}
                    </button>
                )}
                {/* Multi-idioma selector */}
                {isMultiIdioma && (
                    <div className="flex items-center gap-1">
                        <Languages size={10} className="text-white/40" />
                        <button onClick={() => setPreviewLang("es")}
                            className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${previewLang === "es" ? "bg-indigo-500 text-white" : "text-white/40 hover:text-white/70"}`}>ES</button>
                        <button onClick={() => setPreviewLang("en")}
                            className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${previewLang === "en" ? "bg-indigo-500 text-white" : "text-white/40 hover:text-white/70"}`}>EN</button>
                    </div>
                )}
            </div>

            {/* View mode tabs — 3 modes like Ecommerce */}
            <div className="flex border-b border-white/10 bg-slate-800/50">
                {([
                    { key: "pages" as const, label: "Páginas", icon: <Monitor size={10} /> },
                    { key: "navigation" as const, label: "Navegación", icon: <Navigation size={10} /> },
                    { key: "sitemap" as const, label: "Mapa del Sitio", icon: <LayoutGrid size={10} /> },
                ]).map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setViewMode(tab.key)}
                        className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[9px] font-medium transition-colors ${viewMode === tab.key ? "text-white border-b-2" : "text-white/40 hover:text-white/60"}`}
                        style={{ borderColor: viewMode === tab.key ? primaryColor : "transparent" }}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content area */}
            {activePages.length === 0 ? (
                <div className={`${bgClass} px-6 py-12 text-center`}>
                    <LayoutGrid size={20} className="text-white/20 mx-auto mb-2" />
                    <p className="text-xs text-white/30">Selecciona páginas para ver la vista previa</p>
                </div>
            ) : viewMode === "sitemap" ? (
                renderSitemap()
            ) : viewMode === "navigation" ? (
                renderNavigationView()
            ) : (
                renderTabsView()
            )}

            {/* Floating social buttons — pages/navigation mode only */}
            {viewMode !== "sitemap" && features.includes("whatsapp_button") && showFloating && (
                <div className="absolute bottom-4 right-4 flex flex-col-reverse items-center gap-2 transition-opacity duration-300" style={{ opacity: showFloating ? 1 : 0 }}>
                    {normalizedPhone ? (
                        <a href={`https://wa.me/${normalizedPhone}`} target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline"
                            style={{ backgroundColor: "#25D366" }}>
                            <MessageCircle size={18} className="text-white" />
                        </a>
                    ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "#25D366" }}>
                            <MessageCircle size={18} className="text-white" />
                        </div>
                    )}
                    {instagramUrl && (
                        <a href={instagramUrl.startsWith("http") ? instagramUrl : `https://instagram.com/${instagramUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline">
                            <Instagram size={14} className="text-white" />
                        </a>
                    )}
                    {facebookUrl && (
                        <a href={facebookUrl.startsWith("http") ? facebookUrl : `https://facebook.com/${facebookUrl}`} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline">
                            <Facebook size={14} className="text-white" />
                        </a>
                    )}
                    {twitterUrl && (
                        <a href={twitterUrl.startsWith("http") ? twitterUrl : `https://x.com/${twitterUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline">
                            <Twitter size={14} className="text-white" />
                        </a>
                    )}
                </div>
            )}

            {/* Chat en vivo indicator */}
            {features.includes("chat_en_vivo") && viewMode !== "sitemap" && showFloating && (
                <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: accentColor }}>
                        <MessageCircle size={18} className="text-white" />
                    </div>
                </div>
            )}
        </div>
    );
}
