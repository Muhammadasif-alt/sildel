import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TreasuresContent } from "@/content/treasures";

/**
 * Closing parallax CTA for /treasures — same treatment as
 * StoryClosing / CorkClosing / PartnersClosing so the editorial
 * pages all rhyme. White-tint atelier photograph behind a serif
 * heading, body copy, and a single dark-inset Our Story button.
 */
export function TreasuresClosing({ cta }: { cta: TreasuresContent["cta"] }) {
  const primary = cta.destinations[0];
  const heroImage = cta.destinations[1]?.image ?? primary.image;

  return (
    <section
      aria-labelledby="treasures-closing-heading"
      className="relative flex w-full items-center justify-center overflow-hidden bg-scroll bg-cover bg-center px-6 py-24 md:py-32 lg:bg-fixed lg:py-40"
      style={{ backgroundImage: `url('${heroImage}')` }}
    >
      <div aria-hidden className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70">
          {cta.eyebrow}
        </p>
        <h2
          id="treasures-closing-heading"
          className="font-serif text-3xl font-light leading-[1.1] text-foreground md:text-5xl lg:text-[3.25rem]"
        >
          {cta.title}
          {cta.titleAccent ? (
            <>
              {" "}
              <span className="italic">{cta.titleAccent}</span>
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {cta.body}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href={primary.href}
            className="group inline-flex items-center gap-3 bg-foreground px-10 py-4 text-[12px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
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