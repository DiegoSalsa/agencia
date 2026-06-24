import type { Metadata } from "next";
import { generatePageMetadata, serviceJsonLd } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import { PromoProvider } from "@/context/PromoContext";
import CtaBanner from "@/components/landing/CtaBanner";

export const metadata: Metadata = generatePageMetadata({
  title: "¿Cuánto Cuesta un E-commerce en Chile?",
  description: "Descubre los factores que influyen en el precio de una tienda online en Chile. Pasarelas de pago, inventario, SEO y plataformas escalables.",
  path: "/cuanto-cuesta-un-ecommerce-en-chile",
});

export default function CuantoCuestaEcommerce() {
  return (
    <PromoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: "Desarrollo de E-commerce en Chile",
              description: "Cotización e implementación de tiendas online a medida.",
              url: "https://www.purocode.com/cuanto-cuesta-un-ecommerce-en-chile"
            })
          ])
        }}
      />
      <Header />
      <main id="main-content">
        <PageHeader
          title="¿Cuánto Cuesta un"
          highlight="E-commerce en Chile?"
          subtitle="Una tienda online es una sucursal que vende 24/7. El costo depende de la escala, cantidad de productos y nivel de automatización que requieras."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Precios E-commerce", href: "/cuanto-cuesta-un-ecommerce-en-chile" },
          ]}
        />

        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Variables de Costo en una Tienda Online
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4 text-gray-700 dark:text-gray-300">
            <p>Implementar un e-commerce profesional va mucho más allá de un catálogo. Estos son los factores que determinan el presupuesto:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Volumen de Catálogo e Inventario:</strong> No es lo mismo configurar 10 productos que importar 5.000 SKUs con variaciones de talla y color.</li>
              <li><strong>Pasarelas de Pago:</strong> Integración estándar con Transbank (Webpay Plus), MercadoPago o pasarelas internacionales (Stripe, PayPal).</li>
              <li><strong>Logística y Despacho:</strong> Cotizadores dinámicos integrados con Starken, Chilexpress, o envíos calculados por zonas geográficas.</li>
              <li><strong>Desarrollo a Medida vs SaaS:</strong> Usar Shopify/WooCommerce (costo inicial menor pero mantención constante) vs un desarrollo Headless personalizado para máxima velocidad.</li>
              <li><strong>Integraciones ERP/CRM:</strong> Sincronizar stock y facturación electrónica directamente con sistemas como Bsale o Defontana.</li>
            </ul>
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg">
              <span className="font-semibold">TODO_REQUIRES_REAL_DATA:</span> Próximamente publicaremos una tabla de rangos de precios estimativos para implementaciones e-commerce base y avanzadas.
            </div>
          </div>
        </section>
        
        <CtaBanner />
      </main>
      <Footer />
    </PromoProvider>
  );
}
