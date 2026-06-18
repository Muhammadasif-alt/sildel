/**
 * Awards & Recognition content.
 *
 * Three international distinctions awarded to Sildel — We Think Cork.
 * Sources (forwarded by Isabel Silva, founder, plus the publicly live
 * Luxuri listing):
 *  - Corporate LiveWire — Innovation & Excellence Awards 2026
 *    ("Unique Design Brand of the Year"), confirmed 5 May 2026.
 *  - LUXlife (AI Publishing) — Home & Garden Awards 2026
 *    ("Sustainable Cork Design & Craftsmanship Company of the Year —
 *    Portugal"), confirmed 7 April 2026.
 *  - Luxuri Magazine — Awards 2025
 *    ("Iberian Cork Artistry Brand of the Year — Porto 2025"),
 *    public listing at luxurimag.com/award-winner-2025/sildel-we-think-cork/,
 *    confirmed 12 February 2026.
 *
 * Isabel took the complimentary / free package for all three — no purchased
 * trophies — so the on-site framing stays factual: "named", "recognised",
 * "featured". The CLW and LUXlife public announcements are still pending
 * (LUXlife June 2026; CLW with the next Global Awards Winners Guide), so
 * those two cards currently reference the email-confirmed category titles
 * only. The Luxuri card links out to the publicly live listing.
 *
 * Each award also carries `detail` content used by /awards/[slug] pages —
 * SEO metadata, hero copy, an overview band, a six-card "why Sildel"
 * portfolio grid, and a public-source link when one exists.
 */

import type { Locale } from "@/lib/i18n/config";

export type AwardPortfolioCard =
  | { kind: "image"; image: string; imageAlt: string }
  | { kind: "text"; title: string; body: string };

export type AwardDetail = {
  /** SEO title (page <title> after brand suffix). */
  metaTitle: string;
  /** SEO description (<meta description>). */
  metaDescription: string;
  /** Keywords for the page (optional). */
  keywords?: string[];
  /** Full-bleed hero background image (path under /public). */
  heroImage: string;
  heroImageAlt: string;
  /** One-line subtitle below the H1 in the hero. */
  heroSubtitle: string;
  /** Public source link (e.g. luxurimag.com listing) — null if pending. */
  sourceLink?: { label: string; href: string };
  /**
   * The actual award badge / banner / certificate visual issued by the
   * publication. Omitted for awards where no event-specific visual exists
   * (e.g. the Luxuri listing only carries the Sildel brand logo, so the
   * credential section falls back to a typographic treatment).
   */
  credential?: {
    image: string;
    imageAlt: string;
    /** Short caption shown below the badge — what the visual actually is. */
    caption: string;
  };
  /** Overview band — image on one side, content on the other. */
  overview: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    /** A short pull-quote citation, if any. */
    citation?: string;
    image: string;
    imageAlt: string;
  };
  /** 2x3 portfolio grid (alternating image and text cards). */
  portfolio: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    cards: AwardPortfolioCard[];
  };
  /** Closing CTA. */
  cta: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
  };
};

export type Award = {
  slug: string;
  year: string;
  title: string;
  org: string;
  issuer: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  /** Rich content for the /awards/[slug] detail page. */
  detail: AwardDetail;
};

export type AwardsContent = {
  section: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
  };
  awards: Award[];
  viewListing: string;
  /** "View detail" label on home cards (links to /awards/[slug]). */
  viewDetail: string;
  /** Eyebrow above the credential section ("The Recognition"). */
  credentialEyebrow: string;
  /** Heading inside the credential card ("The official badge", etc.). */
  credentialTitle: string;
  /** Fallback line for awards with no badge image (e.g. Luxuri). */
  credentialPendingNote: string;
};

/* ─────────────────────────────────────────────────────── EN ─────────── */

