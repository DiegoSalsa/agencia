import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import { SERVICE_FICHAS } from "@/lib/serviceFichas";

export const metadata: Metadata = generatePageMetadata({
  title: "Soluciones de desarrollo web Chile",
  description:
    "Landing pages, sitios corporativos, e-commerce, apps web/SaaS y mantención. Agencia chilena, remoto para todo Chile.",
  path: "/soluciones",
});

export default function SolucionesHub() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title="Soluciones de desarrollo web"
          highlight="Chile"
          subtitle="Cinco servicios, con precio de entrada y una página cada uno. Remoto, para todo Chile."
          breadcrumb={[{ label: "Soluciones", href: "/soluciones" }]}
        />
        <section className="py-16 px-6 bg-[var(--bg)]">
          <div className="max-w-[800px] mx-auto flex flex-col gap-4">
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
              Si ya sabes qué necesitas, entra a la ficha. Si no, parte por{" "}
              <Link href="/servicios" className="text-[var(--primary)] font-semibold hover:underline">
                Servicios
              </Link>{" "}
              o por{" "}
              <Link href="/planes" className="text-[var(--primary)] font-semibold hover:underline">
                Planes
              </Link>
              .
            </p>
            {SERVICE_FICHAS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 hover:border-[var(--primary)] transition-colors"
              >
                <h2 className="text-xl font-bold text-[var(--text)]">{item.label}</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {item.price} · detalle en Planes
                </p>
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
