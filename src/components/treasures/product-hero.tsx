import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

/**
 * Cinematic product hero — the editorial "entrance" to a treasure page.
 *
 * Product photos are white-background studio shots, so a plain full-cover
 * background would wash out white text. Instead we lay the product image
 * down twice: once blurred + darkened as an ambient, product-tinted
 * backdrop (over a guaranteed-dark scrim so text always reads), and once
 * crisp in the foreground so the actual piece reads sharply. White text +
 * the enquire CTA sit alongside it.
 */
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
  // Match the foreground mat to the photo's own backdrop so the piece sits
  // cleanly with no letterbox bands: black-background ("Fundo Preto") and the
  // moody AI renders get a dark mat; white studio shots get a white mat.
  const darkMat = /PRETO|Nano Banana/i.test(image);

  return (
    <section
      aria-labelledby="product-hero-heading"
      className="relative w-full overflow-hidden isolate bg-[#15110d]"
    >
      {/* Ambient, product-tinted backdrop */}
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover scale-110 blur-2xl opacity-30 -z-10"
      />
      {/* Dark scrim so white text is always legible regardless of the
          source photo's luminance. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/72 to-black/88"
      />

      <div className="relative z-10 mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-white/65">
            {category}
          </p>
          <h1
            id="product-hero-heading"
            className="font-serif text-5xl font-light leading-[1.02] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-6xl lg:text-7xl"
          >
            {name}
          </h1>

          <div className="my-8 h-px w-16 bg-white/50" aria-hidden />

          <p className="max-w-md font-serif text-xl italic leading-snug text-white/85 md:text-2xl">
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

        {/* Product, shown crisp on a mat tuned to the photo's own backdrop */}
        <div className="order-1 lg:order-2">
          <div
            className={`relative mx-auto aspect-square w-full max-w-xl overflow-hidden shadow-2xl shadow-black/40 ${
              darkMat ? "bg-[#15110d] ring-1 ring-white/10" : "bg-white"
            }`}
          >
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
    </section>
  );
}