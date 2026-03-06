'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const technologies = [
  // Frontend
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Framer Motion', icon: '🎬' },
  { name: 'Vite', icon: '⚡' },
  // Backend
  { name: 'Node.js', icon: '⬢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'Express', icon: '🚂' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'REST API', icon: '🔗' },
  // Databases
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'SQLite', icon: '📦' },
  { name: 'Prisma', icon: '◆' },
  { name: 'Redis', icon: '🔴' },
  // Cloud & DevOps
  { name: 'Vercel', icon: '▲' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GitHub Actions', icon: '🔄' },
  { name: 'Cloudflare', icon: '🛡️' },
  { name: 'Linux', icon: '🐧' },
  // Auth & Security
  { name: 'OAuth2', icon: '🔐' },
  { name: 'JWT', icon: '🪙' },
  // Tools
  { name: 'Git', icon: '📂' },
  { name: 'Figma', icon: '🖌️' },
  { name: 'ESLint', icon: '✅' },
  { name: 'Zod', icon: '🛡️' },
];

export default function TechStrip() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  // We duplicate the items to create an infinite seamless loop
  const doubled = [...technologies, ...technologies];

  return (
    <section ref={ref} className="py-14 overflow-hidden border-t border-b border-[var(--border)] bg-[var(--surface)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-8">
          {t('tech_strip_title') || 'Tecnologías que dominamos'}
        </p>

        {/* Marquee container */}
        <div className="relative group">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--surface)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--surface)] to-transparent pointer-events-none" />

          {/* Scrolling track - row 1 (left to right) */}
          <div
            className="flex w-fit animate-marquee group-hover:[animation-play-state:paused] mb-4"
          >
            {doubled.map((tech, i) => (
              <div
                key={`r1-${i}`}
                className="flex items-center gap-2 px-5 py-2.5 mx-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] hover:bg-[rgba(var(--primary-rgb),0.04)] transition-all duration-300 cursor-default shrink-0"
              >
                <span className="text-base leading-none select-none">{tech.icon}</span>
                <span className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Scrolling track - row 2 (right to left) */}
          <div
            className="flex w-fit animate-marquee-reverse group-hover:[animation-play-state:paused]"
          >
            {[...doubled].reverse().map((tech, i) => (
              <div
                key={`r2-${i}`}
                className="flex items-center gap-2 px-5 py-2.5 mx-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] hover:bg-[rgba(var(--primary-rgb),0.04)] transition-all duration-300 cursor-default shrink-0"
              >
                <span className="text-base leading-none select-none">{tech.icon}</span>
                <span className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
