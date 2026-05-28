import type { Locale } from "@/lib/i18n/config";

/**
 * Our Story — full-bleed cinematic video section, same treatment as the home
 * page brand video: the cork-craft clip fills the whole section as the
 * background, with the copy centred on top over a dark gradient.
 *
 * Pure server component: the <video> autoplay attributes are static HTML, so
 * no client JS is needed.
 */
const VIDEO_SRC = "/video/our-story-bg.mp4";
const POSTER =
  "/Slidel/Nano Banana 2 - Wide editorial shot of an ancient Portuguese cork oak tree with bark recently harves_2.webp";

export function StoryVideo({ locale }: { locale: Locale }) {
  const isPt = locale === "pt";
  const t = isPt
    ? {
        eyebrow: "O Ofício",
        title: "Da cortiça viva",
        titleAccent: "à peça acabada.",
        body: "Cada tesouro Sildel começa nas florestas de sobreiro de Portugal, onde a cortiça é colhida à mão sem nunca abater a árvore. Veja o ritmo do atelier — lento, deliberado e inteiramente à mão.",
      }
    : {
        eyebrow: "The Craft",
        title: "From living bark",
        titleAccent: "to finished piece.",
        body: "Every Sildel treasure begins in the cork forests of Portugal, where the bark is harvested by hand without ever felling the tree. Watch the rhythm of the atelier — slow, deliberate, and entirely by hand.",
      };

  return (
    <section
      aria-labelledby="story-video-heading"
      className="relative isolate w-full overflow-hidden border-y border-border/60"
    >
      {/* Full-bleed background video */}
      <div aria-hidden className="absolute inset-0 z-0 bg-foreground">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Cinematic overlay so the copy stays readable on any frame. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_80%)]" />
      </div>

      {/* Centred content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center text-white md:min-h-[80vh] md:py-32 lg:py-40">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/75 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
          {t.eyebrow}
        </p>
        <h2
          id="story-video-heading"
          className="font-serif text-4xl font-light leading-[1.05] drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] md:text-5xl lg:text-6xl"
        >
          {t.title} <span className="italic">{t.titleAccent}</span>
        </h2>
        <div className="my-8 h-px w-16 bg-white/50" aria-hidden />
        <p className="max-w-xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)] md:text-lg">
          {t.body}
        </p>
      </div>
    </section>
  );
}