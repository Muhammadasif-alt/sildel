import type { HeroSlide } from "./home";

export const homeEn = {
  /* Hero slider — cinematic brand-journey reel (founder direction,
     June 2026, eighteenth pass: client found studio /enhance/ renders
     too product-looking; swapped to the editorial Nano Banana 2
     atmospheric series so each slide sets MOOD, not catalogue).
     Sequence reads as one short film: enter the atelier → meet the
     masterpiece → know the ancient tree → see the harvest → witness
     the hands → step outside through the painted doorway. */
  heroSlider: [
    {
      id: "fine-arts",
      eyebrow: "Fine Arts",
      title: "We Think Cork",
      titleAccent: "Sculptural treasures shaped by hand, signed and numbered.",
      description:
        "Sculptural treasures shaped from sustainably harvested Portuguese cork.",
      image: "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
      imageAlt: "A Portuguese cork atelier interior at golden hour, sunlight spilling across the workbench.",
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
      image: "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_3.webp",
      imageAlt: "Sculptural cork art object under soft warm light against a deep matte-black ground.",
      cta: { label: "Discover Carré d'Or", href: "/treasures/carre-dor" },
      cta2: { label: "All Limited", href: "/treasures?category=fine-arts" },
    },
    {
      id: "eclipse",
      eyebrow: "New Collection",
      title: "Eclipse",
      titleAccent: "Sculptural cork that holds the warmth of the forest.",
      description: "Sculptural cork forms that hold the warmth of the forest.",
      image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_1.webp",
      imageAlt: "An ancient Portuguese cork oak tree, its trunk recently harvested in the Alentejo light.",
      cta: { label: "View Eclipse", href: "/treasures?q=eclipse" },
      cta2: { label: "All Sculpture", href: "/treasures?category=sculpture" },
    },
    {
      id: "gibraltar",
      eyebrow: "Signature",
      title: "Gibraltar",
      titleAccent: "A defining silhouette — designed to last decades.",
      description: "A defining silhouette — elegant lines designed to last decades.",
      image: "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_1.webp",
      imageAlt: "Tall stacks of freshly harvested cork sheets curing under oak trees at golden hour.",
      cta: { label: "Explore Gibraltar", href: "/treasures/gibraltar" },
      cta2: { label: "All Tables", href: "/treasures?category=tables" },
    },
    {
      id: "hot-spring",
      eyebrow: "Sculpture",
      title: "Hot Spring",
      titleAccent: "An earth-fired cork form on a quiet plinth.",
      description: "An earth-fired cork form on a quiet plinth — sculpture, made to anchor a room.",
      image: "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_1.webp",
      imageAlt: "Close-up of a master harvester's weathered hands gripping a curved cork axe.",
      cta: { label: "Explore Hot Spring", href: "/treasures/hot-spring" },
      cta2: { label: "All Sculpture", href: "/treasures?category=sculpture" },
    },
    {
      id: "side-by-side",
      eyebrow: "Fine Arts",
      title: "Side by Side",
      titleAccent: "Frosted glass meets the authentic grain of cork.",
      description: "Frosted glass meets the authentic grain of cork — a quiet wall piece, framed.",
      image: "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp",
      imageAlt: "A weathered Portuguese atelier doorway at golden hour with a hand-painted Sildel sign.",
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

  /* Atelier intro — Quinta Nova-style editorial introduction (founder
     direction, June 2026, fourteenth pass: "make it final like
     quintanova.com"). Sits directly under the hero as the first
     editorial moment of the home page. Large landscape image left,
     short serif title + body + arrow link right. No card chrome,
     no eyebrow — the same restrained luxury-estate language Quinta
     Nova uses on its own homepage. */
  atelierIntro: {
    title: "An atelier shaped by hand.",
    body:
      "At our atelier in Esmoriz, in northern Portugal, we believe nature is the origin of every treasure. Each piece is shaped to measure, respecting the natural grain and singular form of every cork block — to produce sculptural treasures with a well-defined character and a perfect balance between form, light, and material.",
    cta: {
      label: "Discover the Sildel atelier",
      href: "/our-story",
    },
    image:
      "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
    imageAlt:
      "Wide cinematic view of the Sildel atelier interior in northern Portugal at golden hour, with finished cork pieces on workbenches.",
  },

  /* Brand Story — prodigy framing (founder direction, June 2026).
     Isabel didn't "come" to cork — she grew up close to it. Thirty years
     working a single material, only with her hands. Differentiates from
     "30 years of experience" (sounds tired) by leading with intimacy
     and a refusal of the industrial/composite cork that dominates the
     market. Pull-quote borrowed verbatim from Luxuri Magazine listing. */
  brandStoryProdigy: {
    eyebrow: "The Prodigy",
    title: "Thirty years inside",
    titleAccent: "one material.",
    leadParagraph:
      "Isabel Silva did not come to cork. She grew up close to it. More than thirty years later, she is still working only this material — and only with her hands.",
    body: [
      "Most of what looks like cork in the world is engineered — composite, pressed, dyed. Isabel works with authentic bark: the irregular, hand-stripped, signed-by-the-tree material that the engineered version was made to replace. She refuses the replacement.",
      "Each Sildel piece is shaped, sanded and signed inside the Esmoriz atelier in northern Portugal. Nothing is reissued. The next piece will start from a different bark, with a different grain, and become its own form — never a copy of the last one.",
    ],
    quote:
      "At a certain point, the closeness is so extraordinary that we no longer know if cork is part of us — or if we are the ones who belong to it. The answer is simple. Cork is a matter of love.",
    quoteAttribution: "Isabel Silva, founder",
    image: "/Slidel/ISABEL-01-2048x2048.webp",
    imageAlt:
      "Portrait of Isabel Silva, founder of Sildel, inside the Esmoriz atelier.",
  },

  /* Alentejo Origins — wine-and-cork origin story (founder direction,
     June 2026). Same soil, same sky, same patience. The Alentejo
     montado is the working cork forest where every piece begins, and
     it's the same landscape that feeds Portugal's most respected wine
     cellars. Editorial pause, no CTA — origin sections work better as
     a contemplative moment than a sales beat. */
  alentejoOrigins: {
    eyebrow: "Origins",
    title: "The same earth makes",
    titleAccent: "cork and wine.",
    body: [
      "Alentejo is Portugal's south — long light, slow hills, and a quiet earth that has carried cork oaks and grape vines side by side for centuries.",
      "Every Sildel piece begins in the montado, the working cork forest of this region. It is the same landscape that fills the cellars of Portugal's most respected wine houses.",
      "Cork and wine come from the same ground. They keep the same company. They share the same time.",
    ],
    cadence: ["Same hills", "Same sun", "Same patience"],
    // TODO(founder): once the real harvest photos land in
    // /public/Slidel/harvest/ (see that folder's README), swap these
    // two paths to "/Slidel/harvest/harvest-golden.jpg" and
    // "/Slidel/harvest/harvest-bark-cylinder.jpg". Until then we point
    // at the working Nano Banana 2 placeholders so the section doesn't
    // render with broken-image icons.
    image:
      "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_3.webp",
    imageAlt:
      "Wide editorial shot of an ancient Portuguese cork oak tree, bark recently harvested, in the Alentejo montado.",
    inset:
      "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_2.webp",
    insetAlt:
      "Tall stacks of freshly harvested cork sheets curing under cork oak trees at golden hour.",
  },

  /* Why Authentic Cork — education band (founder direction, June 2026).
     Three facts about rarity, framed as big numerals + short body. No
     images, no CTA — keeps the section fast and lets the facts breathe.
     Sits just before Materials/Colors so "what makes this material rare"
     answers before "what its colors are". */
  whyAuthenticCork: {
    eyebrow: "Why Authentic Cork",
    title: "The rarest material",
    titleAccent: "no one talks about.",
    lead:
      "Cork is harvested from one species of tree, in one corner of the world, by hand, once every nine years. The world hasn't noticed.",
    facts: [
      {
        number: "200+",
        label: "Years per tree",
        body:
          "A Portuguese cork oak lives more than two centuries and is harvested sixteen to seventeen times in its lifetime. Each piece you hold is bark the tree has grown back at least once.",
      },
      {
        number: "9",
        label: "Years between harvests",
        body:
          "The bark is stripped by hand, then left to regrow for nine full years before the next harvest. No shortcut, no mechanisation — just the tree's own rhythm, kept for centuries.",
      },
      {
        number: "0",
        label: "Trees felled",
        body:
          "Not a single tree is cut to make a Sildel piece. Cork is the bark; the tree keeps living, growing, and feeding the same forest the next harvest will come from.",
      },
    ],
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