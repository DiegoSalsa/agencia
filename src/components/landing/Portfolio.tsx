'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

interface PortfolioItem {
  href?: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  isLocal?: boolean;
}

const webProjects: PortfolioItem[] = [
  {
    href: 'https://www.floreriawildgarden.cl/',
    image: '/img/portfolio/eccomerce1.webp',
    tag: 'E-commerce',
    title: 'Florería Wildgarden',
    description: 'E-commerce de flores y arreglos florales',
    isLocal: true,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKCEKe_Zmtq9fNv7PspzBev3bg9h9JYjXbCtDsa_il8q6hH2SnnobUstEbPJ_vwbNOw8bMlc5yeqKwl_-0d5NBITsKu6rh3sKYm-UavUhXqLpQe0vZx4pdn3H2gpVfPDLC-BdIsrjZsspxwZSBhC4lEoX-Cp0r2kr3Dr0U9pqf7DUB-o9ts_W_ydteStttu25fY09WOfDjKZ1SsvD4gF9umi0z007gzu2hUdnVhcBHw26ytkgHPaVbsem4WaHoJY9Fq7NxJ2Ev82U',
    tag: 'Corporate',
    title: 'Inmobiliaria de Lujo',
    description: 'Experiencia inmersiva 3D integrada',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPkxfa0qz1maHMTJ4hMEOyH9tF-cKa4zUzVObIL3m66qWdkGt7iWbEutnO656bN5O3XSEON5vcsmBFLrO-sCbyLtRQ2A_FULM2fbcoXng4ZOzaNWtLnyGt3jkkgHA8QwXkSCY7vvbaV64ZwvBv_5u1in1rEtrD1OiYyVfLGUzkXa6S2Eblpna2IUG_CtoHnK2J3x2HvO0TdAPMbDCr39_pvxpSW-MQn6PiSAtrV2Sfh5TYhobT09CJzemO7A74wahhUCwD7AdiF1g',
    tag: 'Creative',
    title: 'Galería Digital Interactiva',
    description: 'Performance Web Core Vitals A+',
  },
];

const saasProjects: PortfolioItem[] = [
  {
    href: 'https://www.valoralocal.cl/',
    image: '/img/portfolio/saas1.webp',
    tag: 'Analytics',
    title: 'ValoraLocal',
    description: 'Plataforma inteligente de encuestas NPS para medir y potenciar la satisfacción del cliente en tiempo real.',
    isLocal: true,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-mICSKNONw7VQ6WdivIPAmEevxKXI0QE_K6BWRfVjWOwEIcArvd1TrssuvZkd_e4jqRoepQp2E_zw6E3URACHIGV6ENpWfU8ZtJhbYtd7w_7j7N8M6tgc4iQ5bHJhbG5EreZq6tP4GQtrVadZZ8yinGiMspoKC2Ym1KeSEIe76twUarO7QhwlGglro8LB76FPJ2PHeLFxTcoKJpN__95FK4vP6dIdggyOAMcopFxPaRBRqaPk6OgHvsSIiBsAdMCNT8HdD5JkFR4',
    tag: 'Fintech',
    title: 'NexusPay Fintech',
    description: 'Core bancario escalable con micro-pagos en tiempo real.',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEfBVdZ1Hig5eb623-4UMgrOlirPFkcdKFyBgokkiUVjPqQ-xeuUAoVkUR6Q-a2ZF_Fc2nLyOYjr-HJnvWaMj5uOE8WfHUhRivr2OEc-nG7cm9cwLOdn0Ea9zX5pGzdhC7VZHZmKw9ItD46Yhj1LgTkHqZgLdkXE56YuhpdPKXkfPtn4D0oIzAmKhdP5VB3dms5HgXvSvffSIdNL4Mt8pHbK8Trj7lsxP0Uq6SxpJBbLR0mIJn4_fSxKdkR25WKjYTFh_l53oWJIc',
    tag: 'Logistics',
    title: 'LogiTrack Pro',
    description: 'Gestión inteligente de flotas con IA.',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG6QX3A39re-fU7mNTnFXqURbJYb6FfrvJdZsgzahDHqz3VNXRmSAz7BkzRSOYlu0Du4_CNr-A_xHOYybbJ3rXrhQVV_WQAfNOU5kyavEOdattcemg6VCGexSQ2yXlWPAVYhMR2Mj-9y8xo1mZhbqzTSCXaC6TlyQKmNdJgiBpx_PM23iZFVXRoNJhUZ_oY6Pu4tx9dggCNh3vU1W5NPsGtTDBsRfuke9VjTYgCDLkOJ6ZwJ3KaSr8T4wIWpeQvqVR1UFReQ_D8AU',
    tag: 'Healthcare',
    title: 'HealthFlow AI',
    description: 'Gestión clínica con diagnósticos asistidos.',
  },
];

