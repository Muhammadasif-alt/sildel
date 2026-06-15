import type { HeroSlide } from "./home";

export const homePt = {
  /* Slider de abertura — fotografias editoriais "Ehance Slidel" (direcção
     da fundadora, Junho 2026). Cada slide combina uma colecção com um
     interior cinematográfico, para que todo o reel leia como um único
     moodboard em vez de uma mistura de estúdio + ambiente. */
  heroSlider: [
    {
      id: "fine-arts",
      eyebrow: "Belas Artes",
      title: "Pensamos em",
      titleAccent: "Cortiça.",
      description:
        "Tesouros esculturais moldados a partir de cortiça portuguesa sustentável — moldados à mão, assinados e numerados.",
      image: "/Slidel/enhance/enhance-sculpture-04.webp",
      imageAlt: "Escultura em cortiça Sildel num interior de atelier português banhado pela luz solar.",
      cta: { label: "Ver Todos os Tesouros", href: "/treasures" },
    },
    {
      id: "carre-dor",
      eyebrow: "Edição Limitada",
      title: "Carré",
      titleAccent: "d'Or.",
      description: "Folha de ouro sobre cortiça autêntica — geometria em diálogo silencioso.",
      image: "/Slidel/enhance/enhance-carre-dor-01.webp",
      imageAlt: "Carré d'Or — folha de ouro de 24 quilates sobre o grão autêntico da cortiça portuguesa.",
      cta: { label: "Descobrir Carré d'Or", href: "/treasures#carre-dor" },
    },
    {
      id: "eclipse",
      eyebrow: "Nova Colecção",
      title: "Colecção",
      titleAccent: "Eclipse.",
      description: "Formas esculturais em cortiça que guardam o calor da floresta.",
      image: "/Slidel/enhance/enhance-lighting-03.webp",
      imageAlt: "Eclipse — candeeiro de cortiça num atelier português suavemente iluminado.",
      cta: { label: "Ver Eclipse", href: "/treasures#eclipse" },
    },
    {
      id: "gibraltar",
      eyebrow: "Assinatura",
      title: "Gibraltar",
      titleAccent: "em cortiça.",
      description: "Uma silhueta marcante — linhas elegantes desenhadas para durar décadas.",
      image: "/Slidel/enhance/enhance-tables-04.webp",
      imageAlt: "Gibraltar — mesa em cortiça num atelier português banhado pela luz solar, com nicho em arco.",
      cta: { label: "Explorar Gibraltar", href: "/treasures/gibraltar" },
    },
    {
      id: "hot-spring",
      eyebrow: "Escultura",
      title: "Hot",
      titleAccent: "Spring.",
      description: "Uma forma de cortiça assente sobre um plinto silencioso — escultura, feita para ancorar uma sala.",
      image: "/Slidel/enhance/enhance-misc-10.webp",
      imageAlt: "Hot Spring — escultura em cortiça perfurada sobre um pódio de pedra com raminho de oliveira.",
      cta: { label: "Explorar Hot Spring", href: "/treasures/hot-spring" },
    },
    {
      id: "side-by-side",
      eyebrow: "Belas Artes",
      title: "Side",
      titleAccent: "by Side.",
      description: "Vidro fosco encontra-se com o grão autêntico da cortiça — uma peça de parede, emoldurada.",
      image: "/Slidel/enhance/enhance-fine-arts-02.webp",
      imageAlt: "Side by Side — vidro fosco sobre um tijolo de cortiça numa toalha de linho.",
      cta: { label: "Descobrir Side by Side", href: "/treasures/side-by-side" },
    },
  ] satisfies HeroSlide[],

  /* Banda editorial "Porquê escolher a Sildel" — divisão 50/50, texto +
     imagem cinematográfica de atelier. Direção da fundadora (Junho 2026),
     referência Papi & Lilly's. */
  whyChoose: {
    eyebrow: "Porquê coleccionadores escolhem a Sildel",
    title: "Um tesouro moldado à mão,",
    titleAccent: "assinado a nome.",
    body: [
      "A Sildel é um pequeno atelier português em Esmoriz, criado pela fundadora Isabel Silva. Cada peça começa como casca de cortiça em bruto de uma floresta viva — nunca uma árvore abatida — e termina como um tesouro numerado, assinado pelas mãos que o moldaram.",
      "Sem linha de fábrica. Sem fornecedores anónimos. Sem edições reeditadas. Apenas uma prática lenta, cortiça premium, e três décadas de trabalho de atelier que a península ibérica já conhece.",
    ],
    bullets: [
      "Mais de 30 anos a trabalhar exclusivamente em cortiça",
      "Desenhada e acabada em Portugal, à mão",
      "Cada peça assinada, numerada e nunca reeditada",
      "Extraída de forma sustentável — sem árvores abatidas",
    ],
    image: "/Slidel/enhance/enhance-tables-04.webp",
    imageAlt:
      "Uma mesa de cortiça Sildel no interior de um atelier português banhado pela luz solar, com nicho em arco e ramo de oliveira.",
    cta: { label: "Explorar tesouros", href: "/treasures" },
  },

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
    title: "Trabalho honesto,",
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
    eyebrow: "Dentro do Atelier",
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
      "Cada peça Sildel é assinada, numerada e feita para sobreviver às tendências. Feito lentamente, desenhado em Portugal, feito para passar de geração em geração.",
    signature: "— Sildel Atelier",
    cta: { label: "Explorar Tesouros", href: "/treasures" },
  },

  newsletter: {
    eyebrow: "A Carta do Atelier",
    title: "Mantenha-se perto",
    titleAccent: "do atelier.",
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
      "Seis caminhos — por categoria, por edição assinada, ou por encomenda. Cada peça acabada à mão no norte de Portugal.",
    piecesSuffix: "peças",
    categories: {
      sculpture: { label: "Escultura", tagline: "Formas moldadas à mão" },
      tables: { label: "Mesas", tagline: "Âncoras de uma sala" },
      lighting: { label: "Iluminação", tagline: "Calor, feito para pendurar" },
      fineArts: { label: "Belas Artes", tagline: "Peças de parede, emolduradas" },
      limited: { label: "Edições Limitadas", tagline: "Assinadas, numeradas, nunca reeditadas" },
      bespoke: { label: "Por Encomenda", tagline: "Comissionada para o seu espaço" },
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
      { value: 12, suffix: "", label: "Escultores" },
      { value: 9, suffix: "", label: "Anos entre colheitas" },
      { value: 200, suffix: "+", label: "Anos de vida do sobreiro" },
    ],
    pillars: [
      {
        index: "01",
        title: "O tempo do material.",
        body: "Cada tesouro passa pelas mesmas mãos. Sem máquinas, sem atalhos — apenas tempo, atenção e o olhar do escultor.",
      },
      {
        index: "02",
        title: "Feito em Portugal.",
        body: "Cortiça colhida nos sobreirais do Alentejo, acabada no nosso atelier no norte de Portugal — uma tradição de atelier aperfeiçoada há séculos.",
      },
      {
        index: "03",
        title: "Assinado e numerado.",
        body: "Cada peça leva a assinatura do autor e o seu lugar na edição. Nenhuma é reeditada e não há duas iguais.",
      },
    ],
  },
};
