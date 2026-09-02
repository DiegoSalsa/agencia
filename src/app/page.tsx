import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Agencia de desarrollo web Chile",
  description: "Agencia de desarrollo web en Chile. Landing, corporativas, e-commerce, apps web/SaaS y mantención. Remoto para todo Chile. Cotiza por WhatsApp.",
  path: "/",
});
import dynamic from 'next/dynamic';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import { PromoProvider } from '@/context/PromoContext';
import SectionDivider from '@/components/shared/SectionDivider';

const Services = dynamic(() => import('@/components/landing/Services'));
const Footer = dynamic(() => import('@/components/landing/Footer'));
const PromoBanner = dynamic(() => import('@/components/landing/PromoBanner'));
import SocialFloater from '@/components/shared/SocialFloater';

export default function Home() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <Hero />
        <div className="bg-[var(--section-services)] section-ambient">
          <Services isHome={true} />
        </div>
      </main>
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
