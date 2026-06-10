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
 * Founder direction (June 2026): match the Shop Categories card language
 * one section above — rounded-2xl, layered shadow, full-bleed atelier
 * image (object-cover), no inner white frame, name + small tagline below.
 * Wider container (1800 px) and 3-column grid so cards read bigger on
 * desktop.
 */
const FEATURED_SLUGS = ["carre-dor", "crescent", "abyss"];

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
          className="mx-auto max-w-2xl text-center mb-14 lg:mb-16"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.22)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.32)]">
                  {/* Full-bleed atelier scene — object-cover so the image
                      fills the frame edge-to-edge with no inner white. */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-7 md:px-8 md:py-8">
                    <h3 className="font-serif text-2xl font-light leading-tight text-foreground md:text-3xl">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {p.tagline}
                    </p>
                  </div>
                </article>
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
          className="mt-14 lg:mt-16 flex justify-center"
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