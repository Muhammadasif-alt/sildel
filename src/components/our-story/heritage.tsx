"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useOurStory } from "@/content/our-story-provider";

const AUTOPLAY_MS = 5500;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Heritage() {
  const data = useOurStory().heritage;
  const total = data.images.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % total),
      AUTOPLAY_MS,
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, total]);

  const active = data.images[index];

  return (
    <section
      id="heritage"
      className="relative w-full bg-muted/30"
      aria-labelledby="heritage-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        {/* Bordered framed container */}
        <div className="relative rounded-sm border border-border bg-background/40 backdrop-blur-[2px]">
          {/* Decorative gold corner brackets */}
          <span aria-hidden className="pointer-events-none absolute -top-px -left-px h-8 w-8 border-l-2 border-t-2 border-primary" />
          <span aria-hidden className="pointer-events-none absolute -top-px -right-px h-8 w-8 border-r-2 border-t-2 border-primary" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px h-8 w-8 border-l-2 border-b-2 border-primary" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px h-8 w-8 border-r-2 border-b-2 border-primary" />

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-8 lg:p-12 items-stretch"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* CONTENT — left, swaps with active slide */}
            <div className="flex flex-col justify-center max-w-xl">
              {/* Section eyebrow — sticky across slides */}
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
                {data.eyebrow}
              </p>

              {/* Section headline — sticky */}
              <h2
                id="heritage-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] mb-6"
              >
                {data.title}
                <br />
                <span className="italic text-primary">{data.titleAccent}</span>
              </h2>

              <div className="h-px w-12 bg-primary/60 mb-6" aria-hidden />

              {/* Per-slide content — crossfades with image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="text-[10px] tracking-[0.35em] uppercase text-primary/80 mb-2">
                    {active.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {active.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slide nav — readable text labels for SEO + a11y */}
              <ul className="mt-8 flex flex-wrap gap-2" role="tablist">
                {data.images.map((img, i) => (
                  <li key={img.src}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`${img.eyebrow} — ${img.title}`}
                      onClick={() => setIndex(i)}
                      className={cn(
                        "px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] rounded-sm border transition-colors",
                        i === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")} · {img.eyebrow}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ANIMATED IMAGE STACK — right */}
            <div className="w-full">
              <ImageStack
                images={data.images}
                index={index}
                onSelect={setIndex}
              />
            </div>
          </div>
        </div>

        {/* FACT CARDS — below */}
        <div className="mt-12 lg:mt-16">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {data.facts.map((fact, i) => (
              <li key={fact.label}>
                <FactCard index={i + 1} value={fact.value} label={fact.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── Animated image stack */

function ImageStack({
  images,
  index,
  onSelect,
}: {
  images: readonly { src: string; alt: string }[];
  index: number;
  onSelect: (i: number) => void;
}) {
  const total = images.length;

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-sm bg-muted"
      aria-roledescription="carousel"
      aria-label="Cork forest heritage"
    >
      {images.map((img, i) => (
        <ImageLayer
          key={img.src}
          src={img.src}
          alt={img.alt}
          active={i === index}
        />
      ))}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
      />

      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
        <span className="text-xs tracking-[0.3em] uppercase backdrop-blur-sm bg-black/30 px-3 py-1 rounded-sm">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2" role="tablist">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}`}
              onClick={() => onSelect(i)}
              className={cn(
                "h-px transition-all duration-500",
                i === index
                  ? "w-8 bg-primary"
                  : "w-4 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageLayer({
  src,
  alt,
  active,
}: {
  src: string;
  alt: string;
  active: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-1000 ease-out",
        active ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      aria-hidden={!active}
    >
      {errored ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.45_0.08_75)_0%,_oklch(0.25_0.04_60)_55%,_oklch(0.12_0.02_50)_100%)]"
          role="img"
          aria-label={alt}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          onError={() => setErrored(true)}
          className={cn(
            "object-cover transition-transform ease-out",
            active
              ? "scale-100 duration-[6000ms]"
              : "scale-105 duration-[6000ms]",
          )}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────── Fact card */

function FactCard({
  index,
  value,
  label,
}: {
  index: number;
  value: string;
  label: string;
}) {
  return (
    <article
      className={cn(
        "group h-full relative overflow-hidden rounded-sm border border-border bg-card",
        "p-6 lg:p-8 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/5",
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-start justify-between mb-6">
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-primary/60 transition-all group-hover:bg-primary group-hover:scale-150"
        />
      </div>

      <div className="font-serif text-4xl md:text-5xl text-foreground leading-none mb-4">
        {value}
      </div>

      <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground leading-relaxed">
        {label}
      </p>
    </article>
  );
}
