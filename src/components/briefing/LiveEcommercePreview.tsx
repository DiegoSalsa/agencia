"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useBriefingForm } from "@/modules/briefingEngine/context";
import { getStylePreset, StylePreset, readableTextShadow } from "@/lib/stylePresets";
import {
    ShoppingCart, Store, MapPin, User, Heart, Star,
    Search, ChevronRight, Plus, Minus, Trash2, CreditCard,
    Package, Check, Truck, Sun, Moon, Globe,
    ChevronDown, ShoppingBag, ArrowRight, Eye, Filter,
    Grid3X3, LayoutList, Home, FileText, HelpCircle, Mail,
    Shield, Lock, Flame, Landmark, Banknote
} from "lucide-react";

// ── Types ──
interface ProductItem {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    variants?: string[];
    badge?: string;
}

type ViewMode = "storefront" | "flow" | "sitemap";
type FlowStep = "product" | "cart" | "checkout" | "confirmation";

// ── Placeholder products ──
function getPlaceholderProducts(industry: string): ProductItem[] {
    const productSets: Record<string, ProductItem[]> = {
        moda_vestuario: [
            { id: 1, name: "Chaqueta Premium", price: 89990, originalPrice: 119990, image: "", category: "Outerwear", rating: 4.8, reviews: 124, variants: ["S", "M", "L", "XL"], badge: "Oferta" },
            { id: 2, name: "Zapatillas Running", price: 69990, image: "", category: "Calzado", rating: 4.6, reviews: 89, variants: ["38", "39", "40", "41", "42"] },
            { id: 3, name: "Polera Básica", price: 19990, image: "", category: "Camisetas", rating: 4.5, reviews: 256 },
            { id: 4, name: "Jeans Slim Fit", price: 45990, image: "", category: "Pantalones", rating: 4.7, reviews: 178, variants: ["28", "30", "32", "34"] },
            { id: 5, name: "Bolso de Cuero", price: 59990, image: "", category: "Accesorios", rating: 4.9, reviews: 67, badge: "Nuevo" },
            { id: 6, name: "Gorro Beanie", price: 15990, image: "", category: "Accesorios", rating: 4.3, reviews: 45 },
        ],
        tecnologia_electronica: [
            { id: 1, name: "Audífonos Bluetooth", price: 49990, originalPrice: 69990, image: "", category: "Audio", rating: 4.7, reviews: 312, badge: "Oferta" },
            { id: 2, name: "Smartwatch Pro", price: 129990, image: "", category: "Wearables", rating: 4.5, reviews: 189, variants: ["Negro", "Blanco", "Azul"] },
            { id: 3, name: "Teclado Mecánico", price: 79990, image: "", category: "Periféricos", rating: 4.8, reviews: 234 },
            { id: 4, name: "Mouse Gamer", price: 34990, image: "", category: "Periféricos", rating: 4.6, reviews: 156 },
            { id: 5, name: "Webcam HD", price: 39990, image: "", category: "Accesorios", rating: 4.4, reviews: 98, badge: "Nuevo" },
            { id: 6, name: "Hub USB-C", price: 24990, image: "", category: "Accesorios", rating: 4.3, reviews: 67 },
        ],
        default: [
            { id: 1, name: "Producto Destacado", price: 39990, originalPrice: 54990, image: "", category: "Destacados", rating: 4.8, reviews: 156, badge: "Oferta" },
            { id: 2, name: "Producto Premium", price: 79990, image: "", category: "Premium", rating: 4.7, reviews: 89, variants: ["Opción A", "Opción B"] },
            { id: 3, name: "Producto Básico", price: 19990, image: "", category: "Básicos", rating: 4.5, reviews: 234 },
            { id: 4, name: "Producto Nuevo", price: 44990, image: "", category: "Novedades", rating: 4.6, reviews: 45, badge: "Nuevo" },
            { id: 5, name: "Producto Popular", price: 29990, image: "", category: "Populares", rating: 4.9, reviews: 567 },
            { id: 6, name: "Producto Exclusivo", price: 99990, image: "", category: "Exclusivos", rating: 4.8, reviews: 23 },
        ],
    };
    return productSets[industry] || productSets.default;
}

function formatPrice(amount: number): string {
    return `$${amount.toLocaleString("es-CL")}`;
}

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════

