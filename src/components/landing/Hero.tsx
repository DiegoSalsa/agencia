'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';

export default function Hero() {
  const { t } = useI18n();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container || container.children.length > 0) return;

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      const size = (2 + Math.random() * 4) + 'px';
      p.style.width = size;
      p.style.height = size;
      p.style.opacity = String(0.3 + Math.random() * 0.5);
      container.appendChild(p);
    }
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="particles-container" ref={particlesRef} />
        <div className="light-beam" style={{ left: '10%', animationDelay: '0s' }} />
        <div className="light-beam" style={{ left: '25%', animationDelay: '2s' }} />
        <div className="light-beam" style={{ left: '45%', animationDelay: '4s' }} />
        <div className="light-beam" style={{ left: '65%', animationDelay: '1s' }} />
        <div className="light-beam" style={{ left: '80%', animationDelay: '3s' }} />
        <div className="light-beam" style={{ left: '90%', animationDelay: '5s' }} />
      </div>

      {/* Hero Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none hero-glow" />

      <div className="flex flex-col items-center text-center px-6 max-w-[960px] relative z-10">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>🚀 {t('hero_badge')}</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.04em] mb-6">
          <span>{t('hero_title')}</span> <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
            {t('hero_title_highlight')}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-[720px] mb-10">
          {t('hero_subtitle')}
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#portafolio"
            className="group flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-14 px-8 bg-primary text-white text-base font-bold shadow-[0_10px_30px_-10px_rgba(75,43,238,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(75,43,238,0.7)] hover:translate-y-[-3px] transition-all duration-300"
          >
            <span>{t('hero_cta_primary')}</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
          <a
            href="#precios"
            className="group flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-14 px-8 glass text-white text-base font-bold hover:bg-white/10 transition-all duration-300"
          >
            <span>{t('hero_cta_secondary')}</span>
            <span className="material-symbols-outlined text-lg group-hover:rotate-45 transition-transform">open_in_new</span>
          </a>
          <Link
            href="/formulario"
            className="group flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-14 px-8 border-2 border-primary/50 text-primary text-base font-bold hover:bg-primary/10 transition-all duration-300"
          >
            <span>{t('hero_cta_briefing')}</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">assignment</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
