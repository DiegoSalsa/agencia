'use client';

import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { useCounter } from '@/hooks/useCounter';
import { Search, GitBranch, Terminal, Rocket, TrendingUp, Star } from 'lucide-react';

const steps = [
  { Icon: Search, titleKey: 'process_1_title', descKey: 'process_1_desc', num: '01' },
  { Icon: GitBranch, titleKey: 'process_2_title', descKey: 'process_2_desc', num: '02' },
  { Icon: Terminal, titleKey: 'process_3_title', descKey: 'process_3_desc', num: '03' },
  { Icon: Rocket, titleKey: 'process_4_title', descKey: 'process_4_desc', num: '04' },
];

function StatCard1() {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target: 150 });
  return (
    <div className="card-base flex flex-col gap-2 p-6 text-center sm:text-left">
      <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">{t('stat_1_label')}</p>
      <p ref={ref} className="text-text-primary tracking-tight text-3xl font-bold counter-number">{display}</p>
      <span className="text-emerald-500 text-sm font-medium flex items-center justify-center sm:justify-start gap-1">
        <TrendingUp className="w-3.5 h-3.5" />
        <span>{t('stat_1_trend')}</span>
      </span>
    </div>
  );
}

function StatCard2() {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target: 20, prefix: '-', suffix: '%' });
  return (
    <div className="card-base flex flex-col gap-2 p-6 text-center sm:text-left">
      <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">{t('stat_2_label')}</p>
      <p ref={ref} className="text-text-primary tracking-tight text-3xl font-bold counter-number">{display}</p>
      <p className="text-text-muted text-xs">{t('stat_2_note')}</p>
    </div>
  );
}

function StatCard3() {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target: 99, suffix: '%' });
  return (
    <div className="card-base flex flex-col gap-2 p-6 text-center sm:text-left">
      <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">{t('stat_3_label')}</p>
      <p ref={ref} className="text-text-primary tracking-tight text-3xl font-bold counter-number">{display}</p>
      <div className="flex items-center justify-center sm:justify-start gap-0.5 mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
    </div>
  );
}

export default function Process() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();
  const { ref: statsRef, isVisible: statsVisible } = useInView();

  return (
    <section id="proceso" ref={ref} className={`py-24 px-6 border-t border-border-default animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className={`max-w-3xl mx-auto text-center mb-16 animate-slide-up ${isVisible ? 'visible' : ''}`}>
        <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t('process_tag')}</p>
        <h2 className="text-display-md md:text-display-lg text-text-primary mb-4">{t('process_title')}</h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">{t('process_subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${isVisible ? 'visible' : ''}`}>
          {steps.map((step) => (
            <div key={step.num} className="group flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-2xl bg-surface border border-border-default flex items-center justify-center text-primary group-hover:border-primary/30 transition-colors">
                  <step.Icon className="w-6 h-6" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[10px]">
                  {step.num}
                </div>
              </div>
              <h3 className="text-text-primary text-lg font-bold mb-2">{t(step.titleKey)}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className={`max-w-4xl mx-auto mt-20 animate-on-scroll ${statsVisible ? 'visible' : ''}`}>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-5 stagger-children ${statsVisible ? 'visible' : ''}`}>
          <StatCard1 />
          <StatCard2 />
          <StatCard3 />
        </div>
      </div>
    </section>
  );
}
