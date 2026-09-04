import { ExternalLink, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  labsPageCopy,
  puragendaFeatures,
  puragendaGeoFacts,
  PURAGENDA_OFFICIAL_URL,
  PURAGENDA_NAME,
} from "@/lib/labs";

export default function Labs() {
  return (
    <section id="labs" className="relative py-24 px-6 overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_60%)] opacity-70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="max-w-3xl mb-16">
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {labsPageCopy.hubIntro} Hoy el producto en producción es{" "}
            <strong className="text-[var(--text)]">{PURAGENDA_NAME}</strong>.
          </p>
        </div>

        <article
          id="puragenda"
          className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
        >
          <div className="w-full lg:w-[55%]">
            <a
              href={PURAGENDA_OFFICIAL_URL}
              className="block relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl"
            >
              <img
                src={labsPageCopy.thumbnail}
                alt={`Captura del sitio oficial de ${PURAGENDA_NAME}`}
                className="w-full h-full object-cover object-top bg-[#111]"
                width={1200}
                height={675}
              />
            </a>
          </div>

          <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-indigo-500/15 text-indigo-400 border-indigo-500/30">
                SaaS / reservas
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                En producción
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-[var(--text)] mb-6 tracking-tight leading-[1.1]">
              {PURAGENDA_NAME}
            </h2>

            <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed mb-4 font-medium">
              {labsPageCopy.definition}
            </p>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
              {labsPageCopy.whatItIs} {labsPageCopy.whoDevelops}
            </p>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              {labsPageCopy.problem} {labsPageCopy.audiences}
            </p>

            <ul className="flex flex-col gap-3 mb-10 w-full">
              {puragendaFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" />
                  <span className="text-sm font-medium text-[var(--text-secondary)]">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={PURAGENDA_OFFICIAL_URL}
              className="btn-primary group flex items-center gap-2 h-12 px-6 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all"
            >
              <span>{labsPageCopy.officialSiteLabel}</span>
              <ArrowRight size={16} />
              <ExternalLink size={14} className="opacity-70" />
            </a>
            <p className="mt-3 text-sm text-[var(--text-tertiary)]">
              {PURAGENDA_OFFICIAL_URL}
            </p>
          </div>
        </article>

        <section className="mt-20 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 sm:p-10">
          <h2 className="text-2xl font-black text-[var(--text)] mb-6 tracking-tight">
            Relación PuroCode y Puragenda
          </h2>
          <dl className="grid gap-6 sm:grid-cols-2">
            {puragendaGeoFacts.map((fact) => (
              <div key={fact.question}>
                <dt className="text-sm font-semibold text-[var(--text)]">{fact.question}</dt>
                <dd className="mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {fact.question === "¿Cuál es el sitio oficial?" ? (
                    <a
                      href={PURAGENDA_OFFICIAL_URL}
                      className="text-[var(--primary)] font-medium hover:underline"
                    >
                      {fact.answer}
                    </a>
                  ) : (
                    fact.answer
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-32 p-8 sm:p-12 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-hover)] to-transparent flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />
          <Rocket className="w-12 h-12 text-[var(--primary)] mb-6" />
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text)] mb-4">
            ¿Buscas una solución SaaS a medida?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-8">
            Construir y operar Puragenda nos permite entender el trabajo de crear, lanzar y mantener una plataforma SaaS. Ese aprendizaje se aplica a proyectos a medida para clientes.
          </p>
          <a
            href="/soluciones/desarrollo-software-medida"
            className="btn-secondary h-12 px-8 rounded-xl font-bold flex items-center gap-2"
          >
            <span>Ver desarrollo de software a medida</span>
          </a>
        </div>
      </div>
    </section>
  );
}
