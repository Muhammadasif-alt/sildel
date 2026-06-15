import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type BuildMetadata = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Default keyword pool applied to every page.
 * Mix of English + Portuguese terms, brand + category + location.
 * Goal: rank for "cortiça luxo", "cork art Portugal", "Portuguese cork
 * sculpture", "Sildel", "atelier cortiça Esmoriz", etc.
 */
const DEFAULT_KEYWORDS = [
  // Brand
  "Sildel",
  "Sildel atelier",
  "Sildel Portugal",
  "Sildel cortiça",
  // Material (EN)
  "Portuguese cork",
  "cork art",
  "cork sculpture",
  "cork home decor",
  "cork interior design",
  "cork oak",
  "Quercus suber",
  // Material (PT)
  "cortiça",
  "cortiça portuguesa",
  "arte em cortiça",
  "escultura em cortiça",
  "decoração em cortiça",
  "sobreiro",
  // Luxury / craft (EN)
  "luxury home decor",
  "luxury cork design",
  "fine arts cork",
  "handmade Portugal",
  "signed and numbered",
  "limited edition",
  // Luxury / craft (PT)
  "decoração de luxo",
  "design de luxo Portugal",
  "peças de arte cortiça",
  "edição limitada cortiça",
  "escultura cortiça Portugal",
  // Sustainability
  "sustainable atelier",
  "sustainable design",
  "carbon-negative material",
  "material sustentável",
  "design sustentável Portugal",
  // Location
  "made in Portugal",
  "feito em Portugal",
  "Esmoriz",
  "Aveiro",
  "Portugal",
] as const;

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  imageAlt,
  noIndex = false,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadata = {}): Metadata {
  // Title formula:
  //  - Keyword-rich title FIRST (max ~50 chars before pipe)
  //  - Pipe separator (Google preserves better than em-dash)
  //  - Brand at end ("| Sildel") — never first; brand recall is built by
  //    the rest of the SERP, while keyword match decides the click.
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `Portuguese Cork Art & Luxury Home Decor | ${siteConfig.name}`;
  const desc = description ?? siteConfig.shortDescription;
  const url = new URL(path, siteConfig.url).toString();
  const ogImageUrl = new URL(image, siteConfig.url).toString();
  const mergedKeywords = keywords
    ? [...DEFAULT_KEYWORDS, ...keywords]
    : DEFAULT_KEYWORDS;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    keywords: mergedKeywords as unknown as string[],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    category: "Luxury Home Decor",
    alternates: {
      // Locale is cookie-based — same URL serves PT and EN. Canonical is the
      // single shared URL. hreflang `x-default` is the same; en/pt point to
      // it too so search engines understand both languages are served.
      canonical: url,
      languages: {
        "en-US": url,
        "pt-PT": url,
        "x-default": url,
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      locale: siteConfig.locale,
      alternateLocale: ["pt_PT"],
      countryName: siteConfig.contact.address.countryName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt ?? `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImageUrl],
      creator: "@sildel",
      site: "@sildel",
    },
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    manifest: "/manifest.webmanifest",
    // favicon is auto-detected from src/app/favicon.ico by Next.js — no
    // need to declare icons manually here.
    // Verification — pulled from env so the client can drop in the real
    // codes from Google Search Console / Bing Webmaster without redeploy.
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
        "facebook-domain-verification":
          process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION ?? "",
        "p:domain_verify": process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION ?? "",
      },
    },
    // Geo meta tags — help local search engines (and some directories)
    // associate this site with Esmoriz, Aveiro, Portugal.
    other: {
      "geo.region": siteConfig.contact.geo.region,
      "geo.placename": siteConfig.contact.geo.placename,
      "geo.position": `${siteConfig.contact.geo.latitude};${siteConfig.contact.geo.longitude}`,
      ICBM: siteConfig.contact.geo.icbm,
      "og:locality": siteConfig.contact.address.locality,
      "og:region": siteConfig.contact.address.region,
      "og:country-name": siteConfig.contact.address.countryName,
      // Helps RSS/feed readers find the journal
      "format-detection": "telephone=no",
    },
  };
}

/* ─────────────────────────────────── Structured data (JSON-LD) helpers */

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/images/og/sildel-logo-dark.png`,
    width: 512,
    height: 512,
  },
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  description: siteConfig.shortDescription,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  foundingDate: siteConfig.foundingDate,
  founder: { "@type": "Person", name: siteConfig.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.streetAddress,
    addressLocality: siteConfig.contact.address.locality,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: siteConfig.contact.address.country,
  },
  areaServed: siteConfig.areaServed.map((a) => ({ "@type": "Country", name: a })),
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
  ],
};

