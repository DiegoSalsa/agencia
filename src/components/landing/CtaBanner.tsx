'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, Check, Clock, TrendingUp } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const stats = [
  { icon: Check, valueKey: 'cta_stat_1_value', labelKey: 'cta_stat_1_label' },
  { icon: TrendingUp, valueKey: 'cta_stat_2_value', labelKey: 'cta_stat_2_label' },
  { icon: Clock, valueKey: 'cta_stat_3_value', labelKey: 'cta_stat_3_label' },
];

export default function CtaBanner() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className="py-24 px-6 bg-[#050505] border-t border-[#222]">
      <motion.div
        className="max-w-6xl mx-auto relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: CTA */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black text-[10px] font-bold tracking-widest uppercase mb-8">
              {t('cta_badge')}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              {t('cta_title')}
            </h2>
            <p className="text-[#888] text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              {t('cta_subtitle')}
            </p>
            <Link
              href="/formulario"
              className="inline-flex items-center justify-center gap-3 h-14 px-8 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#eee] transition-colors cursor-pointer group"
            >
              {t('cta_button')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Testimonial & Stats (Monochrome) */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#0A0A0A] border border-[#222] p-8 md:p-10 relative">
              <Quote size={40} className="text-[#222] absolute top-6 left-6" />
              <blockquote className="text-white/90 text-lg md:text-xl font-medium leading-relaxed italic mb-8 relative z-10 pt-4 px-2">
                "{t('cta_testimonial_text')}"
              </blockquote>
              <div className="flex items-center gap-4 relative z-10 px-2">
                <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bold text-sm">
                  {t('cta_testimonial_initials')}
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-wide">{t('cta_testimonial_name')}</p>
                  <p className="text-[#666] text-xs uppercase tracking-widest mt-1">{t('cta_testimonial_role')}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="flex flex-col justify-center items-center text-center p-6 bg-[#0A0A0A] border border-[#222]">
                    <Icon size={20} className="text-[#666] mb-3" />
                    <p className="text-xl md:text-2xl font-black text-white mb-1">{t(stat.valueKey)}</p>
                    <p className="text-[9px] text-[#666] uppercase tracking-widest font-bold">{t(stat.labelKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
