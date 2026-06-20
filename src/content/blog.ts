/**
 * Blog (Journal) content — static posts for the Sildel journal.
 *
 * Posts live here as data, not in a CMS, for the MVP. Each post has a slug,
 * card meta (title, excerpt, image, author, date, tags), and a body composed of
 * "paragraph" or "quote" blocks.
 */

export type PostBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string; author?: string }
  | { kind: "image"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  author: string;
  authorRole: string;
  date: string; // ISO
  readMinutes: number;
  tag: "Atelier" | "Forest" | "Material" | "Collectors";
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "nine-year-rhythm",
    title: "The nine-year rhythm of the cork oak.",
    excerpt:
      "Why our practice moves at the speed of bark — and what that means for every piece that leaves the atelier.",
    image:
      "/products/SHALE-COLLECTION_red_05_Ambiente-1a60456151.webp",
    imageAlt: "An ancient Portuguese cork oak with bark recently harvested.",
    author: "Isabel Silva",
    authorRole: "CEO & Founder",
    date: "2026-04-12",
    readMinutes: 6,
    tag: "Forest",
    body: [
      {
        kind: "paragraph",
        text: "There is a season in the Alentejo when the descortiçador (master harvester) walks the cork oaks with a wooden axe in one hand and silence in the other. He listens to the bark — really listens — before the first cut. This is not romance; it is technique. The wrong angle, and the inner trunk wounds. The right one, and the tree gives up its bark the way a coat slips from a shoulder.",
      },
      {
        kind: "paragraph",
        text: "Cork is harvested once every nine years. Not eight. Not ten. Nine. The number is older than the laws that protect it — and Portugal has been protecting cork oaks since 1209, among the oldest tree-protection statutes in the world.",
      },
      {
        kind: "heading",
        text: "What patience buys",
      },
      {
        kind: "paragraph",
        text: "When you wait nine years between harvests, you change what the material becomes. The bark settles, layers, and dries on the tree itself. By the time the third or fourth harvest comes — the cork called amadia — you have a material so even, so dense, so still that it sculpts like nothing else.",
      },
      {
        kind: "quote",
        text: "We don't make cork pieces. We make pieces the cork wanted to become.",
        author: "— Sildel Atelier",
      },
      {
        kind: "paragraph",
        text: "The nine-year rhythm is why a Sildel treasure cannot be rushed. The tree wrote the schedule. We just keep it.",
      },
    ],
  },
  {
    slug: "inside-the-atelier",
    title: "Inside the Esmoriz atelier.",
    excerpt:
      "Six sculptors. Three rooms. A handful of tools older than any of us. A quiet tour of where each piece is finished.",
    image:
      "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp",
    imageAlt: "Sildel atelier interior at golden hour.",
    author: "Sildel Atelier",
    authorRole: "Editorial",
    date: "2026-03-28",
    readMinutes: 5,
    tag: "Atelier",
    body: [
      {
        kind: "paragraph",
        text: "Our studio in Esmoriz, on the northern coast of Portugal, is small enough that you can hear every cut. By design. Six sculptors work at three benches; a fourth bench is reserved for whichever piece is curing that week. Past that, the back room holds the cork — stacks of amadia, slowly drying, slowly waiting.",
      },
      {
        kind: "image",
        src: "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0376-copy_1-99d8e37972.webp",
        alt: "Hands of a Portuguese craftsman shaping a cork sculpture under tungsten light.",
        caption: "Shaping a Crescent silhouette — hand tools only.",
      },
      {
        kind: "heading",
        text: "Why we stayed small",
      },
      {
        kind: "paragraph",
        text: "We've turned down two offers to scale. Both came with the same condition: machines. We're not opposed to machines; we're opposed to what they ask the cork to be. Cork is read by hand. The grain doesn't run in straight lines, and the right cut depends on a feel that no router can fake.",
      },
      {
        kind: "paragraph",
        text: "So we stay under one hundred pieces a year. Sometimes fewer. Each treasure is signed by the sculptor who finished it and numbered within its edition. When the edition closes, that's the last one.",
      },
    ],
  },
  {
    slug: "amadia-the-third-bark",
    title: "Amadia — the cork worth waiting for.",
    excerpt:
      "Not all cork is equal. Here's why the third harvest, around year forty, is the only bark we sculpt with.",
    image:
      "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
    imageAlt: "Hands selecting a piece of fine even amadia cork bark.",
    author: "Sildel Atelier",
    authorRole: "Editorial",
    date: "2026-03-09",
    readMinutes: 4,
    tag: "Material",
    body: [
      {
        kind: "paragraph",
        text: "Cork has three lives. The first harvest, at year twenty-five, gives a rough bark called virgem — fit for floors and insulation. The second harvest, nine years later, is smoother but still uneven; it goes mostly to stoppers. The third bark, around year forty, is called amadia.",
      },
      {
        kind: "paragraph",
        text: "Amadia is dense, fine, and even. It cuts cleanly. It holds light differently. It is the only cork we work with — and even within amadia, only one plank in three passes our hand-read.",
      },
      {
        kind: "heading",
        text: "What we look for",
      },
      {
        kind: "paragraph",
        text: "Grain that flows like water, not like rope. Density you can feel before you lift it. A tone close to caramel, not too red. No cracks deeper than a fingernail. When all four conditions meet, we set it aside; it will become a treasure.",
      },
    ],
  },
  {
    slug: "the-fourth-mark",
    title: "Four marks on every piece.",
    excerpt:
      "Signed, numbered, dated, and stamped. Why each Sildel treasure carries four small assurances — and what each one means.",
    image:
      "/products/ABYSS_Fundo_PRETO_15.02.02_FP-ac8a4e1aa0.webp",
    imageAlt: "Macro of a sculptor pressing a hot brass numbering stamp onto a finished cork piece.",
    author: "Isabel Silva",
    authorRole: "CEO & Founder",
    date: "2026-02-22",
    readMinutes: 3,
    tag: "Atelier",
    body: [
      {
        kind: "paragraph",
        text: "Before any piece leaves the workbench, four marks go on. First, the sculptor's signature in black ink — the hand that finished it. Second, the edition number — your piece's place in the run. Third, the year. Fourth, our atelier stamp pressed in hot brass on the underside.",
      },
      {
        kind: "paragraph",
        text: "We're often asked why four marks instead of one. The honest answer: each mark is a promise. The signature is a promise of the hand that made it. The number is a promise that no other piece is identical. The year is a promise of provenance. The stamp is a promise that it came from this atelier and no other.",
      },
      {
        kind: "quote",
        text: "A treasure isn't expensive. It's accountable.",
      },
    ],
  },
  {
    slug: "winter-in-the-cork-forest",
    title: "Winter in the cork forest.",
    excerpt:
      "Outside the harvest season, the cork oak rests. We walked the Alentejo in January and found a forest holding its breath.",
    image:
      "/products/ALEXIS_MV_1032-89d7df8a82.webp",
    imageAlt: "Tall stacks of cork sheets curing under cork oak trees in winter light.",
    author: "Sildel Atelier",
    authorRole: "Editorial",
    date: "2026-01-30",
    readMinutes: 5,
    tag: "Forest",
    body: [
      {
        kind: "paragraph",
        text: "Harvest happens between May and August, when the bark is moist enough to slip. The other ten months, the forest is silent — but not idle. Roots run deeper. New cells form under the bark. Acorns drop. Lynx pass through.",
      },
      {
        kind: "paragraph",
        text: "Walking the forest in January reminds you that cork is a slow material because the tree is a slow tree. There's no shortcut to a 200-year-old oak.",
      },
    ],
  },
  {
    slug: "a-collector-writes",
    title: "A collector writes from Lisbon.",
    excerpt:
      "On living with a Sildel piece — a letter from one of our earliest collectors, two years on.",
    image:
      "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
    imageAlt: "A Sildel cork sculpture on a marble pedestal.",
    author: "M. Cordeiro",
    authorRole: "Sildel Collector",
    date: "2026-01-12",
    readMinutes: 3,
    tag: "Collectors",
    body: [
      {
        kind: "quote",
        text: "Two years in, the cork has settled into the room rather than the other way around. The colour deepens almost imperceptibly. The shape stays exactly itself.",
      },
      {
        kind: "paragraph",
        text: "We were sent this note from a collector in Lisbon who bought a Crescent piece two years ago. We're publishing it with their permission — names trimmed, the rest left as written.",
      },
      {
        kind: "paragraph",
        text: "It's the kind of letter that reminds us why we keep production small: a piece is only finished when it finds its room. And that finishing takes time you cannot price.",
      },
    ],
  },
];

export function findPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, limit = 3): Post[] {
  const current = findPost(slug);
  if (!current) return posts.slice(0, limit);
  const sameTag = posts.filter((p) => p.slug !== slug && p.tag === current.tag);
  const others = posts.filter((p) => p.slug !== slug && p.tag !== current.tag);
  return [...sameTag, ...others].slice(0, limit);
}

export function formatPostDate(iso: string, locale: "en" | "pt" = "en"): string {
  return new Date(iso).toLocaleDateString(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
