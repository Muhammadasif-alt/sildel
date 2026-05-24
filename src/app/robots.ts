import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block transactional/private routes from indexing entirely.
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/cart",
          "/checkout",
          "/checkout/",
          "/account",
          "/account/",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}