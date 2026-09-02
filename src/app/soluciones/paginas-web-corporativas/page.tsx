import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import ServiceFicha from "@/components/seo/ServiceFicha";

export const metadata: Metadata = generatePageMetadata({
  title: "Páginas web corporativas Chile",
  description:
    "Sitio web para presentar la empresa: quiénes son, qué ofrecen y cómo contactarlos. Desde $380.000 CLP. Diseño a medida, remoto para todo Chile.",
  path: "/soluciones/paginas-web-corporativas",
});

export default function Page() {
  return (
    <PromoProvider>
      <Header />
      <ServiceFicha
        title="Páginas web corporativas"
        highlight="Chile"
        subtitle="Quiénes son, qué venden y cómo contactarlos. El sitio de la empresa, no una campaña de una semana."
        path="/soluciones/paginas-web-corporativas"
        breadcrumbLabel="Corporativas"
        lead={[
          "Una web corporativa es la base digital de la empresa: servicios, equipo, casos y un formulario o WhatsApp a la vista. Quien llega desde Google o desde una tarjeta debería entender en un minuto si les sirve y cómo escribirles.",
          "La hacemos a medida, no con un tema de WordPress. Formularios, SEO técnico y diseño que se vea bien en el celular. Remoto, para todo Chile.",
        ]}
        priceLabel="Desde $380.000 CLP"
        timeline="10–15 días hábiles"
        includes={[
          "Arquitectura de páginas (inicio, servicios, nosotros, contacto)",
          "Diseño a medida en Figma, aprobado antes de programar",
          "Formulario de contacto y enlace a WhatsApp",
          "SEO técnico base y metadatos por página",
          "Dominio .cl o .com y hosting el primer año",
          "Soporte técnico 3 meses",
        ]}
        excludes={[
          "Tienda con carrito y pagos (eso es e-commerce)",
          "Landing de una sola oferta con fecha de cierre",
          "Redacción larga de blog ni pauta publicitaria",
          "App o sistema interno (eso es software a medida)",
        ]}
        forWho={[
          "Empresas que hoy se presentan por Instagram o un PDF",
          "Quien necesita que un cliente o un proveedor los tome en serio",
          "Negocios que venden servicios, no un catálogo de SKUs",
        ]}
        notFor={[
          "Una campaña de una semana con un solo botón: eso es landing",
          "Vender productos con stock y checkout: eso es tienda online",
        ]}
        example={{
          client: "Agencia Brújula",
          type: "Web corporativa",
          problem:
            "Agencia de marketing que necesitaba una presencia que se viera a la altura de lo que venden, no una plantilla.",
          solution:
            "Sitio con secciones de servicios, portafolio y contacto, diseño propio y formulario a la vista.",
          result:
            "Cara digital propia, alineada con la marca, para enviar a clientes y licitaciones.",
          href: "https://www.agenciabrujula.com",
        }}
        faqs={[
          {
            question: "¿Cuántas páginas incluye el plan base?",
            answer:
              "El base cubre las secciones típicas de una pyme (inicio, servicios, nosotros, contacto). Si necesitas más —blog, área de clientes, varias líneas de negocio— se cotiza encima. El precio final sale del briefing.",
          },
          {
            question: "¿Puedo editar el contenido después?",
            answer:
              "Sí. Según el proyecto dejamos un flujo para cambiar textos y fotos sin tocar código, o te capacitamos para lo básico. Cambios de diseño o secciones nuevas van por mantención o por un adicional.",
          },
          {
            question: "¿Cuánto demora y cómo se paga?",
            answer:
              "10 a 15 días hábiles después de aprobar el diseño. 50% al inicio y 50% a la entrega, más IVA. Dominio y hosting el primer año van incluidos.",
          },
          {
            question: "¿Trabajan solo en Santiago o Concepción?",
            answer:
              "No. El trabajo es remoto para todo Chile: Zoom o Meet, WhatsApp y entregas en staging. Si estás en Biobío y prefieres una reunión presencial, se puede coordinar.",
          },
        ]}
        quoteHref="/formulario/web-corporativa"
        whatsappText="Hola, quiero cotizar un sitio corporativo"
        schemaName="Páginas web corporativas Chile"
        schemaDescription="Sitio web corporativo: quiénes son, qué ofrecen y cómo contactarlos. Desde $380.000 CLP. Remoto para todo Chile."
        related={[
          { href: "/soluciones/landing-pages", label: "Landing pages" },
          { href: "/soluciones/tienda-online", label: "E-commerce" },
          { href: "/soluciones/desarrollo-software-medida", label: "Apps y SaaS" },
          { href: "/planes", label: "Ver planes" },
        ]}
      />
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
