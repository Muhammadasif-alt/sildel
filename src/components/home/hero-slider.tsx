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

  // Modulo wraparound so the slider loops forever — visitor never hits an end.
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

      {/* Single soft overlay — readable text, photo still breathes */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12 min-h-[100svh] flex flex-col justify-center">
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
              <p className="text-[11px] tracking-[0.45em] uppercase text-white/80 mb-8">
                {slide.eyebrow}
              </p>

              <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] mb-10 tracking-tight">
                {slide.title}{" "}
                <span className="italic">{slide.titleAccent}</span>
              </h1>

              <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl mb-12">
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
      </div>

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
