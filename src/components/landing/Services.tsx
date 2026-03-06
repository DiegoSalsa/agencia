'use client';

import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { Monitor, Shield, Layers, ArrowRight } from 'lucide-react';

export default function Services() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="servicios" ref={ref} className={`py-24 px-6 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className={`mb-16 animate-slide-up ${isVisible ? 'visible' : ''}`}>
          <p className="text-primary text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t('services_tag')}</p>
          <h2 className="text-display-md md:text-display-lg text-text-primary mb-4">
            {t('services_title')} {t('services_title_2')}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 stagger-children ${isVisible ? 'visible' : ''}`}>
          {/* Card 1: Desarrollo Web */}
          <div className="md:col-span-8 card-base rounded-2xl p-8 relative overflow-hidden group">
            <div className="relative z-10 h-full flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">{t('service_1_title')}</h3>
                <p className="text-text-secondary text-base leading-relaxed max-w-md">{t('service_1_desc')}</p>
              </div>
              <div className="mt-6 flex items-center text-text-muted text-sm font-medium group-hover:text-primary transition-colors cursor-pointer">
                <span>{t('learn_more')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Mantenimiento */}
          <div className="md:col-span-4 card-base rounded-2xl p-8 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">{t('service_2_title')}</h3>
                <p className="text-text-secondary text-base leading-relaxed">{t('service_2_desc')}</p>
              </div>
              <div className="mt-6 flex items-center text-text-muted text-sm font-medium group-hover:text-primary transition-colors cursor-pointer">
                <span>{t('explore')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: SaaS */}
          <div className="md:col-span-12 card-base rounded-2xl p-8 md:p-10 relative overflow-hidden group flex flex-col md:flex-row items-start gap-10">
            <div className="flex-1 z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{t('service_3_title')}</h3>
              <p className="text-text-secondary text-base leading-relaxed max-w-2xl mb-6">{t('service_3_desc')}</p>
              <div className="flex flex-wrap gap-2">
                {['Multi-Tenancy', 'Escalabilidad Cloud', 'Diseño de APIs'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-bg-secondary rounded-full text-xs font-medium text-text-muted border border-border-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden md:block w-1/3 aspect-video bg-bg-secondary rounded-xl border border-border-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              <div className="w-full h-full p-6 flex flex-col gap-3">
                <div className="h-4 w-1/2 bg-bg-tertiary rounded" />
                <div className="h-24 w-full bg-bg-tertiary rounded" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-bg-tertiary rounded-full" />
                  <div className="h-8 w-8 bg-bg-tertiary rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
