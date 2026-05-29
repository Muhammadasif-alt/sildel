import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { getPartners, type Partner } from "@/content/partners";

/**
 * Full "Collaborations" section — one editorial band per partner. Used on the
 * dedicated /partners page and inside You Think Cork. Pass showHeader={false}
 * when the page supplies its own hero/heading above.
 */
export function PartnersSection({
  locale,
  showHeader = true,
}: {
  locale: Locale;
  showHeader?: boolean;
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
          {partners.map((partner, i) => (
            <PartnerBand key={partner.slug} partner={partner} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerBand({ partner, flip }: { partner: Partner; flip: boolean }) {
  const isProducts = partner.layout === "products";

  return (
    <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Media */}
      <div className={cn(flip ? "lg:order-2" : "lg:order-1")}>
        {isProducts ? (
          <ProductGrid partner={partner} />
        ) : (
          <FeatureImage partner={partner} />
        )}
      </div>

      {/* Text */}
      <div className={cn(flip ? "lg:order-1" : "lg:order-2")}>
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

/** Split layout — a tall feature photo with a thin gallery of the rest below. */
function FeatureImage({ partner }: { partner: Partner }) {
  const [feature, ...rest] = partner.images;
  const thumbs = rest.slice(0, 4);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-border/60 bg-muted">
        <Image
          src={feature.src}
          alt={`${partner.name} × Sildel`}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      {thumbs.length > 0 && (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {thumbs.map((img, i) => (
            <li
              key={i}
              className="relative aspect-square w-full overflow-hidden border border-border/60 bg-muted"
            >
              <Image
                src={img.src}
                alt={`${partner.name} × Sildel`}
                fill
                sizes="(min-width: 1024px) 11vw, 22vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Products layout — transparent cutouts on light cards with captions. */
function ProductGrid({ partner }: { partner: Partner }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {partner.images.map((img, i) => (
        <li
          key={i}
          className="flex flex-col overflow-hidden border border-border/60 bg-white"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={img.src}
              alt={img.caption ? `${partner.name} — ${img.caption}` : `${partner.name} × Sildel`}
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