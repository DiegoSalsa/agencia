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

const projects: Project[] = [
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
    tag: 'Landing Page',
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
    href: 'https://satisfaccion-clientes-alpha.vercel.app',
    title: 'ValoraLocal',
    descKey: 'portfolio_7_desc',
    tag: 'SaaS',
    tagColor: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    gradient: 'from-violet-600/40 via-purple-600/30 to-indigo-800/40',
    thumbnail: '/img/FotosPaginas/ValoraLocal.png',
  },
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
      {/* Dark background — warm-shifted to differentiate from Pricing */}
      <div className="absolute inset-0 bg-[#0a0810]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05),transparent_55%)]" />
      {/* Diagonal line pattern unique to Portfolio */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 40px)', backgroundSize: '56px 56px' }} />
      {/* Radial glows */}
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_55%)]" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_55%)]" />
      {/* Floating shapes */}
      <svg className="geo-float absolute top-20 right-[8%] w-28 h-28 opacity-[0.04]" style={{ animationDelay: '2s' }} viewBox="0 0 100 100" fill="none">
        <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="white" strokeWidth="2" />
      </svg>
      <svg className="geo-float absolute bottom-[25%] left-[10%] w-20 h-20 opacity-[0.03]" style={{ animationDelay: '5s' }} viewBox="0 0 100 100" fill="none">
        <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="white" strokeWidth="3" />
      </svg>
      <div className="geo-float absolute bottom-20 left-[12%] w-16 h-16 border border-white/[0.06] rotate-45 rounded-lg" style={{ animationDelay: '4s' }} />
      <div className="geo-float absolute top-[50%] right-[4%] w-12 h-12 border border-white/[0.05] -rotate-12 rounded-md" style={{ animationDelay: '1s' }} />
      {/* Gradient line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-4">{t('portfolio_tag')}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{t('portfolio_title')}</h2>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-6">{t('portfolio_subtitle')}</p>
          {/* Trust indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <div className="flex -space-x-1">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="w-2 h-2 rounded-full bg-emerald-400/80 ring-1 ring-[#07060b]" />
              ))}
            </div>
            <span className="text-xs text-white/50 font-medium">{t('portfolio_trust_badge')}</span>
          </div>
        </motion.div>

        {/* Featured row: first 3 large */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {projects.slice(0, 3).map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
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
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">{t(project.descKey)}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Second row: 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.slice(3).map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 cursor-pointer"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 4}
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
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-white/35 leading-relaxed line-clamp-2">{t(project.descKey)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
