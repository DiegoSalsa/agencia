import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Planes y Precios de Desarrollo Web",
  description: "Descubre nuestros planes y precios para sitios web corporativos, tiendas online y mantenimiento digital integral.",
  path: "/planes",
});
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Pricing from '@/components/landing/Pricing';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import SectionDivider from '@/components/shared/SectionDivider';
import PageHeader from '@/components/shared/PageHeader';

export default function PlanesPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <PageHeader 
          title="Planes y" 
          highlight="Precios" 
          subtitle="Descubre nuestras opciones transparentes y flexibles, diseñadas para adaptarse a las necesidades y tamaño de tu negocio." 
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Cotiza Hoy
            </div>
          }
          breadcrumb={[
            { label: 'Planes', href: '/planes' }
          ]}
        />
        <Pricing />
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
