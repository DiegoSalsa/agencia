'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Globe, Shield, Layers, Zap, Code, Server,
  Paintbrush, Lock, BarChart3, Smartphone, Cloud,
  Palette, MonitorSmartphone, Search, Rocket,
  Database, ShieldCheck, GitBranch, Settings,
  ShoppingCart, CreditCard, Box
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
    icon: ShoppingCart,
    titleKey: 'service_ecom_title',
    descKey: 'service_ecom_desc',
    gradient: 'from-fuchsia-600 to-pink-600',
    glowColor: 'fuchsia',
    accentColor: 'text-fuchsia-400',
    borderAccent: 'group-hover:border-fuchsia-500/30',
    features: [
      { icon: CreditCard, key: 'svc_feat_ecom_1' },
      { icon: Box, key: 'svc_feat_ecom_2' },
      { icon: Search, key: 'svc_feat_ecom_3' },
      { icon: Rocket, key: 'svc_feat_ecom_4' },
      { icon: Database, key: 'svc_feat_ecom_5' },
      { icon: Lock, key: 'svc_feat_ecom_6' },
    ],
    stat: { value: '+40%', labelKey: 'svc_stat_ecom' },
    techStack: ['Shopify', 'Next.js', 'Stripe', 'Tailwind'],
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

export default function Services({ isHome = false }: { isHome?: boolean }) {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="servicios" ref={ref} className="py-24 px-6 relative overflow-hidden bg-[var(--bg)]">
      {/* Minimalist background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
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
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase mb-6">
            {t('services_tag')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4 tracking-tight">
            {t('services_title')} <br className="hidden md:block" /> {t('services_title_2')}
          </h2>
        </motion.div>

        {/* Full-width alternating rows */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={s.titleKey}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 1}
              >
                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-8 shadow-xl shadow-black/20 dark:shadow-black/50/50">
                    <Icon size={28} className={s.accentColor} />
                  </div>

                  <h3 className="text-4xl sm:text-5xl font-black text-[var(--text)] mb-6 tracking-tight leading-[1.1]">{t(s.titleKey)}</h3>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-[500px]">{t(s.descKey)}</p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10 w-full max-w-[600px]">
                    {s.features.map((f) => {
                      const FIcon = f.icon;
                      return (
                        <div key={f.key} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shrink-0">
                            <FIcon size={14} className={s.accentColor} />
                          </div>
                          <span className="text-sm font-medium text-[var(--text-secondary)]">{t(f.key)}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stat */}
                  <div className="pt-8 border-t border-[var(--border)] w-full flex items-baseline gap-4 mb-8">
                    <span className="text-5xl sm:text-6xl font-black text-[var(--text)]">{s.stat.value}</span>
                    <span className="text-xs sm:text-sm text-[var(--text-tertiary)] uppercase tracking-[0.2em] font-semibold">{t(s.stat.labelKey)}</span>
                  </div>

                  {/* CTA for Homepage */}
                  {isHome && (
                    <Link
                      href="/servicios"
                      className="group flex items-center justify-between w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      <span className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Ver más detalles</span>
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                        <svg className="w-4 h-4 text-[var(--text)] group-hover:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Visual Mockup (Right / Left) */}
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden group">
                    {/* Top gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-70`} />
                    
                    {/* Abstract UI representation */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Fake header */}
                      <div className="h-12 border-b border-[var(--border)] flex items-center px-4 gap-2 bg-[var(--surface)]">
                        <div className="w-3 h-3 rounded-full bg-[var(--text-tertiary)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--text-tertiary)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--text-tertiary)]" />
                      </div>
                      
                      {/* Fake content */}
                      <div className="flex-1 p-8 flex flex-col gap-6 relative overflow-hidden">
                        {/* Decorative background blur */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-${s.glowColor}-500/10 blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-1000`} />
                        
                        <div className="w-3/4 h-8 rounded-lg bg-[var(--surface-hover)] border border-[var(--border)]" />
                        <div className="w-full h-32 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                          <Icon size={48} className={`${s.accentColor} opacity-20`} />
                        </div>
                        <div className="flex gap-4">
                          <div className="w-1/2 h-24 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]" />
                          <div className="w-1/2 h-24 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]" />
                        </div>
                      </div>
                    </div>
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
