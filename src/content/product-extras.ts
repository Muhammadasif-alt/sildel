/**
 * Per-product benefits + FAQs.
 *
 * For each product we generate:
 *  - 4 short benefits (highlighting what makes the piece special)
 *  - 5 FAQs (a mix of universal — care, shipping — and product-specific copy)
 *
 * The shape lives in this file (and not in treasures.ts) to keep the product
 * catalog readable. Per-product PT overlays let us translate without duplicating
 * the universal copy thirty times.
 */
import type { Locale } from "@/lib/i18n/config";
import { findProduct, type Product } from "./treasures";

export type ProductFaq = { q: string; a: string };
export type ProductUseCase = { title: string; body: string };
export type ProductStory = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  highlights: string[];
  ctaLabel: string;
};
export type ProductExtras = {
  benefits: string[];
  useCases: ProductUseCase[];
  faqs: ProductFaq[];
  story: ProductStory;
};

/**
 * Three plain-language use cases per product, so a client can see at a glance
 * how the piece actually fits into a home. The first card is always the
 * concrete placement (reusing the PLACEMENT map above); the second is tuned to
 * the product's category; the third is the universal "keep it / pass it on"
 * collector angle. We build these instead of hand-writing 30 trios so they stay
 * consistent and update automatically as products are added.
 */
function buildUseCasesEn(
  name: string,
  category: string | undefined,
  placement: string,
): ProductUseCase[] {
  const where: ProductUseCase = {
    title: "Where it lives best",
    body: `Place ${name} ${placement} — it sits as both a functional object and a quiet sculptural anchor.`,
  };
  const keep: ProductUseCase = {
    title: "A piece to keep",
    body: `Signed and numbered within its edition, ${name} is made to be lived with for years and passed on.`,
  };
  switch (category) {
    case "Tables":
      return [
        where,
        { title: "Ready when you host", body: "A natural gathering point for drinks, books, and small objects the moment guests arrive." },
        keep,
      ];
    case "Lighting":
      return [
        where,
        { title: "Warm evening light", body: "Lit, the cork shade softens hard light into a golden glow — calm light for unwinding or for hosting." },
        keep,
      ];
    case "Fine Arts":
      return [
        where,
        { title: "A focal point for the room", body: "Gives a wall or surface a single, considered point of interest — an anchor a whole space can be built around." },
        keep,
      ];
    default:
      return [
        where,
        { title: "A conversation piece", body: "Its hand-worked grain invites a second look — a natural talking point the moment someone walks in." },
        keep,
      ];
  }
}

function buildUseCasesPt(
  name: string,
  category: string | undefined,
  placement: string,
): ProductUseCase[] {
  const where: ProductUseCase = {
    title: "Onde fica melhor",
    body: `Coloque a ${name} ${placement} — vive como objecto funcional e âncora escultural silenciosa.`,
  };
  const keep: ProductUseCase = {
    title: "Uma peça para guardar",
    body: `Assinada e numerada dentro da sua edição, a ${name} é feita para durar anos e ser passada de mão em mão.`,
  };
  switch (category) {
    case "Tables":
      return [
        where,
        { title: "Pronta para receber", body: "Um ponto de encontro natural para bebidas, livros e pequenos objectos assim que chegam convidados." },
        keep,
      ];
    case "Lighting":
      return [
        where,
        { title: "Luz quente ao fim do dia", body: "Acesa, o abajur de cortiça transforma a luz dura num brilho dourado e suave — luz calma para descansar ou para receber." },
        keep,
      ];
    case "Fine Arts":
      return [
        where,
        { title: "Um ponto focal para a sala", body: "Dá a uma parede ou superfície um único ponto de interesse — uma âncora à volta da qual o espaço se organiza." },
        keep,
      ];
    default:
      return [
        where,
        { title: "Uma peça de conversa", body: "O grão trabalhado à mão convida a um segundo olhar — um tema de conversa natural assim que alguém entra." },
        keep,
      ];
  }
}

