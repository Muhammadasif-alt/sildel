export const siteConfig = {
  name: "Sildel",
  legalName: "Sildel",
  tagline: "We Think Cork",
  shortDescription:
    "Sildel crafts fine art and luxury home pieces from sustainably harvested Portuguese cork — signed, numbered, made in Esmoriz, Portugal.",
  // Locale-aware short description used by buildMetadata when no per-page description is provided.
  shortDescriptionByLocale: {
    en: "Sildel crafts fine art and luxury home pieces from sustainably harvested Portuguese cork — signed, numbered, made in Esmoriz, Portugal.",
    pt: "Sildel cria peças de arte e decoração de luxo a partir de cortiça portuguesa sustentável — assinadas, numeradas, feitas em Esmoriz, Portugal.",
  },
  url: "https://sildel.pt",
  ogImage: "/images/og/sildel-og.webp",
  locale: "en_US",
  defaultLocale: "en",
  locales: ["en", "pt"] as const,

  founder: "Sildel Atelier",
  foundingYear: 2024,
  foundingDate: "2024-01-01",
  // Schema.org area served + currency
  areaServed: ["PT", "EU", "Worldwide"] as const,
  currency: "EUR",
  priceRange: "€€€",

  contact: {
    email: "sildel@sildel.pt",
    phone: "+351 911 015 388",
    phoneHref: "+351911015388",
    phoneNote: {
      en: "Cost of a call to the mobile network according to your tariff.",
      pt: "Custo de chamada para a rede móvel de acordo com a sua tarifa.",
    },
    address: {
      line1: "Rua das Ruivas, 108",
      line2: "3885-494 Esmoriz, Portugal",
      streetAddress: "Rua das Ruivas, 108",
      locality: "Esmoriz",
      region: "Aveiro",
      postalCode: "3885-494",
      country: "PT",
      countryName: "Portugal",
    },
    // Esmoriz, Aveiro, Portugal (Google Maps centroid)
    geo: {
      latitude: 40.9606,
      longitude: -8.6336,
      // ICBM ("Internet Coordinate Body Markup") string for geo meta
      icbm: "40.9606, -8.6336",
      region: "PT-01", // ISO 3166-2 Aveiro district
      placename: "Esmoriz, Aveiro, Portugal",
    },
    openingHours: [
      // Monday–Friday 10:00–18:00 — atelier visits by appointment.
      { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "10:00", closes: "18:00" },
    ],
    freeShipping: true,
  },

  social: {
    instagram: "https://instagram.com/sildel",
    facebook: "https://facebook.com/sildel",
    linkedin: "https://linkedin.com/company/sildel",
  },

  nav: {
    main: [
      { label: "Our Story", href: "/our-story" },
      { label: "Authentic Cork", href: "/authentic-cork" },
      { label: "You Think Cork", href: "/you-think-cork" },
      { label: "Treasures", href: "/treasures" },
    ],
    footer: [
      { label: "Blog", href: "/blog" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Shipping", href: "/shipping" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;