"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { products } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function countOf(category: string): number {
  return products.filter((p) => p.category === category).length;
}

/**
 * Hero photo per category. Founder direction (June 2026): use the editorial
 * "Ehance Slidel" series — cork pieces shot in Portuguese atelier scenes
 * (lime-wash walls, arched alcoves, olive branches, golden-hour light) — so
 * each category card reads as a museum moment rather than a catalogue tile.
 * Indices chosen to avoid repetition with the hero slider, treasure detail
 * heroes, and the Why-Choose band.
 */
const CATEGORY_KEYS = [
  {
    slug: "sculpture",
    productCategory: "Sculpture",
    dictKey: "sculpture",
    image: "/Slidel/enhance/enhance-sculpture-05.webp",
  },
  {
    slug: "tables",
    productCategory: "Tables",
    dictKey: "tables",
    image: "/Slidel/enhance/enhance-tables-02.webp",
  },
  {
    slug: "lighting",
    productCategory: "Lighting",
    dictKey: "lighting",
    image: "/Slidel/enhance/enhance-lighting-04.webp",
  },
  {
    slug: "fine-arts",
    productCategory: "Fine Arts",
    dictKey: "fineArts",
    image: "/Slidel/enhance/enhance-fine-arts-03.webp",
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
        <div className="mb-16 lg:mb-20 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
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
              id="shop-categories-heading"
              className="font-serif text-4xl font-light leading-[1.1] md:text-5xl lg:text-6xl"
            >
              {data.title} <span className="italic">{data.titleAccent}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {data.body}
          </motion.p>
        </div>

        {/* 3-column grid (founder direction, June 2026). Image fills card
            edge-to-edge — no inner white frame. Title + tagline + count
            sit on the cream card below the image. Shadow lifts on hover. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: EASE,
              }}
            >
              <Link
                href={`/treasures?category=${cat.slug}`}
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <article className="flex h-full flex-col overflow-hidden bg-card shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.28)]">
                  {/* Full-bleed atelier scene — object-cover so the image
                      fills the frame edge-to-edge, no inner whitespace. */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Card foot — title left, count right, tagline below. No
                      CTA button per founder direction; the whole card is
                      already a link. */}
                  <div className="flex flex-1 flex-col px-6 py-7 md:px-8 md:py-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl font-light leading-tight text-foreground md:text-3xl">
                        {cat.label}
                      </h3>
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {cat.count} {data.piecesSuffix}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {cat.tagline}
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}