export function LiveEcommercePreview() {
    const { formData } = useBriefingForm();
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Extract form data ──
    const businessName = (formData.businessName as string) || "Mi Tienda";
    const industry = (formData.industry as string) || "default";
    const designStyle = (formData.designStyle as string) || "moderno";
    const primaryColor = (formData.primaryColor as string) || "#4361EE";
    const accentColor = (formData.accentColor as string) || primaryColor;
    const pages = (formData.pages as string[]) || [];
    const ecommerceFeatures = (formData.ecommerceFeatures as string[]) || [];
    const marketingFeatures = (formData.marketingFeatures as string[]) || [];
    const paymentMethods = (formData.paymentMethods as string[]) || [];
    const shippingModel = (formData.shippingModel as string) || "";
    const accountSystem = (formData.accountSystem as string) || "";
    const hasVariantsRaw = (formData.hasVariants as string) || "no";
    const categoryCountRaw = (formData.categoryCount as string) || "";

    const hasSearch = ecommerceFeatures.includes("busqueda_inteligente");
    const hasWishlist = ecommerceFeatures.includes("lista_deseos") || ((formData.customerFeatures as string[]) || []).includes("lista_deseos");
    const hasReviews = ecommerceFeatures.includes("resenas_valoraciones");
    const hasFilters = ecommerceFeatures.includes("filtros_avanzados");
    const hasRelated = ecommerceFeatures.includes("productos_relacionados");
    const hasZoom = ecommerceFeatures.includes("zoom_producto");
    const hasDarkMode = ecommerceFeatures.includes("dark_mode");
    const hasMultiLang = ecommerceFeatures.includes("multi_idioma");
    const hasBanners = marketingFeatures.includes("banners_promocionales");
    const hasCoupons = marketingFeatures.includes("codigos_descuento") || ecommerceFeatures.includes("comparador_productos");
    const hasNewsletter = marketingFeatures.includes("newsletter_email");
    const hasVariants = hasVariantsRaw === "si" || hasVariantsRaw === "algunos";

    // ── State ──
    const [viewMode, setViewMode] = useState<ViewMode>("storefront");
    const [isDark, setIsDark] = useState(false);
    const [lang, setLang] = useState<"ES" | "EN">("ES");
    const [flowStep, setFlowStep] = useState<FlowStep>("product");
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
    const [cartItems, setCartItems] = useState<number>(2);
    const [viewGrid, setViewGrid] = useState(true);

    // ── Style preset ──
    const style: StylePreset = useMemo(() => getStylePreset(designStyle, primaryColor), [designStyle, primaryColor]);

    const products = useMemo(() => getPlaceholderProducts(industry), [industry]);

    // Select first product by default
    useEffect(() => {
        if (!selectedProduct) setSelectedProduct(products[0]);
    }, [products, selectedProduct]);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(products.map(p => p.category)));
        return ["Todos", ...cats];
    }, [products]);

    // ── Scroll to top on view mode change ──
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [viewMode, flowStep]);

    const prevViewMode = useRef(viewMode);
    useEffect(() => { prevViewMode.current = viewMode; }, [viewMode]);

    // ── Palette helpers ──
    const bg = isDark ? "#0f172a" : style.bgHex;
    const text = isDark ? "#e2e8f0" : style.textHex;
    const subtext = isDark ? "#94a3b8" : style.subtextHex;
    const card = isDark ? "#1e293b" : style.cardHex;
    const divider = isDark ? "#334155" : style.dividerHex;
    const heroOverlay = isDark ? "rgba(15,23,42,0.8)" : style.heroOverlay;

    // ── Payment method icons ──
    const paymentIcons: Record<string, React.ReactNode> = {
        transbank_webpay: <CreditCard size={10} />,
        mercadopago: <CreditCard size={10} />,
        transferencia_bancaria: <Landmark size={10} />,
        contra_entrega: <Truck size={10} />,
        otro_medio: <Banknote size={10} />,
    };

    const handleProductClick = useCallback((product: ProductItem) => {
        setSelectedProduct(product);
        setViewMode("flow");
        setFlowStep("product");
    }, []);

    // ══════════════════════════════════════════════════════
    // RENDER: Header (shared across views)
    // ══════════════════════════════════════════════════════
    const renderHeader = () => (
        <div style={{ background: card, borderBottom: `1px solid ${divider}` }} className="px-3 py-2">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                    <Store size={14} style={{ color: primaryColor }} />
                    <span className="text-[11px] font-bold truncate max-w-[120px]" style={{ color: text }}>{businessName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    {hasMultiLang && (
                        <button onClick={() => setLang(l => l === "ES" ? "EN" : "ES")} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] opacity-70 hover:opacity-100" style={{ color: subtext }}>
                            <Globe size={10} />{lang}
                        </button>
                    )}
                    {hasDarkMode && (
                        <button onClick={() => setIsDark(d => !d)} className="p-0.5 rounded opacity-70 hover:opacity-100" style={{ color: subtext }}>
                            {isDark ? <Sun size={11} /> : <Moon size={11} />}
                        </button>
                    )}
                    {accountSystem && accountSystem !== "solo_invitado" && (
                        <button className="p-0.5 rounded opacity-60" style={{ color: subtext }}><User size={11} /></button>
                    )}
                    {hasWishlist && (
                        <button className="p-0.5 rounded opacity-60" style={{ color: subtext }}><Heart size={11} /></button>
                    )}
                    <button className="relative p-0.5" style={{ color: primaryColor }}>
                        <ShoppingCart size={13} />
                        {cartItems > 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-[7px] font-bold flex items-center justify-center text-white" style={{ background: accentColor }}>
                                {cartItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>
            {/* Search bar */}
            {hasSearch && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: isDark ? "#334155" : "#f1f5f9" }}>
                    <Search size={10} style={{ color: subtext }} />
                    <span className="text-[9px]" style={{ color: subtext }}>
                        {lang === "ES" ? "Buscar productos..." : "Search products..."}
                    </span>
                </div>
            )}
            {/* Category nav */}
            <div className="flex gap-1.5 mt-1.5 overflow-x-auto scrollbar-hide">
                {categories.slice(0, 5).map((cat, i) => (
                    <span key={cat} className="text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap cursor-pointer transition-colors" style={{
                        background: i === 0 ? primaryColor : "transparent",
                        color: i === 0 ? "#fff" : subtext,
                        border: i === 0 ? "none" : `1px solid ${divider}`,
                    }}>
                        {cat}
                    </span>
                ))}
            </div>
        </div>
    );

    // ══════════════════════════════════════════════════════
    // RENDER: Storefront View
    // ══════════════════════════════════════════════════════
    const renderStorefront = () => (
        <div style={{ background: bg }}>
            {/* Hero / Banner */}
            {hasBanners && (
                <div className="relative h-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${primaryColor}dd, ${accentColor}aa)` }}>
                    <div className="absolute inset-0 flex items-center justify-center text-center p-3" style={{ background: heroOverlay }}>
                        <div>
                            <p className="text-[13px] font-bold text-white mb-0.5" style={{ textShadow: readableTextShadow }}>
                                <span className="inline-flex items-center gap-1"><Flame size={12} /> {lang === "ES" ? "Ofertas de Temporada" : "Season Sale"}</span>
                            </p>
                            <p className="text-[9px] text-white/80 mb-1.5" style={{ textShadow: readableTextShadow }}>
                                {lang === "ES" ? "Hasta 40% de descuento en productos seleccionados" : "Up to 40% off selected items"}
                            </p>
                            <span className="inline-block px-3 py-1 rounded-full text-[8px] font-semibold text-white" style={{ background: accentColor }}>
                                {lang === "ES" ? "Ver ofertas" : "Shop now"} →
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters bar */}
            {hasFilters && (
                <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${divider}` }}>
                    <div className="flex items-center gap-1">
                        <Filter size={9} style={{ color: subtext }} />
                        <span className="text-[8px]" style={{ color: subtext }}>{lang === "ES" ? "Filtrar" : "Filter"}</span>
                        <ChevronDown size={8} style={{ color: subtext }} />
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setViewGrid(true)} className="p-0.5 rounded" style={{ color: viewGrid ? primaryColor : subtext }}>
                            <Grid3X3 size={10} />
                        </button>
                        <button onClick={() => setViewGrid(false)} className="p-0.5 rounded" style={{ color: !viewGrid ? primaryColor : subtext }}>
                            <LayoutList size={10} />
                        </button>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div className={`p-2 ${viewGrid ? "grid grid-cols-2 gap-2" : "space-y-2"}`}>
                {products.map(product => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className={`rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${viewGrid ? "" : "flex gap-2"}`}
                        style={{ background: card, border: `1px solid ${divider}` }}
                    >
                        {/* Image */}
                        <div className={`relative flex items-center justify-center ${viewGrid ? "h-20" : "w-20 h-20 flex-shrink-0"}`} style={{ background: isDark ? "#334155" : "#f8fafc" }}>
                            <Package size={24} style={{ color: subtext }} />
                            {product.badge && (
                                <span className="absolute top-1 left-1 px-1 py-0.5 rounded text-[7px] font-semibold text-white" style={{ background: product.badge === "Oferta" ? "#ef4444" : accentColor }}>{product.badge}</span>
                            )}
                            {hasWishlist && (
                                <button className="absolute top-1 right-1 p-0.5 rounded-full bg-white/80"><Heart size={8} className="text-gray-400" /></button>
                            )}
                        </div>
                        {/* Info */}
                        <div className="p-1.5">
                            <p className="text-[9px] font-medium truncate" style={{ color: text }}>{product.name}</p>
                            <p className="text-[7px] mb-0.5" style={{ color: subtext }}>{product.category}</p>
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold" style={{ color: primaryColor }}>{formatPrice(product.price)}</span>
                                {product.originalPrice && (
                                    <span className="text-[8px] line-through" style={{ color: subtext }}>{formatPrice(product.originalPrice)}</span>
                                )}
                            </div>
                            {hasReviews && (
                                <div className="flex items-center gap-0.5 mt-0.5">
                                    <Star size={7} className="fill-amber-400 text-amber-400" />
                                    <span className="text-[7px]" style={{ color: subtext }}>{product.rating} ({product.reviews})</span>
                                </div>
                            )}
                            {hasVariants && product.variants && (
                                <div className="flex gap-0.5 mt-0.5">
                                    {product.variants.slice(0, 3).map(v => (
                                        <span key={v} className="text-[6px] px-1 py-0.5 rounded" style={{ background: isDark ? "#475569" : "#e2e8f0", color: subtext }}>{v}</span>
                                    ))}
                                    {product.variants.length > 3 && <span className="text-[6px]" style={{ color: subtext }}>+{product.variants.length - 3}</span>}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Newsletter */}
            {hasNewsletter && (
                <div className="mx-2 mb-2 p-3 rounded-lg text-center" style={{ background: isDark ? "#1e293b" : "#f0f4ff", border: `1px solid ${divider}` }}>
                    <Mail size={14} className="mx-auto mb-1" style={{ color: primaryColor }} />
                    <p className="text-[9px] font-semibold mb-0.5" style={{ color: text }}>
                        {lang === "ES" ? "Suscríbete a nuestro newsletter" : "Subscribe to our newsletter"}
                    </p>
                    <p className="text-[7px] mb-1.5" style={{ color: subtext }}>
                        {lang === "ES" ? "Recibe ofertas exclusivas y novedades" : "Get exclusive deals and news"}
                    </p>
                    <div className="flex gap-1">
                        <div className="flex-1 px-2 py-1 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#fff", color: subtext, border: `1px solid ${divider}` }}>
                            email@ejemplo.cl
                        </div>
                        <button className="px-2 py-1 rounded text-[8px] text-white font-medium" style={{ background: primaryColor }}>
                            {lang === "ES" ? "Inscribirse" : "Subscribe"}
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            {renderFooter()}
        </div>
    );

    // ══════════════════════════════════════════════════════
    // RENDER: Purchase Flow View
    // ══════════════════════════════════════════════════════
    const renderFlow = () => {
        const product = selectedProduct || products[0];
        const steps: { key: FlowStep; label: string; labelEn: string }[] = [
            { key: "product", label: "Producto", labelEn: "Product" },
            { key: "cart", label: "Carrito", labelEn: "Cart" },
            { key: "checkout", label: "Pago", labelEn: "Payment" },
            { key: "confirmation", label: "Confirmación", labelEn: "Done" },
        ];

        return (
            <div style={{ background: bg }}>
                {/* Flow breadcrumb */}
                <div className="flex items-center justify-center gap-1 px-3 py-2" style={{ borderBottom: `1px solid ${divider}` }}>
                    {steps.map((s, i) => (
                        <React.Fragment key={s.key}>
                            <button
                                onClick={() => setFlowStep(s.key)}
                                className={`text-[8px] px-1.5 py-0.5 rounded-full transition-colors ${flowStep === s.key ? "font-semibold" : "opacity-60"}`}
                                style={{
                                    background: flowStep === s.key ? primaryColor : "transparent",
                                    color: flowStep === s.key ? "#fff" : subtext,
                                }}
                            >
                                {lang === "ES" ? s.label : s.labelEn}
                            </button>
                            {i < steps.length - 1 && <ChevronRight size={8} style={{ color: subtext }} />}
                        </React.Fragment>
                    ))}
                </div>

                {flowStep === "product" && renderProductDetail(product)}
                {flowStep === "cart" && renderCart(product)}
                {flowStep === "checkout" && renderCheckout()}
                {flowStep === "confirmation" && renderConfirmation()}
            </div>
        );
    };

    const renderProductDetail = (product: ProductItem) => (
        <div className="p-2" style={{ color: text }}>
            {/* Product image */}
            <div className="relative rounded-lg flex items-center justify-center h-32 mb-2" style={{ background: isDark ? "#334155" : "#f8fafc" }}>
                <Package size={48} style={{ color: subtext }} />
                {hasZoom && (
                    <button className="absolute bottom-1.5 right-1.5 p-1 rounded-full" style={{ background: `${primaryColor}20` }}>
                        <Eye size={10} style={{ color: primaryColor }} />
                    </button>
                )}
                {product.badge && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-semibold text-white" style={{ background: product.badge === "Oferta" ? "#ef4444" : accentColor }}>{product.badge}</span>
                )}
            </div>

            {/* Product info */}
            <p className="text-[7px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>{product.category}</p>
            <h3 className="text-[13px] font-bold mb-1">{product.name}</h3>

            {hasReviews && (
                <div className="flex items-center gap-1 mb-1.5">
                    <div className="flex">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={9} className={i <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"} />)}</div>
                    <span className="text-[8px]" style={{ color: subtext }}>{product.rating} ({product.reviews} {lang === "ES" ? "reseñas" : "reviews"})</span>
                </div>
            )}

            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[16px] font-bold" style={{ color: primaryColor }}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                    <>
                        <span className="text-[11px] line-through" style={{ color: subtext }}>{formatPrice(product.originalPrice)}</span>
                        <span className="text-[8px] px-1 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                    </>
                )}
            </div>

            {/* Variants */}
            {hasVariants && product.variants && (
                <div className="mb-2">
                    <p className="text-[8px] font-medium mb-1" style={{ color: subtext }}>{lang === "ES" ? "Variante:" : "Variant:"}</p>
                    <div className="flex gap-1 flex-wrap">
                        {product.variants.map((v, i) => (
                            <span key={v} className="text-[8px] px-2 py-0.5 rounded-md cursor-pointer" style={{
                                background: i === 0 ? primaryColor : "transparent",
                                color: i === 0 ? "#fff" : text,
                                border: `1px solid ${i === 0 ? primaryColor : divider}`,
                            }}>{v}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-2 mb-2">
                <p className="text-[8px]" style={{ color: subtext }}>{lang === "ES" ? "Cantidad:" : "Qty:"}</p>
                <div className="flex items-center rounded-md overflow-hidden" style={{ border: `1px solid ${divider}` }}>
                    <button className="px-1.5 py-0.5" style={{ color: subtext }}><Minus size={8} /></button>
                    <span className="px-2 text-[9px] font-medium" style={{ color: text }}>1</span>
                    <button className="px-1.5 py-0.5" style={{ color: subtext }}><Plus size={8} /></button>
                </div>
            </div>

            {/* Description */}
            <p className="text-[8px] leading-relaxed mb-3" style={{ color: subtext }}>
                {lang === "ES"
                    ? "Producto de alta calidad, fabricado con los mejores materiales. Perfecto para el día a día. Satisfacción garantizada."
                    : "High-quality product made with the finest materials. Perfect for everyday use. Satisfaction guaranteed."}
            </p>

            {/* Action buttons */}
            <div className="flex gap-1.5">
                <button
                    onClick={() => { setCartItems(c => c + 1); setFlowStep("cart"); }}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-semibold text-white transition-transform hover:scale-[1.02]"
                    style={{ background: accentColor }}
                >
                    <ShoppingCart size={11} />
                    {lang === "ES" ? "Agregar al carrito" : "Add to cart"}
                </button>
                {hasWishlist && (
                    <button className="px-2 py-2 rounded-lg" style={{ border: `1px solid ${divider}`, color: subtext }}>
                        <Heart size={12} />
                    </button>
                )}
            </div>

            {/* Shipping info */}
            {shippingModel && shippingModel !== "solo_digital" && (
                <div className="mt-2 p-2 rounded-lg flex items-center gap-1.5" style={{ background: isDark ? "#1e3a5f20" : "#f0f4ff", border: `1px solid ${divider}` }}>
                    <Truck size={10} style={{ color: primaryColor }} />
                    <span className="text-[8px]" style={{ color: subtext }}>
                        {shippingModel === "gratis_sobre_monto" ? (lang === "ES" ? "Envío gratis sobre monto mínimo" : "Free shipping over minimum order") :
                            shippingModel === "tarifa_plana" ? (lang === "ES" ? "Envío a tarifa plana" : "Flat rate shipping") :
                                lang === "ES" ? "Envío disponible" : "Shipping available"}
                    </span>
                </div>
            )}

            {/* Related products */}
            {hasRelated && (
                <div className="mt-3">
                    <p className="text-[9px] font-semibold mb-1.5" style={{ color: text }}>
                        {lang === "ES" ? "Productos relacionados" : "Related products"}
                    </p>
                    <div className="flex gap-1.5 overflow-x-auto">
                        {products.filter(p => p.id !== product.id).slice(0, 3).map(p => (
                            <div key={p.id} onClick={() => setSelectedProduct(p)} className="flex-shrink-0 w-20 rounded-md overflow-hidden cursor-pointer" style={{ background: card, border: `1px solid ${divider}` }}>
                                <div className="h-12 flex items-center justify-center" style={{ background: isDark ? "#334155" : "#f8fafc" }}>
                                    <Package size={18} style={{ color: subtext }} />
                                </div>
                                <div className="p-1">
                                    <p className="text-[7px] truncate" style={{ color: text }}>{p.name}</p>
                                    <p className="text-[7px] font-bold" style={{ color: primaryColor }}>{formatPrice(p.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderCart = (product: ProductItem) => (
        <div className="p-2" style={{ color: text }}>
            <h3 className="text-[11px] font-bold mb-2 flex items-center gap-1">
                <ShoppingBag size={12} style={{ color: primaryColor }} />
                {lang === "ES" ? "Tu Carrito" : "Your Cart"} ({cartItems})
            </h3>

            {/* Cart items */}
            {[product, products[1]].map((item, i) => (
                <div key={i} className="flex gap-2 p-1.5 rounded-lg mb-1.5" style={{ background: card, border: `1px solid ${divider}` }}>
                    <div className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0" style={{ background: isDark ? "#334155" : "#f8fafc" }}>
                        <Package size={18} style={{ color: subtext }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium truncate">{item.name}</p>
                        <p className="text-[7px]" style={{ color: subtext }}>{hasVariants && item.variants ? item.variants[0] : item.category}</p>
                        <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-1 rounded" style={{ border: `1px solid ${divider}` }}>
                                <button className="px-1 py-0.5"><Minus size={7} style={{ color: subtext }} /></button>
                                <span className="text-[8px] px-1">{i === 0 ? 1 : 1}</span>
                                <button className="px-1 py-0.5"><Plus size={7} style={{ color: subtext }} /></button>
                            </div>
                            <span className="text-[9px] font-bold" style={{ color: primaryColor }}>{formatPrice(item.price)}</span>
                        </div>
                    </div>
                    <button className="self-start p-0.5" style={{ color: subtext }}><Trash2 size={9} /></button>
                </div>
            ))}

            {/* Coupon */}
            {hasCoupons && (
                <div className="flex gap-1 mb-2">
                    <div className="flex-1 px-2 py-1 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#f8fafc", color: subtext, border: `1px solid ${divider}` }}>
                        {lang === "ES" ? "Código de descuento" : "Discount code"}
                    </div>
                    <button className="px-2 py-1 rounded text-[8px] font-medium text-white" style={{ background: primaryColor }}>
                        {lang === "ES" ? "Aplicar" : "Apply"}
                    </button>
                </div>
            )}

            {/* Summary */}
            <div className="p-2 rounded-lg space-y-1" style={{ background: isDark ? "#0f172a" : "#f8fafc", border: `1px solid ${divider}` }}>
                <div className="flex justify-between text-[8px]">
                    <span style={{ color: subtext }}>Subtotal</span>
                    <span style={{ color: text }}>{formatPrice(product.price + products[1].price)}</span>
                </div>
                <div className="flex justify-between text-[8px]">
                    <span style={{ color: subtext }}>{lang === "ES" ? "Envío" : "Shipping"}</span>
                    <span style={{ color: subtext }}>{lang === "ES" ? "Calculado al pagar" : "Calculated at checkout"}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold pt-1" style={{ borderTop: `1px solid ${divider}` }}>
                    <span>Total</span>
                    <span style={{ color: primaryColor }}>{formatPrice(product.price + products[1].price)}</span>
                </div>
            </div>

            <button
                onClick={() => setFlowStep("checkout")}
                className="w-full mt-2 py-2 rounded-lg text-[10px] font-semibold text-white flex items-center justify-center gap-1"
                style={{ background: accentColor }}
            >
                {lang === "ES" ? "Ir a pagar" : "Proceed to checkout"} <ArrowRight size={10} />
            </button>
        </div>
    );

    const renderCheckout = () => (
        <div className="p-2" style={{ color: text }}>
            <h3 className="text-[11px] font-bold mb-2 flex items-center gap-1">
                <CreditCard size={12} style={{ color: primaryColor }} />
                {lang === "ES" ? "Checkout" : "Checkout"}
            </h3>

            {/* Account option */}
            {(accountSystem === "ambos_registro_e_invitado" || accountSystem === "solo_invitado") && (
                <div className="flex gap-1 mb-2">
                    <button className="flex-1 py-1 rounded text-[8px] font-medium text-white" style={{ background: primaryColor }}>
                        {lang === "ES" ? "Comprar como invitado" : "Guest checkout"}
                    </button>
                    {accountSystem === "ambos_registro_e_invitado" && (
                        <button className="flex-1 py-1 rounded text-[8px]" style={{ border: `1px solid ${divider}`, color: subtext }}>
                            {lang === "ES" ? "Iniciar sesión" : "Sign in"}
                        </button>
                    )}
                </div>
            )}

            {/* Contact */}
            <div className="space-y-1.5 mb-2">
                <p className="text-[8px] font-semibold" style={{ color: subtext }}>{lang === "ES" ? "DATOS DE CONTACTO" : "CONTACT INFO"}</p>
                <div className="px-2 py-1.5 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#f8fafc", border: `1px solid ${divider}`, color: subtext }}>nombre@email.cl</div>
                <div className="px-2 py-1.5 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#f8fafc", border: `1px solid ${divider}`, color: subtext }}>+56 9 XXXX XXXX</div>
            </div>

            {/* Shipping address */}
            {shippingModel && shippingModel !== "solo_digital" && shippingModel !== "retiro_en_tienda" && (
                <div className="space-y-1.5 mb-2">
                    <p className="text-[8px] font-semibold" style={{ color: subtext }}>{lang === "ES" ? "DIRECCIÓN DE ENVÍO" : "SHIPPING ADDRESS"}</p>
                    <div className="px-2 py-1.5 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#f8fafc", border: `1px solid ${divider}`, color: subtext }}>Av. Providencia 1234, Depto 567</div>
                    <div className="flex gap-1">
                        <div className="flex-1 px-2 py-1.5 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#f8fafc", border: `1px solid ${divider}`, color: subtext }}>Santiago</div>
                        <div className="flex-1 px-2 py-1.5 rounded text-[8px]" style={{ background: isDark ? "#334155" : "#f8fafc", border: `1px solid ${divider}`, color: subtext }}>RM</div>
                    </div>
                </div>
            )}

            {/* Shipping method */}
            {shippingModel && shippingModel !== "solo_digital" && (
                <div className="mb-2">
                    <p className="text-[8px] font-semibold mb-1" style={{ color: subtext }}>{lang === "ES" ? "MÉTODO DE ENVÍO" : "SHIPPING METHOD"}</p>
                    <div className="p-1.5 rounded flex items-center gap-1.5" style={{ background: `${primaryColor}10`, border: `1px solid ${primaryColor}40` }}>
                        <Truck size={10} style={{ color: primaryColor }} />
                        <div className="flex-1">
                            <p className="text-[8px] font-medium" style={{ color: text }}>
                                {shippingModel === "tarifa_plana" ? (lang === "ES" ? "Envío estándar" : "Standard shipping") :
                                    shippingModel === "gratis_sobre_monto" ? (lang === "ES" ? "Envío gratis" : "Free shipping") :
                                        lang === "ES" ? "Envío calculado" : "Calculated shipping"}
                            </p>
                            <p className="text-[7px]" style={{ color: subtext }}>3-5 {lang === "ES" ? "días hábiles" : "business days"}</p>
                        </div>
                        <span className="text-[8px] font-medium" style={{ color: primaryColor }}>
                            {shippingModel === "gratis_sobre_monto" ? (lang === "ES" ? "Gratis" : "Free") : "$4.990"}
                        </span>
                    </div>
                </div>
            )}

            {/* Payment */}
            <div className="mb-2">
                <p className="text-[8px] font-semibold mb-1" style={{ color: subtext }}>{lang === "ES" ? "MÉTODO DE PAGO" : "PAYMENT METHOD"}</p>
                <div className="space-y-1">
                    {paymentMethods.length > 0 ? paymentMethods.map((pm, i) => {
                        const labels: Record<string, string> = {
                            transbank_webpay: "Transbank Webpay",
                            mercadopago: "MercadoPago",
                            transferencia_bancaria: lang === "ES" ? "Transferencia" : "Bank Transfer",
                            contra_entrega: lang === "ES" ? "Contra entrega" : "Cash on delivery",
                            otro_medio: lang === "ES" ? "Otro" : "Other",
                        };
                        return (
                            <div key={pm} className="flex items-center gap-1.5 p-1.5 rounded cursor-pointer" style={{
                                background: i === 0 ? `${primaryColor}10` : "transparent",
                                border: `1px solid ${i === 0 ? primaryColor + "40" : divider}`,
                            }}>
                                <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ border: `1.5px solid ${i === 0 ? primaryColor : subtext}` }}>
                                    {i === 0 && <div className="w-1.5 h-1.5 rounded-full" style={{ background: primaryColor }} />}
                                </div>
                                <span className="text-[8px] flex items-center">{paymentIcons[pm] || <Banknote size={8} />}</span>
                                <span className="text-[8px]" style={{ color: text }}>{labels[pm] || pm}</span>
                            </div>
                        );
                    }) : (
                        <div className="p-1.5 rounded text-[8px] text-center" style={{ background: isDark ? "#334155" : "#f8fafc", color: subtext }}>{lang === "ES" ? "Configura métodos de pago" : "Configure payment methods"}</div>
                    )}
                </div>
            </div>

            <button
                onClick={() => setFlowStep("confirmation")}
                className="w-full py-2 rounded-lg text-[10px] font-semibold text-white flex items-center justify-center gap-1"
                style={{ background: accentColor }}
            >
                {lang === "ES" ? "Confirmar pedido" : "Place order"} <Shield size={10} />
            </button>
        </div>
    );

    const renderConfirmation = () => (
        <div className="p-4 text-center" style={{ color: text }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: "#22c55e20" }}>
                <Check size={24} className="text-green-500" />
            </div>
            <h3 className="text-[14px] font-bold mb-1">
                {lang === "ES" ? "¡Pedido confirmado!" : "Order confirmed!"}
            </h3>
            <p className="text-[9px] mb-3" style={{ color: subtext }}>
                {lang === "ES" ? "Te hemos enviado un email con los detalles de tu compra." : "We've sent you an email with your order details."}
            </p>

            <div className="p-2.5 rounded-lg text-left mb-3" style={{ background: card, border: `1px solid ${divider}` }}>
                <div className="flex items-center gap-1.5 mb-2">
                    <Package size={12} style={{ color: primaryColor }} />
                    <span className="text-[9px] font-semibold">{lang === "ES" ? "Pedido #12345" : "Order #12345"}</span>
                </div>
                <div className="space-y-1 text-[8px]" style={{ color: subtext }}>
                    <div className="flex justify-between">
                        <span>{lang === "ES" ? "Estado" : "Status"}</span>
                        <span className="text-green-500 font-medium">{lang === "ES" ? "Confirmado" : "Confirmed"}</span>
                    </div>
                    {shippingModel && shippingModel !== "solo_digital" && (
                        <div className="flex justify-between">
                            <span>{lang === "ES" ? "Envío estimado" : "Est. delivery"}</span>
                            <span style={{ color: text }}>3-5 {lang === "ES" ? "días hábiles" : "business days"}</span>
                        </div>
                    )}
                </div>
            </div>

            {pages.includes("tracking_pedidos") && (
                <button className="w-full py-1.5 rounded-lg text-[9px] font-medium mb-1.5" style={{ border: `1px solid ${primaryColor}`, color: primaryColor }}>
                    <Truck size={10} className="inline mr-1" />{lang === "ES" ? "Seguir mi pedido" : "Track order"}
                </button>
            )}
            <button
                onClick={() => { setViewMode("storefront"); setFlowStep("product"); }}
                className="w-full py-1.5 rounded-lg text-[9px] font-medium text-white"
                style={{ background: primaryColor }}
            >
                {lang === "ES" ? "Seguir comprando" : "Continue shopping"}
            </button>
        </div>
    );

    // ══════════════════════════════════════════════════════
    // RENDER: Sitemap View
    // ══════════════════════════════════════════════════════
    const renderSitemap = () => {
        const PAGE_ICONS: Record<string, React.ReactNode> = {
            inicio: <Home size={10} />,
            catalogo: <ShoppingBag size={10} />,
            producto_detalle: <Package size={10} />,
            carrito: <ShoppingCart size={10} />,
            checkout: <CreditCard size={10} />,
            cuenta_usuario: <User size={10} />,
            nosotros: <Store size={10} />,
            contacto: <Mail size={10} />,
            blog: <FileText size={10} />,
            faq: <HelpCircle size={10} />,
            politicas: <Shield size={10} />,
            tracking_pedidos: <Truck size={10} />,
        };
        const PAGE_LABELS: Record<string, string> = {
            inicio: "Inicio",
            catalogo: "Catálogo",
            producto_detalle: "Producto",
            carrito: "Carrito",
            checkout: "Checkout",
            cuenta_usuario: "Mi Cuenta",
            nosotros: "Nosotros",
            contacto: "Contacto",
            blog: "Blog",
            faq: "FAQ",
            politicas: "Políticas",
            tracking_pedidos: "Tracking",
        };

        // Build tree
        const coreFlow = ["inicio", "catalogo", "producto_detalle", "carrito", "checkout"].filter(p => pages.includes(p) || ["inicio", "catalogo", "producto_detalle", "carrito", "checkout"].includes(p));
        const userPages = ["cuenta_usuario", "tracking_pedidos"].filter(p => pages.includes(p));
        const infoPages = ["nosotros", "contacto", "blog", "faq", "politicas"].filter(p => pages.includes(p));

        const SitemapNode = ({ pageId, children, isLast = false }: { pageId: string; children?: React.ReactNode; isLast?: boolean }) => (
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[8px] font-medium cursor-pointer hover:scale-105 transition-transform" style={{ background: card, border: `1px solid ${divider}`, color: text }}>
                    <span style={{ color: primaryColor }}>{PAGE_ICONS[pageId]}</span>
                    {PAGE_LABELS[pageId] || pageId}
                </div>
                {children && (
                    <div className="flex flex-col items-center">
                        {!isLast && <div className="w-px h-2" style={{ background: divider }} />}
                        {children}
                    </div>
                )}
            </div>
        );

        return (
            <div className="p-3 overflow-auto" style={{ background: bg, color: text, minHeight: 300 }}>
                <p className="text-[9px] font-bold text-center mb-3" style={{ color: primaryColor }}>
                    {lang === "ES" ? "Mapa del Sitio" : "Sitemap"} — {businessName}
                </p>

                {/* Main flow: vertical */}
                <div className="flex flex-col items-center gap-0">
                    {coreFlow.map((p, i) => (
                        <React.Fragment key={p}>
                            <SitemapNode pageId={p} isLast={i === coreFlow.length - 1 && userPages.length === 0 && infoPages.length === 0} />
                            {i < coreFlow.length - 1 && <div className="w-px h-2" style={{ background: divider }} />}
                            {/* Branch off at catalogo for categories */}
                            {p === "catalogo" && categoryCountRaw && (
                                <div className="flex items-start gap-2 my-0.5">
                                    <div className="w-6 h-px mt-2.5" style={{ background: divider }} />
                                    <div className="flex flex-col gap-1">
                                        {["Categoría 1", "Categoría 2", "..."].slice(0, categoryCountRaw === "1_3" ? 2 : 3).map((cat, ci) => (
                                            <div key={ci} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[7px]" style={{ background: `${primaryColor}10`, border: `1px solid ${primaryColor}20`, color: subtext }}>
                                                <Grid3X3 size={7} style={{ color: primaryColor }} />
                                                {cat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Side branches */}
                {(userPages.length > 0 || infoPages.length > 0) && (
                    <div className="flex justify-center gap-4 mt-3">
                        {userPages.length > 0 && (
                            <div>
                                <p className="text-[7px] font-semibold text-center mb-1" style={{ color: subtext }}>
                                    {lang === "ES" ? "USUARIO" : "USER"}
                                </p>
                                <div className="space-y-1">
                                    {userPages.map(p => <SitemapNode key={p} pageId={p} />)}
                                </div>
                            </div>
                        )}
                        {infoPages.length > 0 && (
                            <div>
                                <p className="text-[7px] font-semibold text-center mb-1" style={{ color: subtext }}>
                                    {lang === "ES" ? "INFO" : "INFO"}
                                </p>
                                <div className="space-y-1">
                                    {infoPages.map(p => <SitemapNode key={p} pageId={p} />)}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Features summary */}
                {ecommerceFeatures.length > 0 && (
                    <div className="mt-4 p-2 rounded-lg" style={{ background: card, border: `1px solid ${divider}` }}>
                        <p className="text-[7px] font-semibold mb-1" style={{ color: primaryColor }}>
                            {lang === "ES" ? "FUNCIONALIDADES ACTIVAS" : "ACTIVE FEATURES"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {ecommerceFeatures.map(f => (
                                <span key={f} className="text-[6px] px-1.5 py-0.5 rounded-full" style={{ background: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                                    {f.replace(/_/g, " ")}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ══════════════════════════════════════════════════════
    // RENDER: Footer
    // ══════════════════════════════════════════════════════
    const renderFooter = () => (
        <div className="px-3 py-3 text-center" style={{ background: isDark ? "#0f172a" : "#f8fafc", borderTop: `1px solid ${divider}` }}>
            <p className="text-[9px] font-medium mb-1" style={{ color: text }}>{businessName}</p>
            <div className="flex justify-center gap-2 mb-1.5">
                {pages.includes("nosotros") && <span className="text-[7px] cursor-pointer hover:underline" style={{ color: subtext }}>{lang === "ES" ? "Nosotros" : "About"}</span>}
                {pages.includes("contacto") && <span className="text-[7px] cursor-pointer hover:underline" style={{ color: subtext }}>{lang === "ES" ? "Contacto" : "Contact"}</span>}
                {pages.includes("faq") && <span className="text-[7px] cursor-pointer hover:underline" style={{ color: subtext }}>FAQ</span>}
                {pages.includes("politicas") && <span className="text-[7px] cursor-pointer hover:underline" style={{ color: subtext }}>{lang === "ES" ? "Políticas" : "Policies"}</span>}
            </div>
            {/* Payment method icons */}
            {paymentMethods.length > 0 && (
                <div className="flex justify-center gap-1.5 mb-1">
                    {paymentMethods.map(pm => (
                        <span key={pm} className="text-[10px] flex items-center">{paymentIcons[pm] || <Banknote size={10} />}</span>
                    ))}
                </div>
            )}
            <p className="text-[7px]" style={{ color: subtext }}>© 2026 {businessName}. {lang === "ES" ? "Todos los derechos reservados." : "All rights reserved."}</p>
        </div>
    );

    // ══════════════════════════════════════════════════════
    // MAIN RENDER
    // ══════════════════════════════════════════════════════
    return (
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 border-b border-white/10">
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-slate-700/60 rounded-md px-2 py-0.5 flex items-center gap-1">
                    <Lock size={9} className="text-green-400" />
                    <span className="text-[9px] text-white/50 truncate">
                        {formData.domainName || `${businessName.toLowerCase().replace(/\s+/g, "")}.cl`}
                        {viewMode === "flow" ? `/${flowStep === "product" ? "producto" : flowStep}` : viewMode === "sitemap" ? "/sitemap" : ""}
                    </span>
                </div>
            </div>

            {/* View mode tabs */}
            <div className="flex border-b border-white/10 bg-slate-800/50">
                {[
                    { key: "storefront" as ViewMode, label: "Tienda", icon: <Store size={10} /> },
                    { key: "flow" as ViewMode, label: "Flujo de Compra", icon: <ShoppingCart size={10} /> },
                    { key: "sitemap" as ViewMode, label: "Mapa del Sitio", icon: <MapPin size={10} /> },
                ].map(tab => (
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

            {/* Content */}
            <div ref={containerRef} className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/10" style={{ maxHeight: 500 }}>
                {viewMode !== "sitemap" && renderHeader()}
                {viewMode === "storefront" && renderStorefront()}
                {viewMode === "flow" && renderFlow()}
                {viewMode === "sitemap" && renderSitemap()}
            </div>
        </div>
    );
}
