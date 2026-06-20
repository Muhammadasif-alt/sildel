import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

/**
 * "Where it lives" — per-product context strip. Each product pulls a
 * curated 5-shot mosaic from the real client product photography in
 * /public/products/. Products without a dedicated set fall back to a
 * category-level mix so the strip is never empty or mismatched.
 */

// Map the old enhance-* slugs to real /products/ webp so the per-product
// lists below stay readable. Same five shots may legitimately repeat
// across products — these are atelier context, not unique hero frames.
const ENHANCE_TO_REAL: Record<string, string> = {
  "enhance-tables-01": "/products/GIBRALTAR__MGL1908-2076b50b77.webp",
  "enhance-tables-02": "/products/GIBRALTAR__MGL1928-c6a5c16625.webp",
  "enhance-tables-03": "/products/BOND__MGL9177-60b23d261e.webp",
  "enhance-tables-04": "/products/GIBRALTAR_Equilibrium_Gibraltar_foto-ambiente-0f37be0423.webp",
  "enhance-tables-05": "/products/ALEXIS_MV_1034-a8aaa5f9e8.webp",
  "enhance-tables-06": "/products/BOND__MGL9181-67a8da8ab3.webp",

  "enhance-lighting-01": "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Vertical_fundo-5fbe20475c.webp",
  "enhance-lighting-02": "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Horizontal-Est-6e506606c0.webp",
  "enhance-lighting-03": "/products/ECLIPSE_Fundo_BRANCO_copper_Candeeiro-01_MV_0376-copy_1-99d8e37972.webp",
  "enhance-lighting-04": "/products/LEAF-COLLECTION_Fundo_PRETO_Cor-Dourada_Candeeiro-01_Com-Luz-38d774b0b2.webp",
  "enhance-lighting-05": "/products/FIREFLIES_Fundo_BRANCO_14_01_02_FB-d499e7453d.webp",

  "enhance-sculpture-01": "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp",
  "enhance-sculpture-02": "/products/ABYSS_Fundo_PRETO_15.02.02_FP-ac8a4e1aa0.webp",
  "enhance-sculpture-03": "/products/SHELL_Fundo_PRETO__MGL2103-743be0476e.webp",
  "enhance-sculpture-04": "/products/ABYSS_Fundo_BRANCO_15.02.02_FB-aa1ad105fa.webp",
  "enhance-sculpture-05": "/products/-SCAR_Fundo_PRETO__MGL3061-de1ed8741d.webp",
  "enhance-sculpture-06": "/products/ISLAND_Fundo_PRETO_07_01_01_FP-5432cd5483.webp",

  "enhance-carre-dor-01": "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1481-fe89adcd19.webp",
  "enhance-carre-dor-02": "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1488-2721bf9ad5.webp",
  "enhance-carre-dor-03": "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1494-e73b3ecee6.webp",
  "enhance-carre-dor-04": "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1500-2c187a51db.webp",
  "enhance-carre-dor-05": "/products/CARR--D-OR-fp_Foto-pormenor-2ecd733ad3.webp",
  "enhance-carre-dor-06": "/products/CARR--D-OR-fp_Fundo_BRANCO__MGL1481-fe89adcd19.webp",

  "enhance-fine-arts-01": "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1521-e8190a09d3.webp",
  "enhance-fine-arts-02": "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1526-72b316664c.webp",
  "enhance-fine-arts-03": "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL2500-copy-aa578be52d.webp",
  "enhance-fine-arts-04": "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1528-5a0bdf50dd.webp",
  "enhance-fine-arts-05": "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL2557-copy-08d1c9e6cf.webp",
  "enhance-fine-arts-06": "/products/HALLEY-600X300mm_Fundo_BRANCO__MGL1545-83941ad66a.webp",
  "enhance-fine-arts-07": "/products/SIDE-by-SIDE_Fundo_BRANCO__MGL1530-31f11ce399.webp",

  "enhance-misc-01": "/products/ALEXIS_MV_1036-769ae6c3e3.webp",
  "enhance-misc-02": "/products/CRESCENT---S_CRESCENT-770X330mm_Candeeiro-01_01-12486ec135.webp",
  "enhance-misc-05": "/products/ALEXIS_MV_1038-2d506fd45f.webp",
  "enhance-misc-08": "/products/CRESCENT---S_CRESCENT-1080X300mm_Candeeiro-02_01-c0820e0484.webp",
  "enhance-misc-10": "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-01_01-f3f538f873.webp",
  "enhance-misc-12": "/products/FIREFLIES_Fundo_PRETO_14_01_01_FP-5e1ef8617b.webp",
  "enhance-misc-15": "/products/MARLIN__MGL3894-34f50ad3af.webp",
  "enhance-misc-18": "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-03_01-351270c93e.webp",
  "enhance-misc-20": "/products/BELIZE-fp_Fundo_PRETO__MGL2180-262f640287.webp",
  "enhance-misc-22": "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Horizontal-Est-6e506606c0.webp",
  "enhance-misc-28": "/products/BELIZE-fp_Fundo_PRETO__MGL2199-0252056e07.webp",
  "enhance-misc-30": "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-04_01-b215692b34.webp",
  "enhance-misc-35": "/products/HOT-SPRING-COLLECTION_Fundo_PRETO_Conj-10_candeeiro-05_01-53066081dd.webp",
  "enhance-misc-40": "/products/CRESCENT---S_CRESCENT-1330x300mm_Fundo-Branco_Vertical_fundo-5fbe20475c.webp",
  "enhance-misc-45": "/products/BOND__MGL9181-67a8da8ab3.webp",
};

