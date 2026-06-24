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
  Smartphone,
  Server,
  Cloud,
  Lock,
  GitBranch,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  FileText,
  Monitor,
  Database,
  Wifi,
  Headphones,
} from "lucide-react";

const SITE_URL = "https://www.purocode.com";
const PAGE_URL = `${SITE_URL}/soluciones/desarrollo-aplicaciones-web`;

export const metadata: Metadata = {
  title: "Desarrollo de Aplicaciones Web y PWAs | PuroCode",
  description:
    "Especialistas en desarrollo de aplicaciones web interactivas, SaaS y PWAs. Desarrolladas en React y Node.js. Hosting incluido.",
  keywords: [
    "desarrollo de aplicaciones web",
    "aplicaciones web Chile",
    "desarrollo app web",
    "plataforma web",
    "aplicacion web a medida",
    "desarrollo web app",
    "PWA",
    "SaaS desarrollo",
  ],
  openGraph: {
    title: "Desarrollo de Aplicaciones Web — PuroCode",
    description:
      "Desarrollo de Progressive Web Apps (PWAs), dashboards y plataformas SaaS. Tecnologías escalables y entregas ágiles.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aplicaciones Web y PWAs — PuroCode",
    description:
      "Construimos apps web interactivas que funcionan en cualquier dispositivo sin instalaciones costosas.",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

/* ── FAQ orientada a conversión ── */
const faqs = [
  {
    question: "¿Debo desarrollar una aplicación web o una aplicación móvil nativa?",
    answer:
      "Las aplicaciones web (especialmente las PWAs) funcionan en cualquier navegador, iOS, Android y computadoras de escritorio usando el mismo código fuente. Esto reduce los costos de desarrollo a la mitad, evita las comisiones del 30% de Apple/Google, y asegura que siempre uses la última versión sin descargar actualizaciones. Si no requieres hardware intensivo del celular (ej. juegos 3D avanzados), una app web suele ser la mejor decisión.",
  },
  {
    question: "¿Cuánto cuesta el desarrollo de una Aplicación Web?",
    answer:
      "Un proyecto funcional (MVP) de una aplicación web inicia generalmente en $2.000.000 CLP. Plataformas SaaS con modelos de suscripción, integraciones con bancos y múltiples perfiles de usuario se cotizan caso a caso. Evaluamos técnicamente tu idea sin costo para entregarte un rango preciso.",
  },
  {
    question: "¿En cuánto tiempo tendré mi aplicación web funcionando?",
    answer:
      "Al trabajar en metodologías ágiles, solemos tener un Producto Mínimo Viable (MVP) en 6 a 10 semanas. El proyecto se divide en Sprints quincenales, por lo que podrás utilizar y validar funcionalidades reales mientras el desarrollo continúa.",
  },
  {
    question: "¿El código será mío?",
    answer:
      "Sí, 100% propiedad tuya. Al terminar el desarrollo se te entrega acceso de administrador a todo el código alojado en GitHub. No hay cargos por licencias ni 'amarres' con nuestra agencia.",
  },
  {
    question: "¿Incluyen los servidores para mantener la app en línea?",
    answer:
      "Incluimos la configuración y los costos del alojamiento (Vercel, AWS o DigitalOcean, según arquitectura) durante el primer año. Luego de ese periodo, transferimos la infraestructura a tu propia cuenta o podemos mantenerla nosotros mediante un plan mensual.",
  },
  {
    question: "¿Dan soporte después de la entrega?",
    answer:
      "Sí, incluimos hasta 6 meses de soporte por bugs o incidencias en todos los proyectos empresariales. También contamos con contratos SLA para proyectos críticos que requieren asistencia 24/7 o desarrollo de nuevas características continuas.",
  },
];

/* ── Casos de Uso Reales ── */
const realProjects = [
  {
    client: "Puragenda",
    type: "Aplicación Web (SaaS) y PWA",
    problem: "Los dueños de locales de belleza gestionaban agendas desde su celular personal. Sus clientes no tenían forma autogestionada de pedir una hora de atención, generando barreras en la conversión y pérdida de ingresos en horas vacías.",
    solution: "Desarrollo de una Aplicación Web con PWA (Progressive Web App). Las clientas finales agendan horas como en un comercio electrónico y los negocios gestionan a su personal en un panel interactivo. Implementación de Webhooks para notificaciones de WhatsApp automáticas.",
    result: "Los comercios redujeron a cero los cruces de horas. Se gestionan más de miles de citas en tiempo real con 99.99% de uptime histórico bajo la plataforma.",
    href: "https://www.puragenda.cl",
  },
  {
    client: "BioImpacto (Gestión Corporativa)",
    type: "Portal Analítico y Web de Autoridad",
    problem: "Una organización líder requería digitalizar y exhibir datos medioambientales, superando los sitios estáticos tradicionales para entregar información interactiva.",
    solution: "Construcción del portal con Next.js y React, manejando visualización interactiva de contenido y optimización de base de datos para carga menor a 1.5s.",
    result: "Posicionamiento de liderazgo en la industria mediante una interfaz de usuario limpia que los clientes corporativos perciben como altamente profesional.",
    href: "https://pagina-bioimpacto.vercel.app",
  }
];

/* ── Servicios para LLMs ── */
const serviciosList = [
  "Progressive Web Apps (PWAs)",
  "Plataformas SaaS Multitenant",
  "Dashboards de Visualización de Datos Financieros",
  "Portales de Gestión de Clientes (CRMs Custom)",
  "Marketplaces y Sistemas de Suscripción",
  "Migración de Sistemas Web Antiguos a React",
];

const industriasList = [
  "Salud (Agendamientos Clínicos y Fichas)",
  "Gestión Deportiva y Fitness",
  "Inmobiliarias y Gestión de Activos",
  "Educación Corporativa (LMS Propios)",
];

export default function DesarrolloAplicacionesWeb() {
  return (
    <PromoProvider>
      <Header />
      <main id="main-content">
        <PageHeader
          title="Desarrollo de Aplicaciones"
          highlight="Web"
          subtitle="PWAs, Plataformas SaaS y Dashboards construidos con React y Node.js. Escalabilidad garantizada sin depender de tiendas de aplicaciones."
          breadcrumb={[
            { label: "Servicios", href: "/servicios" },
            { label: "Aplicaciones Web", href: "/soluciones/desarrollo-aplicaciones-web" },
          ]}
        />

        {/* ── Section: Servicios de Aplicaciones Web (LLM-friendly) ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-b border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-6 tracking-tight">
                  Especialistas en Apps Web
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                  A diferencia de una web informativa, las aplicaciones web procesan información, 
                  autentican usuarios y manejan pagos. Programamos herramientas completas que corren 
                  en el navegador con una experiencia idéntica a una aplicación de escritorio.
                </p>
                <div className="mb-8">
                  <h3 className="font-bold text-[var(--text)] mb-4 uppercase tracking-wider text-sm">Nuestro Portafolio de Soluciones:</h3>
                  <ul className="flex flex-col gap-3">
                    {serviciosList.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-[var(--text-secondary)]">
                        <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
                        <span className="text-sm font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-10">
                  <h3 className="font-bold text-[var(--text)] mb-4 uppercase tracking-wider text-sm">Sectores:</h3>
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
                    Cotizar Desarrollo <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Trust signals con datos reales */}
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "PWA", label: "Progressive Web App" },
                    { value: "0%", label: "Comisiones AppStore" },
                    { value: "SaaS", label: "Arquitecturas Escala" },
                    { value: "SSL", label: "Seguridad Incluida" },
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

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-4">Evidencias Contractuales</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: FileText, text: "Arquitectura escalable y segura" },
                      { icon: Server, text: "Configuración de entorno de bases de datos de propiedad del cliente" },
                      { icon: Headphones, text: "Soporte técnico y garantía extendida" },
                    ].map((g) => {
                      const GIcon = g.icon;
                      return (
                        <div key={g.text} className="flex items-center gap-3">
                          <GIcon size={16} className="text-blue-400 shrink-0" />
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
              Tecnologías de Producción
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              Seleccionamos meticulosamente nuestra pila tecnológica basándonos en el soporte empresarial,
              documentación activa y desempeño en benchmarks de concurrencia global.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Interfaces Reactivas",
                  icon: Monitor,
                  color: "text-blue-400",
                  items: [
                    { name: "React + Next.js", desc: "El estándar industrial de Meta para construcción de interfaces de usuario escalables." },
                    { name: "Framer Motion", desc: "Para animaciones fluidas que mejoran la experiencia de uso (UX) sin afectar métricas de velocidad." },
                    { name: "Service Workers", desc: "Permite a la aplicación funcionar sin internet temporalmente y recibir push notifications." },
                  ],
                },
                {
                  title: "Gestión de Datos",
                  icon: Database,
                  color: "text-blue-400",
                  items: [
                    { name: "PostgreSQL", desc: "Manejo sólido de transacciones ACID y relaciones complejas entre datos de usuarios." },
                    { name: "Redis", desc: "Sistema de caché en memoria para tiempos de carga de consultas a menos de 50ms." },
                    { name: "WebSockets", desc: "Conexiones persistentes para notificaciones bidireccionales y chats en tiempo real." },
                  ],
                },
                {
                  title: "Nube e Infraestructura",
                  icon: Cloud,
                  color: "text-blue-400",
                  items: [
                    { name: "Vercel / Edge Network", desc: "Sirviendo el código desde un servidor geográficamente próximo al usuario final (CDN)." },
                    { name: "AWS S3", desc: "Almacenamiento seguro e ilimitado para cargas de documentos e imágenes en la aplicación." },
                    { name: "JWT / OAuth2", desc: "Protocolos seguros para login con correos, Google, Apple y gestión de sesiones criptográficas." },
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
              Aplicaciones Web en Producción
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              No mostramos pruebas de concepto vacías. Mostramos plataformas activas, con usuarios reales y procesos críticos.
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
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{project.type}</span>
                    </div>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center hover:bg-[var(--surface-hover)] transition-colors"
                        aria-label={`Ver aplicación de ${project.client}`}
                      >
                        <ExternalLink size={16} className="text-[var(--text-tertiary)]" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Cuello de Botella</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider">Desarrollo Propuesto</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.solution}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Hito Logrado</span>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">{project.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/portafolio" className="text-sm font-semibold text-[var(--primary)] hover:underline">
                Visita la Galería de Proyectos Completos →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section: Proceso de trabajo ── */}
        <section className="py-20 px-6 bg-[var(--section-process)] border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-4 tracking-tight">
              Protocolo de Ejecución de Software
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-12 max-w-2xl">
              No permitimos que los proyectos queden obsoletos antes de nacer. Ejecutamos un desarrollo
              rápido y validado para minimizar riesgos operativos y financieros.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Diseño de la Arquitectura", desc: "Diagramas Entidad-Relación de Bases de datos, Flujos de Usuarios y Wireframes de la interfaz gráfica.", deliverable: "Base de requerimientos aprobada" },
                { step: "02", title: "MVP / Beta Cerrada", desc: "Desarrollo del Core funcional de la App en 4-6 semanas. Podrás crear usuarios de prueba y realizar testeos preliminares.", deliverable: "Acceso temprano al entorno" },
                { step: "03", title: "Sprints Modulares", desc: "Añadimos integraciones como Webpay, facturación electrónica y websockets en entregas bisemanales.", deliverable: "Aplicación Web Completa" },
                { step: "04", title: "Infraestructura & Go-Live", desc: "Mapeo de dominios, certificados de seguridad aplicados, y activación del tráfico en servidores robustos.", deliverable: "Salida a Producción Final" },
              ].map((step) => (
                <div key={step.step}>
                  <div className="text-4xl font-black text-[var(--primary)] opacity-20 mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-xs text-blue-400 font-semibold">→ {step.deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section: FAQ ── */}
        <section className="py-20 px-6 bg-[var(--bg)] border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-12 tracking-tight text-center">
              Preguntas de Integración Comercial
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
              Desarrolla tu Aplicación con el Equipo Correcto
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-4 leading-relaxed">
              Reserva una reunión de análisis de pre-factibilidad. Escuchamos tu modelo de negocio
              y proponemos la arquitectura más eficiente desde el primer día.
            </p>
            <p className="text-sm text-[var(--text-tertiary)] mb-10">
              Evaluación inicial gratis · Ingeniería especializada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formulario"
                className="btn-primary text-sm !py-3.5 !px-8 !rounded-xl"
              >
                Acceder a Briefing Técnico <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/56949255006?text=Hola,%20busco%20desarrollar%20una%20aplicación%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm !py-3.5 !px-8 !rounded-xl"
              >
                <MessageCircle size={16} /> Contacto WhatsApp
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
                { name: "Aplicaciones Web", url: PAGE_URL },
              ]),
              faqJsonLd(faqs),
              serviceJsonLd({
                name: "Desarrollo de Aplicaciones Web",
                description:
                  "Ingeniería de software en Chile para Aplicaciones Web, Plataformas SaaS Multitenant y PWAs en React, Next.js y Node.js.",
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
