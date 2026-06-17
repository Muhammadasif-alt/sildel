import Image from "next/image";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Brand Story — prodigy framing (founder direction, June 2026).
 * Isabel didn't "come" to cork — she grew up close to it. Thirty years
 * working a single material, only with her hands. Differentiates the
 * brand by leading with intimacy and an explicit refusal of the
 * industrial/composite cork that dominates the market.
 *
 * Layout: 45/55 — Isabel portrait left, editorial copy + pull-quote
 * right. Pull-quote uses the verbatim Luxuri Magazine listing line
 * (already approved by Isabel for the awards detail page).
 */
export function BrandStoryProdigy({ locale }: { locale: Locale }) {
  const { brandStoryProdigy: data } = getHome(locale);

  return (
    <section
      aria-labelledby="brand-story-prodigy-heading"
      className="relative w-full border-t border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* Portrait — square crop with a hairline gold border so the
              face reads as a museum plate rather than a hero photo. */}
          <ScrollReveal direction="left">
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/30"
              />
            </div>
          </ScrollReveal>

          {/* Copy column */}
          <ScrollReveal delay={0.15} className="max-w-xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-primary">
              {data.eyebrow}
            </p>
            <h2
              id="brand-story-prodigy-heading"
              className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-[3.25rem]"
            >
              {data.title}{" "}
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-foreground/90 md:text-xl">
              {data.leadParagraph}
            </p>

            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground md:text-[16.5px]">
              {data.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Pull-quote — left-rule, serif italic. Isabel's own words
                from the Luxuri Magazine listing (already public). */}
            <blockquote className="mt-10 border-l-2 border-primary/60 pl-6 font-serif text-lg italic leading-relaxed text-foreground/85 md:text-xl">
              &ldquo;{data.quote}&rdquo;
              <footer className="mt-4 not-italic text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                — {data.quoteAttribution}
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}