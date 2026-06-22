import Image from "next/image";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Founder section, editorial pass (founder direction, June 2026: no
 * three-column grids, match Quinta Nova's two-up image+text rhythm).
 * Tall portrait one side, eyebrow + serif pull quote + body paragraphs
 * + signature on the other.
 *
 *   mirror=false  → portrait LEFT  | quote RIGHT
 *   mirror=true   → portrait RIGHT | quote LEFT
 *
 * Data-driven — the route passes the rendered founder object (resolved
 * from Mongo or the TS fallback) so this component never reaches for
 * a content file directly.
 */
export type FounderEditorialData = {
  eyebrow: string;
  pullQuote: string;
  body: string[];
  closing: string;
  image: string;
  imageAlt: string;
  signature: { name: string; role: string };
};

export function FounderEditorial({
  founder,
  mirror = false,
}: {
  founder: FounderEditorialData;
  mirror?: boolean;
}) {

  const portraitBlock = (
    <ScrollReveal
      direction={mirror ? "right" : "left"}
      className={mirror ? "order-1 lg:order-2" : undefined}
    >
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-background lg:aspect-auto lg:h-[75vh] lg:min-h-[560px]">
        <Image
          src={founder.image}
          alt={founder.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
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
            {founder.eyebrow}
          </p>
          <blockquote className="font-serif text-3xl font-light italic leading-[1.1] tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]">
            &ldquo;{founder.pullQuote}&rdquo;
          </blockquote>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {founder.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-7 font-serif text-xl italic text-foreground md:text-2xl">
            {founder.closing}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-10 bg-foreground/40" aria-hidden />
            <p className="text-[11px] uppercase tracking-[0.32em] text-foreground/75">
              {founder.signature.name}
              <span className="mx-2 text-foreground/40">·</span>
              {founder.signature.role}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );

  return (
    <section
      aria-label={founder.eyebrow}
      className="relative w-full bg-background py-12 md:py-16 lg:py-20"
    >
      <div
        className={
          mirror
            ? "grid grid-cols-1 items-center lg:grid-cols-[45%_55%]"
            : "grid grid-cols-1 items-center lg:grid-cols-[55%_45%]"
        }
      >
        {mirror ? copyBlock : portraitBlock}
        {mirror ? portraitBlock : copyBlock}
      </div>
    </section>
  );
}