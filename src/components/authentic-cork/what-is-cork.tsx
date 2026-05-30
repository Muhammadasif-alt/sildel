"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuthenticCork } from "@/content/authentic-cork-provider";

export function WhatIsCork() {
  const data = useAuthenticCork().whatIsCork;

  return (
    <section
      id="what-is-cork"
      className="relative w-full bg-background"
      aria-labelledby="what-is-cork-heading"
    >
      <div className="mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 px-6 py-24 lg:px-12 lg:py-36 items-center">
        {/* CONTENT — left */}
        <div className="lg:col-span-6 max-w-xl order-2 lg:order-1">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>

          <h2
            id="what-is-cork-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
          >
            {data.title}
            <br />
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>

          <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

          <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
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
        </div>

        {/* IMAGE — right (with continuous Ken Burns + callout card overlay) */}
        <div className="lg:col-span-6 relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
            <KenBurnsImage src={data.image} alt={data.imageAlt} />

            {/* Inner ring + bottom gradient */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent"
            />
          </div>

          {/* Callout card — floating bottom-right of image */}
          <div className="absolute -bottom-5 -right-3 lg:-bottom-8 lg:-right-8 z-10 inline-flex flex-col items-end bg-card text-foreground px-6 py-5 lg:px-8 lg:py-6 shadow-2xl shadow-primary/10 ring-1 ring-border rounded-sm">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-block size-1.5 rounded-full bg-primary"
                aria-hidden
              />
              <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                {data.callout.label}
              </span>
            </div>
            <div className="font-serif text-3xl md:text-4xl text-foreground leading-none">
              {data.callout.value}
              <span className="text-base text-primary ml-2 align-top">
                lifespan
              </span>
            </div>
          </div>

          {/* Decorative gold corner brackets */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-2 -left-2 h-6 w-6 border-l-2 border-t-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-2 -right-2 h-6 w-6 border-r-2 border-t-2 border-primary"
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── Ken Burns image (loops gently) */

function KenBurnsImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-secondary)_0%,_var(--color-muted)_55%,_var(--color-background)_100%)]"
        role="img"
        aria-label={alt}
      />
    );
  }

  // kenBurns keyframe lives in globals.css so it isn't re-emitted on each render.
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      onError={() => setErrored(true)}
      className="object-cover animate-[kenBurns_18s_ease-in-out_infinite_alternate]"
    />
  );
}
