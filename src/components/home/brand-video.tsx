"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { home, type HomeContent } from "@/content/home";

export function BrandVideo({ data: dataProp }: { data?: HomeContent["brandVideo"] } = {}) {
  const data = dataProp ?? home.brandVideo;
  const [open, setOpen] = useState(false);

  // Defer the background iframe until the section actually scrolls into
  // view. Previously the ambient YouTube embed mounted on first paint and
  // started downloading + decoding video frames even while the visitor
  // was still looking at the hero — a meaningful chunk of every home
  // page load. Now the section shows a YouTube thumbnail until the
  // visitor approaches, then upgrades to the live embed.
  const sectionRef = useRef<HTMLElement | null>(null);
  const [bgMounted, setBgMounted] = useState(false);
  useEffect(() => {
    if (bgMounted) return;
    const node = sectionRef.current;
    if (!node) return;
    // Mount slightly before the section is visible so the swap from
    // poster → iframe lands close to when the visitor sees it.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setBgMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [bgMounted]);

  // Looped, muted background embed (autoplay-friendly). Mute is required by all
  // browsers for autoplay; controls/info stripped so it reads as ambient footage.
  const bgSrc =
    `https://www.youtube-nocookie.com/embed/${data.youtubeId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${data.youtubeId}` +
    `&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3` +
    `&playsinline=1&disablekb=1`;

  // Full-sound, user-controlled embed for the modal.
  const fullSrc =
    `https://www.youtube-nocookie.com/embed/${data.youtubeId}` +
    `?autoplay=1&rel=0&modestbranding=1`;

  // YouTube serves a free poster image we can use as a placeholder until
  // the iframe mounts. hqdefault is light (~25 KB) and good enough for a
  // backdrop that will be overlaid with gradients anyway.
  const posterUrl = `https://i.ytimg.com/vi/${data.youtubeId}/hqdefault.jpg`;

  return (
    <section
      ref={sectionRef}
      id="brand-video"
      className="relative w-full overflow-hidden border-y border-border/60 bg-[#15110d]"
      aria-labelledby="brand-video-heading"
    >
      {/* Background — poster while waiting, then live iframe */}
      <div aria-hidden className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,177.78vh)] h-[max(56.25vw,100vh)] pointer-events-none">
          {bgMounted ? (
            <iframe
              src={bgSrc}
              title=""
              tabIndex={-1}
              aria-hidden
              loading="lazy"
              allow="autoplay; encrypted-media"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <img
              src={posterUrl}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        {/* Cinematic overlay so text stays readable on any frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.45)_75%)]" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-32 md:py-40 lg:px-10 lg:py-48 min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* All accent text stays light here — this sits over a dark cork
              video, so the brand's black `--primary` ink would be invisible.
              Title accent + rule + eyebrow use white/cream instead. */}
          <p className="text-xs tracking-[0.4em] uppercase text-white/75 mb-6 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            {data.eyebrow}
          </p>
          <h2
            id="brand-video-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
          >
            {data.title}
            <br />
            <span className="italic text-white/90">{data.titleAccent}</span>
          </h2>
          <div className="mx-auto h-px w-16 bg-white/50 my-8" aria-hidden />
          <p className="text-base md:text-lg leading-relaxed text-white/85 mb-10 drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)]">
            {data.body}
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Play full video: ${data.title}`}
            className={cn(
              "group inline-flex items-center gap-4 rounded-full",
              // Cream/white pill with dark text pops on the dark video and
              // mirrors the rest of the dark-hero CTAs across the site.
              "bg-white text-foreground",
              "pl-2 pr-7 py-2",
              "shadow-xl shadow-black/30",
              "transition-all duration-300 hover:scale-[1.03] hover:shadow-black/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            )}
          >
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-foreground">
              <Play className="h-5 w-5 ml-0.5 fill-current" strokeWidth={0} />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full ring-2 ring-foreground/25 animate-ping"
              />
            </span>
            <span className="text-xs tracking-[0.3em] uppercase">
              {data.duration}
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox for full-sound playback */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${data.title} ${data.titleAccent}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-6xl aspect-video shadow-2xl ring-1 ring-white/10 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={fullSrc}
              title={`${data.title} ${data.titleAccent}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}