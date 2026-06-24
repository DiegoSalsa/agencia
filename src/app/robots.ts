import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
      {
        userAgent: "Anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
    ],
    sitemap: "https://www.purocode.com/sitemap.xml",
  };
}
