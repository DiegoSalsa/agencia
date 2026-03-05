'use client';

import Link from 'next/link';
import { ArrowLeft, Globe, Building2, ShoppingCart, Sparkles, Check, ArrowRight } from 'lucide-react';

const TYPES = [
  {
    key: 'LANDING',
    title: 'Landing Page',
    subtitle: 'Impacto inmediato',
    description: 'Página de aterrizaje diseñada para convertir. Ideal para campañas, lanzamientos o captar leads.',
    price: '$220.000',
    currency: 'CLP',
    icon: Globe,
    gradient: 'from-violet-600 to-indigo-600',
    gradientLight: 'from-violet-500/20 to-indigo-500/20',
    glow: 'group-hover:shadow-violet-500/20',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    ring: 'ring-violet-500/30',
    features: ['Hero de alto impacto', 'Hasta 6 secciones', 'Formulario de contacto', 'Diseño responsive'],
  },
  {
    key: 'WEB_CORPORATIVA',
    title: 'Web Corporativa',
    subtitle: 'Presencia profesional',
    description: 'Sitio web multi-página para empresas que buscan credibilidad y presencia digital sólida.',
    price: '$380.000',
    currency: 'CLP',
    icon: Building2,
    gradient: 'from-blue-600 to-cyan-600',
    gradientLight: 'from-blue-500/20 to-cyan-500/20',
    glow: 'group-hover:shadow-blue-500/20',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    ring: 'ring-blue-500/30',
    popular: true,
    features: ['Hasta 10 páginas', 'Blog integrado', 'Panel administrable', 'SEO optimizado'],
  },
  {
    key: 'ECOMMERCE',
    title: 'E-Commerce',
    subtitle: 'Vende en línea',
    description: 'Tienda online completa con catálogo de productos, carrito de compras y pasarela de pagos.',
    price: '$550.000',
    currency: 'CLP',
    icon: ShoppingCart,
    gradient: 'from-emerald-600 to-teal-600',
    gradientLight: 'from-emerald-500/20 to-teal-500/20',
    glow: 'group-hover:shadow-emerald-500/20',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/30',
    features: ['Catálogo ilimitado', 'Carrito & checkout', 'Pasarela de pagos', 'Gestión de inventario'],
  },
];

export default function FormularioPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#07060b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,43,238,0.08),transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/[0.03] rounded-full blur-[100px]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 mb-16 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/20 text-primary text-xs font-medium tracking-wider uppercase mb-8">
            <Sparkles size={12} />
            Cuestionario de Proyecto
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.1]">
            ¿Qué tipo de{' '}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              proyecto
            </span>{' '}
            necesitas?
          </h1>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Selecciona tu proyecto y completa el briefing. Recibirás una cotización personalizada al instante.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {TYPES.map((type, idx) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.key}
                href={`/formulario/${type.key}`}
                className={`group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-2xl ${type.glow}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Popular badge */}
                {type.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${type.gradient} text-white text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-blue-500/25`}>
                      ★ Más popular
                    </div>
                  </div>
                )}

                {/* Top gradient line */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${type.gradientLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + subtitle */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.gradient} p-[1px] shadow-lg shadow-black/20`}>
                      <div className="w-full h-full rounded-2xl bg-[#0d0c14] flex items-center justify-center">
                        <Icon size={22} className="text-white/90" />
                      </div>
                    </div>
                    <span className={`text-[11px] font-medium tracking-wider uppercase ${type.accent} ${type.accentBg} px-2.5 py-1 rounded-md`}>
                      {type.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{type.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed mb-6">{type.description}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {type.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm text-white/50">
                        <Check size={14} className={`${type.accent} shrink-0`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-xs text-white/30 uppercase tracking-wider">Desde</span>
                      <span className="text-3xl font-extrabold text-white tracking-tight">{type.price}</span>
                      <span className="text-sm text-white/30 font-medium">{type.currency}</span>
                    </div>

                    <div className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${type.gradient} opacity-80 group-hover:opacity-100 text-center text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/20 group-hover:shadow-xl`}>
                      Comenzar briefing
                      <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom hint */}
        <p className="text-center text-white/20 text-xs mt-10">
          El briefing toma aproximadamente 5 minutos. Puedes ver una vista previa en tiempo real.
        </p>
      </div>
    </main>
  );
}
