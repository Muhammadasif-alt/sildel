"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function countOf(category: string): number {
  return products.filter((p) => p.category === category).length;
}

// Curated Nano Banana cork-art hero image per category — chosen for visual
// punch on the home page, decoupled from the underlying product thumbnails.
const CATEGORY_KEYS = [
  {
    slug: "sculpture",
    productCategory: "Sculpture",
    dictKey: "sculpture",
    image:
      "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_3.webp",
  },
  {
    slug: "tables",
    productCategory: "Tables",
    dictKey: "tables",
    image:
      "/Slidel/Nano Banana 2 - Editorial overhead flat-lay of three sculptural cork art objects of varying sizes ar_1.webp",
  },
  {
    slug: "lighting",
    productCategory: "Lighting",
    dictKey: "lighting",
    image:
      "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_2.webp",
  },
  {
    slug: "fine-arts",
    productCategory: "Fine Arts",
    dictKey: "fineArts",
    image:
      "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_4.webp",
  },
] as const;

export function ShopCategories({
  data: dataProp,
}: { data?: HomeContent["shopCategoriesSection"] } = {}) {
  const data = dataProp ?? home.shopCategoriesSection;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const cats = CATEGORY_KEYS.map((c) => ({
    slug: c.slug,
    label: data.categories[c.dictKey].label,
    tagline: data.categories[c.dictKey].tagline,
    image: c.image,
    count: countOf(c.productCategory),
  }));

  return (
    <section
      aria-labelledby="shop-categories-heading"
      className="relative bg-background py-24 lg:py-32"
    >
      <div ref={ref} className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-14 flex flex-col items-start gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
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
              id="shop-categories-heading"
              className="font-serif text-4xl font-light leading-[1.05] md:text-5xl lg:text-6xl"
            >
              {data.title}{" "}
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {data.body}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: EASE,
              }}
            >
              <Link
                href={`/treasures?category=${cat.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-border/70 transition-all duration-500 hover:ring-primary/60 hover:shadow-2xl hover:shadow-foreground/15"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent transition-opacity duration-500 group-hover:from-foreground/90" />

                <span className="absolute top-4 right-4 rounded-full bg-card/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-sm">
                  {cat.count} {data.piecesSuffix}
                </span>

                <span
                  aria-hidden
                  className="absolute left-4 top-4 h-8 w-8 border-l border-t border-primary/0 transition-all duration-500 group-hover:border-primary/80"
                />
                <span
                  aria-hidden
                  className="absolute right-4 bottom-20 h-8 w-8 border-r border-b border-primary/0 transition-all duration-500 group-hover:border-primary/80"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70">
                    {cat.tagline}
                  </p>
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="font-serif text-2xl text-primary-foreground md:text-3xl">
                      {cat.label}
                    </h3>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  <span
                    aria-hidden
                    className="mt-4 block h-px w-0 origin-left bg-primary-foreground/70 transition-[width] duration-500 ease-out group-hover:w-full"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
