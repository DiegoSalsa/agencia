'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Zap, ServerCog, Activity } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const WHATSAPP_PHONE = '56949255006';

const maintPlans = [
  {
    key: 'basic',
    nameKey: 'maint_plan_basic',
    descKey: 'maint_plan_basic_desc',
    subtitleKey: 'maint_plan_basic_subtitle',
    icon: ShieldCheck,
    priceCLP: 49000,
    features: ['maint_feature_basic_1', 'maint_feature_basic_2', 'maint_feature_basic_3'],
  },
  {
    key: 'pro',
    nameKey: 'maint_plan_pro',
    descKey: 'maint_plan_pro_desc',
    subtitleKey: 'maint_plan_pro_subtitle',
    icon: Zap,
    popular: true,
    priceCLP: 149000,
    features: ['maint_feature_pro_1', 'maint_feature_pro_2', 'maint_feature_pro_3'],
  },
  {
    key: 'advanced',
    nameKey: 'maint_plan_adv',
    descKey: 'maint_plan_adv_desc',
    subtitleKey: 'maint_plan_adv_subtitle',
    icon: Activity,
    priceCLP: 249000,
    features: ['maint_feature_adv_1', 'maint_feature_adv_2', 'maint_feature_adv_3'],
  },
  {
    key: 'sla',
    nameKey: 'maint_plan_sla',
    descKey: 'maint_plan_sla_desc',
    subtitleKey: 'maint_plan_sla_subtitle',
    icon: ServerCog,
    quoteOnly: true,
    features: ['maint_feature_sla_1', 'maint_feature_sla_2', 'maint_feature_sla_3'],
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

export default function MaintenancePricing() {
  const { t, currency } = useI18n();
  const { ref, isVisible } = useInView();
  
  const enterpriseMessage = encodeURIComponent('Hola PuroCode, quiero cotizar un plan de Mantenimiento SLA Enterprise.');
  const enterpriseHref = `https://wa.me/${WHATSAPP_PHONE}?text=${enterpriseMessage}`;

  return (
    <section id="mantenimiento-planes" ref={ref} className="relative py-24 px-6 bg-[#050505]">
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Filas de Inversión (Horizontal Layout) */}
        <div className="flex flex-col border-t border-[#222]">
          {maintPlans.map((plan, i) => {
            const Icon = plan.icon;
            const isEnterprise = plan.quoteOnly;
            const href = isEnterprise ? enterpriseHref : `/formulario/mantenimiento`;
            
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
                              ${plan.priceCLP?.toLocaleString('es-CL')}
                            </span>
                            <span className="text-xs font-bold text-[#666]">{currency}</span>
                          </div>
                          <div className="text-[10px] text-[#444] uppercase tracking-widest">
                            Mensual (IVA Incluido)
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
