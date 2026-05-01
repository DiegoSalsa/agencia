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
    <section id="portafolio" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Section background — themed */}
      <div className="absolute inset-0 bg-[var(--section-portfolio)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(var(--primary-rgb),0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.04),transparent_55%)]" />
      {/* Diagonal line pattern unique to Portfolio */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(109,40,217,0.2) 0px, rgba(109,40,217,0.2) 1px, transparent 1px, transparent 40px)', backgroundSize: '56px 56px' }} />
      {/* Radial glows */}
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.06)_0%,transparent_55%)]" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.04)_0%,transparent_55%)]" />
      {/* Floating shapes */}
      <svg className="geo-float absolute top-20 right-[8%] w-28 h-28 opacity-[0.06] dark:opacity-[0.04]" style={{ animationDelay: '2s' }} viewBox="0 0 100 100" fill="none">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-tertiary)]" />
        <line x1="5" y1="27.5" x2="95" y2="72.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className="text-[var(--text-tertiary)]" />
        <line x1="95" y1="27.5" x2="5" y2="72.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" className="text-[var(--text-tertiary)]" />
      </svg>
      <svg className="geo-float absolute bottom-[25%] left-[10%] w-20 h-20 opacity-[0.05] dark:opacity-[0.03]" style={{ animationDelay: '5s' }} viewBox="0 0 100 100" fill="none">
        <path d="M50 5 L90 30 L90 70 L50 95 L10 70 L10 30 Z" stroke="currentColor" strokeWidth="2" className="text-[var(--text-tertiary)]" />
      </svg>
      <div className="geo-float absolute bottom-20 left-[12%] w-16 h-16 border border-[var(--feat-border)] rotate-45 rounded-lg" style={{ animationDelay: '4s' }} />
      <div className="geo-float absolute top-[50%] right-[4%] w-12 h-12 border border-[var(--feat-border)] -rotate-12 rounded-md" style={{ animationDelay: '1s' }} />
      {/* Gradient line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
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

        {/* Webs Section */}
        <div className="mb-20">
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-center text-[var(--feat-text)] mb-10"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
          >
            {t('portfolio_web_title')}
          </motion.h3>

          {/* Featured row: first 3 large */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {webProjects.slice(0, 3).map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl border border-[var(--feat-border)] bg-[var(--feat-card-bg)] overflow-hidden transition-all duration-500 hover:border-[var(--feat-card-hover-border)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer"
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 2}
              >
                {/* Thumbnail area */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  {project.thumbnail && (
                    <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  )}
                  {/* Tag overlay */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold border backdrop-blur-md ${project.tagColor}`}>
                    {project.tag}
                  </span>
                  {/* External link icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[var(--feat-text)] mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--feat-text-faint)] leading-relaxed">{t(project.descKey)}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Second row: 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {webProjects.slice(3).map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl border border-[var(--feat-border)] bg-[var(--feat-card-bg)] overflow-hidden transition-all duration-500 hover:border-[var(--feat-card-hover-border)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer"
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 5}
              >
                {/* Thumbnail area */}
                <div className={`relative h-36 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  {project.thumbnail && (
                    <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  )}
                  {/* Tag overlay */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold border backdrop-blur-md ${project.tagColor}`}>
                    {project.tag}
                  </span>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={12} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-[var(--feat-text)] mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--feat-text-faint)] leading-relaxed line-clamp-2">{t(project.descKey)}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* SaaS Section */}
        <div>
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-center text-[var(--feat-text)] mb-10"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={webProjects.length + 2}
          >
            {t('portfolio_saas_title')}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {saasProjects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl border border-[var(--feat-border)] bg-[var(--feat-card-bg)] overflow-hidden transition-all duration-500 hover:border-[var(--feat-card-hover-border)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer"
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={webProjects.length + 3 + i}
              >
                {/* Thumbnail area */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  {project.thumbnail && (
                    <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  )}
                  {/* Tag overlay */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold border backdrop-blur-md ${project.tagColor}`}>
                    {project.tag}
                  </span>
                  {/* External link icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[var(--feat-text)] mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--feat-text-faint)] leading-relaxed">{t(project.descKey)}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
