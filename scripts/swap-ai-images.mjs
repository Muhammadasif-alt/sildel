// One-shot script: replace every AI-image path under /Slidel/ (and any
// /FOTOS PRODUTO/* intermediate) with the matching already-optimized
// WebP under /products/. Run once after the founder said no AI imagery.
// Safe to re-run; idempotent.
import fs from "node:fs";
import path from "node:path";

// Real, already-optimized client product photos (147 files in /public/products/).
const P = {
  scarBRANCO: "/products/-SCAR_Fundo_BRANCO__MGL1387-797f9c1a2c.webp",
  scarPRETO_3061: "/products/-SCAR_Fundo_PRETO__MGL3061-de1ed8741d.webp",
  scarPRETO_3075: "/products/-SCAR_Fundo_PRETO__MGL3075-167f26b7ef.webp",

  abyssBRANCO_15_01_01: "/products/ABYSS_Fundo_BRANCO_15.01.01_FB-f5af59fe33.webp",
  abyssBRANCO_15_02_02: "/products/ABYSS_Fundo_BRANCO_15.02.02_FB-aa1ad105fa.webp",
  abyssBRANCO_15_02_04: "/products/ABYSS_Fundo_BRANCO_15.02.04_FB-278352fe8f.webp",
  abyssPRETO_15_01_01: "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
  abyssPRETO_15_02_02: "/products/ABYSS_Fundo_PRETO_15.02.02_FP-ac8a4e1aa0.webp",

  alexis_1032: "/products/ALEXIS_MV_1032-89d7df8a82.webp",
  alexis_1034: "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
  alexis_1036: "/products/ALEXIS_MV_1036-769ae6c3e3.webp",
  alexis_1038: "/products/ALEXIS_MV_1038-2d506fd45f.webp",
  alexis_1040: "/products/ALEXIS_MV_1040-a51cb78fea.webp",

  belize_BRANCO_1410: "/products/BELIZE-fp_Fundo_BRANCO__MGL1410-0b939713cb.webp",
  belize_BRANCO_1421: "/products/BELIZE-fp_Fundo_BRANCO__MGL1421-626b2a8a40.webp",
  belize_BRANCO_1430: "/products/BELIZE-fp_Fundo_BRANCO__MGL1430-a10010bbe9.webp",
  belize_PRETO_2180: "/products/BELIZE-fp_Fundo_PRETO__MGL2180-262f640287.webp",
  belize_PRETO_2199: "/products/BELIZE-fp_Fundo_PRETO__MGL2199-0252056e07.webp",

  bond_9177: "/products/BOND__MGL9177-60b23d261e.webp",
  bond_9181: "/products/BOND__MGL9181-67a8da8ab3.webp",
  bond_9186: "/products/BOND__MGL9186-6b125ed646.webp",
  bond_9188: "/products/BOND__MGL9188-0177d766f0.webp",
  bond_9193: "/products/BOND__MGL9193-5f3b47100e.webp",
  bond_9195: "/products/BOND__MGL9195-190f50c8c3.webp",

  carreDor_pormenor: "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
  carreDor_1481: "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1481-fe89adcd19.webp",
  carreDor_1488: "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1488-2721bf9ad5.webp",
  carreDor_1494: "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1494-e73b3ecee6.webp",
  carreDor_1500: "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1500-2c187a51db.webp",

  crescent_1080: "/products/CRESCENT---S_CRESCENT-1080X300mm_Candeeiro-02_01-c0820e0484.webp",
  crescent_1080b: "/products/CRESCENT---S_CRESCENT-1080X300mm_Candeeiro-02_02-752ba5aeaf.webp",
  crescent_1330_h: "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Horizontal-Est-6e506606c0.webp",
  crescent_1330_o: "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Oval_fundo-bra-b996b95d0b.webp",
  crescent_1330_v: "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Vertical_fundo-5fbe20475c.webp",
  crescent_770: "/products/CRESCENT---S_CRESCENT-770X330mm_Candeeiro-01_01-12486ec135.webp",

  eclipse_copper_0376: "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0376-copy_1-99d8e37972.webp",
  eclipse_copper_0380: "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0380-copy_1-ee41ea0c3c.webp",
  eclipse_copper_0395: "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0395-copy_1-a549ffef9b.webp",
  eclipse_silver_0337: "/products/ECLIPSE_Fundo_BRANCO_silver_Candeeiro-02_MV_0337_1-e925f86f8b.webp",
  eclipse_silver_0343: "/products/ECLIPSE_Fundo_BRANCO_silver_Candeeiro-02_MV_0343_1-15dc6599ce.webp",
  eclipse_silver_0304: "/products/ECLIPSE_Fundo_BRANCO_silver_candeeiro-01_MV_0304-75113120f1.webp",

  equilibrium_amb: "/products/EQUILIBRIUM_Equilibrium_Gibraltar_foto-ambiente-d561909279.webp",
  equilibrium_BRANCO_06_01_01: "/products/EQUILIBRIUM_Fundo_BRANCO_06_01_01_FB-c52dccae19.webp",
  equilibrium_BRANCO_06_02_02: "/products/EQUILIBRIUM_Fundo_BRANCO_06_02_02_FB-1380484faf.webp",
  equilibrium_BRANCO_06_02_04: "/products/EQUILIBRIUM_Fundo_BRANCO_06_02_04_FB-f0ae4e7955.webp",
  equilibrium_PRETO: "/products/EQUILIBRIUM_Fundo_PRETO_06_01_01_FP-43a9d577f5.webp",

  fireflies_BRANCO_01: "/products/FIREFLIES_Fundo_BRANCO_14_01_01_FB-be389ff9a2.webp",
  fireflies_BRANCO_02: "/products/FIREFLIES_Fundo_BRANCO_14_01_02_FB-d499e7453d.webp",
  fireflies_BRANCO_03: "/products/FIREFLIES_Fundo_BRANCO_14_01_03_FB-24e02f3d62.webp",
  fireflies_BRANCO_04: "/products/FIREFLIES_Fundo_BRANCO_14_01_04_FB-359839da1a.webp",
  fireflies_PRETO_01: "/products/FIREFLIES_Fundo_PRETO_14_01_01_FP-5e1ef8617b.webp",
  fireflies_PRETO_03: "/products/FIREFLIES_Fundo_PRETO_14_01_03_FP-851b2f0c1b.webp",

  gibraltar_amb: "/products/GIBRALTAR_Equilibrium_Gibraltar_foto-ambiente-0f37be0423.webp",
  gibraltar_1908: "/products/GIBRALTAR__MGL1908-2076b50b77.webp",
  gibraltar_1928: "/products/GIBRALTAR__MGL1928-c6a5c16625.webp",
  gibraltar_1944: "/products/GIBRALTAR__MGL1944-6ce3f4ec67.webp",
  gibraltar_1948: "/products/GIBRALTAR__MGL1948-905af42cf2.webp",
  gibraltar_1958: "/products/GIBRALTAR__MGL1958-86488d82d6.webp",

  halley_1545: "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1545-83941ad66a.webp",
  halley_1548: "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1548-7f794f0d05.webp",
  halley_1552: "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1552-6112983d32.webp",
  halley_2500: "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL2500-copy-aa578be52d.webp",
  halley_2557: "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL2557-copy-08d1c9e6cf.webp",

  horizon_BRANCO_01: "/products/HORIZON_Fundo_BRANCO_16_01_02_FB-95d445ec87.webp",
  horizon_BRANCO_02: "/products/HORIZON_Fundo_BRANCO_16_02_04_FB-37c6200ffc.webp",
  horizon_BRANCO_03: "/products/HORIZON_Fundo_BRANCO_16_03_03_FB-d27d1a6f38.webp",
  horizon_PRETO: "/products/HORIZON_Fundo_PRETO__MGL0462-feaa04fa7e.webp",

  hotspring_01: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-01_01-f3f538f873.webp",
  hotspring_02: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-02_01-d107d61c38.webp",
  hotspring_03: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-03_01-351270c93e.webp",
  hotspring_04: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-04_01-b215692b34.webp",
  hotspring_05: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-05_01-53066081dd.webp",
  hotspring_06: "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-06_01-14d2996be2.webp",

  island_BRANCO_01: "/products/ISLAND_Fundo_BRANCO_07_01_01_FB-2058bb9d73.webp",
  island_BRANCO_02: "/products/ISLAND_Fundo_BRANCO_07_02_02_FB-a8dd9f005f.webp",
  island_BRANCO_03: "/products/ISLAND_Fundo_BRANCO_07_02_04_FB-6db0a8007b.webp",
  island_PRETO_01: "/products/ISLAND_Fundo_PRETO_07_01_01_FP-5432cd5483.webp",
  island_PRETO_02: "/products/ISLAND_Fundo_PRETO_07_02_03_FP-8e5ac59496.webp",

  leaf_castanha_01: "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Castanha_Candeeiro-01_Com-Lu-3b1a4a97ab.webp",
  leaf_dourada_01: "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-38d774b0b2.webp",
  leaf_dourada_02: "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-4948745cfb.webp",
  leaf_dourada_03: "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-abc5443138.webp",

  marlin_3894: "/products/MARLIN__MGL3894-34f50ad3af.webp",
  marlin_3897: "/products/MARLIN__MGL3897-c5f892862a.webp",
  marlin_3906: "/products/MARLIN__MGL3906-eaad08d828.webp",
  marlin_3910: "/products/MARLIN__MGL3910-3616b71bf4.webp",
  marlin_3918: "/products/MARLIN__MGL3918-d72f8f56a5.webp",
  marlin_3928: "/products/MARLIN__MGL3928-ab91d62840.webp",

  olympia_BRANCO_1561: "/products/OLYMPIA_Fundo_BRANCO__MGL1561-8188616da7.webp",
  olympia_BRANCO_1562: "/products/OLYMPIA_Fundo_BRANCO__MGL1562-b36fbb95fb.webp",
  olympia_BRANCO_1566: "/products/OLYMPIA_Fundo_BRANCO__MGL1566-b75721294d.webp",
  olympia_PRETO_3092: "/products/OLYMPIA_Fundo_PRETO__MGL3092-copy-c99a1dd822.webp",
  olympia_PRETO_3110: "/products/OLYMPIA_Fundo_PRETO__MGL3110-copy-31bfa2746e.webp",

  shaleFlower_01: "/products/SHALE-COLLECTION_flower_Fundo_BRANCO_Candeeiro-01_Fundo-Bran-12d33c69f4.webp",
  shaleFlower_03_FP: "/products/SHALE-COLLECTION_flower_Fundo_PRETO_Candeeiro-03_09_01_01_FP-30f39d7461.webp",
  shaleRed_amb: "/products/SHALE-COLLECTION_red_05_Ambiente-1a60456151.webp",
  shaleGrey_01: "/products/SHALE-COLLECTION_grey_Fundo_BRANCO_Peca-01__MGL1247-6de5724685.webp",
  shaleSilver_01: "/products/SHALE-COLLECTION_silver_Fundo_BRANCO_Peca-01__MGL1307-f222b8c0ea.webp",

  shell_BRANCO_1443: "/products/SHELL_Fundo_BRANCO__MGL1443-4681c4db54.webp",
  shell_BRANCO_1450: "/products/SHELL_Fundo_BRANCO__MGL1450-f3057aabb8.webp",
  shell_BRANCO_1455: "/products/SHELL_Fundo_BRANCO__MGL1455-26cf0e7b47.webp",
  shell_PRETO_2103: "/products/SHELL_Fundo_PRETO__MGL2103-743be0476e.webp",
  shell_PRETO_2125: "/products/SHELL_Fundo_PRETO__MGL2125-34aa8893f9.webp",

  sideBySide_1521: "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1521-e8190a09d3.webp",
  sideBySide_1526: "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1526-72b316664c.webp",
  sideBySide_1528: "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1528-5a0bdf50dd.webp",
  sideBySide_1530: "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1530-31f11ce399.webp",
};