/**
 * LocalBusiness — strongest signal for Google Maps + local pack rankings
 * in Portugal. Includes geo coords + opening hours + price range.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#localbusiness`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  logo: `${siteConfig.url}/images/og/sildel-logo-dark.png`,
  description: siteConfig.shortDescription,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  priceRange: siteConfig.priceRange,
  currenciesAccepted: siteConfig.currency,
  paymentAccepted: "Cash, Credit Card, PayPal, Multibanco",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.streetAddress,
    addressLocality: siteConfig.contact.address.locality,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: siteConfig.contact.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.contact.geo.latitude,
    longitude: siteConfig.contact.geo.longitude,
  },
  openingHoursSpecification: siteConfig.contact.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days.map((d) => dayNameFromAbbr(d)),
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: siteConfig.areaServed.map((a) => ({ "@type": "Country", name: a })),
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  alternateName: `${siteConfig.name} — ${siteConfig.tagline}`,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  inLanguage: ["en-US", "pt-PT"],
  publisher: { "@id": `${siteConfig.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/treasures?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

function dayNameFromAbbr(abbr: string): string {
  const map: Record<string, string> = {
    Mo: "Monday",
    Tu: "Tuesday",
    We: "Wednesday",
    Th: "Thursday",
    Fr: "Friday",
    Sa: "Saturday",
    Su: "Sunday",
  };
  return map[abbr] ?? abbr;
}

type BreadcrumbItem = { label: string; href: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  };
}

type AboutPageJsonLdInput = {
  path: string;
  name: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  // Caller passes the page's active locale so the JSON-LD's inLanguage
  // matches what's actually rendered — otherwise Google sees mismatched
  // hints between the page body and the structured data.
  locale?: "en" | "pt";
};

export function buildAboutPageJsonLd({
  path,
  name,
  description,
  image,
  datePublished,
  dateModified,
  locale = "en",
}: AboutPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": new URL(path, siteConfig.url).toString(),
    url: new URL(path, siteConfig.url).toString(),
    name,
    description,
    inLanguage: locale === "pt" ? "pt-PT" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/og/sildel-logo-dark.png`,
    },
    ...(image && {
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: new URL(image, siteConfig.url).toString(),
        contentUrl: new URL(image, siteConfig.url).toString(),
      },
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
  };
}

/* ─────────────────────────────────── Product / FAQ helpers */

type ProductJsonLdInput = {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  material?: string;
  priceCents: number;
  currency: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
};

export function buildProductJsonLd({
  slug,
  name,
  description,
  image,
  category,
  material,
  priceCents,
  currency,
  availability = "InStock",
}: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": new URL(`/treasures/${slug}`, siteConfig.url).toString() + "#product",
    name,
    description,
    image: new URL(image, siteConfig.url).toString(),
    category,
    sku: slug,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.contact.address.locality,
        addressRegion: siteConfig.contact.address.region,
        addressCountry: siteConfig.contact.address.country,
      },
    },
    countryOfOrigin: {
      "@type": "Country",
      name: siteConfig.contact.address.countryName,
    },
    ...(material && { material }),
    offers: {
      "@type": "Offer",
      price: (priceCents / 100).toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      itemCondition: "https://schema.org/NewCondition",
      url: new URL(`/treasures/${slug}`, siteConfig.url).toString(),
      seller: { "@id": `${siteConfig.url}/#organization` },
      areaServed: siteConfig.areaServed.map((a) => ({ "@type": "Country", name: a })),
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency,
        },
        shippingDestination: siteConfig.areaServed.map((a) => ({
          "@type": "DefinedRegion",
          addressCountry: a === "Worldwide" ? "ANY" : a,
        })),
      },
    },
  };
}

export function buildFaqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ─────────────────────────────────── VideoObject / HowTo / BlogPosting / Service */

type VideoJsonLdInput = {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  youtubeId?: string;
  contentUrl?: string;
  durationISO?: string; // e.g. "PT2M30S"
};

export function buildVideoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  youtubeId,
  contentUrl,
  durationISO,
}: VideoJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith("http")
      ? thumbnailUrl
      : new URL(thumbnailUrl, siteConfig.url).toString(),
    uploadDate,
    ...(youtubeId && {
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    }),
    ...(contentUrl && !youtubeId && { contentUrl }),
    ...(durationISO && { duration: durationISO }),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: ["en-US", "pt-PT"],
  };
}

type HowToStep = { name: string; text: string; image?: string };
type HowToJsonLdInput = {
  name: string;
  description: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration
  steps: HowToStep[];
};

export function buildHowToJsonLd({
  name,
  description,
  image,
  totalTime,
  steps,
}: HowToJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image && {
      image: image.startsWith("http")
        ? image
        : new URL(image, siteConfig.url).toString(),
    }),
    ...(totalTime && { totalTime }),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image && {
        image: s.image.startsWith("http")
          ? s.image
          : new URL(s.image, siteConfig.url).toString(),
      }),
    })),
  };
}

type BlogPostingJsonLdInput = {
  slug: string;
  title: string;
  description: string;
  image: string;
  author: string;
  authorRole?: string;
  datePublished: string;
  dateModified?: string;
  tag: string;
  wordCount?: number;
  readMinutes?: number;
};

export function buildBlogPostingJsonLd({
  slug,
  title,
  description,
  image,
  author,
  authorRole,
  datePublished,
  dateModified,
  tag,
  wordCount,
  readMinutes,
}: BlogPostingJsonLdInput) {
  const url = new URL(`/blog/${slug}`, siteConfig.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: title,
    name: title,
    description,
    image: image.startsWith("http")
      ? image
      : new URL(image, siteConfig.url).toString(),
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: ["en-US", "pt-PT"],
    articleSection: tag,
    keywords: [tag, "cork", "cortiça", "Portugal", "Sildel"],
    ...(wordCount && { wordCount }),
    ...(readMinutes && { timeRequired: `PT${readMinutes}M` }),
    author: {
      "@type": "Person",
      name: author,
      ...(authorRole && { jobTitle: authorRole }),
      worksFor: { "@id": `${siteConfig.url}/#organization` },
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // Voice-assistant "speakable" hints — the first H1 + lead paragraph
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "header p"],
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: `${siteConfig.name} Journal`,
      url: `${siteConfig.url}/blog`,
    },
  };
}

/** Service JSON-LD — for "bespoke commissions" / "atelier visits" pitches. */
export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  serviceType: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: new URL(input.path, siteConfig.url).toString(),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: siteConfig.areaServed.map((a) => ({ "@type": "Country", name: a })),
    availableLanguage: ["en", "pt"],
  };
}