const awardsEn: AwardsContent = {
  section: {
    eyebrow: "Recognition",
    title: "Awarded for",
    titleAccent: "our craft.",
    body:
      "International juries have recognised Sildel's work with authentic Portuguese cork — sculpture, lighting and fine art shaped by hand in Esmoriz.",
  },
  viewListing: "View listing",
  viewDetail: "Read more",
  credentialEyebrow: "The recognition",
  credentialTitle: "Official issuer credential",
  credentialPendingNote:
    "Public visual identity is still pending — listing carries the brand identifier only.",
  awards: [
    {
      slug: "iea-2026",
      year: "2026",
      title: "Unique Design Brand of the Year",
      org: "Innovation & Excellence Awards",
      issuer: "Corporate LiveWire",
      image: "/Award/image001.jpg",
      imageAlt:
        "Corporate LiveWire Innovation & Excellence Awards — 2026 Winner badge.",
      detail: {
        metaTitle:
          "Unique Design Brand of the Year 2026 — Sildel × Corporate LiveWire",
        metaDescription:
          "Sildel — We Think Cork was named Unique Design Brand of the Year at the Corporate LiveWire Innovation & Excellence Awards 2026, recognising original silhouettes shaped from authentic Portuguese cork.",
        keywords: [
          "Unique Design Brand of the Year",
          "Corporate LiveWire Innovation Excellence Awards",
          "Sildel award winner 2026",
          "Portuguese cork design",
          "cork art recognition",
        ],
        heroImage:
          "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp",
        heroImageAlt:
          "A Sildel craftsman shaping a cork sculpture in the atelier under warm tungsten light.",
        heroSubtitle:
          "Corporate LiveWire Innovation & Excellence Awards 2026",
        credential: {
          image: "/Award/image001.jpg",
          imageAlt:
            "Corporate LiveWire Innovation & Excellence Awards — 2026 Winner badge issued to Sildel.",
          caption:
            "The 2026 Winner seal issued by Corporate LiveWire's awards team.",
        },
        overview: {
          eyebrow: "About the recognition",
          title: "Named for design that doesn't repeat itself.",
          paragraphs: [
            "The Innovation & Excellence Awards are awarded annually by Corporate LiveWire after a year-long judging process that reviews each candidate's reputation, customer reviews, website, sustainability claims and creative work.",
            "The category Unique Design Brand of the Year recognises houses whose work refuses to look like anything else on the market. Sildel was named the 2026 recipient for its sculptural cork pieces — each hand-finished, signed and numbered, never reissued.",
          ],
          citation:
            "Selected by Corporate LiveWire's judging panel after reviewing reputation, reviews, the website and social media over the previous 12 months.",
          image: "/products/MARLIN__MGL3906-eaad08d828.webp",
          imageAlt:
            "Marlin — a sculptural cork composition with a marble base, signed and numbered.",
        },
        portfolio: {
          eyebrow: "Why this recognition",
          title: "Three reasons our",
          titleAccent: "silhouettes stand out.",
          cards: [
            {
              kind: "image",
              image: "/products/HORIZON_Fundo_BRANCO_16_01_02_FB-95d445ec87.webp",
              imageAlt: "Horizon — cork concave sculpture on a marble cube.",
            },
            {
              kind: "text",
              title: "One-of-one silhouettes",
              body: "Every Sildel piece begins as raw cork bark whose grain dictates the final form. No two pieces share a profile, and no design is ever reissued.",
            },
            {
              kind: "text",
              title: "Hand-finished in Esmoriz",
              body: "Each treasure is shaped, sanded and signed by hand inside our northern Portuguese atelier — the same room where the brand was founded.",
            },
            {
              kind: "image",
              image:
                "/products/EQUILIBRIUM_Fundo_BRANCO_06_01_01_FB-c52dccae19.webp",
              imageAlt:
                "Equilibrium — authentic cork, Carrara marble and golden steel spheres.",
            },
            {
              kind: "image",
              image: "/products/SHELL_Fundo_BRANCO__MGL1450-f3057aabb8.webp",
              imageAlt:
                "Shell — cork's concave form meets the purity of white marble.",
            },
            {
              kind: "text",
              title: "Signed & numbered",
              body: "Every treasure carries the artisan's signature and a number within its edition — a contract that what you receive is the only one of its kind.",
            },
          ],
        },
        cta: {
          eyebrow: "Continue",
          title: "Explore the",
          titleAccent: "treasures.",
          body: "See the sculptural cork pieces that earned this recognition — each signed, numbered and shaped by hand in Portugal.",
        },
      },
    },
    {
      slug: "luxlife-2026",
      year: "2026",
      title:
        "Sustainable Cork Design & Craftsmanship Company of the Year — Portugal",
      org: "Home & Garden Awards",
      issuer: "LUXlife",
      image: "/Award/unnamed.jpg",
      imageAlt: "LUXlife Home & Garden Awards 2026 — congratulations banner.",
      detail: {
        metaTitle:
          "Sustainable Cork Design Company of the Year 2026 — Sildel × LUXlife",
        metaDescription:
          "LUXlife's Home & Garden Awards 2026 named Sildel — We Think Cork as Portugal's Sustainable Cork Design & Craftsmanship Company of the Year — recognising a craft that gives the tree life rather than felling it.",
        keywords: [
          "Sustainable Cork Design Company of the Year",
          "LUXlife Home Garden Awards 2026",
          "Sildel Portugal sustainability award",
          "sustainable cork harvest",
          "Portuguese craftsmanship",
        ],
        heroImage: "/Slidel/harvest/harvest-axe.jpg",
        heroImageAlt:
          "Sildel harvesters at work on an old Alentejo cork oak — one stripping the trunk by hand with an axe, another working higher up. The freshly exposed wood is the bright orange beneath the dark cork bark.",
        heroSubtitle:
          "LUXlife Home & Garden Awards 2026 — Portugal",
        credential: {
          image: "/Award/unnamed.jpg",
          imageAlt:
            "LUXlife Home & Garden Awards 2026 — congratulations banner from the editor.",
          caption:
            "The 2026 Home & Garden Awards congratulations banner from LUXlife.",
        },
        overview: {
          eyebrow: "About the recognition",
          title: "A craft that gives the tree life, not takes it.",
          paragraphs: [
            "The LUXlife Home & Garden Awards are awarded annually by AI Global Media after a merit-led research and evaluation process. The Sustainable Cork Design & Craftsmanship category honours Portuguese houses whose practice protects the cork oak forests they depend on.",
            "Sildel was named the 2026 recipient because every treasure begins in a working forest — the cork is stripped without ever felling the tree, the bark grows back, and the same oak is harvested again nine years later. The award is the editor's acknowledgement that sustainability and luxury can share a workshop.",
          ],
          citation:
            "Following our merit-led research and evaluation process Sildel — We Think Cork has been recognised as the deserving recipient.",
          image: "/Slidel/harvest/harvest-team.jpg",
          imageAlt:
            "The Sildel harvest crew with a trailer fully loaded with cork bark in the Alentejo montado — the team behind every piece.",
        },
        portfolio: {
          eyebrow: "Why this recognition",
          title: "Three commitments behind",
          titleAccent: "every piece.",
          cards: [
            {
              kind: "text",
              title: "Zero trees felled",
              body: "Cork is harvested by stripping the bark every nine years; the tree is never cut. A single cork oak lives 200+ years and is harvested 16–17 times in its lifetime.",
            },
            {
              kind: "image",
              image:
                "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_4.webp",
              imageAlt: "Portuguese cork oak forest at golden hour.",
            },
            {
              kind: "image",
              image:
                "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_3.webp",
              imageAlt: "Master harvester's weathered hands gripping a curved axe.",
            },
            {
              kind: "text",
              title: "Made in Esmoriz, Portugal",
              body: "Every piece is finished inside our atelier in northern Portugal — no offshore workshops, no anonymous suppliers. The hands you see are the hands that made it.",
            },
            {
              kind: "text",
              title: "A craft, not a catalogue",
              body: "We don't reissue editions. Each treasure is signed, numbered and final — a quiet commitment that no piece is made twice and nothing is over-produced.",
            },
            {
              kind: "image",
              image:
                "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp",
              imageAlt: "A Sildel craftsman shaping cork in the Esmoriz atelier.",
            },
          ],
        },
        cta: {
          eyebrow: "Read more",
          title: "Where every",
          titleAccent: "piece begins.",
          body: "Walk through the cork forests of Portugal and the atelier that shapes every treasure by hand.",
        },
      },
    },
    {
      slug: "luxuri-2025",
      year: "2025",
      title: "Iberian Cork Artistry Brand of the Year",
      org: "Luxuri Awards — Porto 2025",
      issuer: "Luxuri Magazine",
      link: "https://www.luxurimag.com/award-winner-2025/sildel-we-think-cork/",
      detail: {
        metaTitle:
          "Iberian Cork Artistry Brand of the Year 2025 — Sildel × Luxuri",
        metaDescription:
          "Luxuri Awards 2025 (Porto) named Sildel — We Think Cork as the Iberian Cork Artistry Brand of the Year, recognising more than three decades spent in close contact with a single material.",
        keywords: [
          "Iberian Cork Artistry Brand of the Year",
          "Luxuri Awards Porto 2025",
          "Sildel Luxuri Magazine listing",
          "Portuguese cork artistry",
          "30 years of cork craftsmanship",
        ],
        heroImage:
          "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
        heroImageAlt:
          "Wide cinematic shot of the Sildel Portuguese atelier interior at golden hour.",
        heroSubtitle: "Luxuri Awards — Porto 2025",
        sourceLink: {
          label: "View Luxuri listing",
          href: "https://www.luxurimag.com/award-winner-2025/sildel-we-think-cork/",
        },
        overview: {
          eyebrow: "About the recognition",
          title: "Thirty years inside a single material.",
          paragraphs: [
            "The Luxuri Awards are awarded annually by Luxuri Magazine — \"Your Gateway to Everything Luxury\". The Iberian Cork Artistry category honours houses across Portugal and Spain whose practice with the material is so close it becomes their signature.",
            "Sildel was the 2025 Porto recipient. The Luxuri listing carries the brand's own statement: thirty-plus years spent solely and exclusively in contact with cork — a closeness so extraordinary that the line between maker and material starts to blur.",
          ],
          citation:
            "At a certain time this close involvement is so extraordinary that we no longer know if cork is part of us, or if we are the ones who belong to it. The answer is simple… cork is a matter of love.",
          image: "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
          imageAlt:
            "Carré d'Or — 24k gold leaf laid against the authentic grain of Portuguese cork.",
        },
        portfolio: {
          eyebrow: "Why this recognition",
          title: "Three things only",
          titleAccent: "thirty years can teach.",
          cards: [
            {
              kind: "image",
              image:
                "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
              imageAlt:
                "Abyss — raw Portuguese cork bark resting on a marble plinth, like a relic pulled from depth.",
            },
            {
              kind: "text",
              title: "Reading the bark",
              body: "After three decades, the craft starts with looking. Each piece of bark dictates its own form — what becomes a vessel, what becomes a sculpture, what becomes a lamp. Cork is led, not forced.",
            },
            {
              kind: "text",
              title: "Iberian, made in Portugal",
              body: "The Iberian peninsula produces most of the world's cork. The artistry behind it lives in the workshops of northern Portugal — and Sildel is one of them.",
            },
            {
              kind: "image",
              image: "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Horizontal-Est-6e506606c0.webp",
              imageAlt:
                "Crescent — a long horizontal chandelier of cork rings strung on a brass rail.",
            },
            {
              kind: "image",
              image:
                "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-38d774b0b2.webp",
              imageAlt:
                "Leaf Golden — cork strips cascading from a cubic marble base.",
            },
            {
              kind: "text",
              title: "Cork is a matter of love",
              body: "The phrase comes from the Luxuri listing itself, written by the founder. It is the simplest description of why every piece is signed, numbered and shaped one at a time.",
            },
          ],
        },
        cta: {
          eyebrow: "Read more",
          title: "The pieces behind",
          titleAccent: "the listing.",
          body: "See the sculptural cork treasures that earned the 2025 Luxuri recognition — each one hand-finished in Portugal.",
        },
      },
    },
  ],
};

