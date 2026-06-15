"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Shop the Collections — founder direction (June 2026, third pass):
 *
 *  - Drop from 6 cards (3×2 grid) to 4 cards in a SINGLE row. The
 *    previous tablet 2×2 / desktop 3×2 layout was reading as cluttered
 *    and the second row was being cropped on most viewports.
 *  - Show the FULL atelier piece in every card — was getting half-cropped
 *    under `object-cover`. We now lay a soft, blurred copy of the image
 *    behind a crisp `object-contain` foreground (same Apple-Music
 *    cover-art technique used on the Awards section), so the swatch
 *    breathes edge-to-edge with no white gap AND the piece reads fully.
 *  - Limited Editions + Bespoke move to a quiet text row beneath the
 *    grid — still discoverable, just no longer competing as cards.
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

/** Categories that move to the quiet text row beneath the main grid. */
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

        {/* Four cards, single row on desktop. We skip the md:grid-cols-2
            stage entirely — the prior 2×2 tablet view was the founder's
            specific complaint. Tablet stacks vertically (still feels
            premium), desktop spreads to a single row of four. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-7 xl:gap-9">
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
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_10px_36px_-10px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_72px_-16px_rgba(0,0,0,0.28)]">
                  {/* Full-piece frame: blurred copy of the image fills the
                      backdrop so the corners are never white, then the
                      crisp `object-contain` foreground sits centred and
                      shows the FULL piece — no cropping, no gap. */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f2eb]">
                    <Image
                      src={cat.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="scale-150 object-cover opacity-40 blur-2xl"
                    />
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="relative object-contain p-6 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-7 md:px-7 md:py-8">
                    <h3 className="font-serif text-2xl font-light leading-tight text-foreground md:text-[1.7rem]">
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

        {/* Secondary row — Limited Editions + Bespoke as quiet text links
            so they stay discoverable without competing with the four
            main category tiles. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-14 flex flex-col items-start justify-center gap-5 border-t border-border/60 pt-10 sm:flex-row sm:items-center sm:gap-12 lg:mt-16"
        >
          {secondary.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group inline-flex items-baseline gap-2.5 text-[11px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-primary"
            >
              <span className="font-serif text-[15px] normal-case tracking-normal text-foreground/90 group-hover:text-primary">
                {s.label}
              </span>
              <span className="text-muted-foreground/80 text-[12px] normal-case tracking-normal">
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