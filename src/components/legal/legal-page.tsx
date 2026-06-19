import type { LegalDoc } from "@/content/legal";
import { EditorialHero } from "@/components/editorial/editorial-hero";

/**
 * Clean, readable layout for long-form legal / policy documents.
 *
 * Editorial pass (founder direction, June 2026: Quinta Nova History
 * page reference) — every legal page opens with an image-only hero
 * before the centered title block, so the policy pages share the
 * same opening rhythm as the narrative pages.
 */
export function LegalPage({
  doc,
  heroImage,
  heroAlt,
}: {
  doc: LegalDoc;
  heroImage?: string;
  heroAlt?: string;
}) {
  return (
    <main className="flex flex-1 flex-col bg-background text-foreground">
      {heroImage ? (
        <EditorialHero
          src={heroImage}
          alt={heroAlt ?? doc.title}
          eyebrow={doc.eyebrow}
        />
      ) : null}

      {/* Title block — wider container so the page title can breathe;
          intro paragraph stays narrower for readability. */}
      <section className="border-b border-border/40">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
            {doc.eyebrow}
          </p>
          <h1 className="font-serif text-4xl font-light leading-[1.04] tracking-tight md:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            {doc.updated}
          </p>
          {doc.intro && (
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {doc.intro}
            </p>
          )}
        </div>
      </section>

      {/* Body */}
      <section>
        <div className="mx-auto max-w-3xl space-y-10 px-6 py-14 lg:px-10 lg:py-20">
          {doc.sections.map((s, i) => (
            <div key={i}>
              {s.heading && (
                <h2 className="mb-4 font-serif text-xl font-light leading-snug text-foreground md:text-2xl">
                  {s.heading}
                </h2>
              )}
              {s.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="mb-4 text-[15px] leading-relaxed text-muted-foreground last:mb-0"
                >
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-2 space-y-2.5">
                  {s.list.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}