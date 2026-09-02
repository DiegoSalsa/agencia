import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";

export const metadata: Metadata = generatePageMetadata({
  title: "Soluciones de desarrollo web Chile",
  description:
    "Landing pages, sitios corporativos, e-commerce, apps web/SaaS a medida y mantención web. Agencia chilena, remoto para todo Chile.",
  path: "/soluciones",
});

const items = [
  { href: "/soluciones/landing-pages", label: "Landing pages Chile", price: "desde $220.000 CLP" },
  { href: "/soluciones/paginas-web-corporativas", label: "Páginas web corporativas Chile", price: "desde $380.000 CLP" },
  { href: "/soluciones/tienda-online", label: "E-commerce Chile", price: "desde $550.000 CLP" },
  { href: "/soluciones/desarrollo-software-medida", label: "Apps web y SaaS a medida Chile", price: "cotización" },
  { href: "/mantenimiento", label: "Mantención web Chile", price: "$49.000 / $149.000 / $249.000 IVA incluido" },
];

export default function SolucionesHub() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title="Soluciones de desarrollo web"
          highlight="Chile"
          subtitle="Cinco servicios reales, remoto para todo Chile. Sin grilla de ciudades."
          breadcrumb={[{ label: "Soluciones", href: "/soluciones" }]}
        />
        <section className="py-16 px-6 bg-[var(--bg)]">
          <div className="max-w-[800px] mx-auto flex flex-col gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 hover:border-[var(--primary)] transition-colors"
              >
                <h2 className="text-xl font-bold text-[var(--text)]">{item.label}</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{item.price} · ver /planes</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
