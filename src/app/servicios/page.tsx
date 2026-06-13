import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import DetailedServices from '@/components/landing/DetailedServices';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import PageHeader from '@/components/shared/PageHeader';

export default function ServiciosPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader 
          title="Soluciones a tu" 
          highlight="Medida" 
          subtitle="Conoce todos los servicios que ofrecemos para potenciar tu presencia en el mundo digital y hacer crecer tu negocio." 
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Nuestros Servicios
            </div>
          }
          breadcrumb={[
            { label: 'Servicios', href: '/servicios' }
          ]}
        />
        <div className="bg-[var(--section-services)] pb-20 section-ambient">
          <DetailedServices />
        </div>

        {/* Ecosistema Digital Subtle Integration */}
        <div className="bg-[var(--bg)] border-t border-[var(--border)] py-12 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)]">
            <div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">¿Tu proyecto necesita más que solo desarrollo?</h3>
              <p className="text-[var(--text-secondary)]">Conoce nuestro ecosistema de especialistas en marketing y crecimiento digital.</p>
            </div>
            <a 
              href="/ecosistema-digital"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] font-semibold hover:border-[var(--text-tertiary)] hover:bg-[var(--surface-hover)] transition-all whitespace-nowrap"
            >
              Ver Ecosistema Digital
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
