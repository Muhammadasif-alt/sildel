import type { PartnersContent } from "./partners";

export const partnersPt: PartnersContent = {
  section: {
    eyebrow: "Parcerias",
    title: "Em boa",
    titleAccent: "companhia.",
    body: "A cortiça dá o seu melhor em diálogo. Estas são as casas e os projectos com quem a Sildel constrói lado a lado — cada um um encontro de materiais, feito em Portugal.",
  },
  partners: [
    {
      slug: "porcel",
      name: "Porcel",
      kicker: "Porcelana × Cortiça",
      intro: "A união entre a porcelana portuguesa e a cortiça genuína.",
      note: "Apresentado na feira Ambiente, Alemanha",
      layout: "split" as const,
      transparent: false,
      paragraphs: [
        "Há encontros que parecem destinados a acontecer. A cortiça genuína, nascida da terra portuguesa, cresce em silêncio durante décadas — paciente, generosa e resiliente. A porcelana, precisa e luminosa, é a expressão da intemporalidade.",
        "Juntas, porcelana e cortiça genuína criam equilíbrio: natureza e técnica, calor e precisão. Cada peça é pensada e produzida em Portugal, fruto da união entre a Sildel e a Porcel — S.A.",
        "Não são peças para uma estação. São peças para uma vida — para serem usadas, cuidadas e, um dia, passadas de mão em mão. Porque o verdadeiro luxo não é o que se mostra. É o que permanece.",
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
      kicker: "CORKLUX — candeeiros em cortiça",
      intro: "Iluminação acústica revestida a cortiça genuína.",
      note: "Com a Lightenjin · feito em Portugal",
      layout: "products" as const,
      transparent: true,
      paragraphs: [
        "A CORKLUX é uma gama de luminárias acústicas desenvolvida com a Lightenjin, fabricante portuguesa de iluminação. Cada peça é revestida a cortiça genuína — suavizando a luz e o som ao mesmo tempo, para maior conforto e bem-estar nos espaços.",
        "A gama inclui a suspensão linear PREMIUM, os painéis modulares de parede TANGRAM e a PRIS — com três texturas de cortiça: regular, irregular e irregular plana. LED de elevado índice de restituição cromática (Ra>80) com duração superior a 50.000 horas, luz branca regulável e controlo DALI.",
        "Pensada para espaços comerciais, zonas de exposição e museus, escritórios e habitação — luz, acústica e cortiça autêntica num só objecto.",
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
      kicker: "O troféu oficial em cortiça",
      intro: "A Sildel cria o troféu do festival, esculpido à mão em cortiça.",
      note: "9.ª edição (2025) · 10.ª edição (2026)",
      layout: "split" as const,
      transparent: false,
      paragraphs: [
        "O Festival Mental é um festival português dedicado à saúde mental — cinema, artes e conversa. Para a sua nona e décima edições, a Sildel foi convidada a criar o troféu oficial do festival.",
        "Esculpido inteiramente em cortiça genuína, cada troféu é um pequeno monumento: quente, táctil e irrepetível — um símbolo justo para um festival que fala de cuidado, colocado nas mãos das vozes que o levam mais longe.",
      ],
      // A primeira imagem de cada array é o "hero" mostrado ao lado do
      // texto. As restantes preenchem a grelha de galeria abaixo. Ambas
      // as variantes vêm agora do arquivo completo de fotografias do
      // troféu (IX edição 2025 + X edição 2026), curadas de forma a que
      // nenhuma fotografia apareça em /partners e /you-think-cork.
      images: [
        { src: "/partners-web/festival-mental/fm-2025-01.webp" }, // HERO — retrato do troféu
        { src: "/partners-web/festival-mental/fm-2026-04.webp" },
        { src: "/partners-web/festival-mental/fm-2025-14.webp" },
        { src: "/partners-web/festival-mental/fm-2026-08.webp" },
        { src: "/partners-web/festival-mental/fm-2026-13.webp" },
        { src: "/partners-web/festival-mental/fm-2025-08.webp" },
        { src: "/partners-web/festival-mental/fm-2026-01.webp" },
        { src: "/partners-web/festival-mental/fm-2026-06.webp" },
        { src: "/partners-web/festival-mental/fm-2026-10.webp" },
        { src: "/partners-web/festival-mental/fm-2025-09.webp" },
        { src: "/partners-web/festival-mental/fm-2025-12.webp" },
        { src: "/partners-web/festival-mental/fm-2025-18.webp" },
      ],
      imagesAlt: [
        { src: "/partners-web/festival-mental/fm-2026-15.webp" }, // HERO — premiados e banner
        { src: "/partners-web/festival-mental/fm-2025-02.webp" },
        { src: "/partners-web/festival-mental/fm-2025-05.webp" },
        { src: "/partners-web/festival-mental/fm-2025-10.webp" },
        { src: "/partners-web/festival-mental/fm-2025-13.webp" },
        { src: "/partners-web/festival-mental/fm-2025-19.webp" },
        { src: "/partners-web/festival-mental/fm-2026-02.webp" },
        { src: "/partners-web/festival-mental/fm-2026-03.webp" },
        { src: "/partners-web/festival-mental/fm-2026-05.webp" },
        { src: "/partners-web/festival-mental/fm-2026-09.webp" },
        { src: "/partners-web/festival-mental/fm-2026-11.webp" },
        { src: "/partners-web/festival-mental/fm-2026-12.webp" },
      ],
    },
  ],
};