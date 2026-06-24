import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import MaintenancePricing from '@/components/landing/MaintenancePricing';
import { PromoProvider } from '@/context/PromoContext';
import SocialFloater from '@/components/shared/SocialFloater';
import PromoBanner from '@/components/landing/PromoBanner';
import PromoPopup from '@/components/landing/PromoPopup';
import SectionDivider from '@/components/shared/SectionDivider';
import PageHeader from '@/components/shared/PageHeader';
import CtaBanner from '@/components/landing/CtaBanner';

export const metadata: Metadata = generatePageMetadata({
  title: "Mantenimiento Web y Soporte",
  description: "Servicios profesionales de mantenimiento web, actualizaciones de seguridad, soporte técnico y optimización continua de tu plataforma.",
  path: "/mantenimiento",
});

export default function MantenimientoPage() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content" className="min-h-screen bg-[var(--bg)] selection:bg-emerald-500/30 selection:text-emerald-200">
        <PageHeader 
          title="Mantenimiento" 
          highlight="Web" 
          subtitle="Asegura la estabilidad, seguridad y evolución de tus sistemas con nuestros planes de soporte técnico preventivo y evolutivo." 
          breadcrumb={[
            { label: 'Mantenimiento', href: '/mantenimiento' }
          ]}
        />
        <MaintenancePricing />
        <CtaBanner />
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
