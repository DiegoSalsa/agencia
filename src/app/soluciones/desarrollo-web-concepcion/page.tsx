import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PageHeader from "@/components/shared/PageHeader";
import AeoSummary from "@/components/seo/AeoSummary";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Smartphone,
  Search,
  Zap,
  Code,
  Paintbrush,
  MapPin,
  Building2,
  ShieldCheck,
  Clock,
  MessageCircle,
  ExternalLink,
  FileText,
  Headphones,
  Target,
  Monitor,
  Database,
  Cloud,
} from "lucide-react";

const SITE_URL = "https://www.purocode.com";
const PAGE_URL = `${SITE_URL}/soluciones/desarrollo-web-concepcion`;

export const metadata: Metadata = generatePageMetadata({
  title: "Desarrollo Web en Concepción",
  description: "Servicio premium de desarrollo web en Concepción. Creamos sitios corporativos, landing pages y e-commerce de alto rendimiento.",
  path: "/soluciones/desarrollo-web-concepcion",
});

/* ── FAQ orientada a conversión ── */
const faqs = [
  {
    question: "¿Cuánto cuesta una página web?",
    answer:
      "Depende del tipo de proyecto. Una landing page parte desde $220.000 CLP, un sitio corporativo desde $380.000 CLP y un e-commerce desde $550.000 CLP (+ IVA). Todos incluyen dominio .cl o .com y hosting gratuito por 1 año. El precio final depende de las secciones y funcionalidades específicas que necesites. Puedes cotizar gratis desde nuestro formulario o por WhatsApp.",
  },
  {
    question: "¿Cuánto demora el desarrollo?",
    answer:
      "Una landing page se entrega en 5-7 días hábiles, un sitio corporativo en 10-15 días y un e-commerce en 15-25 días. Antes de escribir código, creamos prototipos en Figma para tu aprobación. El 50% se paga al inicio y el 50% restante al entregar.",
  },
  {
    question: "¿Puedo solicitar cambios durante el proceso?",
    answer:
      "Sí. Trabajamos con un proceso iterativo: primero apruebas el diseño en Figma, luego desarrollamos. Incluimos rondas de revisión en cada etapa. Si necesitas ajustes adicionales después de la entrega, están cubiertos por el soporte técnico incluido en tu plan (3 a 6 meses según el proyecto).",
  },
  {
    question: "¿Incluyen dominio y hosting?",
    answer:
      "Sí, todos nuestros planes incluyen un dominio .cl o .com y hosting gratuito durante el primer año. Desplegamos en Vercel, que ofrece CDN global, certificado SSL automático y uptime del 99.99%. Después del primer año, te ayudamos con la renovación.",
  },
  {
    question: "¿Trabajan fuera de Concepción?",
    answer:
      "Sí. Atendemos clientes en todo Chile y el extranjero. Trabajamos de forma remota con reuniones por Zoom o Google Meet. Para clientes en la Región del Biobío también podemos coordinar reuniones presenciales si lo prefieres.",
  },
  {
    question: "¿Puedo pagar en cuotas?",
    answer:
      "Sí. Ofrecemos un esquema de pago simple: 50% al inicio del proyecto y 50% al momento de la entrega. Para proyectos más grandes, podemos evaluar un plan de pagos en 3 cuotas según el alcance.",
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer:
      "Todos los planes incluyen soporte técnico posterior (3 a 6 meses según el plan). Esto cubre corrección de errores, ajustes menores y consultas técnicas. También ofrecemos planes de mantenimiento mensual con actualizaciones, backups automáticos y monitoreo de seguridad.",
  },
];

