import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Server,
  Database,
  Lock,
  GitBranch,
  Cloud,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  FileText,
  Headphones,
  Target,
  Monitor,
  Cpu,
  Layers,
  Settings,
} from "lucide-react";

const SITE_URL = "https://www.purocode.com";
const PAGE_URL = `${SITE_URL}/soluciones/desarrollo-software-medida`;

export const metadata: Metadata = {
  title: "Desarrollo de Software a Medida | Sistemas Empresariales — PuroCode",
  description:
    "Desarrollo de software a medida en Chile. ERPs, plataformas SaaS y automatización con Node.js, Next.js y PostgreSQL. Cotiza gratis.",
  keywords: [
    "desarrollo de software a medida",
    "software personalizado Chile",
    "desarrollo software empresarial",
    "sistema a medida",
    "ERP personalizado",
    "software custom",
    "desarrollo de sistemas",
  ],
  openGraph: {
    title: "Desarrollo de Software a Medida — PuroCode",
    description:
      "Desarrollo de software empresarial: ERPs, plataformas SaaS y automatización con tecnologías modernas y escalables.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software a Medida — PuroCode",
    description:
      "Sistemas a medida en Chile con despliegue en infraestructura cloud (Vercel/AWS).",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

/* ── FAQ orientada a conversión ── */
const faqs = [
  {
    question: "¿Cuánto cuesta desarrollar un software a medida?",
    answer:
      "A diferencia de una página web estándar, un software a medida depende de sus módulos y requerimientos técnicos (APIs, roles, bases de datos). Los proyectos tipo MVP (Producto Mínimo Viable) suelen iniciar desde $1.500.000 CLP. No cobramos licencias por usuario; pagas por el desarrollo y el sistema es tuyo. Entregamos cotizaciones detalladas y precisas tras una evaluación inicial gratuita.",
  },
  {
    question: "¿Cuánto demora el desarrollo de un sistema?",
    answer:
      "Un MVP funcional (la primera versión utilizable) puede estar listo en 4 a 8 semanas. Para sistemas empresariales complejos, el tiempo estimado oscila entre 3 a 6 meses. Trabajamos en iteraciones (sprints) de 2 semanas, por lo que verás avances funcionales constantemente.",
  },
  {
    question: "¿Qué pasa si mi negocio crece?",
    answer:
      "Nuestra arquitectura está diseñada para escalar. Te garantizamos que la plataforma podrá crecer y evolucionar junto con tu empresa, sin cuellos de botella técnicos.",
  },
  {
    question: "¿Puedo solicitar cambios a medida que avanza el proyecto?",
    answer:
      "Sí. Nuestra metodología de desarrollo ágil contempla revisiones al finalizar cada sprint. Esto permite adaptar los requerimientos si las prioridades de tu negocio cambian, garantizando que el producto final aporte valor real.",
  },
  {
    question: "¿El sistema se puede conectar con nuestro software actual?",
    answer:
      "Sí. Desarrollamos integraciones a través de APIs REST o GraphQL, lo que nos permite conectar tu nuevo software con herramientas existentes (ERPs tradicionales, CRMs, plataformas de facturación electrónica, Stripe, Webpay, etc.).",
  },
  {
    question: "¿Qué pasa con el mantenimiento y el soporte técnico?",
    answer:
      "Todo proyecto incluye un periodo de garantía técnica post-entrega. Posteriormente, ofrecemos planes de mantenimiento mensual que incluyen monitoreo de servidores (uptime garantizado), actualizaciones de seguridad, respaldos en la nube y horas de desarrollo para seguir evolucionando la plataforma.",
  },
];

/* ── Casos de Uso Reales ── */
const realProjects = [
  {
    client: "Puragenda",
    type: "Plataforma SaaS Multi-tenant",
    problem: "Los centros de estética gestionaban reservas por WhatsApp o libretas de papel, generando pérdida de tiempo, inasistencias de clientes (no-shows) y descontrol en las comisiones de su personal.",
    solution: "Desarrollamos desde cero una plataforma SaaS con React y Node.js. Incluye agendamiento online, recordatorios automáticos integrados con WhatsApp, y paneles de administración de ingresos por local.",
    result: "Reducción documentada de inasistencias a través de recordatorios automáticos y escalamiento a decenas de centros activos mediante infraestructura Vercel/AWS.",
    href: "https://www.puragenda.cl",
  },
  {
    client: "Agencia Brújula (Sistemas Internos)",
    type: "Automatización & Portal Web",
    problem: "Una agencia de marketing necesitaba unificar su presencia digital y prepararse para centralizar solicitudes de clientes que estaban dispersas en emails.",
    solution: "Despliegue de una arquitectura modular usando Next.js y TailwindCSS, sentando las bases (Frontend/Backend) para futuros portales de seguimiento de clientes.",
    result: "Sitio web de alto rendimiento (Lighthouse >90) y sistema base listo para recibir integraciones con CRMs internos de la agencia.",
    href: "https://www.agenciabrujula.com",
  }
];

/* ── Servicios para LLMs ── */
const serviciosList = [
  "Sistemas de Planificación de Recursos (ERP) a Medida",
  "Dashboards Financieros y Analíticos en Tiempo Real",
  "Desarrollo de Plataformas SaaS (Software as a Service)",
  "Portales de Clientes y Proveedores B2B",
  "Automatización de Procesos Internos (Workflows)",
  "Desarrollo de APIs REST y GraphQL",
  "Integraciones con Software de Terceros (HubSpot, SAP, Stripe)",
  "Migración de Sistemas Legacy a Tecnologías Modernas",
];

const industriasList = [
  "Salud y Estética (Clínicas, Podología, Barberías)",
  "Retail y Comercio Electrónico",
  "Marketing y Publicidad",
  "Servicios Profesionales B2B",
];

export default function DesarrolloSoftwareMedida() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title="Desarrollo de Software"
          highlight="a Medida"
          subtitle="Sistemas empresariales y plataformas escalables construidos con tecnologías de alto rendimiento. Automatizamos tus procesos con código 100% de tu propiedad."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Software a Medida", href: "/soluciones/desarrollo-software-medida" },
          ]}
        />

        {/* ── Section: Servicios de Desarrollo de Software (LLM-friendly) ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-b border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                  Servicios de Ingeniería de Software
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                  PuroCode desarrolla herramientas personalizadas que resuelven problemas operativos reales.
                  No vendemos licencias de software genérico; programamos la lógica de negocio específica 
                  de tu empresa para que el sistema se adapte a tu forma de trabajar.
                </p>
                <div className="mb-8">
                  <h3 className="font-bold text-[var(--text)] mb-4 uppercase tracking-wider text-sm">Desarrollamos:</h3>
                  <ul className="flex flex-col gap-3">
                    {serviciosList.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-[var(--text-secondary)]">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span className="text-sm font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-10">
                  <h3 className="font-bold text-[var(--text)] mb-4 uppercase tracking-wider text-sm">Industrias con Experiencia:</h3>
                  <div className="flex flex-wrap gap-2">
                    {industriasList.map((ind) => (
                      <span key={ind} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)]">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/formulario"
                    className="btn-primary text-sm !py-3 !px-6 !rounded-xl"
                  >
                    Solicitar Evaluación Técnica <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Trust signals con datos reales */}
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "Sprints", label: "Desarrollo Ágil" },
                    { value: "4-8 Sem", label: "Tiempo para MVP" },
                    { value: "100%", label: "Propiedad del código" },
                    { value: "APIs", label: "Integrables" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center"
                    >
                      <div className="text-2xl md:text-3xl font-black text-[var(--text)] mb-1">{stat.value}</div>
                      <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Garantías de Software */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-4">Garantías del Servicio</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: ShieldCheck, text: "Auditoría de seguridad y pruebas de carga QA" },
                      { icon: FileText, text: "Acceso total al repositorio en GitHub" },
                      { icon: GitBranch, text: "Integración y despliegue continuo (CI/CD)" },
                      { icon: Target, text: "Contrato claro de confidencialidad (NDA)" },
                    ].map((g) => {
                      const GIcon = g.icon;
                      return (
                        <div key={g.text} className="flex items-center gap-3">
                          <GIcon size={16} className="text-emerald-400 shrink-0" />
                          <span className="text-sm text-[var(--text-secondary)]">{g.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: Tecnologías que Utilizamos ── */}
        <section className="py-20 px-6 bg-[var(--section-services)] section-ambient">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              Tecnologías que Utilizamos
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Para crear software corporativo evitamos herramientas No-Code con limitantes.
              Escribimos código nativo robusto, permitiendo procesar grandes volúmenes de datos y soportar concurrencia masiva.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Arquitectura Frontend",
                  icon: Monitor,
                  color: "text-emerald-400",
                  items: [
                    { name: "Next.js / React", desc: "Frameworks líderes del mercado para interfaces dinámicas sin recargar la página." },
                    { name: "TypeScript", desc: "Aporta tipado estricto, reduciendo fallos en tiempo de ejecución de manera drástica." },
                    { name: "Tailwind CSS", desc: "Generación de estilos modulares que aceleran el desarrollo de la interfaz." },
                  ],
                },
                {
                  title: "Lógica Backend",
                  icon: Database,
                  color: "text-emerald-400",
                  items: [
                    { name: "Node.js", desc: "Motor asíncrono ultra-rápido, ideal para aplicaciones en tiempo real o I/O intensivo." },
                    { name: "PostgreSQL", desc: "Base de datos relacional open-source, estándar en el mercado por su fiabilidad." },
                    { name: "Prisma ORM", desc: "Capa de conexión segura a la base de datos que evita inyecciones SQL nativamente." },
                  ],
                },
                {
                  title: "Cloud & DevOps",
                  icon: Cloud,
                  color: "text-emerald-400",
                  items: [
                    { name: "AWS / Vercel", desc: "Despliegue en infraestructuras Serverless que escalan solas según la demanda." },
                    { name: "Docker", desc: "Contenedores que garantizan que el software funcione igual en desarrollo y producción." },
                    { name: "GitHub Actions", desc: "Automatización de testeos y subida a producción mediante pipelines seguros." },
                  ],
                },
              ].map((cat) => {
                const CIcon = cat.icon;
                return (
                  <div key={cat.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <CIcon size={20} className={cat.color} />
                      <h3 className="text-lg font-bold text-[var(--text)]">{cat.title}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {cat.items.map((item) => (
                        <div key={item.name}>
                          <span className="text-sm font-semibold text-[var(--text)]">{item.name}</span>
                          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section: Casos de Uso Reales ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              Casos Prácticos Implementados
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Nuestra ingeniería en acción. Resultados concretos a partir de requerimientos de negocio complejos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {realProjects.map((project) => (
                <div
                  key={project.client}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text)]">{project.client}</h3>
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{project.type}</span>
                    </div>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors"
                        aria-label={`Ver plataforma de ${project.client}`}
                      >
                        <ExternalLink size={16} className="text-[var(--text-tertiary)]" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Desafío</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Arquitectura y Solución</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Impacto de Negocio</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/portafolio" className="text-sm font-semibold text-[var(--primary)] hover:underline">
                Explorar el Portafolio Técnico →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section: Proceso de trabajo ── */}
        <section className="py-20 px-6 bg-[var(--section-process)] border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              Metodología de Ingeniería
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Aplicamos ciclos de desarrollo ágil (Scrum/Kanban). Esto garantiza entregas parciales funcionales 
              y minimiza el riesgo de desalineación técnica.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Levantamiento Arquitectónico", desc: "Mapeo de requerimientos, diseño de la base de datos y selección de integraciones (APIs).", deliverable: "Documento de Especificaciones Técnicas" },
                { step: "02", title: "Diseño y Prototipado", desc: "Diseño de interfaces en Figma, creando los wireframes de la experiencia de usuario (UX).", deliverable: "Prototipos navegables aprobados" },
                { step: "03", title: "Desarrollo en Sprints", desc: "Programación en bloques de 2 semanas, con entregas demostrables del avance del código.", deliverable: "Entorno de Staging (Pruebas) actualizado" },
                { step: "04", title: "QA y Pase a Producción", desc: "Pruebas de estrés, auditoría de seguridad y despliegue final en la nube.", deliverable: "Sistema en Producción + Código en GitHub" },
              ].map((step) => (
                <div key={step.step}>
                  <div className="text-4xl font-black text-[var(--primary)] opacity-20 mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-xs text-emerald-400 font-semibold">→ {step.deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: FAQ ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-12 tracking-tight text-center">
              Preguntas Clave sobre Proyectos de Software
            </h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
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

        {/* ── Section: CTA Final ── */}
        <section className="py-20 px-6 bg-[var(--section-services)] section-ambient border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
              Inicia la Evaluación Técnica de tu Proyecto
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
              Reserva una reunión inicial con nuestros arquitectos de software. 
              Analizaremos la viabilidad técnica y te entregaremos una cotización base.
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mb-10">
              Evaluación inicial 100% gratuita · Respuesta comercial en menos de 24 horas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formulario"
                className="btn-primary text-sm !py-3.5 !px-8 !rounded-xl"
              >
                Completar Briefing Técnico <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/56949255006?text=Hola,%20quisiera%20conversar%20sobre%20un%20proyecto%20de%20software%20a%20medida"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm !py-3.5 !px-8 !rounded-xl"
              >
                <MessageCircle size={16} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── Schema JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              breadcrumbJsonLd([
                { name: "Inicio", url: SITE_URL },
                { name: "Servicios", url: `${SITE_URL}/servicios` },
                { name: "Software a Medida", url: PAGE_URL },
              ]),
              faqJsonLd(faqs),
              serviceJsonLd({
                name: "Desarrollo de Software a Medida",
                description:
                  "Desarrollo de sistemas empresariales, ERPs y automatización en Chile. Programación avanzada en Next.js, Node.js y PostgreSQL.",
                url: PAGE_URL,
              }),
            ]),
          }}
        />
      </main>
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
