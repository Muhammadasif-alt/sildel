"use client";

import { useState } from "react";
import Image from "next/image";
import { useTreasures } from "@/content/treasures-provider";

export function TreasuresHero() {
  const data = useTreasures().content.hero;

  return (
    <section
      id="treasures-hero"
      className="relative w-full overflow-hidden isolate"
      aria-labelledby="treasures-hero-heading"
    >
      <HeroBackground src={data.image} alt={data.imageAlt} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-10 lg:py-44 min-h-[80vh] flex flex-col justify-end">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-10 bg-primary" aria-hidden />
          <p className="text-xs tracking-[0.45em] uppercase text-primary font-medium">
            {data.eyebrow}
          </p>
        </div>

        <h1
          id="treasures-hero-heading"
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] text-white max-w-4xl mb-2"
        >
          {data.title}
        </h1>
        <h2 className="font-serif italic text-primary text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] mb-8">
          {data.titleAccent}
        </h2>

        <div className="h-px w-16 bg-primary/80 mb-8" aria-hidden />

        <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl mb-10">
          {data.intro}
        </p>

        {/* Hero badge — different per page */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm ring-1 ring-white/30 rounded-sm px-5 py-3 self-start">
          <span className="inline-block size-1.5 rounded-full bg-primary" aria-hidden />
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/90">
            {data.badge.label}
          </span>
          <span className="text-white/40">·</span>
          <span className="text-[10px] tracking-[0.35em] uppercase text-primary">
            {data.badge.value}
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="h-8 w-px bg-white/40" />
      </div>
    </section>
  );
}

function HeroBackground({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.32_0.07_75)_0%,_oklch(0.18_0.04_60)_45%,_oklch(0.1_0.02_50)_100%)]"
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
      priority
      sizes="100vw"
      onError={() => setErrored(true)}
      className="object-cover -z-10"
    />
  );
}
