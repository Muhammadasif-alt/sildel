import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

/**
 * Editorial product hero — warm atelier backdrop, no more black scrim.
 *
 * The product photo sits crisply on a white mat (since the studio shots
 * are white-bg). Behind it we lay one of the "Ehance Slidel" atelier
 * scenes — lime-wash walls, arched alcoves, olive branches, golden-hour
 * light — picked by category so the moodboard matches the piece. A soft
 * cream wash sits over the backdrop so dark serif text always reads.
 */

// Category → atelier backdrop. Uses the enhance- series already in
// /public/Slidel/enhance/. One curated wide shot per family; for Carré
// d'Or pieces we swap in the dedicated render.
const BACKDROP_BY_CATEGORY: Record<string, string> = {
  Sculpture: "/Slidel/enhance/enhance-sculpture-02.webp",
  Tables: "/Slidel/enhance/enhance-tables-03.webp",
  Lighting: "/Slidel/enhance/enhance-lighting-02.webp",
  "Fine Arts": "/Slidel/enhance/enhance-fine-arts-02.webp",
};

const DEFAULT_BACKDROP = "/Slidel/enhance/enhance-misc-05.webp";

function backdropFor(category: string, image: string): string {
  if (/CARR--D-OR|carre-dor/i.test(image)) {
    return "/Slidel/enhance/enhance-carre-dor-02.webp";
  }
  return BACKDROP_BY_CATEGORY[category] ?? DEFAULT_BACKDROP;
}

export function ProductHero({
  category,
  name,
  tagline,
  image,
  priceOnRequest,
  enquireLabel,
  enquireHref,
}: {
  category: string;
  name: string;
  tagline: string;
  image: string;
  priceOnRequest: string;
  enquireLabel: string;
  enquireHref: string;
}) {
  const backdrop = backdropFor(category, image);

  return (
    <section
      aria-labelledby="product-hero-heading"
      className="relative w-full overflow-hidden isolate bg-background"
    >
      {/* Atelier backdrop — soft, warm, slightly blurred so it reads as
          ambience and never competes with the product. */}
      <Image
        src={backdrop}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105 opacity-60 -z-20"
      />
      {/* Cream wash — pulls the whole field toward the site's warm palette
          and keeps dark serif type legible on any source frame. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-background/85 via-background/70 to-background/90"
      />

      <div className="relative z-10 mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {category}
          </p>
          <h1
            id="product-hero-heading"
            className="font-serif text-5xl font-light leading-[1.02] text-foreground md:text-6xl lg:text-7xl"
          >
            {name}
          </h1>

          <div className="my-8 h-px w-16 bg-primary/60" aria-hidden />

          <p className="max-w-md font-serif text-xl italic leading-snug text-foreground/80 md:text-2xl">
            {tagline}
          </p>

          <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-primary">
            {priceOnRequest}
          </p>

          <div className="mt-8">
            <Link
              href={enquireHref}
              className="inline-flex items-center justify-center gap-3 bg-foreground px-9 py-4 text-xs font-medium uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
            >
              <Mail className="h-4 w-4" aria-hidden strokeWidth={1.5} />
              {enquireLabel}
            </Link>
          </div>
        </div>

        {/* Product column — white mat + gold corner brackets, matching the
            "Why Collectors Choose Sildel" image frame language. */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-xl">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-2 z-10 h-6 w-6 border-l-2 border-t-2 border-primary"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-2 z-10 h-6 w-6 border-r-2 border-t-2 border-primary"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -bottom-2 z-10 h-6 w-6 border-l-2 border-b-2 border-primary"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-2 z-10 h-6 w-6 border-r-2 border-b-2 border-primary"
            />
            <div className="relative aspect-square w-full overflow-hidden bg-white shadow-2xl shadow-foreground/10 ring-1 ring-border">
              <Image
                src={image}
                alt={`${name} — ${tagline}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}