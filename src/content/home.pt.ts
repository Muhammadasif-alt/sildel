import type { HeroSlide, HeroFeaturePillar } from "./home";

export const homePt = {
  /* Hero editorial — paleta creme clara, layout assimétrico (texto +
     produto), com tira estática de quatro pilares por baixo. Direção da
     fundadora (Junho 2026) após referência ao estilo Dehleez. */
  heroSlider: [
    {
      id: "fine-arts",
      eyebrow: "Natureza. Trabalhada.",
      title: "Beleza Natural.",
      titleAccent: "Elegância Intemporal.",
      description:
        "Esculpido à mão pela natureza, aperfeiçoado para trazer calor, textura e autenticidade ao seu espaço.",
      image: "/products/ABYSS_Fundo_BRANCO_15.01.01_FB-f5af59fe33.webp",
      imageAlt: "Abyss — casca de cortiça portuguesa em bruto sobre um plinto de mármore branco.",
      cta: { label: "Descobrir agora", href: "/treasures" },
    },
    {
      id: "carre-dor",
      eyebrow: "Edição Limitada",
      title: "Carré",
      titleAccent: "d'Or.",
      description: "Folha de ouro sobre cortiça autêntica — geometria em diálogo silencioso.",
      image: "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
      imageAlt: "Carré d'Or — folha de ouro de 24 quilates sobre o grão autêntico da cortiça portuguesa.",
      cta: { label: "Descobrir Carré d'Or", href: "/treasures#carre-dor" },
    },
    {
      id: "eclipse",
      eyebrow: "Nova Colecção",
      title: "Colecção",
      titleAccent: "Eclipse.",
      description: "Formas esculturais em cortiça que guardam o calor da floresta.",
      image: "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0395-copy_1-a549ffef9b.webp",
      imageAlt: "Eclipse — anéis de cortiça autêntica sobre base com acabamento em cobre.",
      cta: { label: "Ver Eclipse", href: "/treasures#eclipse" },
    },
    {
      id: "gibraltar",
      eyebrow: "Peça de Assinatura",
      title: "Gibraltar.",
      titleAccent: "Uma silhueta marcante.",
      description:
        "Duas placas de cortiça suportam vidro temperado — uma mesa de centro feita para durar décadas, pelas mesmas mãos que moldam todas as peças Sildel.",
      image: "/products/GIBRALTAR__MGL1908-2076b50b77.webp",
      imageAlt: "Gibraltar — suportes de cortiça sob vidro temperado.",
      cta: { label: "Explorar Gibraltar", href: "/treasures#gibraltar" },
    },
  ] satisfies HeroSlide[],

  /* Quatro pilares de marca — estáticos por baixo do hero rotativo. */
  heroFeatures: [
    {
      icon: "leaf",
      label: "100% Natural",
      body: "Puro. Autêntico. Sustentável.",
    },
    {
      icon: "hand",
      label: "Feito à mão",
      body: "Artesanato único em cada peça.",
    },
    {
      icon: "shield",
      label: "Duradouro",
      body: "Feito para durar. Construído pela natureza.",
    },
    {
      icon: "sparkles",
      label: "Design Único",
      body: "Nenhuma peça é igual a outra.",
    },
  ] as ReadonlyArray<HeroFeaturePillar>,

  collections: {
    eyebrow: "As Nossas Colecções",
    title: "Tesouros, assinados",
    titleAccent: "e numerados.",
    body:
      "Cada peça é moldada à mão em Portugal — séries limitadas, nunca reeditadas.",
    items: [
      {
        slug: "hot-spring",
        name: "Hot Spring",
        tagline: "Peças centrais cozidas pela terra",
        description: "Calor e peso em cada silhueta.",
        image: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-01_01-f3f538f873.webp",
        href: "/treasures/hot-spring",
      },
      {
        slug: "alexis",
        name: "Alexis",
        tagline: "Linha de assinatura",
        description: "Linhas elegantes para o lar pensado.",
        image: "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
        href: "/treasures/alexis",
      },
      {
        slug: "carre-dor",
        name: "Carré d'Or",
        tagline: "Edição limitada",
        description: "Folha de ouro sobre cortiça autêntica — geometria em conversa.",
        image: "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
        href: "/treasures/carre-dor",
      },
    ],
    cta: { label: "Ver Todos os Tesouros", href: "/treasures" },
  },

  philosophy: {
    eyebrow: "A Nossa Filosofia",
    headline: "Não matamos árvores,",
    headlineAccent: "damos-lhes vida.",
    body:
      "Cada peça é um testemunho da renovação da natureza. Não cortamos sobreiros; ao colher a cortiça, libertamos a árvore para se regenerar e florescer com uma nova camada de vida. Assim, cada tesouro celebra a resiliência e o ciclo eterno da terra.",
    image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_3.webp",
    imageAlt: "Casca de sobreiro a ser colhida numa floresta portuguesa.",
    stats: [
      { value: "9", unit: "anos", label: "Entre cada colheita" },
      { value: "0", unit: "árvores", label: "Cortadas no processo" },
      { value: "200+", unit: "anos", label: "Vida de cada sobreiro" },
    ],
    cta: { label: "Conhecer a Cortiça", href: "/authentic-cork" },
  },

  sustainability: {
    eyebrow: "Cortiça Autêntica",
    title: "Ofício honesto,",
    titleAccent: "sem ferir a árvore.",
    body:
      "Cada peça Sildel começa nos sobreirais de Portugal — ecossistemas protegidos onde as mesmas árvores são colhidas a cada nove anos, sem nunca serem abatidas.",
    image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_4.webp",
    imageAlt: "Sobreiral português ao pôr-do-sol.",
    steps: [
      {
        number: "01",
        title: "Colhida à mão",
        body:
          "Mestres descortiçadores retiram a casca com machado, sem nunca ferir a árvore por baixo.",
        image: "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_3.webp",
      },
      {
        number: "02",
        title: "Envelhecida ao ar livre",
        body:
          "A cortiça repousa ao ar livre durante meses, assentando o grão e a cor.",
        image: "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_2.webp",
      },
      {
        number: "03",
        title: "Moldada lentamente",
        body:
          "Cada peça é acabada pelo nosso atelier — não há duas iguais.",
        image: "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp",
      },
    ],
    cta: { label: "Descobrir a cortiça autêntica", href: "/authentic-cork" },
  },

  brandVideo: {
    eyebrow: "Ver o Ofício",
    title: "Do sobreiro ao atelier.",
    titleAccent: "Nas mãos da Sildel.",
    body:
      "Entre nos sobreirais de Portugal e no atelier onde cada tesouro é acabado à mão.",
    youtubeId: "U6N8YkiLSHY",
    duration: "Ver o filme",
  },

  treasures: {
    eyebrow: "A Nossa Promessa",
    title: "Não vendemos produtos.",
    titleAccent: "Criamos tesouros.",
    body:
      "Cada peça Sildel é assinada, numerada e feita para sobreviver às tendências. Artesanato lento, desenhado em Portugal, feito para passar de geração em geração.",
    signature: "— Sildel Atelier",
    cta: { label: "Explorar Tesouros", href: "/treasures" },
  },

  newsletter: {
    eyebrow: "A Carta do Atelier",
    title: "Mantenha-se perto",
    titleAccent: "do ofício.",
    body:
      "Novas colecções, histórias do atelier e convites discretos — uma vez por mês, nunca mais.",
    placeholder: "O seu endereço de email",
    cta: "Subscrever",
    loadingLabel: "A enviar…",
    successTitle: "Bem-vindo(a) ao atelier.",
    successBody: "Aguarde a primeira carta na sua caixa de entrada.",
    errorMessage: "Por favor, introduza um email válido.",
    privacyNote: "Respeitamos a sua caixa de entrada. Cancele quando quiser.",
  },

  heroShop: {
    eyebrow: "Feito em Portugal",
    titleLines: ["Cortiça,", "reimaginada", "como tesouro."],
    description:
      "Objectos esculturais moldados à mão a partir de cortiça portuguesa autêntica — assinados, numerados e feitos para passar de geração em geração.",
    ctaPrimary: "Comprar Tesouros",
    ctaSecondary: "Ver o filme",
    socialProof: "Apreciado por coleccionadores em mais de 30 países",
    featuredLabel: "Destaque",
    bottomStrip: {
      left: "Acabado à mão · Norte de Portugal",
      middle: "Assinado · Numerado · Único",
      right: "Envio para Todo o Mundo",
    },
  },

  categorySlider: {
    eyebrow: "As Colecções",
    title: "Não vendemos produtos.",
    titleAccent: "Criamos tesouros.",
    body:
      "Quatro colecções — cada uma assinada, numerada e acabada à mão no nosso atelier no norte de Portugal.",
    ctaLabel: "Descobrir",
    dragHint: "Arraste para descobrir",
    panels: [
      {
        slug: "sculpture",
        label: "Escultura",
        productSlug: "abyss",
        bg: "#171513",
        textOnBg: "light" as const,
      },
      {
        slug: "tables",
        label: "Mesas",
        productSlug: "bond",
        bg: "#c8b094",
        textOnBg: "dark" as const,
      },
      {
        slug: "lighting",
        label: "Iluminação",
        productSlug: "crescent",
        bg: "#8b5a3c",
        textOnBg: "light" as const,
      },
      {
        slug: "fine-arts",
        label: "Belas Artes",
        productSlug: "carre-dor",
        bg: "#b9985f",
        textOnBg: "light" as const,
      },
    ],
  },

  shopCategoriesSection: {
    eyebrow: "Comprar as Colecções",
    title: "Encontre o seu",
    titleAccent: "tesouro.",
    body:
      "Quatro colecções — cada uma assinada, numerada e acabada no nosso atelier no norte de Portugal.",
    piecesSuffix: "peças",
    categories: {
      sculpture: { label: "Escultura", tagline: "Formas moldadas à mão" },
      tables: { label: "Mesas", tagline: "Âncoras de uma sala" },
      lighting: { label: "Iluminação", tagline: "Calor, feito para pendurar" },
      fineArts: { label: "Belas Artes", tagline: "Peças de parede, emolduradas" },
    },
  },

  featuredTreasuresSection: {
    eyebrow: "As Peças desta Estação",
    title: "Tesouros, prontos a",
    titleAccent: "coleccionar.",
    viewAll: "Ver todos os tesouros",
    viewTreasure: "Ver tesouro",
  },

  whySildelSection: {
    eyebrow: "Porquê a Sildel",
    title: "Cortiça, da forma que",
    titleAccent: "merece ser feita.",
    body:
      "Três promessas discretas por trás de cada tesouro Sildel — o que torna uma peça digna de se guardar e de se passar adiante.",
    stats: [
      { value: 30, suffix: "+", label: "Países" },
      { value: 12, suffix: "", label: "Mestres artesãos" },
      { value: 9, suffix: "", label: "Anos entre colheitas" },
      { value: 200, suffix: "+", label: "Anos de vida do sobreiro" },
    ],
    pillars: [
      {
        index: "01",
        title: "Ofício lento.",
        body: "Cada tesouro passa pelas mesmas mãos. Sem máquinas, sem atalhos — apenas tempo, atenção e o olhar do artesão.",
      },
      {
        index: "02",
        title: "Feito em Portugal.",
        body: "Cortiça colhida nos sobreirais do Alentejo, acabada no nosso atelier no norte de Portugal — uma tradição artesanal aperfeiçoada há séculos.",
      },
      {
        index: "03",
        title: "Assinado e numerado.",
        body: "Cada peça leva a assinatura do artesão e o seu lugar na edição. Nenhuma é reeditada e não há duas iguais.",
      },
    ],
  },
};
