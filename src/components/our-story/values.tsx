"use client";

import { TreePine, Hand, Diamond, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOurStory } from "@/content/our-story-provider";

// Pillar icons keyed by index (locale-safe — titles change between languages).
const PILLAR_ICONS: LucideIcon[] = [TreePine, Hand, Diamond];

export function Values() {
  const data = useOurStory().values;

  return (
    <section
      id="values"
      className="relative w-full bg-muted/30 border-y border-border/60 overflow-hidden"
      aria-labelledby="values-heading"
    >
      {/* Subtle background ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_20%,_var(--color-primary)_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_var(--color-secondary)_0%,_transparent_50%)]"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-36">
        {/* CENTERED STATEMENT */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div
            className="flex items-center justify-center gap-4 mb-8"
            aria-hidden
          >
            <span className="h-px w-10 bg-primary/40" />
            <span className="text-xs tracking-[0.4em] uppercase text-primary">
              {data.eyebrow}
            </span>
            <span className="h-px w-10 bg-primary/40" />
          </div>

          <h2
            id="values-heading"
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05]"
          >
            {data.title}{" "}
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>

          <div className="mx-auto h-px w-16 bg-primary/60 my-10" aria-hidden />

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* PILLAR CARDS */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {data.pillars.map((pillar, i) => (
            <li key={pillar.title}>
              <PillarCard
                index={pillar.index}
                title={pillar.title}
                body={pillar.body}
                Icon={PILLAR_ICONS[i]}
              />
            </li>
          ))}
        </ul>

        {/* PULL QUOTE */}
        <figure className="mt-20 lg:mt-28 max-w-4xl mx-auto text-center">
          <Quote
            aria-hidden
            className="mx-auto h-10 w-10 text-primary/40 mb-6"
            strokeWidth={1.2}
          />

          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] italic text-foreground">
            &ldquo;{data.quote}&rdquo;
          </blockquote>

          <figcaption className="mt-10 text-xs tracking-[0.4em] uppercase text-primary">
            {data.quoteAuthor}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── Pillar card */

function PillarCard({
  index,
  title,
  body,
  Icon,
}: {
  index: string;
  title: string;
  body: string;
  Icon?: LucideIcon;
}) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-sm border border-border bg-card",
        "p-8 lg:p-10 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
      )}
    >
      {/* Gold accent line across top on hover */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      {/* Index + icon row */}
      <div className="flex items-start justify-between mb-8">
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
          {index}
        </span>

        {Icon && (
          <span
            aria-hidden
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-110"
          >
            <Icon className="h-5 w-5" strokeWidth={1.4} />
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
