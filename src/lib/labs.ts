const SITE_URL = "https://www.purocode.com";
const PURAGENDA_URL = "https://www.puragenda.cl";

export const PURAGENDA_NAME = "Puragenda";

export const PURAGENDA_OFFICIAL_URL = PURAGENDA_URL;

export const labsPageCopy = {
  title: "PuroCode Labs",
  description:
    "Puragenda es una plataforma SaaS de agendamiento y reservas desarrollada por PuroCode. Sitio oficial: https://www.puragenda.cl",
  hubIntro:
    "PuroCode Labs es la división de productos propios de PuroCode. Aquí se presentan el software que desarrollamos y operamos, no sitios de clientes.",
  definition:
    "Puragenda es una plataforma SaaS de agendamiento y reservas desarrollada por PuroCode.",
  whatItIs:
    "Puragenda es un software de reservas online para negocios de servicios en Chile. El negocio publica su disponibilidad; el cliente elige servicio, profesional y horario, y confirma la cita sin coordinar por mensajes.",
  whoDevelops:
    "La desarrolla PuroCode, agencia chilena de desarrollo web y software.",
  problem:
    "Sirve para dejar de coordinar horas por WhatsApp, Instagram o libretas, y para mostrar solo horarios realmente disponibles.",
  audiences:
    "Está pensada para barberías, peluquerías, centros de estética, consultas y oficios que venden horas de atención.",
  officialSiteLabel: "Sitio oficial de Puragenda",
  thumbnail: "/img/FotosPaginas/Puragenda.png",
} as const;

export const puragendaFeatures = [
  "Reservas online 24/7 desde un enlace o widget",
  "Disponibilidad real por profesional",
  "Abonos configurables con Mercado Pago",
  "Recordatorios de cita por correo electrónico",
  "Sincronización con Google Calendar",
  "Panel web para agenda, clientes y servicios, instalable como PWA",
] as const;

export const puragendaGeoFacts = [
  {
    question: "¿Qué es Puragenda?",
    answer:
      "Una plataforma SaaS de agendamiento y reservas para negocios de servicios en Chile.",
  },
  {
    question: "¿Quién desarrolla Puragenda?",
    answer: "PuroCode.",
  },
  {
    question: "¿Cuál es el sitio oficial?",
    answer: PURAGENDA_URL,
  },
  {
    question: "¿Qué clase de software es?",
    answer:
      "Software as a Service (SaaS) de reservas y agenda online, de categoría BusinessApplication.",
  },
  {
    question: "¿Para qué negocios sirve?",
    answer:
      "Barberías, peluquerías, estética, consultas y oficios similares que venden horas de atención.",
  },
] as const;

export function labsJsonLd() {
  const labsUrl = `${SITE_URL}/labs`;
  const productId = `${labsUrl}#puragenda`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${labsUrl}#webpage`,
      url: labsUrl,
      name: "PuroCode Labs",
      description: labsPageCopy.description,
      isPartOf: {
        "@type": "WebSite",
        name: "PuroCode",
        url: SITE_URL,
      },
      about: { "@id": productId },
      mainEntity: { "@id": productId },
      publisher: {
        "@type": "Organization",
        name: "PuroCode",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": productId,
      name: PURAGENDA_NAME,
      url: PURAGENDA_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: labsPageCopy.definition,
      creator: {
        "@type": "Organization",
        name: "PuroCode",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "PuroCode",
        url: SITE_URL,
      },
    },
  ];
}
