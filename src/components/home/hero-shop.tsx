"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowRight, Award, Hammer, Play, Star, Truck } from "lucide-react";
import { products, formatPrice } from "@/content/treasures";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// First slide lingers so visitors take in the hero; subsequent slides cycle faster.
const FIRST_SLIDE_MS = 6000;
const NEXT_SLIDE_MS = 3000;

// Hero slides — Nano Banana cork sculpture renders, paired with our real product
// catalogue entries so the floating card carries name/price/slug.
const SLIDES = [
  { ...products.find((p) => p.slug === "shell")!, heroImage: "/images/home/hero-1.png" },
  { ...products.find((p) => p.slug === "crescent")!, heroImage: "/images/home/hero-2.png" },
  { ...products.find((p) => p.slug === "carre-dor")!, heroImage: "/images/home/hero-3.png" },
  { ...products.find((p) => p.slug === "alexis")!, heroImage: "/images/home/hero-4.png" },
  { ...products.find((p) => p.slug === "island")!, heroImage: "/images/home/hero-5.png" },
];


const reveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.6 + i * 0.1 },
  }),
};

export function HeroShop({ data: dataProp }: { data?: HomeContent["heroShop"] } = {}) {
  const data = dataProp ?? home.heroShop;
  const titleLines = data.titleLines;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slideMs = active === 0 ? FIRST_SLIDE_MS : NEXT_SLIDE_MS;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, slideMs);
    return () => clearTimeout(t);
  }, [paused, active, slideMs]);

  const current = SLIDES[active];

  return (
    <section
      aria-label="Sildel — sculptural cork treasures"
      className="relative overflow-hidden bg-background"
    >
      <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 px-6 pt-24 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:pt-32 lg:pb-28">
        {/* Left — content */}
        <div className="relative z-10 text-foreground">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary"
          >
            <span className="h-px w-8 bg-primary/60" aria-hidden />
            {data.eyebrow}
          </motion.p>

          {/* Kinetic headline — line-by-line clip reveal; last line italic */}
          <h1 className="font-serif text-5xl font-light leading-[1.02] md:text-6xl lg:text-7xl xl:text-8xl">
            {titleLines.map((text, i) => {
              const isLast = i === titleLines.length - 1;
              return (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={reveal}
                    initial="hidden"
                    animate="show"
                    className={isLast ? "block italic text-primary" : "block"}
                  >
                    {text}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          <motion.p
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {data.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/treasures"
              className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-primary px-8 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-primary/40"
            >
              <span className="relative z-10">{data.ctaPrimary}</span>
              <ArrowRight
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-foreground/90 transition-transform duration-500 ease-out group-hover:translate-x-0"
              />
            </Link>

            <a
              href="#brand-video"
              className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
            >
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/30 transition-all group-hover:border-primary group-hover:bg-primary/10">
                <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={0} />
              </span>
              {data.ctaSecondary}
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-14 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {[
                "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black.webp",
                "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_1.webp",
                "/Slidel/Nano Banana 2 - Sculptural cork art object_ soft directional warm light from upper left_matte black_2.webp",
                "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_3.webp",
              ].map((src, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="relative inline-block h-10 w-10 overflow-hidden rounded-full border-2 border-background ring-1 ring-foreground/10 bg-muted"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {data.socialProof}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — hero slider + floating product card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slider frame */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square overflow-hidden rounded-[2rem] bg-muted shadow-2xl shadow-foreground/10"
          >
            {/* Stack all slides; cross-fade by toggling opacity. No blank gap. */}
            {SLIDES.map((slide, i) => (
              <motion.div
                key={slide.slug}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 1.04,
                }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-0"
                style={{ zIndex: i === active ? 2 : 1 }}
              >
                <Image
                  src={slide.heroImage}
                  alt={slide.name}
                  fill
                  priority={i === 0}
                  // Slider frame caps at max-w-md (~28rem ≈ 448px) on mobile,
                  // max-w-none + half the grid (~540px) on lg+. Below sm the
                  // panel still respects max-w-md, so 100vw is wasteful —
                  // 90vw matches the actual rendered width with safety.
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 440px, 90vw"
                  quality={82}
                  className="object-cover"
                />
              </motion.div>
            ))}

            {/* Progress dots */}
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.name}`}
                  aria-current={i === active}
                  className="group relative h-1.5 w-7 overflow-hidden rounded-full bg-foreground/15"
                >
                  <span
                    key={i === active ? `active-${active}-${slideMs}` : `idle-${i}`}
                    aria-hidden
                    className="absolute inset-y-0 left-0 block w-full origin-left scale-x-0 bg-primary"
                    style={
                      i === active
                        ? { animation: `slide-fill ${slideMs}ms linear forwards` }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Floating product card — syncs with current slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute -bottom-4 left-2 sm:left-6 lg:-left-6"
            >
              <Link
                href={`/treasures/${current.slug}`}
                className="group flex items-center gap-4 rounded-2xl bg-card/95 p-3 pr-6 shadow-2xl ring-1 ring-border backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-foreground/15"
              >
                <span className="relative h-14 w-14 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={current.heroImage}
                    alt={current.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span className="block">
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {data.featuredLabel} · {current.category}
                  </span>
                  <span className="mt-0.5 block font-serif text-lg leading-tight">
                    {current.name}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-primary">
                    {formatPrice(current.priceCents)}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 text-foreground/60 transition-all group-hover:translate-x-1 group-hover:text-primary"
                  strokeWidth={1.5}
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Floating dot accents */}
          <motion.span
            aria-hidden
            animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 right-6 inline-block h-3 w-3 rounded-full bg-primary"
          />
          <motion.span
            aria-hidden
            animate={{ y: [0, 12, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/2 -right-2 inline-block h-2 w-2 rounded-full bg-secondary"
          />
        </motion.div>
      </div>

      {/* Bottom signature cards */}
      <div className="relative z-10 border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-[1600px] px-6 py-10 lg:px-10 lg:py-12">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
            {[
              { icon: Hammer, text: data.bottomStrip.left },
              { icon: Award, text: data.bottomStrip.middle },
              { icon: Truck, text: data.bottomStrip.right },
            ].map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="group flex items-center gap-4 rounded-sm border border-border bg-card p-5 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-foreground/5"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </span>
                <span className="text-[11px] uppercase tracking-[0.28em] text-foreground/85 leading-snug">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
