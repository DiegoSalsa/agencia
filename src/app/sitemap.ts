import type { MetadataRoute } from "next";

const SITE_URL = "https://www.purocode.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModifiedDate = "2026-06-24";

  return [
    {
      url: SITE_URL,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ecosistema-digital`,
      lastModified: lastModifiedDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portafolio`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/proceso`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/planes`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/mantenimiento`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // ── SEO Landing Pages ──
    {
      url: `${SITE_URL}/soluciones/desarrollo-web-concepcion`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/soluciones/desarrollo-software-medida`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/soluciones/desarrollo-aplicaciones-web`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: lastModifiedDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: lastModifiedDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
