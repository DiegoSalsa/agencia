'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Quote, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const stats = [
  { icon: CheckCircle2, valueKey: 'cta_stat_1_value', labelKey: 'cta_stat_1_label' },
  { icon: TrendingUp, valueKey: 'cta_stat_2_value', labelKey: 'cta_stat_2_label' },
  { icon: Clock, valueKey: 'cta_stat_3_value', labelKey: 'cta_stat_3_label' },
];

export default function CtaBanner() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className="py-20 px-6">
      <motion.div
        className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[#3b0d99] p-10 md:p-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[80px]" />
        {/* Angular line decoration */}
        <svg className="absolute top-8 right-8 w-20 h-20 opacity-10" viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="white" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-8 left-8 w-14 h-14 opacity-[0.06]" viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="white" strokeWidth="3" />
        </svg>

        <div className="relative z-10">
          {/* Stats strip */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon size={18} className="text-white/80" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-white leading-none">{t(stat.valueKey)}</p>
                    <p className="text-[11px] text-white/50 uppercase tracking-wider font-medium">{t(stat.labelKey)}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-10 max-w-md mx-auto" />

          {/* Testimonial */}
          <motion.div
            className="max-w-2xl mx-auto text-center mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Quote size={28} className="text-white/20 mx-auto mb-4 rotate-180" />
            <blockquote className="text-white/85 text-lg md:text-xl font-medium leading-relaxed italic mb-4">
              {t('cta_testimonial_text')}
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                {t('cta_testimonial_initials')}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">{t('cta_testimonial_name')}</p>
                <p className="text-white/40 text-xs">{t('cta_testimonial_role')}</p>
              </div>
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              {t('cta_badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              {t('cta_title')}
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
              {t('cta_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formulario"
                className="inline-flex items-center justify-center gap-2 h-13 px-8 bg-white text-[var(--primary-dark)] font-bold rounded-xl hover:bg-white/90 transition-all hover:scale-[1.02] cursor-pointer text-base"
              >
                {t('cta_button')}
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
