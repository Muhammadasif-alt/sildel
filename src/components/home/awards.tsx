import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAwards, type Award } from "@/content/awards";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Awards & Recognition — three international distinctions surfaced on the
 * home page. Founder iteration (June 2026, second pass): bring back the
 * actual official badges issued by each publication — that's what these
 * cards have to certify. To kill the white side-gaps that came from
 * centring the badge on a blank frame, every badge sits on a soft
 * out-of-focus copy of itself (Apple Music cover-art treatment) so the
 * frame breathes edge-to-edge in the badge's own palette. The Luxuri
 * card has no issued badge — Luxuri Magazine never produced one — so it
 * renders a typographic plaque keyed to the listing instead.
 */

/** Per-card backdrop gradient — tuned to each badge's dominant palette. */
const BACKDROP_BY_SLUG: Record<string, string> = {
  // Corporate LiveWire IEA — deep navy that matches the blue octagonal seal
  "iea-2026": "from-[#0b1f3a] via-[#13315c] to-[#08182d]",
  // LUXlife Home & Garden — purple/green that picks up the garden banner
  "luxlife-2026": "from-[#2a1a3d] via-[#1f3a2a] to-[#0e1a14]",
  // Luxuri (no badge) — warm gold-brown plaque
  "luxuri-2025": "from-[#1a120a] via-[#3a2818] to-[#0d0805]",
};

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
        <ScrollReveal className="mb-14 lg:mb-20 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
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
        </ScrollReveal>

        {/* 3-up grid */}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {awards.map((award, i) => (
            <ScrollReveal key={award.slug} delay={0.15 + i * 0.1}>
              <AwardCard award={award} viewDetail={viewDetail} />
            </ScrollReveal>
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
  const badge = award.image;
  const badgeAlt = award.imageAlt ?? award.title;
  const backdrop =
    BACKDROP_BY_SLUG[award.slug] ?? "from-[#1a1612] via-[#2a201b] to-[#0e0b08]";

  return (
    <li className="h-full">
      <Link
        href={`/awards/${award.slug}`}
        aria-label={`${award.title} — ${award.issuer}, ${award.year}`}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.28)]">
          {/* Badge frame — tinted backdrop so corners are never empty white.
              When a real badge exists we lay a soft blurred copy as the
              backdrop fill, then the crisp badge sits centred on top
              (object-contain so the full seal stays readable). */}
          <div
            className={cn(
              "relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br",
              backdrop,
            )}
          >
            {badge ? (
              <>
                {/* Soft, oversized, blurred copy fills the frame behind */}
                <Image
                  src={badge}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                  className="scale-150 object-cover opacity-35 blur-2xl"
                />
                {/* Crisp badge, centred and contained */}
                <Image
                  src={badge}
                  alt={badgeAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw"
                  className="relative object-contain p-8 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
              </>
            ) : (
              <TypographicPlaque award={award} />
            )}
            {/* Year pill — top-left, glassy on the tinted backdrop */}
            <span className="absolute top-4 left-4 inline-flex items-center bg-background/85 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.32em] text-foreground backdrop-blur-sm">
              {award.year}
            </span>
            {/* Link-out indicator */}
            <span
              aria-hidden
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-all duration-300 group-hover:bg-foreground group-hover:text-background"
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

/**
 * Typographic plaque used when no badge file exists (Luxuri 2025 — the
 * publication never issued a winner seal; the recognition lives as a
 * listing on luxurimag.com). Reads as a serif magazine masthead so the
 * card still feels editorial, not empty.
 */
function TypographicPlaque({ award }: { award: Award }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-background">
      <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-primary">
        {award.issuer}
      </p>
      <div className="mb-6 h-px w-14 bg-primary/70" />
      <p className="font-serif text-[2.25rem] italic leading-none lg:text-[2.5rem]">
        Porto
      </p>
      <p className="font-serif text-5xl font-light leading-none mt-1 lg:text-6xl">
        2025
      </p>
      <div className="mt-6 h-px w-14 bg-primary/70" />
      <p className="mt-5 text-[10px] uppercase tracking-[0.5em] text-background/80">
        Winner
      </p>
    </div>
  );
}