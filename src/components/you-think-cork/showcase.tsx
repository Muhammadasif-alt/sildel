"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useYouThinkCork } from "@/content/you-think-cork-provider";

export function Showcase() {
  const data = useYouThinkCork().showcase;

  return (
    <section
      id="showcase"
      className="relative w-full bg-background"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="showcase-heading"
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

        {/* Asymmetric image grid — middle column offset for editorial feel */}
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {data.items.map((item, i) => (
            <li key={item.title} className={cn(i === 1 || i === 4 ? "lg:mt-12" : undefined)}>
              <ShowcaseCard
                title={item.title}
                tagline={item.tagline}
                image={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShowcaseCard({
  title,
  tagline,
  image,
}: {
  title: string;
  tagline: string;
  image: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5">
      <span
        aria-hidden
        className="absolute top-0 left-0 z-20 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <ShowcaseImage src={image} alt={`${title} — ${tagline}`} />
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent"
        />
        <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6 text-white">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-1">
            {tagline}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-light leading-tight">
            {title}
          </h3>
        </div>
      </div>
    </article>
  );
}

function ShowcaseImage({ src, alt }: { src: string; alt: string }) {
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
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      onError={() => setErrored(true)}
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
    />
  );
}
