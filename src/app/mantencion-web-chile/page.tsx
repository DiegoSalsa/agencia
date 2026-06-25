import type { Metadata } from "next";
import { generatePageMetadata, serviceJsonLd } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import { PromoProvider } from "@/context/PromoContext";
import CtaBanner from "@/components/landing/CtaBanner";

export const metadata: Metadata = generatePageMetadata({
  title: "Mantención Web en Chile | Soporte y Seguridad",
  description: "Servicio profesional de mantención web, actualizaciones de seguridad, backups y mejoras continuas de SEO y rendimiento.",
  path: "/mantencion-web-chile",
});

export default function MantencionWebChile() {
  return (
    <PromoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: "Servicio de Mantención Web",
              description: "Soporte técnico, backups y seguridad para sitios web.",
              url: "https://www.purocode.com/mantencion-web-chile"
            })
          ])
        }}
      />
      <Header />
      <main id="main-content">
        <PageHeader
          title="Servicio de"
          highlight="Mantención Web"
          subtitle="Protege tu inversión digital. Nos encargamos de la seguridad, los respaldos y las actualizaciones técnicas para que tu sitio web nunca falle."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Mantención Web", href: "/mantencion-web-chile" },
          ]}
        />

        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            ¿Qué incluye nuestro soporte técnico continuo?
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4 text-gray-700 dark:text-gray-300">
            <p>Un sitio web sin mantención es vulnerable a hackeos, pérdida de posicionamiento SEO y caídas del servidor. Nuestro servicio garantiza paz mental.</p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Monitoreo de Uptime 24/7:</strong> Nos aseguramos de que tu sitio esté siempre en línea. Si algo falla, actuamos de inmediato.</li>
              <li><strong>Backups y Respaldos:</strong> Copias de seguridad periódicas de tu base de datos y archivos para evitar pérdidas de información.</li>
              <li><strong>Actualizaciones de Seguridad:</strong> Parches de vulnerabilidades, actualizaciones de dependencias y renovación de certificados SSL.</li>
              <li><strong>Mejoras SEO y Performance:</strong> Auditorías continuas para mantener tu sitio rápido (Core Web Vitals) y visible en Google.</li>
              <li><strong>Soporte Dedicado:</strong> Horas mensuales reservadas para subir nuevos contenidos, realizar cambios de diseño o agregar pequeñas funcionalidades.</li>
            </ul>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Nuestros Planes Mensuales</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white">Básico</h4>
                  <p className="text-sm text-gray-500 mb-2">Preventivo</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">$49.000 <span className="text-xs font-normal">CLP/mes</span></p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-gray-900 dark:text-white">Soporte Pro</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">Recomendado</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">$149.000 <span className="text-xs font-normal">CLP/mes</span></p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white">Avanzado</h4>
                  <p className="text-sm text-gray-500 mb-2">Crecimiento Continuo</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">$249.000 <span className="text-xs font-normal">CLP/mes</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CtaBanner />
      </main>
      <Footer />
    </PromoProvider>
  );
}
