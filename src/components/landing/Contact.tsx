'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

export default function Contact() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    console.log('Contact form data:', data);
    // TODO: integrate with API route
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contacto" ref={ref} className={`py-20 px-6 border-t border-white/5 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className={`flex flex-col items-center text-center mb-12 animate-slide-up ${isVisible ? 'visible' : ''}`}>
        <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{t('contact_tag')}</span>
        <h2 className="section-title text-3xl md:text-5xl font-black leading-tight tracking-tighter mb-4">{t('contact_title')}</h2>
        <p className="text-slate-400 max-w-lg">{t('contact_subtitle')}</p>
      </div>

      <div className="max-w-3xl mx-auto bg-card-dark rounded-xl border border-white/10 p-8 md:p-12 contact-form-card">
        {submitted ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-green-400 text-6xl mb-4">check_circle</span>
            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
            <p className="text-slate-400">Te contactaremos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold tracking-wide text-slate-300">{t('contact_name')}</label>
              <input
                name="nombre"
                className="w-full rounded-lg border border-white/10 bg-background-dark/50 text-white focus:border-primary h-14 px-4 outline-none transition-all placeholder:text-slate-500"
                placeholder={t('contact_name')}
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold tracking-wide text-slate-300">{t('contact_email')}</label>
              <input
                name="email"
                className="w-full rounded-lg border border-white/10 bg-background-dark/50 text-white focus:border-primary h-14 px-4 outline-none transition-all placeholder:text-slate-500"
                placeholder="correo@empresa.cl"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold tracking-wide text-slate-300">{t('quoter_project_type')}</label>
              <select
                name="tipo"
                className="w-full rounded-lg border border-white/10 bg-background-dark/50 text-white focus:border-primary h-14 px-4 outline-none transition-all appearance-none"
              >
                <option>{t('plan_landing')}</option>
                <option>{t('plan_corp')}</option>
                <option>{t('plan_ecommerce')}</option>
                <option>Desarrollo SaaS</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-bold tracking-wide text-slate-300">{t('contact_message')}</label>
              <textarea
                name="mensaje"
                className="w-full rounded-lg border border-white/10 bg-background-dark/50 text-white focus:border-primary p-4 outline-none transition-all placeholder:text-slate-500"
                placeholder={t('contact_message')}
                rows={4}
                required
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full cursor-pointer items-center justify-center rounded-lg h-14 bg-primary text-white text-lg font-bold neon-glow shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                {t('contact_send')}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