/** Where each product reads most beautifully — used in benefits + FAQ answers. */
const PLACEMENT_EN: Record<string, string> = {
  shell: "as a side-table object, on a console, or beside a reading chair",
  abyss: "in a corner of a quiet room or atop a low plinth",
  alexis: "as a low table beside a sofa or at the foot of a daybed",
  granada: "as a centrepiece for a dining room, studio, or atelier table",
  "hot-spring": "on a console, a mantle, or at the edge of a desk",
  bond: "in a living room as a low coffee or sofa table",
  fireflies: "as a horizontal wall piece in a hallway, dining room, or lounge",
  eclipse: "on a bedside table, console, or shelf where it can be rotated for light",
  island: "on a sideboard, a console, or as a mantelpiece object",
  gibraltar: "as a coffee table in a living or reading room",
  crescent: "above a long dining table, a kitchen island, or a hallway",
  "carre-dor": "on a wall — alone — at the height of the eye",
  "eclipse-copper": "on a bedside table or shelf — the upper section rotates for direct or dispersed light",
  "side-by-side": "as a hallway wall composition, or split between two adjoining rooms",
  "shale-coast": "on a console or a shelf — horizontally for a wash, vertically for a beam",
  belize: "on a sideboard or open shelf as both a storage object and a sculpture",
  equilibrium: "on a low credenza or as a tabletop composition you rearrange over time",
  shale: "on a desk, a bedside, or a shelf — vertical or horizontal",
  "leaf-golden": "on a console, a hallway pedestal, or a writing desk",
  "leaf-brown": "on a console, a hallway pedestal, or a writing desk",
  halley: "as a circular wall mirror in an entry, dressing room, or bedroom",
  oscar: "as a sculptural anchor on a low plinth or as a tabletop object",
  marlin: "on a long sideboard or low console where the sphere can catch light",
  olympia: "as a bedside, sofa-side, or armchair-side table",
  horizon: "on a low credenza, a sideboard, or a museum-style plinth",
  "shale-belly-red": "on a desk or shelf — vertical or horizontal — for a pulse of warm light",
  "shale-belly-silver": "on a desk or shelf — vertical or horizontal — for cool, indirect light",
  vitaqua: "on a dining table, a kitchen island, or an entry console",
  bonfire: "on a dining table or a low coffee table to hold candles (not included)",
  vitavele: "across a long dining table or low console with a row of small candles",
  pearl: "on a console, sideboard, or low shelf as a sculptural fruit bowl or vessel for small objects",
};

const PLACEMENT_PT: Record<string, string> = {
  shell: "como objecto de mesa de apoio, num console ou ao lado de uma poltrona de leitura",
  abyss: "num canto de uma sala silenciosa ou sobre um plinto baixo",
  alexis: "como mesa baixa ao lado de um sofá ou aos pés de uma chaise-longue",
  granada: "como peça central numa sala de jantar, estúdio ou mesa de atelier",
  "hot-spring": "num console, numa cornija ou no canto de uma secretária",
  bond: "numa sala de estar como mesa de centro ou de sofá baixa",
  fireflies: "como peça horizontal de parede num corredor, sala de jantar ou lounge",
  eclipse: "numa mesa de cabeceira, console ou prateleira onde possa rodar para a luz",
  island: "sobre um aparador, um console ou como peça de cornija",
  gibraltar: "como mesa de centro numa sala de estar ou de leitura",
  crescent: "sobre uma longa mesa de jantar, uma ilha de cozinha ou num corredor",
  "carre-dor": "numa parede — sozinha — à altura do olhar",
  "eclipse-copper": "numa mesa de cabeceira ou prateleira — a parte superior roda para luz directa ou dispersa",
  "side-by-side": "como composição de parede num corredor, ou repartida entre duas salas adjacentes",
  "shale-coast": "num console ou numa prateleira — horizontal para um banho de luz, vertical para um feixe",
  belize: "sobre um aparador ou prateleira aberta como objecto de arrumação e escultura",
  equilibrium: "sobre uma credência baixa ou como composição de tampo de mesa que vai sendo reorganizada",
  shale: "sobre uma secretária, uma cabeceira ou uma prateleira — vertical ou horizontal",
  "leaf-golden": "num console, num pedestal de corredor ou numa secretária",
  "leaf-brown": "num console, num pedestal de corredor ou numa secretária",
  halley: "como espelho circular de parede numa entrada, vestiário ou quarto",
  oscar: "como âncora escultural sobre um plinto baixo ou como objecto de mesa",
  marlin: "sobre um aparador longo ou consola baixa onde a esfera capte a luz",
  olympia: "como mesa de cabeceira, de sofá ou de poltrona",
  horizon: "sobre uma credência baixa, um aparador ou um plinto estilo museu",
  "shale-belly-red": "sobre secretária ou prateleira — vertical ou horizontal — para uma luz quente",
  "shale-belly-silver": "sobre secretária ou prateleira — vertical ou horizontal — para luz fria, indirecta",
  vitaqua: "sobre uma mesa de jantar, ilha de cozinha ou consola de entrada",
  bonfire: "sobre uma mesa de jantar ou de centro baixa para suportar velas (não incluídas)",
  vitavele: "ao longo de uma mesa de jantar ou consola baixa com uma fila de pequenas velas",
  pearl: "sobre um console, aparador ou prateleira baixa, como fruteira escultural ou recipiente para pequenos objectos",
};