const e = (n: string): string =>
  ENHANCE_TO_REAL[n] ?? "/products/ABYSS_Fundo_PRETO_15.01.01_FP-54d7c855c4.webp";

const USE_CASES_BY_SLUG: Record<string, string[]> = {
  // ────── Sculpture
  abyss: [
    e("enhance-sculpture-01"),
    e("enhance-sculpture-05"),
    e("enhance-sculpture-02"),
    e("enhance-sculpture-04"),
    e("enhance-sculpture-06"),
  ],
  shell: [
    e("enhance-sculpture-06"),
    e("enhance-sculpture-04"),
    e("enhance-misc-20"),
    e("enhance-misc-28"),
    e("enhance-sculpture-02"),
  ],
  island: [
    e("enhance-sculpture-04"),
    e("enhance-sculpture-05"),
    e("enhance-misc-20"),
    e("enhance-misc-28"),
    e("enhance-sculpture-06"),
  ],
  "hot-spring": [
    e("enhance-misc-10"),
    e("enhance-misc-35"),
    e("enhance-sculpture-05"),
    e("enhance-misc-15"),
    e("enhance-sculpture-06"),
  ],
  fireflies: [
    e("enhance-misc-12"),
    e("enhance-misc-08"),
    e("enhance-lighting-02"),
    e("enhance-misc-30"),
    e("enhance-lighting-05"),
  ],
  marlin: [
    e("enhance-misc-15"),
    e("enhance-sculpture-06"),
    e("enhance-sculpture-05"),
    e("enhance-misc-20"),
    e("enhance-sculpture-04"),
  ],
  equilibrium: [
    e("enhance-misc-28"),
    e("enhance-sculpture-05"),
    e("enhance-misc-20"),
    e("enhance-sculpture-06"),
    e("enhance-sculpture-02"),
  ],
  belize: [
    e("enhance-misc-20"),
    e("enhance-sculpture-06"),
    e("enhance-misc-28"),
    e("enhance-sculpture-04"),
    e("enhance-sculpture-05"),
  ],

  // ────── Tables
  gibraltar: [
    e("enhance-tables-04"),
    e("enhance-tables-01"),
    e("enhance-tables-02"),
    e("enhance-tables-03"),
    e("enhance-tables-05"),
  ],
  alexis: [
    e("enhance-misc-01"),
    e("enhance-misc-45"),
    e("enhance-tables-02"),
    e("enhance-tables-04"),
    e("enhance-tables-01"),
  ],
  bond: [
    e("enhance-misc-45"),
    e("enhance-misc-01"),
    e("enhance-tables-01"),
    e("enhance-tables-06"),
    e("enhance-tables-03"),
  ],
  granada: [
    e("enhance-tables-05"),
    e("enhance-tables-04"),
    e("enhance-tables-02"),
    e("enhance-tables-06"),
    e("enhance-tables-01"),
  ],

  // ────── Lighting
  crescent: [
    e("enhance-lighting-02"),
    e("enhance-lighting-01"),
    e("enhance-lighting-03"),
    e("enhance-misc-02"),
    e("enhance-misc-22"),
  ],
  vitavele: [
    e("enhance-misc-08"),
    e("enhance-misc-40"),
    e("enhance-lighting-04"),
    e("enhance-lighting-05"),
    e("enhance-misc-12"),
  ],

  // ────── Fine Arts
  "carre-dor": [
    e("enhance-carre-dor-01"),
    e("enhance-carre-dor-02"),
    e("enhance-carre-dor-04"),
    e("enhance-carre-dor-05"),
    e("enhance-carre-dor-06"),
  ],
  "side-by-side": [
    e("enhance-fine-arts-01"),
    e("enhance-fine-arts-02"),
    e("enhance-fine-arts-04"),
    e("enhance-fine-arts-05"),
    e("enhance-fine-arts-07"),
  ],
  halley: [
    e("enhance-fine-arts-03"),
    e("enhance-fine-arts-05"),
    e("enhance-fine-arts-04"),
    e("enhance-fine-arts-06"),
    e("enhance-fine-arts-01"),
  ],
  bonfire: [
    e("enhance-misc-18"),
    e("enhance-misc-12"),
    e("enhance-misc-08"),
    e("enhance-lighting-02"),
    e("enhance-fine-arts-05"),
  ],
};

