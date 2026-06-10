import Link from "next/link";
import Image from "next/image";
import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs, videoEmbedUrl } from "./block-utils";

export function HeroBlock({ block, locale }: { block: Block; locale: Locale }) {
  const eyebrow = loc(block, "eyebrow", locale);
  const heading = loc(block, "heading", locale);
  const subheading = loc(block, "subheading", locale);
  const ctaLabel = loc(block, "ctaLabel", locale);
  const ctaHref = str(block, "ctaHref");
  const ctaSecondaryLabel = loc(block, "ctaSecondaryLabel", locale);
  const ctaSecondaryHref = str(block, "ctaSecondaryHref");
  const image = str(block, "image");
  const imageAltField = loc(block, "imageAlt", locale);
  const videoUrl = str(block, "videoUrl");
  const layout = str(block, "layout", "center");

  const headingLines = heading.split("\n").filter(Boolean);
  const video = videoUrl ? videoEmbedUrl(videoUrl) : null;
  const showSplit = (layout === "left" || layout === "right") && (image || video);
  const imageOnLeft = layout === "right";

  // Prefer explicit imageAlt; fall back to heading text so SEO crawlers
  // still pick up something descriptive instead of an empty alt.
  const imageAlt = imageAltField || heading.replace(/\n/g, " ").trim() || "Sildel";

  return (
    <section className="relative overflow-hidden bg-background">
      {layout === "fullbleed" && image && (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div
        className={
          "mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-10 " +
          (layout === "fullbleed" ? "relative text-white" : "")
        }
      >
        {showSplit ? (
          <div className={"grid items-center gap-10 lg:grid-cols-2 lg:gap-16 " + (imageOnLeft ? "" : "")}>
            <div className={imageOnLeft ? "order-2 lg:order-1" : ""}>
              <HeroCopy
                eyebrow={eyebrow}
                headingLines={headingLines}
                subheading={subheading}
                ctaLabel={ctaLabel}
                ctaHref={ctaHref}
                ctaSecondaryLabel={ctaSecondaryLabel}
                ctaSecondaryHref={ctaSecondaryHref}
                align="left"
              />
            </div>
            <div className={imageOnLeft ? "order-1 lg:order-2" : ""}>
              <HeroMedia image={image} alt={imageAlt} video={video} />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            <HeroCopy
              eyebrow={eyebrow}
              headingLines={headingLines}
              subheading={subheading}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              ctaSecondaryLabel={ctaSecondaryLabel}
              ctaSecondaryHref={ctaSecondaryHref}
              align="center"
            />
            {layout !== "fullbleed" && (image || video) && (
              <div className="mt-10">
                <HeroMedia image={image} alt={imageAlt} video={video} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function HeroCopy({
  eyebrow,
  headingLines,
  subheading,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  align,
}: {
  eyebrow: string;
  headingLines: string[];
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  align: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "" : ""}>
      {eyebrow && (
        <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-primary/80">
          {eyebrow}
        </p>
      )}
      {headingLines.length > 0 && (
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {headingLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
      )}
      {subheading && (
        <div className="mt-6 space-y-3 text-base text-muted-foreground md:text-lg">
          {renderParagraphs(subheading)}
        </div>
      )}
      {(ctaLabel || ctaSecondaryLabel) && (
        <div
          className={
            "mt-8 flex flex-wrap gap-3 " + (align === "center" ? "justify-center" : "")
          }
        >
          {ctaLabel && (
            <Link
              href={ctaHref || "#"}
              className="inline-flex items-center justify-center bg-foreground px-7 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
            >
              {ctaLabel}
            </Link>
          )}
          {ctaSecondaryLabel && (
            <Link
              href={ctaSecondaryHref || "#"}
              className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-accent"
            >
              {ctaSecondaryLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function HeroMedia({ image, alt, video }: { image: string; alt: string; video: ReturnType<typeof videoEmbedUrl> }) {
  if (video?.kind === "youtube" || video?.kind === "vimeo") {
    return (
      <div className="aspect-video overflow-hidden rounded-none bg-muted">
        <iframe
          src={video.src}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Video"
        />
      </div>
    );
  }
  if (video?.kind === "file") {
    return (
      <video
        src={video.src}
        className="aspect-video w-full rounded-none object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  if (image) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none bg-muted">
        <Image src={image} alt={alt} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
      </div>
    );
  }
  return null;
}
