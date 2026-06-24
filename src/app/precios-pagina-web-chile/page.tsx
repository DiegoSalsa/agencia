import type { Metadata } from "next";
import { generatePageMetadata, serviceJsonLd } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import { PromoProvider } from "@/context/PromoContext";
import Pricing from "@/components/landing/Pricing";
import CtaBanner from "@/components/landing/CtaBanner";

export const metadata: Metadata = generatePageMetadata({
  title: "Precios Páginas Web en Chile | ¿Cuánto Cuesta?",
  description: "Conoce los precios y planes de desarrollo web en Chile. Desde $220.000 CLP para landing pages, hasta sitios corporativos a medida. Cotiza tu proyecto hoy.",
  path: "/precios-pagina-web-chile",
});

export default function PreciosPaginaWebChile() {
  return (
    <PromoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: "Precios de Páginas Web en Chile",
              description: "Planes de desarrollo web corporativo y landing pages en Chile.",
              url: "https://www.purocode.com/precios-pagina-web-chile"
            })
          ])
        }}
      />
      <Header />
      <main id="main-content">
        <PageHeader
          title="¿Cuánto Cuesta una"
          highlight="Página Web en Chile?"
          subtitle="Transparencia en nuestros precios. Conoce los factores que influyen en el costo y elige el plan que mejor se adapte a las necesidades de tu empresa."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Precios Web", href: "/precios-pagina-web-chile" },
          ]}
        />

        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Factores que afectan el precio de un desarrollo web
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4 text-gray-700 dark:text-gray-300">
            <p>El costo de una página web profesional en Chile varía dependiendo de múltiples factores técnicos y de negocio:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Alcance y Cantidad de Páginas:</strong> Una Landing Page (1 sola vista) es mucho más económica que un portal corporativo de 20 páginas.</li>
              <li><strong>Funcionalidades a Medida:</strong> Formularios complejos, cotizadores automáticos, integraciones de pago o sistemas de reservas elevan el costo.</li>
              <li><strong>Diseño Personalizado vs Plantilla:</strong> En PuroCode creamos código desde cero (React/Next.js) para un rendimiento 100/100, a diferencia de plantillas lentas de WordPress.</li>
              <li><strong>Optimizaciones SEO:</strong> Un sitio web preparado para rankear en Google requiere una estructura técnica avanzada.</li>
            </ul>
          </div>
        </section>

        <Pricing />
        
        <CtaBanner />
      </main>
      <Footer />
    </PromoProvider>
  );
}
