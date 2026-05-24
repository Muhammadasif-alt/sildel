"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { home } from "@/content/home";

export function Philosophy() {
  const data = home.philosophy;

  return (
    <section
      id="philosophy"
      className="relative w-full bg-background"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-6 py-24 lg:px-10 lg:py-32 items-center">
        {/* CONTENT — left */}
        <div className="order-2 lg:order-1 max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="h-4 w-4 text-primary" aria-hidden />
            <p className="text-xs tracking-[0.4em] uppercase text-primary">
              {data.eyebrow}
            </p>
          </div>

          <h2
            id="philosophy-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
          >
            {data.headline}
            <br />
            <span className="italic text-primary">{data.headlineAccent}</span>
          </h2>

          <div className="h-px w-16 bg-primary/60 mb-8" aria-hidden />

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12">
            {data.body}
          </p>

          {/* Stats */}
          <dl className="grid grid-cols-3 gap-6 mb-12 border-y border-border py-8">
            {data.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <div className="font-serif text-3xl md:text-4xl text-foreground leading-none">
                    {stat.value}
                    <span className="text-base text-primary ml-1 align-top">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] tracking-widest uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href={data.cta.href}
            className="group inline-flex items-center gap-3 text-sm tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors"
          >
            <span className="border-b border-primary/60 group-hover:border-primary pb-1">
              {data.cta.label}
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* IMAGE — right */}
        <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden rounded-sm">
          <PhilosophyImage src={data.image} alt={data.imageAlt} />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

function PhilosophyImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(ellipse_at_top_right,_var(--color-secondary)_0%,_var(--color-muted)_55%,_var(--color-background)_100%)]"
        )}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">
              Image placeholder
            </p>
            <code className="text-sm text-primary/80 font-mono">{src}</code>
          </div>
        </div>
      </div>
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
