'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';
import { CheckCircle, Send } from 'lucide-react';

export default function Contact() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    console.log('Contact form data:', data);
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClasses = 'w-full rounded-lg border border-border-default bg-bg-secondary text-text-primary focus:border-primary focus:ring-1 focus:ring-primary/30 h-14 px-4 outline-none transition-all placeholder:text-text-muted';

  return (
    <section id="contacto" ref={ref} className={`py-20 px-6 border-t border-border-default animate-on-scroll ${isVisible ? 'visible' : ''}`}>
      <div className={`flex flex-col items-center text-center mb-12 animate-slide-up ${isVisible ? 'visible' : ''}`}>
        <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{t('contact_tag')}</span>
        <h2 className="text-display-md mb-4">{t('contact_title')}</h2>
        <p className="text-text-secondary max-w-lg">{t('contact_subtitle')}</p>
      </div>

      <div className="max-w-3xl mx-auto card-base p-8 md:p-12">
        {submitted ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-text-primary mb-2">¡Mensaje enviado!</h3>
            <p className="text-text-secondary">Te contactaremos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide text-text-secondary">{t('contact_name')}</label>
              <input
                name="nombre"
                className={inputClasses}
                placeholder={t('contact_name')}
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide text-text-secondary">{t('contact_email')}</label>
              <input
                name="email"
                className={inputClasses}
                placeholder="correo@empresa.cl"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold tracking-wide text-text-secondary">{t('contact_project_type')}</label>
              <select
                name="tipo"
                className={`${inputClasses} appearance-none`}
              >
                <option>{t('plan_landing')}</option>
                <option>{t('plan_corp')}</option>
                <option>{t('plan_ecommerce')}</option>
                <option>Desarrollo SaaS</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold tracking-wide text-text-secondary">{t('contact_message')}</label>
              <textarea
                name="mensaje"
                className="w-full rounded-lg border border-border-default bg-bg-secondary text-text-primary focus:border-primary focus:ring-1 focus:ring-primary/30 p-4 outline-none transition-all placeholder:text-text-muted"
                placeholder={t('contact_message')}
                rows={4}
                required
              />
            </div>
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="btn-primary w-full h-14 text-lg font-bold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t('contact_send')}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
