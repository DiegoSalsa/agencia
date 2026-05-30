import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Portfolio from '@/components/landing/Portfolio';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import PageHeader from '@/components/shared/PageHeader';

export default function PortafolioPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader 
          title="Nuestro" 
          highlight="Portafolio" 
          subtitle="Explora algunos de nuestros proyectos más destacados y descubre cómo ayudamos a transformar ideas en productos digitales exitosos." 
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Casos de Éxito
            </div>
          }
          breadcrumb={[
            { label: 'Portafolio', href: '/portafolio' }
          ]}
        />
        <div className="pb-20">
          <Portfolio />
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
