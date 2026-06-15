import type { HeroSlide } from "./home";

export const homeEn = {
  /* Hero slider — Quinta do Crasto-inspired centred layout (founder
     direction, June 2026, second pass): one serif word/phrase, italic
     tagline below, two flat rectangular CTAs side-by-side. Each slide
     pairs a collection with a wide cinematic interior frame from the
     /Slidel/enhance/ series so the whole reel reads as one moodboard
     rather than a mix of studio + ambient. */
  heroSlider: [
    {
      id: "fine-arts",
      eyebrow: "Fine Arts",
      title: "We Think Cork",
      titleAccent: "Sculptural treasures shaped by hand, signed and numbered.",
      description:
        "Sculptural treasures shaped from sustainably harvested Portuguese cork.",
      image: "/Slidel/enhance/enhance-sculpture-04.webp",
      imageAlt: "Sildel cork sculpture in a sun-lit Portuguese atelier interior.",
      cta: { label: "See All Treasures", href: "/treasures" },
      cta2: { label: "Inside the Atelier", href: "/our-story" },
    },
    {
      id: "carre-dor",
      eyebrow: "Limited Edition",
      title: "Carré d'Or",
      titleAccent: "24-carat gold leaf meets the authentic grain of cork.",
      description:
        "Gold leaf against authentic cork — geometry in quiet conversation.",
      image: "/Slidel/enhance/enhance-carre-dor-01.webp",
      imageAlt: "Carré d'Or — 24k gold leaf against the authentic grain of Portuguese cork.",
      cta: { label: "Discover Carré d'Or", href: "/treasures/carre-dor" },
      cta2: { label: "All Limited", href: "/treasures?category=fine-arts" },
    },
    {
      id: "eclipse",
      eyebrow: "New Collection",
      title: "Eclipse",
      titleAccent: "Sculptural cork that holds the warmth of the forest.",
      description: "Sculptural cork forms that hold the warmth of the forest.",
      image: "/Slidel/enhance/enhance-lighting-03.webp",
      imageAlt: "Eclipse — cork lighting in a softly-lit Portuguese atelier.",
      cta: { label: "View Eclipse", href: "/treasures?q=eclipse" },
      cta2: { label: "All Sculpture", href: "/treasures?category=sculpture" },
    },
    {
      id: "gibraltar",
      eyebrow: "Signature",
      title: "Gibraltar",
      titleAccent: "A defining silhouette — designed to last decades.",
      description: "A defining silhouette — elegant lines designed to last decades.",
      image: "/Slidel/enhance/enhance-tables-04.webp",
      imageAlt: "Gibraltar — Sildel cork table in a sun-lit Portuguese atelier with an arched alcove.",
      cta: { label: "Explore Gibraltar", href: "/treasures/gibraltar" },
      cta2: { label: "All Tables", href: "/treasures?category=tables" },
    },
    {
      id: "hot-spring",
      eyebrow: "Sculpture",
      title: "Hot Spring",
      titleAccent: "An earth-fired cork form on a quiet plinth.",
      description: "An earth-fired cork form on a quiet plinth — sculpture, made to anchor a room.",
      image: "/Slidel/enhance/enhance-misc-10.webp",
      imageAlt: "Hot Spring — a perforated cork sculpture on a stone podium with olive sprig.",
      cta: { label: "Explore Hot Spring", href: "/treasures/hot-spring" },
      cta2: { label: "All Sculpture", href: "/treasures?category=sculpture" },
    },
    {
      id: "side-by-side",
      eyebrow: "Fine Arts",
      title: "Side by Side",
      titleAccent: "Frosted glass meets the authentic grain of cork.",
      description: "Frosted glass meets the authentic grain of cork — a quiet wall piece, framed.",
      image: "/Slidel/enhance/enhance-fine-arts-02.webp",
      imageAlt: "Side by Side — frosted glass over a cork brick on a linen tablecloth.",
      cta: { label: "Discover Side by Side", href: "/treasures/side-by-side" },
      cta2: { label: "All Fine Arts", href: "/treasures?category=fine-arts" },
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
      "No factory line. No anonymous suppliers. No reissued editions. Just a slow practice, premium cork, and thirty years of atelier work the Iberian peninsula has come to know.",
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

  /* Materials / Colors — Isabel's June 2026 direction. Four cork
     tonalities, with Silver as the signature USP: 2-3 years of Atlantic
     weather earn the bark a luminous metal patina no machine can fake.
     This is the strongest material-story differentiator in the catalogue
     and now sits as a primary brand statement on the home page. */
  materialsColors: {
    eyebrow: "The Colors of Cork",
    title: "Four colors,",
    titleAccent: "endless variations.",
    body:
      "Authentic cork breathes. With time, weather, and light, it deepens, warms, or pales — never twice the same. Every Sildel treasure draws from one of four tonal families. One is earned by the sky.",
    signatureLabel: "Signature",
    silverNote: {
      eyebrow: "Sildel signature",
      title: "Earned, not made.",
      body: "Silver is the bark's longest study — two to three years of Atlantic wind and rain transform the surface until it sheds all softness and gains a quiet metal. The most luxurious cork tonality in our catalogue.",
      caption: "2–3 years weathered",
    },
    colors: [
      {
        slug: "dark-brown",
        name: "Dark Brown",
        tagline: "The bark's first life",
        body:
          "Freshly harvested cork, rich with the forest's natural pigment — deep walnut at the heart, almost black at the edges.",
        bg: "#2a1a0e",
        textLight: true,
      },
      {
        slug: "beige",
        name: "Beige",
        tagline: "The classic",
        body:
          "The cork's most familiar voice. Soft, oat-toned, versatile — at home against marble, brass, or oak.",
        bg: "#d4c2a0",
        textLight: false,
      },
      {
        slug: "golden",
        name: "Golden",
        tagline: "Kissed by sun and time",
        body:
          "What cork becomes after summers in the open air — a warm, honeyed gold that catches every angle of light.",
        bg: "#b8884c",
        textLight: true,
      },
      {
        slug: "silver",
        name: "Silver",
        tagline: "Earned by the sky",
        body:
          "Two to three years of Atlantic weather transform the bark into a luminous silver patina — a rare surface no machine can fake.",
        bg: "#a3a59f",
        textLight: false,
        signature: true,
      },
    ],
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
    title: "Honest work,",
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
    eyebrow: "Inside the Atelier",
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
      "Each Sildel piece is signed, numbered, and made to outlast trends. Made slowly, designed in Portugal, made to be passed down.",
    signature: "— Sildel Atelier",
    cta: { label: "Explore Treasures", href: "/treasures" },
  },

  newsletter: {
    eyebrow: "The Atelier Letter",
    title: "Stay close",
    titleAccent: "to the atelier.",
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
    eyebrow: "Made in Portugal",
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
      "Six ways in — by category, by signature edition, or commissioned for your space. Every piece finished by hand in northern Portugal.",
    piecesSuffix: "pieces",
    categories: {
      sculpture: { label: "Sculpture", tagline: "Forms shaped by hand" },
      tables: { label: "Tables", tagline: "Anchors for a room" },
      lighting: { label: "Lighting", tagline: "Warmth, made to hang" },
      fineArts: { label: "Fine Arts", tagline: "Wall pieces, framed" },
      limited: { label: "Limited Editions", tagline: "Signed, numbered, never reissued" },
      bespoke: { label: "Bespoke", tagline: "Commissioned for your space" },
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
      { value: 12, suffix: "", label: "Sculptors at the bench" },
      { value: 9, suffix: "", label: "Years between harvests" },
      { value: 200, suffix: "+", label: "Year oak lifespan" },
    ],
    pillars: [
      {
        index: "01",
        title: "The material's tempo.",
        body: "Each treasure passes through the same hands. No machines, no shortcuts — only time, attention, and the sculptor's eye.",
      },
      {
        index: "02",
        title: "Made in Portugal.",
        body: "Cork harvested from Alentejo oak forests, finished in our atelier in northern Portugal — an atelier practice honed for centuries.",
      },
      {
        index: "03",
        title: "Signed & numbered.",
        body: "Every piece carries the sculptor's signature and its place in the edition. None are reissued, and no two are ever identical.",
      },
    ],
  },
};