import type { HeroSlide } from "./home";

export const homePt = {
  /* Slider de abertura — reel cinematográfico da marca (direcção da
     fundadora, Junho 2026, décima oitava iteração: o cliente achou as
     renders /enhance/ demasiado catálogo; trocadas pela série editorial
     Nano Banana 2 para que cada slide defina ATMOSFERA, não produto).
     A sequência lê-se como uma curta-metragem: entrar no atelier →
     conhecer a peça → ver o sobreiro antigo → ver a colheita →
     testemunhar as mãos → sair pela porta pintada à mão. */
  heroSlider: [
    {
      id: "fine-arts",
      eyebrow: "Belas Artes",
      title: "Pensamos Cortiça",
      titleAccent: "Tesouros esculturais moldados à mão, assinados e numerados.",
      description:
        "Tesouros esculturais moldados a partir de cortiça portuguesa sustentável.",
      image: "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp",
      imageAlt: "Interior de um atelier de cortiça português à hora dourada, com a luz a derramar-se sobre a bancada.",
      cta: { label: "Ver Todos os Tesouros", href: "/treasures" },
      cta2: { label: "Dentro do Atelier", href: "/our-story" },
    },
    {
      id: "carre-dor",
      eyebrow: "Edição Limitada",
      title: "Carré d'Or",
      titleAccent: "Folha de ouro de 24 quilates sobre o grão autêntico da cortiça.",
      description: "Folha de ouro sobre cortiça autêntica — geometria em diálogo silencioso.",
      image: "/products/carre-dor-old.webp",
      imageAlt: "Objecto escultural em cortiça sob luz quente direccional, contra um fundo preto mate profundo.",
      cta: { label: "Descobrir Carré d'Or", href: "/treasures/carre-dor" },
      cta2: { label: "Todas Edições", href: "/treasures?category=fine-arts" },
    },
    {
      id: "eclipse",
      eyebrow: "Nova Colecção",
      title: "Eclipse",
      titleAccent: "Cortiça escultural que guarda o calor da floresta.",
      description: "Formas esculturais em cortiça que guardam o calor da floresta.",
      image: "/products/eclipse-copper-old.webp",
      imageAlt: "Eclipse — candeeiro escultural em cortiça cor de cobre, sob luz direccional suave de atelier.",
      cta: { label: "Ver Eclipse", href: "/treasures?q=eclipse" },
      cta2: { label: "Toda Escultura", href: "/treasures?category=sculpture" },
    },
    {
      id: "gibraltar",
      eyebrow: "Assinatura",
      title: "Gibraltar",
      titleAccent: "Uma silhueta marcante — desenhada para durar décadas.",
      description: "Uma silhueta marcante — linhas elegantes desenhadas para durar décadas.",
      image: "/products/gibraltar-old.webp",
      imageAlt: "Gibraltar — mesa de cortiça de assinatura Sildel num atelier português iluminado pelo sol, com alcova em arco.",
      cta: { label: "Explorar Gibraltar", href: "/treasures/gibraltar" },
      cta2: { label: "Todas Mesas", href: "/treasures?category=tables" },
    },
    {
      id: "hot-spring",
      eyebrow: "Escultura",
      title: "Hot Spring",
      titleAccent: "Uma forma de cortiça assente sobre um plinto silencioso.",
      description: "Uma forma de cortiça assente sobre um plinto silencioso — escultura, feita para ancorar uma sala.",
      image: "/products/hot-spring-old.webp",
      imageAlt: "Hot Spring — escultura de cortiça queimada em terra sobre um plinto silencioso, sob luz quente direccional.",
      cta: { label: "Explorar Hot Spring", href: "/treasures/hot-spring" },
      cta2: { label: "Toda Escultura", href: "/treasures?category=sculpture" },
    },
    {
      id: "side-by-side",
      eyebrow: "Belas Artes",
      title: "Side by Side",
      titleAccent: "Vidro fosco encontra-se com o grão autêntico da cortiça.",
      description: "Vidro fosco encontra-se com o grão autêntico da cortiça — uma peça de parede, emoldurada.",
      image: "/products/side-by-side-old.webp",
      imageAlt: "Side by Side — peça de parede em cortiça e vidro fosco, emoldurada, sob luz direccional suave.",
      cta: { label: "Descobrir Side by Side", href: "/treasures/side-by-side" },
      cta2: { label: "Todas Belas Artes", href: "/treasures?category=fine-arts" },
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
    image: "/products/gibraltar-old.webp",
    imageAlt:
      "Uma mesa de cortiça Sildel no interior de um atelier português banhado pela luz solar, com nicho em arco e ramo de oliveira.",
    cta: { label: "Explorar tesouros", href: "/treasures" },
  },

  /* Introdução ao atelier — secção editorial ao estilo Quinta Nova
     (direcção da fundadora, Junho 2026: "fazer final como
     quintanova.com"). Aparece directamente sob o hero como o primeiro
     momento editorial da página inicial. Imagem larga à esquerda,
     título serifa curto + corpo + link com seta à direita. Sem
     molduras, sem etiqueta — a mesma linguagem contida de quinta de
     luxo que a Quinta Nova usa no seu próprio site. */
  /* Tesouros em destaque — quatro linhas editoriais alternadas
     (direcção da fundadora, Junho 2026, vigésima primeira iteração:
     substitui o par anterior atelierIntro + productSpotlight por um
     reel de quatro produtos para que o visitante veja as peças mais
     fortes do catálogo umas a seguir às outras, com os layouts a
     alternar esquerda/direita/esquerda/direita pelo ritmo). O bloco
     CMS de vídeo da marca abaixo foi removido para abrir espaço. */
  productFeatures: [
    {
      eyebrow: "Escultura",
      title: "Hot Spring",
      body:
        "Uma forma escultural em cortiça sobre um plinto de pedra — cozida pela terra, perfurada à mão, feita para ancorar uma sala silenciosa. Cada peça é moldada e assinada pela Isabel no atelier de Esmoriz. Disponível em três formatos.",
      cta: { label: "Descobrir Hot Spring", href: "/treasures/hot-spring" },
      image: "/products/hot-spring-old.webp",
      imageAlt:
        "Hot Spring — escultura em cortiça perfurada sobre um pódio de pedra, iluminada por luz direccional quente.",
    },
    {
      eyebrow: "Edição Limitada",
      title: "Carré d'Or",
      body:
        "Folha de ouro de 24 quilates pressionada contra o veio puro da cortiça portuguesa — geometria em diálogo silencioso com a casca crua da floresta. Edição limitada, cada quadrado assinado pela mão que o terminou.",
      cta: { label: "Descobrir Carré d'Or", href: "/treasures/carre-dor" },
      image: "/products/carre-dor-old.webp",
      imageAlt:
        "Carré d'Or — tesouro Sildel em cortiça com folha de ouro de 24 quilates, fotografado sob luz direccional suave de atelier.",
    },
    {
      eyebrow: "Assinatura",
      title: "Gibraltar",
      body:
        "Uma silhueta marcante — apoios em cortiça sob vidro, linhas elegantes desenhadas para durar décadas. Uma mesa de assinatura que sustenta o peso de uma sala sem nunca levantar a voz. Disponível em três comprimentos.",
      cta: { label: "Explorar Gibraltar", href: "/treasures/gibraltar" },
      image: "/products/gibraltar-old.webp",
      imageAlt:
        "Gibraltar — mesa em cortiça num atelier português banhado pela luz solar, com nicho em arco.",
    },
    {
      eyebrow: "Nova Colecção",
      title: "Eclipse",
      body:
        "Uma forma escultural em cortiça que guarda o calor da floresta em luz. O veio torna-se arquitectura; a luz torna-se atmosfera. Uma nova colecção do atelier Sildel em Esmoriz.",
      cta: { label: "Explorar Eclipse", href: "/treasures/eclipse" },
      image: "/products/eclipse-copper-old.webp",
      imageAlt:
        "Eclipse — candeeiro de cortiça escultural num atelier português suavemente iluminado.",
    },
  ],

  /* CTA com parallax — pausa editorial clara depois do vídeo da marca
     que empurra o visitante para o catálogo. Fundo fixo do atelier com
     véu branco intenso para que a secção se leia "quinta de luxo" e
     não "banner de produto". */
  parallaxCta: {
    eyebrow: "A Colecção Sildel",
    title: "Encontre o seu tesouro.",
    body:
      "Explore toda a colecção — escultura, iluminação, belas artes, mesas. Cada peça moldada à mão no atelier de Esmoriz, assinada, numerada, feita para ser vivida.",
    cta: { label: "Ver Todos os Tesouros", href: "/treasures" },
    image:
      "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp",
  },

  /* História da marca — enquadramento "prodígio" (Junho 2026). A Isabel
     não "chegou" à cortiça — cresceu junto dela. Trinta anos a trabalhar
     um único material, apenas com as mãos. Diferencia-se de "30 anos
     de experiência" (parece gasto) ao liderar com intimidade e uma
     recusa da cortiça industrial/composta que domina o mercado. Citação
     directa do listing da Luxuri Magazine. */
  brandStoryProdigy: {
    eyebrow: "O Prodígio",
    title: "Trinta anos dentro",
    titleAccent: "de um único material.",
    leadParagraph:
      "Isabel Silva não chegou à cortiça. Cresceu junto dela. Mais de trinta anos depois, continua a trabalhar apenas este material — e apenas com as mãos.",
    body: [
      "A maior parte do que parece cortiça no mundo é fabricada — composta, prensada, tingida. A Isabel trabalha com a casca autêntica: o material irregular, retirado à mão, assinado pela própria árvore — aquele que a versão industrial foi criada para substituir. Recusa a substituição.",
      "Cada peça Sildel é moldada, lixada e assinada dentro do atelier de Esmoriz, no norte de Portugal. Nada é reeditado. A próxima peça começará a partir de uma casca diferente, com um veio diferente, e tornar-se-á a sua própria forma — nunca cópia da anterior.",
    ],
    quote:
      "A certa altura, a proximidade é tão extraordinária que já não sabemos se a cortiça é parte de nós — ou se somos nós que pertencemos a ela. A resposta é simples. A cortiça é uma questão de amor.",
    quoteAttribution: "Isabel Silva, fundadora",
    image: "/Slidel/ISABEL-01-2048x2048.webp",
    imageAlt:
      "Retrato de Isabel Silva, fundadora da Sildel, no atelier de Esmoriz.",
  },

  /* Origens Alentejo — história de origem cortiça-vinho (Junho 2026).
     Mesma terra, mesmo céu, mesma paciência. O montado alentejano é a
     floresta produtiva onde cada peça começa, e é a mesma paisagem que
     alimenta as adegas dos vinhos mais respeitados de Portugal. Pausa
     editorial, sem CTA — secções de origem funcionam melhor como
     momento contemplativo do que como argumento de venda. */
  alentejoOrigins: {
    eyebrow: "Origem",
    title: "A mesma terra dá",
    titleAccent: "cortiça e vinho.",
    body: [
      "O Alentejo é o sul de Portugal — luz longa, colinas lentas, e uma terra serena que há séculos sustenta sobreiros e videiras lado a lado.",
      "Cada peça Sildel começa no montado, a floresta produtiva desta região. É a mesma paisagem que enche as adegas dos vinhos mais respeitados de Portugal.",
      "A cortiça e o vinho vêm do mesmo chão. Mantêm a mesma companhia. Partilham o mesmo tempo.",
    ],
    cadence: ["Mesmas colinas", "Mesmo sol", "Mesma paciência"],
    // TODO(fundadora): quando as fotografias reais da colheita
    // estiverem em /public/Slidel/harvest/ (ver o README dessa pasta),
    // trocar estes dois caminhos para "/Slidel/harvest/harvest-golden.jpg"
    // e "/Slidel/harvest/harvest-bark-cylinder.jpg". Até lá apontamos
    // para os placeholders Nano Banana 2 para a secção não renderizar
    // com ícones de imagem partida.
    image:
      "/products/FIREFLIES_Fundo_BRANCO_14_01_01_FB-be389ff9a2.webp",
    imageAlt:
      "Plano editorial de um sobreiro português ancestral, casca recentemente colhida, no montado alentejano.",
    inset:
      "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
    insetAlt:
      "Pilhas de pranchas de cortiça recém-colhidas a curar sob sobreiros à hora dourada.",
  },

  /* Porquê cortiça autêntica — banda educativa (Junho 2026). Três factos
     sobre raridade, enquadrados como numerais grandes + corpo curto.
     Sem imagens, sem CTA — mantém a secção rápida e deixa os factos
     respirar. Aparece imediatamente antes de Materiais/Cores para que
     "o que torna este material raro" seja respondido antes de "quais
     são as suas cores". */
  whyAuthenticCork: {
    eyebrow: "Porquê Cortiça Autêntica",
    title: "O material mais raro",
    titleAccent: "de que ninguém fala.",
    lead:
      "A cortiça é colhida de uma única espécie de árvore, num canto do mundo, à mão, uma vez de nove em nove anos. O mundo ainda não reparou.",
    facts: [
      {
        number: "200+",
        label: "Anos por sobreiro",
        body:
          "Um sobreiro português vive mais de dois séculos e é descortiçado dezasseis a dezassete vezes ao longo da sua vida. Cada peça que segura é casca que a árvore já regenerou pelo menos uma vez.",
      },
      {
        number: "9",
        label: "Anos entre colheitas",
        body:
          "A casca é retirada à mão, depois deixada a regenerar nove anos completos até à próxima colheita. Sem atalho, sem mecanização — apenas o ritmo da própria árvore, mantido há séculos.",
      },
      {
        number: "0",
        label: "Árvores abatidas",
        body:
          "Nem uma única árvore é abatida para fazer uma peça Sildel. A cortiça é a casca; a árvore continua viva, a crescer, e a alimentar a mesma floresta de onde virá a próxima colheita.",
      },
    ],
  },

  /* Materiais / Cores — direcção da fundadora (Junho 2026). Quatro
     tonalidades de cortiça, com Prateado como a USP de assinatura: 2-3
     anos de clima atlântico transformam a casca numa pátina metálica
     luminosa que nenhuma máquina consegue imitar. */
  materialsColors: {
    eyebrow: "As Cores da Cortiça",
    title: "Quatro cores,",
    titleAccent: "infinitas variações.",
    body:
      "A cortiça autêntica respira. Com o tempo, o clima e a luz, escurece, aquece ou clareia — nunca duas peças iguais. Cada tesouro Sildel parte de uma de quatro famílias tonais. Uma é conquistada pelo céu.",
    signatureLabel: "Assinatura",
    silverNote: {
      eyebrow: "Assinatura Sildel",
      title: "Conquistada, não feita.",
      body: "O prateado é o estudo mais longo da casca — dois a três anos de vento e chuva atlânticos transformam a superfície até perder toda a maciez e ganhar um metal silencioso. A tonalidade de cortiça mais luxuosa do nosso catálogo.",
      caption: "2–3 anos de cura",
    },
    colors: [
      {
        slug: "dark-brown",
        name: "Castanho Profundo",
        tagline: "A primeira vida da casca",
        body:
          "Cortiça recém-colhida, rica no pigmento natural da floresta — nogueira quente no coração, quase preta nas bordas.",
        bg: "#2a1a0e",
        textLight: true,
      },
      {
        slug: "beige",
        name: "Bege",
        tagline: "O clássico",
        body:
          "A voz mais familiar da cortiça. Suave, tom de aveia, versátil — em casa contra o mármore, o latão ou o carvalho.",
        bg: "#d4c2a0",
        textLight: false,
      },
      {
        slug: "golden",
        name: "Dourado",
        tagline: "Beijado pelo sol e pelo tempo",
        body:
          "O que a cortiça se torna após verões ao ar livre — um dourado quente e melado que apanha cada ângulo da luz.",
        bg: "#b8884c",
        textLight: true,
      },
      {
        slug: "silver",
        name: "Prateado",
        tagline: "Conquistado pelo céu",
        body:
          "Dois a três anos de clima atlântico transformam a casca numa pátina prateada luminosa — uma superfície rara que máquina alguma consegue imitar.",
        bg: "#a3a59f",
        textLight: false,
        signature: true,
      },
    ],
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
        image: "/products/hot-spring-old.webp",
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
    image: "/products/FIREFLIES_Fundo_BRANCO_14_01_01_FB-be389ff9a2.webp",
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
    image: "/products/FIREFLIES_Fundo_BRANCO_14_01_04_FB-359839da1a.webp",
    imageAlt: "Sobreiral português ao pôr-do-sol.",
    steps: [
      {
        number: "01",
        title: "Colhida à mão",
        body:
          "Mestres descortiçadores retiram a casca com machado, sem nunca ferir a árvore por baixo.",
        image: "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp",
      },
      {
        number: "02",
        title: "Envelhecida ao ar livre",
        body:
          "A cortiça repousa ao ar livre durante meses, assentando o grão e a cor.",
        image: "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
      },
      {
        number: "03",
        title: "Moldada lentamente",
        body:
          "Cada peça é acabada pelo nosso atelier — não há duas iguais.",
        image: "/products/SHELL_Fundo_PRETO__MGL2103-743be0476e.webp",
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