import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/mi-sitio/"],
      },
    ],
    sitemap: "https://www.purocode.com/sitemap.xml",
  };
}
