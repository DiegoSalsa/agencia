'use client';

import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { useCounter } from '@/hooks/useCounter';

const steps = [
  { icon: 'search', titleKey: 'process_1_title', descKey: 'process_1_desc', num: '01', delay: '', iconDelay: '' },
  { icon: 'polyline', titleKey: 'process_2_title', descKey: 'process_2_desc', num: '02', delay: '0.5s', iconDelay: '0.3s' },
  { icon: 'terminal', titleKey: 'process_3_title', descKey: 'process_3_desc', num: '03', delay: '1s', iconDelay: '0.6s' },
  { icon: 'rocket_launch', titleKey: 'process_4_title', descKey: 'process_4_desc', num: '04', delay: '', iconDelay: '' },
];

function StatCard1() {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target: 150 });
  return (
    <div className="stat-card flex flex-col gap-2 rounded-xl p-8 glass-card text-center sm:text-left">
      <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{t('stat_1_label')}</p>
      <p ref={ref} className="text-white tracking-tight text-4xl font-bold counter-number">{display}</p>
      <span className="text-[#0bda6c] text-sm font-bold flex items-center justify-center sm:justify-start">
        <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
        <span>{t('stat_1_trend')}</span>
      </span>
    </div>
  );
}

function StatCard2() {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target: 20, prefix: '-', suffix: '%' });
  return (
    <div className="stat-card flex flex-col gap-2 rounded-xl p-8 glass-card text-center sm:text-left">
      <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{t('stat_2_label')}</p>
      <p ref={ref} className="text-white tracking-tight text-4xl font-bold counter-number">{display}</p>
      <p className="text-slate-500 text-xs">{t('stat_2_note')}</p>
    </div>
  );
}

function StatCard3() {
  const { t } = useI18n();
  const { ref, display } = useCounter({ target: 99, suffix: '%' });
  return (
    <div className="stat-card flex flex-col gap-2 rounded-xl p-8 glass-card text-center sm:text-left">
      <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{t('stat_3_label')}</p>
      <p ref={ref} className="text-white tracking-tight text-4xl font-bold counter-number">{display}</p>
      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 stars-container">
        {[0, 0.1, 0.2, 0.3, 0.4].map((d, i) => (
          <span key={i} className="material-symbols-outlined text-yellow-500 text-sm star-icon" style={{ animationDelay: `${d}s` }}>grade</span>
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
    <section id="proceso" ref={ref} className={`py-20 px-6 border-t border-white/5 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className={`max-w-4xl mx-auto text-center mb-16 animate-slide-up ${isVisible ? 'visible' : ''}`}>
        <h4 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">{t('process_tag')}</h4>
        <h2 className="section-title text-4xl md:text-5xl font-bold tracking-tight mb-6">{t('process_title')}</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t('process_subtitle')}</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children ${isVisible ? 'visible' : ''}`}>
          {steps.map((step) => (
            <div key={step.num} className="group flex flex-col items-center lg:items-start text-center lg:text-left process-step">
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span
                    className={`material-symbols-outlined text-3xl ${step.iconDelay ? 'float-icon' : ''}`}
                    style={step.iconDelay ? { animationDelay: step.iconDelay } : undefined}
                  >
                    {step.icon}
                  </span>
                </div>
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs step-glow pulse-ring"
                  style={step.delay ? { animationDelay: step.delay } : undefined}
                >
                  {step.num}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className={`max-w-5xl mx-auto mt-20 animate-on-scroll ${statsVisible ? 'visible' : ''}`}>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children ${statsVisible ? 'visible' : ''}`}>
          <StatCard1 />
          <StatCard2 />
          <StatCard3 />
        </div>
      </div>
    </section>
  );
}
