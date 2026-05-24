"use client";

import { cn } from "@/lib/utils";
import { useYouThinkCork } from "@/content/you-think-cork-provider";

export function Perception() {
  const data = useYouThinkCork().perception;

  return (
    <section
      id="perception"
      className="relative w-full bg-background"
      aria-labelledby="perception-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        {/* Centered header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="perception-heading"
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

        {/* 3-stage cards */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {data.cards.map((card, i) => (
            <li key={card.index}>
              <PerceptionCard
                index={card.index}
                title={card.title}
                body={card.body}
                isLast={i === data.cards.length - 1}
                isFirst={i === 0}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PerceptionCard({
  index,
  title,
  body,
  isLast,
  isFirst,
}: {
  index: string;
  title: string;
  body: string;
  isLast: boolean;
  isFirst: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-sm border bg-card transition-all duration-300",
        "p-7 lg:p-9",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
        isFirst
          ? "border-border opacity-70 hover:opacity-100 hover:border-muted-foreground"
          : isLast
            ? "border-primary/70 hover:border-primary"
            : "border-border hover:border-primary"
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-start justify-between mb-8">
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-medium">
          {index}
        </span>
        <span
          aria-hidden
          className={cn(
            "inline-block size-1.5 rounded-full transition-all",
            isLast ? "bg-primary" : "bg-muted-foreground/40 group-hover:bg-primary"
          )}
        />
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
