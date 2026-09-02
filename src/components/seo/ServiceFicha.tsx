import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  XCircle,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

const SITE_URL = "https://www.purocode.com";

export type ServiceFichaExample = {
  client: string;
  type: string;
  problem: string;
  solution: string;
  result: string;
  href: string;
};

export type ServiceFichaFaq = {
  question: string;
  answer: string;
};

export type ServiceFichaRelated = {
  href: string;
  label: string;
};

export type ServiceFichaProps = {
  title: string;
  highlight: string;
  subtitle: string;
  path: string;
  breadcrumbLabel: string;
  lead: string[];
  priceLabel: string;
  timeline: string;
  includes: string[];
  excludes: string[];
  forWho: string[];
  notFor: string[];
  example: ServiceFichaExample;
  faqs: ServiceFichaFaq[];
  quoteHref: string;
  whatsappText: string;
  schemaName: string;
  schemaDescription: string;
  related: ServiceFichaRelated[];
};

function Ctas({
  quoteHref,
  whatsappText,
}: {
  quoteHref: string;
  whatsappText: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href={quoteHref} className="btn-primary text-sm !py-3 !px-6 !rounded-xl">
        Cotizar <ArrowRight size={16} />
      </Link>
      <a
        href={`https://wa.me/56949255006?text=${encodeURIComponent(whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-sm !py-3 !px-6 !rounded-xl"
      >
        <MessageCircle size={16} /> WhatsApp +56 9 4925 5006
      </a>
    </div>
  );
}

export default function ServiceFicha({
  title,
  highlight,
  subtitle,
  path,
  breadcrumbLabel,
  lead,
  priceLabel,
  timeline,
  includes,
  excludes,
  forWho,
  notFor,
  example,
  faqs,
  quoteHref,
  whatsappText,
  schemaName,
  schemaDescription,
  related,
}: ServiceFichaProps) {
  const pageUrl = `${SITE_URL}${path}`;

  return (
    <main id="main-content">
      <PageHeader
        title={title}
        highlight={highlight}
        subtitle={subtitle}
        breadcrumb={[
          { label: "Soluciones", href: "/soluciones" },
          { label: breadcrumbLabel, href: path },
        ]}
      />

      <section className="py-16 px-6 bg-[var(--bg)]">
        <div className="max-w-[800px] mx-auto flex flex-col gap-6 text-[var(--text-secondary)] text-lg leading-relaxed">
          {lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {priceLabel}. Detalle y comparativa en{" "}
            <Link href="/planes" className="text-[var(--primary)] font-semibold hover:underline">
              Planes
            </Link>
            . 50% al inicio · 50% a la entrega + IVA.
          </p>
          <Ctas quoteHref={quoteHref} whatsappText={whatsappText} />
          <p className="text-sm">
            contacto@purocode.com · Instagram @purocodecl · Remoto, todo Chile.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
            <h2 className="text-xl font-bold text-[var(--text)] mb-4">Qué incluye</h2>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">Plazo típico: {timeline}</p>
            <ul className="flex flex-col gap-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8">
            <h2 className="text-xl font-bold text-[var(--text)] mb-4">Qué no incluye</h2>
            <p className="text-sm text-[var(--text-tertiary)] mb-6">
              Para no vender algo que no es.
            </p>
            <ul className="flex flex-col gap-3">
              {excludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-4">Para quién es</h2>
            <ul className="flex flex-col gap-3">
              {forWho.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[var(--text-secondary)]">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-4">Para quién no es</h2>
            <ul className="flex flex-col gap-3">
              {notFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[var(--text-secondary)]">
                  <XCircle size={16} className="text-rose-400 shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--section-process)] border-t border-[var(--border)]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--text)] mb-2 tracking-tight">
            Un caso real
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Un proyecto entregado, no un mockup.
          </p>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">{example.client}</h3>
                <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                  {example.type}
                </span>
              </div>
              <a
                href={example.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors"
                aria-label={`Ver sitio de ${example.client}`}
              >
                <ExternalLink size={16} className="text-[var(--text-tertiary)]" />
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                  Problema
                </span>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{example.problem}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">
                  Solución
                </span>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{example.solution}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Resultado
                </span>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{example.result}</p>
              </div>
            </div>
          </div>
          <p className="mt-6">
            <Link href="/portafolio" className="text-sm font-semibold text-[var(--primary)] hover:underline">
              Ver más proyectos →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[var(--text)] mb-10 tracking-tight">
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer text-[var(--text)] font-semibold text-base hover:bg-[var(--surface-hover)] transition-colors">
                  {faq.question}
                  <span className="ml-4 shrink-0 text-[var(--text-tertiary)] group-open:rotate-45 transition-transform duration-300 text-xl">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-[var(--text-secondary)] text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-xl font-bold text-[var(--text)] mb-6">También hacemos</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--text)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Ctas quoteHref={quoteHref} whatsappText={whatsappText} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Inicio", url: SITE_URL },
              { name: "Soluciones", url: `${SITE_URL}/soluciones` },
              { name: schemaName, url: pageUrl },
            ]),
            serviceJsonLd({
              name: schemaName,
              description: schemaDescription,
              url: pageUrl,
            }),
            faqJsonLd(faqs),
          ]),
        }}
      />
    </main>
  );
}
