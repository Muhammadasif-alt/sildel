"use client";

import {
  Feather,
  Droplets,
  Flame,
  ShieldCheck,
  Leaf,
  Infinity as InfinityIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthenticCork } from "@/content/authentic-cork-provider";

// Icons keyed by index — locale-safe (titles change between languages).
const PROPERTY_ICONS: LucideIcon[] = [
  Feather,
  Droplets,
  Flame,
  ShieldCheck,
  Leaf,
  InfinityIcon,
];

export function Properties() {
  const data = useAuthenticCork().properties;

  return (
    <section
      id="properties"
      className="relative w-full bg-muted/30 border-y border-border/60 overflow-hidden"
      aria-labelledby="properties-heading"
    >
      {/* Soft background ornament */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_15%_25%,_var(--color-primary)_0%,_transparent_45%),radial-gradient(circle_at_85%_75%,_var(--color-secondary)_0%,_transparent_45%)]"
      />

      <div className="relative mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-36">
        {/* Centered header */}
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
            id="properties-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]"
          >
            {data.title}{" "}
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>

          <div className="mx-auto h-px w-16 bg-primary/60 my-8" aria-hidden />

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* Property cards — 6 in a 3-col grid (md: 2 col, mobile: 1 col) */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title}>
              <PropertyCard
                index={i + 1}
                title={item.title}
                body={item.body}
                Icon={PROPERTY_ICONS[i]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── Property card */

function PropertyCard({
  index,
  title,
  body,
  Icon,
}: {
  index: number;
  title: string;
  body: string;
  Icon?: LucideIcon;
}) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-sm border border-border bg-card",
        "p-7 lg:p-9 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
      )}
    >
      {/* Gold accent line revealing on hover */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      {/* Index + icon row */}
      <div className="flex items-start justify-between mb-8">
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-medium">
          {String(index).padStart(2, "0")}
        </span>

        {Icon && (
          <span
            aria-hidden
            className={cn(
              "inline-flex h-14 w-14 items-center justify-center rounded-full",
              "border border-primary/30 bg-primary/5 text-primary",
              "transition-all duration-500",
              "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
              "group-hover:scale-110 group-hover:rotate-[8deg]"
            )}
          >
            <Icon className="h-6 w-6" strokeWidth={1.3} />
          </span>
        )}
      </div>

      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight">
        {title}
      </h3>

      <div
        aria-hidden
        className="h-px w-10 bg-primary/40 mb-5 transition-all duration-500 group-hover:w-16 group-hover:bg-primary"
      />

      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {body}
      </p>
    </article>
  );
}
