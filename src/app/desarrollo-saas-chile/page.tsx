import type { Metadata } from "next";
import { generatePageMetadata, serviceJsonLd } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import { PromoProvider } from "@/context/PromoContext";
import CtaBanner from "@/components/landing/CtaBanner";

export const metadata: Metadata = generatePageMetadata({
  title: "Desarrollo SaaS en Chile | Software as a Service",
  description: "Construimos plataformas SaaS escalables a medida. Autenticación, suscripciones, bases de datos y paneles de administración seguros.",
  path: "/desarrollo-saas-chile",
});

export default function DesarrolloSaasChile() {
  return (
    <PromoProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: "Desarrollo de Software SaaS en Chile",
              description: "Diseño y programación de plataformas SaaS y startups.",
              url: "https://www.purocode.com/desarrollo-saas-chile"
            })
          ])
        }}
      />
      <Header />
      <main id="main-content">
        <PageHeader
          title="Desarrollo de Software"
          highlight="SaaS en Chile"
          subtitle="Transformamos tu idea en una plataforma escalable de software como servicio (SaaS). Listo para recibir usuarios, cobrar suscripciones y crecer."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Desarrollo SaaS", href: "/desarrollo-saas-chile" },
          ]}
        />

        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            ¿Qué es un SaaS y por qué construirlo con PuroCode?
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4 text-gray-700 dark:text-gray-300">
            <p>Un <strong>Software as a Service (SaaS)</strong> es una plataforma alojada en la nube donde los clientes pagan una suscripción recurrente por acceder a sus funcionalidades. Es el modelo de negocio más rentable y escalable en la industria tecnológica actual.</p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Arquitectura de un SaaS exitoso:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>MVP (Producto Mínimo Viable):</strong> Desarrollamos el core de tu idea rápidamente para que valides en el mercado.</li>
              <li><strong>Autenticación y Seguridad:</strong> Sistemas de login seguros (JWT, OAuth), encriptación y recuperación de contraseñas.</li>
              <li><strong>Cobro de Suscripciones:</strong> Integración directa con plataformas como Stripe o MercadoPago para gestionar cobros recurrentes y planes tiers.</li>
              <li><strong>Paneles de Administración:</strong> Dashboards tanto para tus usuarios finales como para tu equipo operativo interno.</li>
              <li><strong>Base de Datos Escalable:</strong> Arquitectura multi-tenant para segregar datos usando PostgreSQL y Supabase.</li>
            </ul>
          </div>
        </section>
        
        <CtaBanner />
      </main>
      <Footer />
    </PromoProvider>
  );
}
