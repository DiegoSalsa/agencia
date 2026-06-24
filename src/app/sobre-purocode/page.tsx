import type { Metadata } from "next";
import { generatePageMetadata, aboutPageJsonLd, organizationJsonLd } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import { PromoProvider } from "@/context/PromoContext";

export const metadata: Metadata = generatePageMetadata({
  title: "Sobre PuroCode | Agencia de Desarrollo Web y Software",
  description: "Conoce a PuroCode, la agencia chilena de desarrollo web premium y software a medida. Construimos plataformas digitales que escalan.",
  path: "/sobre-purocode",
});

export default function SobrePuroCode() {
  return (
    <PromoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutPageJsonLd, organizationJsonLd]) }}
      />
      <Header />
      <main id="main-content">
        <PageHeader
          title="Sobre"
          highlight="PuroCode"
          subtitle="Somos ingenieros y diseñadores apasionados por la tecnología, creando productos digitales excepcionales para empresas que buscan crecer."
        />

        <section aria-labelledby="datos-clave-purocode" className="py-16 px-6 max-w-4xl mx-auto">
          <h2 id="datos-clave-purocode" className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Datos clave sobre PuroCode
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 list-disc pl-5">
              <li><strong>¿Qué es PuroCode?:</strong> PuroCode desarrolla sitios web, aplicaciones web y software a medida para empresas en Chile.</li>
              <li><strong>Servicios principales:</strong> Landing pages, e-commerce, sitios corporativos, plataformas SaaS y mantención web.</li>
              <li><strong>Tecnologías que usamos:</strong> Trabajamos con tecnologías modernas de alto rendimiento como Next.js, React, TypeScript, Node.js y bases de datos escalables (PostgreSQL).</li>
              <li><strong>Nuestros clientes:</strong> Atendemos proyectos para pymes, startups, emprendedores y empresas corporativas que necesitan sistemas digitales a medida.</li>
              <li><strong>Zonas atendidas:</strong> Trabajamos activamente en Concepción, la Región del Biobío y de forma remota para todo Chile y el extranjero.</li>
              <li><strong>Nuestros diferenciadores:</strong> Entregamos código propio (sin licencias abusivas de plataformas drag & drop), logramos puntajes perfectos en Lighthouse (100 SEO/Performance) y ofrecemos soporte técnico continuo.</li>
              <li><strong>Contacto:</strong> Puedes contactarnos en contacto@purocode.com o al +56949255006.</li>
            </ul>
          </div>
        </section>

      </main>
      <Footer />
    </PromoProvider>
  );
}