/* ─────────────────────────────────────────────────────── PT ─────────── */

const awardsPt: AwardsContent = {
  section: {
    eyebrow: "Distinções",
    title: "Premiados pelo",
    titleAccent: "nosso ofício.",
    body:
      "Júris internacionais reconheceram o trabalho da Sildel com cortiça portuguesa autêntica — escultura, iluminação e belas artes moldadas à mão em Esmoriz.",
  },
  viewListing: "Ver listagem",
  viewDetail: "Saber mais",
  credentialEyebrow: "A distinção",
  credentialTitle: "Credencial oficial da publicação",
  credentialPendingNote:
    "A identidade visual pública ainda está pendente — a listagem apresenta apenas o identificador da marca.",
  awards: [
    {
      slug: "iea-2026",
      year: "2026",
      title: "Marca de Design Único do Ano",
      org: "Innovation & Excellence Awards",
      issuer: "Corporate LiveWire",
      image: "/Award/image001.jpg",
      imageAlt:
        "Selo de vencedor Corporate LiveWire Innovation & Excellence Awards 2026.",
      detail: {
        metaTitle:
          "Marca de Design Único do Ano 2026 — Sildel × Corporate LiveWire",
        metaDescription:
          "A Sildel — We Think Cork foi nomeada Marca de Design Único do Ano nos Corporate LiveWire Innovation & Excellence Awards 2026, em reconhecimento de silhuetas originais moldadas em cortiça portuguesa autêntica.",
        keywords: [
          "Marca de Design Único do Ano",
          "Innovation Excellence Awards Corporate LiveWire",
          "Sildel prémio 2026",
          "design em cortiça portuguesa",
          "reconhecimento arte em cortiça",
        ],
        heroImage:
          "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp",
        heroImageAlt:
          "Artesão Sildel a moldar uma escultura em cortiça no atelier sob luz quente de tungsténio.",
        heroSubtitle:
          "Corporate LiveWire Innovation & Excellence Awards 2026",
        credential: {
          image: "/Award/image001.jpg",
          imageAlt:
            "Selo de vencedor Corporate LiveWire Innovation & Excellence Awards 2026 atribuído à Sildel.",
          caption:
            "Selo oficial de Vencedor 2026 emitido pela equipa de prémios da Corporate LiveWire.",
        },
        overview: {
          eyebrow: "Sobre a distinção",
          title: "Distinguidos por um design que não se repete.",
          paragraphs: [
            "Os Innovation & Excellence Awards são atribuídos anualmente pela Corporate LiveWire, no final de um processo de júri que avalia, durante doze meses, a reputação, as opiniões dos clientes, o website, a sustentabilidade e o trabalho criativo de cada candidato.",
            "A categoria Marca de Design Único do Ano reconhece casas cujo trabalho recusa parecer-se com qualquer outro. A Sildel foi a vencedora de 2026 pelas suas peças esculturais em cortiça — todas acabadas à mão, assinadas e numeradas, nunca reeditadas.",
          ],
          citation:
            "Selecionada pelo júri da Corporate LiveWire após a análise da reputação, opiniões, website e redes sociais ao longo dos últimos doze meses.",
          image: "/products/MARLIN__MGL3906-eaad08d828.webp",
          imageAlt:
            "Marlin — composição escultural em cortiça sobre base de mármore, assinada e numerada.",
        },
        portfolio: {
          eyebrow: "Porquê esta distinção",
          title: "Três razões pelas",
          titleAccent: "quais nos distinguem.",
          cards: [
            {
              kind: "image",
              image: "/products/HORIZON_Fundo_BRANCO_16_01_02_FB-95d445ec87.webp",
              imageAlt: "Horizon — escultura côncava em cortiça sobre cubo de mármore.",
            },
            {
              kind: "text",
              title: "Silhuetas únicas",
              body: "Cada peça Sildel começa numa casca de cortiça em bruto cujo grão determina a forma final. Não há duas peças com o mesmo perfil — nem nenhum modelo é reeditado.",
            },
            {
              kind: "text",
              title: "Acabadas à mão em Esmoriz",
              body: "Cada tesouro é moldado, lixado e assinado à mão dentro do nosso atelier no norte de Portugal — a mesma sala onde a marca nasceu.",
            },
            {
              kind: "image",
              image:
                "/products/EQUILIBRIUM_Fundo_BRANCO_06_01_01_FB-c52dccae19.webp",
              imageAlt:
                "Equilibrium — cortiça autêntica, mármore de Carrara e esferas em aço dourado.",
            },
            {
              kind: "image",
              image: "/products/SHELL_Fundo_BRANCO__MGL1450-f3057aabb8.webp",
              imageAlt:
                "Shell — a forma côncava da cortiça encontra a pureza do mármore branco.",
            },
            {
              kind: "text",
              title: "Assinadas e numeradas",
              body: "Cada tesouro carrega a assinatura do artesão e um número dentro da sua edição — um pacto de que aquilo que recebe é o único do seu género.",
            },
          ],
        },
        cta: {
          eyebrow: "Continuar",
          title: "Descubra os",
          titleAccent: "tesouros.",
          body: "Veja as peças esculturais em cortiça que mereceram esta distinção — cada uma assinada, numerada e moldada à mão em Portugal.",
        },
      },
    },
    {
      slug: "luxlife-2026",
      year: "2026",
      title:
        "Empresa do Ano em Design e Artesanato Sustentável em Cortiça — Portugal",
      org: "Home & Garden Awards",
      issuer: "LUXlife",
      image: "/Award/unnamed.jpg",
      imageAlt:
        "LUXlife Home & Garden Awards 2026 — faixa de felicitações.",
      detail: {
        metaTitle:
          "Empresa do Ano em Design Sustentável em Cortiça 2026 — Sildel × LUXlife",
        metaDescription:
          "Os Home & Garden Awards 2026 da LUXlife distinguiram a Sildel — We Think Cork como Empresa do Ano em Design e Artesanato Sustentável em Cortiça em Portugal — um ofício que dá vida à árvore em vez de a abater.",
        keywords: [
          "Empresa Design Sustentável Cortiça do Ano",
          "LUXlife Home Garden Awards 2026",
          "Sildel prémio sustentabilidade Portugal",
          "extração sustentável cortiça",
          "artesanato português",
        ],
        heroImage: "/Slidel/harvest/harvest-axe.jpg",
        heroImageAlt:
          "Descortiçadores Sildel num antigo sobreiro alentejano — um a retirar a casca à mão com machado, outro a trabalhar mais acima. A madeira recém-exposta é o laranja vivo por baixo da cortiça escura.",
        heroSubtitle:
          "LUXlife Home & Garden Awards 2026 — Portugal",
        credential: {
          image: "/Award/unnamed.jpg",
          imageAlt:
            "LUXlife Home & Garden Awards 2026 — faixa de felicitações da redacção.",
          caption:
            "Faixa de felicitações dos Home & Garden Awards 2026 emitida pela LUXlife.",
        },
        overview: {
          eyebrow: "Sobre a distinção",
          title: "Um ofício que dá vida à árvore, em vez de a abater.",
          paragraphs: [
            "Os LUXlife Home & Garden Awards são atribuídos anualmente pela AI Global Media após um processo de pesquisa e avaliação por mérito. A categoria de Design e Artesanato Sustentável em Cortiça honra casas portuguesas cuja prática protege os sobreirais de que dependem.",
            "A Sildel foi a vencedora de 2026 porque cada tesouro nasce numa floresta viva — a cortiça é extraída sem nunca abater o sobreiro, a casca regenera-se e a mesma árvore é descortiçada novamente nove anos depois. A distinção é o reconhecimento editorial de que sustentabilidade e luxo podem partilhar o mesmo atelier.",
          ],
          citation:
            "Após o nosso processo de pesquisa e avaliação por mérito, a Sildel — We Think Cork foi reconhecida como a merecedora distinta.",
          image: "/Slidel/harvest/harvest-team.jpg",
          imageAlt:
            "A equipa de colheita da Sildel com o reboque carregado de cortiça no montado alentejano — as mãos por detrás de cada peça.",
        },
        portfolio: {
          eyebrow: "Porquê esta distinção",
          title: "Três compromissos por",
          titleAccent: "trás de cada peça.",
          cards: [
            {
              kind: "text",
              title: "Zero árvores abatidas",
              body: "A cortiça é extraída descortiçando a casca de nove em nove anos; o sobreiro nunca é cortado. Um sobreiro vive mais de 200 anos e é descortiçado 16 a 17 vezes durante a sua vida.",
            },
            {
              kind: "image",
              image:
                "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_4.webp",
              imageAlt: "Sobreiral português à hora dourada.",
            },
            {
              kind: "image",
              image:
                "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_3.webp",
              imageAlt: "Mãos curtidas do mestre descortiçador a empunhar o machado.",
            },
            {
              kind: "text",
              title: "Feito em Esmoriz, Portugal",
              body: "Cada peça é finalizada dentro do nosso atelier no norte de Portugal — sem oficinas no estrangeiro, sem fornecedores anónimos. As mãos que vê são as mãos que fizeram a peça.",
            },
            {
              kind: "text",
              title: "Um ofício, não um catálogo",
              body: "Não reeditamos edições. Cada tesouro é assinado, numerado e final — um compromisso silencioso de que nenhuma peça é feita duas vezes e nada é sobreproduzido.",
            },
            {
              kind: "image",
              image:
                "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp",
              imageAlt: "Um artesão Sildel a moldar cortiça no atelier de Esmoriz.",
            },
          ],
        },
        cta: {
          eyebrow: "Saber mais",
          title: "Onde nasce",
          titleAccent: "cada peça.",
          body: "Atravesse os sobreirais de Portugal e o atelier que molda cada tesouro à mão.",
        },
      },
    },
    {
      slug: "luxuri-2025",
      year: "2025",
      title: "Marca do Ano em Arte da Cortiça Ibérica",
      org: "Luxuri Awards — Porto 2025",
      issuer: "Luxuri Magazine",
      link: "https://www.luxurimag.com/award-winner-2025/sildel-we-think-cork/",
      detail: {
        metaTitle:
          "Marca do Ano em Arte da Cortiça Ibérica 2025 — Sildel × Luxuri",
        metaDescription:
          "Os Luxuri Awards 2025 (Porto) distinguiram a Sildel — We Think Cork como Marca do Ano em Arte da Cortiça Ibérica, reconhecendo mais de três décadas em contacto próximo com um único material.",
        keywords: [
          "Marca do Ano Arte Cortiça Ibérica",
          "Luxuri Awards Porto 2025",
          "Sildel Luxuri Magazine listagem",
          "arte da cortiça portuguesa",
          "30 anos de ofício em cortiça",
        ],
        heroImage:
          "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
        heroImageAlt:
          "Plano cinematográfico amplo do interior do atelier português da Sildel à hora dourada.",
        heroSubtitle: "Luxuri Awards — Porto 2025",
        sourceLink: {
          label: "Ver listagem Luxuri",
          href: "https://www.luxurimag.com/award-winner-2025/sildel-we-think-cork/",
        },
        overview: {
          eyebrow: "Sobre a distinção",
          title: "Trinta anos dentro de um só material.",
          paragraphs: [
            "Os Luxuri Awards são atribuídos anualmente pela Luxuri Magazine — \"O seu portal para tudo o que é luxo\". A categoria de Arte da Cortiça Ibérica distingue casas em Portugal e Espanha cuja prática com o material é tão próxima que se torna a sua assinatura.",
            "A Sildel foi a vencedora de 2025 em Porto. A listagem da Luxuri inclui a própria declaração da marca: mais de trinta anos passados exclusivamente em contacto com a cortiça — uma proximidade tão extraordinária que a linha entre quem faz e o material começa a esbater-se.",
          ],
          citation:
            "Em certo momento esta proximidade é tão extraordinária que já não sabemos se a cortiça faz parte de nós ou se somos nós que pertencemos a ela. A resposta é simples… a cortiça é uma questão de amor.",
          image: "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
          imageAlt:
            "Carré d'Or — folha de ouro de 24 quilates sobre o grão autêntico da cortiça portuguesa.",
        },
        portfolio: {
          eyebrow: "Porquê esta distinção",
          title: "Três coisas que só",
          titleAccent: "30 anos ensinam.",
          cards: [
            {
              kind: "image",
              image:
                "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
              imageAlt:
                "Abyss — casca de cortiça portuguesa em bruto sobre plinto de mármore, como uma relíquia das profundezas.",
            },
            {
              kind: "text",
              title: "Ler a casca",
              body: "Após três décadas, o ofício começa em olhar. Cada pedaço de cortiça dita a sua própria forma — o que se torna recipiente, escultura ou candeeiro. A cortiça é conduzida, não forçada.",
            },
            {
              kind: "text",
              title: "Ibérica, feita em Portugal",
              body: "A península ibérica produz a maior parte da cortiça do mundo. A arte por trás dela vive nas oficinas do norte de Portugal — e a Sildel é uma delas.",
            },
            {
              kind: "image",
              image: "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Horizontal-Est-6e506606c0.webp",
              imageAlt:
                "Crescent — candeeiro horizontal extenso, anéis de cortiça num eixo de latão.",
            },
            {
              kind: "image",
              image:
                "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-38d774b0b2.webp",
              imageAlt:
                "Leaf Golden — riscas de cortiça em cascata sobre uma base cúbica de mármore.",
            },
            {
              kind: "text",
              title: "A cortiça é uma questão de amor",
              body: "A frase vem da própria listagem da Luxuri, escrita pela fundadora. É a forma mais simples de dizer porque é que cada peça é assinada, numerada e moldada uma de cada vez.",
            },
          ],
        },
        cta: {
          eyebrow: "Saber mais",
          title: "As peças por",
          titleAccent: "trás da listagem.",
          body: "Veja os tesouros esculturais em cortiça que mereceram a distinção Luxuri 2025 — cada um acabado à mão em Portugal.",
        },
      },
    },
  ],
};

export function getAwards(locale: Locale): AwardsContent {
  return locale === "pt" ? awardsPt : awardsEn;
}

export function findAward(locale: Locale, slug: string): Award | undefined {
  return getAwards(locale).awards.find((a) => a.slug === slug);
}

/** Slug list — used by the sitemap and the [slug] route's generateStaticParams. */
export const AWARD_SLUGS: ReadonlyArray<string> = [
  "iea-2026",
  "luxlife-2026",
  "luxuri-2025",
];