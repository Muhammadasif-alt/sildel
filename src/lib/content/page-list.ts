/**
 * Registry of CMS-managed pages. Drives the admin sidebar + index list and
 * tells the editor which routes to revalidate on save.
 */
export type PageDef = {
  key: string;
  label: string;
  description: string;
  publicPath: string;
};

export const PAGES: PageDef[] = [
  { key: "home", label: "Home", description: "Landing page", publicPath: "/" },
  { key: "our-story", label: "Our Story", description: "About + history", publicPath: "/our-story" },
  { key: "authentic-cork", label: "Authentic Cork", description: "Material education", publicPath: "/authentic-cork" },
  { key: "you-think-cork", label: "You Think Cork", description: "Brand campaign", publicPath: "/you-think-cork" },
  { key: "treasures", label: "Treasures", description: "Shop hero copy", publicPath: "/treasures" },
  { key: "contact", label: "Contact", description: "Contact page", publicPath: "/contact" },
  { key: "blog", label: "Blog index", description: "Blog landing page", publicPath: "/blog" },
  { key: "terms", label: "Terms", description: "Terms of service", publicPath: "/terms" },
  { key: "privacy", label: "Privacy", description: "Privacy policy", publicPath: "/privacy" },
  { key: "shipping", label: "Shipping", description: "Shipping policy", publicPath: "/shipping" },
];

export function findPage(key: string): PageDef | undefined {
  return PAGES.find((p) => p.key === key);
}
