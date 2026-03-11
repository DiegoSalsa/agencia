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
    <section id="hero" className="relative flex flex-col items-center justify-center pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        {/* Main radial glow — boosted */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15)_0%,rgba(var(--primary-rgb),0.05)_40%,transparent_70%)]" />
        {/* Secondary accent glow */}
        <div className="absolute top-[60%] left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.06)_0%,transparent_60%)]" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.05)_0%,transparent_60%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      {/* Floating geometric shapes inspired by logo angular lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="geo-float absolute top-[15%] left-[8%] w-20 h-20 border border-[rgba(var(--primary-rgb),0.15)] bg-[rgba(var(--primary-rgb),0.03)] rotate-45 rounded-lg" style={{ animationDelay: '0s' }} />
        <div className="geo-float absolute top-[25%] right-[12%] w-14 h-14 border border-[rgba(var(--primary-rgb),0.12)] bg-[rgba(var(--primary-rgb),0.04)] rotate-12 rounded-md" style={{ animationDelay: '2s' }} />
        <div className="geo-float absolute bottom-[30%] left-[15%] w-10 h-10 bg-[rgba(var(--primary-rgb),0.06)] rotate-[30deg] rounded-sm" style={{ animationDelay: '4s' }} />
        <div className="geo-float absolute bottom-[25%] right-[8%] w-16 h-16 border border-[rgba(var(--primary-rgb),0.1)] bg-[rgba(var(--primary-rgb),0.02)] -rotate-12 rounded-lg" style={{ animationDelay: '1s' }} />
        {/* Abstract geometric shapes */}
        <svg className="geo-float absolute top-[20%] right-[20%] w-24 h-24 opacity-[0.08]" style={{ animationDelay: '3s' }} viewBox="0 0 100 100" fill="none">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
          <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" stroke="currentColor" strokeWidth="1" className="text-[var(--primary)]" opacity="0.5" />
        </svg>
        <svg className="geo-float absolute bottom-[35%] left-[25%] w-16 h-16 opacity-[0.07]" style={{ animationDelay: '5s' }} viewBox="0 0 100 100" fill="none">
          <path d="M10 90 L50 10 L90 90 Z" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" opacity="0.6" />
        </svg>
      </div>

      {/* Top Tech Marquee Row */}
      <motion.div
        className="w-full mb-5 sm:mb-10 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <TechMarqueeRow />
      </motion.div>

      <div className="flex flex-col items-center text-center px-4 sm:px-6 max-w-[900px] relative z-10">
        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.08] tracking-[-0.035em] mb-4 sm:mb-6 text-[var(--text)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('hero_title')}{' '}
          <br className="hidden sm:block" />
          <span className="inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={highlightIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[#a78bfa] to-[var(--primary-light)]"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {highlights[highlightIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[var(--text-secondary)] text-sm sm:text-lg md:text-xl leading-relaxed max-w-[640px] mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 items-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Primary: Cotiza */}
          <Link
            href="/formulario"
            className="btn-primary group text-sm sm:text-base !h-11 sm:!h-13 !px-6 sm:!px-8 w-full sm:w-auto cursor-pointer"
          >
            {t('hero_cta_primary')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary: Portafolio */}
          <a
            href="#portafolio"
            className="btn-secondary group text-sm sm:text-base !h-11 sm:!h-13 !px-6 sm:!px-8 w-full sm:w-auto cursor-pointer"
          >
            <Eye size={18} />
            {t('hero_cta_secondary')}
          </a>

          {/* WhatsApp with selector */}
          <div className="relative">
            <button
              onClick={() => setWspOpen(!wspOpen)}
              className="flex items-center justify-center gap-2.5 h-11 sm:h-[52px] px-6 sm:px-8 rounded-xl bg-[#25D366]/10 text-[#25D366] font-semibold text-sm sm:text-base hover:bg-[#25D366]/20 transition-all cursor-pointer border border-[#25D366]/20 w-full sm:w-auto"
            >
              <MessageCircle size={20} />
              WhatsApp
              <ChevronDown size={18} className={`transition-transform ${wspOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {wspOpen && (
                <motion.div
                  className="absolute top-full mt-2 left-0 right-0 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden z-20 min-w-[220px]"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  {whatsappContacts.map((c) => (
                    <a
                      key={c.phone}
                      href={`https://wa.me/${c.phone.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                      onClick={() => setWspOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                        <MessageCircle size={14} className="text-[#25D366]" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-[var(--text)]">{c.name}</p>
                        <p className="text-xs text-[var(--text-tertiary)]">{c.label}</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 50% upfront note */}
        <motion.p
          className="mt-4 sm:mt-8 text-xs text-[var(--text-tertiary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('hero_payment_note')}
        </motion.p>
      </div>

      {/* Bottom Tech Marquee Row */}
      <motion.div
        className="w-full mt-4 sm:mt-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <TechMarqueeRow reverse />
      </motion.div>
    </section>
  );
}
