"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Featured pieces on the home page — four well-photographed signature pieces.
// Each renders the catalog's real photo straight from R.* (no override).
const FEATURED_SLUGS = ["carre-dor", "crescent", "halley", "horizon"];

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
        <div className="mb-20 lg:mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl"
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <Link
              href="/treasures"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-foreground pb-2 border-b border-foreground/30 hover:border-foreground transition-colors"
            >
              {data.viewAll}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
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
              <Link href={`/treasures/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/40">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl lg:text-3xl font-light leading-tight text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="shrink-0 font-serif text-lg lg:text-xl text-foreground">
                    {formatPrice(p.priceCents)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
