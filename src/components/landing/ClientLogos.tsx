'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/context/I18nContext';
import { useInView } from '@/hooks/useInView';

const clients = [
  {
    name: 'BioImpacto',
    logo: '/img/FotosPaginas/Bioimpacto.png',
    type: 'Web Corporativa',
  },
  {
    name: 'PodomedClinical',
    logo: '/img/FotosPaginas/PodoMedLanding.png',
    type: 'Landing Page',
  },
  {
    name: 'Florería Wildgarden',
    logo: '/img/FotosPaginas/FloreriaWildGarden.png',
    type: 'Landing Page',
  },
  {
    name: 'ValoraLocal',
    logo: '/img/FotosPaginas/ValoraLocal.png',
    type: 'SaaS',
  },
];

export default function ClientLogos() {
  const { t } = useI18n();
  const { ref, isVisible } = useInView();

  return (
    <section ref={ref} className="py-16 px-6 border-t border-b border-[var(--border)]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-10">
          {t('trust_title')}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[rgba(var(--primary-rgb),0.3)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[var(--bg)]">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 45vw, 22vw"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[var(--text)]">{client.name}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{client.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
