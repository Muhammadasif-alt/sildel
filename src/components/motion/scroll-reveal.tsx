"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const HIDDEN_TRANSFORM: Record<Direction, (distance: number) => string> = {
  up: (d) => `translate3d(0, ${d}px, 0)`,
  down: (d) => `translate3d(0, ${-d}px, 0)`,
  left: (d) => `translate3d(${d}px, 0, 0)`,
  right: (d) => `translate3d(${-d}px, 0, 0)`,
  scale: () => "scale(0.96)",
  fade: () => "none",
};

/**
 * ScrollReveal — native IntersectionObserver-based reveal wrapper
 * (founder direction June 2026: keep the Quinta do Crasto-class
 * scroll-in motion, but kill the framer-motion overhead).
 *
 * Previously used `motion`'s `useInView` + `<motion.div>`, which
 * created a per-instance observer through the Framer hook stack and
 * a per-instance animation engine. With ~25 ScrollReveal nodes on
 * the home page, that was real hydration work for what is, visually,
 * a fade-and-translate transition any modern browser handles in CSS.
 *
 * This implementation:
 *   - One native IntersectionObserver per instance (still cheap; the
 *     Intersection API is implemented in C++ in every modern browser).
 *   - Pure CSS transition driven by class flip — no per-frame JS.
 *   - `prefers-reduced-motion` honoured: users with the OS toggle on
 *     see the content rendered final-state immediately, no animation.
 *
 *   <ScrollReveal>                                  // default: 24px from below, 0.7s ease
 *   <ScrollReveal delay={0.2}>
 *   <ScrollReveal direction="down" distance={40}>   // drops from above
 *   <ScrollReveal direction="scale">                // gentle zoom-in
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Honour OS-level reduced-motion: skip the animation entirely.
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: "-10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const hiddenTransform = HIDDEN_TRANSFORM[direction](distance);

  return (
    <div
      ref={ref}
      className={cn("will-change-[opacity,transform]", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform,
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}