/* ── Proyectos reales del portafolio ── */
const realProjects = [
  {
    client: "Florería Wildgarden",
    type: "E-commerce",
    problem: "Necesitaban vender arreglos florales online con pedidos directos, sin depender solo de Instagram.",
    solution: "Desarrollamos una tienda online con catálogo visual, sistema de pedidos directos y diseño enfocado en la experiencia de compra.",
    result: "Canal de venta digital propio funcionando 24/7 con experiencia de usuario optimizada para conversión.",
    href: "https://www.floreriawildgarden.cl",
  },
  {
    client: "Agencia Brújula",
    type: "Web Corporativa",
    problem: "Requerían una presencia digital profesional que reflejara su expertise en marketing y comunicaciones.",
    solution: "Creamos un sitio corporativo con múltiples secciones, portafolio integrado y formulario de contacto optimizado.",
    result: "Presencia digital profesional con diseño moderno que transmite la autoridad de la agencia.",
    href: "https://www.agenciabrujula.com",
  },
  {
    client: "PodomedClinical",
    type: "Landing Page",
    problem: "Clínica de podología que necesitaba captar pacientes online y transmitir confianza profesional.",
    solution: "Landing page optimizada para conversión con diseño limpio, información clara de servicios y CTA directo a WhatsApp.",
    result: "Captación de leads directa desde Google con formulario de contacto y conexión a WhatsApp.",
    href: "https://pagina-podomed-clinical.vercel.app",
  },
  {
    client: "Puragenda",
    type: "Plataforma SaaS",
    problem: "Centros de estética y barberías gestionaban citas manualmente, generando conflictos de horario y pérdida de clientes.",
    solution: "Desarrollamos un sistema integral de reservas con agendamiento 24/7, recordatorios por WhatsApp y reportes financieros en tiempo real.",
    result: "Automatización completa del proceso de agendamiento con reducción de citas perdidas.",
    href: "https://www.puragenda.cl",
  },
];

/* ── Servicios de Desarrollo Web (para LLMs) ── */
const serviciosList = [
  "Landing Pages",
  "Sitios Web Corporativos",
  "Tiendas Online (E-commerce)",
  "Sistemas de Reservas y Agendamiento",
  "Plataformas SaaS",
  "Portales de Clientes",
  "Integraciones API y Pasarelas de Pago",
  "Optimización SEO Técnica",
];

