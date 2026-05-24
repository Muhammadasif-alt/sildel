"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/content/home";

const AUTOPLAY_MS = 7000;
const FADE_MS = 1200;

export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, next]);

  const active = slides[index];

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
        />
      ))}

      {/* Dual gradient overlays — readability + cinema feel */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-10 min-h-[100svh] flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Animated copy — fades and slides up on slide change */}
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
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-10 bg-primary" aria-hidden />
                <p className="text-xs tracking-[0.45em] uppercase text-primary font-medium">
                  {slide.eyebrow}
                </p>
              </div>

              <h1 className="font-serif text-white text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] mb-2 tracking-tight">
                {slide.title}
              </h1>
              <h2 className="font-serif italic text-primary text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] mb-10">
                {slide.titleAccent}
              </h2>

              <div className="h-px w-20 bg-primary/70 mb-10" aria-hidden />

              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-lg mb-12">
                {slide.description}
              </p>

              <Link
                href={slide.cta.href}
                className="group inline-flex items-center gap-3"
              >
                <span className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 lg:px-8 py-3 lg:py-4 text-xs tracking-[0.35em] uppercase font-medium rounded-sm transition-colors group-hover:bg-primary/90">
                  {slide.cta.label}
                </span>
                <span className="inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-sm border border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rail — slide indicators + counter + slide title preview */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/15 backdrop-blur-sm bg-black/20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
          {/* Dot indicators with progress fill */}
          <div className="flex items-center gap-3 lg:gap-4" role="tablist">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${slide.title} ${slide.titleAccent}`}
                onClick={() => goTo(i)}
                className={cn(
                  "group relative h-px transition-all duration-500",
                  i === index ? "w-14 lg:w-20" : "w-6 lg:w-10"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-colors",
                    i === index ? "bg-white/25" : "bg-white/30 group-hover:bg-white/60"
                  )}
                />
                {i === index && !paused && (
                  <span
                    aria-hidden
                    key={index /* re-trigger animation on slide change */}
                    className="absolute inset-y-0 left-0 bg-primary animate-[heroProgress_7000ms_linear_forwards]"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                )}
                {i === index && paused && (
                  <span aria-hidden className="absolute inset-0 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:block text-xs tracking-[0.4em] uppercase text-white/70">
            {active.titleAccent.replace(/[.,]/g, "")}
          </div>

          <div className="text-xs tracking-[0.4em] uppercase text-white/90 font-medium">
            {String(index + 1).padStart(2, "0")}
            <span className="text-white/40 mx-2">/</span>
            <span className="text-white/40">{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* Inline keyframes for the progress bar */}
      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

function HeroImageLayer({
  src,
  alt,
  active,
  priority,
}: {
  src: string;
  alt: string;
  active: boolean;
  priority: boolean;
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
      {errored ? (
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
          onError={() => setErrored(true)}
          className={cn(
            "object-cover ease-out",
            // Slow Ken Burns — 10s zoom on active slide, reset for inactive
            active
              ? "scale-110 [transition:transform_10000ms_ease-out]"
              : "scale-100 [transition:transform_0ms]"
          )}
        />
      )}
    </div>
  );
}
