"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products, formatPrice } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Per-slug Nano Banana image override for the home page grid only.
// Keeps the product catalog's real photos intact for the detail/listing pages.
const HOME_IMAGE: Record<string, string> = {
  shell:
    "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_4.webp",
  alexis:
    "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_2.webp",
  crescent:
    "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_2.webp",
  "carre-dor":
    "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_3.webp",
  island:
    "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_1.webp",
  fireflies:
    "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_3.webp",
};

const FEATURED_SLUGS = [
  "shell",
  "alexis",
  "crescent",
  "carre-dor",
  "island",
  "fireflies",
];

const featured = FEATURED_SLUGS.map((slug) => {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  return { ...product, image: HOME_IMAGE[slug] ?? product.image };
}).filter((p): p is (typeof products)[number] => Boolean(p));

export function FeaturedTreasures({
  data: dataProp,
}: { data?: HomeContent["featuredTreasuresSection"] } = {}) {
  const data = dataProp ?? home.featuredTreasuresSection;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      aria-labelledby="featured-treasures-heading"
      className="relative bg-muted/40 py-24 lg:py-32"
    >
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary">
              {data.eyebrow}
            </p>
            <h2
              id="featured-treasures-heading"
              className="font-serif text-4xl font-light leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {data.title}{" "}
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <Link
              href="/treasures"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground transition-colors hover:text-primary"
            >
              {data.viewAll}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.08,
                ease: EASE,
              }}
            >
              <Link
                href={`/treasures/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card ring-1 ring-border/70 transition-all duration-500 group-hover:ring-primary/50 group-hover:shadow-2xl group-hover:shadow-foreground/10 group-hover:-translate-y-1">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                  />

                  {p.badge && (
                    <span className="absolute top-4 left-4 rounded-full bg-card/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
                      {p.badge}
                    </span>
                  )}

                  {/* Hover overlay with CTA */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="m-4 flex items-center justify-between rounded-xl bg-card/95 px-5 py-3 shadow-lg backdrop-blur-sm">
                      <span className="text-xs uppercase tracking-[0.22em] text-foreground">
                        {data.viewTreasure}
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="mt-1 truncate font-serif text-xl leading-tight transition-colors group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="shrink-0 font-serif text-xl text-primary">
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
