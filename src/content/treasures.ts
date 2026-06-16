/**
 * Sildel product catalog. Prices stored in EUR cents to avoid floating-point issues.
 * Source: prices and descriptions taken from sildel.pt/treasures + individual product pages.
 */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  priceCents: number; // EUR cents
  currency: "EUR";
  badge?: string; // e.g. "Unique & Exclusive", "Available in different formats"
  material?: string;
  description: string;
  longDescription?: string[];
  image: string; // main thumbnail
  gallery?: string[]; // additional images for the detail page
};

/**
 * Slugs that should render full-width on the treasures index page.
 * Mirrors the old sildel.pt magazine layout — pieces alternate between
 * full-width hero rows and paired rows so each treasure has room to breathe.
 */
export const WIDE_TREASURE_SLUGS = new Set<string>([
  "granada",
  "hot-spring",
  "eclipse-copper",
  "island",
  "crescent",
  "leaf-golden",
  "marlin",
  "shale-belly-red",
  "vitavele",
]);

export function isWideTreasure(slug: string): boolean {
  return WIDE_TREASURE_SLUGS.has(slug);
}

/** Helper — keeps Nano Banana 2 paths readable. */
const nb = (suffix: string) => `/Slidel/Nano Banana 2 - ${suffix}`;

/** Real client product photography grouped by product (optimized to WebP). */
const R = {
  shell: [
    "/products/SHELL_Fundo_BRANCO__MGL1443-4681c4db54.webp",
    "/products/SHELL_Fundo_BRANCO__MGL1450-f3057aabb8.webp",
    "/products/SHELL_Fundo_BRANCO__MGL1455-26cf0e7b47.webp",
    "/products/SHELL_Fundo_BRANCO__MGL1461-53336b6129.webp",
    "/products/SHELL_Fundo_PRETO__MGL2103-743be0476e.webp",
    "/products/SHELL_Fundo_PRETO__MGL2125-34aa8893f9.webp",
  ],
  abyss: [
    "/products/ABYSS_Fundo_BRANCO_15.01.01_FB-f5af59fe33.webp",
    "/products/ABYSS_Fundo_BRANCO_15.01.03_FB-cddfcf3362.webp",
    "/products/ABYSS_Fundo_BRANCO_15.02.02_FB-aa1ad105fa.webp",
    "/products/ABYSS_Fundo_BRANCO_15.02.04_FB-278352fe8f.webp",
    "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
    "/products/ABYSS_Fundo_PRETO_15.02.02_FP-ac8a4e1aa0.webp",
  ],
  alexis: [
    "/products/ALEXIS_MV_1032-89d7df8a82.webp",
    "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
    "/products/ALEXIS_MV_1036-769ae6c3e3.webp",
    "/products/ALEXIS_MV_1038-2d506fd45f.webp",
    "/products/ALEXIS_MV_1040-a51cb78fea.webp",
  ],
  belize: [
    "/products/BELIZE-fp_Fundo_BRANCO__MGL1410-0b939713cb.webp",
    "/products/BELIZE-fp_Fundo_BRANCO__MGL1416-19244cdc35.webp",
    "/products/BELIZE-fp_Fundo_BRANCO__MGL1421-626b2a8a40.webp",
    "/products/BELIZE-fp_Fundo_BRANCO__MGL1430-a10010bbe9.webp",
    "/products/BELIZE-fp_Fundo_PRETO__MGL2180-262f640287.webp",
    "/products/BELIZE-fp_Fundo_PRETO__MGL2199-0252056e07.webp",
  ],
  bond: [
    "/products/BOND__MGL9177-60b23d261e.webp",
    "/products/BOND__MGL9181-67a8da8ab3.webp",
    "/products/BOND__MGL9186-6b125ed646.webp",
    "/products/BOND__MGL9188-0177d766f0.webp",
    "/products/BOND__MGL9193-5f3b47100e.webp",
    "/products/BOND__MGL9195-190f50c8c3.webp",
  ],
  carreDor: [
    "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1481-fe89adcd19.webp",
    "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1488-2721bf9ad5.webp",
    "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1494-e73b3ecee6.webp",
    "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1500-2c187a51db.webp",
    "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
  ],
  crescent: [
    "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Horizontal-Est-6e506606c0.webp",
    "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Vertical_fundo-5fbe20475c.webp",
    "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Oval_fundo-bra-b996b95d0b.webp",
    "/products/CRESCENT---S_CRESCENT-1080X300mm_Candeeiro-02_01-c0820e0484.webp",
    "/products/CRESCENT---S_CRESCENT-1080X300mm_Candeeiro-02_02-752ba5aeaf.webp",
    "/products/CRESCENT---S_CRESCENT-770X330mm_Candeeiro-01_01-12486ec135.webp",
  ],
  eclipseSilver: [
    "/products/ECLIPSE_Fundo_BRANCO_silver_candeeiro-01_MV_0304-75113120f1.webp",
    "/products/ECLIPSE_Fundo_BRANCO_silver_candeeiro-01_MV_0308-66dd0f2166.webp",
    "/products/ECLIPSE_Fundo_BRANCO_silver_candeeiro-01_MV_0312-008dc2ff5c.webp",
    "/products/ECLIPSE_Fundo_BRANCO_silver_candeeiro-01_MV_0316-1b83fbbe89.webp",
    "/products/ECLIPSE_Fundo_BRANCO_silver_Candeeiro-02_MV_0337_1-e925f86f8b.webp",
    "/products/ECLIPSE_Fundo_BRANCO_silver_Candeeiro-02_MV_0343_1-15dc6599ce.webp",
  ],
  eclipseCopper: [
    "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0376-copy_1-99d8e37972.webp",
    "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0380-copy_1-ee41ea0c3c.webp",
    "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0384-copy_1-09cda630c8.webp",
    "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0388-copy_1-0da38525f6.webp",
    "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0395-copy_1-a549ffef9b.webp",
    "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0402-copy_1-9bcbc00811.webp",
  ],
  equilibrium: [
    "/products/EQUILIBRIUM_Fundo_BRANCO_06_01_01_FB-c52dccae19.webp",
    "/products/EQUILIBRIUM_Fundo_BRANCO_06_01_03_FB-d3356c1ebe.webp",
    "/products/EQUILIBRIUM_Fundo_BRANCO_06_02_02_FB-1380484faf.webp",
    "/products/EQUILIBRIUM_Fundo_BRANCO_06_02_04_FB-f0ae4e7955.webp",
    "/products/EQUILIBRIUM_Fundo_PRETO_06_01_01_FP-43a9d577f5.webp",
    "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp",
  ],
  fireflies: [
    "/products/FIREFLIES_Fundo_BRANCO_14_01_01_FB-be389ff9a2.webp",
    "/products/FIREFLIES_Fundo_BRANCO_14_01_02_FB-d499e7453d.webp",
    "/products/FIREFLIES_Fundo_BRANCO_14_01_03_FB-24e02f3d62.webp",
    "/products/FIREFLIES_Fundo_BRANCO_14_01_04_FB-359839da1a.webp",
    "/products/FIREFLIES_Fundo_PRETO_14_01_01_FP-5e1ef8617b.webp",
    "/products/FIREFLIES_Fundo_PRETO_14_01_03_FP-851b2f0c1b.webp",
  ],
  gibraltar: [
    "/products/GIBRALTAR__MGL1908-2076b50b77.webp",
    "/products/GIBRALTAR__MGL1928-c6a5c16625.webp",
    "/products/GIBRALTAR__MGL1944-6ce3f4ec67.webp",
    "/products/GIBRALTAR__MGL1948-905af42cf2.webp",
    "/products/GIBRALTAR__MGL1958-86488d82d6.webp",
    "/products/GIBRALTAR_Equilibrium_Gibraltar_foto-ambiente-0f37be0423.webp",
  ],
  halley: [
    "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1545-83941ad66a.webp",
    "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1548-7f794f0d05.webp",
    "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1552-6112983d32.webp",
    "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL2500-copy-aa578be52d.webp",
    "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL2557-copy-08d1c9e6cf.webp",
  ],
  horizon: [
    "/products/HORIZON_Fundo_BRANCO_16_01_02_FB-95d445ec87.webp",
    "/products/HORIZON_Fundo_BRANCO_16_02_04_FB-37c6200ffc.webp",
    "/products/HORIZON_Fundo_BRANCO_16_03_03_FB-d27d1a6f38.webp",
    "/products/HORIZON_Fundo_BRANCO__MGL0462_1-9b8324db9e.webp",
    "/products/HORIZON_Fundo_BRANCO__MGL0479_1-7d2957c1f3.webp",
    "/products/HORIZON_Fundo_PRETO__MGL0462-feaa04fa7e.webp",
  ],
  hotSpring: [
    "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-01_01-f3f538f873.webp",
    "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-02_01-d107d61c38.webp",
    "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-03_01-351270c93e.webp",
    "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-04_01-b215692b34.webp",
    "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-05_01-53066081dd.webp",
    "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-06_01-14d2996be2.webp",
  ],
  island: [
    "/products/ISLAND_Fundo_BRANCO_07_01_01_FB-2058bb9d73.webp",
    "/products/ISLAND_Fundo_BRANCO_07_01_03_FB-3d96c062ce.webp",
    "/products/ISLAND_Fundo_BRANCO_07_02_02_FB-a8dd9f005f.webp",
    "/products/ISLAND_Fundo_BRANCO_07_02_04_FB-6db0a8007b.webp",
    "/products/ISLAND_Fundo_PRETO_07_01_01_FP-5432cd5483.webp",
    "/products/ISLAND_Fundo_PRETO_07_02_03_FP-8e5ac59496.webp",
  ],
  leafGolden: [
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-38d774b0b2.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-4948745cfb.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-b72939870d.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-81e1b353d9.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-abc5443138.webp",
  ],
  leafBrown: [
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Castanha_Candeeiro-01_Com-Lu-78589c0dbf.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Castanha_Candeeiro-01_Com-Lu-83b513cdef.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Castanha_Candeeiro-01_Com-Lu-63348b5257.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Castanha_Candeeiro-01_Com-Lu-3b1a4a97ab.webp",
    "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Castanha_Candeeiro-01_Com-Lu-b41b8e922c.webp",
  ],
  marlin: [
    "/products/MARLIN__MGL3894-34f50ad3af.webp",
    "/products/MARLIN__MGL3897-c5f892862a.webp",
    "/products/MARLIN__MGL3906-eaad08d828.webp",
    "/products/MARLIN__MGL3910-3616b71bf4.webp",
    "/products/MARLIN__MGL3918-d72f8f56a5.webp",
    "/products/MARLIN__MGL3928-ab91d62840.webp",
  ],
  olympia: [
    "/products/OLYMPIA_Fundo_BRANCO__MGL1561-8188616da7.webp",
    "/products/OLYMPIA_Fundo_BRANCO__MGL1562-b36fbb95fb.webp",
    "/products/OLYMPIA_Fundo_BRANCO__MGL1566-b75721294d.webp",
    "/products/OLYMPIA_Fundo_PRETO__MGL3092-copy-c99a1dd822.webp",
    "/products/OLYMPIA_Fundo_PRETO__MGL3110-copy-31bfa2746e.webp",
  ],
  shaleFlower: [
    "/products/SHALE-COLLECTION_flower_Fundo_BRANCO_Candeeiro-01_Fundo-Bran-41ab0456a2.webp",
    "/products/SHALE-COLLECTION_flower_Fundo_BRANCO_Candeeiro-01_Fundo-Bran-b6797962fb.webp",
    "/products/SHALE-COLLECTION_flower_Fundo_BRANCO_Candeeiro-01_Fundo-Bran-12d33c69f4.webp",
    "/products/SHALE-COLLECTION_flower_Fundo_BRANCO_Candeeiro-01_Fundo-Bran-f938df54a4.webp",
    "/products/SHALE-COLLECTION_flower_Fundo_PRETO_Candeeiro-03_09_01_01_FP-30f39d7461.webp",
    "/products/SHALE-COLLECTION_flower_Fundo_PRETO_Candeeiro-03_09_01_02_FP-a6601b31a6.webp",
  ],
  shaleGrey: [
    "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01_06_01_03_FB_acess-6e5d563c27.webp",
    "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01_06_01_04_FB_acess-bec176a33d.webp",
    "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01_06_01_05_FB_acess-74a21a4c72.webp",
    "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01_06_01_06_FB_acess-5f4f2fe91e.webp",
    "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01__MGL1247-6de5724685.webp",
    "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01__MGL1264-6a26edb352.webp",
  ],
  shaleRed: [
    "/products/SHALE-COLLECTION_red_Fundo_BRANCO_Peca-01_05_01_03_FB_Acessa-8417c84549.webp",
    "/products/SHALE-COLLECTION_red_Fundo_BRANCO_Peca-01_05_01_04_FB_Acessa-43845b2fc6.webp",
    "/products/SHALE-COLLECTION_red_Fundo_BRANCO_Peca-01_05_01_05_FB_Acessa-fc33638c91.webp",
    "/products/SHALE-COLLECTION_red_Fundo_BRANCO_Peca-01_05_01_06_FB_Acessa-b431b48845.webp",
    "/products/SHALE-COLLECTION_red_05_Ambiente-1a60456151.webp",
  ],
  shaleSilver: [
    "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01_07_01_03_FB_ace-d14e23a6b7.webp",
    "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01_07_01_04_FB_ace-c7736d4419.webp",
    "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01_07_01_05_FB_ace-3f8dd6444b.webp",
    "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01_07_01_06_FB_ace-067ff47905.webp",
    "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01__MGL1307-f222b8c0ea.webp",
    "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01__MGL1317-a7dd448152.webp",
  ],
  sideBySide: [
    "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1521-e8190a09d3.webp",
    "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1526-72b316664c.webp",
    "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1528-5a0bdf50dd.webp",
    "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1530-31f11ce399.webp",
  ],
  oscar: [
    "/products/-SCAR_Fundo_BRANCO__MGL1387-797f9c1a2c.webp",
    "/products/-SCAR_Fundo_BRANCO__MGL1393-398ec14e3a.webp",
    "/products/-SCAR_Fundo_BRANCO__MGL1398-b68a5bd9c5.webp",
    "/products/-SCAR_Fundo_BRANCO__MGL1402-54e41f1d23.webp",
    "/products/-SCAR_Fundo_PRETO__MGL3061-de1ed8741d.webp",
    "/products/-SCAR_Fundo_PRETO__MGL3075-167f26b7ef.webp",
  ],
};

