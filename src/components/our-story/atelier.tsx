"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useOurStory } from "@/content/our-story-provider";

const AUTOPLAY_MS = 5500;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Atelier() {
  const data = useOurStory().atelier;
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
      id="atelier"
      className="relative w-full bg-background"
      aria-labelledby="atelier-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        {/* Bordered framed container */}
        <div className="relative rounded-sm border border-border bg-card/40 backdrop-blur-[2px]">
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
            {/* ANIMATED IMAGE STACK — left */}
            <div className="w-full order-1 lg:order-1">
              <ImageStack
                images={data.images}
                index={index}
                onSelect={setIndex}
              />
            </div>

            {/* CONTENT — right, swaps with active slide */}
            <div className="flex flex-col justify-center max-w-xl order-2 lg:order-2">
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
                {data.eyebrow}
              </p>

              <h2
                id="atelier-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] mb-6"
              >
                {data.title}
                <br />
                <span className="italic text-primary">{data.titleAccent}</span>
              </h2>

              <div className="h-px w-12 bg-primary/60 mb-6" aria-hidden />

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
          </div>
        </div>

        {/* PROCESS STEP CARDS — below */}
        <ol className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {data.steps.map((step, i) => (
            <li key={step.number}>
              <StepCard
                index={i}
                total={data.steps.length}
                number={step.number}
                title={step.title}
                body={step.body}
              />
            </li>
          ))}
        </ol>
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
      aria-label="The Sildel atelier"
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
            "object-cover transition-transform ease-out duration-[6000ms]",
            active ? "scale-100" : "scale-105",
          )}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────── Process step card */

function StepCard({
  index,
  total,
  number,
  title,
  body,
}: {
  index: number;
  total: number;
  number: string;
  title: string;
  body: string;
}) {
  const isLast = index === total - 1;

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-sm border border-border bg-card",
        "p-6 lg:p-8 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/5",
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-center justify-between mb-8">
        <span className="font-serif text-5xl md:text-6xl text-primary/30 leading-none transition-colors group-hover:text-primary/60">
          {number}
        </span>

        {!isLast && (
          <span
            aria-hidden
            className="hidden md:flex items-center text-muted-foreground/40 group-hover:text-primary transition-colors"
          >
            <span className="h-px w-6 bg-current" />
            <span className="ml-1 inline-block size-1.5 rounded-full bg-current" />
          </span>
        )}
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight">
        {title}
      </h3>

      <div className="h-px w-10 bg-primary/40 mb-5 transition-all group-hover:w-16 group-hover:bg-primary" aria-hidden />

      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {body}
      </p>
    </article>
  );
}