// AI path  →  real /products/ webp.
const MAP = {
  // ---------- Atelier interiors ----------
  "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp":
    P.equilibrium_amb,
  "/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s (1).webp":
    P.gibraltar_amb,

  // ---------- Cork oak trees (4) ----------
  "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_1.webp":
    P.shaleRed_amb,
  "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_2.webp":
    P.gibraltar_amb,
  "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_3.webp":
    P.equilibrium_amb,
  "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_4.webp":
    P.shaleRed_amb,

  // ---------- Cork sheets curing (2) ----------
  "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_1.webp":
    P.alexis_1032,
  "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_2.webp":
    P.alexis_1034,

  // ---------- Harvester hands with axe (3) ----------
  "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_1.webp":
    P.equilibrium_amb,
  "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_2.webp":
    P.gibraltar_amb,
  "/Slidel/Nano Banana 2 - Close-up of master cork harvester_s weathered hands gripping a curved axe against an_3.webp":
    P.shaleRed_amb,

  // ---------- Hands selecting amadia cork ----------
  "/Slidel/Nano Banana 2 - Close-up of hands selecting a piece of fine even amadia cork bark from a stack_ warm_1.webp":
    P.abyssBRANCO_15_01_01,

  // ---------- Two harvesters lifting bark (2) ----------
  "/Slidel/Nano Banana 2 - Two young harvesters carefully lifting the very first bark off a 25-year-old cork oa_1.webp":
    P.gibraltar_amb,
  "/Slidel/Nano Banana 2 - Two young harvesters carefully lifting the very first bark off a 25-year-old cork oa_2.webp":
    P.bond_9177,

  // ---------- Master artisan hand-sanding ----------
  "/Slidel/Nano Banana 2 - Mid-shot of a master artisan at a workbench hand-sanding a cork sculpture_ warm tung_1.webp":
    P.olympia_PRETO_3092,

  // ---------- Hands shaping cork sculpture (3) ----------
  "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_1.webp":
    P.eclipse_copper_0376,
  "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_2.webp":
    P.shell_PRETO_2103,
  "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_3.webp":
    P.shell_PRETO_2125,

  // ---------- Overhead workbench ----------
  "/Slidel/Nano Banana 2 - Overhead top-down view of an artisan workbench in low warm tungsten light_ hand tool_1.webp":
    P.alexis_1036,

  // ---------- Close-up macro of artisan stamping ----------
  "/Slidel/Nano Banana 2 - Close-up macro of an artisan_s hand pressing a hot brass numbering stamp onto a fini_1.webp":
    P.abyssPRETO_15_01_01,

  // ---------- Atelier doorway (2) ----------
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp":
    P.gibraltar_amb,
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_2.webp":
    P.equilibrium_amb,

  // ---------- Sculptural cork on matte black (5) ----------
  "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black.webp":
    P.eclipse_silver_0337,
  "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_1.webp":
    P.horizon_PRETO,
  "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_2.webp":
    P.olympia_PRETO_3110,
  "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_3.webp":
    P.shell_PRETO_2103,
  "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_4.webp":
    P.shell_PRETO_2125,

  // ---------- Single sculptural on marble pedestal (4) ----------
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_1.webp":
    P.scarPRETO_3061,
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_2.webp":
    P.abyssPRETO_15_01_01,
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_3.webp":
    P.island_PRETO_01,
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_4.webp":
    P.belize_PRETO_2199,

  // ---------- Horizontally laid sculptural lamp (4) ----------
  "/Slidel/Nano Banana 2 - A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_1.webp":
    P.crescent_1080,
  "/Slidel/Nano Banana 2 - A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_2.webp":
    P.crescent_1080b,
  "/Slidel/Nano Banana 2 - A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_3.webp":
    P.crescent_1330_h,
  "/Slidel/Nano Banana 2 - A horizontally laid sculptural lamp built from thin pressed strips of authenticcork_4.webp":
    P.crescent_770,

  // ---------- Large open vessel (4) ----------
  "/Slidel/Nano Banana 2 - A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_1.webp":
    P.abyssPRETO_15_02_02,
  "/Slidel/Nano Banana 2 - A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_2.webp":
    P.abyssBRANCO_15_02_02,
  "/Slidel/Nano Banana 2 - A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_3.webp":
    P.abyssBRANCO_15_02_04,
  "/Slidel/Nano Banana 2 - A large open vessel _ a piece of organic Portuguese cork bark with visiblenatural ai_4.webp":
    P.abyssBRANCO_15_01_01,

  // ---------- Editorial flat-lay (4) ----------
  "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_1.webp":
    P.alexis_1032,
  "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_2.webp":
    P.alexis_1034,
  "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_3.webp":
    P.alexis_1038,
  "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_4.webp":
    P.alexis_1040,

  // ---------- Macro cork bark (2) ----------
  "/Slidel/Nano Banana 2 - Extreme macro photograph of authentic Portuguese cork bark texture_ intricate ridged.webp":
    P.abyssPRETO_15_02_02,
  "/Slidel/Nano Banana 2 - Extreme macro photograph of authentic Portuguese cork bark texture_ intricate ridged (1).webp":
    P.abyssBRANCO_15_02_04,

  // ---------- /Slidel/enhance/ Tables (6) ----------
  "/Slidel/enhance/enhance-tables-01.webp": P.gibraltar_1908,
  "/Slidel/enhance/enhance-tables-02.webp": P.gibraltar_1928,
  "/Slidel/enhance/enhance-tables-03.webp": P.bond_9177,
  "/Slidel/enhance/enhance-tables-04.webp": P.gibraltar_amb,
  "/Slidel/enhance/enhance-tables-05.webp": P.alexis_1033 ?? P.alexis_1032,
  "/Slidel/enhance/enhance-tables-06.webp": P.bond_9181,

  // ---------- /Slidel/enhance/ Lighting (5) ----------
  "/Slidel/enhance/enhance-lighting-01.webp": P.crescent_1330_v,
  "/Slidel/enhance/enhance-lighting-02.webp": P.crescent_1330_h,
  "/Slidel/enhance/enhance-lighting-03.webp": P.eclipse_copper_0376,
  "/Slidel/enhance/enhance-lighting-04.webp": P.leaf_dourada_01,
  "/Slidel/enhance/enhance-lighting-05.webp": P.fireflies_BRANCO_02,

  // ---------- /Slidel/enhance/ Sculpture (6) ----------
  "/Slidel/enhance/enhance-sculpture-01.webp": P.abyssPRETO_15_01_01,
  "/Slidel/enhance/enhance-sculpture-02.webp": P.abyssPRETO_15_02_02,
  "/Slidel/enhance/enhance-sculpture-03.webp": P.shell_PRETO_2103,
  "/Slidel/enhance/enhance-sculpture-04.webp": P.abyssBRANCO_15_02_02,
  "/Slidel/enhance/enhance-sculpture-05.webp": P.scarPRETO_3061,
  "/Slidel/enhance/enhance-sculpture-06.webp": P.island_PRETO_01,

  // ---------- /Slidel/enhance/ Carré d'Or (8) ----------
  "/Slidel/enhance/enhance-carre-dor-01.webp": P.carreDor_1481,
  "/Slidel/enhance/enhance-carre-dor-02.webp": P.carreDor_1488,
  "/Slidel/enhance/enhance-carre-dor-03.webp": P.carreDor_1494,
  "/Slidel/enhance/enhance-carre-dor-04.webp": P.carreDor_1500,
  "/Slidel/enhance/enhance-carre-dor-05.webp": P.carreDor_pormenor,
  "/Slidel/enhance/enhance-carre-dor-06.webp": P.carreDor_1481,
  "/Slidel/enhance/enhance-carre-dor-07.webp": P.carreDor_1488,
  "/Slidel/enhance/enhance-carre-dor-08.webp": P.carreDor_1494,

  // ---------- /Slidel/enhance/ Fine Arts (7) ----------
  "/Slidel/enhance/enhance-fine-arts-01.webp": P.sideBySide_1521,
  "/Slidel/enhance/enhance-fine-arts-02.webp": P.sideBySide_1526,
  "/Slidel/enhance/enhance-fine-arts-03.webp": P.halley_2500,
  "/Slidel/enhance/enhance-fine-arts-04.webp": P.sideBySide_1528,
  "/Slidel/enhance/enhance-fine-arts-05.webp": P.halley_2557,
  "/Slidel/enhance/enhance-fine-arts-06.webp": P.halley_1545,
  "/Slidel/enhance/enhance-fine-arts-07.webp": P.sideBySide_1530,

  // ---------- /Slidel/enhance/ Misc (52) ----------
  "/Slidel/enhance/enhance-misc-01.webp": P.alexis_1036,
  "/Slidel/enhance/enhance-misc-02.webp": P.crescent_770,
  "/Slidel/enhance/enhance-misc-03.webp": P.crescent_1330_v,
  "/Slidel/enhance/enhance-misc-04.webp": P.crescent_1330_o,
  "/Slidel/enhance/enhance-misc-05.webp": P.alexis_1038,
  "/Slidel/enhance/enhance-misc-06.webp": P.alexis_1040,
  "/Slidel/enhance/enhance-misc-07.webp": P.marlin_3897,
  "/Slidel/enhance/enhance-misc-08.webp": P.crescent_1080,
  "/Slidel/enhance/enhance-misc-09.webp": P.marlin_3906,
  "/Slidel/enhance/enhance-misc-10.webp": P.hotspring_01,
  "/Slidel/enhance/enhance-misc-11.webp": P.hotspring_02,
  "/Slidel/enhance/enhance-misc-12.webp": P.fireflies_PRETO_01,
  "/Slidel/enhance/enhance-misc-13.webp": P.fireflies_PRETO_03,
  "/Slidel/enhance/enhance-misc-14.webp": P.marlin_3910,
  "/Slidel/enhance/enhance-misc-15.webp": P.marlin_3894,
  "/Slidel/enhance/enhance-misc-16.webp": P.marlin_3918,
  "/Slidel/enhance/enhance-misc-17.webp": P.marlin_3928,
  "/Slidel/enhance/enhance-misc-18.webp": P.hotspring_03,
  "/Slidel/enhance/enhance-misc-19.webp": P.marlin_3897,
  "/Slidel/enhance/enhance-misc-20.webp": P.belize_PRETO_2180,
  "/Slidel/enhance/enhance-misc-21.webp": P.belize_PRETO_2199,
  "/Slidel/enhance/enhance-misc-22.webp": P.crescent_1330_h,
  "/Slidel/enhance/enhance-misc-23.webp": P.marlin_3906,
  "/Slidel/enhance/enhance-misc-24.webp": P.belize_BRANCO_1421,
  "/Slidel/enhance/enhance-misc-25.webp": P.belize_BRANCO_1430,
  "/Slidel/enhance/enhance-misc-26.webp": P.belize_BRANCO_1410,
  "/Slidel/enhance/enhance-misc-27.webp": P.belize_BRANCO_1421,
  "/Slidel/enhance/enhance-misc-28.webp": P.belize_PRETO_2199,
  "/Slidel/enhance/enhance-misc-29.webp": P.belize_PRETO_2180,
  "/Slidel/enhance/enhance-misc-30.webp": P.hotspring_04,
  "/Slidel/enhance/enhance-misc-31.webp": P.horizon_BRANCO_01,
  "/Slidel/enhance/enhance-misc-32.webp": P.horizon_BRANCO_02,
  "/Slidel/enhance/enhance-misc-33.webp": P.olympia_PRETO_3092,
  "/Slidel/enhance/enhance-misc-34.webp": P.olympia_PRETO_3110,
  "/Slidel/enhance/enhance-misc-35.webp": P.hotspring_05,
  "/Slidel/enhance/enhance-misc-36.webp": P.hotspring_06,
  "/Slidel/enhance/enhance-misc-37.webp": P.olympia_BRANCO_1561,
  "/Slidel/enhance/enhance-misc-38.webp": P.olympia_BRANCO_1566,
  "/Slidel/enhance/enhance-misc-39.webp": P.scarBRANCO,
  "/Slidel/enhance/enhance-misc-40.webp": P.crescent_1330_v,
  "/Slidel/enhance/enhance-misc-41.webp": P.scarPRETO_3061,
  "/Slidel/enhance/enhance-misc-42.webp": P.scarPRETO_3075,
  "/Slidel/enhance/enhance-misc-43.webp": P.eclipse_silver_0343,
  "/Slidel/enhance/enhance-misc-44.webp": P.eclipse_silver_0304,
  "/Slidel/enhance/enhance-misc-45.webp": P.bond_9181,
  "/Slidel/enhance/enhance-misc-46.webp": P.bond_9186,
  "/Slidel/enhance/enhance-misc-47.webp": P.bond_9188,
  "/Slidel/enhance/enhance-misc-48.webp": P.bond_9193,
  "/Slidel/enhance/enhance-misc-49.webp": P.bond_9195,
  "/Slidel/enhance/enhance-misc-50.webp": P.shell_PRETO_2125,
  "/Slidel/enhance/enhance-misc-51.webp": P.shell_BRANCO_1443,
  "/Slidel/enhance/enhance-misc-52.webp": P.shell_BRANCO_1450,
};

