"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthenticCork } from "@/content/authentic-cork-provider";

export function CorkCta() {
  const data = useAuthenticCork().cta;

  return (
    <section
      id="cork-cta"
      className="relative w-full bg-muted/30 border-t border-border/60 overflow-hidden"
      aria-labelledby="cork-cta-heading"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-12 lg:py-36">
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
            id="cork-cta-heading"
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

        {/* Destination cards */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {data.destinations.map((dest) => (
            <li key={dest.href}>
              <DestinationCard
                eyebrow={dest.eyebrow}
                title={dest.title}
                body={dest.body}
                image={dest.image}
                imageAlt={dest.imageAlt}
                href={dest.href}
                cta={dest.cta}
              />
            </li>
          ))}
        </ul>

        {/* Closing ornament line */}
        <div
          className="mt-20 lg:mt-28 flex items-center justify-center gap-4"
          aria-hidden
        >
          <span className="h-px w-12 bg-primary/40" />
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          <span className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground">
            {data.closingLine}
          </span>
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          <span className="h-px w-12 bg-primary/40" />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────── Destination card */

type DestinationCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

function DestinationCard({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  href,
  cta,
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${title} — ${cta}`}
      className={cn(
        "group relative block overflow-hidden rounded-sm border border-border bg-card",
        "transition-all duration-300",
        "hover:border-primary hover:shadow-2xl hover:shadow-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 z-20 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
      />

      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <DestinationImage src={image} alt={imageAlt} />
        <div
          aria-hidden
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"
        />
        <span className="absolute top-5 left-5 inline-flex items-center bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 text-[10px] tracking-[0.3em] uppercase rounded-sm">
          {eyebrow}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 lg:p-10">
        <div className="flex items-start justify-between gap-6 mb-4">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-foreground">
            {title}
          </h3>
          <span
            aria-hidden
            className={cn(
              "shrink-0 inline-flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-sm",
              "border border-primary text-primary",
              "transition-all duration-300",
              "group-hover:bg-primary group-hover:text-primary-foreground"
            )}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div
          aria-hidden
          className="h-px w-10 bg-primary/40 mb-4 transition-all group-hover:w-16 group-hover:bg-primary"
        />

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
          {body}
        </p>

        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-medium text-foreground",
            "transition-colors group-hover:text-primary"
          )}
        >
          {cta}
          <span
            aria-hidden
            className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10"
          />
        </span>
      </div>
    </Link>
  );
}

function DestinationImage({ src, alt }: { src: string; alt: string }) {
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
      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
    />
  );
}
