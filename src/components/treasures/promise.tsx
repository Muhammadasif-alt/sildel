"use client";

import { PenLine, Hash, MapPin, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTreasures } from "@/content/treasures-provider";

// Icons keyed by index — locale-safe (titles change between languages).
const PROMISE_ICONS: LucideIcon[] = [PenLine, Hash, MapPin, TreePine];

export function Promise() {
  const data = useTreasures().content.promise;

  return (
    <section
      id="promise"
      className="relative w-full bg-background"
      aria-labelledby="promise-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-8" aria-hidden>
            <span className="h-px w-10 bg-primary/40" />
            <span className="text-xs tracking-[0.4em] uppercase text-primary">
              {data.eyebrow}
            </span>
            <span className="h-px w-10 bg-primary/40" />
          </div>
          <h2
            id="promise-heading"
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

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title}>
              <PromiseCard
                index={i + 1}
                title={item.title}
                body={item.body}
                Icon={PROMISE_ICONS[i]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PromiseCard({
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
        "p-7 lg:p-8 transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-start justify-between mb-8">
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-medium">
          {String(index).padStart(2, "0")}
        </span>
        {Icon && (
          <span
            aria-hidden
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full",
              "border border-primary/30 bg-primary/5 text-primary",
              "transition-all duration-500",
              "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.4} />
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 leading-tight">
        {title}
      </h3>

      <div aria-hidden className="h-px w-10 bg-primary/40 mb-4 transition-all group-hover:w-16 group-hover:bg-primary" />

      <p className="text-sm text-muted-foreground leading-relaxed">
        {body}
      </p>
    </article>
  );
}
