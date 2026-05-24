"use client";

import { useState } from "react";
import Image from "next/image";
import { useOurStory } from "@/content/our-story-provider";

export function Origin() {
  const data = useOurStory().origin;

  return (
    <section
      id="origin"
      className="relative w-full bg-background"
      aria-labelledby="origin-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 px-6 py-24 lg:px-10 lg:py-32 items-center">
        {/* IMAGE — left */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
            <OriginImage src={data.image} alt={data.imageAlt} />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent"
            />
          </div>

          {/* "Est. 2020" badge — overlapping the image, bottom-left */}
          <div className="absolute -bottom-5 left-5 lg:-bottom-6 lg:-left-6 z-10 inline-flex items-center gap-3 bg-card text-foreground px-5 py-3 shadow-xl ring-1 ring-border rounded-sm">
            <span className="inline-block size-1.5 rounded-full bg-primary" aria-hidden />
            <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
              {data.year}
            </span>
          </div>
        </div>

        {/* CONTENT — right */}
        <div className="lg:col-span-6 max-w-xl">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>

          <h2
            id="origin-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
          >
            {data.title}
            <br />
            <span className="italic text-primary">{data.titleAccent}</span>
          </h2>

          <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

          <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            {data.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? // Drop-cap on first paragraph for editorial feel
                      "first-letter:font-serif first-letter:text-5xl first-letter:font-light first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9]"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OriginImage({ src, alt }: { src: string; alt: string }) {
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
      sizes="(min-width: 1024px) 50vw, 100vw"
      onError={() => setErrored(true)}
      className="object-cover"
    />
  );
}
