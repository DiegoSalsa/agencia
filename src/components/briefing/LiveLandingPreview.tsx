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
    BarChart3,
    Building2,
    RefreshCw,
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
} from "lucide-react";

// Placeholder images per section generated via picsum with stable seeds
const sectionImages: Record<string, string[]> = {
    hero: [
        "https://picsum.photos/seed/hero1/600/250",
    ],
    servicios: [
        "https://picsum.photos/seed/svc1/120/80",
        "https://picsum.photos/seed/svc2/120/80",
        "https://picsum.photos/seed/svc3/120/80",
    ],
    sobre_mi: [
        "https://picsum.photos/seed/about1/100/100",
    ],
    portafolio: [
        "https://picsum.photos/seed/port1/100/80",
        "https://picsum.photos/seed/port2/100/80",
        "https://picsum.photos/seed/port3/100/80",
        "https://picsum.photos/seed/port4/100/80",
    ],
    equipo: [
        "https://picsum.photos/seed/team1/60/60",
        "https://picsum.photos/seed/team2/60/60",
        "https://picsum.photos/seed/team3/60/60",
    ],
    clientes: [
        "https://picsum.photos/seed/cl1/60/30",
        "https://picsum.photos/seed/cl2/60/30",
        "https://picsum.photos/seed/cl3/60/30",
        "https://picsum.photos/seed/cl4/60/30",
    ],
    blog: [
        "https://picsum.photos/seed/blog1/100/60",
        "https://picsum.photos/seed/blog2/100/60",
    ],
};

// ── Design style presets — imported from @/lib/stylePresets ──

// Canonical section order for landing page preview
const SECTION_ORDER = [
    "hero", "servicios", "proceso", "sobre_mi", "portafolio",
    "testimonios", "equipo", "precios", "faq", "blog",
    "estadisticas", "clientes", "contacto", "ubicacion",
];

// ── Link builders ──────────────────────────────────
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

// ── Normalize phone for WhatsApp link ──────────────────────
function normalizePhone(phone: string): string {
    return phone.replace(/[\s+\-()]/g, "");
}