/** Per-product material / unique-detail snippet for FAQs. */
function materialNote(p: Product, locale: Locale): string {
  const mat = p.material ?? (locale === "pt" ? "Cortiça autêntica" : "Authentic cork");
  if (locale === "pt") {
    return `${mat}. Cada peça é trabalhada à mão no nosso atelier no norte de Portugal — o grão, a cor e o peso variam ligeiramente de peça para peça.`;
  }
  return `${mat}. Each piece is hand-worked in our atelier in northern Portugal — the grain, color, and weight vary slightly from piece to piece.`;
}

export function getProductExtras(slug: string, locale: Locale): ProductExtras {
  const product = findProduct(slug);
  const name = product?.name ?? slug;

  if (locale === "pt") return buildPt(slug, name, product);
  return buildEn(slug, name, product);
}

function buildEn(slug: string, name: string, product: Product | undefined): ProductExtras {
  const placement = PLACEMENT_EN[slug] ?? "in a quiet, considered space";

  const benefits = [
    "Signed and numbered by the sculptor",
    "Hand-finished in Portugal — no two pieces alike",
    `Ideal ${placement}`,
    "Sustainable Portuguese cork, carefully sourced",
  ];

  const faqs: ProductFaq[] = [
    {
      q: `Where can I place ${name}?`,
      a: `${name} reads best ${placement}. We design every Sildel piece to live as both a functional object and a sculptural anchor — it should feel like the room was waiting for it.`,
    },
    {
      q: "What is it made of?",
      a: product
        ? materialNote(product, "en")
        : "Authentic Portuguese cork, hand-worked in our atelier in northern Portugal.",
    },
    {
      q: "Is each piece truly unique?",
      a: `Yes. ${name} is signed and numbered within its edition. Because cork is a living material, small variations in grain, tone, and texture are part of every Sildel piece.`,
    },
    {
      q: "How do I care for it?",
      a: "Dust with a soft, dry cloth. Avoid direct sunlight for long periods, abrasive cleaners, and standing water. Cork is naturally dust-repellent, antimicrobial, and forgiving — a simple wipe is usually all that's needed.",
    },
    {
      q: "Shipping & lead time",
      a: "Each treasure ships free worldwide. Europe arrives in 4–7 business days; the rest of the world in 7–12. Every piece is hand-packed in our Portuguese atelier before it leaves.",
    },
  ];

  const material = product?.material ?? "authentic Portuguese cork";
  const story: ProductStory = {
    eyebrow: "About this piece",
    title: `More about ${name}`,
    paragraphs: [
      `${name} begins as a piece of raw bark — harvested by hand from a cork oak in Portugal's Alentejo region and carried back to our atelier in northern Portugal. ${product?.description ?? ""}`.trim(),
      product?.longDescription?.length
        ? product.longDescription.join(" ")
        : `Every step is slow. The bark cures for months before it is even handled, then a single sculptor shapes, sands, and finishes the piece — pressing the brass stamp that gives it a number, a date, and a signature. ${name} is the result of that patience.`,
      `${name} is built to live ${placement}. It pairs well with marble, brass, glass, and natural wood — and because cork is a living material, the grain you see is the only grain you will ever see. Like every Sildel treasure, this piece is signed, numbered, and shipped from our Portuguese atelier with free worldwide delivery.`,
    ],
    highlights: [
      `Material — ${material}`,
      "Hand-finished in our atelier in northern Portugal",
      "Signed and numbered within its edition",
      "Free worldwide shipping from Portugal",
    ],
    ctaLabel: "Talk to us about this piece",
  };

  const useCases = buildUseCasesEn(name, product?.category, placement);

  return { benefits, useCases, faqs, story };
}

