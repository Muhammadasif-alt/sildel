"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Shop the Collections — founder direction (June 2026, fifth pass):
 *
 *  - Retire the rounded-card + tinted-padding treatment. Each card had
 *    huge empty space around the image (object-contain on a portrait
 *    tile with a landscape source) and the card foot read as separate
 *    e-commerce chrome.
 *  - Image now fills the tile edge-to-edge via `object-cover` on a
 *    wide landscape frame, so the atelier scene IS the tile.
 *  - Two big cards per row on desktop (was four narrow ones) — gives
 *    each category the visual weight Van Cleef / Quinta do Crasto
 *    treats their hero categories with.
 *  - Text moves OUT of the card and directly under the image as plain
 *    inline copy: serif name + small caps tagline. No card foot.
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
    image: "/Slidel/enhance/enhance-fine-arts-07.webp",
    href: "/treasures?category=fine-arts",
  },
] as const;

const SECONDARY = [
  { dictKey: "limited", href: "/treasures#carre-dor" },
  { dictKey: "bespoke", href: "/contact" },
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

  const secondary = SECONDARY.map((s) => {
    const dict = (data.categories as Record<string, { label: string; tagline: string }>)[s.dictKey];
    return {
      label: dict?.label ?? s.dictKey,
      tagline: dict?.tagline ?? "",
      href: s.href,
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

        {/* Two big cards per row on desktop — image fills tile edge-to-edge
            via object-cover; text sits directly beneath as plain inline
            copy, no card foot, no padding. */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.08,
                ease: EASE,
              }}
            >
              <Link
                href={cat.href}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {/* Full-bleed atelier scene as the tile itself — no card
                    wrapper, no rounded corners on the image area. The
                    image IS the visual statement. */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(min-width: 768px) 48vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Plain inline foot — name + tagline directly beneath the
                    image, no card padding, no separator. */}
                <div className="mt-7 flex items-baseline justify-between gap-6 md:mt-8">
                  <div>
                    <h3 className="font-serif text-3xl font-light leading-tight text-foreground transition-colors group-hover:text-primary md:text-[2rem] lg:text-[2.25rem]">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {cat.tagline}
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

        {/* Secondary text row — Limited Editions + Bespoke kept
            discoverable but quiet, beneath the main grid. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-20 flex flex-col items-start justify-center gap-5 border-t border-border/60 pt-12 sm:flex-row sm:items-center sm:gap-12 lg:mt-24"
        >
          {secondary.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group inline-flex items-baseline gap-2.5 text-foreground transition-colors hover:text-primary"
            >
              <span className="font-serif text-[16px] text-foreground/90 group-hover:text-primary">
                {s.label}
              </span>
              <span className="text-[13px] text-muted-foreground/85">
                — {s.tagline}
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}