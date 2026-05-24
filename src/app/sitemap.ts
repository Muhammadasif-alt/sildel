import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { products } from "@/content/treasures";
import { getAllPosts } from "@/lib/content/blog";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/treasures", changeFrequency: "weekly", priority: 0.95 },
  { path: "/our-story", changeFrequency: "monthly", priority: 0.85 },
  { path: "/authentic-cork", changeFrequency: "monthly", priority: 0.85 },
  { path: "/you-think-cork", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/shipping", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: new URL(path, siteConfig.url).toString(),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          "en-US": new URL(path, siteConfig.url).toString(),
          "pt-PT": new URL(path, siteConfig.url).toString(),
        },
      },
    }),
  );

  // Every product detail page
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: new URL(`/treasures/${p.slug}`, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
    alternates: {
      languages: {
        "en-US": new URL(`/treasures/${p.slug}`, siteConfig.url).toString(),
        "pt-PT": new URL(`/treasures/${p.slug}`, siteConfig.url).toString(),
      },
    },
  }));

  // Every published blog post (DB + hardcoded fallback)
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postEntries = posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-US": new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
          "pt-PT": new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
        },
      },
    }));
  } catch {
    // DB might be unreachable at build time — skip post entries rather than
    // failing the entire sitemap.
  }

  return [...staticEntries, ...productEntries, ...postEntries];
}