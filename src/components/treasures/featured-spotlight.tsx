"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTreasures } from "@/content/treasures-provider";

export function FeaturedSpotlight() {
  const data = useTreasures().content.featured;

  return (
    <section
      id="featured-spotlight"
      className="relative w-full bg-muted/30 border-y border-border/60 overflow-hidden"
      aria-labelledby="featured-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_15%_25%,_var(--color-primary)_0%,_transparent_45%),radial-gradient(circle_at_85%_75%,_var(--color-secondary)_0%,_transparent_45%)]"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* IMAGE — left */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden rounded-sm bg-muted">
              <SpotlightImage src={data.image} alt={data.imageAlt} />
              <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/40" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Gold corner brackets — bottom only */}
            <span aria-hidden className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-l-2 border-b-2 border-primary" />
            <span aria-hidden className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-r-2 border-b-2 border-primary" />

            {/* Floating Limited Edition badge */}
            <div className="absolute -top-3 -left-3 lg:-top-5 lg:-left-5 z-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 lg:px-6 lg:py-4 shadow-2xl shadow-primary/20 rounded-sm">
              <Sparkles className="h-4 w-4" aria-hidden />
              <span className="text-[10px] tracking-[0.35em] uppercase font-medium">
                {data.label}
              </span>
            </div>
          </div>

          {/* CONTENT — right */}
          <div className="lg:col-span-6 max-w-xl">
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
              {data.eyebrow}
            </p>

            <h2
              id="featured-heading"
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

            {/* Spec table */}
            <dl className="border-t border-border mb-10" aria-label="Specifications">
              {data.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline gap-6 py-4 border-b border-border"
                >
                  <dt className="w-32 shrink-0 text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="text-sm md:text-base text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* CTA */}
            <Link
              href={data.cta.href}
              className="group inline-flex items-center gap-3"
            >
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 lg:px-8 py-3 lg:py-4 text-xs tracking-[0.35em] uppercase font-medium rounded-sm transition-colors group-hover:bg-primary/90">
                {data.cta.label}
              </span>
              <span className="inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-sm border border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotlightImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(ellipse_at_center,_var(--color-secondary)_0%,_var(--color-muted)_55%,_var(--color-background)_100%)]"
        )}
        role="img"
        aria-label={alt}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      onError={() => setErrored(true)}
      className="object-cover"
    />
  );
}
