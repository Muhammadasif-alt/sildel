"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

function variants(direction: Direction, distance: number): Variants {
  const hidden: Record<string, number> = { opacity: 0 };
  switch (direction) {
    case "up":
      hidden.y = distance;
      break;
    case "down":
      hidden.y = -distance;
      break;
    case "left":
      hidden.x = distance;
      break;
    case "right":
      hidden.x = -distance;
      break;
    case "scale":
      hidden.scale = 0.96;
      break;
    case "fade":
    default:
      break;
  }
  return {
    hidden,
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };
}

/**
 * ScrollReveal — drop-in motion wrapper for any block that should
 * animate into view on scroll. Reusable so the whole site shares a
 * single timing language (founder direction, June 2026: subtle,
 * Quinta do Crasto-class motion across every section).
 *
 *   <ScrollReveal>            // default: 24px from below, 0.7s ease
 *   <ScrollReveal delay={0.2}>
 *   <ScrollReveal direction="down" distance={40}>   // drops from above
 *   <ScrollReveal direction="scale">                // gentle zoom-in
 *
 * Plays once when 10% inside the viewport, then stays. The wrapping
 * div is `<div>` by default but we keep it semantically transparent
 * (just adds opacity + transform inline-style on the parent).
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.7,
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants(direction, distance)}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}