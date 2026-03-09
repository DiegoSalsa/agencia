'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const technologies = [
  // Frontend
  { name: 'React', icon: 'Re', color: '#61DAFB' },
  { name: 'Next.js', icon: '▲', color: '#ffffff' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
  { name: 'HTML5', icon: 'H5', color: '#E34F26' },
  { name: 'CSS3', icon: 'C3', color: '#1572B6' },
  { name: 'Tailwind CSS', icon: 'TW', color: '#06B6D4' },
  { name: 'Framer Motion', icon: 'FM', color: '#BB4BF6' },
  { name: 'Vite', icon: 'Vi', color: '#646CFF' },
  // Backend
  { name: 'Node.js', icon: '⬢', color: '#5FA04E' },
  { name: 'Python', icon: 'Py', color: '#3776AB' },
  { name: 'Java', icon: 'Jv', color: '#ED8B00' },
  { name: 'Express', icon: 'Ex', color: '#ffffff' },
  { name: 'GraphQL', icon: '◈', color: '#E10098' },
  { name: 'REST API', icon: 'AP', color: '#6BA539' },
  // Databases
  { name: 'PostgreSQL', icon: 'PG', color: '#4169E1' },
  { name: 'MongoDB', icon: 'MG', color: '#47A248' },
  { name: 'MySQL', icon: 'My', color: '#4479A1' },
  { name: 'SQLite', icon: 'SL', color: '#003B57' },
  { name: 'Prisma', icon: '◆', color: '#2D3748' },
  { name: 'Redis', icon: 'Rd', color: '#DC382D' },
  // Cloud & DevOps
  { name: 'Vercel', icon: '▲', color: '#ffffff' },
  { name: 'AWS', icon: 'AW', color: '#FF9900' },
  { name: 'Docker', icon: 'Dk', color: '#2496ED' },
  { name: 'GitHub Actions', icon: 'GA', color: '#2088FF' },
  { name: 'Cloudflare', icon: 'CF', color: '#F38020' },
  { name: 'Linux', icon: 'Lx', color: '#FCC624' },
  // Auth & Security
  { name: 'OAuth2', icon: 'OA', color: '#EB5424' },
  { name: 'JWT', icon: 'JW', color: '#D63AFF' },
  // Tools
  { name: 'Git', icon: 'Gt', color: '#F05032' },
  { name: 'Figma', icon: 'Fg', color: '#A259FF' },
  { name: 'ESLint', icon: 'EL', color: '#4B32C3' },
  { name: 'Zod', icon: 'Zd', color: '#3068B7' },
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
                <span className="text-base font-bold leading-none select-none" style={{ color: tech.color }}>{tech.icon}</span>
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
                <span className="text-base font-bold leading-none select-none" style={{ color: tech.color }}>{tech.icon}</span>
                <span className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
