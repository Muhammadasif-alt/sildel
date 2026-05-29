import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

/**
 * "Where it lives" — a use-cases strip on each product page showing the
 * piece in context. For now it uses the existing Nano Banana renders as
 * placeholders; swap these for per-product AI/lifestyle shots later.
 */
const USE_CASE_IMAGES = [
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_1.webp",
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_3.webp",
  "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_1.webp",
  "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_2.webp",
  "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_4.webp",
];

export function UseCases({
  locale,
  productName,
}: {
  locale: Locale;
  productName: string;
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

        {/* 5-image grid — 2-up on mobile, 3-up on md, 5-up on lg. */}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {USE_CASE_IMAGES.map((src, i) => (
            <li
              key={i}
              className={
                // First image takes a wider/taller feature cell on larger screens.
                i === 0 ? "col-span-2 md:col-span-1" : ""
              }
            >
              <div className="group relative aspect-[3/4] w-full overflow-hidden border border-border/60 bg-muted">
                <Image
                  src={src}
                  alt={`${productName} — ${isPt ? "em contexto" : "in context"} ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}