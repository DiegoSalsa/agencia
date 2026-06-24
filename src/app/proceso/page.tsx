import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Nuestro Proceso de Trabajo Ágil",
  description: "Conoce el paso a paso de cómo desarrollamos productos digitales de alto rendimiento. Desde la planificación hasta el despliegue.",
  path: "/proceso",
});
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Process from '@/components/landing/Process';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import PageHeader from '@/components/shared/PageHeader';

export default function ProcesoPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader 
          title="Nuestro" 
          highlight="Proceso" 
          subtitle="Conoce el paso a paso de cómo trabajamos para asegurar la máxima calidad y éxito en cada proyecto que emprendemos." 
        />
        <div className="bg-[var(--section-process)] pb-20 section-ambient">
          <Process />
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
