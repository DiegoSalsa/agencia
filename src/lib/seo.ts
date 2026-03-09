const SITE_URL = "https://purocode.com";

/* ── Organization ── */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PuroCode",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.svg`,
  description:
    "Agencia chilena de desarrollo web profesional. Landing pages, sitios corporativos, e-commerce y soluciones SaaS a medida.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["Spanish", "English"],
    url: `${SITE_URL}/#contacto`,
  },
  sameAs: [
    // Add your social media URLs here
    // "https://instagram.com/purocode",
    // "https://linkedin.com/company/purocode",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
  },
};

/* ── WebSite (enables sitelinks search box in Google) ── */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PuroCode",
  url: SITE_URL,
  description:
    "Agencia de desarrollo web premium en Chile. Creamos soluciones digitales de alto rendimiento.",
  publisher: {
    "@type": "Organization",
    name: "PuroCode",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/img/logo.svg`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ── ProfessionalService (local business rich result) ── */
export const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PuroCode",
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.svg`,
  image: `${SITE_URL}/img/og-image.png`,
  description:
    "Servicio profesional de desarrollo web y software a medida. Landing pages desde $220.000 CLP, sitios corporativos, e-commerce y SaaS.",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "CL",
  },
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Desarrollo Web",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Landing Page Profesional",
          description:
            "Página de aterrizaje optimizada para conversión con diseño moderno y responsivo.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sitio Web Corporativo",
          description:
            "Sitio web empresarial multi-página con diseño premium y funcionalidades avanzadas.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-commerce / Tienda Online",
          description:
            "Tienda online completa con catálogo, carrito, checkout y gestión de inventario.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Soluciones SaaS",
          description:
            "Desarrollo de software como servicio con arquitectura multi-inquilino escalable.",
        },
      },
    ],
  },
};

/* ── BreadcrumbList (for inner pages) ── */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ── FAQPage (if you have an FAQ section) ── */
export function faqJsonLd(
  questions: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