const CATEGORY_FALLBACK: Record<string, string[]> = {
  Sculpture: [
    e("enhance-sculpture-01"),
    e("enhance-sculpture-04"),
    e("enhance-sculpture-05"),
    e("enhance-misc-20"),
    e("enhance-misc-28"),
  ],
  Tables: [
    e("enhance-tables-01"),
    e("enhance-tables-02"),
    e("enhance-tables-04"),
    e("enhance-tables-05"),
    e("enhance-misc-01"),
  ],
  Lighting: [
    e("enhance-lighting-01"),
    e("enhance-lighting-03"),
    e("enhance-misc-02"),
    e("enhance-misc-05"),
    e("enhance-misc-08"),
  ],
  "Fine Arts": [
    e("enhance-fine-arts-01"),
    e("enhance-fine-arts-03"),
    e("enhance-fine-arts-05"),
    e("enhance-fine-arts-06"),
    e("enhance-carre-dor-01"),
  ],
};

function imagesFor(slug: string, category: string): string[] {
  return (
    USE_CASES_BY_SLUG[slug] ??
    CATEGORY_FALLBACK[category] ??
    CATEGORY_FALLBACK.Sculpture
  );
}

export function UseCases({
  locale,
  productName,
  slug,
  category,
}: {
  locale: Locale;
  productName: string;
  slug: string;
  category: string;
}) {
  const isPt = locale === "pt";
  const t = isPt
    ? {
        eyebrow: "No seu espaço",
        title: "Onde",
        titleAccent: "vive.",
        body: "Um vislumbre de como uma peça Sildel se instala num espaço — escultura, luz e luxo discreto.",
      }
    : {
        eyebrow: "In your space",
        title: "Where it",
        titleAccent: "lives.",
        body: "A glimpse of how a Sildel piece settles into a room — sculpture, light, and quiet luxury.",
      };

  const images = imagesFor(slug, category);

  return (
    <section
      aria-labelledby="use-cases-heading"
      className="relative w-full bg-background border-t border-border/60"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-5">
            {t.eyebrow}
          </p>
          <h2
            id="use-cases-heading"
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05]"
          >
            {t.title} <span className="italic text-primary">{t.titleAccent}</span>
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
            {t.body}
          </p>
        </div>

        {/* Editorial mosaic — a large feature image anchors the composition,
            with the rest woven around it. Never a flat row of five.
            Mobile: feature spans full width, the other four pair up.
            lg: 3-col grid where the feature occupies a 2×2 block. */}
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 lg:auto-rows-[260px]">
          {images.map((src, i) => (
            <li
              key={`${src}-${i}`}
              className={[
                "group relative overflow-hidden border border-border/60 bg-muted",
                "aspect-[4/5] lg:aspect-auto",
                i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : "",
                i === 4 ? "lg:col-span-2" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={src}
                alt={`${productName} — ${isPt ? "em contexto" : "in context"} ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 40vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}