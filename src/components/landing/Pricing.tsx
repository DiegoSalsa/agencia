'use client';

import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  {
    nameKey: 'plan_landing',
    descKey: 'plan_landing_desc',
    price: 220000,
    popular: false,
    briefingType: 'landing',
    features: ['feature_hosting', 'feature_responsive', 'feature_seo', 'feature_form'],
  },
  {
    nameKey: 'plan_corp',
    descKey: 'plan_corp_desc',
    price: 380000,
    popular: true,
    briefingType: 'web-corporativa',
    features: ['feature_hosting', 'feature_sections', 'feature_social', 'feature_support'],
  },
  {
    nameKey: 'plan_ecommerce',
    descKey: 'plan_ecommerce_desc',
    price: 550000,
    popular: false,
    briefingType: 'ecommerce',
    features: ['feature_hosting', 'feature_payments', 'feature_admin', 'feature_inventory', 'feature_support_6'],
  },
];

export default function Pricing() {
  const { t, formatPrice } = useI18n();
  const { ref, isVisible } = useInView();
  const { ref: ctaRef, isVisible: ctaVisible } = useInView();

  return (
    <section id="precios" ref={ref} className={`py-24 px-6 border-t border-border-default animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      {/* Header */}
      <div className={`flex flex-col items-center text-center mb-16 max-w-3xl mx-auto animate-slide-up ${isVisible ? 'visible' : ''}`}>
        <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t('pricing_badge')}</p>
        <h2 className="text-display-md md:text-display-lg text-text-primary mb-4">{t('pricing_title')}</h2>
        <p className="text-text-secondary max-w-lg">{t('pricing_subtitle')}</p>
      </div>

      {/* Pricing Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto stagger-children ${isVisible ? 'visible' : ''}`}>
        {plans.map((plan) => (
          <div
            key={plan.nameKey}
            className={`card-base flex flex-col gap-6 rounded-2xl p-8 relative ${
              plan.popular ? 'border-primary ring-1 ring-primary/20' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full">
                {t('pricing_popular')}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-text-primary">{t(plan.nameKey)}</h3>
              <p className="text-sm text-text-muted">{t(plan.descKey)}</p>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-text-muted font-medium uppercase tracking-wider">{t('pricing_from')}</span>
              <span className="text-3xl font-bold tracking-tight text-text-primary">{formatPrice(plan.price)}</span>
            </div>

            <div className="flex gap-2">
              <a
                href="#contacto"
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl h-12 text-sm font-semibold transition-all ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {t('pricing_contact')}
              </a>
              <Link
                href={`/formulario/${plan.briefingType}`}
                className="flex items-center justify-center rounded-xl h-12 w-12 border border-border-default text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
                title={t('pricing_cta_briefing')}
              >
                <Sparkles className="w-5 h-5" />
              </Link>
            </div>

            <hr className="border-border-default" />

            <div className="flex flex-col gap-3">
              {plan.features.map((fKey) => (
                <div key={fKey} className="text-sm font-medium flex items-center gap-3 text-text-secondary">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t(fKey)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section — replaces cotizador */}
      <div ref={ctaRef} className={`max-w-4xl mx-auto mt-20 animate-on-scroll ${ctaVisible ? 'visible' : ''}`}>
        <div className="relative rounded-2xl border border-border-default bg-gradient-to-br from-primary/5 via-surface to-surface p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.06] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-display-sm text-text-primary mb-3">{t('cta_quote_title')}</h3>
            <p className="text-text-secondary max-w-xl mx-auto mb-8">{t('cta_quote_desc')}</p>
            <Link
              href="/formulario"
              className="group inline-flex items-center justify-center gap-2 rounded-xl h-14 px-8 btn-primary text-base font-semibold"
            >
              <span>{t('cta_quote_button')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
