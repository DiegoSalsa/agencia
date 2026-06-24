import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import FAQ from '@/components/landing/FAQ';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import CtaBanner from '@/components/landing/CtaBanner';
import PageHeader from '@/components/shared/PageHeader';

export const metadata = {
  title: 'Preguntas Frecuentes | PuroCode',
  description: 'Resolvemos las dudas más comunes sobre nuestros servicios de desarrollo web y tiempos de entrega.',
};

export default function FAQPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content" className="min-h-screen bg-[var(--bg)] selection:bg-emerald-500/30 selection:text-emerald-200">
        <PageHeader 
          title="Preguntas" 
          highlight="Frecuentes" 
          subtitle="Todo lo que necesitas saber antes de iniciar tu proyecto con nosotros." 
          breadcrumb={[
            { label: 'FAQ', href: '/faq' }
          ]}
        />
        <div className="bg-[var(--bg)] pt-12 pb-20">
          <FAQ />
        </div>
        <CtaBanner />
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
