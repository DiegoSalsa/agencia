import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Portafolio y Casos de Éxito",
  description: "Explora los proyectos, páginas web, e-commerce y sistemas desarrollados por nuestro equipo de ingenieros para clientes de distintas industrias.",
  path: "/portafolio",
});
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
        <p className="max-w-[1200px] mx-auto px-6 pb-4 text-[var(--text-secondary)]">
          El portafolio reúne sitios de clientes. Los productos propios de PuroCode, incluido{" "}
          <a href="https://www.puragenda.cl" className="text-[var(--primary)] font-semibold hover:underline">Puragenda</a>,
          están en{" "}
          <Link href="/labs" className="text-[var(--primary)] font-semibold hover:underline">PuroCode Labs</Link>.
        </p>
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
