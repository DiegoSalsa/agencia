'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

export default function CtaBanner() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className="py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[#3b0d99] p-12 md:p-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
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
        </div>
      </motion.div>
    </section>
  );
}
