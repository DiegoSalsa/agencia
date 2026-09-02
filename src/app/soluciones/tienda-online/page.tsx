import type { Metadata } from "next";
import { generatePageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import { ArrowRight, MessageCircle } from "lucide-react";

const SITE_URL = "https://www.purocode.com";
const PAGE_URL = "https://www.purocode.com/soluciones/tienda-online";

export const metadata: Metadata = generatePageMetadata({
  title: 'E-commerce Chile',
  description: 'Desarrollo de tienda online Chile: catálogo, carrito, checkout y pagos locales. Desde $550.000 CLP.',
  path: '/soluciones/tienda-online',
});

export default function Page() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title={'E-commerce'}
          highlight={'Chile'}
          subtitle={'Si el template no alcanza, tienda online a medida Chile. No un PDF con transferencia.'}
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: 'E-commerce', href: '/soluciones/tienda-online' },
          ]}
        />
        <section className="py-16 px-6 bg-[var(--bg)]">
          <div className="max-w-[800px] mx-auto flex flex-col gap-6 text-[var(--text-secondary)] text-lg leading-relaxed">
            <p>Desarrollo de tienda online Chile: catálogo, carrito, checkout y pagos locales.</p><p>Si el template no alcanza, tienda online a medida Chile. Desarrollo ecommerce Chile, no un PDF con transferencia.</p>
            <p>
              Desde $550.000 CLP (50% al inicio · 50% a la entrega + IVA). Detalle en <Link href="/planes" className="text-[var(--primary)] font-semibold hover:underline">/planes</Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/formulario" className="btn-primary text-sm !py-3 !px-6 !rounded-xl">
                Cotizar <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/56949255006?text=Hola,%20quiero%20cotizar%20una%20tienda%20online" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm !py-3 !px-6 !rounded-xl">
                <MessageCircle size={16} /> WhatsApp +56 9 4925 5006
              </a>
            </div>
            <p className="text-sm">contacto@purocode.com · Instagram @purocodecl · Remoto, todo Chile.</p>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Inicio", url: SITE_URL },
              { name: "Servicios", url: `${SITE_URL}/servicios` },
              { name: 'E-commerce Chile', url: PAGE_URL },
            ]),
            serviceJsonLd({ name: 'E-commerce Chile', description: 'Desarrollo de tienda online Chile: catálogo, carrito, checkout y pagos locales. Desde $550.000 CLP.', url: PAGE_URL }),
          ]),
        }} />
      </main>
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
