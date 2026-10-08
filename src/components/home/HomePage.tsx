"use client";
import { useI18n } from "@/context/I18nContext";
import Image from "next/image";
import Link from "next/link";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import SocialFloater from "@/components/shared/SocialFloater";
import BrandSculpture from "./BrandSculpture";
import styles from "./home.module.css";

const projects = [
  { name: "JuntAPP", category: "Producto propio · Gestión vecinal", image: "/img/projects/juntapp.jpg", alt: "Sitio de JuntAPP, plataforma de gestión para juntas de vecinos", href: "https://junt-app.vercel.app/" },
  { name: "Florería Wildgarden", category: "Proyecto de cliente · E-commerce", image: "/img/FotosPaginas/FloreriaWildGarden.png", alt: "Tienda online de Florería Wildgarden: Flores que hablan por ti", href: "https://www.floreriawildgarden.cl/" },
];
const services = [
  { name: "Web y e-commerce", href: "/servicios" },
  { name: "Software a medida", href: "/soluciones/desarrollo-software-medida" },
  { name: "Evolución y soporte", href: "/mantenimiento" },
];
function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function HomePage() {
  const { lang } = useI18n();
  const copy = lang === "en" ? {
    title: "Web development", accent: "and custom software.", description: "We build websites, online stores and management systems for companies and entrepreneurs in Chile. From design to development and ongoing support.",
    talk: "Let's talk", work: "Web projects and our own products.", demo: "Public demo view", own: "Our own product", puragenda: "Bookings and management for service businesses.",
    discover: "Discover Puragenda", portfolio: "View portfolio", services: "Development services.", allServices: "View services", contact: "Let's talk about your project.",
    serviceNames: ["Web & e-commerce", "Custom software", "Evolution & support"], categories: ["Our own product · Community management", "Client project · E-commerce"],
  } : {
    title: "Desarrollo web", accent: "y software a medida.", description: "Creamos sitios web, tiendas online y sistemas de gestión para empresas y emprendedores en Chile. Del diseño al desarrollo y soporte continuo.",
    talk: "Conversemos", work: "Proyectos web y productos propios.", demo: "Vista de la demo pública", own: "Producto propio", puragenda: "Reservas y gestión para negocios de servicios.",
    discover: "Conocer Puragenda", portfolio: "Ver portafolio", services: "Servicios de desarrollo.", allServices: "Ver servicios", contact: "Hablemos de tu proyecto.",
    serviceNames: ["Web y e-commerce", "Software a medida", "Evolución y soporte"], categories: projects.map(project => project.category),
  };
  return (
    <div lang={lang} className={styles.home}>
      <div className={styles.container}>
        <HomeHeader />
        <main id="main-content" tabIndex={-1}>
          <section id="hero" className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.heroContent}>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span>{copy.title}{" "}</span>
                <span className={styles.accent}>{copy.accent}</span>
              </h1>
              <p className={styles.heroDescription}>{copy.description}</p>
              <a href="https://wa.me/56949255006?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>{copy.talk} <span aria-hidden="true">→</span></a>
            </div>
            <BrandSculpture />
          </section>
          <section id="trabajo" className={styles.work} aria-labelledby="work-title">
            <h2 id="work-title" className={styles.sectionTitle}>{copy.work}</h2>
            <article className={styles.featuredProject}>
              <figure className={styles.featuredFigure}>
                <a href="https://www.puragenda.cl/" className={styles.imageLink} aria-label="Visitar Puragenda, producto propio de PuroCode">
                  <Image src="/img/projects/puragenda-agenda.jpg" alt="Agenda de Puragenda: calendario de reservas de la demo pública" width={1440} height={900} sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 900px) calc(100vw - 64px), (max-width: 1400px) 68vw, 850px" loading="eager" className={styles.projectImage} />
                </a>
                <figcaption className={styles.imageCaption}>{copy.demo}</figcaption>
              </figure>
              <div className={styles.featuredCopy}>
                <h3 className={styles.projectTitle}>Puragenda</h3>
                <p className={styles.category}>{copy.own}</p>
                <p className={styles.projectDescription}>{copy.puragenda}</p>
                <a href="https://www.puragenda.cl/" className={styles.textLink}>{copy.discover} <Arrow /></a>
              </div>
            </article>
            <div className={styles.secondaryProjects}>
              {projects.map((project, index) => (
                <article key={project.name}>
                  <a href={project.href} className={styles.projectLink}>
                    <div className={styles.secondaryImage}>
                      <Image src={project.image} alt={project.alt} width={1440} height={900} sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 1400px) 45vw, 600px" className={styles.projectImage} />
                    </div>
                    <div className={styles.projectHeading}><h3 className={styles.secondaryTitle}>{project.name}</h3><Arrow /></div>
                    <p className={styles.category}>{copy.categories[index]}</p>
                  </a>
                </article>
              ))}
            </div>
            <div className={styles.sectionAction}><Link href="/portafolio" className={styles.textLink}>{copy.portfolio} <span aria-hidden="true">→</span></Link></div>
          </section>
          <section id="servicios" className={styles.services} aria-labelledby="services-title">
            <h2 id="services-title" className={styles.sectionTitle}>{copy.services}</h2>
            <div className={styles.serviceContent}>
              <ul className={styles.serviceList}>
                {services.map((service, index) => <li key={service.name}><Link href={service.href}>{copy.serviceNames[index]}<Arrow /></Link></li>)}
              </ul>
              <Link href="/servicios" className={styles.textLink}>{copy.allServices} <span aria-hidden="true">→</span></Link>
            </div>
          </section>
          <section id="contacto" className={styles.contact} aria-labelledby="contact-title">
            <h2 id="contact-title" className={styles.sectionTitle}>{copy.contact}</h2>
            <a href="mailto:contacto@purocode.com" className={`${styles.textLink} ${styles.contactLink}`}>contacto@purocode.com <span aria-hidden="true">→</span></a>
          </section>
        </main>
        <HomeFooter />
      </div>
      <SocialFloater />
    </div>
  );
}
