import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/content/home";

export function Treasures() {
  const data = home.treasures;

  return (
    <section
      id="treasures-statement"
      className="relative w-full bg-background"
      aria-labelledby="treasures-heading"
    >
      <div className="mx-auto max-w-4xl px-6 py-28 lg:py-40 text-center">
        {/* Eyebrow */}
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-10">
          {data.eyebrow}
        </p>

        {/* Decorative top ornament */}
        <div className="flex items-center justify-center gap-4 mb-12" aria-hidden>
          <span className="h-px w-12 bg-primary/40" />
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          <span className="h-px w-12 bg-primary/40" />
        </div>

        {/* Quote */}
        <blockquote className="space-y-4">
          <h2
            id="treasures-heading"
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05]"
          >
            <span className="block">{data.title}</span>
            <span className="block italic text-primary mt-2">
              {data.titleAccent}
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto pt-10">
            {data.body}
          </p>

          <footer className="pt-8 text-xs tracking-[0.4em] uppercase text-foreground/60">
            {data.signature}
          </footer>
        </blockquote>

        {/* Decorative bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-12" aria-hidden>
          <span className="h-px w-12 bg-primary/40" />
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          <span className="h-px w-12 bg-primary/40" />
        </div>

        {/* CTA */}
        <div className="mt-16">
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
