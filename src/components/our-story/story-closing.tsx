import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getOurStory } from "@/content/our-story";
import type { Locale } from "@/lib/i18n/config";

/**
 * Closing parallax CTA for /our-story (founder direction, June 2026:
 * "vedio section se neacha b iss trha ka section add karin taka end
 * m vedio bura na lagy" — same treatment as the home page's
 * ParallaxCta so the video isn't the last beat before the footer).
 *
 * White-tint editorial parallax over a Sildel atelier image with a
 * serif heading, body copy, and a dark-inset Treasures button —
 * matches the home-page pattern the founder approved.
 */
export function StoryClosing({ locale }: { locale: Locale }) {
  const { cta } = getOurStory(locale);
  const primary = cta.destinations[0];
  const heroImage = cta.destinations[1]?.image ?? primary.image;

  return (
    <section
      aria-labelledby="story-closing-heading"
      className="relative flex w-full items-center justify-center overflow-hidden bg-scroll bg-cover bg-center px-6 py-24 md:py-32 lg:bg-fixed lg:py-40"
      style={{ backgroundImage: `url('${heroImage}')` }}
    >
      {/* White tint — same opacity as the home parallax CTA so the
          two sections rhyme across the site. */}
      <div aria-hidden className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70">
          {cta.eyebrow}
        </p>
        <h2
          id="story-closing-heading"
          className="font-serif text-3xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]"
        >
          {cta.title}
          {cta.titleAccent ? (
            <>
              {" "}
              <span className="italic">{cta.titleAccent}</span>
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {cta.body}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href={primary.href}
            className="group inline-flex items-center justify-center gap-3 bg-[#5b6740] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-[#4a5530]"
          >
            {primary.cta}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
        {cta.closingLine ? (
          <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-foreground/55">
            {cta.closingLine}
          </p>
        ) : null}
      </div>
    </section>
  );
}