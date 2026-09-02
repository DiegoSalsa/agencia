import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import ServiceFicha from "@/components/seo/ServiceFicha";

export const metadata: Metadata = generatePageMetadata({
  title: "Landing pages Chile",
  description:
    "Landing page para una campaña: un producto, un evento o un lead. Desde $220.000 CLP. Diseño a medida, entrega en 5-7 días. Remoto para todo Chile.",
  path: "/soluciones/landing-pages",
});

export default function Page() {
  return (
    <PromoProvider>
      <Header />
      <ServiceFicha
        title="Landing pages"
        highlight="Chile"
        subtitle="Una página, un mensaje, un botón. Para una campaña con fecha, no para reemplazar el sitio de la empresa."
        path="/soluciones/landing-pages"
        breadcrumbLabel="Landing pages"
        lead={[
          "Una landing sirve para una campaña concreta: lanzar un producto, inscribir a un evento o pedir un dato. El visitante llega desde un anuncio o un mail y tiene una sola cosa que hacer.",
          "La armamos móvil primero, con diseño a medida. Formulario o WhatsApp a la vista. No es un sitio corporativo recortado ni un template con el logo pegado.",
        ]}
        priceLabel="Desde $220.000 CLP"
        timeline="5–7 días hábiles"
        includes={[
          "Diseño a medida en Figma, aprobado antes de programar",
          "Una página con las secciones de la campaña",
          "Formulario de contacto o botón a WhatsApp",
          "SEO técnico base (título, descripción, carga rápida)",
          "Dominio .cl o .com y hosting el primer año",
          "Soporte técnico 3 meses",
        ]}
        excludes={[
          "Varias páginas (quiénes somos, blog, servicios)",
          "Catálogo, carrito o pagos",
          "Pauta, copy de anuncios ni gestión de Meta/Google Ads",
          "Sesión de fotos o video (usas el material que ya tienes)",
        ]}
        forWho={[
          "Una oferta o un evento con fecha de cierre",
          "Captar leads desde Meta, Google o email sin armar un sitio completo",
          "Probar un producto antes de invertir en web corporativa",
        ]}
        notFor={[
          "Quien necesita presentar la empresa completa: eso es una web corporativa",
          "Quien quiere vender un catálogo con carrito: eso es e-commerce",
        ]}
        example={{
          client: "PodomedClinical",
          type: "Landing page",
          problem:
            "Clínica de podología que necesitaba captar pacientes online y transmitir confianza, sin un sitio de diez páginas.",
          solution:
            "Landing con servicios claros, prueba social y CTA directo a WhatsApp y formulario.",
          result:
            "Canal propio para pedir hora, independiente de Instagram.",
          href: "https://pagina-podomed-clinical.vercel.app",
        }}
        faqs={[
          {
            question: "¿En qué se diferencia de una web corporativa?",
            answer:
              "La landing tiene una página y un objetivo. La corporativa presenta la empresa: servicios, equipo, contacto, a veces blog. Si el visitante tiene que entender quiénes son, no es landing.",
          },
          {
            question: "¿Cuánto demora y cómo se paga?",
            answer:
              "5 a 7 días hábiles después de aprobar el diseño. 50% al inicio y 50% a la entrega, más IVA. Dominio y hosting van incluidos el primer año.",
          },
          {
            question: "¿Puedo usarla en campañas de Meta o Google?",
            answer:
              "Sí. La página está pensada para tráfico de pauta: carga rápida en el celular y un solo llamado a la acción. La pauta en sí no está incluida; si la necesitas, te conectamos con el ecosistema.",
          },
          {
            question: "¿Qué pasa si después quiero un sitio más grande?",
            answer:
              "Se puede partir por la landing y sumar corporativa o tienda después. No tiras el trabajo: el diseño y el dominio quedan.",
          },
        ]}
        quoteHref="/formulario/landing"
        whatsappText="Hola, quiero cotizar una landing page"
        schemaName="Landing pages Chile"
        schemaDescription="Landing page para campañas: un producto, un evento o un lead. Desde $220.000 CLP. Remoto para todo Chile."
        related={[
          { href: "/soluciones/paginas-web-corporativas", label: "Páginas corporativas" },
          { href: "/soluciones/tienda-online", label: "E-commerce" },
          { href: "/mantenimiento", label: "Mantención" },
          { href: "/planes", label: "Ver planes" },
        ]}
      />
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
