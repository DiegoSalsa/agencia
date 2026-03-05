'use client';

import { useCallback, type MouseEvent } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

export default function Services() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  }, []);

  return (
    <section id="servicios" ref={ref} className={`py-20 px-6 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className={`mb-16 animate-slide-up ${isVisible ? 'visible' : ''}`}>
          <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">{t('services_tag')}</p>
          <h2 className="section-title text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            <span>{t('services_title')}</span> <br className="hidden md:block" /> <span>{t('services_title_2')}</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 stagger-children ${isVisible ? 'visible' : ''}`}>
          {/* Card 1: Desarrollo Web */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-8 bento-card-gradient bento-card-border rounded-xl p-8 relative overflow-hidden group bento-card"
          >
            <div className="relative z-10 h-full flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6 float-icon">desktop_cloud</span>
                <h3 className="text-2xl font-bold text-white mb-4">{t('service_1_title')}</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">{t('service_1_desc')}</p>
              </div>
              <div className="mt-8 flex items-center text-white/50 text-sm font-semibold group-hover:text-primary transition-colors cursor-pointer">
                <span>{t('learn_more')}</span>
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[240px]">code</span>
            </div>
          </div>

          {/* Card 2: Mantenimiento */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-4 bento-card-gradient bento-card-border rounded-xl p-8 relative overflow-hidden group bento-card"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6 float-icon" style={{ animationDelay: '0.3s' }}>shield</span>
                <h3 className="text-2xl font-bold text-white mb-4">{t('service_2_title')}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{t('service_2_desc')}</p>
              </div>
              <div className="mt-6 flex items-center text-white/50 text-sm font-semibold group-hover:text-primary transition-colors cursor-pointer">
                <span>{t('explore')}</span>
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Card 3: SaaS */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-12 bento-card-gradient bento-card-border rounded-xl p-8 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-12 bento-card"
          >
            <div className="flex-1 z-10">
              <span className="material-symbols-outlined text-primary text-5xl mb-6 float-icon" style={{ animationDelay: '0.6s' }}>layers</span>
              <h3 className="text-3xl font-bold text-white mb-6">{t('service_3_title')}</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-8">{t('service_3_desc')}</p>
              <div className="flex flex-wrap gap-4">
                {['Multi-Tenancy', 'Escalabilidad Cloud', 'Diseño de APIs'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold text-white/70 hover:bg-primary/20 hover:text-primary transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden md:block w-1/3 aspect-video bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              <div className="w-full h-full p-6 flex flex-col gap-3">
                <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse" />
                <div className="h-24 w-full bg-white/10 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
