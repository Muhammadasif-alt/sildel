/**
 * Plain-module default values for SiteSettings — no `server-only` import,
 * so this can be loaded from both server components and standalone tsx
 * scripts (e.g. the seed runner).
 */
import type { Localized } from "@/lib/blocks/types";

export type NavLink = { id: string; label: Localized; href: string };
export type FooterColumn = { id: string; heading: Localized; links: NavLink[] };

export type SiteSettingsData = {
  brand: {
    name: string;
    tagline: Localized;
    logoDarkUrl: string;
    logoLightUrl: string;
  };
  nav: NavLink[];
  footer: {
    tagline: Localized;
    columns: FooterColumn[];
    copyright: Localized;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
    pinterest: string;
    tiktok: string;
  };
  contact: {
    email: string;
    phone: string;
    address: Localized;
    hours: Localized;
  };
  brandVideo: {
    url: string;
    title: Localized;
    poster: string;
  };
};

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  brand: {
    name: "Sildel",
    tagline: { pt: "Cork, reimaginada como tesouro.", en: "Cork, reimagined as treasure." },
    logoDarkUrl: "/images/og/sildel-logo-dark.png",
    logoLightUrl: "/images/og/sildel-logo-light.webp",
  },
  nav: [
    { id: "our-story", label: { pt: "A Nossa História", en: "Our Story" }, href: "/our-story" },
    { id: "authentic-cork", label: { pt: "Cortiça Autêntica", en: "Authentic Cork" }, href: "/authentic-cork" },
    { id: "you-think-cork", label: { pt: "Você Pensa Cortiça", en: "You Think Cork" }, href: "/you-think-cork" },
    { id: "treasures", label: { pt: "Tesouros", en: "Treasures" }, href: "/treasures" },
  ],
  footer: {
    tagline: { pt: "", en: "" },
    columns: [],
    copyright: {
      pt: "© Sildel. Todos os direitos reservados.",
      en: "© Sildel. All rights reserved.",
    },
  },
  social: {
    instagram: "",
    facebook: "",
    youtube: "https://www.youtube.com/watch?v=U6N8YkiLSHY",
    linkedin: "",
    pinterest: "",
    tiktok: "",
  },
  contact: {
    email: "hello@sildel.pt",
    phone: "",
    address: { pt: "", en: "" },
    hours: { pt: "", en: "" },
  },
  brandVideo: {
    url: "https://www.youtube.com/watch?v=U6N8YkiLSHY",
    title: {
      pt: "Da árvore à peça — colheita sustentável de cortiça",
      en: "From tree to piece — sustainable cork harvest",
    },
    poster: "",
  },
};
