"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Hand,
  Leaf,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide, HeroFeaturePillar } from "@/content/home";

const AUTOPLAY_MS = 9000;
const FADE_MS = 900;

/**
 * Editorial hero — cream stage, asymmetric text + product, with a static
 * four-pillar feature strip beneath. Each slide is a "museum moment"
 * rather than a full-bleed cinematic banner (founder direction, June 2026,
 * Dehleez-style reference).
 *
 * The product image sits on the right against the same cream tone as the
 * page; its native white photo background blends into the cream stage so
 * the piece reads as floating on a pedestal rather than pasted on a card.
 * Decorative gold corner brackets + a soft pedestal shadow anchor it.
 */
export function HeroSlider({
  slides,
  features,
}: {
  slides: readonly HeroSlide[];
  features: readonly HeroFeaturePillar[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sildel signature pieces"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full overflow-hidden bg-[oklch(0.96_0.018_82)]"
    >
      {/* Decorative — soft palm-leaf shadow on the left edge, mixed at low
          opacity so it reads as light passing through foliage. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-[radial-gradient(ellipse_at_top_left,oklch(0.86_0.04_82)/0.35,transparent_55%)] mix-blend-multiply lg:block"
      />

      {/* Decorative — single olive sprig SVG in the top-right corner. */}
      <OliveSprig
        aria-hidden
        className="pointer-events-none absolute right-2 top-6 hidden h-40 w-40 text-[oklch(0.45_0.06_135)]/65 md:right-8 md:top-10 md:h-56 md:w-56 lg:block"
      />

      {/* Stage */}
      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-12 lg:pb-20 lg:pt-28">
        {/* ── TEXT COLUMN ──────────────────────────────────────── */}
        <div className="relative z-10 min-h-[440px] lg:min-h-[540px]">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              aria-hidden={i !== index}
              className={cn(
                "transition-all ease-out",
                i === index
                  ? "relative opacity-100 translate-y-0"
                  : "pointer-events-none absolute inset-0 -translate-y-2 opacity-0",
              )}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            >
              <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-primary">
                {slide.eyebrow}
              </p>

              <h1 className="font-serif text-4xl font-light leading-[1.04] text-foreground md:text-5xl lg:text-[3.5rem] xl:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-1 font-serif text-4xl font-light italic leading-[1.04] text-primary md:text-5xl lg:text-[3.5rem] xl:text-6xl">
                {slide.titleAccent}
              </p>

              <div className="mt-8 h-px w-14 bg-foreground/40" aria-hidden />

              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {slide.description}
              </p>

              <Link
                href={slide.cta.href}
                className="group mt-10 inline-flex items-center gap-3 bg-foreground px-7 py-4 text-[11px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
              >
                {slide.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          ))}

          {/* Slider nav — discreet, lower-left under the text. */}
          <div className="mt-14 flex items-center gap-5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="text-[11px] uppercase tracking-[0.32em] tabular-nums text-foreground/70">
              {String(index + 1).padStart(2, "0")}
              <span className="text-foreground/30">
                {" "}
                / {String(total).padStart(2, "0")}
              </span>
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ── PRODUCT COLUMN ───────────────────────────────────── */}
        <div className="relative">
          {/* Pedestal — soft warm ellipse shadow that anchors the product. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-10 rounded-[50%] bg-[oklch(0.85_0.04_82)]/40 blur-2xl lg:h-16"
          />

          {/* Gold corner brackets — quiet luxury marker, framing the
              product without enclosing it. */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -bottom-2 h-6 w-6 border-l-2 border-b-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -bottom-2 h-6 w-6 border-r-2 border-b-2 border-primary"
          />

          <div className="relative aspect-[5/6] w-full overflow-hidden">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                aria-hidden={i !== index}
                className={cn(
                  "absolute inset-0 transition-opacity ease-out",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                style={{ transitionDuration: `${FADE_MS}ms` }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  quality={i === 0 ? 85 : 80}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className={cn(
                    "object-contain ease-out",
                    // Gentle scale on the active slide so the product subtly
                    // "settles" as it appears.
                    i === index
                      ? "scale-100 [transition:transform_1200ms_ease-out]"
                      : "scale-[0.98] [transition:transform_0ms]",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURE STRIP ─────────────────────────────────────── */}
      <div className="relative border-t border-foreground/10 bg-[oklch(0.98_0.012_82)]">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-8 gap-y-8 px-6 py-10 lg:grid-cols-4 lg:gap-x-12 lg:px-12 lg:py-12">
          {features.map((feature) => (
            <FeaturePillar key={feature.label} feature={feature} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────── Feature pillar ─────── */

const ICONS: Record<HeroFeaturePillar["icon"], LucideIcon> = {
  leaf: Leaf,
  hand: Hand,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

function FeaturePillar({ feature }: { feature: HeroFeaturePillar }) {
  const Icon = ICONS[feature.icon];
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background lg:h-12 lg:w-12">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
          {feature.label}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.body}
        </p>
      </div>
    </li>
  );
}

/* ──────────────────────────────────────────── Decorative SVG ─────── */
/* A single olive sprig — drawn rather than imaged so it scales cleanly
   and inherits `currentColor`. Placed in the hero's top-right corner. */

function OliveSprig({ className, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {/* Main stem */}
      <path d="M30 30 Q 90 80 170 175" />
      {/* Leaves along the stem (alternating sides) */}
      <ellipse cx="55" cy="55" rx="14" ry="5" transform="rotate(-25 55 55)" fill="currentColor" fillOpacity="0.6" stroke="none" />
      <ellipse cx="78" cy="68" rx="16" ry="6" transform="rotate(35 78 68)" fill="currentColor" fillOpacity="0.6" stroke="none" />
      <ellipse cx="100" cy="92" rx="15" ry="5" transform="rotate(-30 100 92)" fill="currentColor" fillOpacity="0.55" stroke="none" />
      <ellipse cx="122" cy="115" rx="17" ry="6" transform="rotate(40 122 115)" fill="currentColor" fillOpacity="0.55" stroke="none" />
      <ellipse cx="142" cy="140" rx="14" ry="5" transform="rotate(-25 142 140)" fill="currentColor" fillOpacity="0.5" stroke="none" />
      <ellipse cx="158" cy="160" rx="16" ry="6" transform="rotate(45 158 160)" fill="currentColor" fillOpacity="0.5" stroke="none" />
    </svg>
  );
}