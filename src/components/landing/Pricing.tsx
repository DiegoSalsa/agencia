'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Building2, ShoppingCart, Check, ArrowRight, Clock, Users } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { getRegionalPrice, getOriginalPrice, type PlanKey } from '@/lib/i18n';
import { useInView } from '@/hooks/useInView';
import { usePromo } from '@/context/PromoContext';

const WHATSAPP_PHONE = '56949255006';

const plans = [
  {
    key: 'landing' as PlanKey,
    nameKey: 'plan_landing',
    descKey: 'plan_landing_desc',
    subtitleKey: 'plan_landing_subtitle',
    briefingType: 'landing',
    icon: Globe,
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
    popular: false,
    features: ['feature_hosting', 'feature_payments', 'feature_admin', 'feature_inventory', 'feature_support_6'],
  },
  {
    key: 'enterprise',
    nameKey: 'plan_enterprise',
    descKey: 'plan_enterprise_desc',
    subtitleKey: 'plan_enterprise_subtitle',
    icon: Building2,
    popular: false,
    quoteOnly: true,
    features: ['feature_enterprise_audit', 'feature_enterprise_architecture', 'feature_enterprise_integrations', 'feature_enterprise_sla'],
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
  const { promos } = usePromo();
  const promo = promos.find(p => p.showPricingCard) || null;
  const enterpriseMessage = encodeURIComponent('Hola PuroCode, quiero cotizar un plan Enterprise.');
  const enterpriseHref = `https://wa.me/${WHATSAPP_PHONE}?text=${enterpriseMessage}`;
  
  const discountPercent = promo ? Math.round((1 - promo.price / promo.originalPrice) * 100) : 0;
  const daysLeft = promo?.endsAt ? Math.max(0, Math.ceil((new Date(promo.endsAt).getTime() - Date.now()) / 86400000)) : null;

  return (
    <section id="planes" ref={ref} className="relative py-32 px-6 bg-[#050505]">
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Minimalista */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#666] mb-4">
            {t('pricing_tag')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t('pricing_title')}
          </h2>
          <p className="text-lg text-[#888] leading-relaxed">
            {t('pricing_subtitle')}
          </p>
        </motion.div>

        {/* Promo Card Minimalista */}
        {promo && (
          <motion.div
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={0.5}
            className="mb-16"
          >
            <Link
              href="/formulario/oferta"
              className="group block rounded-none border border-[#333] bg-[#0A0A0A] p-8 md:p-12 hover:border-[#666] transition-colors duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black text-[10px] font-bold tracking-widest uppercase mb-6">
                    Oferta Exclusiva
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                    {promo.title}
                  </h3>
                  {promo.description && (
                    <p className="text-[#888] text-sm mb-4 max-w-lg">{promo.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs font-medium text-[#666] uppercase tracking-wider">
                    {promo.remainingSlots > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Users size={14} /> {promo.remainingSlots} cupos
                      </span>
                    )}
                    {daysLeft !== null && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {daysLeft > 0 ? `${daysLeft} días` : 'Último día'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                  <div className="text-left md:text-right">
                    <div className="text-sm text-[#666] line-through mb-1">
                      ${promo.originalPrice.toLocaleString('es-CL')}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-white tracking-tight">
                        ${promo.price.toLocaleString('es-CL')}
                      </span>
                      <span className="text-xs text-[#666] font-medium">CLP</span>
                    </div>
                  </div>
                  <div className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:bg-[#eee] transition-colors">
                    Solicitar Oferta <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Filas de Inversión (Horizontal Layout) */}
        <div className="flex flex-col border-t border-[#222]">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isEnterprise = plan.quoteOnly;
            const href = isEnterprise ? enterpriseHref : `/formulario/${plan.briefingType}`;
            
            return (
              <motion.div
                key={plan.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i + 1}
              >
                <Link
                  href={href}
                  target={isEnterprise ? '_blank' : undefined}
                  rel={isEnterprise ? 'noopener noreferrer' : undefined}
                  className="group block border-b border-[#222] py-12 md:py-16 hover:bg-[#0A0A0A] transition-colors duration-300 relative px-4 md:px-8 -mx-4 md:-mx-8"
                >
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    
                    {/* Izquierda: Título y Descripción */}
                    <div className="md:w-5/12">
                      <div className="flex items-center gap-4 mb-6">
                        <Icon size={24} className="text-[#666]" />
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                          {t(plan.nameKey)}
                        </h3>
                        {plan.popular && (
                          <span className="hidden md:inline-flex px-2 py-1 bg-[#111] border border-[#333] text-[#888] text-[9px] font-bold tracking-widest uppercase">
                            {t('pricing_popular')}
                          </span>
                        )}
                      </div>
                      <p className="text-[#888] leading-relaxed mb-6">
                        {t(plan.descKey)}
                      </p>
                      <div className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                        {isEnterprise ? t('pricing_cta_whatsapp') : t('pricing_cta')} 
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Centro: Features */}
                    <div className="md:w-4/12">
                      <ul className="space-y-3">
                        {plan.features.map((fKey) => (
                          <li key={fKey} className="flex items-start gap-3 text-sm text-[#999]">
                            <Check size={16} className="text-[#444] shrink-0 mt-0.5" />
                            <span>{t(fKey)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Derecha: Inversión */}
                    <div className="md:w-3/12 md:text-right flex flex-col justify-center border-t border-[#222] md:border-none pt-6 md:pt-0">
                      {isEnterprise ? (
                        <>
                          <div className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                            {t('pricing_custom_quote')}
                          </div>
                          <div className="text-xs text-[#666] uppercase tracking-widest">
                            {t('pricing_contact')}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-[10px] text-[#666] uppercase tracking-widest mb-2">
                            {t('pricing_from')}
                          </div>
                          <div className="flex items-baseline md:justify-end gap-2 mb-2">
                            <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                              {getRegionalPrice(plan.key as PlanKey, currency)}
                            </span>
                            <span className="text-xs font-bold text-[#666]">{currency}</span>
                          </div>
                          <div className="text-[10px] text-[#444] uppercase tracking-widest">
                            {t('pricing_payment_note')} <span className="text-[#666] font-bold mt-1 block">+ IVA (No incluido)</span>
                          </div>
                        </>
                      )}
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
