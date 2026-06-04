'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, MessageCircle, ChevronDown } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';

const whatsappContacts = [
  { name: 'PuroCode', phone: '+56949255006', label: '+56 9 4925 5006' },
];

const technologies = [
  { name: 'React', icon: 'Re', color: '#61DAFB' },
  { name: 'Next.js', icon: '▲', color: 'var(--tech-mono)' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
  { name: 'HTML5', icon: 'H5', color: '#E34F26' },
  { name: 'CSS3', icon: 'C3', color: '#1572B6' },
  { name: 'Tailwind CSS', icon: 'TW', color: '#06B6D4' },
  { name: 'Framer Motion', icon: 'FM', color: '#BB4BF6' },
  { name: 'Vite', icon: 'Vi', color: '#646CFF' },
  { name: 'Node.js', icon: '⬢', color: '#5FA04E' },
  { name: 'Python', icon: 'Py', color: '#3776AB' },
  { name: 'Java', icon: 'Jv', color: '#ED8B00' },
  { name: 'Express', icon: 'Ex', color: 'var(--tech-mono)' },
  { name: 'GraphQL', icon: '◈', color: '#E10098' },
  { name: 'REST API', icon: 'AP', color: '#6BA539' },
  { name: 'PostgreSQL', icon: 'PG', color: '#4169E1' },
  { name: 'MongoDB', icon: 'MG', color: '#47A248' },
  { name: 'MySQL', icon: 'My', color: '#4479A1' },
  { name: 'SQLite', icon: 'SL', color: '#003B57' },
  { name: 'Prisma', icon: '◆', color: '#2D3748' },
  { name: 'Redis', icon: 'Rd', color: '#DC382D' },
  { name: 'Vercel', icon: '▲', color: 'var(--tech-mono)' },
  { name: 'AWS', icon: 'AW', color: '#FF9900' },
  { name: 'Docker', icon: 'Dk', color: '#2496ED' },
  { name: 'GitHub Actions', icon: 'GA', color: '#2088FF' },
  { name: 'Cloudflare', icon: 'CF', color: '#F38020' },
  { name: 'Linux', icon: 'Lx', color: '#FCC624' },
  { name: 'OAuth2', icon: 'OA', color: '#EB5424' },
  { name: 'JWT', icon: 'JW', color: '#D63AFF' },
  { name: 'Git', icon: 'Gt', color: '#F05032' },
  { name: 'Figma', icon: 'Fg', color: '#A259FF' },
  { name: 'ESLint', icon: 'EL', color: '#4B32C3' },
  { name: 'Zod', icon: 'Zd', color: '#3068B7' },
];

const doubled = [...technologies, ...technologies];

function TechMarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...doubled].reverse() : doubled;
  return (
    <div className="relative group/marquee overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
      <div className={`flex w-fit ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover/marquee:[animation-play-state:paused]`}>
        {items.map((tech, i) => (
          <div
            key={`${reverse ? 'b' : 't'}-${i}`}
            className="flex items-center gap-2 px-4 py-2 mx-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:bg-[rgba(var(--primary-rgb),0.04)] transition-all duration-300 cursor-default shrink-0"
          >
            <span className="text-sm font-bold leading-none select-none" style={{ color: tech.color }}>{tech.icon}</span>
            <span className="text-xs font-medium text-[var(--text-tertiary)] whitespace-nowrap">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const [wspOpen, setWspOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const highlights = (t('hero_title_highlights') || t('hero_title_highlight')).split(',');

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]">
      {/* Premium subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0%,transparent_60%)] opacity-70" />
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-row items-center gap-3 lg:gap-8">
          
          {/* Left Column: Text */}
          <div className="flex flex-col items-start text-left w-[55%] sm:w-1/2">
            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[1.05] tracking-tight mb-3 sm:mb-8 text-[var(--text)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('hero_title')}{' '}
              <br className="hidden lg:block" />
              <span className="inline-block mt-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={highlightIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-[var(--primary)]"
                  >
                    {highlights[highlightIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              className="text-[var(--text-secondary)] text-xs sm:text-lg lg:text-xl leading-relaxed mb-5 sm:mb-12 font-medium max-w-[540px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero_subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col xl:flex-row gap-2 sm:gap-4 items-start xl:items-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="https://wa.me/56949255006?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group text-[10px] sm:text-sm lg:text-base font-bold h-9 px-3 sm:h-14 sm:px-8 w-auto cursor-pointer shadow-lg hover:shadow-[rgba(var(--primary-rgb),0.3)] transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="truncate">{t('hero_cta_primary')}</span>
                <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/planes"
                className="btn-secondary group text-[10px] sm:text-sm lg:text-base font-bold h-9 px-3 sm:h-14 sm:px-8 w-auto cursor-pointer bg-transparent hover:bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2"
              >
                <Eye className="w-3 h-3 sm:w-5 sm:h-5 shrink-0" />
                <span className="truncate">{t('hero_cta_secondary')}</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual Mockup / Dashboard */}
          <motion.div 
            className="relative w-[45%] sm:w-1/2 flex items-center justify-end px-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main floating window */}
            <div className="relative w-full aspect-[4/3] rounded-lg sm:rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-700">
              {/* Window Header */}
              <div className="flex items-center px-3 py-1.5 sm:px-4 sm:py-3 border-b border-[var(--border)] bg-[var(--surface)]">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="mx-auto text-[7px] sm:text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest uppercase truncate ml-2">
                  purocode-architecture.tsx
                </div>
              </div>
              
              {/* Window Body (Code Mockup) */}
              <div className="p-3 sm:p-6 font-mono text-[8px] sm:text-sm leading-[1.6] text-[var(--text-secondary)] h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10">
                  <svg className="w-16 h-16 sm:w-32 sm:h-32 text-[var(--text)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l12 12-12 12L0 12z" />
                  </svg>
                </div>
                <p><span className="text-[#E2777A]">import</span> <span className="text-[#61DAFB]">{'{'}</span> scale <span className="text-[#61DAFB]">{'}'}</span> <span className="text-[#E2777A]">from</span> <span className="text-[#98C379]">'@purocode/core'</span>;</p>
                <p className="mt-4"><span className="text-[#E2777A]">const</span> <span className="text-[#E5C07B]">App</span> <span className="text-[#61DAFB]">=</span> () <span className="text-[#E2777A]">=&gt;</span> {'{'}</p>
                <p className="pl-4 mt-2"><span className="text-[#E2777A]">return</span> (</p>
                <p className="pl-8 mt-2"><span className="text-[#61DAFB]">&lt;</span><span className="text-[#E06C75]">DigitalExperience</span></p>
                <p className="pl-12 text-[#D19A66]">performance<span className="text-[#61DAFB]">={'{'}</span><span className="text-[#D19A66]">100</span><span className="text-[#61DAFB]">{'}'}</span></p>
                <p className="pl-12 text-[#D19A66]">architecture<span className="text-[#61DAFB]">=</span><span className="text-[#98C379]">"scalable"</span></p>
                <p className="pl-12 text-[#D19A66]">design<span className="text-[#61DAFB]">=</span><span className="text-[#98C379]">"pixel-perfect"</span></p>
                <p className="pl-8"><span className="text-[#61DAFB]">&gt;</span></p>
                <p className="pl-12 mt-2 text-[#ABB2BF]">/* Next-Gen Web Solutions */</p>
                <p className="pl-8 mt-2"><span className="text-[#61DAFB]">&lt;/</span><span className="text-[#E06C75]">DigitalExperience</span><span className="text-[#61DAFB]">&gt;</span></p>
                <p className="pl-4 mt-2">);</p>
                <p className="mt-2">{'}'};</p>
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div 
              className="absolute -bottom-3 -left-3 sm:-bottom-8 sm:-left-8 lg:-bottom-12 lg:-left-12 p-2 sm:p-5 rounded-lg sm:rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl shadow-2xl z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <ArrowRight className="text-emerald-400 -rotate-45 w-3 h-3 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-sm sm:text-2xl font-black text-[var(--text)] leading-none">99.9%</div>
                  <div className="text-[7px] sm:text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-0.5 sm:mt-1">Uptime</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Tech Marquee Row - Integrated cleanly at the bottom */}
      <motion.div
        className="w-full mt-24 relative z-10 border-y border-[var(--border)] bg-[var(--bg-secondary)] py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <TechMarqueeRow />
      </motion.div>
    </section>
  );
}
