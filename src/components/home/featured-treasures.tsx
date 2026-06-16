"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Featured pieces on the home page — three signature treasures, one per
 * main category, so the home reads as a teaser of the catalogue.
 *
 * Founder direction (June 2026, third pass): match the Shop Categories
 * editorial-tile language one section above. Retire the rounded-card +
 * shadow + tinted padding treatment. Each piece is now just its
 * atelier scene at full bleed with plain inline name + tagline +
 * arrow underneath. No card chrome.
 */
// Two flagship pieces only (founder direction, June 2026, fourth pass):
// Carré d'Or for limited-edition prestige, Abyss for the unique
// sculptural anchor. The earlier third slot (Crescent) reads better in
// /treasures grid context than spotlit on the home page.
const FEATURED_SLUGS = ["carre-dor", "abyss"];

const featured = FEATURED_SLUGS.map((slug) =>
  products.find((p) => p.slug === slug),
).filter((p): p is (typeof products)[number] => Boolean(p));

export function FeaturedTreasures({
  data: dataProp,
}: { data?: HomeContent["featuredTreasuresSection"] } = {}) {
  const data = dataProp ?? home.featuredTreasuresSection;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      aria-labelledby="featured-treasures-heading"
      className="relative bg-background py-24 lg:py-32"
    >
      <div ref={ref} className="w-full px-6 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center mb-16 lg:mb-20"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {data.eyebrow}
          </p>
          <h2
            id="featured-treasures-heading"
            className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-6xl"
          >
            {data.title} <span className="italic">{data.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Two big editorial tiles — image at full bleed, plain inline
            foot beneath. Same Van Cleef language as Shop Categories:
            no card wrapper, no shadow, no rounded card frame. */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: EASE,
              }}
            >
              <Link
                href={`/treasures/${p.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {/* Blurred backdrop + contained product — landscape 4:3
                    frame matches the atelier-render source ratio so the
                    piece fills edge to edge with minimal blurred gap
                    (founder direction, June 2026: image full, no big
                    empty bands above/below). */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={p.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="scale-125 object-cover opacity-30 blur-2xl"
                  />
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="relative object-contain p-2 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] md:p-3"
                  />
                </div>

                {/* Plain inline foot — name + tagline + arrow, no padding,
                    no separator, no card edge. */}
                <div className="mt-6 flex items-baseline justify-between gap-6 md:mt-7">
                  <div>
                    <h3 className="font-serif text-2xl font-light leading-tight text-foreground transition-colors group-hover:text-primary md:text-[1.7rem] lg:text-[1.85rem]">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {p.tagline}
                    </p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                    strokeWidth={1.25}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Single centred CTA — dark inset, same language as the rest of
            the marketing CTAs (no pill, no gold). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <Link
            href="/treasures"
            className="group inline-flex items-center gap-3 bg-foreground px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
          >
            {data.viewAll}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}