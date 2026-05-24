"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { home } from "@/content/home";

export function Collections() {
  const data = home.collections;

  return (
    <section
      id="collections"
      className="relative w-full bg-muted/30 border-y border-border/60"
      aria-labelledby="collections-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
            {data.eyebrow}
          </p>
          <h2
            id="collections-heading"
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

        {/* Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {data.items.map((item, i) => (
            <li key={item.slug} className={cn(i === 1 && "lg:mt-12")}>
              <CollectionCard item={item} />
            </li>
          ))}
        </ul>

        {/* See All */}
        <div className="mt-20 text-center">
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
      </div>
    </section>
  );
}

type Item = (typeof home.collections.items)[number];

function CollectionCard({ item }: { item: Item }) {
  return (
    <Link
      href={item.href}
      className="group block"
      aria-label={`${item.name} — ${item.tagline}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
        <CollectionImage src={item.image} alt={item.name} />

        {/* Dim overlay on hover */}
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500"
        />

        {/* Hover label */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[10px] tracking-[0.3em] uppercase font-medium rounded-sm">
            View
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        {/* Tagline pill */}
        <span className="absolute top-5 left-5 inline-flex items-center bg-background/70 backdrop-blur-sm text-foreground px-3 py-1 text-[10px] tracking-[0.25em] uppercase rounded-sm">
          {item.tagline}
        </span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl lg:text-3xl font-light leading-tight">
            {item.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
            {item.description}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="mt-2 h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

function CollectionImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-secondary)_0%,_var(--color-muted)_60%,_var(--color-background)_100%)]"
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
              Placeholder
            </p>
            <code className="text-[11px] text-primary/80 font-mono break-all">
              {src}
            </code>
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
      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      onError={() => setErrored(true)}
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}
