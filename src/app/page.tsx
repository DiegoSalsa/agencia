import dynamic from 'next/dynamic';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import { PromoProvider } from '@/context/PromoContext';
import SectionDivider from '@/components/shared/SectionDivider';

const Services = dynamic(() => import('@/components/landing/Services'));
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
        <div className="bg-[var(--section-services)] section-ambient">
          <Services isHome={true} />
        </div>
      </main>
      <Footer />
      <SocialFloater />
      <PromoPopup />
    </PromoProvider>
  );
}
