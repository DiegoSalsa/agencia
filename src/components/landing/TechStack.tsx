'use client';

import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { Blocks, Cloud, Brain, ShieldCheck } from 'lucide-react';

const techs = [
  { Icon: Blocks, titleKey: 'tech_1_title', descKey: 'tech_1_desc' },
  { Icon: Cloud, titleKey: 'tech_2_title', descKey: 'tech_2_desc' },
  { Icon: Brain, titleKey: 'tech_3_title', descKey: 'tech_3_desc' },
  { Icon: ShieldCheck, titleKey: 'tech_4_title', descKey: 'tech_4_desc' },
];

export default function TechStack() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className={`py-20 border-t border-b border-border-default animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-text-muted text-sm font-semibold uppercase tracking-[0.15em] mb-10">
          {t('tech_title')}
        </p>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children ${isVisible ? 'visible' : ''}`}>
          {techs.map((tech) => (
            <div key={tech.titleKey} className="card-base flex flex-col items-start gap-3 p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <tech.Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-text-primary font-bold text-base">{t(tech.titleKey)}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{t(tech.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
