import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import TechStack from '@/components/landing/TechStack';
import Portfolio from '@/components/landing/Portfolio';
import Services from '@/components/landing/Services';
import Process from '@/components/landing/Process';
import Pricing from '@/components/landing/Pricing';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import LocaleSelector from '@/components/shared/LocaleSelector';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TechStack />
        <Portfolio />
        <Services />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <LocaleSelector />
    </>
  );
}
