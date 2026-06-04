'use client';

import { motion, Variants } from 'framer-motion';
import { Search, PenTool, Code, Rocket, CheckCircle2, Wrench, ArrowRight } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { useCounter } from '@/hooks/useCounter';

const steps = [
  { 
    icon: Search, 
    num: '01',
    titleKey: 'process_1_title', 
    descKey: 'process_1_desc', 
    delivKey: 'process_1_deliverables',
    toolsKey: 'process_1_tools',
    classes: {
      glow: 'bg-blue-500/10 group-hover:bg-blue-500/20',
      text: 'text-blue-500',
      icon: 'text-blue-400',
      bullet: 'text-blue-500/50'
    }
  },
  { 
    icon: PenTool, 
    num: '02',
    titleKey: 'process_2_title', 
    descKey: 'process_2_desc', 
    delivKey: 'process_2_deliverables',
    toolsKey: 'process_2_tools',
    classes: {
      glow: 'bg-violet-500/10 group-hover:bg-violet-500/20',
      text: 'text-violet-500',
      icon: 'text-violet-400',
      bullet: 'text-violet-500/50'
    }
  },
  { 
    icon: Code, 
    num: '03',
    titleKey: 'process_3_title', 
    descKey: 'process_3_desc', 
    delivKey: 'process_3_deliverables',
    toolsKey: 'process_3_tools',
    classes: {
      glow: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
      text: 'text-emerald-500',
      icon: 'text-emerald-400',
      bullet: 'text-emerald-500/50'
    }
  },
  { 
    icon: Rocket, 
    num: '04',
    titleKey: 'process_4_title', 
    descKey: 'process_4_desc', 
    delivKey: 'process_4_deliverables',
    toolsKey: 'process_4_tools',
    classes: {
      glow: 'bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20',
      text: 'text-fuchsia-500',
      icon: 'text-fuchsia-400',
      bullet: 'text-fuchsia-500/50'
    }
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StatCard({ labelKey, target, prefix, suffix, trendKey, noteKey, stars }: {
  labelKey: string; target: number; prefix?: string; suffix?: string;
  trendKey?: string; noteKey?: string; stars?: boolean;
}) {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target, prefix, suffix });

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center sm:text-left shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] rounded-full group-hover:bg-white/10 transition-colors duration-500" />
      <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">{t(labelKey)}</p>
      <p ref={ref} className="text-4xl lg:text-5xl font-black text-[var(--text)] mb-1 tracking-tight">{display}</p>
      {trendKey && <span className="text-emerald-500 text-sm font-semibold">{t(trendKey)}</span>}
      {noteKey && <p className="text-[var(--text-tertiary)] text-xs">{t(noteKey)}</p>}
      {stars && (
        <div className="flex items-center gap-0.5 mt-2 justify-center sm:justify-start">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
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
    <section id="proceso" ref={ref} className="py-24 px-6 relative bg-[var(--bg)]">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: Sticky Header */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text)] mb-6 tracking-tight leading-[1.05]">
                {t('process_title')}
              </h2>
              
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                {t('process_subtitle')}
              </p>

              {/* Progress Indicator Line (Desktop) */}
              <div className="hidden lg:block w-full h-1 bg-[var(--surface)] rounded-full overflow-hidden mt-12 relative">
                 <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-fuchsia-500"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                 />
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Steps */}
        <div className="lg:w-2/3 flex flex-col gap-12 lg:gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={step.num}
                className="relative rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 md:p-12 shadow-2xl overflow-hidden group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                custom={i + 1}
              >
                {/* Glow effect matching the step color */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 ${step.classes.glow} blur-[80px] rounded-full transition-colors duration-700 pointer-events-none`} />
                
                {/* Step Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-6xl md:text-8xl font-black text-[#111] tracking-tighter group-hover:text-[#1a1a1a] transition-colors duration-500 select-none">
                    {step.num}
                  </div>
                  <div>
                    <Icon className={`w-10 h-10 md:w-12 md:h-12 ${step.classes.icon} mb-3`} />
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--text)] tracking-tight">
                      {t(step.titleKey)}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                  {t(step.descKey)}
                </p>

                {/* Deliverables & Tools Deep Dive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-2 text-[var(--text)] font-bold mb-3 text-sm tracking-wider uppercase">
                      <CheckCircle2 size={16} className={step.classes.text} /> Entregables
                    </div>
                    <ul className="flex flex-col gap-2">
                      {t(step.delivKey).split(', ').map((item, idx) => (
                        <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                          <span className={`${step.classes.bullet} mt-1`}>▹</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[var(--text)] font-bold mb-3 text-sm tracking-wider uppercase">
                      <Wrench size={16} className={step.classes.text} /> Stack & Herramientas
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {t(step.toolsKey).split(', ').map((tool, idx) => (
                        <span key={idx} className="text-xs font-semibold px-3 py-1 bg-[var(--surface)] text-[var(--text-secondary)] rounded-lg border border-[var(--border)]">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Massive Stats Block */}
      <div ref={statsRef} className="max-w-[1200px] mx-auto mt-32 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
