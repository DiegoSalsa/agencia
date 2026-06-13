import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SocialFloater from "@/components/shared/SocialFloater";
import { PromoProvider } from "@/context/PromoContext";
import PromoBanner from '@/components/landing/PromoBanner';
import EcosistemaContent from "./EcosistemaContent";

export const metadata: Metadata = {
  title: "Ecosistema Digital | PuroCode",
  description: "Conoce nuestro ecosistema de partners estratégicos y cómo trabajamos para ofrecer soluciones digitales integrales.",
};

export default function EcosistemaDigitalPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://purocode.com/#organization",
        "name": "PuroCode",
        "url": "https://purocode.com",
        "logo": "https://purocode.com/logo.png",
        "knowsAbout": ["Web Development", "Software Engineering", "E-commerce"],
        "memberOf": {
          "@type": "Organization",
          "name": "Ecosistema Digital PuroCode",
          "member": [
            {
              "@type": "Organization",
              "name": "Agencia Brújula",
              "url": "https://agenciabrujula.com",
              "knowsAbout": ["Digital Marketing", "SEO", "Social Media"]
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://purocode.com/ecosistema-digital/#webpage",
        "url": "https://purocode.com/ecosistema-digital",
        "name": "Ecosistema Digital | PuroCode",
        "description": "Conoce nuestro ecosistema de partners estratégicos y cómo trabajamos para ofrecer soluciones digitales integrales.",
        "isPartOf": { "@id": "https://purocode.com/#website" },
        "about": { "@id": "https://purocode.com/#organization" }
      },
      {
        "@type": "AboutPage",
        "@id": "https://purocode.com/ecosistema-digital/#aboutpage",
        "url": "https://purocode.com/ecosistema-digital",
        "name": "Acerca de nuestro Ecosistema Digital",
        "mainEntity": { "@id": "https://purocode.com/#organization" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://purocode.com/ecosistema-digital/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://purocode.com",
              "name": "Inicio"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://purocode.com/ecosistema-digital",
              "name": "Ecosistema Digital"
            }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://purocode.com/ecosistema-digital/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Por qué una empresa necesita desarrollo web y marketing digital?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "El desarrollo web construye la infraestructura técnica y la experiencia del usuario de tu negocio digital. El marketing digital atrae a los usuarios hacia esa plataforma. Ninguno alcanza su máximo potencial por sí solo: una web excelente sin tráfico no genera ventas, y el tráfico dirigido a una web lenta o confusa resulta en un desperdicio del presupuesto publicitario."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia existe entre una página web y una estrategia digital?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Una página web es un activo digital, como un local comercial. Una estrategia digital integral incluye no solo la construcción de la web, sino también el SEO, la publicidad, el contenido en redes sociales y la optimización de tasas de conversión para asegurar que el negocio crezca sistemáticamente."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué beneficios tiene combinar desarrollo web con publicidad digital?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Permite reducir los costos de adquisición de clientes (CAC). Una web rápida, accesible y técnicamente optimizada recibe mejores puntuaciones de calidad en plataformas como Google Ads o Meta Ads, lo que disminuye el costo por clic y mejora el posicionamiento orgánico, maximizando la rentabilidad de las campañas publicitarias."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cuándo una empresa necesita software a medida?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Una empresa debe invertir en software a medida cuando las plataformas estándar (como plantillas de WordPress o Shopify) ya no pueden soportar sus flujos de trabajo únicos, cuando requieren integraciones complejas con sistemas internos (ERPs, inventarios) o cuando el volumen de tráfico exige una arquitectura escalable dedicada."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo ayuda el SEO a captar clientes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "El SEO (posicionamiento en buscadores) aumenta la visibilidad de tu negocio cuando potenciales clientes buscan activamente tus servicios. A través de optimización técnica, código semántico y velocidad de carga excepcional, aseguramos que los motores de búsqueda prioricen tu sitio, generando un flujo constante de clientes cualificados a largo plazo."
            }
          }
        ]
      }
    ]
  };

  return (
    <PromoProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PromoBanner />
      <Header />
      <main id="main-content">
        <EcosistemaContent />
      </main>
      <Footer />
      <SocialFloater />
    </PromoProvider>
  );
}
