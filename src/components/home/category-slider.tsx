"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/content/treasures";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type CategoryPanel = {
  slug: string;
  label: string;
  productSlug: string;
  bg: string;
  textOnBg: "light" | "dark";
};

export type CategorySliderData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  ctaLabel: string;
  dragHint: string;
  panels: CategoryPanel[];
};

/**
 * Quinta de Adorigo-inspired category slider.
 *
 * Desktop: 3 panels visible side-by-side in a horizontal rail, draggable.
 * Mobile: 1 panel per view, swipeable.
 *
 * Each panel is a saturated tonal background with the product photo dropped
 * in and a tall vertical category label running along the right edge — the
 * exact composition the founder asked us to mirror.
 */
export function CategorySlider({ data }: { data: CategorySliderData }) {
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const total = data.panels.length;

  const scrollToPanel = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const panel = rail.children[i] as HTMLElement | undefined;
    if (panel) {
      rail.scrollTo({ left: panel.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const handlePrev = useCallback(
    () => scrollToPanel(Math.max(0, activeIndex - 1)),
    [activeIndex, scrollToPanel],
  );
  const handleNext = useCallback(
    () => scrollToPanel(Math.min(total - 1, activeIndex + 1)),
    [activeIndex, total, scrollToPanel],
  );

  // Track which panel is closest to the rail's scroll position.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const handle = () => {
      const children = Array.from(rail.children) as HTMLElement[];
      let closest = 0;
      let minDelta = Infinity;
      children.forEach((c, i) => {
        const delta = Math.abs(c.offsetLeft - rail.scrollLeft);
        if (delta < minDelta) {
          minDelta = delta;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    rail.addEventListener("scroll", handle, { passive: true });
    return () => rail.removeEventListener("scroll", handle);
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="category-slider-heading"
      className="relative w-full bg-background"
    >
      {/* Intro band */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-20 lg:pt-28 pb-12 lg:pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
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
              id="category-slider-heading"
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
      </div>

      {/* The horizontal rail */}
      <div className="relative">
        <div
          ref={railRef}
          className={cn(
            "flex w-full snap-x snap-mandatory overflow-x-auto",
            "scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "[-ms-overflow-style:none]",
          )}
        >
          {data.panels.map((panel) => {
            const product = products.find((p) => p.slug === panel.productSlug);
            const image = product?.image;
            return (
              <Panel
                key={panel.slug}
                panel={panel}
                image={image}
                productName={product?.name ?? panel.label}
                ctaLabel={data.ctaLabel}
              />
            );
          })}
        </div>

        {/* Prev/Next controls — sit on top of the rail edges */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous"
          className={cn(
            "hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10",
            "h-12 w-12 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm",
            "border border-border/60 hover:bg-background transition-all",
            "disabled:opacity-0 disabled:pointer-events-none",
          )}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === total - 1}
          aria-label="Next"
          className={cn(
            "hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10",
            "h-12 w-12 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm",
            "border border-border/60 hover:bg-background transition-all",
            "disabled:opacity-0 disabled:pointer-events-none",
          )}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Drag hint + panel indicator dots */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 py-10 lg:py-14 flex items-center justify-between gap-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          {data.dragHint}
        </p>
        <div className="flex items-center gap-4" role="tablist">
          {data.panels.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${p.label}`}
              onClick={() => scrollToPanel(i)}
              className={cn(
                "h-px transition-all duration-500",
                i === activeIndex
                  ? "w-12 bg-foreground"
                  : "w-6 bg-foreground/30 hover:bg-foreground/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({
  panel,
  image,
  productName,
  ctaLabel,
}: {
  panel: CategoryPanel;
  image: string | undefined;
  productName: string;
  ctaLabel: string;
}) {
  const isDark = panel.textOnBg === "light";
  return (
    <Link
      href={`/treasures?category=${panel.slug}`}
      aria-label={`${panel.label} — ${ctaLabel}`}
      className={cn(
        "group relative shrink-0 snap-start overflow-hidden",
        "w-[85vw] sm:w-[60vw] md:w-[42vw] lg:w-[33.333vw] xl:w-[33.333vw]",
        "h-[80vh] md:h-[78vh] min-h-[560px]",
      )}
      style={{ background: panel.bg }}
    >
      {/* Big vertical category name running up the right edge */}
      <span
        aria-hidden
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none",
          "font-serif font-light leading-none whitespace-nowrap",
          "text-[clamp(64px,11vw,148px)] tracking-tight",
          "[writing-mode:vertical-rl] [transform-origin:center] rotate-180",
          isDark ? "text-white/90" : "text-foreground/90",
          "pr-8 lg:pr-10",
        )}
      >
        {panel.label}
      </span>

      {/* Product photo — centered, with breathing room around it */}
      {image && (
        <div className="absolute inset-0 flex items-center justify-start pl-6 lg:pl-12 pr-[28%] lg:pr-[30%]">
          <div className="relative h-[70%] w-full">
            <Image
              src={image}
              alt={productName}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 85vw"
              className="object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>
      )}

      {/* DESCOBRIR CTA — bottom-left, underlined */}
      <div
        className={cn(
          "absolute bottom-10 left-6 lg:bottom-14 lg:left-10",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        <p
          className={cn(
            "text-[10px] uppercase tracking-[0.32em] mb-2",
            isDark ? "text-white/60" : "text-foreground/55",
          )}
        >
          {productName}
        </p>
        <span
          className={cn(
            "inline-block text-[11px] tracking-[0.4em] uppercase pb-1.5 border-b transition-colors",
            isDark
              ? "border-white/40 group-hover:border-white"
              : "border-foreground/30 group-hover:border-foreground",
          )}
        >
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}