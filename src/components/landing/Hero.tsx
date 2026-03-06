'use client';

import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col items-center text-center px-6 max-w-[960px] relative z-10">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>{t('hero_badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title text-display-lg md:text-display-xl mb-6 text-text-primary">
          {t('hero_title')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
            {t('hero_title_highlight')}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle text-text-secondary text-lg md:text-xl font-normal leading-relaxed max-w-[680px] mb-12">
          {t('hero_subtitle')}
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#portafolio"
            className="group btn-primary flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-14 px-8 text-base font-semibold"
          >
            <span>{t('hero_cta_primary')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#precios"
            className="group btn-secondary flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-14 px-8 text-base font-semibold"
          >
            <span>{t('hero_cta_secondary')}</span>
            <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
