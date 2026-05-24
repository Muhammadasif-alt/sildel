"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthenticCork } from "@/content/authentic-cork-provider";

export function CorkInSildel() {
  const data = useAuthenticCork().inSildel;

  return (
    <section
      id="cork-in-sildel"
      className="relative w-full bg-background"
      aria-labelledby="cork-in-sildel-heading"
    >
      <div className="mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 px-6 py-24 lg:px-12 lg:py-32 items-center">
        {/* IMAGE — left */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] lg:aspect-square w-full overflow-hidden rounded-sm bg-muted">
            <KenBurnsImage src={data.image} alt={data.imageAlt} />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent"
            />
          </div>

          {/* Gold corner brackets (bottom only — different from WhatIsCork's top brackets) */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-l-2 border-b-2 border-primary"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-r-2 border-b-2 border-primary"
          />

          {/* Floating "BY HAND" badge — top-left of image */}
          <div className="absolute -top-3 -left-3 lg:-top-5 lg:-left-5 z-10 inline-flex flex-col items-start bg-card text-foreground px-5 py-3 lg:px-6 lg:py-4 shadow-2xl shadow-primary/10 ring-1 ring-border rounded-sm">
            <div className="flex items-center gap-2 mb-1">
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full bg-primary"
              />
              <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                Made
              </span>
            </div>
            <div className="font-serif text-xl md:text-2xl text-foreground leading-none italic">
              by hand.
            </div>
          </div>
        </div>

        {/* CONTENT — right */}
        <div className="lg:col-span-6 max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-medium">
              05
            </span>
            <span className="h-px w-6 bg-primary/40" aria-hidden />
            <p className="text-xs tracking-[0.4em] uppercase text-primary">
              {data.eyebrow}
            </p>
          </div>

          <h2
            id="cork-in-sildel-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
          >
            {data.title}
            <br />
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>

          <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
            {data.body}
          </p>

          {/* Checklist — 3 points with gold check badges */}
          <ol className="space-y-3" aria-label="How Sildel works with cork">
            {data.points.map((point, i) => (
              <li key={i}>
                <ChecklistItem index={i + 1} text={point} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── Ken Burns image (continuous loop) */

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

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        onError={() => setErrored(true)}
        className="object-cover animate-[kenBurnsSildel_20s_ease-in-out_infinite_alternate]"
      />
      <style>{`
        @keyframes kenBurnsSildel {
          0%   { transform: scale(1.02) translate(0, 0); }
          50%  { transform: scale(1.08) translate(1.5%, -1%); }
          100% { transform: scale(1.12) translate(-1%, 1%); }
        }
      `}</style>
    </>
  );
}

/* ────────────────────────────────────────── Checklist item */

function ChecklistItem({ index, text }: { index: number; text: string }) {
  return (
    <div
      className={cn(
        "group flex items-center gap-5 rounded-sm border border-border bg-card",
        "px-5 py-4 lg:px-6 lg:py-5 transition-all duration-300",
        "hover:border-primary hover:bg-card hover:translate-x-1 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full",
          "border border-primary/30 bg-primary/5 text-primary",
          "transition-all duration-300",
          "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
        )}
      >
        <Check className="h-4 w-4" strokeWidth={2.4} />
      </span>

      <div className="flex-1 flex items-center justify-between gap-4">
        <p className="text-sm md:text-base text-foreground leading-snug font-medium">
          {text}
        </p>
        <span
          aria-hidden
          className="shrink-0 text-[10px] tracking-[0.35em] uppercase text-muted-foreground transition-colors group-hover:text-primary"
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
