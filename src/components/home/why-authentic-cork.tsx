import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * "Why authentic cork" — education band (founder direction, June 2026).
 * Three rarity facts framed as big numerals: 200+ years per tree, 9
 * years between harvests, 0 trees felled. No images, no CTA — keeps
 * the section fast (zero extra image weight, addresses the speed
 * complaint), and the numbers do the visual work. Sits between
 * AlentejoOrigins and MaterialsColors so "what makes this material
 * rare" answers before "what its colors are".
 */
export function WhyAuthenticCork({ locale }: { locale: Locale }) {
  const { whyAuthenticCork: data } = getHome(locale);

  return (
    <section
      aria-labelledby="why-authentic-cork-heading"
      className="relative w-full border-t border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        {/* Header — quiet centred Van Cleef restraint */}
        <ScrollReveal className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-primary">
            {data.eyebrow}
          </p>
          <h2
            id="why-authentic-cork-heading"
            className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-6xl"
          >
            {data.title}{" "}
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {data.lead}
          </p>
        </ScrollReveal>

        {/* Three-fact grid — the numerals carry the visual weight, so
            each card is plain (no border, no shadow), with the number
            in serif at display scale and a hairline divider above the
            label. */}
        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-14">
          {data.facts.map((fact, i) => (
            <ScrollReveal key={fact.label} delay={0.15 + i * 0.1}>
              <li className="flex flex-col items-start text-left">
                <p className="font-serif text-[5.5rem] font-light leading-none text-foreground md:text-[6.5rem] lg:text-[7.5rem]">
                  {fact.number}
                </p>
                <span
                  aria-hidden
                  className="mt-6 mb-5 inline-block h-px w-12 bg-primary/70"
                />
                <p className="text-[11px] uppercase tracking-[0.32em] text-primary">
                  {fact.label}
                </p>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground md:text-[15.5px]">
                  {fact.body}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}