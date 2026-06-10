import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getPartners, type Partner, type PartnerImage } from "@/content/partners";
import { InteractiveFeature } from "./interactive-feature";

/**
 * Full "Collaborations" section — one editorial band per partner. Used on the
 * dedicated /partners page and inside You Think Cork.
 *
 * `variant` selects which photo set to show so the two pages never share an
 * image: "primary" (the /partners set) or "alt" (the You Think Cork set).
 */
export function PartnersSection({
  locale,
  showHeader = true,
  variant = "primary",
}: {
  locale: Locale;
  showHeader?: boolean;
  variant?: "primary" | "alt";
}) {
  const { section, partners } = getPartners(locale);

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative w-full bg-background"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-16 lg:py-24">
        {showHeader && (
          <div className="max-w-2xl mb-14 lg:mb-20">
            <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-5">
              {section.eyebrow}
            </p>
            <h2
              id="partners-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05]"
            >
              {section.title}{" "}
              <span className="italic text-primary">{section.titleAccent}</span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-20 lg:gap-28">
          {partners.map((partner, i) => {
            const flip = i % 2 === 1;
            if (partner.slug === "festival-mental") {
              return (
                <FestivalMentalBand
                  key={partner.slug}
                  partner={partner}
                  variant={variant}
                  flip={flip}
                />
              );
            }
            return (
              <PartnerBand
                key={partner.slug}
                partner={partner}
                variant={variant}
                flip={flip}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnerBand({
  partner,
  variant,
  flip,
}: {
  partner: Partner;
  variant: "primary" | "alt";
  flip: boolean;
}) {
  const images = variant === "alt" ? partner.imagesAlt : partner.images;
  const isProducts = partner.layout === "products";

  return (
    // items-stretch so the media column tracks the text column's height.
    <article
      id={partner.slug}
      className="scroll-mt-24 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Media */}
      <div className={cn("flex", flip ? "lg:order-2" : "lg:order-1")}>
        <div className="w-full">
          {isProducts ? (
            <ProductGrid images={images} name={partner.name} />
          ) : (
            <InteractiveFeature images={images} name={partner.name} />
          )}
        </div>
      </div>

      {/* Text */}
      <div
        className={cn(
          "flex flex-col justify-center",
          flip ? "lg:order-1" : "lg:order-2",
        )}
      >
        <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-5">
          {partner.kicker}
        </p>
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] text-foreground">
          {partner.name}
        </h3>
        {partner.note && (
          <p className="mt-4 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
            {partner.note}
          </p>
        )}
        <div className="mt-7 space-y-4 text-base leading-relaxed text-muted-foreground">
          {partner.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Festival Mental — editorial layout. Hero image + text band on top, gallery
 * grid below. Replaced the prior auto-scrolling marquee per founder direction
 * (founder felt the marquee read as a generic slider, not a curated archive).
 */
function FestivalMentalBand({
  partner,
  variant,
  flip,
}: {
  partner: Partner;
  variant: "primary" | "alt";
  flip: boolean;
}) {
  const images = variant === "alt" ? partner.imagesAlt : partner.images;
  const [heroImage, ...galleryImages] = images;

  return (
    <article className="flex flex-col gap-10 lg:gap-14">
      {/* Hero band — single image + text */}
      <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn("flex", flip ? "lg:order-2" : "lg:order-1")}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-border/60 bg-muted lg:min-h-[520px]">
            {heroImage && (
              <Image
                src={heroImage.src}
                alt={`${partner.name} — official cork trophy ceremony`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col justify-center",
            flip ? "lg:order-1" : "lg:order-2",
          )}
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-5">
            {partner.kicker}
          </p>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] text-foreground">
            {partner.name}
          </h3>
          {partner.note && (
            <p className="mt-4 text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
              {partner.note}
            </p>
          )}
          <div className="mt-7 space-y-4 text-base leading-relaxed text-muted-foreground">
            {partner.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid below — square thumbnails, hover-zoom */}
      {galleryImages.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {galleryImages.map((img, i) => (
            <li
              key={i}
              className="relative aspect-square overflow-hidden rounded-[20px] border border-border/60 bg-muted"
            >
              <Image
                src={img.src}
                alt={`${partner.name} — ${i + 2}`}
                fill
                sizes="(min-width: 1024px) 25vw, 33vw"
                className="object-cover transition-transform duration-[1000ms] ease-out hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** Products layout — transparent cutouts on light cards with captions. */
function ProductGrid({ images, name }: { images: PartnerImage[]; name: string }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((img, i) => (
        <li
          key={i}
          className="flex flex-col overflow-hidden rounded-[20px] border border-border/60 bg-white shadow-sm"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={img.src}
              alt={img.caption ? `${name} — ${img.caption}` : `${name} × Sildel`}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
              className="object-contain p-4"
            />
          </div>
          {img.caption && (
            <p className="border-t border-border/60 px-4 py-2.5 text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
              {img.caption}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}