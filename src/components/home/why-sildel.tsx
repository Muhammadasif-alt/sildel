"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { Hammer, MapPin, BadgeCheck } from "lucide-react";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Pillar icons + images keyed by index. Translatable text comes from the dict.
// Each pillar has a thematically distinct image: craft → hands shaping,
// place → Portuguese atelier doorway, signed → brass numbering stamp.
const PILLAR_DECOR = [
  {
    icon: Hammer,
    image:
      "/Slidel/Nano Banana 2 - Hands of a Portuguese craftsman shaping a cork sculpture_ workshop inwarm tungsten l_3.webp",
  },
  {
    icon: MapPin,
    image:
      "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_2.webp",
  },
  {
    icon: BadgeCheck,
    image:
      "/Slidel/Nano Banana 2 - Close-up macro of an artisan_s hand pressing a hot brass numbering stamp onto a fini_1.webp",
  },
] as const;

function Counter({
  to,
  prefix,
  suffix,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: EASE });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function WhySildel({
  data: dataProp,
}: { data?: HomeContent["whySildelSection"] } = {}) {
  const data = dataProp ?? home.whySildelSection;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const pillars = data.pillars.map((p, i) => ({
    ...p,
    icon: PILLAR_DECOR[i].icon,
    image: PILLAR_DECOR[i].image,
  }));

  return (
    <section
      aria-labelledby="why-sildel-heading"
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      <div ref={ref} className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Asymmetric header — eyebrow + headline left, intro right */}
        <div className="mb-20 grid grid-cols-1 items-end gap-10 md:mb-24 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
              <span className="h-px w-8 bg-primary/60" aria-hidden />
              {data.eyebrow}
            </p>
            <h2
              id="why-sildel-heading"
              className="font-serif text-4xl font-light leading-[1.04] text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {data.title}{" "}
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-5 lg:pb-4"
          >
            {data.body}
          </motion.p>
        </div>

        {/* Image-rich pillar cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.index}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.25 + i * 0.13,
                  ease: EASE,
                }}
                className={
                  i === 1 ? "group relative md:mt-12" : "group relative"
                }
              >
                {/* Image with overlay icon + index */}
                <div className="relative overflow-hidden rounded-3xl ring-1 ring-border/70 shadow-xl shadow-foreground/5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-foreground/15 group-hover:ring-primary/40">
                  <div className="relative aspect-[4/5] bg-muted">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                    />
                    {/* Bottom gradient for content legibility */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent"
                    />
                  </div>

                  {/* Top-left icon chip */}
                  <span className="absolute top-5 left-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-card/95 text-primary shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>

                  {/* Top-right outlined numeral */}
                  <span
                    aria-hidden
                    className="absolute top-5 right-5 select-none font-serif text-3xl leading-none text-card/90"
                  >
                    {p.index}
                  </span>

                  {/* Bottom content on image */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-2xl text-primary-foreground md:text-3xl">
                      {p.title}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-3 block h-px w-10 origin-left scale-x-100 bg-primary transition-transform duration-500 group-hover:scale-x-[4]"
                    />
                  </div>
                </div>

                {/* Body under card */}
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Stats banner — text colour intentionally `text-background` so the
            numerals invert against `bg-foreground` in both themes. Using
            `text-primary` here breaks: in dark mode --primary === --foreground
            (cream-on-cream), in light mode they're both near-black. */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-20 overflow-hidden rounded-3xl bg-foreground text-background shadow-2xl shadow-foreground/20"
        >
          <div className="grid grid-cols-2 gap-px bg-background/20 md:grid-cols-4">
            {data.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.85 + i * 0.08,
                  ease: EASE,
                }}
                className="group bg-foreground px-6 py-10 text-center transition-colors duration-500 md:py-12 hover:bg-foreground/95"
              >
                <span className="block font-serif text-5xl font-light leading-none text-background md:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span
                  aria-hidden
                  className="mx-auto mt-4 block h-px w-8 bg-background/40 transition-all duration-500 group-hover:w-12 group-hover:bg-background/70"
                />
                <span className="mt-4 block text-[10px] uppercase tracking-[0.32em] text-background/75">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
