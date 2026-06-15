"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/content/home";

const AUTOPLAY_MS = 7000;
const FADE_MS = 1200;

/**
 * Hero slider — Quinta do Crasto-inspired centred layout (founder
 * direction, June 2026, second pass).
 *
 * Each slide is a serif word/phrase + italic tagline + two flat
 * rectangular CTAs side-by-side, anchored low-middle. Prev/next arrows
 * sit on the left and right viewport edges, vertically centred.
 *
 * Only the current slide + its neighbours are mounted; other slides
 * render an empty layer so the cross-fade timing is identical the
 * moment they do become ready (see `mounted` Set logic below).
 */
export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modulo wraparound so the slider loops forever — visitor never hits an end.
  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, next]);

  // Only fetch slide images we actually need right now (current + prev +
  // next for smooth cross-fade), instead of mounting all six and burning
  // bandwidth that the LCP candidate (slide 0) should own. As the visitor
  // advances, additional slides join `mounted` and stay there — never
  // re-fetched once cached.
  const [mounted, setMounted] = useState<Set<number>>(
    () => new Set([0, 1 % total, (total - 1) % total]),
  );
  useEffect(() => {
    setMounted((prev) => {
      const ahead = (index + 1) % total;
      const behind = (index - 1 + total) % total;
      if (prev.has(index) && prev.has(ahead) && prev.has(behind)) return prev;
      const out = new Set(prev);
      out.add(index);
      out.add(ahead);
      out.add(behind);
      return out;
    });
  }, [index, total]);

  return (
    <section
      className="relative w-full overflow-hidden isolate min-h-[100svh]"
      aria-roledescription="carousel"
      aria-label="Sildel collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Full-bleed image stack — slow Ken Burns on active */}
      {slides.map((slide, i) => (
        <HeroImageLayer
          key={slide.id}
          src={slide.image}
          alt={slide.imageAlt}
          active={i === index}
          priority={i === 0}
          mounted={mounted.has(i)}
        />
      ))}

      {/* Overlays — symmetric vertical wash so the centred copy at the
          lower band stays legible without obscuring the piece above. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/15"
      />

      {/* Side arrows — edge-anchored, vertically centred (Quinta do Crasto
          pattern). Hidden behind content on very narrow screens to avoid
          collisions with the text. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center text-white/85 transition-colors hover:text-white md:inline-flex lg:left-8"
      >
        <ArrowLeft className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.25} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center text-white/85 transition-colors hover:text-white md:inline-flex lg:right-8"
      >
        <ArrowRight className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.25} />
      </button>

      {/* Centred content — anchored low so the piece above stays clear */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col items-center justify-end px-6 pb-20 text-center lg:px-12 lg:pb-28">
        <div className="relative w-full max-w-3xl">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={cn(
                "transition-all duration-700 ease-out",
                i === index
                  ? "relative opacity-100 translate-y-0"
                  : "pointer-events-none absolute inset-0 opacity-0 translate-y-4",
              )}
              aria-hidden={i !== index}
            >
              <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-white/85">
                {slide.eyebrow}
              </p>

              <h1 className="font-serif text-4xl font-light leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic leading-snug text-white/90 md:text-xl lg:text-[1.4rem]">
                {slide.titleAccent}
              </p>

              {/* Two flat rectangular CTAs side-by-side — Quinta do Crasto's
                  olive-green primary + dark-inset secondary. */}
              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-0">
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center justify-center bg-[#5b6740] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-[#4a5530]"
                >
                  {slide.cta.label}
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="inline-flex items-center justify-center bg-[#1c1a18] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-black"
                >
                  {slide.cta2.label}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrows — small inline pair below CTAs (md+ uses the
            edge-anchored arrows). */}
        <div className="mt-10 flex items-center justify-center gap-6 md:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

function HeroImageLayer({
  src,
  alt,
  active,
  priority,
  mounted,
}: {
  src: string;
  alt: string;
  active: boolean;
  priority: boolean;
  mounted: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "absolute inset-0 ease-out",
        // Drop-from-above + fade. Active slide slides down into place from
        // -24px; inactive slides rest 24px above the frame so the next
        // entrance always travels DOWN (founder direction, June 2026:
        // hero images should feel like they fall into view).
        active
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none",
      )}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${FADE_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-hidden={!active}
    >
      {!mounted ? null : errored ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.35_0.08_75)_0%,_oklch(0.2_0.04_60)_55%,_oklch(0.1_0.02_50)_100%)]"
          role="img"
          aria-label={alt}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          fetchPriority={priority ? "high" : "auto"}
          quality={priority ? 85 : 80}
          onError={() => setErrored(true)}
          className={cn(
            "object-cover object-center ease-out",
            active
              ? "scale-105 [transition:transform_12000ms_ease-out]"
              : "scale-100 [transition:transform_0ms]",
          )}
        />
      )}
    </div>
  );
}