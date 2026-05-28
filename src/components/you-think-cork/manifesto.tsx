"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { useYouThinkCork } from "@/content/you-think-cork-provider";

export function Manifesto() {
  const data = useYouThinkCork().manifesto;

  return (
    <section
      id="manifesto"
      className="relative w-full bg-muted/30 border-y border-border/60 overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      {/* Soft background ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_15%_25%,_var(--color-primary)_0%,_transparent_45%),radial-gradient(circle_at_85%_75%,_var(--color-secondary)_0%,_transparent_45%)]"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-28 lg:py-36 text-center">
        <div
          className="flex items-center justify-center gap-4 mb-10"
          aria-hidden
        >
          <span className="h-px w-10 bg-primary/40" />
          <span className="text-xs tracking-[0.4em] uppercase text-primary">
            {data.eyebrow}
          </span>
          <span className="h-px w-10 bg-primary/40" />
        </div>

        {/* Optional editorial image — only renders when admin sets one */}
        {data.image && <ManifestoImage src={data.image} alt={data.imageAlt} />}

        <Quote
          aria-hidden
          className="mx-auto h-10 w-10 text-primary/40 mb-8"
          strokeWidth={1.2}
        />

        <h2
          id="manifesto-heading"
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-light italic leading-[1.15] text-foreground mb-10"
        >
          {data.lead}
        </h2>

        {/* Lines — each on its own line, styled like a poem */}
        <ul className="space-y-4 text-foreground text-lg md:text-xl lg:text-2xl font-light leading-snug max-w-2xl mx-auto">
          {data.lines.map((line, i) => (
            <li key={i} className="flex items-start gap-4 justify-center">
              <span
                aria-hidden
                className="mt-3 inline-block size-1.5 rounded-full bg-primary shrink-0"
              />
              <span className="font-serif italic">{line}</span>
            </li>
          ))}
        </ul>

        <div className="my-12 flex items-center justify-center gap-4" aria-hidden>
          <span className="h-px w-12 bg-primary/40" />
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          <span className="h-px w-12 bg-primary/40" />
        </div>

        <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
          {data.closing}
        </p>

        <p className="mt-8 text-xs tracking-[0.4em] uppercase text-primary">
          {data.signature}
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────── Editorial image card with gold-corner frame */

function ManifestoImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative mx-auto mb-12 w-full max-w-lg">
      {/* Offset gold frame + corner brackets */}
      <span aria-hidden className="pointer-events-none absolute -inset-2 rounded-none border border-primary/30" />
      <span aria-hidden className="pointer-events-none absolute -top-2 -left-2 h-5 w-5 border-l-2 border-t-2 border-primary" />
      <span aria-hidden className="pointer-events-none absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-primary" />

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none ring-1 ring-border bg-foreground shadow-xl shadow-foreground/10">
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
            sizes="(min-width: 1024px) 32rem, 100vw"
            onError={() => setErrored(true)}
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
