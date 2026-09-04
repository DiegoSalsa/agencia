import type { Metadata } from "next";
import Link from "next/link";
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
const PromoBanner = dynamic(() => import('@/components/landing/PromoBanner'));
import Footer from '@/components/landing/Footer';
import SocialFloater from '@/components/shared/SocialFloater';

export default function Home() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <Hero />
        <p className="max-w-[1200px] mx-auto px-6 py-6 text-sm text-[var(--text-secondary)]">
          PuroCode también desarrolla productos propios. Puragenda es una plataforma SaaS de agendamiento y reservas; la ficha corporativa está en{" "}
          <Link href="/labs" className="text-[var(--primary)] font-semibold hover:underline">PuroCode Labs</Link>.
        </p>
        <div className="bg-[var(--section-services)] section-ambient">
          <Services isHome={true} />
        </div>
      </main>
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
