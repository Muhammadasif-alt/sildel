import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Atelier intro — Quinta Nova-style editorial introduction (founder
 * direction, June 2026, fourteenth pass: "make it final like
 * quintanova.com"). Sits directly under the hero as the first editorial
 * moment of the home page. 50/50 split:
 *
 *   ┌────────────────────────┐    Title (serif, large)
 *   │                        │
 *   │   wide landscape       │    Body paragraph
 *   │   image, full bleed,   │
 *   │   no chrome            │    Discover the atelier →
 *   │                        │
 *   └────────────────────────┘
 *
 * The right column is intentionally generous in whitespace — Quinta
 * Nova's restraint. No eyebrow, no card, no shadow, no border. Just an
 * image, a sentence, and a quiet arrow link.
 */
export function AtelierIntro({ locale }: { locale: Locale }) {
  const { atelierIntro: data } = getHome(locale);

  return (
    <section
      aria-labelledby="atelier-intro-heading"
      className="relative w-full bg-background"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-0 lg:grid-cols-2">
        {/* Image column — full bleed inside the column, no inner padding */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-[5/4]">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Copy column — vertically centred with generous whitespace */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-col justify-center px-8 py-16 md:px-12 lg:px-20 lg:py-24 xl:px-28">
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