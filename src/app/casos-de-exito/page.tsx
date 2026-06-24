import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import { PromoProvider } from "@/context/PromoContext";
import CtaBanner from "@/components/landing/CtaBanner";

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

        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 dark:bg-gray-900 p-12 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Próximamente publicaremos casos de éxito verificables
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Estamos documentando detalladamente los objetivos, metodologías, tecnologías aplicadas y los resultados reales obtenidos en nuestros últimos proyectos de desarrollo web y software a medida.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
              <span className="mr-2">🚧</span> TODO_REQUIRES_REAL_DATA
            </div>
          </div>
        </section>
        
        <CtaBanner />
      </main>
      <Footer />
    </PromoProvider>
  );
}