/**
 * Reusable Nano Banana image groups (4 variants each). Only the three sets
 * referenced by products below survive — the rest were defined for products
 * that have since been wired through R (real client photos) and were dead
 * code. Removed June 2026 during the /Slidel/ audit; their orphaned files
 * were deleted in the same pass.
 */
const G = {
  flatlay: [
    nb("Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_1.webp"),
    nb("Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_2.webp"),
    nb("Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_3.webp"),
    nb("Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_4.webp"),
  ],
  vessel: [
    nb("A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_1.webp"),
    nb("A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_2.webp"),
    nb("A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_3.webp"),
    nb("A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_4.webp"),
  ],
  horizontalLamp: [
    nb("A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_1.webp"),
    nb("A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_2.webp"),
    nb("A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_3.webp"),
    nb("A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_4.webp"),
  ],
};

export const products: Product[] = [
  {
    slug: "shell",
    name: "Shell",
    tagline: "A dance between nature and art",
    category: "Sculpture",
    priceCents: 287500,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic Cork and White Marble",
    description:
      "A dance between nature and art. The concave shape of authentic cork meets the purity of white marble in a ballet of forms and textures.",
    longDescription: [
      "Each piece, separate, ready to reinvent itself in new compositions and functions.",
      "SHELL is a visual poem, an expression of versatility in constant transformation.",
    ],
    image: "/Slidel/enhance/enhance-sculpture-06.webp",
    gallery: R.shell,
  },
  {
    slug: "abyss",
    name: "Abyss",
    tagline: "Cork as silent monument",
    category: "Sculpture",
    priceCents: 241500,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic Cork and White Marble",
    description:
      "Abyss is a singular piece — raw cork bark resting on a marble plinth, like a relic pulled from depth and offered to the light.",
    longDescription: [
      "The contrast between rough cork and polished marble underlines the dignity of each material.",
      "A unique sculptural object, signed and numbered, made to anchor a room.",
    ],
    image: "/Slidel/enhance/enhance-sculpture-05.webp",
    gallery: R.abyss,
  },
  {
    slug: "alexis",
    name: "Alexis",
    tagline: "Cork columns supporting glass",
    category: "Tables",
    priceCents: 172500,
    currency: "EUR",
    material: "Authentic Cork and Tempered Glass",
    description:
      "Two cork-bark columns hold a sheet of tempered glass. Elegant, light, and deeply unexpected.",
    longDescription: [
      "Designed to live in considered homes — Alexis is a low table that converses with its surroundings rather than dominating them.",
    ],
    image: "/Slidel/enhance/enhance-misc-01.webp",
    gallery: R.alexis,
  },
  {
    slug: "granada",
    name: "Granada",
    tagline: "Mosaic of cork on solid wood",
    category: "Tables",
    priceCents: 1000000,
    currency: "EUR",
    badge: "Limited Edition",
    material: "Cork Mosaic on Solid Wood",
    description:
      "A mosaic of cork tiles lays across a hand-built wooden frame — a centerpiece for a dining room or studio.",
    longDescription: [
      "Each cork tile is hand-cut and placed to honor its natural grain. The resulting surface is warm, soft, and unrepeatable.",
    ],
    image: "/images/treasures/granada.webp",
    // No dedicated atelier renders yet — detail page falls back to the
    // hero image alone rather than padding the gallery with mismatched
    // generic placeholders (founder direction, June 2026, eighth pass).
  },
  {
    slug: "hot-spring",
    name: "Hot Spring",
    tagline: "Available in different formats",
    category: "Sculpture",
    priceCents: 55200,
    currency: "EUR",
    badge: "Available in different formats",
    material: "Authentic Cork on Stainless Steel",
    description:
      "Hot Spring is an earth-fired cork form rising from a slim steel stem — a sculptural object that doubles as a quiet sentinel in a room.",
    image: "/Slidel/enhance/enhance-misc-10.webp",
    gallery: R.hotSpring,
  },
  {
    slug: "bond",
    name: "Bond",
    tagline: "Sculptural cork table",
    category: "Tables",
    priceCents: 161000,
    currency: "EUR",
    material: "Authentic Cork",
    description:
      "Bond is a low cork table built from two raw cork slabs. It holds itself together with quiet tension — a piece that anchors a living room.",
    image: "/Slidel/enhance/enhance-misc-45.webp",
    gallery: R.bond,
  },
  {
    slug: "fireflies",
    name: "Fireflies",
    tagline: "Cork fragments suspended",
    category: "Sculpture",
    priceCents: 71300,
    currency: "EUR",
    material: "Authentic Cork",
    description:
      "Fragments of cork bark suspended in a horizontal line — Fireflies is part wall-piece, part light, part poem.",
    image: "/Slidel/enhance/enhance-misc-12.webp",
    gallery: R.fireflies,
  },
  {
    slug: "eclipse",
    name: "Eclipse Silver",
    tagline: "Cork on brushed steel and copper",
    category: "Sculpture",
    priceCents: 40200,
    currency: "EUR",
    material: "Authentic Cork on Brushed Steel / Copper",
    description:
      "Eclipse pairs raw cork rings with a brushed metal base — available in steel and copper finishes. A compact sculptural object.",
    image: R.eclipseSilver[0],
    gallery: R.eclipseSilver,
  },
  {
    slug: "island",
    name: "Island",
    tagline: "Cork landscape on a plinth",
    category: "Sculpture",
    priceCents: 184000,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic Cork",
    description:
      "Island is a single, sweeping piece of cork bark suspended above a small marble plinth — a horizon you can hold.",
    image: "/Slidel/enhance/enhance-sculpture-04.webp",
    gallery: R.island,
  },
  {
    slug: "gibraltar",
    name: "Gibraltar",
    tagline: "Cork supports under glass",
    category: "Tables",
    priceCents: 161000,
    currency: "EUR",
    material: "Authentic Cork and Tempered Glass",
    description:
      "Two slabs of cork bark support a sheet of tempered glass — a coffee table that feels half-found, half-made.",
    image: "/Slidel/enhance/enhance-tables-03.webp",
    gallery: R.gibraltar,
  },
  {
    slug: "crescent",
    name: "Crescent",
    tagline: "Available in different dimensions",
    category: "Lighting",
    priceCents: 230000,
    currency: "EUR",
    badge: "Available in different dimensions",
    material: "Authentic Cork on Brass",
    description:
      "Crescent is a long horizontal chandelier — cork rings strung on a brass rail. A signature piece for a dining table or hallway.",
    image: "/Slidel/enhance/enhance-lighting-02.webp",
    gallery: R.crescent,
  },
  {
    slug: "carre-dor",
    name: "Carré d'Or",
    tagline: "24k gold leaf on cork",
    category: "Fine Arts",
    priceCents: 320000,
    currency: "EUR",
    badge: "Limited Edition",
    material: "Authentic Cork and 24k Gold Leaf",
    description:
      "Carré d'Or lays 24-carat gold leaf against the authentic grain of Portuguese cork — geometry meets bark in a single, framed composition.",
    image: "/Slidel/enhance/enhance-carre-dor-03.webp",
    gallery: R.carreDor,
  },

  /* ───────── Additional catalog from sildel.pt (prices, descriptions imported) ───────── */

  {
    slug: "eclipse-copper",
    name: "Eclipse Copper",
    tagline: "Authentic cork meets copper metal",
    category: "Lighting",
    priceCents: 40200,
    currency: "EUR",
    material: "Authentic cork and copper-finish metal",
    description:
      "Eclipse transcends typical lamp functionality. Two pieces of authentic cork harmonise with light — the upper section rotates for dispersed illumination or focused beaming.",
    longDescription: [
      "A refined masterpiece where functionality meets artistry.",
      "Approx. 9cm W × 22cm D × 9cm H, 0.6kg.",
    ],
    image: R.eclipseCopper[0],
    gallery: R.eclipseCopper,
  },
  {
    slug: "side-by-side",
    name: "Side by Side",
    tagline: "Mirror and cork in conversation",
    category: "Fine Arts",
    priceCents: 103500,
    currency: "EUR",
    material: "Authentic cork and mirror",
    description:
      "Three-dimensionality between mirror and cork — cuts that represent true innovation in handling this unique material. Two independent pieces allow endless configurations.",
    longDescription: [
      "W 122 × L 7 × H 47 cm, 2kg.",
      "Care: dust-proof cork; clean glass with microfiber, no abrasives.",
    ],
    image: "/Slidel/enhance/enhance-fine-arts-01.webp",
    gallery: R.sideBySide,
  },
  {
    slug: "shale-coast",
    name: "Shale Coast",
    tagline: "Thick layers of authentic cork",
    category: "Lighting",
    priceCents: 46000,
    currency: "EUR",
    material: "Authentic cork",
    description:
      "A versatile lamp built from layered cork in varying lengths, culminating in a bold angled silhouette. Use horizontal or vertical for distinct lighting effects.",
    longDescription: [
      "31cm W × 9cm D × 14cm H (12.2\" × 3.5\" × 5.6\").",
    ],
    image: R.shaleFlower[0],
    gallery: R.shaleFlower,
  },
  {
    slug: "belize",
    name: "Belize",
    tagline: "Vessel of cork and marble",
    category: "Sculpture",
    priceCents: 264500,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic cork and white marble",
    description:
      "Belize celebrates natural artistry — organic cork forms cradled by white marble. A sophisticated storage solution that elevates any interior.",
    longDescription: [
      "W 74 × D 44 × H 29 cm (29.1\" × 17.3\" × 11.4\"), 5kg.",
    ],
    image: "/Slidel/enhance/enhance-misc-20.webp",
    gallery: R.belize,
  },
  {
    slug: "equilibrium",
    name: "Equilibrium",
    tagline: "Cork, marble, and golden steel spheres",
    category: "Sculpture",
    priceCents: 241500,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic cork, Carrara marble, golden stainless steel",
    description:
      "An artistic sculptural piece — authentic cork complemented by golden inox details. The spheres invite customised arrangements that reflect individual style.",
    longDescription: [
      "38W × 61D × 31H cm (15\" × 24\" × 12.2\"), 3kg.",
    ],
    image: R.equilibrium[0],
    gallery: R.equilibrium,
  },
  {
    slug: "shale",
    name: "Shale",
    tagline: "A stunning cork lamp",
    category: "Lighting",
    priceCents: 46000,
    currency: "EUR",
    material: "Authentic cork",
    description:
      "Thin cork layers meticulously pressed and arranged in varying lengths. The design expands into a rounded form — position upright or horizontal for direct or indirect light.",
    image: R.shaleGrey[0],
    gallery: R.shaleGrey,
  },
  {
    slug: "leaf-golden",
    name: "Leaf Golden",
    tagline: "Cork strips cascading from marble",
    category: "Sculpture",
    priceCents: 48300,
    currency: "EUR",
    material: "Authentic cork and white marble",
    description:
      "A cubic marble base — symbol of stability — topped with cork strips that cascade like leaves in the wind. A luminous interplay of solid and organic.",
    longDescription: [
      "20W × 18D × 42H cm, 2kg.",
    ],
    image: R.leafGolden[0],
    gallery: R.leafGolden,
  },
  {
    slug: "leaf-brown",
    name: "Leaf Brown",
    tagline: "Cork strips cascading from marble",
    category: "Sculpture",
    priceCents: 48300,
    currency: "EUR",
    material: "Authentic cork and white marble",
    description:
      "Same sculpted silhouette as Leaf Golden, in a deeper warm brown — cork strips falling from a marble cube, alive with shadow and movement.",
    longDescription: [
      "20W × 18D × 42H cm, 2kg.",
    ],
    image: R.leafBrown[0],
    gallery: R.leafBrown,
  },
  {
    slug: "halley",
    name: "Halley",
    tagline: "Glass and cork in harmony",
    category: "Fine Arts",
    priceCents: 92000,
    currency: "EUR",
    material: "Authentic cork and glass",
    description:
      "A circular mirror set inside an authentic cork structure with distinct textures on each side. Two independent pieces, endless configurations.",
    longDescription: [
      "38W × 61D × 31H cm.",
    ],
    image: "/Slidel/enhance/enhance-fine-arts-03.webp",
    gallery: R.halley,
  },
  {
    slug: "oscar",
    name: "Óscar",
    tagline: "A tribute to cork and the cork oak",
    category: "Sculpture",
    priceCents: 184000,
    currency: "EUR",
    material: "Authentic cork and white marble",
    description:
      "Óscar honours cork as a noble material with ancient origins and timeless qualities — a tribute to the bark's many properties and possibilities.",
    longDescription: [
      "Approx. 42L × 42D × 47H cm (16.5\" × 16.5\" × 18.5\"), 5kg.",
    ],
    image: R.oscar[0],
    gallery: R.oscar,
  },
  {
    slug: "marlin",
    name: "Marlin",
    tagline: "A sphere of marble cradled in cork",
    category: "Sculpture",
    priceCents: 276000,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic cork and white marble",
    description:
      "A round marble base supports an asymmetric concave cork structure that cradles a white marble sphere — a sanctuary of serene beauty.",
    longDescription: [
      "77W × 42D × 22H cm, 8kg.",
    ],
    image: R.marlin[0],
    gallery: R.marlin,
  },
  {
    slug: "olympia",
    name: "Olympia",
    tagline: "A side table — refined, natural",
    category: "Tables",
    priceCents: 161000,
    currency: "EUR",
    material: "Authentic cork and steel",
    description:
      "A sleek metal frame with two cork surfaces — a bedside or sofa-side table that delivers architectural sophistication and natural charm.",
    longDescription: [
      "42W × 42D × 94H cm, 3kg.",
    ],
    image: R.olympia[0],
    gallery: R.olympia,
  },
  {
    slug: "horizon",
    name: "Horizon",
    tagline: "Where earth meets sky",
    category: "Sculpture",
    priceCents: 138000,
    currency: "EUR",
    badge: "Unique & Exclusive",
    material: "Authentic cork and white marble",
    description:
      "A marble cube base meets a concave cork structure — the poetic interaction between stable stone and organic bark.",
    longDescription: [
      "43W × 78D × 15H cm (16.9\" × 30.7\" × 5.9\"), 3kg.",
    ],
    image: R.horizon[0],
    gallery: R.horizon,
  },
  {
    slug: "shale-belly-red",
    name: "Shale Belly Red",
    tagline: "A mosaic of shadows and lights",
    category: "Lighting",
    priceCents: 46000,
    currency: "EUR",
    material: "Authentic cork",
    description:
      "Thin cork strips layered in varying lengths create visual rhythm — irregular corners add a touch of artistic rebellion. Works horizontally or vertically.",
    longDescription: [
      "W 16 × D 6 × H 28 cm, 0.5 kg.",
    ],
    image: R.shaleRed[0],
    gallery: R.shaleRed,
  },
  {
    slug: "shale-belly-silver",
    name: "Shale Belly Silver",
    tagline: "A mosaic of shadows and lights",
    category: "Lighting",
    priceCents: 46000,
    currency: "EUR",
    material: "Authentic cork",
    description:
      "Same sculptural rhythm as Shale Belly Red in a cool silver finish — cork strips layered for an interplay of light and shadow.",
    longDescription: [
      "W 16 × D 6 × H 28 cm (W 6.3\" × D 2.4\" × H 11\").",
    ],
    image: R.shaleSilver[0],
    gallery: R.shaleSilver,
  },
  {
    slug: "vitaqua",
    name: "Vitaqua",
    tagline: "A tribute to the cork stopper",
    category: "Fine Arts",
    priceCents: 40300,
    currency: "EUR",
    material: "Authentic cork and glass",
    description:
      "An artistic piece celebrating the heritage of wine cork closures — cork paired with glass to form a continuous flow that turns each flower into a living masterpiece.",
    // No dedicated atelier render yet — main image is a generic Nano
    // Banana flatlay until the founder supplies a Vitaqua-specific
    // enhance frame. Gallery omitted so the detail page falls back to
    // just this hero rather than showing the rest of the unrelated set.
    image: G.flatlay[0],
  },
  {
    slug: "bonfire",
    name: "Bonfire",
    tagline: "Cork pieces cradling glass vessels",
    category: "Fine Arts",
    priceCents: 46000,
    currency: "EUR",
    material: "Authentic cork and glass",
    description:
      "Cork elements come together to form an organic foundation that holds glass candle vessels — the warm ambiance of a glowing bonfire (candles not included).",
    longDescription: [
      "W 450 × D 450 × H 120 mm, 0.4 kg.",
    ],
    image: "/Slidel/enhance/enhance-misc-18.webp",
    // Bonfire's single atelier render only — generic Nano Banana
    // placeholders removed because they showed unrelated cork pieces.
  },
  {
    slug: "vitavele",
    name: "Vitavele",
    tagline: "A tribute to the cork stopper",
    category: "Lighting",
    priceCents: 40300,
    currency: "EUR",
    material: "Authentic cork and glass",
    description:
      "Authentic cork merges with glass — a dance of light and warmth that transforms each candle into a symbol of serenity.",
    longDescription: [
      "W 900 × D 50 × H 60 mm, 0.3 kg.",
    ],
    image: "/Slidel/enhance/enhance-misc-08.webp",
    // Vitavele's single atelier render only — the generic horizontal-
    // lamp + flatlay placeholders showed unrelated cork-stopper pieces.
  },
];

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number, currency: "EUR" = "EUR"): string {
  const value = cents / 100;
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Treasures page content (sections that aren't the product list itself).
 */
export const treasures = {
  hero: {
    eyebrow: "The Collection",
    title: "Treasures, signed",
    titleAccent: "& numbered.",
    intro:
      "Every Sildel piece is a one-off — hand-finished, signed, and numbered in Portugal. These are the current treasures.",
    image: "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
    imageAlt: "Sildel — authentic cork bark on a marble plinth, photographed in the atelier.",
    badge: { label: "Hand-finished", value: "in Portugal" },
  },

  categories: {
    eyebrow: "Collections",
    title: "Browse",
    titleAccent: "by collection.",
    items: [
      { slug: "all", label: "All" },
      { slug: "sculpture", label: "Sculpture" },
      { slug: "tables", label: "Tables" },
      { slug: "lighting", label: "Lighting" },
      { slug: "fine-arts", label: "Fine Arts" },
    ],
  },

  products: {
    eyebrow: "All Treasures",
    title: "Every piece,",
    titleAccent: "hand-finished.",
    body:
      "Each treasure carries its own number and the signature of the sculptor who finished it. None are reissued.",
  },

  featured: {
    eyebrow: "Featured",
    label: "Limited Edition",
    title: "Carré d'Or —",
    titleAccent: "gold meets bark.",
    body:
      "Carré d'Or is our most quietly bold collection: 24-carat gold leaf laid against the authentic grain of Portuguese cork. Geometry meets bark — one limited edition at a time.",
    image: "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1488-2721bf9ad5.webp",
    imageAlt: "Carré d'Or — 24k gold leaf laid against the authentic grain of Portuguese cork.",
    specs: [
      { label: "Material", value: "Amadia cork + 24k gold leaf" },
      { label: "Finish", value: "Hand-laid in Portugal" },
      { label: "Edition", value: "Numbered series" },
    ],
    cta: { label: "View Carré d'Or", href: "/treasures/carre-dor" },
  },

  promise: {
    eyebrow: "Our Promise",
    title: "Four marks",
    titleAccent: "on every piece.",
    body:
      "Each Sildel treasure carries four assurances — what the piece is, where it was made, who made it, and which number in its run it is.",
    items: [
      { title: "Signed", body: "The sculptor's signature, on every piece." },
      { title: "Numbered", body: "Each treasure is numbered within its edition." },
      {
        title: "Made in Portugal",
        body: "Designed and finished in our atelier in northern Portugal.",
      },
      {
        title: "Authentic cork",
        body: "Sustainably harvested from Portuguese oak.",
      },
    ],
  },

  cta: {
    eyebrow: "Continue",
    title: "Read the story",
    titleAccent: "behind the treasures.",
    body:
      "Each piece begins in a forest and ends in a home. Take a step back and see how — and why.",
    destinations: [
      {
        eyebrow: "The Studio",
        title: "Read our story",
        body: "Inside the atelier — the hands that shape every piece.",
        image: "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
        imageAlt: "Sildel atelier interior at golden hour.",
        href: "/our-story",
        cta: "Our Story",
      },
      {
        eyebrow: "The Material",
        title: "About authentic cork",
        body: "Why cork — and what it took to get it here.",
        image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_2.webp",
        imageAlt: "A Portuguese cork oak after harvest.",
        href: "/authentic-cork",
        cta: "Authentic Cork",
      },
    ],
    closingLine: "Designed in Portugal · Made by hand",
  },
};

export type TreasuresContent = typeof treasures;

/* ─────────── Portuguese variants ─────────── */
import type { Locale } from "@/lib/i18n/config";

/** Per-product text overlay (PT). Keyed by slug. */
const PRODUCT_TEXT_PT: Record<string, Partial<Pick<Product, "tagline" | "badge" | "material" | "description" | "longDescription">>> = {
  shell: {
    tagline: "Uma dança entre a natureza e a arte",
    badge: "Único & Exclusivo",
    material: "Cortiça Autêntica e Mármore Branco",
    description:
      "Uma dança entre a natureza e a arte. A forma côncava da cortiça autêntica encontra a pureza do mármore branco num ballet de formas e texturas.",
    longDescription: [
      "Cada peça, separada, pronta a reinventar-se em novas composições e funções.",
      "SHELL é um poema visual, uma expressão de versatilidade em constante transformação.",
    ],
  },
  abyss: {
    tagline: "Cortiça como monumento silencioso",
    badge: "Único & Exclusivo",
    material: "Cortiça Autêntica e Mármore Branco",
    description:
      "Abyss é uma peça singular — casca de cortiça em bruto repousada sobre um plinto de mármore, como uma relíquia trazida das profundezas e oferecida à luz.",
    longDescription: [
      "O contraste entre a cortiça rugosa e o mármore polido sublinha a dignidade de cada material.",
      "Um objecto escultural único, assinado e numerado, feito para ancorar uma sala.",
    ],
  },
  alexis: {
    tagline: "Colunas de cortiça a suster o vidro",
    material: "Cortiça Autêntica e Vidro Temperado",
    description:
      "Duas colunas em casca de cortiça seguram uma placa de vidro temperado. Elegante, leve e profundamente inesperada.",
    longDescription: [
      "Desenhada para viver em lares pensados — Alexis é uma mesa baixa que conversa com o que a rodeia em vez de dominar.",
    ],
  },
  granada: {
    tagline: "Mosaico de cortiça sobre madeira maciça",
    badge: "Edição Limitada",
    material: "Mosaico de Cortiça sobre Madeira Maciça",
    description:
      "Um mosaico de azulejos de cortiça assenta sobre uma estrutura de madeira construída à mão — uma peça central para uma sala de jantar ou estúdio.",
    longDescription: [
      "Cada azulejo de cortiça é cortado e colocado à mão para honrar o seu grão natural. A superfície resultante é quente, suave e irrepetível.",
    ],
  },
  "hot-spring": {
    tagline: "Disponível em diferentes formatos",
    badge: "Disponível em diferentes formatos",
    material: "Cortiça Autêntica sobre Aço Inoxidável",
    description:
      "Hot Spring é uma forma de cortiça cozida pela terra erguendo-se sobre uma haste fina de aço — um objecto escultural que também serve de sentinela silenciosa numa sala.",
  },
  bond: {
    tagline: "Mesa escultural em cortiça",
    material: "Cortiça Autêntica",
    description:
      "Bond é uma mesa baixa em cortiça construída a partir de duas placas brutas. Sustenta-se com tensão silenciosa — uma peça que ancora uma sala de estar.",
  },
  fireflies: {
    tagline: "Fragmentos de cortiça suspensos",
    material: "Cortiça Autêntica",
    description:
      "Fragmentos de casca de cortiça suspensos numa linha horizontal — Fireflies é metade peça de parede, metade luz, metade poema.",
  },
  eclipse: {
    tagline: "Cortiça sobre aço escovado e cobre",
    material: "Cortiça Autêntica sobre Aço Escovado / Cobre",
    description:
      "Eclipse combina anéis de cortiça em bruto com uma base em metal escovado — disponível em aço e cobre. Um objecto escultural compacto.",
  },
  island: {
    tagline: "Paisagem de cortiça sobre um plinto",
    badge: "Único & Exclusivo",
    material: "Cortiça Autêntica",
    description:
      "Island é uma única peça curva de casca de cortiça suspensa sobre um pequeno plinto de mármore — um horizonte que se pode segurar.",
  },
  gibraltar: {
    tagline: "Suportes de cortiça sob vidro",
    material: "Cortiça Autêntica e Vidro Temperado",
    description:
      "Duas placas de casca de cortiça suportam uma chapa de vidro temperado — uma mesa de centro com ar de quase-encontrada, quase-feita.",
  },
  crescent: {
    tagline: "Disponível em diferentes dimensões",
    badge: "Disponível em diferentes dimensões",
    material: "Cortiça Autêntica sobre Latão",
    description:
      "Crescent é um candeeiro horizontal extenso — anéis de cortiça enfiados num eixo de latão. Uma peça de assinatura para uma mesa de jantar ou um corredor.",
  },
  "carre-dor": {
    tagline: "Folha de ouro 24k sobre cortiça",
    badge: "Edição Limitada",
    material: "Cortiça Autêntica e Folha de Ouro 24k",
    description:
      "Carré d'Or coloca folha de ouro de 24 quilates contra o grão autêntico da cortiça portuguesa — a geometria encontra a casca numa única composição emoldurada.",
  },

  /* ───────── PT overlays for the imported sildel.pt catalog ───────── */

  "eclipse-copper": {
    tagline: "Cortiça autêntica e metal cobre",
    material: "Cortiça autêntica e metal cor cobre",
    description:
      "Eclipse transcende a função do candeeiro. Duas peças de cortiça autêntica harmonizam-se com a luz — a parte superior roda para iluminação dispersa ou focada.",
  },
  "side-by-side": {
    tagline: "Espelho e cortiça em diálogo",
    material: "Cortiça autêntica e espelho",
    description:
      "Tridimensionalidade entre o espelho e a cortiça — cortes que representam verdadeira inovação. Duas peças independentes para infinitas combinações.",
  },
  "shale-coast": {
    tagline: "Camadas espessas de cortiça autêntica",
    material: "Cortiça autêntica",
    description:
      "Um candeeiro versátil em camadas de cortiça de comprimentos variados, terminando numa silhueta angular ousada. Horizontal ou vertical para efeitos de luz distintos.",
  },
  belize: {
    tagline: "Recipiente de cortiça e mármore",
    badge: "Único & Exclusivo",
    material: "Cortiça autêntica e mármore branco",
    description:
      "Belize celebra a arte natural — formas orgânicas de cortiça embaladas pelo mármore branco. Uma solução de arrumação sofisticada que eleva qualquer interior.",
  },
  equilibrium: {
    tagline: "Cortiça, mármore e esferas de aço dourado",
    badge: "Único & Exclusivo",
    material: "Cortiça autêntica, mármore Carrara, inox dourado",
    description:
      "Uma peça escultural artística — cortiça autêntica com detalhes em inox dourado. As esferas convidam a composições personalizadas.",
  },
  shale: {
    tagline: "Um candeeiro em cortiça",
    material: "Cortiça autêntica",
    description:
      "Camadas finas de cortiça pressionadas e dispostas em comprimentos variados — o desenho expande-se numa forma redonda. Vertical ou horizontal para luz direta ou indireta.",
  },
  "leaf-golden": {
    tagline: "Fitas de cortiça caindo do mármore",
    material: "Cortiça autêntica e mármore branco",
    description:
      "Uma base cúbica de mármore — símbolo de estabilidade — coroada por fitas de cortiça que caem como folhas ao vento. Um jogo luminoso entre o sólido e o orgânico.",
  },
  "leaf-brown": {
    tagline: "Fitas de cortiça caindo do mármore",
    material: "Cortiça autêntica e mármore branco",
    description:
      "A mesma silhueta esculpida da Leaf Golden, num castanho quente — fitas de cortiça caindo de um cubo de mármore, vivas em sombra e movimento.",
  },
  halley: {
    tagline: "Vidro e cortiça em harmonia",
    material: "Cortiça autêntica e vidro",
    description:
      "Um espelho circular numa estrutura de cortiça autêntica com texturas distintas em cada lado. Duas peças independentes, configurações infinitas.",
  },
  oscar: {
    tagline: "Uma homenagem à cortiça e ao sobreiro",
    material: "Cortiça autêntica e mármore branco",
    description:
      "Óscar honra a cortiça como material nobre, de origens antigas e qualidades intemporais — uma homenagem às muitas propriedades e possibilidades da casca.",
  },
  marlin: {
    tagline: "Uma esfera de mármore embalada pela cortiça",
    badge: "Único & Exclusivo",
    material: "Cortiça autêntica e mármore branco",
    description:
      "Uma base redonda de mármore sustenta uma estrutura assimétrica e côncava de cortiça que embala uma esfera de mármore branco — um santuário de serena beleza.",
  },
  olympia: {
    tagline: "Uma mesa de apoio — refinada, natural",
    material: "Cortiça autêntica e aço",
    description:
      "Uma estrutura metálica elegante com duas superfícies em cortiça — uma mesa de cabeceira ou de sofá que entrega sofisticação arquitetónica e charme natural.",
  },
  horizon: {
    tagline: "Onde a terra encontra o céu",
    badge: "Único & Exclusivo",
    material: "Cortiça autêntica e mármore branco",
    description:
      "Um cubo de mármore encontra uma estrutura côncava de cortiça — a interação poética entre pedra estável e casca orgânica.",
  },
  "shale-belly-red": {
    tagline: "Um mosaico de sombras e luzes",
    material: "Cortiça autêntica",
    description:
      "Tiras finas de cortiça em camadas de comprimentos variados criam ritmo visual — os cantos irregulares acrescentam rebeldia artística. Horizontal ou vertical.",
  },
  "shale-belly-silver": {
    tagline: "Um mosaico de sombras e luzes",
    material: "Cortiça autêntica",
    description:
      "O mesmo ritmo escultórico do Shale Belly Red num acabamento prata fresco — fitas de cortiça em camadas para um jogo de luz e sombra.",
  },
  vitaqua: {
    tagline: "Uma homenagem à rolha de cortiça",
    material: "Cortiça autêntica e vidro",
    description:
      "Uma peça artística que celebra a herança das rolhas de vinho — cortiça e vidro em fluxo contínuo, transformando cada flor numa obra-prima viva.",
  },
  bonfire: {
    tagline: "Cortiça embalando recipientes de vidro",
    material: "Cortiça autêntica e vidro",
    description:
      "Elementos de cortiça formam uma base orgânica que sustém recipientes de vidro para velas — o calor de uma fogueira (velas não incluídas).",
  },
  vitavele: {
    tagline: "Uma homenagem à rolha de cortiça",
    material: "Cortiça autêntica e vidro",
    description:
      "A cortiça autêntica funde-se com o vidro — uma dança de luz e calor que transforma cada vela num símbolo de serenidade.",
  },
};

export function getProducts(locale: Locale): Product[] {
  if (locale !== "pt") return products;
  return products.map((p) => {
    const overlay = PRODUCT_TEXT_PT[p.slug];
    if (!overlay) return p;
    return { ...p, ...overlay };
  });
}

export function getFindProduct(locale: Locale): (slug: string) => Product | undefined {
  const list = getProducts(locale);
  return (slug: string) => list.find((p) => p.slug === slug);
}

/** Treasures listing page content (PT). */
export const treasuresPt = {
  hero: {
    eyebrow: "A Colecção",
    title: "Tesouros, assinados",
    titleAccent: "e numerados.",
    intro:
      "Cada peça Sildel é única — acabada à mão, assinada e numerada em Portugal. Estes são os tesouros actuais.",
    image: "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black.webp",
    imageAlt: "Um tesouro Sildel em destaque sob luz quente direccional.",
    badge: { label: "Acabado à mão", value: "em Portugal" },
  },
  categories: {
    eyebrow: "Colecções",
    title: "Explorar",
    titleAccent: "por colecção.",
    items: [
      { slug: "all", label: "Tudo" },
      { slug: "sculpture", label: "Escultura" },
      { slug: "tables", label: "Mesas" },
      { slug: "lighting", label: "Iluminação" },
      { slug: "fine-arts", label: "Belas Artes" },
    ],
  },
  products: {
    eyebrow: "Todos os Tesouros",
    title: "Cada peça,",
    titleAccent: "acabada à mão.",
    body:
      "Cada tesouro leva o seu número e a assinatura do autor que o acabou. Nenhum é reeditado.",
  },
  featured: {
    eyebrow: "Destaque",
    label: "Edição Limitada",
    title: "Carré d'Or —",
    titleAccent: "o ouro encontra a casca.",
    body:
      "Carré d'Or é a nossa colecção mais discretamente ousada: folha de ouro 24 quilates pousada sobre o grão autêntico da cortiça portuguesa. A geometria encontra a casca — uma edição limitada de cada vez.",
    image: "/Slidel/CRESCENT-1200X350MM-3-SILDEL-1024x683.webp",
    imageAlt: "Carré d'Or — peça em cortiça com pormenor de folha de ouro.",
    specs: [
      { label: "Material", value: "Cortiça amadia + folha de ouro 24k" },
      { label: "Acabamento", value: "Aplicado à mão em Portugal" },
      { label: "Edição", value: "Série numerada" },
    ],
    cta: { label: "Ver Carré d'Or", href: "/treasures/carre-dor" },
  },
  promise: {
    eyebrow: "A Nossa Promessa",
    title: "Quatro marcas",
    titleAccent: "em cada peça.",
    body:
      "Cada tesouro Sildel leva quatro garantias — o que a peça é, onde foi feita, quem a fez e que número tem na sua série.",
    items: [
      { title: "Assinado", body: "A assinatura do autor em cada peça." },
      { title: "Numerado", body: "Cada tesouro é numerado dentro da sua edição." },
      {
        title: "Feito em Portugal",
        body: "Desenhado e acabado no nosso atelier no norte de Portugal.",
      },
      {
        title: "Cortiça autêntica",
        body: "Colhida de forma sustentável a partir do sobreiro português.",
      },
    ],
  },
  cta: {
    eyebrow: "Continuar",
    title: "Leia a história",
    titleAccent: "por trás dos tesouros.",
    body:
      "Cada peça começa numa floresta e termina num lar. Dê um passo atrás e veja como — e porquê.",
    destinations: [
      {
        eyebrow: "O Estúdio",
        title: "Ler a nossa história",
        body: "Dentro do atelier — as mãos que moldam cada peça.",
        image: "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp",
        imageAlt: "Interior do atelier Sildel ao pôr-do-sol.",
        href: "/our-story",
        cta: "A Nossa História",
      },
      {
        eyebrow: "O Material",
        title: "Sobre a cortiça autêntica",
        body: "Porquê a cortiça — e o que foi preciso para a trazer até aqui.",
        image: "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_2.webp",
        imageAlt: "Um sobreiro português após a colheita.",
        href: "/authentic-cork",
        cta: "Cortiça Autêntica",
      },
    ],
    closingLine: "Desenhado em Portugal · Feito à mão",
  },
};

export function getTreasures(locale: Locale): TreasuresContent {
  return locale === "pt" ? (treasuresPt as TreasuresContent) : treasures;
}
