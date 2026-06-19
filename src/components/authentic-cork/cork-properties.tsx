import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getAuthenticCork } from "@/content/authentic-cork";
import type { Locale } from "@/lib/i18n/config";

/**
 * Properties section, editorial pass (founder direction, June 2026:
 * "koi b 3 ka section na ho" — no three-column grids). The six cork
 * qualities live as a single vertical typeset list on the text side,
 * paired with a tall image on the other — matches the StorySection
 * two-up rhythm used everywhere else on /authentic-cork.
 *
 *   mirror=false  → image LEFT  (55%) | list RIGHT (45%)
 *   mirror=true   → list  LEFT  (45%) | image RIGHT (55%)
 */
export function CorkProperties({
  locale,
  imageSrc,
  imageAlt,
  mirror = false,
}: {
  locale: Locale;
  imageSrc: string;
  imageAlt: string;
  mirror?: boolean;
}) {
  const { properties } = getAuthenticCork(locale);

  const imageBlock = (
    <ScrollReveal
      direction={mirror ? "right" : "left"}
      className={mirror ? "order-1 lg:order-2" : undefined}
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-muted lg:aspect-auto lg:h-[92vh] lg:min-h-[760px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </ScrollReveal>
  );

  const copyBlock = (
    <ScrollReveal
      delay={0.15}
      direction={mirror ? "left" : "right"}
      className={mirror ? "order-2 lg:order-1" : undefined}
    >
      <div
        className={
          mirror
            ? "flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-0 xl:px-16 2xl:pl-24"
            : "flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-0 xl:px-16 2xl:pr-24"
        }
      >
        <div className={mirror ? "max-w-2xl lg:ml-auto" : "max-w-2xl"}>
          <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-foreground/65">
            {properties.eyebrow}
          </p>
          <h2
            id="cork-properties"
            className="font-serif text-3xl font-light leading-[1.08] tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]"
          >
            {properties.title}
            {properties.titleAccent ? (
              <>
                {" "}
                <span className="italic">{properties.titleAccent}</span>
              </>
            ) : null}
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {properties.body}
          </p>
          <ul className="mt-10 divide-y divide-foreground/10 border-t border-b border-foreground/10">
            {properties.items.map((item, i) => (
              <li key={item.title}>
                <ScrollReveal
                  delay={0.05 + i * 0.08}
                  distance={16}
                  duration={0.6}
                >
                  <div className="grid grid-cols-1 gap-1 py-5 md:grid-cols-[14ch_1fr] md:items-baseline md:gap-8">
                    <p className="font-serif text-lg font-light italic text-foreground md:text-xl">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollReveal>
  );

  return (
    <section
      aria-labelledby="cork-properties"
      className="relative w-full bg-background py-12 md:py-16 lg:py-20"
    >
      <div
        className={
          mirror
            ? "grid grid-cols-1 items-center lg:grid-cols-[45%_55%]"
            : "grid grid-cols-1 items-center lg:grid-cols-[55%_45%]"
        }
      >
        {mirror ? copyBlock : imageBlock}
        {mirror ? imageBlock : copyBlock}
      </div>
    </section>
  );
}