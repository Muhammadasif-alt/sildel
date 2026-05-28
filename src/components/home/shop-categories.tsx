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

// Hero photo per category — sourced from the catalog's real client photos
// (no AI placeholders), picked for the strongest single-frame representation.
const CATEGORY_KEYS = [
  {
    slug: "sculpture",
    productCategory: "Sculpture",
    dictKey: "sculpture",
    productSlug: "abyss",
  },
  {
    slug: "tables",
    productCategory: "Tables",
    dictKey: "tables",
    productSlug: "bond",
  },
  {
    slug: "lighting",
    productCategory: "Lighting",
    dictKey: "lighting",
    productSlug: "crescent",
  },
  {
    slug: "fine-arts",
    productCategory: "Fine Arts",
    dictKey: "fineArts",
    productSlug: "carre-dor",
  },
] as const;

function imageFor(slug: string): string {
  return (
    products.find((p) => p.slug === slug)?.image ??
    "/products/SHELL_Fundo_BRANCO__MGL1443-4681c4db54.webp"
  );
}

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
    image: imageFor(c.productSlug),
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

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-14">
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
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {/* Card frame — same recipe as the featured-treasures cards
                    so every product surface on home reads as one system. */}
                <article className="h-full rounded-md border border-border bg-muted/60 p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:border-foreground/40 group-hover:bg-muted group-hover:shadow-xl">
                  <div className="relative aspect-square w-full overflow-hidden bg-white rounded-sm">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-6 md:mt-8 flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-serif text-2xl lg:text-3xl font-light text-foreground">
                        {cat.label}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {cat.tagline}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                      {cat.count} {data.piecesSuffix}
                    </span>
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
