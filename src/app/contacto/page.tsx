import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Contact from '@/components/landing/Contact';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import PageHeader from '@/components/shared/PageHeader';

export default function ContactoPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader 
          title="Ponte en" 
          highlight="Contacto" 
          subtitle="Estamos listos para escucharte. Cuéntanos sobre tu próximo proyecto y descubre cómo podemos ayudarte a hacerlo realidad." 
        />
        <div className="section-ambient">
          <Contact />
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
