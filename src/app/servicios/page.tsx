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
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
