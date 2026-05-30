'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

interface Project {
  href: string;
  title: string;
  descKey: string;
  tag: string;
  tagColor: string;
  gradient: string;
  thumbnail?: string;
}

const webProjects: Project[] = [
  {
    href: 'https://pagina-podomed-clinical.vercel.app',
    title: 'PodomedClinical',
    descKey: 'portfolio_1_desc',
    tag: 'Landing Page',
    tagColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    gradient: 'from-blue-600/40 via-cyan-600/30 to-blue-800/40',
    thumbnail: '/img/FotosPaginas/PodoMedLanding.png',
  },
  {
    href: 'https://jessica-belmar-podologia.vercel.app',
    title: 'Jessica Belmar',
    descKey: 'portfolio_2_desc',
    tag: 'Landing Page',
    tagColor: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    gradient: 'from-sky-600/40 via-blue-600/30 to-indigo-800/40',
    thumbnail: '/img/FotosPaginas/JessicaBelmarPodologia.png',
  },
  {
    href: 'https://www.floreriawildgarden.cl',
    title: 'Florería Wildgarden',
    descKey: 'portfolio_3_desc',
    tag: 'E-commerce',
    tagColor: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    gradient: 'from-pink-600/40 via-rose-600/30 to-fuchsia-800/40',
    thumbnail: '/img/FotosPaginas/FloreriaWildGarden.png',
  },
  {
    href: 'https://stride-landing-v1.vercel.app',
    title: 'Stride',
    descKey: 'portfolio_4_desc',
    tag: 'Demo',
    tagColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    gradient: 'from-amber-600/40 via-orange-600/30 to-red-800/40',
    thumbnail: '/img/FotosPaginas/StrideLanding.png',
  },
  {
    href: 'https://sushi-weld.vercel.app',
    title: 'Sushi Landing',
    descKey: 'portfolio_5_desc',
    tag: 'Demo',
    tagColor: 'bg-red-500/15 text-red-400 border-red-500/30',
    gradient: 'from-red-600/40 via-amber-600/30 to-orange-800/40',
    thumbnail: '/img/FotosPaginas/SushiDemo.png',
  },
  {
    href: 'https://pagina-bioimpacto.vercel.app',
    title: 'BioImpacto',
    descKey: 'portfolio_6_desc',
    tag: 'Web Corporativa',
    tagColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    gradient: 'from-emerald-600/40 via-teal-600/30 to-green-800/40',
    thumbnail: '/img/FotosPaginas/Bioimpacto.png',
  },
  {
    href: 'https://banqueteria-demo.vercel.app',
    title: 'Demo Banquetería',
    descKey: 'portfolio_8_desc',
    tag: 'Demo',
    tagColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    gradient: 'from-orange-600/40 via-amber-600/30 to-yellow-800/40',
    thumbnail: '/img/FotosPaginas/DemoBanqueteria.png',
  },
];

const saasProjects: Project[] = [
  {
    href: 'https://satisfaccion-clientes-alpha.vercel.app',
    title: 'ValoraLocal',
    descKey: 'portfolio_7_desc',
    tag: 'SaaS',
    tagColor: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    gradient: 'from-violet-600/40 via-purple-600/30 to-indigo-800/40',
    thumbnail: '/img/FotosPaginas/ValoraLocal.png',
  },
  {
    href: 'https://www.puragenda.cl/',
    title: 'Puragenda',
    descKey: 'portfolio_9_desc',
    tag: 'SaaS',
    tagColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    gradient: 'from-indigo-600/40 via-blue-600/30 to-violet-800/40',
    thumbnail: '/img/FotosPaginas/Puragenda.png',
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function Portfolio() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="portafolio" ref={ref} className="relative py-24 px-6 overflow-hidden bg-[#050505]">
      {/* Minimalist background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>
      {/* Gradient line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%236d28d9\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

            <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-4">{t('portfolio_tag')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--feat-text)] mb-4 tracking-tight">{t('portfolio_title')}</h2>
          <p className="text-[var(--feat-text-muted)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6">{t('portfolio_subtitle')}</p>
          {/* Trust indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--feat-glow)] border border-[var(--feat-border)]">
            <div className="flex -space-x-1">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400/80 ring-1 ring-[var(--section-portfolio)]" />
              ))}
            </div>
            <span className="text-xs text-[var(--feat-text-faint)] font-medium">{t('portfolio_trust_badge')}</span>
          </div>
        </motion.div>

        {/* Massive Portfolio Showcase */}
        <div className="flex flex-col gap-32 lg:gap-48 mt-24">
          {[...webProjects.slice(0, 4), ...saasProjects].map((project, i) => {
            const isEven = i % 2 === 0;

            return (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center cursor-pointer`}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                {/* Live Real-time Iframe Section */}
                <div className="w-full lg:w-3/5">
                  <div className={`relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#222] bg-[#0A0A0A] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:shadow-[rgba(var(--primary-rgb),0.1)]`}>
                    
                    {/* Real-time Screenshot API (Microlink fallback) */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={`https://api.microlink.io/?url=${encodeURIComponent(project.href)}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={`Vista en vivo de ${project.title}`}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110 bg-[#111]"
                        loading="lazy"
                      />
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 mix-blend-overlay z-10 pointer-events-none`} />
                    
                    {/* Hover UI */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-sm">
                      <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/50 border border-white/10 flex items-center gap-2 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Sitio en Vivo
                      </div>
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
                  <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border mb-6 ${project.tagColor} bg-transparent`}>
                    {project.tag}
                  </span>
                  
                  <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1] group-hover:text-indigo-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-[#888] leading-relaxed mb-8 max-w-[400px]">
                    {t(project.descKey)}
                  </p>

                  <div className="inline-flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest pb-1 border-b-2 border-transparent group-hover:border-indigo-500 transition-colors duration-300">
                    Ver Proyecto <ExternalLink size={14} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