export function LiveLandingPreview() {
    // ── Read directly from context — single source of truth ──
    const { formData } = useBriefingForm();

    const primaryColor = (formData.primaryColor as string) || "#6366f1";
    const secondaryColor = (formData.secondaryColor as string) || "";
    const accentColor = secondaryColor || primaryColor;
    const businessName = (formData.businessName as string) || "Tu Negocio";
    const industry = (formData.industry as string) || "";
    const designStyle = (formData.designStyle as string) || "moderno";
    const sections = (formData.sections as string[]) || [];
    const mainCTA = (formData.mainCTA as string) || "whatsapp";
    const features = (formData.features as string[]) || [];
    const phone = (formData.phone as string) || "";
    const email = (formData.email as string) || "";
    const instagramUrl = (formData.instagramUrl as string) || "";
    const facebookUrl = (formData.facebookUrl as string) || "";
    const twitterUrl = (formData.twitterUrl as string) || "";
    const socialMedia = (formData.socialMedia as string) || "";
    const additionalContent = (formData.additionalContent as string) || "";

    const copy = getGenericCopy({ businessName, industry });
    const hasSocial = instagramUrl || facebookUrl || twitterUrl || socialMedia || phone;
    const normalizedPhone = normalizePhone(phone);

    const ctaLabels: Record<string, string> = {
        whatsapp: "Contáctanos por WhatsApp",
        formulario: "Enviar consulta",
        llamar: "Llámanos ahora",
        agendar: "Agendar cita",
        comprar: "Comprar ahora",
        descargar: "Descargar gratis",
    };

    // ── Multi-idioma toggle ──
    const [previewLang, setPreviewLang] = useState<"es" | "en">("es");
    const isMultiIdioma = features.includes("multiidioma");

    // Simple i18n texts for demo
    const i18n = {
        es: {
            heroTitle: businessName,
            heroCta: ctaLabels[mainCTA] || "Contáctanos",
            services: "Nuestros Servicios",
            about: "Sobre Nosotros",
            testimonials: "Testimonios",
            pricing: "Planes y Precios",
            contact: "Contacto",
            faq: "Preguntas Frecuentes",
            portfolio: "Nuestro Portafolio",
            team: "Nuestro Equipo",
            blog: "Blog / Noticias",
            stats: "Cifras y Resultados",
            clients: "Confían en Nosotros",
            location: "Ubicación",
            process: "Nuestro Proceso",
            schedule: "Agendar Cita",
            downloads: "Descargas",
            send: "Enviar",
        },
        en: {
            heroTitle: businessName,
            heroCta: mainCTA === "whatsapp" ? "Contact via WhatsApp" : mainCTA === "llamar" ? "Call Us" : mainCTA === "agendar" ? "Schedule" : mainCTA === "comprar" ? "Buy Now" : "Contact Us",
            services: "Our Services",
            about: "About Us",
            testimonials: "Testimonials",
            pricing: "Plans & Pricing",
            contact: "Contact",
            faq: "FAQ",
            portfolio: "Our Portfolio",
            team: "Our Team",
            blog: "Blog / News",
            stats: "Numbers & Results",
            clients: "They Trust Us",
            location: "Location",
            process: "Our Process",
            schedule: "Schedule Appointment",
            downloads: "Downloads",
            send: "Send",
        },
    };
    const t = i18n[previewLang];

    // ── Refs for smart scroll ──────────────────────────────
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const footerRef = useRef<HTMLDivElement>(null);

    // ── Floating social visibility (hide near footer) ──────
    const [showFloating, setShowFloating] = useState(true);

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        const footer = footerRef.current;
        if (!container || !footer) { setShowFloating(true); return; }
        const containerRect = container.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        // Hide floating when footer is within 60px of container bottom
        const threshold = 60;
        setShowFloating(footerRect.top - containerRect.bottom > -threshold);
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // ── Smart scroll: scroll to newly activated sections/extras ──
    const prevSectionsRef = useRef<string[]>([]);
    const prevFeaturesRef = useRef<string[]>([]);

    useEffect(() => {
        const prevSections = prevSectionsRef.current;
        const prevFeatures = prevFeaturesRef.current;

        // Find newly added sections
        const newSection = sections.find(s => !prevSections.includes(s));
        // Find newly added features
        const newFeature = features.find(f => !prevFeatures.includes(f));

        const scrollTarget = newSection || newFeature;
        if (scrollTarget && sectionRefs.current[scrollTarget]) {
            setTimeout(() => {
                sectionRefs.current[scrollTarget]?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }

        prevSectionsRef.current = [...sections];
        prevFeaturesRef.current = [...features];
    }, [sections, features]);

    const style = getStylePreset(designStyle, primaryColor);
    const { isDark, fontClass } = style;
    const bgClass = style.bg;
    const textClass = style.text;
    const subtextClass = style.subtext;
    const cardBg = style.card;
    const dividerColor = style.divider;
    const ctaHref = buildCtaHref(mainCTA, phone, email);

    const activeSections = SECTION_ORDER.filter((s) => sections.includes(s));

    return (
        <div className={`w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 transition-all duration-300 relative ${fontClass}`}>
            {/* Browser Chrome */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                    <div className="bg-slate-700 rounded-md px-3 py-1 flex items-center gap-2 text-xs text-white/50">
                        <Globe size={10} />
                        <span>www.{businessName.toLowerCase().replace(/\s+/g, "")}.cl</span>
                    </div>
                </div>
                {/* Multi-idioma selector */}
                {isMultiIdioma && (
                    <div className="flex items-center gap-1">
                        <Languages size={10} className="text-white/40" />
                        <button
                            onClick={() => setPreviewLang("es")}
                            className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${previewLang === "es" ? "bg-indigo-500 text-white" : "text-white/40 hover:text-white/70"}`}
                        >ES</button>
                        <button
                            onClick={() => setPreviewLang("en")}
                            className={`text-[9px] px-1.5 py-0.5 rounded transition-colors ${previewLang === "en" ? "bg-indigo-500 text-white" : "text-white/40 hover:text-white/70"}`}
                        >EN</button>
                    </div>
                )}
            </div>

            {/* Page Preview — scrollable */}
            <div ref={scrollContainerRef} className={`${bgClass} overflow-y-auto transition-colors duration-300`} style={{ maxHeight: "500px" }}>

                {/* Hero Section — always present or if selected */}
                {(activeSections.includes("hero") || activeSections.length === 0) && (
                    <div
                        ref={(el) => { sectionRefs.current["hero"] = el; }}
                        className="relative overflow-hidden transition-all duration-300"
                        style={{ background: style.heroOverlay }}
                    >
                        <div className="relative">
                            <img
                                src={sectionImages.hero[0]}
                                alt="Hero"
                                className="w-full h-28 object-cover opacity-30"
                                style={{ filter: `sepia(0.3) hue-rotate(${parseInt(primaryColor.slice(1), 16) % 360}deg)` }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                                {/* Social icons bar in hero header */}
                                {(hasSocial || features.includes("whatsapp_button")) && (
                                    <div className="flex items-center gap-1.5 mb-2">
                                        {normalizedPhone && (
                                            <a href={`https://wa.me/${normalizedPhone}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full flex items-center justify-center hover:scale-110 transition-transform no-underline" style={{ backgroundColor: "#25D366" }} title="WhatsApp">
                                                <MessageCircle size={10} className="text-white" />
                                            </a>
                                        )}
                                        {instagramUrl && (
                                            <a href={instagramUrl.startsWith("http") ? instagramUrl : `https://instagram.com/${instagramUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center hover:scale-110 transition-transform no-underline" title="Instagram">
                                                <Instagram size={10} className="text-white" />
                                            </a>
                                        )}
                                        {facebookUrl && (
                                            <a href={facebookUrl.startsWith("http") ? facebookUrl : `https://facebook.com/${facebookUrl}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform no-underline" title="Facebook">
                                                <Facebook size={10} className="text-white" />
                                            </a>
                                        )}
                                        {twitterUrl && (
                                            <a href={twitterUrl.startsWith("http") ? twitterUrl : `https://x.com/${twitterUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center hover:scale-110 transition-transform no-underline" title="X / Twitter">
                                                <Twitter size={10} className="text-white" />
                                            </a>
                                        )}
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-white mb-1" style={{ textShadow: readableTextShadow }}>{t.heroTitle}</h3>
                                {industry && (
                                    <p className="text-[10px] text-white/80 mb-3 capitalize" style={{ textShadow: readableTextShadow }}>{industry.replace(/_/g, " ")}</p>
                                )}
                                <a
                                    href={ctaHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-block px-4 py-1.5 ${style.borderRadius} text-white text-[10px] font-medium shadow-lg transition-transform hover:scale-105 no-underline`}
                                    style={{ backgroundColor: accentColor }}
                                >
                                    <span className="flex items-center gap-1">
                                        {t.heroCta} <ArrowRight size={10} />
                                    </span>
                                </a>
                                {/* Extra spacing below CTA for visual balance */}
                                <div className="h-4" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Dynamic Sections */}
                <div className="space-y-0">
                    {activeSections.filter(s => s !== "hero").map((section) => (
                        <div
                            key={section}
                            ref={(el) => { sectionRefs.current[section] = el; }}
                            className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}
                        >
                            {/* ─── Servicios ─── */}
                            {section === "servicios" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<Briefcase size={10} />} title={t.services} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {sectionImages.servicios.map((src, i) => (
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
                            )}

                            {/* ─── Sobre mí ─── */}
                            {section === "sobre_mi" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<Users size={10} />} title={t.about} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={sectionImages.sobre_mi[0]}
                                            alt="About"
                                            className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1">
                                            <p className={`text-[8px] ${textClass} leading-relaxed`}>{copy.aboutText}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ─── Portafolio ─── */}
                            {section === "portafolio" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<ImageIcon size={10} />} title={t.portfolio} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="grid grid-cols-4 gap-1">
                                        {sectionImages.portafolio.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt={`Portfolio ${i + 1}`}
                                                className="w-full h-12 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Testimonios ─── */}
                            {section === "testimonios" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<Star size={10} />} title={t.testimonials} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className={`${cardBg} ${style.borderRadius} ${style.shadow} p-3 transition-colors`}>
                                        <div className="flex gap-0.5 mb-1.5">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} size={9} fill={accentColor} color={accentColor} />
                                            ))}
                                        </div>
                                        <p className={`text-[8px] italic ${textClass} leading-relaxed mb-1.5`}>&ldquo;{copy.testimonial.text}&rdquo;</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
                                            <span className={`text-[8px] font-medium ${subtextClass}`}>{copy.testimonial.author}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ─── Precios ─── */}
                            {section === "precios" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<DollarSign size={10} />} title={t.pricing} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {["Básico", "Pro", "Premium"].map((plan, i) => (
                                            <div
                                                key={plan}
                                                className={`${cardBg} ${style.borderRadius} ${style.shadow} p-2 text-center transition-colors`}
                                                style={i === 1 ? { boxShadow: `0 0 0 1px ${accentColor}` } : {}}
                                            >
                                                <div className={`text-[8px] font-medium ${subtextClass}`}>{plan}</div>
                                                <div className={`text-xs font-bold ${textClass} my-1`}>${"$".repeat(i + 1)}</div>
                                                <p className={`text-[7px] ${subtextClass} leading-tight`}>{copy.pricingDesc[i] || ""}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Proceso ─── */}
                            {section === "proceso" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<RefreshCw size={10} />} title={t.process} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="flex items-center gap-1">
                                        {copy.processSteps.map((stepLabel, i) => (
                                            <React.Fragment key={i}>
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <div
                                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                                                        style={{ backgroundColor: accentColor }}
                                                    >
                                                        {i + 1}
                                                    </div>
                                                    <span className={`text-[6px] ${subtextClass} text-center leading-tight w-10`}>{stepLabel}</span>
                                                </div>
                                                {i < copy.processSteps.length - 1 && <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-gray-200"}`} />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Estadísticas ─── */}
                            {section === "estadisticas" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<BarChart3 size={10} />} title={t.stats} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        {[{ n: "150+", l: "Proyectos" }, { n: "98%", l: "Satisfacción" }, { n: "5★", l: "Rating" }].map(({ n, l }) => (
                                            <div key={l}>
                                                <div className="text-sm font-bold" style={{ color: accentColor }}>{n}</div>
                                                <div className={`text-[8px] ${subtextClass}`}>{l}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Equipo ─── */}
                            {section === "equipo" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<Users size={10} />} title={t.team} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="flex justify-center gap-3">
                                        {sectionImages.equipo.map((src, i) => (
                                            <div key={i} className="text-center">
                                                <img src={src} alt={`Team ${i + 1}`} className="w-10 h-10 rounded-full object-cover mx-auto mb-1" />
                                                <p className={`text-[7px] font-medium ${textClass}`}>{copy.teamNames[i] || `Miembro ${i + 1}`}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── FAQ ─── */}
                            {section === "faq" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<HelpCircle size={10} />} title={t.faq} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="space-y-1">
                                        {copy.faqQuestions.map((q, i) => (
                                            <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} p-2 flex items-center justify-between transition-colors`}>
                                                <span className={`text-[8px] ${textClass}`}>{q}</span>
                                                <span className={`text-[10px] ${subtextClass}`}>+</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Clientes ─── */}
                            {section === "clientes" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<Building2 size={10} />} title={t.clients} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="flex justify-center gap-3">
                                        {sectionImages.clientes.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt={`Client ${i + 1}`}
                                                className={`h-5 object-contain ${isDark ? "opacity-50 invert" : "opacity-40 grayscale"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Blog ─── */}
                            {section === "blog" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<FileText size={10} />} title={t.blog} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {sectionImages.blog.map((src, i) => (
                                            <div key={i} className={`${cardBg} ${style.borderRadius} ${style.shadow} overflow-hidden transition-colors`}>
                                                <img src={src} alt={`Blog ${i + 1}`} className="w-full h-10 object-cover" />
                                                <div className="p-1.5">
                                                    <p className={`text-[8px] font-medium ${textClass} leading-tight`}>{copy.blogTitles[i] || `Artículo ${i + 1}`}</p>
                                                    <p className={`text-[7px] ${subtextClass} mt-0.5`}>Leer más →</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Contacto ─── */}
                            {section === "contacto" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<Mail size={10} />} title={t.contact} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <p className={`text-[8px] ${subtextClass} leading-relaxed`}>{copy.contactText}</p>
                                    <div className={`flex gap-4 text-[9px] ${subtextClass}`}>
                                        {email ? (
                                            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 hover:underline ${subtextClass}`}><Mail size={9} /> {email}</a>
                                        ) : (
                                            <span className="flex items-center gap-1"><Mail size={9} /> Email</span>
                                        )}
                                        {phone ? (
                                            <a href={`tel:+${phoneDigits(phone)}`} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 hover:underline ${subtextClass}`}><Phone size={9} /> {phone}</a>
                                        ) : (
                                            <span className="flex items-center gap-1"><Phone size={9} /> Teléfono</span>
                                        )}
                                    </div>
                                    <div className={`${cardBg} ${style.borderRadius} p-2 space-y-1 transition-colors`}>
                                        <div className={`h-5 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                                        <div className={`h-5 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                                        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className={`block h-5 ${style.borderRadius} w-1/3 text-white text-[8px] flex items-center justify-center no-underline`} style={{ backgroundColor: accentColor }}>{t.send}</a>
                                    </div>
                                </div>
                            )}

                            {/* ─── Ubicación ─── */}
                            {section === "ubicacion" && (
                                <div className="space-y-2">
                                    <SectionTitle icon={<MapPin size={10} />} title={t.location} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                                    <div
                                        className="h-20 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${accentColor}08` }}
                                    >
                                        <div className="text-center">
                                            <MapPin size={16} style={{ color: accentColor }} className="mx-auto mb-1" />
                                            <span className={`text-[8px] ${subtextClass}`}>Google Maps</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {activeSections.length === 0 && (
                    <div className="px-6 py-8 text-center">
                        <p className={`text-xs ${subtextClass}`}>Selecciona secciones para ver la vista previa</p>
                    </div>
                )}

                {/* Extra features — wired from the features multiselect */}
                {features.includes("google_maps") && !activeSections.includes("ubicacion") && (
                    <div ref={(el) => { sectionRefs.current["google_maps"] = el; }} className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}>
                        <SectionTitle icon={<MapPin size={10} />} title="Google Maps" color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                        <div className={`h-16 ${style.borderRadius} flex items-center justify-center`} style={{ backgroundColor: `${accentColor}08` }}>
                            <div className="text-center">
                                <MapPin size={14} style={{ color: accentColor }} className="mx-auto mb-0.5" />
                                <span className={`text-[7px] ${subtextClass}`}>Mapa integrado</span>
                            </div>
                        </div>
                    </div>
                )}
                {features.includes("formulario_contacto") && !activeSections.includes("contacto") && (
                    <div ref={(el) => { sectionRefs.current["formulario_contacto"] = el; }} className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}>
                        <SectionTitle icon={<Mail size={10} />} title={t.contact} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                        <div className={`${cardBg} ${style.borderRadius} p-2 space-y-1 transition-colors`}>
                            <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                            <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                            <div className={`h-4 ${style.borderRadius} w-1/3 text-white text-[7px] flex items-center justify-center`} style={{ backgroundColor: accentColor }}>{t.send}</div>
                        </div>
                    </div>
                )}
                {features.includes("formulario_avanzado") && (
                    <div ref={(el) => { sectionRefs.current["formulario_avanzado"] = el; }} className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}>
                        <SectionTitle icon={<FileText size={10} />} title={previewLang === "en" ? "Advanced Form" : "Formulario Avanzado"} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                        <div className={`${cardBg} ${style.borderRadius} p-2 space-y-1 transition-colors`}>
                            <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                            <div className="grid grid-cols-2 gap-1">
                                <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded`} />
                                <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded`} />
                            </div>
                            <div className={`h-8 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                            <div className={`h-4 ${isDark ? "bg-white/5" : "bg-gray-100"} rounded w-full`} />
                            <div className={`h-4 ${style.borderRadius} w-1/3 text-white text-[7px] flex items-center justify-center`} style={{ backgroundColor: accentColor }}>{t.send}</div>
                        </div>
                    </div>
                )}
                {features.includes("agenda") && (
                    <div ref={(el) => { sectionRefs.current["agenda"] = el; }} className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}>
                        <SectionTitle icon={<Calendar size={10} />} title={t.schedule} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                        <div className={`${cardBg} ${style.borderRadius} p-3 text-center transition-colors`}>
                            <Calendar size={16} style={{ color: accentColor }} className="mx-auto mb-1" />
                            <p className={`text-[8px] ${textClass} font-medium mb-1`}>{previewLang === "en" ? "Book your appointment" : "Reserva tu cita"}</p>
                            <div className={`inline-block px-3 py-1 ${style.borderRadius} text-white text-[8px]`} style={{ backgroundColor: accentColor }}>{t.schedule}</div>
                        </div>
                    </div>
                )}
                {features.includes("descargables") && (
                    <div ref={(el) => { sectionRefs.current["descargables"] = el; }} className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}>
                        <SectionTitle icon={<Download size={10} />} title={t.downloads} color={accentColor} textClass={textClass} headingClass={style.headingClass} />
                        <div className={`${cardBg} ${style.borderRadius} p-3 flex items-center gap-3 transition-colors`}>
                            <div className="w-8 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}15` }}>
                                <Download size={14} style={{ color: accentColor }} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-[8px] font-medium ${textClass}`}>{previewLang === "en" ? "Download Catalog" : "Descargar Catálogo"}</p>
                                <p className={`text-[7px] ${subtextClass}`}>PDF — 2.4 MB</p>
                            </div>
                            <div className={`px-2 py-0.5 ${style.borderRadius} text-white text-[7px]`} style={{ backgroundColor: accentColor }}>
                                <Download size={8} className="inline" />
                            </div>
                        </div>
                    </div>
                )}
                {additionalContent && (
                    <div className={`${style.sectionPy} border-b ${dividerColor} transition-all duration-300 animate-fadeIn`}>
                        <div className="flex items-center gap-1.5 mb-1">
                            <FileText size={9} style={{ color: accentColor }} />
                            <span className={`text-[8px] font-medium ${textClass}`}>Contenido Adicional</span>
                        </div>
                        <p className={`text-[7px] ${subtextClass} leading-relaxed line-clamp-2`}>{additionalContent}</p>
                    </div>
                )}

                {/* Footer */}
                <div
                    ref={footerRef}
                    className="px-6 py-3 text-center transition-colors duration-300"
                    style={{ backgroundColor: `${accentColor}10` }}
                >
                    {/* Social indicators */}
                    {hasSocial && (
                        <div className="flex justify-center gap-1.5 mb-2">
                            {normalizedPhone && (
                                <a href={`https://wa.me/${normalizedPhone}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full flex items-center justify-center hover:scale-110 transition-transform no-underline" style={{ backgroundColor: "#25D366" }} title="WhatsApp"><MessageCircle size={8} className="text-white" /></a>
                            )}
                            {instagramUrl && (
                                <a href={instagramUrl.startsWith("http") ? instagramUrl : `https://instagram.com/${instagramUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full bg-pink-500 text-white text-[6px] flex items-center justify-center hover:scale-110 transition-transform no-underline" title="Instagram"><Instagram size={8} /></a>
                            )}
                            {facebookUrl && (
                                <a href={facebookUrl.startsWith("http") ? facebookUrl : `https://facebook.com/${facebookUrl}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full bg-blue-600 text-white text-[6px] flex items-center justify-center hover:scale-110 transition-transform no-underline" title="Facebook"><Facebook size={8} /></a>
                            )}
                            {twitterUrl && (
                                <a href={twitterUrl.startsWith("http") ? twitterUrl : `https://x.com/${twitterUrl.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-4 h-4 rounded-full bg-gray-800 text-white text-[6px] flex items-center justify-center hover:scale-110 transition-transform no-underline" title="X / Twitter"><Twitter size={8} /></a>
                            )}
                        </div>
                    )}
                    <p className={`text-[9px] ${subtextClass}`}>© 2026 {businessName} — Todos los derechos reservados</p>
                </div>
            </div>

            {/* Floating social buttons stack — hides near footer */}
            {features.includes("whatsapp_button") && showFloating && (
                <div className="absolute bottom-4 right-4 flex flex-col-reverse items-center gap-2 transition-opacity duration-300" style={{ opacity: showFloating ? 1 : 0 }}>
                    {/* WhatsApp — always if whatsapp_button feature enabled */}
                    {normalizedPhone ? (
                        <a
                            href={`https://wa.me/${normalizedPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline"
                            style={{ backgroundColor: "#25D366" }}
                            title="WhatsApp"
                        >
                            <MessageCircle size={18} className="text-white" />
                        </a>
                    ) : (
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: "#25D366" }}
                        >
                            <MessageCircle size={18} className="text-white" />
                        </div>
                    )}
                    {/* Instagram */}
                    {instagramUrl && (
                        <a
                            href={instagramUrl.startsWith("http") ? instagramUrl : `https://instagram.com/${instagramUrl.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline"
                            title="Instagram"
                        >
                            <Instagram size={14} className="text-white" />
                        </a>
                    )}
                    {/* Facebook */}
                    {facebookUrl && (
                        <a
                            href={facebookUrl.startsWith("http") ? facebookUrl : `https://facebook.com/${facebookUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline"
                            title="Facebook"
                        >
                            <Facebook size={14} className="text-white" />
                        </a>
                    )}
                    {/* Twitter/X */}
                    {twitterUrl && (
                        <a
                            href={twitterUrl.startsWith("http") ? twitterUrl : `https://x.com/${twitterUrl.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shadow-lg hover:scale-110 transition-transform no-underline"
                            title="X / Twitter"
                        >
                            <Twitter size={14} className="text-white" />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

function SectionTitle({ icon, title, color, textClass, headingClass }: { icon: React.ReactNode; title: string; color: string; textClass: string; headingClass?: string }) {
    return (
        <div className="flex items-center gap-1.5 mb-1">
            <span style={{ color }}>{icon}</span>
            <h4 className={`${headingClass || "text-[10px] font-semibold"} ${textClass}`}>{title}</h4>
        </div>
    );
}
