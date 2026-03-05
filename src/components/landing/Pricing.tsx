'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { BASE_PRICES } from '@/lib/i18n';

const plans = [
  {
    nameKey: 'plan_landing',
    descKey: 'plan_landing_desc',
    price: 220000,
    oldPrice: 275000,
    discount: '-20%',
    popular: false,
    briefingType: 'landing',
    features: ['feature_hosting', 'feature_responsive', 'feature_seo', 'feature_form'],
  },
  {
    nameKey: 'plan_corp',
    descKey: 'plan_corp_desc',
    price: 380000,
    oldPrice: 480000,
    discount: '-21%',
    popular: true,
    briefingType: 'web-corporativa',
    features: ['feature_hosting', 'feature_sections', 'feature_social', 'feature_support'],
  },
  {
    nameKey: 'plan_ecommerce',
    descKey: 'plan_ecommerce_desc',
    price: 550000,
    oldPrice: 650000,
    discount: '-15%',
    popular: false,
    briefingType: 'ecommerce',
    features: ['feature_hosting', 'feature_payments', 'feature_admin', 'feature_inventory', 'feature_support_6'],
  },
];

const extras = [
  { key: 'extra_blog', value: 45000 },
  { key: 'extra_chat', value: 25000 },
  { key: 'extra_booking', value: 120000 },
  { key: 'extra_multilang', value: 60000 },
  { key: 'extra_admin_pro', value: 150000 },
  { key: 'extra_cms', value: 85000 },
];