function Carousel({ title, subtitle, items, isSaas }: { title: string; subtitle: string; items: PortfolioItem[]; isSaas?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-8 carousel-container">
      <div className="flex items-end justify-between px-2">
        <div className="space-y-2">
          <h2 className="section-title text-3xl font-black text-white tracking-tight">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <div ref={trackRef} className="carousel-track flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4">
        {items.map((item, i) => {
          const Wrapper = item.href ? 'a' : 'div';
          const wrapperProps = item.href ? { href: item.href, target: '_blank' as const, rel: 'noopener noreferrer' } : {};

          return (
            <Wrapper key={i} {...wrapperProps} className={`min-w-full md:min-w-[calc(33.333%-16px)] snap-start group ${item.href ? 'cursor-pointer' : ''}`}>
              <div className={`relative ${isSaas ? 'aspect-[4/3]' : 'aspect-video'} rounded-2xl overflow-hidden border border-white/10 glass mb-4`}>
                {isSaas && <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-600/10 to-transparent group-hover:from-primary/30 transition-all duration-500" />}
                {item.isLocal ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isSaas ? 'opacity-90 group-hover:scale-105 duration-700' : 'opacity-80'}`}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isSaas && !item.isLocal ? 'mix-blend-overlay opacity-40 group-hover:scale-105 duration-700' : 'opacity-80'}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent" />

                {!isSaas && (
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-wider">{item.tag}</span>
                  </div>
                )}
                {item.href && !isSaas && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white">open_in_new</span>
                  </div>
                )}

                {isSaas && (
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-violet-600/30 backdrop-blur-md flex items-center justify-center mb-4 border border-primary/40 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        {item.tag === 'Analytics' ? 'sentiment_satisfied' : item.tag === 'Fintech' ? 'payments' : item.tag === 'Logistics' ? 'inventory_2' : 'health_metrics'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                      {item.href && (
                        <span className="material-symbols-outlined text-white/50 text-sm group-hover:text-primary group-hover:translate-x-1 transition-all">open_in_new</span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm mb-3">{item.description}</p>
                    {item.tag === 'Analytics' && (
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 rounded-full bg-white/10 text-[10px] font-medium text-slate-300">Analytics</span>
                        <span className="px-2 py-1 rounded-full bg-white/10 text-[10px] font-medium text-slate-300">NPS Score</span>
                        <span className="px-2 py-1 rounded-full bg-white/10 text-[10px] font-medium text-slate-300">Dashboard</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!isSaas && (
                <>
                  <h3 className="text-white font-bold text-lg px-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm px-1">{item.description}</p>
                </>
              )}
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="portafolio" ref={ref} className={`w-full max-w-[1200px] mx-auto px-6 py-32 space-y-24 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <Carousel title={t('portfolio_webs_title')} subtitle={t('portfolio_webs_subtitle')} items={webProjects} />
      <Carousel title={t('portfolio_saas_title')} subtitle={t('portfolio_saas_subtitle')} items={saasProjects} isSaas />
    </section>
  );
}
