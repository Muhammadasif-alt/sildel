"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuthenticCork } from "@/content/authentic-cork-provider";

const AUTOPLAY_MS = 4500;

export function HarvestProcess() {
  const data = useAuthenticCork().harvest;

  return (
    <section
      id="harvest-process"
      className="relative w-full bg-background"
      aria-labelledby="harvest-process-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        {/* Bordered framed container */}
        <div className="relative rounded-sm border border-border bg-card/40 backdrop-blur-[2px]">
          {/* Decorative gold corner brackets */}
          <span aria-hidden className="pointer-events-none absolute -top-px -left-px h-8 w-8 border-l-2 border-t-2 border-primary" />
          <span aria-hidden className="pointer-events-none absolute -top-px -right-px h-8 w-8 border-r-2 border-t-2 border-primary" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px h-8 w-8 border-l-2 border-b-2 border-primary" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px h-8 w-8 border-r-2 border-b-2 border-primary" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-8 lg:p-12 items-stretch">
            {/* IMAGE STACK — left */}
            <div className="w-full">
              <ImageStack images={data.images} />
            </div>

            {/* CONTENT — right */}
            <div className="flex flex-col justify-center max-w-xl">
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
                {data.eyebrow}
              </p>

              <h2
                id="harvest-process-heading"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
              >
                {data.title}
                <br />
                <span className="italic text-primary">{data.titleAccent}</span>
              </h2>

              <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {data.body}
              </p>
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
}: {
  images: readonly { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % total),
      AUTOPLAY_MS
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, total]);

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-sm bg-muted"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Cork harvest"
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
              onClick={() => setIndex(i)}
              className={cn(
                "h-px transition-all duration-500",
                i === index
                  ? "w-8 bg-primary"
                  : "w-4 bg-white/40 hover:bg-white/70"
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
        active ? "opacity-100" : "opacity-0 pointer-events-none"
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
            active ? "scale-100" : "scale-105"
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
        "hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
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

      <div
        aria-hidden
        className="h-px w-10 bg-primary/40 mb-5 transition-all group-hover:w-16 group-hover:bg-primary"
      />

      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {body}
      </p>
    </article>
  );
}
