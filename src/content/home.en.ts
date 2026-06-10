import type { HeroSlide } from "./home";

export const homeEn = {
  /* Hero slider — enhanced editorial atelier shots (founder direction,
     June 2026). Each slide pairs a collection with a wide cinematic
     interior frame from the /Slidel/enhance/ series so the whole reel
     reads as one moodboard rather than a mix of studio + ambient. */
  heroSlider: [
    {
      id: "fine-arts",
      eyebrow: "Fine Arts",
      title: "We Think",
      titleAccent: "Cork.",
      description:
        "Sculptural treasures shaped from sustainably harvested Portuguese cork — slow craft, signed and numbered.",
      image: "/Slidel/enhance/enhance-sculpture-04.webp",
      imageAlt: "Sildel cork sculpture in a sun-lit Portuguese atelier interior.",
      cta: { label: "See All Treasures", href: "/treasures" },
    },
    {
      id: "carre-dor",
      eyebrow: "Limited Edition",
      title: "Carré",
      titleAccent: "d'Or.",
      description: "Gold leaf against authentic cork — geometry in quiet conversation.",
      image: "/Slidel/enhance/enhance-carre-dor-01.webp",
      imageAlt: "Carré d'Or — 24k gold leaf against the authentic grain of Portuguese cork.",
      cta: { label: "Discover Carré d'Or", href: "/treasures#carre-dor" },
    },
    {
      id: "eclipse",
      eyebrow: "New Collection",
      title: "Eclipse",
      titleAccent: "Collection.",
      description: "Sculptural cork forms that hold the warmth of the forest.",
      image: "/Slidel/enhance/enhance-lighting-03.webp",
      imageAlt: "Eclipse — cork lighting in a softly-lit Portuguese atelier.",
      cta: { label: "View Eclipse", href: "/treasures#eclipse" },
    },
    {
      id: "gibraltar",
      eyebrow: "Signature",
      title: "Gibraltar",
      titleAccent: "in cork.",
      description: "A defining silhouette — elegant lines designed to last decades.",
      image: "/Slidel/enhance/enhance-tables-01.webp",
      imageAlt: "Gibraltar — Sildel cork table in a warm Portuguese atelier interior.",
      cta: { label: "Explore Gibraltar", href: "/treasures#gibraltar" },
    },
  ] satisfies HeroSlide[],

  /* "Why Choose Sildel" editorial band — 50/50 split, text + cinematic
     atelier image. Founder direction (June 2026), Papi & Lilly's reference. */
  whyChoose: {
    eyebrow: "Why Collectors Choose Sildel",
    title: "A treasure shaped by hand,",
    titleAccent: "signed by name.",
    body: [
      "Sildel is a small Portuguese atelier in Esmoriz, built by founder Isabel Silva. Every piece begins as raw cork bark from a working forest — never a felled tree — and ends as a numbered treasure signed by the hands that shaped it.",
      "No factory line. No anonymous suppliers. No reissued editions. Just slow craft, premium cork, and a thirty-year practice the Iberian peninsula has come to know.",
    ],
    bullets: [
      "30+ years working exclusively in cork",
      "Designed and finished in Portugal, by hand",
      "Each piece signed, numbered, never reissued",
      "Sustainably harvested — no trees ever felled",
    ],
    image: "/Slidel/enhance/enhance-tables-04.webp",
    imageAlt:
      "A Sildel cork table in a sun-lit Portuguese atelier interior with arched alcove and olive branch.",
    cta: { label: "Explore treasures", href: "/treasures" },
  },

  collections: {
    eyebrow: "Our Collections",
    title: "Treasures, signed",
    titleAccent: "& numbered.",
    body:
      "Each piece is shaped by hand in Portugal — limited runs, never reissued.",
    items: [
      {
        slug: "hot-spring",
        name: "Hot Spring",
        tagline: "Earth-fired centerpieces",
        description: "Warmth and weight in every silhouette.",
        image: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-01_01-f3f538f873.webp",
        href: "/treasures/hot-spring",
      },
      {
        slug: "alexis",
        name: "Alexis",
        tagline: "Signature line",
        description: "Elegant lines for the considered home.",
        image: "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
        href: "/treasures/alexis",
      },
      {
        slug: "carre-dor",
        name: "Carré d'Or",
        tagline: "Limited edition",
        description: "Gold leaf against authentic cork — geometry in conversation.",
        image: "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
        href: "/treasures/carre-dor",
      },
    ],
    cta: { label: "See All Treasures", href: "/treasures" },
  },

  philosophy: {
    eyebrow: "Our Philosophy",
    headline: "We do not kill trees,",
    headlineAccent: "we give them life.",
    body:
      "Each piece is a testament to nature's renewal. We don't cut down cork oak trees; by harvesting the cork, we set the tree free to regenerate, flourishing with a new layer of life. Thus, every treasure is a celebration of resilience and the eternal cycle of the earth.",
    image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_3.webp",
    imageAlt: "Ancient Portuguese cork oak tree with bark recently harvested.",
    stats: [
      { value: "9", unit: "years", label: "Between each harvest" },
      { value: "0", unit: "trees", label: "Harmed in the process" },
      { value: "200+", unit: "yrs", label: "Lifespan of each oak" },
    ],
    cta: { label: "Learn About Cork", href: "/authentic-cork" },
  },

  sustainability: {
    eyebrow: "Authentic Cork",
    title: "Honest craft,",
    titleAccent: "harvested without harm.",
    body:
      "Every Sildel piece begins in the cork oak forests of Portugal — protected ecosystems where the same trees are harvested every nine years, without ever felling them.",
    image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_4.webp",
    imageAlt: "Portuguese cork oak forest at golden hour.",
    steps: [
      {
        number: "01",
        title: "Harvested by hand",
        body:
          "Master harvesters strip the bark with axes, never harming the tree beneath.",
        image: "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_3.webp",
      },
      {
        number: "02",
        title: "Aged in open air",
        body:
          "The cork rests outdoors for months, settling into its grain and color.",
        image: "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_2.webp",
      },
      {
        number: "03",
        title: "Shaped slowly",
        body:
          "Each piece is finished by our atelier — no two are ever identical.",
        image: "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp",
      },
    ],
    cta: { label: "Discover authentic cork", href: "/authentic-cork" },
  },

  brandVideo: {
    eyebrow: "Watch the Craft",
    title: "From oak to atelier.",
    titleAccent: "In Sildel's own hands.",
    body:
      "Step inside the cork forests of Portugal and the atelier where each treasure is finished by hand.",
    youtubeId: "U6N8YkiLSHY",
    duration: "Watch the film",
  },

  treasures: {
    eyebrow: "Our Promise",
    title: "We do not sell products.",
    titleAccent: "We create treasures.",
    body:
      "Each Sildel piece is signed, numbered, and made to outlast trends. Slow craft, designed in Portugal, made to be passed down.",
    signature: "— Sildel Atelier",
    cta: { label: "Explore Treasures", href: "/treasures" },
  },

  newsletter: {
    eyebrow: "The Atelier Letter",
    title: "Stay close",
    titleAccent: "to the craft.",
    body:
      "New collections, atelier stories, and quiet invitations — once a month, never more.",
    placeholder: "Your email address",
    cta: "Subscribe",
    loadingLabel: "Sending…",
    successTitle: "Welcome to the atelier.",
    successBody: "Watch your inbox for the first letter.",
    errorMessage: "Please enter a valid email address.",
    privacyNote: "We respect your inbox. Unsubscribe anytime.",
  },

  heroShop: {
    eyebrow: "Crafted in Portugal",
    titleLines: ["Cork,", "reimagined", "as treasure."],
    description:
      "Sculptural objects shaped by hand from authentic Portuguese cork — signed, numbered, and made to be passed down.",
    ctaPrimary: "Shop Treasures",
    ctaSecondary: "Watch our film",
    socialProof: "Loved by collectors in 30+ countries",
    featuredLabel: "Featured",
    bottomStrip: {
      left: "Hand-finished · Northern Portugal",
      middle: "Signed · Numbered · One of One",
      right: "Worldwide Shipping",
    },
  },

  categorySlider: {
    eyebrow: "The Collections",
    title: "We do not sell products.",
    titleAccent: "We create treasures.",
    body:
      "Four collections — each one signed, numbered, and finished by hand in our atelier in northern Portugal.",
    ctaLabel: "Discover",
    dragHint: "Drag to discover",
    panels: [
      {
        slug: "sculpture",
        label: "Sculpture",
        productSlug: "abyss",
        bg: "#171513",
        textOnBg: "light" as const,
      },
      {
        slug: "tables",
        label: "Tables",
        productSlug: "bond",
        bg: "#c8b094",
        textOnBg: "dark" as const,
      },
      {
        slug: "lighting",
        label: "Lighting",
        productSlug: "crescent",
        bg: "#8b5a3c",
        textOnBg: "light" as const,
      },
      {
        slug: "fine-arts",
        label: "Fine Arts",
        productSlug: "carre-dor",
        bg: "#b9985f",
        textOnBg: "light" as const,
      },
    ],
  },

  shopCategoriesSection: {
    eyebrow: "Shop the Collections",
    title: "Find your",
    titleAccent: "treasure.",
    body:
      "Four collections — each one signed, numbered, and finished in our atelier in northern Portugal.",
    piecesSuffix: "pieces",
    categories: {
      sculpture: { label: "Sculpture", tagline: "Forms shaped by hand" },
      tables: { label: "Tables", tagline: "Anchors for a room" },
      lighting: { label: "Lighting", tagline: "Warmth, made to hang" },
      fineArts: { label: "Fine Arts", tagline: "Wall pieces, framed" },
    },
  },

  featuredTreasuresSection: {
    eyebrow: "This Season's Pieces",
    title: "Treasures, ready to",
    titleAccent: "collect.",
    viewAll: "View all treasures",
    viewTreasure: "View treasure",
  },

  whySildelSection: {
    eyebrow: "Why Sildel",
    title: "Cork, the way it",
    titleAccent: "deserves to be made.",
    body:
      "Three quiet promises behind every Sildel treasure — what makes a piece worth keeping, and worth passing on.",
    stats: [
      { value: 30, suffix: "+", label: "Countries" },
      { value: 12, suffix: "", label: "Master artisans" },
      { value: 9, suffix: "", label: "Years between harvests" },
      { value: 200, suffix: "+", label: "Year oak lifespan" },
    ],
    pillars: [
      {
        index: "01",
        title: "Slow craft.",
        body: "Each treasure passes through the same hands. No machines, no shortcuts — only time, attention, and the artisan's eye.",
      },
      {
        index: "02",
        title: "Made in Portugal.",
        body: "Cork harvested from Alentejo oak forests, finished in our atelier in northern Portugal — a craft tradition that's been honed for centuries.",
      },
      {
        index: "03",
        title: "Signed & numbered.",
        body: "Every piece carries the artisan's signature and its place in the edition. None are reissued, and no two are ever identical.",
      },
    ],
  },
};
