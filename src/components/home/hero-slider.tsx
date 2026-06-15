"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/content/home";

const AUTOPLAY_MS = 7000;
const FADE_MS = 1200;

export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modulo wraparound so the slider loops forever — visitor never hits an end.
  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
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
      {/* Full-bleed image stack — slow Ken Burns on active. Only the
          slides in `mounted` actually render their <Image>; unmounted
          siblings render an empty layer so the cross-fade timing stays
          identical, but no fetch happens. */}
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

      {/* Overlays — left wash for the copy + a bottom wash so the lower
          band where the text now lives stays legible without sitting over
          the centre of the piece. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />

      {/* Content — anchored to the lower band so the piece above stays clear */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 min-h-[100svh] flex flex-col justify-end pb-20 lg:pb-24">
        <div className="flex items-end justify-between gap-8">
          {/* Copy (bottom-left) */}
          <div className="max-w-2xl">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className={cn(
                  "transition-all duration-700 ease-out",
                  i === index
                    ? "opacity-100 translate-y-0 relative"
                    : "opacity-0 translate-y-4 absolute pointer-events-none inset-0"
                )}
                aria-hidden={i !== index}
              >
                <p className="text-[11px] tracking-[0.45em] uppercase text-white/80 mb-6">
                  {slide.eyebrow}
                </p>

                <h1 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-light leading-[1.04] mb-6 tracking-tight">
                  {slide.title}{" "}
                  <span className="italic">{slide.titleAccent}</span>
                </h1>

                <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                  {slide.description}
                </p>

                <Link
                  href={slide.cta.href}
                  className="group inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase text-white pb-2 border-b border-white/40 hover:border-white transition-colors"
                >
                  <span>{slide.cta.label}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation (bottom-right) — prev/next arrows only (no number
              counter per founder direction). */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 pb-1">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile navigation — centered prev/next arrows (no counter) */}
        <div className="mt-8 flex sm:hidden items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white"
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
        "absolute inset-0 transition-opacity ease-out",
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
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
          // Cap srcset at 1920 — the hero is full-bleed but our deviceSizes
          // ladder already includes 1920 as the largest variant. The browser
          // picks the correct one based on viewport width.
          sizes="100vw"
          // First slide is the LCP candidate on home — `high` tells the
          // browser to fetch it before lazy images further down the page.
          fetchPriority={priority ? "high" : "auto"}
          quality={priority ? 85 : 80}
          onError={() => setErrored(true)}
          className={cn(
            "object-cover object-center ease-out",
            // Gentler Ken Burns so products don't get over-cropped
            active
              ? "scale-105 [transition:transform_12000ms_ease-out]"
              : "scale-100 [transition:transform_0ms]"
          )}
        />
      )}
    </div>
  );
}
