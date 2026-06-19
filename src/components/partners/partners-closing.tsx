import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Closing parallax CTA for /partners — mirrors the home-page
 * ParallaxCta and the StoryClosing / CorkClosing components so
 * the editorial pages rhyme. White-tint atelier photograph
 * behind a serif heading and a single dark-inset button.
 */
export function PartnersClosing({
  eyebrow,
  title,
  titleAccent,
  body,
  ctaLabel,
  ctaHref,
  closingLine,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  closingLine?: string;
  backgroundImage: string;
}) {
  return (
    <section
      aria-labelledby="partners-closing-heading"
      className="relative flex w-full items-center justify-center overflow-hidden bg-scroll bg-cover bg-center px-6 py-24 md:py-32 lg:bg-fixed lg:py-40"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div aria-hidden className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70">
          {eyebrow}
        </p>
        <h2
          id="partners-closing-heading"
          className="font-serif text-3xl font-light leading-[1.1] text-foreground md:text-5xl lg:text-[3.25rem]"
        >
          {title}
          {titleAccent ? (
            <>
              {" "}
              <span className="italic">{titleAccent}</span>
            </>
          ) : null}
        </h2>
        {body ? (
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            {body}
          </p>
        ) : null}
        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-3 bg-foreground px-10 py-4 text-[12px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
          >
            {ctaLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
        {closingLine ? (
          <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-foreground/55">
            {closingLine}
          </p>
        ) : null}
      </div>
    </section>
  );
}