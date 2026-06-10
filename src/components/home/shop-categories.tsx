"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * 3×2 grid of "ways in" — four product categories plus Limited Editions
 * and Bespoke. Founder direction (June 2026): rounded cards, full-bleed
 * atelier image (object-cover, no inner white frame), title + tagline
 * below, no piece count, no CTA button. Cards reuse the editorial
 * "Ehance Slidel" renders so the section reads as one moodboard with
 * the hero slider and Why-Choose band.
 */
const CARDS = [
  {
    slug: "sculpture",
    dictKey: "sculpture",
    image: "/Slidel/enhance/enhance-sculpture-05.webp",
    href: "/treasures?category=sculpture",
  },
  {
    slug: "tables",
    dictKey: "tables",
    image: "/Slidel/enhance/enhance-tables-05.webp",
    href: "/treasures?category=tables",
  },
  {
    slug: "lighting",
    dictKey: "lighting",
    image: "/Slidel/enhance/enhance-lighting-05.webp",
    href: "/treasures?category=lighting",
  },
  {
    slug: "fine-arts",
    dictKey: "fineArts",
    image: "/Slidel/enhance/enhance-fine-arts-06.webp",
    href: "/treasures?category=fine-arts",
  },
  {
    slug: "limited",
    dictKey: "limited",
    image: "/Slidel/enhance/enhance-carre-dor-04.webp",
    href: "/treasures#carre-dor",
  },
  {
    slug: "bespoke",
    dictKey: "bespoke",
    image: "/Slidel/enhance/enhance-misc-15.webp",
    href: "/contact",
  },
] as const;

export function ShopCategories({
  data: dataProp,
}: { data?: HomeContent["shopCategoriesSection"] } = {}) {
  const data = dataProp ?? home.shopCategoriesSection;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const cats = CARDS.map((c) => {
    const dict = (data.categories as Record<string, { label: string; tagline: string }>)[c.dictKey];
    return {
      slug: c.slug,
      label: dict?.label ?? c.slug,
      tagline: dict?.tagline ?? "",
      image: c.image,
      href: c.href,
    };
  });

  return (
    <section
      aria-labelledby="shop-categories-heading"
      className="relative bg-background py-24 lg:py-32"
    >
      <div ref={ref} className="w-full px-6 lg:px-12 xl:px-16">
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

        {/* 3 × 2 grid: six rounded cards, full-bleed atelier image, no
            inner padding, no count badge, no CTA button. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + (i % 3) * 0.1,
                ease: EASE,
              }}
            >
              <Link
                href={cat.href}
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.22)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.32)]">
                  {/* Full-bleed atelier scene — `object-cover` so the image
                      fills the frame edge-to-edge with no inner white. */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Card foot — title + tagline only. No count badge,
                      no button (the whole card is the link). */}
                  <div className="flex flex-1 flex-col px-6 py-7 md:px-8 md:py-8">
                    <h3 className="font-serif text-2xl font-light leading-tight text-foreground md:text-3xl">
                      {cat.label}
                    </h3>
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