'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Building2, ShoppingCart, Check, ArrowRight, Sparkles, Flame, Clock, Users } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { getRegionalPrice, getOriginalPrice, type PlanKey } from '@/lib/i18n';
import { useInView } from '@/hooks/useInView';

interface ActivePromo {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  originalPrice: number;
  remainingSlots: number;
  totalSlots: number;
  bannerText: string | null;
  showPricingCard: boolean;
  endsAt: string | null;
}

const plans = [
  {
    key: 'landing' as PlanKey,
    nameKey: 'plan_landing',
    descKey: 'plan_landing_desc',
    subtitleKey: 'plan_landing_subtitle',
    briefingType: 'landing',
    icon: Globe,
    gradient: 'from-violet-600 to-indigo-600',
    gradientLight: 'from-violet-500/20 to-indigo-500/20',
    glow: 'group-hover:shadow-violet-500/20',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-500/10',
    popular: false,
    features: ['feature_hosting', 'feature_responsive', 'feature_seo', 'feature_form'],
  },
  {
    key: 'corporate' as PlanKey,
    nameKey: 'plan_corp',
    descKey: 'plan_corp_desc',
    subtitleKey: 'plan_corp_subtitle',
    briefingType: 'web-corporativa',
    icon: Building2,
    gradient: 'from-blue-600 to-cyan-600',
    gradientLight: 'from-blue-500/20 to-cyan-500/20',
    glow: 'group-hover:shadow-blue-500/20',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    popular: true,
    features: ['feature_hosting', 'feature_sections', 'feature_social', 'feature_support'],
  },
  {
    key: 'ecommerce' as PlanKey,
    nameKey: 'plan_ecommerce',
    descKey: 'plan_ecommerce_desc',
    subtitleKey: 'plan_ecommerce_subtitle',
    briefingType: 'ecommerce',
    icon: ShoppingCart,
    gradient: 'from-emerald-600 to-teal-600',
    gradientLight: 'from-emerald-500/20 to-teal-500/20',
    glow: 'group-hover:shadow-emerald-500/20',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    popular: false,
    features: ['feature_hosting', 'feature_payments', 'feature_admin', 'feature_inventory', 'feature_support_6'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

export default function Pricing() {
  const { t, currency } = useI18n();
  const { ref, isVisible } = useInView();
  const [promo, setPromo] = useState<ActivePromo | null>(null);

  useEffect(() => {
    fetch('/api/promotions/active')
      .then(r => r.json())
      .then((promos: ActivePromo[]) => {
        const p = promos.find(p => p.showPricingCard);
        if (p) setPromo(p);
      })
      .catch(() => {});
  }, []);

  const discountPercent = promo ? Math.round((1 - promo.price / promo.originalPrice) * 100) : 0;
  const daysLeft = promo?.endsAt ? Math.max(0, Math.ceil((new Date(promo.endsAt).getTime() - Date.now()) / 86400000)) : null;

  return (
    <section id="planes" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Always-dark background */}
      <div className="absolute inset-0 bg-[#07060b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(75,43,238,0.1),transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
      {/* Grid pattern for dark section */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      {/* Extra glow */}
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_55%)]" />
      {/* Floating shapes */}
      <svg className="geo-float absolute top-16 left-[6%] w-24 h-24 opacity-[0.04]" style={{ animationDelay: '0.5s' }} viewBox="0 0 100 100" fill="none">
        <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="white" strokeWidth="2" />
      </svg>
      <svg className="geo-float absolute bottom-[20%] right-[15%] w-16 h-16 opacity-[0.03]" style={{ animationDelay: '4s' }} viewBox="0 0 100 100" fill="none">
        <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="white" strokeWidth="3" />
      </svg>
      <div className="geo-float absolute bottom-16 right-[8%] w-14 h-14 border border-white/[0.06] rotate-[20deg] rounded-lg" style={{ animationDelay: '3s' }} />
      <div className="geo-float absolute top-[45%] left-[3%] w-10 h-10 border border-white/[0.05] -rotate-[15deg] rounded-sm" style={{ animationDelay: '2s' }} />
      {/* Gradient line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/[0.08] border border-violet-500/20 text-violet-400 text-xs font-medium tracking-wider uppercase mb-6">
            <Sparkles size={12} />
            {t('pricing_tag')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t('pricing_title')}
          </h2>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t('pricing_subtitle')}
          </p>
        </motion.div>

        {/* Promo Card */}
        {promo && (
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.5}
            className="mb-8"
          >
            <Link
              href="/formulario/oferta"
              className="group relative block rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-emerald-900/20 to-teal-950/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

              {/* Badge */}
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
                <div className="px-5 py-1.5 rounded-b-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-emerald-500/25 flex items-center gap-1.5">
                  <Flame className="w-3 h-3" /> Oferta Especial
                </div>
              </div>

              <div className="p-8 pt-10 flex flex-col md:flex-row items-center gap-8">
                {/* Left: Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                    {promo.title}
                  </h3>
                  {promo.description && (
                    <p className="text-white/40 text-sm mb-4 max-w-lg">{promo.description}</p>
                  )}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                    {promo.remainingSlots > 0 && (
                      <span className="flex items-center gap-1.5 text-emerald-400/80">
                        <Users size={14} />
                        <span className="font-semibold">{promo.remainingSlots}</span> cupos restantes
                      </span>
                    )}
                    {daysLeft !== null && (
                      <span className="flex items-center gap-1.5 text-amber-400/80">
                        <Clock size={14} />
                        {daysLeft > 0 ? `${daysLeft} días restantes` : 'Último día'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Price + CTA */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className="flex items-center gap-2 justify-center mb-1">
                      <span className="text-lg text-white/30 line-through decoration-red-400/60">
                        ${promo.originalPrice.toLocaleString('es-CL')}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
                        -{discountPercent}%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5 justify-center">
                      <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        ${promo.price.toLocaleString('es-CL')}
                      </span>
                      <span className="text-sm text-white/30 font-medium">CLP</span>
                    </div>
                  </div>
                  <div className="w-full py-3 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-90 group-hover:opacity-100 text-center text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 group-hover:shadow-xl">
                    Aprovechar oferta
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.key}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
              <Link
                href={`/formulario/${plan.briefingType}`}
                className={`group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-2xl ${plan.glow} cursor-pointer h-full`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`px-4 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-blue-500/25 flex items-center gap-1`}
                    >
                      <Sparkles className="w-3 h-3" /> {t('pricing_popular')}
                    </div>
                  </div>
                )}

                {/* Top gradient line */}
                <div
                  className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${plan.gradientLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + subtitle */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} p-[1px] shadow-lg shadow-black/20`}
                    >
                      <div className="w-full h-full rounded-2xl bg-[#0d0c14] flex items-center justify-center">
                        <Icon size={22} className="text-white/90" />
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-medium tracking-wider uppercase ${plan.accent} ${plan.accentBg} px-2.5 py-1 rounded-md`}
                    >
                      {t(plan.subtitleKey)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {t(plan.nameKey)}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed mb-6">{t(plan.descKey)}</p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((fKey) => (
                      <li key={fKey} className="flex items-center gap-2.5 text-sm text-white/50">
                        <Check size={14} className={`${plan.accent} shrink-0`} />
                        {t(fKey)}
                      </li>
                    ))}
                  </ul>

                  {/* Price + discount + CTA */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-xs text-white/30 uppercase tracking-wider">
                        {t('pricing_from')}
                      </span>
                      <span className="text-sm text-white/30 line-through decoration-red-400/60">
                        {getOriginalPrice(plan.key, currency)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl font-extrabold text-white tracking-tight">
                        {getRegionalPrice(plan.key, currency)}
                      </span>
                      <span className="text-sm text-white/30 font-medium">{currency}</span>
                      <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        -40%
                      </span>
                    </div>
                    <p className="text-[11px] text-white/25 mb-4">
                      {t('pricing_payment_note')}
                    </p>

                    <div
                      className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${plan.gradient} opacity-80 group-hover:opacity-100 text-center text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/20 group-hover:shadow-xl`}
                    >
                      {t('pricing_cta')}
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
