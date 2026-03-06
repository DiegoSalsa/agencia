'use client';

import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const techs = [
  { icon: 'code_blocks', titleKey: 'tech_1_title', descKey: 'tech_1_desc', delay: '' },
  { icon: 'cloud', titleKey: 'tech_2_title', descKey: 'tech_2_desc', delay: '0.5s' },
  { icon: 'psychology', titleKey: 'tech_3_title', descKey: 'tech_3_desc', delay: '1s' },
  { icon: 'security', titleKey: 'tech_4_title', descKey: 'tech_4_desc', delay: '1.5s' },
];

export default function TechStack() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`py-24 border-t border-b border-white/5 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-[0.2em] mb-12">
          {t('tech_title')}
        </p>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${isVisible ? 'visible' : ''}`}>
          {techs.map((tech) => (
            <div key={tech.icon} className="tech-card flex flex-col items-start gap-4 p-6 rounded-xl border border-white/10 bg-card-dark">
              <div className="tech-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-2xl float-icon"
                  style={tech.delay ? { animationDelay: tech.delay } : undefined}
                >
                  {tech.icon}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg">{t(tech.titleKey)}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t(tech.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
