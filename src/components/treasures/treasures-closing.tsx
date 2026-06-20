import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Closing parallax CTA for /treasures — same treatment as
 * StoryClosing / CorkClosing / PartnersClosing so the editorial
 * pages all rhyme. Data-driven — the route passes the rendered
 * cta object (resolved from Mongo or the TS fallback).
 */
export type TreasuresClosingData = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  body: string;
  label: string;
  href: string;
  backgroundImage: string;
  closingLine?: string;
};

export function TreasuresClosing({ cta }: { cta: TreasuresClosingData }) {
  return (
    <section
      aria-labelledby="treasures-closing-heading"
      className="relative flex w-full items-center justify-center overflow-hidden bg-scroll bg-cover bg-center px-6 py-24 md:py-32 lg:bg-fixed lg:py-40"
      style={{ backgroundImage: `url('${cta.backgroundImage}')` }}
    >
      <div aria-hidden className="absolute inset-0 bg-white/70" />

      <ScrollReveal className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-foreground/70">
          {cta.eyebrow}
        </p>
        <h2
          id="treasures-closing-heading"
          className="font-serif text-3xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]"
        >
          {cta.title}
          {cta.titleAccent ? (
            <>
              {" "}
              <span className="italic">{cta.titleAccent}</span>
            </>
          ) : null}
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {cta.body}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href={cta.href}
            className="group inline-flex items-center justify-center gap-3 bg-[#5b6740] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-[#4a5530]"
          >
            {cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
        {cta.closingLine ? (
          <p className="mt-10 text-[11px] uppercase tracking-[0.32em] text-foreground/55">
            {cta.closingLine}
          </p>
        ) : null}
      </ScrollReveal>
    </section>
  );
}