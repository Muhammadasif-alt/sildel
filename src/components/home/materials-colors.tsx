import { cn } from "@/lib/utils";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Materials / Colors — founder direction (June 2026). Four cork
 * tonalities surfaced as a primary brand statement on the home page,
 * with Silver positioned as the signature USP (2–3 years of Atlantic
 * weather earn the bark a luminous metal patina no machine can fake).
 *
 * Visual language follows the Van Cleef material-page restraint:
 * generous whitespace, square swatches in actual cork colours, a
 * single editorial pull-out beneath that elevates Silver as the
 * narrative anchor. No images required — the colour itself is the
 * subject, with a soft directional gradient + grain to suggest the
 * bark's surface without faking texture.
 */
export function MaterialsColors({ locale }: { locale: Locale }) {
  const { materialsColors: data } = getHome(locale);

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="relative w-full border-t border-border/60 bg-background scroll-mt-24"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-24 lg:py-32">
        {/* Header — quiet, centred Van-Cleef-style */}
        <ScrollReveal className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-primary">
            {data.eyebrow}
          </p>
          <h2
            id="materials-heading"
            className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-6xl"
          >
            {data.title}{" "}
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {data.body}
          </p>
        </ScrollReveal>

        {/* Four-up colour grid — square swatches, generous gap. The Silver
            card is marked with a `Signature` badge so the eye lands there
            even before reading. */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {data.colors.map((c, i) => (
            <li key={c.slug}>
              <ScrollReveal delay={0.1 + i * 0.08}>
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-sm transition-transform duration-700 ease-out hover:-translate-y-1",
                  c.signature && "ring-1 ring-primary/30",
                )}
              >
                {/* Square swatch — the colour IS the subject */}
                <div
                  className="relative aspect-square w-full"
                  style={{ backgroundColor: c.bg }}
                >
                  {/* Soft directional warm-light gradient to suggest the
                      bark's surface picking up atelier window light from
                      the upper-left, plus a faint vignette so the swatch
                      reads as material, not a flat colour block. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.18),_transparent_55%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,0,0,0.25),_transparent_60%)]"
                  />

                  {c.signature && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-2 bg-background/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.32em] text-foreground backdrop-blur-sm">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                      />
                      {data.signatureLabel}
                    </span>
                  )}

                  {/* Inset name + tagline at the bottom of the swatch */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 px-6 py-6 lg:px-7 lg:py-7",
                      c.textLight ? "text-white" : "text-[#1a1612]",
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10px] uppercase tracking-[0.32em]",
                        c.textLight ? "text-white/75" : "text-[#1a1612]/70",
                      )}
                    >
                      {c.tagline}
                    </p>
                    <h3 className="mt-1.5 font-serif text-2xl font-light leading-tight md:text-[1.65rem]">
                      {c.name}
                    </h3>
                  </div>
                </div>

                {/* Foot — short body copy, neutral background */}
                <div className="flex flex-1 flex-col bg-card px-6 py-6 lg:px-7 lg:py-7">
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        {/* Silver editorial pull-out — the standout USP gets its own
            block beneath the grid so the 2–3 year weather narrative
            actually lands. Side-by-side: large silver patina swatch left,
            editorial body right. */}
        <ScrollReveal delay={0.2} direction="scale" className="mt-20 lg:mt-28">
        <div className="grid grid-cols-1 items-stretch overflow-hidden rounded-sm border border-border/60 lg:grid-cols-[1.05fr_1fr]">
          <div
            className="relative aspect-[5/4] w-full lg:aspect-auto lg:min-h-[440px]"
            style={{ backgroundColor: "#a3a59f" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.22),_transparent_55%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(0,0,0,0.22),_transparent_60%)]"
            />
            <span className="absolute right-6 top-6 inline-flex items-center gap-2 bg-background/90 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.32em] text-foreground backdrop-blur-sm">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
              />
              {data.silverNote.caption}
            </span>
          </div>

          <div className="flex flex-col justify-center bg-card px-8 py-12 lg:px-14 lg:py-16">
            <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-primary">
              {data.silverNote.eyebrow}
            </p>
            <h3 className="font-serif text-3xl font-light leading-[1.15] md:text-4xl lg:text-[2.5rem]">
              {data.silverNote.title}
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-[17px]">
              {data.silverNote.body}
            </p>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}