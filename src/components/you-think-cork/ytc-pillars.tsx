import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export type YtcPillar = {
  icon: LucideIcon;
  title: string;
  body: string;
};

/**
 * "Together we can develop groundbreaking solutions" pillars,
 * editorial pass (founder direction, June 2026: no three-column
 * grids). Three icon+title+body rows live as a single vertical
 * typeset list on the text side, paired with a tall image — same
 * rhythm as CorkProperties.
 *
 *   mirror=false  → image LEFT  (55%) | list RIGHT (45%)
 *   mirror=true   → list  LEFT  (45%) | image RIGHT (55%)
 */
export function YtcPillars({
  eyebrow,
  title,
  titleAccent,
  body,
  items,
  imageSrc,
  imageAlt,
  mirror = false,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  body?: string;
  items: YtcPillar[];
  imageSrc: string;
  imageAlt: string;
  mirror?: boolean;
}) {
  const imageBlock = (
    <ScrollReveal
      direction={mirror ? "right" : "left"}
      className={mirror ? "order-1 lg:order-2" : undefined}
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-background">
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
            {eyebrow}
          </p>
          <h2
            id="ytc-pillars"
            className="font-serif text-3xl font-light leading-[1.08] tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]"
          >
            {title}
            {titleAccent ? (
              <>
                {" "}
                <span className="italic">{titleAccent}</span>
              </>
            ) : null}
          </h2>
          {body ? (
            <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-[17px]">
              {body}
            </p>
          ) : null}
          <ul className="mt-10 divide-y divide-foreground/10 border-t border-b border-foreground/10">
            {items.map(({ icon: Icon, title: itemTitle, body: itemBody }, i) => (
              <li key={itemTitle}>
                <ScrollReveal
                  delay={0.05 + i * 0.1}
                  distance={16}
                  duration={0.6}
                >
                  <div className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[auto_1fr] md:items-start md:gap-6">
                    <span
                      aria-hidden
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/80"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-serif text-lg font-light italic text-foreground md:text-xl">
                        {itemTitle}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                        {itemBody}
                      </p>
                    </div>
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
      aria-labelledby="ytc-pillars"
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