export default function DesarrolloWebConcepcion() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title="Desarrollo Web Profesional"
          highlight="en Concepción"
          subtitle="Desarrollamos páginas web con Next.js y React para negocios en Concepción y la Región del Biobío. 10+ proyectos entregados. Dominio y hosting incluido."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Desarrollo Web en Concepción", href: "/soluciones/desarrollo-web-concepcion" },
          ]}
        />
        
        <AeoSummary
          serviceName="páginas web premium, corporativas y e-commerce"
          targetAudience="pymes, emprendedores y empresas corporativas"
          location="Concepción, la Región del Biobío y todo Chile"
          benefits="diseño personalizado, optimización técnica SEO avanzada, dominio y hosting inicial"
          timeframeFactors="la complejidad del diseño y las integraciones requeridas (usualmente 2 a 6 semanas)"
          priceFactors="el alcance funcional, cantidad de páginas, integraciones de pago y plan de mantención"
          technologies="Next.js, React, Tailwind CSS y arquitecturas sin servidor (Serverless)"
          differentiator="Entregamos código de alto rendimiento (100 Lighthouse) que escala sin límite, a diferencia de plantillas lentas"
          process="Briefing, prototipo UX/UI, desarrollo técnico, auditoría SEO y despliegue final"
          deliverables="un sitio web de propiedad total, panel administrable (opcional) y soporte técnico"
        />

        {/* ── Section: Servicios de Desarrollo Web (LLM-friendly) ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-b border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                  Servicios de Desarrollo Web
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                  PuroCode es una agencia de desarrollo web con sede operativa en Concepción, Chile.
                  Trabajamos con negocios locales y empresas en todo Chile que necesitan una página web
                  profesional, una tienda online o un sistema a medida.
                </p>
                <ul className="flex flex-col gap-3 mb-10">
                  {serviciosList.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-[var(--text-secondary)]">
                      <CheckCircle2 size={16} className="text-violet-400 shrink-0" />
                      <span className="text-sm font-medium">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/formulario"
                    className="btn-primary text-sm !py-3 !px-6 !rounded-xl"
                  >
                    Cotiza tu Proyecto <ArrowRight size={16} />
                  </Link>
                  <a
                    href="https://wa.me/56949255006?text=Hola,%20necesito%20una%20página%20web%20para%20mi%20negocio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm !py-3 !px-6 !rounded-xl"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Trust signals con datos reales */}
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "10+", label: "Proyectos entregados" },
                    { value: "5–7 días", label: "Entrega landing page" },
                    { value: "50/50", label: "Esquema de pago" },
                    { value: "1 año", label: "Hosting incluido" },
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

                {/* Garantías */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-4">Incluido en todos los proyectos</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: ShieldCheck, text: "Certificado SSL y seguridad HTTPS" },
                      { icon: FileText, text: "Diseño personalizado UX/UI" },
                      { icon: Headphones, text: "Soporte técnico post-entrega (3-6 meses)" },
                      { icon: Target, text: "SEO técnico desde el primer día" },
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
              Desarrollamos con el mismo stack que utilizan empresas como Vercel, Notion y Hulu.
              No usamos WordPress ni plantillas genéricas. Cada proyecto se construye desde cero con código propio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend",
                  icon: Monitor,
                  color: "text-violet-400",
                  items: [
                    { name: "Next.js", desc: "Framework React para sitios rápidos con SSR y generación estática" },
                    { name: "React", desc: "Interfaces de usuario interactivas y componentes reutilizables" },
                    { name: "TypeScript", desc: "Tipado estático que reduce errores y mejora la mantenibilidad" },
                    { name: "Tailwind CSS", desc: "Sistema de diseño utility-first para estilos consistentes" },
                  ],
                },
                {
                  title: "Backend",
                  icon: Database,
                  color: "text-emerald-400",
                  items: [
                    { name: "Node.js", desc: "Runtime para APIs rápidas y procesamiento asíncrono" },
                    { name: "PostgreSQL", desc: "Base de datos relacional para datos estructurados" },
                    { name: "Prisma", desc: "ORM type-safe para consultas seguras y migraciones" },
                    { name: "API REST", desc: "Endpoints documentados para integraciones externas" },
                  ],
                },
                {
                  title: "Infraestructura",
                  icon: Cloud,
                  color: "text-blue-400",
                  items: [
                    { name: "Vercel", desc: "Deploy automático con CDN global y SSL incluido" },
                    { name: "AWS", desc: "Servicios cloud para proyectos que requieren escalabilidad" },
                    { name: "GitHub", desc: "Control de versiones y CI/CD para deploys automáticos" },
                    { name: "Cloudflare", desc: "DNS, protección DDoS y caché de contenido estático" },
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
              Casos de Uso Reales
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Proyectos reales que hemos desarrollado. Cada caso incluye el problema original,
              la solución implementada y el resultado obtenido.
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
                      <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">{project.type}</span>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors"
                      aria-label={`Ver sitio de ${project.client}`}
                    >
                      <ExternalLink size={16} className="text-[var(--text-tertiary)]" />
                    </a>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Problema</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Solución</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Resultado</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/portafolio" className="text-sm font-semibold text-[var(--primary)] hover:underline">
                Ver todos los proyectos en nuestro portafolio →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section: Proceso de trabajo ── */}
        <section className="py-20 px-6 bg-[var(--section-process)] border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              Cómo Trabajamos
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Proceso transparente con entregables claros en cada etapa. No escribimos una línea de código
              sin tu aprobación visual previa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Briefing", desc: "Reunión inicial para entender tu negocio, objetivos y público. Definimos alcance, secciones y funcionalidades.", deliverable: "Propuesta técnica con presupuesto y tiempos" },
                { step: "02", title: "Diseño en Figma", desc: "Creamos prototipos navegables de tu sitio completo. Iteramos hasta que estés conforme con el diseño.", deliverable: "Prototipo interactivo aprobado" },
                { step: "03", title: "Desarrollo", desc: "Construimos tu sitio con Next.js, React y TypeScript. Desplegamos en un entorno de pruebas para que lo revises.", deliverable: "Sitio funcional en staging" },
                { step: "04", title: "Entrega", desc: "Configuramos dominio, SSL y hosting. Te damos capacitación para administrar tu contenido.", deliverable: "Sitio en producción + soporte técnico" },
              ].map((step) => (
                <div key={step.step}>
                  <div className="text-4xl font-black text-[var(--primary)] opacity-20 mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-xs text-violet-400 font-semibold">→ {step.deliverable}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/proceso" className="text-sm font-semibold text-[var(--primary)] hover:underline">
                Ver nuestro proceso completo →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section: Planes y Precios ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              Planes y Precios
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Precios base de referencia. El valor final depende de las secciones y funcionalidades
              específicas de cada proyecto. Todos incluyen dominio y hosting por 1 año.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Landing Page",
                  price: "Desde $220.000 + IVA",
                  time: "5–7 días hábiles",
                  items: [
                    "Diseño responsivo personalizado",
                    "Formulario de contacto funcional",
                    "Optimización SEO técnica",
                    "Dominio y hosting 1 año",
                    "Soporte técnico 3 meses",
                  ],
                  href: "/formulario/LANDING",
                  gradient: "from-violet-600 to-indigo-600",
                },
                {
                  title: "Web Corporativa",
                  price: "Desde $380.000 + IVA",
                  time: "10–15 días hábiles",
                  items: [
                    "Múltiples secciones personalizadas",
                    "Panel de administración de contenido",
                    "Integración redes sociales",
                    "Dominio y hosting 1 año",
                    "Soporte técnico 3 meses",
                  ],
                  href: "/formulario/WEB_CORPORATIVA",
                  gradient: "from-blue-600 to-cyan-600",
                  popular: true,
                },
                {
                  title: "E-commerce",
                  price: "Desde $550.000 + IVA",
                  time: "15–25 días hábiles",
                  items: [
                    "Catálogo y carrito de compras",
                    "Pasarela de pagos (Webpay/MercadoPago)",
                    "Gestión de inventario",
                    "Dominio y hosting 1 año",
                    "Soporte técnico 6 meses",
                  ],
                  href: "/formulario/ECOMMERCE",
                  gradient: "from-fuchsia-600 to-pink-600",
                },
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`rounded-2xl border bg-[var(--bg-secondary)] p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                    plan.popular
                      ? "border-[var(--primary)] ring-1 ring-[var(--primary)] relative"
                      : "border-[var(--border)]"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--primary)] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Más solicitado
                    </span>
                  )}
                  <div className={`h-1 w-full rounded-full bg-gradient-to-r ${plan.gradient} mb-6`} />
                  <h3 className="text-xl font-bold text-[var(--text)] mb-1">{plan.title}</h3>
                  <p className="text-xs text-[var(--text-tertiary)] mb-4">Entrega estimada: {plan.time}</p>
                  <p className="text-xl font-black text-[var(--primary)] mb-6">{plan.price}</p>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className="btn-primary text-sm text-center justify-center !rounded-xl w-full"
                  >
                    Cotizar {plan.title} <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-[var(--text-tertiary)] mt-6">
              ¿Necesitas algo más complejo?{" "}
              <Link href="/planes" className="text-[var(--primary)] hover:underline">Ver todos los planes</Link>
              {" "}o solicita una{" "}
              <a href="https://wa.me/56949255006?text=Hola,%20necesito%20una%20cotización%20personalizada" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">cotización personalizada</a>.
            </p>
          </div>
        </section>

        {/* ── Section: FAQ ── */}
        <section className="py-20 px-6 bg-[var(--section-process)] border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-12 tracking-tight text-center">
              Preguntas Frecuentes
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
        <section className="py-20 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
              ¿Necesitas una página web para tu negocio?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
              Cotiza gratis desde nuestro formulario o escríbenos por WhatsApp.
              Respondemos en menos de 24 horas con una propuesta personalizada.
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mb-10">
              50% al inicio · 50% al entregar · Dominio y hosting incluido 1 año
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formulario"
                className="btn-primary text-sm !py-3.5 !px-8 !rounded-xl"
              >
                Cotizar Proyecto <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/56949255006?text=Hola,%20necesito%20una%20página%20web%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm !py-3.5 !px-8 !rounded-xl"
              >
                <MessageCircle size={16} /> Hablar por WhatsApp
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
                { name: "Desarrollo Web en Concepción", url: PAGE_URL },
              ]),
              faqJsonLd(faqs),
              localBusinessJsonLd({
                city: "Concepción",
                region: "Biobío",
                description:
                  "Agencia de desarrollo web en Concepción. Creamos landing pages, sitios corporativos y e-commerce con Next.js, React y TypeScript. 10+ proyectos entregados.",
                url: PAGE_URL,
                areaServed: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Hualpén"],
              }),
              serviceJsonLd({
                name: "Desarrollo Web en Concepción",
                description:
                  "Servicio de diseño y desarrollo de páginas web para negocios en Concepción y la Región del Biobío. Landing pages, sitios corporativos y e-commerce con Next.js y React.",
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
