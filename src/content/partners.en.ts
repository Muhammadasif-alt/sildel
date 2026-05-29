import type { PartnersContent } from "./partners";

export const partnersEn: PartnersContent = {
  section: {
    eyebrow: "Collaborations",
    title: "In good",
    titleAccent: "company.",
    body: "Cork is at its best in dialogue. These are the houses and projects Sildel builds alongside — each a meeting of materials, made in Portugal.",
  },
  partners: [
    {
      slug: "porcel",
      name: "Porcel",
      kicker: "Porcelain × Cork",
      intro: "A union of Portuguese porcelain and genuine cork.",
      note: "Presented at the Ambiente fair, Germany",
      layout: "split" as const,
      transparent: false,
      paragraphs: [
        "There are encounters that seem destined to happen. Genuine cork, born from Portuguese land, grows in silence over decades — patient, generous, resilient. Porcelain, precise and luminous, is the expression of timelessness.",
        "Together, porcelain and genuine cork create balance: nature and technique, warmth and precision. Each piece is conceived and produced in Portugal, the result of the union between Sildel and Porcel — S.A.",
        "These are not pieces for a season, but for a lifetime — to be used, cared for, and one day passed from hand to hand. Because true luxury is beyond what is displayed. It is what endures.",
      ],
      images: [
        { src: "/partners-web/porcel/porcel-1.webp" },
        { src: "/partners-web/porcel/porcel-3.webp" },
        { src: "/partners-web/porcel/porcel-4.webp" },
        { src: "/partners-web/porcel/porcel-7.webp" },
      ],
      imagesAlt: [
        { src: "/partners-web/porcel/porcel-2.webp" },
        { src: "/partners-web/porcel/porcel-5.webp" },
        { src: "/partners-web/porcel/porcel-6.webp" },
      ],
    },
    {
      slug: "lightenjin",
      name: "Lightenjin",
      kicker: "CORKLUX — cork luminaires",
      intro: "Acoustic lighting wrapped in genuine cork.",
      note: "With Lightenjin · made in Portugal",
      layout: "products" as const,
      transparent: true,
      paragraphs: [
        "CORKLUX is a range of acoustic luminaires developed with Lightenjin, a Portuguese lighting manufacturer. Each fixture is wrapped in genuine cork — softening light and sound at once, for greater comfort and well-being in a space.",
        "The range spans the PREMIUM linear suspension, the modular TANGRAM wall panels and PRIS — finished in three cork textures: regular, irregular and irregular-flat. High-CRI LEDs (Ra>80) with a life beyond 50,000 hours, tunable white and DALI control.",
        "Designed for commercial spaces, exhibition areas and museums, offices and homes — light, acoustics and authentic cork in a single, considered object.",
      ],
      images: [
        { src: "/partners-web/lightenjin/corklux-i.webp", caption: "CORKLUX I" },
        { src: "/partners-web/lightenjin/corklux-ii.webp", caption: "CORKLUX II" },
        { src: "/partners-web/lightenjin/corklux-iii.webp", caption: "CORKLUX III" },
        { src: "/partners-web/lightenjin/corklux-tangram.webp", caption: "CORKLUX Tangram" },
      ],
      imagesAlt: [
        { src: "/partners-web/lightenjin/corklux-i-b.webp", caption: "CORKLUX I" },
        { src: "/partners-web/lightenjin/corklux-ii-b.webp", caption: "CORKLUX II" },
        { src: "/partners-web/lightenjin/corklux-iii-b.webp", caption: "CORKLUX III" },
        { src: "/partners-web/lightenjin/corklux-tangram-b.webp", caption: "CORKLUX Tangram" },
      ],
    },
    {
      slug: "festival-mental",
      name: "Festival Mental",
      kicker: "The official cork trophy",
      intro: "Sildel crafts the festival's hand-sculpted cork trophy.",
      note: "9th edition (2025) · 10th edition (2026)",
      layout: "split" as const,
      transparent: false,
      paragraphs: [
        "Festival Mental is a Portuguese festival of mental health — cinema, arts and conversation. For its ninth and tenth editions, Sildel was invited to create the festival's official trophy.",
        "Sculpted entirely from genuine cork, each trophy is a small monument: warm, tactile and unrepeatable — a fitting symbol for a festival about care, placed in the hands of the voices that carry it forward.",
      ],
      images: [
        { src: "/partners-web/festival-mental/fm-4.webp" },
        { src: "/partners-web/festival-mental/fm-1.webp" },
        { src: "/partners-web/festival-mental/fm-2.webp" },
        { src: "/partners-web/festival-mental/fm-3.webp" },
      ],
      imagesAlt: [
        { src: "/partners-web/festival-mental/fm-5.webp" },
        { src: "/partners-web/festival-mental/fm-6.webp" },
        { src: "/partners-web/festival-mental/fm-7.webp" },
        { src: "/partners-web/festival-mental/fm-8.webp" },
      ],
    },
  ],
};