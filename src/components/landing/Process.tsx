'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { useCounter } from '@/hooks/useCounter';

const steps = [
  { icon: Search, titleKey: 'process_1_title', descKey: 'process_1_desc', num: '01' },
  { icon: PenTool, titleKey: 'process_2_title', descKey: 'process_2_desc', num: '02' },
  { icon: Code, titleKey: 'process_3_title', descKey: 'process_3_desc', num: '03' },
  { icon: Rocket, titleKey: 'process_4_title', descKey: 'process_4_desc', num: '04' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function StatCard({ labelKey, target, prefix, suffix, trendKey, noteKey, stars }: {
  labelKey: string; target: number; prefix?: string; suffix?: string;
  trendKey?: string; noteKey?: string; stars?: boolean;
}) {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target, prefix, suffix });

  return (
    <div className="card p-8 text-center sm:text-left">
      <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-widest mb-2">{t(labelKey)}</p>
      <p ref={ref} className="text-4xl font-bold text-[var(--text)] mb-1">{display}</p>
      {trendKey && <span className="text-emerald-500 text-sm font-semibold">{t(trendKey)}</span>}
      {noteKey && <p className="text-[var(--text-tertiary)] text-xs">{t(noteKey)}</p>}
      {stars && (
        <div className="flex items-center gap-0.5 mt-1 justify-center sm:justify-start">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Process() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();
  const { ref: statsRef, isVisible: statsVisible } = useInView();

  return (
    <section id="proceso" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Rich brand background matching hero treatment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        {/* Radial glows — hero-level intensity */}
        <div className="absolute top-[10%] left-[15%] w-[700px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.12)_0%,rgba(var(--primary-rgb),0.04)_40%,transparent_70%)]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
        {/* Floating geometric shapes */}
        <svg className="geo-float absolute top-12 left-[8%] w-24 h-24 opacity-[0.05]" style={{ animationDelay: '2s' }} viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
        </svg>
        <svg className="geo-float absolute bottom-[15%] right-[18%] w-16 h-16 opacity-[0.04]" style={{ animationDelay: '6s' }} viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="currentColor" strokeWidth="3" className="text-[var(--primary)]" />
        </svg>
        <div className="geo-float absolute bottom-16 right-[12%] w-18 h-18 border border-[rgba(var(--primary-rgb),0.1)] rotate-12 rounded-lg" style={{ animationDelay: '4s' }} />
        <div className="geo-float absolute top-[40%] right-[3%] w-14 h-14 border border-[rgba(var(--primary-rgb),0.08)] -rotate-[25deg] rounded-md" style={{ animationDelay: '0s' }} />
        <div className="geo-float absolute top-[20%] left-[50%] w-10 h-10 bg-[rgba(var(--primary-rgb),0.04)] rotate-45 rounded-sm" style={{ animationDelay: '3s' }} />
        {/* Gradient line accents */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary-rgb),0.15)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary-rgb),0.1)] to-transparent" />
      </div>
      {/* Header */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
        custom={0}
      >
        <p className="section-label mb-4">{t('process_tag')}</p>
        <h2 className="section-title mb-4">{t('process_title')}</h2>
        <p className="section-subtitle mx-auto">{t('process_subtitle')}</p>
      </motion.div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="group flex flex-col items-center lg:items-start text-center lg:text-left"
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="relative mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-[var(--primary)]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-[10px]">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-2">{t(step.titleKey)}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(step.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="max-w-4xl mx-auto mt-20">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          initial="hidden"
          animate={statsVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <StatCard labelKey="stat_1_label" target={150} trendKey="stat_1_trend" />
          <StatCard labelKey="stat_2_label" target={20} prefix="-" suffix="%" noteKey="stat_2_note" />
          <StatCard labelKey="stat_3_label" target={99} suffix="%" stars />
        </motion.div>
      </div>
    </section>
  );
}
