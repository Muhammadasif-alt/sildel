import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHome } from "@/content/home";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

/**
 * Product spotlight — mirror twin of AtelierIntro (founder direction,
 * June 2026, nineteenth pass: client wanted a second matching section
 * below the atelier intro, flipped — text on the LEFT, product image
 * on the RIGHT — so the eye crosses the page in a Z while the visitor
 * scrolls through atelier → product.
 *
 * Same min-height + full-height image trick so both rows feel like
 * twin imposing windows. The image bleeds to the viewport RIGHT edge
 * on desktop (no outer container) — that's what gives the mirror its
 * symmetry against the atelier image bleeding to the left edge above.
 */
export function ProductSpotlight({ locale }: { locale: Locale }) {
  const { productSpotlight: data } = getHome(locale);

  return (
    <section
      aria-labelledby="product-spotlight-heading"
      className="relative flex w-full items-stretch bg-background py-16 md:py-24 lg:min-h-[90vh] lg:py-0"
    >
      <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-[45%_55%]">
        {/* Copy column — LEFT side, vertically centred. On mobile it
            appears below the image (order swap) so the visitor still
            sees the product first on small screens. */}
        <ScrollReveal direction="right" className="order-2 lg:order-1">
          <div className="flex h-full flex-col justify-center px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 xl:px-24 2xl:pl-32">
            <div className="max-w-xl lg:ml-auto">
              <h2
                id="product-spotlight-heading"
                className="font-serif text-3xl font-light leading-[1.15] text-foreground md:text-4xl lg:text-[2.75rem]"
              >
                {data.title}
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                {data.body}
              </p>
              <Link
                href={data.cta.href}
                className="group mt-10 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.28em] text-foreground/85 transition-colors hover:text-foreground"
              >
                {data.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Image — RIGHT side, fills full section height on desktop. */}
        <ScrollReveal delay={0.15} className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-auto lg:h-full lg:min-h-[720px]">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}