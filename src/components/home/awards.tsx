import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award as AwardIcon } from "lucide-react";
import { getAwards, type Award } from "@/content/awards";
import type { Locale } from "@/lib/i18n/config";

/**
 * Awards & Recognition — three international distinctions surfaced on the
 * home page. Each card has a fixed-aspect media area at the top followed by
 * year, title and issuer. The third card (no image) uses a typographic
 * treatment in place of the media area so the row stays visually even.
 *
 * The entire card is a Link to /awards/[slug] — visitors can click anywhere
 * inside the card to open the full award detail page (founder direction,
 * matching the Dehleez-style portfolio card pattern).
 */
export function Awards({ locale }: { locale: Locale }) {
  const { section, awards, viewDetail } = getAwards(locale);

  return (
    <section
      id="awards"
      aria-labelledby="awards-heading"
      className="relative w-full border-t border-border/60 bg-background scroll-mt-24"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-20 lg:py-28">
        {/* Header */}
        <div className="mb-14 lg:mb-20 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
              {section.eyebrow}
            </p>
            <h2
              id="awards-heading"
              className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-6xl"
            >
              {section.title}{" "}
              <span className="italic text-primary">
                {section.titleAccent}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            {section.body}
          </p>
        </div>

        {/* 3-up grid */}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {awards.map((award) => (
            <AwardCard key={award.slug} award={award} viewDetail={viewDetail} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function AwardCard({
  award,
  viewDetail,
}: {
  award: Award;
  viewDetail: string;
}) {
  return (
    <li className="h-full">
      <Link
        href={`/awards/${award.slug}`}
        className="group flex h-full flex-col border border-border bg-card transition-colors duration-500 hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`${award.title} — ${award.issuer}, ${award.year}`}
      >
        {/* Media — fixed aspect, light backdrop, contain so neither the badge
            nor the wide banner gets cropped awkwardly. The text-only third
            card swaps to a typographic treatment of identical height. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40">
          {award.image ? (
            <Image
              src={award.image}
              alt={award.imageAlt ?? award.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
              className="object-contain p-6 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
              <AwardIcon
                className="h-10 w-10 text-primary"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="font-serif text-2xl font-light italic text-foreground">
                {award.year}
              </p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                {award.issuer}
              </p>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col gap-4 border-t border-border/60 p-6 lg:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              {award.org}
            </span>
            <span className="font-serif text-base italic text-primary tabular-nums">
              {award.year}
            </span>
          </div>

          <h3 className="font-serif text-xl font-light leading-snug text-foreground lg:text-[1.35rem]">
            {award.title}
          </h3>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-foreground/70">
              {award.issuer}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] text-foreground transition-colors group-hover:text-primary">
              {viewDetail}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}