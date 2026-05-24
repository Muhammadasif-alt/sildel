"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useYouThinkCork } from "@/content/you-think-cork-provider";

export function Possibilities() {
  const data = useYouThinkCork().possibilities;

  return (
    <section
      id="possibilities"
      className="relative w-full bg-muted/30 border-y border-border/60"
      aria-labelledby="possibilities-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="possibilities-heading"
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

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title}>
              <PossibilityCard
                index={i + 1}
                title={item.title}
                body={item.body}
                image={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PossibilityCard({
  index,
  title,
  body,
  image,
}: {
  index: number;
  title: string;
  body: string;
  image: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5">
      <span
        aria-hidden
        className="absolute top-0 left-0 z-20 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-5 items-stretch">
        {/* Image */}
        <div className="sm:col-span-2 relative aspect-[4/5] sm:aspect-auto sm:min-h-[280px] bg-muted overflow-hidden">
          <PossibilityImage src={image} alt={title} />
          <div
            aria-hidden
            className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
          />
        </div>

        {/* Content */}
        <div className="sm:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-medium">
              {String(index).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-primary/40 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 leading-tight">
            {title}
          </h3>
          <div className="h-px w-10 bg-primary/40 mb-4 transition-all group-hover:w-16 group-hover:bg-primary" aria-hidden />
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </article>
  );
}

function PossibilityImage({ src, alt }: { src: string; alt: string }) {
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
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
      onError={() => setErrored(true)}
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
    />
  );
}
