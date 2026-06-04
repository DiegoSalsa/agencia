'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, Layers, ArrowRight } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';

const servicesSummary = [
  {
    icon: Globe,
    titleKey: 'service_1_title',
    descKey: 'service_1_desc',
    href: '/servicios',
    gradient: 'from-violet-600 to-indigo-600',
    accentColor: 'text-violet-400',
  },
  {
    icon: Shield,
    titleKey: 'service_2_title',
    descKey: 'service_2_desc',
    href: '/servicios',
    gradient: 'from-emerald-600 to-teal-600',
    accentColor: 'text-emerald-400',
  },
  {
    icon: Layers,
    titleKey: 'service_3_title',
    descKey: 'service_3_desc',
    href: '/servicios',
    gradient: 'from-blue-600 to-cyan-600',
    accentColor: 'text-blue-400',
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

export default function ServicesSummary() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="servicios-resumen" ref={ref} className="py-24 px-6 relative overflow-hidden bg-[var(--bg)]">
      {/* Minimalist background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase mb-6">
              {t('services_tag')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] tracking-tight">
              {t('services_title')}
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group flex items-center gap-2 text-sm font-bold text-[var(--text)] uppercase tracking-widest pb-1 border-b border-transparent hover:border-indigo-500 transition-colors duration-300"
          >
            Ver todos los servicios <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 3 equal columns in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesSummary.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.titleKey}
                className="group flex flex-col h-full relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] transition-all duration-500 hover:-translate-y-2 hover:border-[rgba(var(--primary-rgb),0.3)] hover:shadow-2xl"
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                {/* Top gradient bar */}
                <div className={`h-[2px] bg-gradient-to-r ${s.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-8 flex flex-col flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Icon size={20} className={s.accentColor} />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-bold text-[var(--text)] mb-3 tracking-tight">{t(s.titleKey)}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-8">{t(s.descKey)}</p>

                  <Link
                    href={s.href}
                    className="mt-auto flex items-center justify-between w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] group-hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <span className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Ver detalles</span>
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                      <ArrowRight size={14} className="text-[var(--text)] group-hover:-rotate-45 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
