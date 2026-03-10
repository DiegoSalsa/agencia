'use client';

import { motion } from 'framer-motion';
import {
  Globe, Shield, Layers, Zap, Code, Server,
  Paintbrush, Lock, BarChart3, Smartphone, Cloud,
  Palette, MonitorSmartphone, Search, Rocket,
  Database, ShieldCheck, GitBranch, Settings,
} from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const services = [
  {
    icon: Globe,
    titleKey: 'service_1_title',
    descKey: 'service_1_desc',
    gradient: 'from-violet-600 to-indigo-600',
    glowColor: 'violet',
    accentColor: 'text-violet-400',
    borderAccent: 'group-hover:border-violet-500/30',
    features: [
      { icon: Code, key: 'svc_feat_1_1' },
      { icon: Paintbrush, key: 'svc_feat_1_2' },
      { icon: Smartphone, key: 'svc_feat_1_3' },
      { icon: Zap, key: 'svc_feat_1_4' },
      { icon: Palette, key: 'svc_feat_1_5' },
      { icon: Search, key: 'svc_feat_1_6' },
    ],
    stat: { value: '90+', labelKey: 'svc_stat_1' },
    techStack: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    icon: Shield,
    titleKey: 'service_2_title',
    descKey: 'service_2_desc',
    gradient: 'from-emerald-600 to-teal-600',
    glowColor: 'emerald',
    accentColor: 'text-emerald-400',
    borderAccent: 'group-hover:border-emerald-500/30',
    features: [
      { icon: Lock, key: 'svc_feat_2_1' },
      { icon: Server, key: 'svc_feat_2_2' },
      { icon: BarChart3, key: 'svc_feat_2_3' },
      { icon: Rocket, key: 'svc_feat_2_4' },
      { icon: Settings, key: 'svc_feat_2_5' },
      { icon: ShieldCheck, key: 'svc_feat_2_6' },
    ],
    stat: { value: '99.9%', labelKey: 'svc_stat_2' },
    techStack: ['Vercel', 'Docker', 'GitHub Actions', 'Cloudflare'],
  },
  {
    icon: Layers,
    titleKey: 'service_3_title',
    descKey: 'service_3_desc',
    gradient: 'from-blue-600 to-cyan-600',
    glowColor: 'blue',
    accentColor: 'text-blue-400',
    borderAccent: 'group-hover:border-blue-500/30',
    features: [
      { icon: Cloud, key: 'svc_feat_3_1' },
      { icon: Server, key: 'svc_feat_3_2' },
      { icon: Database, key: 'svc_feat_3_3' },
      { icon: Lock, key: 'svc_feat_3_4' },
      { icon: BarChart3, key: 'svc_feat_3_5' },
      { icon: GitBranch, key: 'svc_feat_3_6' },
    ],
    stat: { value: '∞', labelKey: 'svc_stat_3' },
    techStack: ['Node.js', 'Prisma', 'PostgreSQL', 'AWS'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

export default function Services() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="servicios" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Rich brand background matching hero treatment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        {/* Radial glows — hero-level intensity */}
        <div className="absolute top-0 right-[10%] w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.12)_0%,rgba(var(--primary-rgb),0.04)_40%,transparent_70%)]" />
        <div className="absolute bottom-0 left-[5%] w-[600px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_60%)]" />
        {/* Floating geometric shapes */}
        <svg className="geo-float absolute top-16 right-[10%] w-28 h-28 opacity-[0.05]" style={{ animationDelay: '1s' }} viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
        </svg>
        <svg className="geo-float absolute bottom-[20%] left-[15%] w-20 h-20 opacity-[0.04]" style={{ animationDelay: '5s' }} viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="currentColor" strokeWidth="3" className="text-[var(--primary)]" />
        </svg>
        <div className="geo-float absolute bottom-20 left-[5%] w-16 h-16 border border-[rgba(var(--primary-rgb),0.1)] rotate-45 rounded-lg" style={{ animationDelay: '3s' }} />
        <div className="geo-float absolute top-[30%] left-[3%] w-12 h-12 border border-[rgba(var(--primary-rgb),0.08)] -rotate-12 rounded-md" style={{ animationDelay: '0s' }} />
        <div className="geo-float absolute top-[60%] right-[4%] w-10 h-10 bg-[rgba(var(--primary-rgb),0.04)] rotate-[20deg] rounded-sm" style={{ animationDelay: '4s' }} />
        {/* Gradient line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary-rgb),0.15)] to-transparent" />
      </div>
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
        >
          <p className="section-label mb-4">{t('services_tag')}</p>
          <h2 className="section-title mb-4">
            {t('services_title')} <br className="hidden md:block" /> {t('services_title_2')}
          </h2>
        </motion.div>

        {/* 3 equal columns in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.titleKey}
                className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${s.borderAccent}`}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${s.gradient}`} />

                {/* Glow effect on hover */}
                <div
                  className={`absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 blur-3xl bg-${s.glowColor}-500`}
                />

                <div className="relative p-7 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} p-[1px] mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-2xl bg-[var(--surface)] flex items-center justify-center">
                      <Icon size={24} className={s.accentColor} />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-[var(--text)] mb-2">{t(s.titleKey)}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{t(s.descKey)}</p>

                  {/* Features */}
                  <div className="space-y-2.5 mb-6 flex-1">
                    {s.features.map((f) => {
                      const FIcon = f.icon;
                      return (
                        <div key={f.key} className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${s.gradient} p-[1px] shrink-0`}>
                            <div className="w-full h-full rounded-md bg-[var(--surface)] flex items-center justify-center">
                              <FIcon size={10} className={s.accentColor} />
                            </div>
                          </div>
                          <span className="text-sm text-[var(--text-secondary)]">{t(f.key)}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[var(--surface-hover)] text-[var(--text-tertiary)] border border-[var(--border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stat */}
                  <div className="pt-5 border-t border-[var(--border)] flex items-baseline gap-2">
                    <span className={`text-3xl font-extrabold ${s.accentColor}`}>{s.stat.value}</span>
                    <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{t(s.stat.labelKey)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
