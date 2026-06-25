"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/content/home";

const AUTOPLAY_MS = 7000;
// Rise-up keyframe length (must match heroRiseUp in globals.css).
// Used to schedule the copy's delayed rise so it lands AFTER the image.
const RISE_MS = 1400;
const COPY_DELAY_MS = 650;

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
  // Two more pause flags, both for free perf wins after first paint:
  //   - offscreen: once the visitor scrolls past the hero, the timer
  //     keeps running and triggering re-renders even though no-one is
  //     looking. Skip it.
  //   - hidden: when the tab is in the background, pause too — avoids
  //     burning CPU + waking the cross-fade transitions on a hidden tab.
  const [offscreen, setOffscreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const total = slides.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modulo wraparound so the slider loops forever — visitor never hits an end.
  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || offscreen || hidden) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, offscreen, hidden, next]);

  // Watch the section's visibility — pause autoplay once it scrolls out.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause when the tab is hidden (background tab, minimised window).
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

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
      ref={sectionRef}
      className="relative w-full overflow-hidden isolate min-h-[100svh] bg-[#15110d]"
      aria-roledescription="carousel"
      aria-label="Sildel collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Full-bleed image stack — rise-up entrance on active slide */}
      {slides.map((slide, i) => (
        <HeroImageLayer
          key={slide.id}
          src={slide.image}
          alt={slide.imageAlt}
          active={i === index}
          priority={i === 0}
          mounted={mounted.has(i)}
          riseMs={RISE_MS}
        />
      ))}

      {/* Overlays — symmetric vertical wash so the centred copy at the
          lower band stays legible without obscuring the piece above.
          The dedicated header scrim that used to sit at the top has
          been removed now that the header is always solid; it was
          only needed to back the transparent nav variant. */}
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

      {/* Centred content — pushed further down so the BIG dropped-in
          image dominates the top two-thirds of the frame. Founder
          direction June 2026 (sixteenth pass): image full-size moving
          in from above, text + buttons anchored low. */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col items-center justify-end px-6 pb-10 text-center lg:px-12 lg:pb-14">
        <div
          key={index}
          className="relative w-full max-w-3xl"
          style={{
            animation: `heroCopyRise 900ms cubic-bezier(0.22, 1, 0.36, 1) ${COPY_DELAY_MS}ms both`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={cn(
                i === index
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 opacity-0",
              )}
              aria-hidden={i !== index}
            >
              {/* Eyebrow + italic tagline + CTAs hidden on mobile per
                  founder direction (June 2026): mobile hero should read
                  as image-first (Quinta Nova reference) — no buttons,
                  no secondary type, just the photograph + the title at
                  the bottom. Desktop keeps the full editorial stack. */}
              <p className="mb-5 hidden text-[11px] uppercase tracking-[0.45em] text-white/85 md:block">
                {slide.eyebrow}
              </p>

              <h1 className="font-serif text-3xl font-light leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>

              <p className="mx-auto mt-6 hidden max-w-2xl font-serif text-lg italic leading-snug text-white/90 md:block md:text-xl lg:text-[1.4rem]">
                {slide.titleAccent}
              </p>

              {/* Two flat rectangular CTAs side-by-side — Quinta do Crasto's
                  olive-green primary + dark-inset secondary. Desktop only. */}
              <div className="mt-10 hidden flex-col items-stretch justify-center gap-3 md:flex sm:flex-row sm:items-center sm:gap-0">
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
  riseMs,
}: {
  src: string;
  alt: string;
  active: boolean;
  priority: boolean;
  mounted: boolean;
  riseMs: number;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "absolute inset-0",
        active ? "opacity-100 z-[1]" : "opacity-0 pointer-events-none",
      )}
      style={
        // Active slide plays the rise-up keyframe — image itself floats
        // upward into place with a small overshoot. Inactive slides park
        // slightly below + invisible so every entrance travels UP.
        active
          ? {
              animation: `heroRiseUp ${riseMs}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
            }
          : { transform: "translateY(6%)" }
      }
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
          className="object-contain object-center"
        />
      )}
    </div>
  );
}