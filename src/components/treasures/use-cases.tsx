import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

/**
 * "Where it lives" — per-product context strip. Founder direction (June 2026):
 * the same 5 generic Nano-Banana shots used to appear on every product,
 * which made every detail page read identically. Each product now pulls
 * its own contextual atelier renders from /Slidel/enhance/.
 *
 * Products without a dedicated enhance series fall back to a curated
 * 5-shot set picked per category, so the strip never looks empty or
 * mismatched.
 */

const e = (n: string) => `/Slidel/enhance/${n}.webp`;

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