'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import PageHeader from '@/components/shared/PageHeader';
import { useInView } from '@/hooks/useInView';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Code2, ShoppingBag, Layers, Layout, Gauge,
  Megaphone, Share2, Film, Target, TrendingUp,
  ArrowRight, ShieldCheck, Zap, Users, CheckCircle2,
  ArrowUpRight, ArrowLeftRight
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function EcosistemaContent() {
  const { t } = useI18n();
  const { ref: s1Ref, isVisible: s1Visible } = useInView();
  const { ref: originRef, isVisible: originVisible } = useInView();
  const { ref: s2Ref, isVisible: s2Visible } = useInView();
  const { ref: s3Ref, isVisible: s3Visible } = useInView();
  const { ref: s4Ref, isVisible: s4Visible } = useInView();
  const { ref: ctaRef, isVisible: ctaVisible } = useInView();

  return (
    <>
      <PageHeader
        title={t('eco_page_title')}
        highlight={t('eco_page_highlight')}
        subtitle={t('eco_page_subtitle')}
        breadcrumb={[
          { label: 'Ecosistema Digital', href: '/ecosistema-digital' }
        ]}
      />

      <div className="bg-[var(--bg)] relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-24 relative z-10 flex flex-col gap-32">
          
          {/* Section 1: PuroCode Focus */}
          <section ref={s1Ref} className="scroll-mt-32">
            <motion.div 
              className="mb-12 max-w-3xl"
              initial="hidden" animate={s1Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-bold tracking-widest uppercase text-violet-500">
                {t('eco_sec1_tag')}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                {t('eco_sec1_title')}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {t('eco_sec1_desc_1')}
                <Link href="/servicios" className="font-semibold text-[var(--primary)] hover:underline underline-offset-2">
                  {t('eco_sec1_desc_link')}
                </Link>
                {t('eco_sec1_desc_2')}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden" animate={s1Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
            >
              {[
                { i: Code2, k: 'eco_sec1_f1' },
                { i: ShoppingBag, k: 'eco_sec1_f2' },
                { i: Layers, k: 'eco_sec1_f3' },
                { i: Layout, k: 'eco_sec1_f4' },
                { i: Gauge, k: 'eco_sec1_f5' },
              ].map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                    <f.i size={20} className="text-violet-500" />
                  </div>
                  <span className="font-semibold text-[var(--text)]">{t(f.k)}</span>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Origin Section */}
          <section ref={originRef} className="scroll-mt-32">
            <motion.div 
              className="max-w-3xl"
              initial="hidden" animate={originVisible ? 'visible' : 'hidden'} variants={fadeUp} custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-bold tracking-widest uppercase text-amber-500">
                {t('eco_origin_tag')}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                {t('eco_origin_title')}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {t('eco_origin_desc')}
              </p>
            </motion.div>
          </section>

          {/* Section 2: Intro to Partners & Section 3: Agencia Brújula */}
          <section ref={s2Ref} className="scroll-mt-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial="hidden" animate={s2Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={0}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-bold tracking-widest uppercase text-[#F3B900]">
                  {t('eco_sec2_tag')}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                  {t('eco_sec2_title')}
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                  {t('eco_sec2_desc')}
                </p>
              </motion.div>

              <motion.div 
                className="relative p-8 md:p-10 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xl shadow-black/5"
                initial="hidden" animate={s2Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#551273] to-[#F3B900] rounded-t-3xl" />
                <div className="mb-6">
                  <Image src="/img/brujula-logo.svg" alt="Agencia Brújula" width={128} height={128} className="w-32 h-32 object-contain" />
                </div>
                <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                  {t('eco_sec3_desc_1')}
                  <a href="https://agenciabrujula.com/ecosistema-digital" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#F3B900] hover:underline underline-offset-2">
                    {t('eco_sec3_desc_link')}
                  </a>
                  {t('eco_sec3_desc_2')}
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    { i: Megaphone, k: 'eco_sec3_f1' },
                    { i: Share2, k: 'eco_sec3_f2' },
                    { i: Film, k: 'eco_sec3_f3' },
                    { i: Target, k: 'eco_sec3_f4' },
                    { i: TrendingUp, k: 'eco_sec3_f5' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F3B900]/10 flex items-center justify-center shrink-0">
                        <item.i size={14} className="text-[#F3B900]" />
                      </div>
                      <span className="font-medium text-[var(--text)]">{t(item.k)}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://agenciabrujula.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center group"
                >
                  {t('eco_sec3_cta')}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* Section 4: Workflow */}
          <section ref={s3Ref} className="scroll-mt-32">
            <motion.div 
              className="text-center mb-16"
              initial="hidden" animate={s3Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={0}
            >
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                {t('eco_sec4_title')}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
                {t('eco_sec4_desc_1')}
                <Link href="/soluciones/desarrollo-aplicaciones-web" className="font-semibold text-[var(--primary)] hover:underline underline-offset-2">
                  {t('eco_sec4_desc_link')}
                </Link>
                {t('eco_sec4_desc_2')}
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto"
              initial="hidden" animate={s3Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
            >
              <div className="w-full md:w-1/4 p-6 text-center rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] shrink-0">
                <Users size={32} className="mx-auto text-[var(--text-tertiary)] mb-4" />
                <h4 className="font-bold text-[var(--text)]">Tú</h4>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Visión del negocio</p>
              </div>
              <ArrowRight size={24} className="text-[var(--text-tertiary)] rotate-90 md:rotate-0 shrink-0" />
              
              <div className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full bg-[var(--surface)]/50 p-4 rounded-3xl border border-[var(--border)]">
                <div className="flex-1 p-6 text-center rounded-2xl bg-[var(--surface)] border-2 border-violet-500 shadow-lg shadow-violet-500/10 w-full">
                  <Code2 size={32} className="mx-auto text-violet-500 mb-4" />
                  <h4 className="font-bold text-[var(--text)]">PuroCode</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">Plataforma Digital</p>
                </div>
                
                <ArrowLeftRight size={24} className="text-[var(--text-tertiary)] rotate-90 md:rotate-0 shrink-0" />
                
                <div className="flex-1 p-6 text-center rounded-2xl bg-[var(--surface)] border border-[#F3B900]/30 w-full">
                  <TrendingUp size={32} className="mx-auto text-[#F3B900] mb-4" />
                  <h4 className="font-bold text-[var(--text)]">Agencia Brújula</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">Tráfico & Marketing</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 5: Benefits */}
          <section ref={s4Ref} className="scroll-mt-32">
            <motion.div 
              className="mb-12"
              initial="hidden" animate={s4Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={0}
            >
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                {t('eco_sec5_title')}
              </h2>
            </motion.div>

            <motion.div 
              className="grid sm:grid-cols-2 gap-6"
              initial="hidden" animate={s4Visible ? 'visible' : 'hidden'} variants={fadeUp} custom={1}
            >
              {[
                { i: ShieldCheck, t: 'eco_sec5_b1_title', d: 'eco_sec5_b1_desc' },
                { i: Zap, t: 'eco_sec5_b2_title', d: 'eco_sec5_b2_desc' },
                { i: Users, t: 'eco_sec5_b3_title', d: 'eco_sec5_b3_desc' },
                { i: CheckCircle2, t: 'eco_sec5_b4_title', d: 'eco_sec5_b4_desc' },
              ].map((b, i) => (
                <div key={i} className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <b.i size={32} className="text-[var(--primary)] mb-6" />
                  <h3 className="text-xl font-bold text-[var(--text)] mb-3">{t(b.t)}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{t(b.d)}</p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Section 6: CTA Final */}
          <section ref={ctaRef} className="scroll-mt-32">
            <motion.div 
              className="p-10 md:p-16 rounded-3xl bg-[var(--surface)] border border-[var(--border)] text-center shadow-2xl shadow-black/5 relative overflow-hidden"
              initial="hidden" animate={ctaVisible ? 'visible' : 'hidden'} variants={fadeUp} custom={0}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/50 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F3B900]/20 blur-[100px] rounded-full" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                  {t('eco_cta_title')}
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed">
                  {t('eco_cta_desc')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contacto" className="btn-primary w-full sm:w-auto justify-center text-lg px-8 py-4">
                    {t('eco_cta_primary')}
                  </Link>
                  <a href="https://agenciabrujula.com" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto justify-center text-lg px-8 py-4">
                    {t('eco_cta_secondary')}
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </>
  );
}
