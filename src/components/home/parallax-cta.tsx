import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";

/**
 * Parallax CTA — a fixed-background editorial pause between the brand
 * video and the footer (founder direction, June 2026, twenty-fourth
 * pass: "vedio section k neacha ak section add kro white color ka js
 * m bg m image fixed kro or us pr kuch type kro TRSours ka button").
 *
 * Light/white aesthetic: a generous white tint sits on top of a
 * fixed-attachment atelier image so the visitor reads "you've seen
 * how it's made — now go find your treasure". CTA is the dark-inset
 * marketing rectangle the founder approved.
 *
 * background-attachment: fixed is unsupported on iOS Safari (degrades
 * to scroll), so the mobile fallback is bg-scroll — still warm, just
 * not parallax. lg:bg-fixed re-enables the effect on desktop.
 */
export function ParallaxCta({ locale }: { locale: Locale }) {
  const { parallaxCta: data } = getHome(locale);

  return (
    <section
      aria-labelledby="parallax-cta-heading"
      className="relative flex w-full items-center justify-center overflow-hidden bg-scroll bg-cover bg-center px-6 py-24 md:py-32 lg:bg-fixed lg:py-40"
      style={{ backgroundImage: `url('${data.image}')` }}
    >
      {/* White tint — heavy enough that the section reads as light and
          editorial, light enough that the atelier still shows through
          as a quiet backdrop. */}
      <div aria-hidden className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {data.eyebrow ? (
          <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70">
            {data.eyebrow}
          </p>
        ) : null}
        <h2
          id="parallax-cta-heading"
          className="font-serif text-3xl font-light leading-[1.1] text-foreground md:text-5xl lg:text-[3.25rem]"
        >
          {data.title}
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {data.body}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href={data.cta.href}
            className="group inline-flex items-center gap-3 bg-foreground px-10 py-4 text-[12px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
          >
            {data.cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}