function buildPt(slug: string, name: string, product: Product | undefined): ProductExtras {
  const placement = PLACEMENT_PT[slug] ?? "num espaço silencioso e pensado";

  const benefits = [
    "Assinada e numerada pelo autor",
    "Acabada à mão em Portugal — nenhuma peça é igual",
    `Ideal ${placement}`,
    "Cortiça portuguesa sustentável, cuidadosamente colhida",
  ];

  const faqs: ProductFaq[] = [
    {
      q: `Onde posso colocar a ${name}?`,
      a: `${name} fica melhor ${placement}. Desenhamos cada peça Sildel para viver como objecto funcional e âncora escultural — deve parecer que a sala estava à sua espera.`,
    },
    {
      q: "De que é feita?",
      a: product
        ? materialNote(product, "pt")
        : "Cortiça portuguesa autêntica, trabalhada à mão no nosso atelier no norte de Portugal.",
    },
    {
      q: "Cada peça é mesmo única?",
      a: `Sim. ${name} é assinada e numerada dentro da sua edição. Por a cortiça ser um material vivo, pequenas variações no grão, no tom e na textura fazem parte de cada peça Sildel.`,
    },
    {
      q: "Como cuido da peça?",
      a: "Limpe com um pano seco e macio. Evite exposição prolongada ao sol, produtos abrasivos e água parada. A cortiça é naturalmente anti-pó, antimicrobiana e tolerante — geralmente basta passar um pano.",
    },
    {
      q: "Envio e prazos",
      a: "Cada tesouro é enviado gratuitamente para todo o mundo. Europa em 4–7 dias úteis; resto do mundo em 7–12. Cada peça é embalada à mão no nosso atelier em Portugal antes de partir.",
    },
  ];

  const material = product?.material ?? "cortiça portuguesa autêntica";
  const story: ProductStory = {
    eyebrow: "Sobre esta peça",
    title: `Mais sobre ${name}`,
    paragraphs: [
      `${name} começa como um pedaço de casca em bruto — colhida à mão de um sobreiro na região do Alentejo, em Portugal, e trazida para o nosso atelier no norte de Portugal. ${product?.description ?? ""}`.trim(),
      product?.longDescription?.length
        ? product.longDescription.join(" ")
        : `Cada passo é lento. A casca cura durante meses antes de sequer ser manuseada, depois um único escultor molda, lixa e termina a peça — carimbando o número, a data e a assinatura. ${name} é o resultado dessa paciência.`,
      `${name} é feita para viver ${placement}. Combina bem com mármore, latão, vidro e madeira natural — e porque a cortiça é um material vivo, o grão que vê é o único grão que alguma vez verá. Como todos os tesouros Sildel, esta peça é assinada, numerada e enviada do nosso atelier em Portugal com envio gratuito para todo o mundo.`,
    ],
    highlights: [
      `Material — ${material}`,
      "Acabada à mão no nosso atelier no norte de Portugal",
      "Assinada e numerada dentro da sua edição",
      "Envio gratuito para todo o mundo a partir de Portugal",
    ],
    ctaLabel: "Fale connosco sobre esta peça",
  };

  const useCases = buildUseCasesPt(name, product?.category, placement);

  return { benefits, useCases, faqs, story };
}