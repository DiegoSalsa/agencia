import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Labs from '@/components/landing/Labs';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import PageHeader from '@/components/shared/PageHeader';
import { Beaker } from 'lucide-react';

export default function LabsPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader 
          title="PuroCode" 
          highlight="Labs" 
          subtitle="Nuestra división de productos propios. Aquí diseñamos, desarrollamos y escalamos soluciones SaaS (Software as a Service) creadas por nuestro equipo para resolver problemas reales del mercado." 
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase">
              <Beaker size={14} />
              Productos Originales
            </div>
          }
          breadcrumb={[
            { label: 'Labs', href: '/labs' }
          ]}
        />
        <div className="pb-20">
          <Labs />
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