// Also clean up any intermediate /FOTOS PRODUTO/ paths that may have
// been left by an earlier run of this script — point them at /products/.
const FOTOS_TO_PRODUCTS = {
  "/FOTOS PRODUTO/EQUILIBRIUM/Equilibrium_Gibraltar_foto ambiente.jpg": P.equilibrium_amb,
  "/FOTOS PRODUTO/CRESCENT ' S/CRESCENT 1200x450mm/Crescent_imagem ambiente.jpg": P.gibraltar_amb,
  "/FOTOS PRODUTO/CRESCENT ' S/CRESCENT 1200x450mm/Crescent_foto ambiente.jpg": P.gibraltar_amb,
  "/FOTOS PRODUTO/SHALE COLLECTION_red/05_Ambiente.jpg": P.shaleRed_amb,
  "/FOTOS PRODUTO/FIREFLIES/Fundo Ambiente/14_ambiente_01.jpg": P.fireflies_BRANCO_01,
  "/FOTOS PRODUTO/FIREFLIES/Fundo Ambiente/14_ambiente_02.jpg": P.fireflies_BRANCO_02,
  "/FOTOS PRODUTO/FIREFLIES/Fundo Ambiente/14_ambiente_03.jpg": P.fireflies_BRANCO_03,
  "/FOTOS PRODUTO/FIREFLIES/Fundo Ambiente/14_ambiente_04.jpg": P.fireflies_BRANCO_04,
  "/FOTOS PRODUTO/ALEXIS/montagem revista.jpg": P.alexis_1032,
  "/FOTOS PRODUTO/ALEXIS/montagem revista sildel.jpg": P.alexis_1034,
  "/FOTOS PRODUTO/ALEXIS/MV_1032.jpg": P.alexis_1032,
  "/FOTOS PRODUTO/ALEXIS/MV_1033.jpg": P.alexis_1034,
  "/FOTOS PRODUTO/ALEXIS/MV_1034.jpg": P.alexis_1034,
  "/FOTOS PRODUTO/ALEXIS/MV_1037.jpg": P.alexis_1036,
  "/FOTOS PRODUTO/ALEXIS/MV_1038.jpg": P.alexis_1038,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/Peças separadas/peca 01_FP.jpg": P.abyssPRETO_15_01_01,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/Peças separadas/peca 02_FP.jpg": P.abyssPRETO_15_02_02,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/Peças separadas/peca 03_FP.jpg": P.abyssPRETO_15_01_01,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/15.01.01_FP.jpg": P.abyssPRETO_15_01_01,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/15.02.01_FP.jpg": P.abyssPRETO_15_02_02,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/15.02.02_FP.jpg": P.abyssPRETO_15_02_02,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/15.02.03_FP.jpg": P.abyssBRANCO_15_02_02,
  "/FOTOS PRODUTO/ABYSS/Fundo_PRETO/15.02.04_FP.jpg": P.abyssBRANCO_15_02_04,
  "/FOTOS PRODUTO/SHELL/Fundo_PRETO/_MGL2103.jpg": P.shell_PRETO_2103,
  "/FOTOS PRODUTO/SHELL/Fundo_PRETO/_MGL2104.jpg": P.shell_PRETO_2125,
  "/FOTOS PRODUTO/SHELL/Fundo_PRETO/_MGL2113.jpg": P.shell_PRETO_2103,
  "/FOTOS PRODUTO/SHELL/Fundo_PRETO/_MGL2115.jpg": P.shell_PRETO_2125,
  "/FOTOS PRODUTO/OLYMPIA/Fundo_PRETO/_MGL3092 copy.jpg": P.olympia_PRETO_3092,
  "/FOTOS PRODUTO/OLYMPIA/Fundo_PRETO/_MGL3104 copy.jpg": P.olympia_PRETO_3110,
  "/FOTOS PRODUTO/OLYMPIA/Fundo_PRETO/_MGL3110 copy.jpg": P.olympia_PRETO_3110,
  "/FOTOS PRODUTO/OLYMPIA/Fundo_PRETO/_MGL3117 copy.jpg": P.olympia_PRETO_3092,
  "/FOTOS PRODUTO/HORIZON/Fundo_PRETO/16_01_02_FP.jpg": P.horizon_PRETO,
  "/FOTOS PRODUTO/HORIZON/Fundo_PRETO/16_01_04_FP.jpg": P.horizon_BRANCO_01,
  "/FOTOS PRODUTO/HORIZON/Fundo_PRETO/16_02_04_FP.jpg": P.horizon_BRANCO_02,
  "/FOTOS PRODUTO/CARRÉ D'OR fp/Fundo_PRETO/Horizontal/MV_1008.jpg": P.carreDor_1481,
  "/FOTOS PRODUTO/CARRÉ D'OR fp/Fundo_PRETO/Horizontal/MV_1010.jpg": P.carreDor_1488,
  "/FOTOS PRODUTO/CARRÉ D'OR fp/Fundo_PRETO/Horizontal/MV_1012.jpg": P.carreDor_1494,
  "/FOTOS PRODUTO/CARRÉ D'OR fp/Fundo_PRETO/Horizontal/MV_1014.jpg": P.carreDor_1500,
  "/FOTOS PRODUTO/CARRÉ D'OR fp/Foto pormenor.jpg": P.carreDor_pormenor,
  "/FOTOS PRODUTO/ECLIPSE/Fundo_PRETO/copper/Candeeiro 01/MV_0376 copy.jpg": P.eclipse_copper_0376,
  "/FOTOS PRODUTO/ECLIPSE/Fundo_PRETO/silver/Candeeiro 02/MV_0337.jpg": P.eclipse_silver_0337,
  "/FOTOS PRODUTO/ECLIPSE/Fundo_PRETO/silver/Candeeiro 02/MV_0338.jpg": P.eclipse_silver_0343,
  "/FOTOS PRODUTO/ECLIPSE/Fundo_PRETO/silver/Candeeiro 02/MV_0342.jpg": P.eclipse_silver_0304,
  "/FOTOS PRODUTO/BOND/_MGL9177.jpg": P.bond_9177,
  "/FOTOS PRODUTO/BOND/_MGL9181.jpg": P.bond_9181,
  "/FOTOS PRODUTO/BOND/_MGL9186.jpg": P.bond_9186,
  "/FOTOS PRODUTO/BOND/_MGL9188.jpg": P.bond_9188,
  "/FOTOS PRODUTO/BOND/_MGL9193.jpg": P.bond_9193,
  "/FOTOS PRODUTO/BOND/_MGL9195.jpg": P.bond_9195,
  "/FOTOS PRODUTO/GIBRALTAR/_MGL1908.jpg": P.gibraltar_1908,
  "/FOTOS PRODUTO/GIBRALTAR/_MGL1928.jpg": P.gibraltar_1928,
  "/FOTOS PRODUTO/GIBRALTAR/Equilibrium_Gibraltar_foto ambiente.jpg": P.gibraltar_amb,
  "/FOTOS PRODUTO/MARLIN/_MGL3894.jpg": P.marlin_3894,
  "/FOTOS PRODUTO/MARLIN/_MGL3896.jpg": P.marlin_3897,
  "/FOTOS PRODUTO/MARLIN/_MGL3897.jpg": P.marlin_3897,
  "/FOTOS PRODUTO/MARLIN/_MGL3900.jpg": P.marlin_3906,
  "/FOTOS PRODUTO/MARLIN/_MGL3906.jpg": P.marlin_3906,
  "/FOTOS PRODUTO/MARLIN/_MGL3909.jpg": P.marlin_3910,
  "/FOTOS PRODUTO/MARLIN/_MGL3910.jpg": P.marlin_3910,
  "/FOTOS PRODUTO/MARLIN/_MGL3913.jpg": P.marlin_3918,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2175.jpg": P.belize_PRETO_2180,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2180.jpg": P.belize_PRETO_2180,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2184.jpg": P.belize_PRETO_2199,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2192.jpg": P.belize_PRETO_2199,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2199.jpg": P.belize_PRETO_2199,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2202.jpg": P.belize_PRETO_2180,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2205.jpg": P.belize_PRETO_2199,
  "/FOTOS PRODUTO/BELIZE fp/Fundo_PRETO/_MGL2209.jpg": P.belize_PRETO_2180,
  "/FOTOS PRODUTO/ÓSCAR/Fundo_PRETO/_MGL3056.jpg": P.scarPRETO_3061,
  "/FOTOS PRODUTO/ÓSCAR/Fundo_PRETO/_MGL3061.jpg": P.scarPRETO_3061,
  "/FOTOS PRODUTO/ÓSCAR/Fundo_PRETO/_MGL3063.jpg": P.scarPRETO_3075,
  "/FOTOS PRODUTO/ÓSCAR/Fundo_PRETO/_MGL3067.jpg": P.scarPRETO_3075,
  "/FOTOS PRODUTO/ISLAND/Fundo_PRETO/07_01_01_FP.jpg": P.island_PRETO_01,
  "/FOTOS PRODUTO/SIDE by SIDE/Fundo_PRETO/Lado A/01.jpg": P.sideBySide_1521,
  "/FOTOS PRODUTO/SIDE by SIDE/Fundo_PRETO/Lado A/02.jpg": P.sideBySide_1526,
  "/FOTOS PRODUTO/SIDE by SIDE/Fundo_PRETO/Lado A/03.jpg": P.sideBySide_1528,
  "/FOTOS PRODUTO/SIDE by SIDE/Fundo_PRETO/Lado A/04.jpg": P.sideBySide_1530,
  "/FOTOS PRODUTO/HALLEY 600X300mm/Fundo_PRETO/lado A/_MGL2500.jpg": P.halley_2500,
  "/FOTOS PRODUTO/HALLEY 600X300mm/Fundo_PRETO/lado A/_MGL2506.jpg": P.halley_2557,
  "/FOTOS PRODUTO/HALLEY 600X300mm/Fundo_PRETO/lado A/_MGL2512.jpg": P.halley_1545,
  "/FOTOS PRODUTO/HOT SPRING COLLECTION/Fundo_PRETO_Conj 10/candeeiro 01_01.jpg": P.hotspring_01,
  "/FOTOS PRODUTO/HOT SPRING COLLECTION/Fundo_PRETO_Conj 10/candeeiro 01_02.jpg": P.hotspring_02,
  "/FOTOS PRODUTO/HOT SPRING COLLECTION/Fundo_PRETO_Conj 10/candeeiro 02_01.jpg": P.hotspring_03,
  "/FOTOS PRODUTO/HOT SPRING COLLECTION/Fundo_PRETO_Conj 10/candeeiro 02_02.jpg": P.hotspring_04,
  "/FOTOS PRODUTO/LEAF COLLECTION/Fundo_PRETO/Cor Dourada/Candeeiro 01/Com Luz/_MGL2957.jpg": P.leaf_dourada_01,
  "/FOTOS PRODUTO/CRESCENT ' S/CRESCENT 1200x450mm/horizontal 03_com luz.jpg": P.crescent_1330_h,
  "/FOTOS PRODUTO/CRESCENT ' S/CRESCENT 1200x450mm/horizontal 04_com luz.jpg": P.crescent_770,
  "/FOTOS PRODUTO/CRESCENT ' S/CRESCENT 1200x450mm/vertical 01_com luz.jpg": P.crescent_1330_v,
  "/FOTOS PRODUTO/CRESCENT ' S/CRESCENT 1200x450mm/vertical 02_com luz.jpg": P.crescent_1330_o,
};

const ALL = { ...MAP, ...FOTOS_TO_PRODUCTS };

const EXTENSIONS = /\.(ts|tsx|js|jsx|json|md|mdx|css)$/;
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build", "scripts"]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXTENSIONS.test(e.name)) out.push(p);
  }
  return out;
}

const ROOT = process.argv[2] || "src";
const files = walk(ROOT);
const summary = { filesScanned: files.length, filesChanged: 0, totalReplacements: 0 };

for (const f of files) {
  let content = fs.readFileSync(f, "utf8");
  const before = content;
  for (const [oldPath, newPath] of Object.entries(ALL)) {
    if (!content.includes(oldPath)) continue;
    const count = content.split(oldPath).length - 1;
    content = content.split(oldPath).join(newPath);
    summary.totalReplacements += count;
  }
  if (content !== before) {
    fs.writeFileSync(f, content);
    summary.filesChanged++;
    console.log("UPDATED:", f);
  }
}
console.log("\n--- SUMMARY ---");
console.log("Files scanned:", summary.filesScanned);
console.log("Files changed:", summary.filesChanged);
console.log("Total replacements:", summary.totalReplacements);