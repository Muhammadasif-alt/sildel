"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOurStory } from "@/content/our-story-provider";

const AUTOPLAY_MS = 5000;

export function BrandSymbol() {
  const data = useOurStory().symbol;

  // Founder added a 7-shot lynx series (Studio → Forest → Editorial) — use
  // them as a slow cross-fade. Falls back to the single hero image for any
  // locale that hasn't migrated yet.
  const slides: readonly { src: string; alt: string }[] =
    (data as { images?: readonly { src: string; alt: string }[] }).images ?? [
      { src: data.image, alt: data.imageAlt },
    ];

  return (
    <section
      id="symbol"
      className="relative w-full bg-background overflow-hidden"
      aria-labelledby="symbol-heading"
    >
      <div className="relative mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* CONTENT — left */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-primary/40" aria-hidden />
              <p className="text-xs tracking-[0.4em] uppercase text-primary">
                {data.eyebrow}
              </p>
            </div>

            <h2
              id="symbol-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
            >
              {data.title}
              <br />
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>

            <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              {data.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:font-serif first-letter:text-5xl first-letter:font-light first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9]"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Compact fact chips */}
            <ul className="mt-10 flex flex-wrap gap-3" aria-label="The lynx in numbers">
              {data.facts.map((fact) => (
                <li
                  key={fact.label}
                  className="inline-flex items-center gap-3 bg-card ring-1 ring-border rounded-sm px-4 py-2.5 transition-colors hover:ring-primary/60"
                >
                  <span
                    aria-hidden
                    className="inline-block size-1.5 rounded-full bg-primary"
                  />
                  <span className="text-sm font-medium text-foreground tracking-tight">
                    {fact.value}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {fact.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* LYNX IMAGE SLIDER — right */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <LynxSlider slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── Lynx editorial portrait — cross-fade slider */

function LynxSlider({
  slides,
}: {
  slides: readonly { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused || total < 2) return;
    timerRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % total),
      AUTOPLAY_MS,
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, total]);

  return (
    <div
      className="relative w-full max-w-md lg:max-w-lg"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Offset gold frame + corner brackets */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-none border border-primary/30"
      />
      <span
        aria-hidden
        className="absolute -top-3 -left-3 h-6 w-6 border-l-2 border-t-2 border-primary"
      />
      <span
        aria-hidden
        className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-primary"
      />

      {/* Editorial portrait card */}
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-none",
          "bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85",
          "ring-1 ring-border shadow-2xl shadow-foreground/20",
        )}
        aria-roledescription={total > 1 ? "carousel" : undefined}
        aria-label={total > 1 ? "Iberian lynx — portrait series" : undefined}
      >
        {slides.map((slide, i) => (
          <LynxLayer
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            active={i === index}
            priority={i === 0}
          />
        ))}

        {/* Bottom gradient + species label */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 text-background">
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary mb-1">
            Lynx pardinus
          </p>
          <p className="font-serif text-xl italic leading-tight">
            Iberian lynx
          </p>
        </div>

        {/* Slide indicator pips */}
        {total > 1 && (
          <div
            className="absolute top-5 right-5 flex items-center gap-1.5"
            role="tablist"
            aria-label="Choose slide"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show portrait ${i + 1} of ${total}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-px transition-all duration-500 cursor-pointer",
                  i === index
                    ? "w-6 bg-primary"
                    : "w-3 bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Caption below */}
      <p className="mt-5 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Native to Iberia · Guardian of the cork oak
      </p>
    </div>
  );
}

function LynxLayer({
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
        "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
        active ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      aria-hidden={!active}
    >
      {errored ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          role="img"
          aria-label={alt}
        >
          <span className="font-serif text-3xl text-primary">L. pardinus</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 32rem, 28rem"
          onError={() => setErrored(true)}
          className={cn(
            "object-cover object-center transition-transform ease-out duration-[8000ms]",
            active ? "scale-[1.02]" : "scale-100",
          )}
        />
      )}
    </div>
  );
}