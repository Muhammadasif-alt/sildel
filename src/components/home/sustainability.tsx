"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Leaf } from "lucide-react";
import { home, type HomeContent } from "@/content/home";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Sustainability({ data: dataProp }: { data?: HomeContent["sustainability"] } = {}) {
  const data = dataProp ?? home.sustainability;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      id="sustainability"
      aria-labelledby="sustainability-heading"
      className="relative overflow-hidden bg-muted/40 py-24 lg:py-32"
    >
      <div ref={ref} className="relative mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* Header — asymmetric editorial */}
        <div className="grid grid-cols-1 gap-12 mb-20 lg:mb-24 lg:grid-cols-12 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
              <Leaf className="h-3.5 w-3.5" strokeWidth={1.5} />
              {data.eyebrow}
            </p>
            <h2
              id="sustainability-heading"
              className="font-serif text-4xl font-light leading-[1.05] text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {data.title}
              <br />
              <span className="italic text-primary">{data.titleAccent}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="lg:col-span-5 lg:pb-4"
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.body}
            </p>
            <div className="mt-8 flex items-baseline gap-8">
              <div>
                <span className="block font-serif text-4xl text-primary">9</span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Years between harvests
                </span>
              </div>
              <div className="h-12 w-px bg-border" aria-hidden />
              <div>
                <span className="block font-serif text-4xl text-primary">0</span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Trees felled, ever
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Editorial step cards — asymmetric offset rows */}
        <ol className="relative grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3 lg:gap-x-10">
          {/* Connecting dashed line behind cards (desktop only) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[16%] right-[16%] top-[18%] hidden h-px bg-[repeating-linear-gradient(to_right,var(--color-primary)_0_6px,transparent_6px_14px)] opacity-40 md:block"
          />

          {data.steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 56 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: EASE,
              }}
              className={
                i === 1
                  ? "group relative md:mt-16"
                  : "group relative"
              }
            >
              {/* Image card */}
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-border/70 shadow-xl shadow-foreground/5 transition-all duration-500 group-hover:shadow-foreground/15 group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] w-full bg-muted">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                  />
                  {/* Subtle warmth wash on image */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent"
                  />
                </div>

                {/* Large outlined numeral hanging off corner */}
                <span
                  aria-hidden
                  className="absolute -bottom-4 -right-2 select-none font-serif text-[5rem] leading-none text-card transition-colors duration-500 group-hover:text-primary"
                  style={{
                    WebkitTextStroke: "1.5px currentColor",
                    color: "transparent",
                  }}
                >
                  {step.number}
                </span>
                <span
                  aria-hidden
                  className="absolute -bottom-4 -right-2 select-none font-serif text-[5rem] leading-none text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="mt-8">
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">
                  Step {step.number}
                </p>
                <h3 className="mb-3 font-serif text-2xl text-foreground md:text-3xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {step.body}
                </p>
                <span
                  aria-hidden
                  className="mt-5 block h-px w-10 origin-left scale-x-100 bg-primary/50 transition-transform duration-500 group-hover:scale-x-[4]"
                />
              </div>
            </motion.li>
          ))}
        </ol>

        {/* CTA section — 2-column image + content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-24 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-foreground/5 lg:mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — image */}
            <div className="relative aspect-[4/3] min-h-[320px] lg:aspect-auto lg:min-h-[460px]">
              <Image
                src="/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_2.webp"
                alt="Ancient Portuguese cork oak with bark recently harvested."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-foreground/30 via-transparent to-transparent"
              />
              <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-card/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur-sm">
                <Leaf className="h-3 w-3 text-primary" aria-hidden />
                Cork forest, Alentejo
              </span>
            </div>

            {/* Right — content + CTA */}
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
                <span className="h-px w-8 bg-primary/60" aria-hidden />
                A forest that gives
              </p>
              <h3 className="font-serif text-3xl font-light leading-[1.1] text-foreground md:text-4xl lg:text-5xl">
                The forest grows{" "}
                <span className="italic text-primary">stronger</span> with every
                harvest.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Cork oaks live for two centuries — each harvest leaves the tree
                standing, the soil intact, and the next generation already growing
                back. The forest is our most patient collaborator.
              </p>

              <ul className="mt-8 grid grid-cols-3 gap-4 border-y border-border/60 py-6">
                <li>
                  <span className="block font-serif text-3xl font-light text-primary md:text-4xl">
                    9
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Years between harvests
                  </span>
                </li>
                <li>
                  <span className="block font-serif text-3xl font-light text-primary md:text-4xl">
                    200+
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Year lifespan
                  </span>
                </li>
                <li>
                  <span className="block font-serif text-3xl font-light text-primary md:text-4xl">
                    0
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Trees felled
                  </span>
                </li>
              </ul>

              <Link
                href={data.cta.href}
                className="group mt-10 inline-flex items-center gap-3 self-start rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                {data.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
