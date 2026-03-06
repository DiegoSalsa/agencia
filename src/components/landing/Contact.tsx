'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const contactCards = [
  {
    icon: Mail,
    titleKey: 'contact_email_title',
    value: 'contactopurocode@gmail.com',
    href: 'mailto:contactopurocode@gmail.com',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: MessageCircle,
    titleKey: 'contact_wsp_title',
    value: 'Lucas: +56 9 5699 4930',
    value2: 'Diego: +56 9 3490 8579',
    href: 'https://wa.me/56956994930',
    href2: 'https://wa.me/56934908579',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Instagram,
    titleKey: 'contact_ig_title',
    value: '@purocodecl',
    href: 'https://www.instagram.com/purocodecl/',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  },
  {
    icon: Facebook,
    titleKey: 'contact_fb_title',
    value: 'PuroCode.com',
    href: 'https://www.facebook.com/PuroCode.com',
    color: 'bg-blue-600/10 text-blue-700 dark:text-blue-400',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Contact() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section id="contacto" ref={ref} className="py-24 px-6 border-t border-[var(--border)] relative overflow-hidden">
      {/* Rich brand background matching hero treatment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        {/* Radial glows — hero-level intensity */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.12)_0%,rgba(var(--primary-rgb),0.04)_40%,transparent_70%)]" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.07)_0%,transparent_60%)]" />
        {/* Floating geometric shapes */}
        <svg className="geo-float absolute bottom-16 right-[10%] w-28 h-28 opacity-[0.05]" style={{ animationDelay: '1.5s' }} viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" />
        </svg>
        <svg className="geo-float absolute top-[30%] left-[8%] w-16 h-16 opacity-[0.04]" style={{ animationDelay: '4s' }} viewBox="0 0 100 100" fill="none">
          <path d="M20 80 L20 20 L60 20 Q80 20 80 40 Q80 60 60 60 L20 60" stroke="currentColor" strokeWidth="3" className="text-[var(--primary)]" />
        </svg>
        <div className="geo-float absolute top-20 left-[6%] w-14 h-14 border border-[rgba(var(--primary-rgb),0.1)] rotate-[30deg] rounded-md" style={{ animationDelay: '3.5s' }} />
        <div className="geo-float absolute bottom-[30%] left-[20%] w-10 h-10 bg-[rgba(var(--primary-rgb),0.04)] -rotate-12 rounded-sm" style={{ animationDelay: '0s' }} />
        {/* Gradient line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--primary-rgb),0.15)] to-transparent" />
      </div>
      {/* Header */}
      <motion.div
        className="flex flex-col items-center text-center mb-16"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUp}
        custom={0}
      >
        <p className="section-label mb-4">{t('contact_tag')}</p>
        <h2 className="section-title mb-4">{t('contact_title')}</h2>
        <p className="section-subtitle mx-auto">{t('contact_subtitle')}</p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {contactCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.titleKey}
              className="card p-6"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
            >
              <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <Icon size={20} />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                {t(card.titleKey)}
              </h3>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text)] font-medium hover:text-[var(--primary)] transition-colors cursor-pointer block"
              >
                {card.value}
              </a>
              {card.value2 && card.href2 && (
                <a
                  href={card.href2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] font-medium hover:text-[var(--primary)] transition-colors cursor-pointer block mt-1"
                >
                  {card.value2}
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
