import type { Metadata } from "next";

const SITE_URL = "https://www.purocode.com";

/* ── Metadata Helper ── */
export function generatePageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  const image = opts.image || `${SITE_URL}/img/og-image.png`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${opts.title} - PuroCode`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
    robots: {
      index: !opts.noindex,
      follow: !opts.noindex,
    },
  };
}

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
    "https://www.instagram.com/purocodecl/",
    "https://www.facebook.com/PuroCode.com",
    "https://wa.me/56949255006",
  ],
  areaServed: {
    "@type": "Country",
    name: "Chile",
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

/* ── LocalBusiness (for geo-targeted landing pages) ── */
export function localBusinessJsonLd(opts: {
  city: string;
  region: string;
  description: string;
  url: string;
  areaServed?: string[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "PuroCode",
    url: opts.url,
    logo: `${SITE_URL}/img/logo.svg`,
    image: `${SITE_URL}/img/og-image.png`,
    description: opts.description,
    priceRange: "$$",
    telephone: "+56949255006",
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.city,
      addressRegion: opts.region,
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: opts.city === "Concepción" ? -36.8201 : -33.4489,
      longitude: opts.city === "Concepción" ? -73.0444 : -70.6693,
    },
    areaServed: (opts.areaServed || [opts.city]).map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: [
      "https://www.instagram.com/purocodecl/",
      "https://www.facebook.com/PuroCode.com",
      "https://wa.me/56949255006",
    ],
  };
}

/* ── Service (for individual service landing pages) ── */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: opts.provider || "PuroCode",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
  };
}

/* ── AboutPage ── */
export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre PuroCode",
  url: `${SITE_URL}/sobre-purocode`,
  description: "Conoce a PuroCode, agencia chilena especializada en desarrollo web y software a medida.",
  publisher: {
    "@type": "Organization",
    name: "PuroCode",
  },
};

/* ── ContactPage ── */
export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto | PuroCode",
  url: `${SITE_URL}/contacto`,
  description: "Contacta a PuroCode para cotizar tu proyecto web o desarrollo de software.",
  publisher: {
    "@type": "Organization",
    name: "PuroCode",
  },
};

/* ── Article ── */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image || `${SITE_URL}/img/og-image.png`,
    author: {
      "@type": "Organization",
      name: "PuroCode",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PuroCode",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logo.svg`,
      },
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
  };
}
