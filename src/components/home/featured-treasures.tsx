"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Featured pieces on the home page — two hero pieces only. The rest of the
// catalogue lives on /treasures; a centred "view all" button below sends
// shoppers there. Founder asked for the home to read as a teaser, not a grid.
const FEATURED_SLUGS = ["carre-dor", "crescent"];

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
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 lg:px-12">
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
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
                {/* Card frame matches the /treasures listing so the home page
                    teaser and the catalogue read as one visual system. */}
                <article className="h-full rounded-md border border-border/60 bg-card/60 p-5 sm:p-6 md:p-8 transition-all duration-500 ease-out group-hover:border-foreground/40 group-hover:bg-card/80">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted/40 rounded-sm">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-6 md:mt-8 text-center">
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {p.tagline}
                    </p>
                    <p className="mt-4 font-serif text-lg md:text-xl text-foreground">
                      {formatPrice(p.priceCents)}
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Single centred CTA — drives the rest of the catalogue. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-14 lg:mt-16 flex justify-center"
        >
          <Link
            href="/treasures"
            className="group inline-flex items-center gap-3 bg-foreground text-background border border-foreground rounded-full px-7 md:px-9 py-3 md:py-3.5 text-[11px] tracking-[0.32em] uppercase font-medium transition-all duration-300 ease-out hover:bg-transparent hover:text-foreground hover:-translate-y-0.5"
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
