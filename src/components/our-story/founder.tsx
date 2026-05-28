"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOurStory } from "@/content/our-story-provider";

export function Founder() {
  const data = useOurStory().founder;

  return (
    <section
      id="founder"
      className="relative w-full overflow-hidden bg-muted/30 border-y border-border/60"
      aria-labelledby="founder-heading"
    >
      {/* Soft background ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_15%_25%,_var(--color-primary)_0%,_transparent_45%),radial-gradient(circle_at_85%_75%,_var(--color-secondary)_0%,_transparent_45%)]"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* PORTRAIT — left */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start lg:sticky lg:top-28">
            <FounderPortrait
              src={data.image}
              alt={data.imageAlt}
              name={data.signature.name}
              role={data.signature.role}
            />
          </div>

          {/* QUOTE BLOCK — right */}
          <figure className="lg:col-span-7 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-primary/40" aria-hidden />
              <p className="text-xs tracking-[0.4em] uppercase text-primary">
                {data.eyebrow}
              </p>
            </div>

            {/* Quote — large gold mark + italic headline */}
            <div className="relative">
              <Quote
                aria-hidden
                className="absolute -left-2 -top-4 h-16 w-16 text-primary/15 lg:-left-6 lg:-top-6 lg:h-24 lg:w-24"
                strokeWidth={1}
                fill="currentColor"
              />
              <blockquote
                id="founder-heading"
                className="relative font-serif text-3xl md:text-4xl lg:text-5xl font-light italic leading-[1.15] text-foreground mb-10 pl-4 lg:pl-8 border-l-2 border-primary/40"
              >
                &ldquo;{data.pullQuote}&rdquo;
              </blockquote>
            </div>

            <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              {data.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Closing line in a subtle accent card */}
            <div className="mt-10 relative rounded-sm border-l-2 border-primary bg-card px-6 py-5">
              <p className="font-serif text-xl md:text-2xl italic text-foreground leading-snug">
                {data.closing}
              </p>
            </div>

            <figcaption className="mt-10 flex items-center gap-4">
              <span className="h-px w-8 bg-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase">
                <span className="text-foreground font-medium">
                  {data.signature.name}
                </span>
                <span className="text-muted-foreground/70 mx-2">·</span>
                <span className="text-primary">{data.signature.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── Magazine-style portrait card with signature plate */

function FounderPortrait({
  src,
  alt,
  name,
  role,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
}) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="relative w-full max-w-sm lg:max-w-md">
      {/* Decorative offset frame */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-none border border-primary/30"
      />
      <span
        aria-hidden
        className="absolute -top-3 -left-3 h-6 w-6 border-t-2 border-l-2 border-primary"
      />
      <span
        aria-hidden
        className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-primary"
      />

      {/* Portrait card — tall editorial crop */}
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-none",
          "ring-1 ring-border bg-foreground",
          "shadow-2xl shadow-foreground/20",
        )}
      >
        {errored ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-foreground"
            role="img"
            aria-label={alt}
          >
            <span className="font-serif text-6xl text-primary">{initials}</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 320px"
            priority={false}
            onError={() => setErrored(true)}
            className="object-cover object-top"
          />
        )}

        {/* Gradient at bottom for plate legibility */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent"
        />

        {/* Embedded name plate */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-background">
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary mb-1">
            {role}
          </p>
          <p className="font-serif text-2xl leading-tight">{name}</p>
        </div>
      </div>

      {/* Stats strip below portrait */}
      <ul className="mt-6 grid grid-cols-2 gap-3">
        <li className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3">
          <Sparkles
            className="h-4 w-4 text-primary shrink-0"
            strokeWidth={1.5}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Founded
            </p>
            <p className="text-xs font-medium text-foreground">2020 · Sildel</p>
          </div>
        </li>
        <li className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3">
          <MapPin
            className="h-4 w-4 text-primary shrink-0"
            strokeWidth={1.5}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Based in
            </p>
            <p className="text-xs font-medium text-foreground">Esmoriz, PT</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
