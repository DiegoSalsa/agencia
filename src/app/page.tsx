import dynamic from 'next/dynamic';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import { PromoProvider } from '@/context/PromoContext';

const Services = dynamic(() => import('@/components/landing/Services'));
const ClientLogos = dynamic(() => import('@/components/landing/ClientLogos'));
const Portfolio = dynamic(() => import('@/components/landing/Portfolio'));
const Process = dynamic(() => import('@/components/landing/Process'));
const CtaBanner = dynamic(() => import('@/components/landing/CtaBanner'));
const Pricing = dynamic(() => import('@/components/landing/Pricing'));
const FAQ = dynamic(() => import('@/components/landing/FAQ'));
const Contact = dynamic(() => import('@/components/landing/Contact'));
const Footer = dynamic(() => import('@/components/landing/Footer'));
const PromoBanner = dynamic(() => import('@/components/landing/PromoBanner'));
const PromoPopup = dynamic(() => import('@/components/landing/PromoPopup'));
import SocialFloater from '@/components/shared/SocialFloater';

export default function Home() {
  return (
    <PromoProvider>
      <PromoBanner />
      <Header />
      <main id="main-content">
        <Hero />
        <div className="bg-[var(--bg-secondary)] section-ambient">
          <Services />
        </div>
        <ClientLogos />
        <Portfolio />
        <div className="bg-[var(--bg-secondary)] section-ambient">
          <Process />
        </div>
        <CtaBanner />
        <Pricing />
        <div className="bg-[var(--bg-secondary)] section-ambient">
          <FAQ />
        </div>
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
