import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Atelier intro — Quinta Nova-style editorial introduction (founder
 * direction, June 2026, fifteenth pass: match quintanova.com exactly).
 *
 * Layout details that match the reference:
 *   - Generous TOP + BOTTOM whitespace (section padding) so the section
 *     doesn't touch the hero. The hero ends; visitor drops into a
 *     deliberate breath of warm-paper space; the image then anchors
 *     the eye low-left.
 *   - Image bleeds all the way to the LEFT viewport edge — no inner
 *     container padding on its column. This is the Quinta Nova trick
 *     that makes the image feel massive without being centred.
 *   - Asymmetric 55/45 grid on desktop so the image gets the larger
 *     share of the row, the text gets the calmer right side with
 *     generous inner padding.
 *
 * No eyebrow, no card chrome, no shadow — Quinta Nova restraint.
 */
export function AtelierIntro({ locale }: { locale: Locale }) {
  const { atelierIntro: data } = getHome(locale);

  return (
    <section
      aria-labelledby="atelier-intro-heading"
      className="relative w-full bg-background py-16 md:py-24 lg:py-28"
    >
      {/* Asymmetric grid — image bleeds to viewport left edge (no outer
          max-width container), text column gets the right 45% with
          comfortable internal padding. */}
      <div className="grid grid-cols-1 items-center lg:grid-cols-[55%_45%]">
        {/* Image — full width of its column, no inner padding so it
            reaches the viewport left edge on desktop. */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Copy column — vertically centred, generous left + right
            padding so the text breathes against the wide image. */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col justify-center px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-0 xl:px-24 2xl:pr-32">
            <div className="max-w-xl">
              <h2
                id="atelier-intro-heading"
                className="font-serif text-3xl font-light leading-[1.15] text-foreground md:text-4xl lg:text-[2.75rem]"
              >
                {data.title}
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {data.body}
              </p>
              <Link
                href={data.cta.href}
                className="group mt-10 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.28em] text-foreground/85 transition-colors hover:text-foreground"
              >
                {data.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}