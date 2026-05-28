"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOurStory } from "@/content/our-story-provider";

export function BrandSymbol() {
  const data = useOurStory().symbol;

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

          {/* LYNX IMAGE — right */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <LynxImage src={data.image} alt={data.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── Lynx editorial portrait — magazine card with frame */

function LynxImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      {/* Offset gold frame */}
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

      {/* Editorial portrait card — tall 4/5 with warm earth backdrop */}
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-none",
          "bg-gradient-to-br from-foreground via-foreground/95 to-foreground/85",
          "ring-1 ring-border shadow-2xl shadow-foreground/20",
          "transition-transform duration-700 ease-out hover:scale-[1.02]",
        )}
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
            sizes="(min-width: 1024px) 32rem, 28rem"
            onError={() => setErrored(true)}
            className="object-cover object-center"
          />
        )}

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
      </div>

      {/* Small habitat caption below the card */}
      <p className="mt-5 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Native to Iberia · Guardian of the cork oak
      </p>
    </div>
  );
}
