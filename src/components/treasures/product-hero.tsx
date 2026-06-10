import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

/**
 * Treasure detail hero — full-bleed cinematic image with text overlay,
 * same height + framing language as the home page hero slider.
 *
 * Founder direction (June 2026): no more "double image" treatment (the
 * blurred-backdrop + cropped-product-card combo read as a duplicate of
 * the same piece). One image only — the product's own atelier render
 * — fills the viewport, with a left wash + bottom wash gradient so the
 * white serif copy stays legible. Per-product image is sourced from
 * `product.image` (already mapped in /content/treasures.ts) so each
 * detail page shows its own piece, never a category-generic frame.
 */
export function ProductHero({
  category,
  name,
  tagline,
  image,
  imageAlt,
  priceOnRequest,
  enquireLabel,
  enquireHref,
}: {
  category: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt?: string;
  priceOnRequest: string;
  enquireLabel: string;
  enquireHref: string;
}) {
  return (
    <section
      aria-labelledby="product-hero-heading"
      className="relative w-full overflow-hidden isolate min-h-[88svh] bg-[#15110d]"
    >
      {/* Single full-bleed image — slow Ken Burns on mount. */}
      <Image
        src={image}
        alt={imageAlt ?? `${name} — ${tagline}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105 transition-transform duration-[14000ms] ease-out hover:scale-110"
      />

      {/* Left wash so bottom-left copy reads on any source frame, plus a
          bottom wash so the lower text band has its own scrim. Matches
          the home hero gradient recipe. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
      />

      {/* Content — anchored bottom-left, same rhythm as the home hero. */}
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1600px] flex-col justify-end px-6 pb-20 pt-32 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="max-w-2xl">
          <p className="mb-6 text-[11px] uppercase tracking-[0.45em] text-white/80">
            {category}
          </p>

          <h1
            id="product-hero-heading"
            className="font-serif text-5xl font-light leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            {name}
          </h1>

          <div className="my-8 h-px w-16 bg-white/50" aria-hidden />

          <p className="max-w-xl font-serif text-xl italic leading-snug text-white/85 md:text-2xl">
            {tagline}
          </p>

          <p className="mt-8 text-[11px] uppercase tracking-[0.32em] text-[var(--accent-gold)]">
            {priceOnRequest}
          </p>

          <div className="mt-8">
            <Link
              href={enquireHref}
              className="inline-flex items-center justify-center gap-3 bg-white px-9 py-4 text-xs font-medium uppercase tracking-[0.32em] text-[#15110d] transition-colors hover:bg-white/85"
            >
              <Mail className="h-4 w-4" aria-hidden strokeWidth={1.5} />
              {enquireLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}