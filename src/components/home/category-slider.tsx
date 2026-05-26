"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
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
 * Quinta de Adorigo-inspired category hero — colored panels fill the viewport
 * directly under the header. No oversized intro card above; the panels are
 * the hero. Each panel hosts one signature product photo, the category name
 * running up the right edge in restrained type, and a "Discover" link.
 */
export function CategorySlider({ data }: { data: CategorySliderData }) {
  const railRef = useRef<HTMLDivElement>(null);
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
      aria-label={data.title}
      className="relative w-full bg-background"
    >
      {/* Tiny eyebrow strip — the only chrome above the panels. */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-6 lg:pt-8 pb-3 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
          {data.eyebrow}
        </p>
        <p className="hidden sm:block text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
          {data.dragHint}
        </p>
      </div>

      {/* The horizontal rail — panels are the hero, full viewport height. */}
      <div className="relative">
        <div
          ref={railRef}
          className={cn(
            "flex w-full snap-x snap-mandatory overflow-x-auto",
            "scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "[-ms-overflow-style:none]",
          )}
        >
          {data.panels.map((panel, i) => {
            const product = products.find((p) => p.slug === panel.productSlug);
            const image = product?.image;
            return (
              <Panel
                key={panel.slug}
                panel={panel}
                image={image}
                productName={product?.name ?? panel.label}
                ctaLabel={data.ctaLabel}
                isActive={i === activeIndex}
              />
            );
          })}
        </div>

        {/* Prev/Next controls */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous"
          className={cn(
            "hidden md:flex absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 z-10",
            "h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm",
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
            "hidden md:flex absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-10",
            "h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm",
            "border border-border/60 hover:bg-background transition-all",
            "disabled:opacity-0 disabled:pointer-events-none",
          )}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Panel dots — center-bottom, on top of panel edge */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3" role="tablist">
          {data.panels.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to ${p.label}`}
              onClick={() => scrollToPanel(i)}
              className={cn(
                "h-px transition-all duration-500 mix-blend-difference",
                i === activeIndex
                  ? "w-10 bg-white"
                  : "w-5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>

      {/* Slim band UNDER the slider — keeps the brand statement reachable
          without competing with the panels above. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-[1600px] px-6 lg:px-12 py-14 lg:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] max-w-2xl">
          {data.title} <span className="italic">{data.titleAccent}</span>
        </h2>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          {data.body}
        </p>
      </motion.div>
    </section>
  );
}

function Panel({
  panel,
  image,
  productName,
  ctaLabel,
  isActive,
}: {
  panel: CategoryPanel;
  image: string | undefined;
  productName: string;
  ctaLabel: string;
  isActive: boolean;
}) {
  const isDark = panel.textOnBg === "light";
  return (
    <Link
      href={`/treasures?category=${panel.slug}`}
      aria-label={`${panel.label} — ${ctaLabel}`}
      className={cn(
        "group relative shrink-0 snap-start overflow-hidden",
        // 1 panel on phone, 2 on tablet, 4 on desktop — fits all categories
        // without horizontal scroll on a normal desktop screen, matching
        // quintadeadorigo's "all panels visible at once" feel.
        "w-[88vw] sm:w-[55vw] md:w-[40vw] lg:w-[25vw]",
        "h-[calc(100svh-7rem)] min-h-[520px] max-h-[820px]",
      )}
      style={{ background: panel.bg }}
    >
      {/* Big vertical category name running up the right edge */}
      <span
        aria-hidden
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none",
          "font-serif font-light leading-none whitespace-nowrap select-none",
          // smaller, more refined — matches Quinta's restraint
          "text-[clamp(48px,7vw,92px)] tracking-tight",
          "[writing-mode:vertical-rl] [transform-origin:center] rotate-180",
          isDark ? "text-white/85" : "text-foreground/85",
          "pr-6 lg:pr-8",
        )}
      >
        {panel.label}
      </span>

      {/* Product photo — large, centered, with breathing room. */}
      {image && (
        <div className="absolute inset-0 flex items-center justify-center pt-10 pb-24 pl-4 lg:pl-8 pr-16 lg:pr-20">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={productName}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 88vw"
              priority={isActive}
              className="object-contain transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>
      )}

      {/* CTA — bottom-left, two short lines */}
      <div
        className={cn(
          "absolute bottom-12 left-6 lg:bottom-14 lg:left-8",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        <p
          className={cn(
            "text-[10px] uppercase tracking-[0.32em] mb-2 font-medium",
            isDark ? "text-white/60" : "text-foreground/60",
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