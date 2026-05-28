import type { Locale } from "@/lib/i18n/config";

/**
 * Our Story — split feature section: looping cork-craft video on one side,
 * editorial copy on the other. Pure server component: the <video> autoplay
 * attributes are static HTML, so no client JS is needed.
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
      className="relative w-full bg-muted/30 border-y border-border/60"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-stretch lg:grid-cols-2">
        {/* Video side */}
        <div className="relative min-h-[56vh] lg:min-h-[640px] overflow-hidden bg-foreground">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            aria-label={isPt ? "Vídeo do atelier Sildel" : "Sildel atelier video"}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          {/* Soft edge so the video melts into the tan content side on lg. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-transparent to-muted/30"
          />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <p className="mb-6 text-xs tracking-[0.4em] uppercase text-primary">
            {t.eyebrow}
          </p>
          <h2
            id="story-video-heading"
            className="font-serif text-4xl font-light leading-[1.05] md:text-5xl lg:text-6xl"
          >
            {t.title}{" "}
            <span className="italic text-primary">{t.titleAccent}</span>
          </h2>
          <div className="my-8 h-px w-16 bg-primary/50" aria-hidden />
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.body}
          </p>
        </div>
      </div>
    </section>
  );
}