export default function Pricing() {
  const { t, formatPrice } = useI18n();
  const { ref, isVisible } = useInView();

  const [projectType, setProjectType] = useState<'landing' | 'corporate' | 'ecommerce'>('landing');
  const [sections, setSections] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

  const toggleExtra = (value: number) => {
    setSelectedExtras((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const basePrice = BASE_PRICES[projectType];
  const sectionsPrice = sections * BASE_PRICES.section;
  const extrasPrice = selectedExtras.reduce((sum, v) => sum + v, 0);
  const total = basePrice + sectionsPrice + extrasPrice;

  return (
    <section id="precios" ref={ref} className={`py-20 px-6 border-t border-white/5 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      {/* Header */}
      <div className={`flex flex-col items-center text-center mb-16 max-w-5xl mx-auto animate-slide-up ${isVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest mb-4 pulse-glow">
          <span className="material-symbols-outlined text-sm">local_offer</span>
          <span>{t('pricing_badge')}</span>
        </div>
        <h2 className="section-title text-3xl md:text-5xl font-black leading-tight tracking-tighter mb-4">{t('pricing_title')}</h2>
        <p className="text-slate-400 max-w-lg">{t('pricing_subtitle')}</p>
      </div>

      {/* Pricing Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto stagger-children ${isVisible ? 'visible' : ''}`}>
        {plans.map((plan) => (
          <div
            key={plan.nameKey}
            className={`pricing-card flex flex-col gap-6 rounded-xl ${
              plan.popular ? 'border-2 border-primary' : 'border border-white/10'
            } bg-card-dark p-8 relative`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg shadow-primary/30">
                {t('pricing_popular')}
              </div>
            )}
            <div className="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce-slow">
              {plan.discount}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{t(plan.nameKey)}</h3>
              <p className="text-sm text-slate-400">{t(plan.descKey)}</p>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('pricing_from')}</span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-lg text-slate-500 line-through">{formatPrice(plan.oldPrice)}</span>
                <span className="text-3xl md:text-4xl font-black tracking-tight text-green-400">{formatPrice(plan.price)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="#contacto"
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg h-12 text-base font-bold transition-all ${
                  plan.popular ? 'bg-primary text-white neon-glow' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {t('pricing_contact')}
              </a>
              <Link
                href={`/formulario/${plan.briefingType}`}
                className="flex items-center justify-center rounded-lg h-12 px-4 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-all"
                title={t('pricing_cta_briefing')}
              >
                <span className="material-symbols-outlined text-lg">assignment</span>
              </Link>
            </div>

            <hr className="border-white/10" />

            <div className="flex flex-col gap-4">
              {plan.features.map((fKey, i) => (
                <div key={fKey} className={i === 0 ? 'benefit-highlight rounded-lg px-4 py-3 flex items-center gap-3' : 'text-sm font-medium flex items-center gap-3 text-slate-300'}>
                  <span className={`material-symbols-outlined text-primary ${i === 0 ? 'text-xl' : 'text-lg'}`}>
                    {i === 0 ? 'verified' : 'check_circle'}
                  </span>
                  <span className={i === 0 ? 'text-sm font-bold' : ''}>{t(fKey)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cotizador */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t('quoter_title')}</h3>
          <p className="text-slate-400">{t('quoter_subtitle')}</p>
        </div>

        <div className="bg-card-dark rounded-2xl border border-white/10 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Options */}
            <div className="space-y-6">
              {/* Project type */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">{t('quoter_project_type')}</label>
                <div className="grid grid-cols-1 gap-2">
                  {([
                    { value: 'landing' as const, labelKey: 'plan_landing', price: BASE_PRICES.landing },
                    { value: 'corporate' as const, labelKey: 'plan_corp', price: BASE_PRICES.corporate },
                    { value: 'ecommerce' as const, labelKey: 'plan_ecommerce', price: BASE_PRICES.ecommerce },
                  ]).map((opt) => (
                    <label key={opt.value} className="quote-option cursor-pointer flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5 hover:border-primary/50 transition-all">
                      <input
                        type="radio"
                        name="projectType"
                        value={opt.value}
                        checked={projectType === opt.value}
                        onChange={() => setProjectType(opt.value)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="flex-1 font-medium">{t(opt.labelKey)}</span>
                      <span className="text-slate-400 text-sm">{formatPrice(opt.price)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional sections */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">{t('quoter_sections')}</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setSections((s) => Math.max(0, s - 1))} className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all">-</button>
                  <span className="text-2xl font-bold w-12 text-center">{sections}</span>
                  <button type="button" onClick={() => setSections((s) => Math.min(10, s + 1))} className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all">+</button>
                  <span className="text-slate-400 text-sm">× {formatPrice(BASE_PRICES.section)} c/u</span>
                </div>
              </div>

              {/* Extras */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white">{t('quoter_extras')}</label>
                <div className="space-y-2">
                  {extras.map((ext) => (
                    <label key={ext.key} className="quote-option cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:border-primary/50 transition-all">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(ext.value)}
                        onChange={() => toggleExtra(ext.value)}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="flex-1 text-sm">{t(ext.key)}</span>
                      <span className="text-slate-400 text-xs">+{formatPrice(ext.value)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-primary/10 to-violet-600/10 rounded-xl border border-primary/20 p-6 flex flex-col">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{t('quoter_summary')}</h4>

                <div className="space-y-3 flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{t('quoter_base')}</span>
                    <span className="text-white font-medium">{formatPrice(basePrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{t('quoter_sections_cost')}</span>
                    <span className="text-white font-medium">{formatPrice(sectionsPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{t('quoter_extras_cost')}</span>
                    <span className="text-white font-medium">{formatPrice(extrasPrice)}</span>
                  </div>
                  <hr className="border-white/10 my-4" />
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-slate-300 font-medium">{t('quoter_total')}:</span>
                    <div className="text-right">
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
                        {formatPrice(total)}
                      </span>
                      <span className="text-slate-400 text-sm block">+ IVA</span>
                    </div>
                  </div>

                  <Link
                    href={`/formulario/${projectType === 'corporate' ? 'web-corporativa' : projectType}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl h-14 bg-primary text-white text-base font-bold neon-glow transition-all hover:scale-[1.02]"
                  >
                    <span className="material-symbols-outlined">assignment</span>
                    <span>{t('quoter_cta')}</span>
                  </Link>
                  <p className="text-center text-slate-500 text-xs mt-3">* {t('quoter_note')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
