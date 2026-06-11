import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAwards, type Award } from "@/content/awards";
import type { Locale } from "@/lib/i18n/config";

/**
 * Awards & Recognition — three international distinctions surfaced on the
 * home page. Founder iteration (June 2026): retire the badge-in-white-frame
 * treatment (the centred Corporate LiveWire seal + LUXlife banner + empty
 * 3rd card with a typographic placeholder all sat awkwardly with white side
 * gaps). New treatment matches the partners-strip + featured-treasures
 * cards: rounded-2xl, layered shadow, full-bleed editorial atelier image
 * pulled from each award's detail heroImage, with the official badge image
 * folded into the card foot as a small "issued by" thumbnail (the third
 * card has no badge file, so it falls back to a gold seal icon).
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
  // Cover image — prefer the detail page's curated atelier heroImage so the
  // home card reads as "this recognition is about the craft" rather than a
  // disembodied badge. Falls back to the original badge file if no detail
  // hero was set.
  const cover = award.detail?.heroImage ?? award.image ?? "/Slidel/enhance/enhance-misc-01.webp";
  const coverAlt = award.detail?.heroImageAlt ?? award.imageAlt ?? award.title;

  return (
    <li className="h-full">
      <Link
        href={`/awards/${award.slug}`}
        aria-label={`${award.title} — ${award.issuer}, ${award.year}`}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.28)]">
          {/* Full-bleed atelier cover. Slight bottom gradient so the year
              pill stays legible on lighter source frames. */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <Image
              src={cover}
              alt={coverAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
            {/* Year pill — top-left over the image */}
            <span className="absolute top-4 left-4 inline-flex items-center bg-background/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.32em] text-foreground backdrop-blur-sm">
              {award.year}
            </span>
            {/* Quiet arrow indicator that this is a link */}
            <span
              aria-hidden
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-foreground group-hover:text-background"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </div>

          {/* Foot — org + title + issuer + CTA */}
          <div className="flex flex-1 flex-col gap-4 px-6 py-7 md:px-7 md:py-8">
            <p className="text-[10px] uppercase tracking-[0.32em] text-primary">
              {award.org}
            </p>

            <h3 className="font-serif text-xl font-light leading-snug text-foreground lg:text-[1.35rem]">
              {award.title}
            </h3>

            <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-border/60">
              <span className="text-[11px] uppercase tracking-[0.28em] text-foreground/75">
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
        </article>
      </Link>
    </li>
  );
}