import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import CtaBanner from "@/components/landing/CtaBanner";
import Portfolio from "@/components/landing/Portfolio";
import { PromoProvider } from "@/context/PromoContext";

export const metadata: Metadata = generatePageMetadata({
  title: "Casos de Éxito | Proyectos de Software y Web",
  description: "Explora los casos de éxito y proyectos desarrollados por PuroCode. Resultados reales en desarrollo web, e-commerce y sistemas a medida.",
  path: "/casos-de-exito",
});

export default function CasosDeExito() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title="Nuestros Casos"
          highlight="de Éxito"
          subtitle="Proyectos reales. Resultados medibles. Conoce cómo hemos ayudado a empresas a escalar sus operaciones a través de la tecnología y el diseño web avanzado."
          breadcrumb={[
            { label: "Inicio", href: "/" },
            { label: "Casos de Éxito", href: "/casos-de-exito" },
          ]}
        />

        <Portfolio />
        
        <CtaBanner />
      </main>
      <Footer />
    </PromoProvider>
  );
}
