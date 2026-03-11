'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Facebook, Send, Loader2, CheckCircle } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const contactCards = [
  {
    icon: Mail,
    titleKey: 'contact_email_title',
    value: 'contacto@purocode.com',
    href: 'mailto:contactopurocode@gmail.com',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: MessageCircle,
    titleKey: 'contact_wsp_title',
    value: '+56 9 4925 5006',
    href: 'https://wa.me/56949255006',
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
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '', website: '' });
      } else {
        setErrorMsg(data.message || 'Error al enviar.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Error de conexión. Intenta más tarde.');
      setStatus('error');
    }
  };

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
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" />
          <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" stroke="currentColor" strokeWidth="1" className="text-[var(--primary)]" opacity="0.4" />
        </svg>
        <svg className="geo-float absolute top-[30%] left-[8%] w-16 h-16 opacity-[0.04]" style={{ animationDelay: '4s' }} viewBox="0 0 100 100" fill="none">
          <path d="M10 90 L50 10 L90 90" stroke="currentColor" strokeWidth="2" className="text-[var(--primary)]" fill="none" />
          <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-[var(--primary)]" opacity="0.5" />
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

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
        {/* Contact Form — 3 cols */}
        <motion.div
          className="lg:col-span-3"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={1}
        >
          <div className="card p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[var(--text)] mb-1">{t('contact_form_title')}</h3>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">{t('contact_form_subtitle')}</p>

            {status === 'sent' ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle size={28} className="text-emerald-500" />
                </div>
                <p className="text-[var(--text)] font-semibold">{t('contact_form_success_title')}</p>
                <p className="text-sm text-[var(--text-tertiary)]">{t('contact_form_success_desc')}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm text-[var(--primary)] hover:underline cursor-pointer"
                >
                  {t('contact_form_send_another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {t('contact_form_name')}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={200}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-sm"
                    placeholder={t('contact_form_name_placeholder')}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {t('contact_form_email')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={320}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-sm"
                    placeholder={t('contact_form_email_placeholder')}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    {t('contact_form_message')}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all text-sm resize-none"
                    placeholder={t('contact_form_message_placeholder')}
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {status === 'sending' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact_form_submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Contact Cards — 2 cols */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.titleKey}
                className="card p-5"
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={fadeUp}
                custom={i + 2}
              >
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <Icon size={18} />
                </div>
                <h3 className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1.5">
                  {t(card.titleKey)}
                </h3>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text)] font-medium hover:text-[var(--primary)] transition-colors cursor-pointer block"
                >
                  {card.value}
                </a>
                {card.value2 && card.href2 && (
                  <a
                    href={card.href2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text)] font-medium hover:text-[var(--primary)] transition-colors cursor-pointer block mt-0.5"
                  >
                    {card.value2}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
