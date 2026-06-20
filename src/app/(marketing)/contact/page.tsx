import Image from "next/image";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/contact-map";
import { EditorialHero } from "@/components/editorial/editorial-hero";
import { StorySection } from "@/components/our-story/story-section";
import { resolveContact } from "@/lib/editorial/resolvers/contact";

/**
 * /contact — editorial pass in the Quinta Nova rhythm (founder
 * direction, June 2026). Image-only hero, a StorySection intro
 * (image + title side-by-side so the rhythm doesn't collapse
 * into a narrow centered column), wider form section, then the
 * existing ContactMap.
 */
const PAGE_PATH = "/contact";
const HERO_IMAGE =
  "/products/GIBRALTAR_Equilibrium_Gibraltar_foto-ambiente-0f37be0423.webp";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Contact — Sildel Atelier, Esmoriz, Portugal",
  description:
    "Reach the Sildel atelier in Esmoriz, Aveiro — enquiries about a treasure, bespoke commissions, atelier visits, press, or wholesale. We reply within one business day.",
  path: PAGE_PATH,
  image: HERO_IMAGE,
  imageAlt: "Sildel atelier doorway in Esmoriz, Portugal.",
  keywords: [
    "contact Sildel",
    "contactar Sildel",
    "Sildel email",
    "Sildel phone",
    "telefone Sildel",
    "visit Sildel atelier",
    "visitar atelier Sildel",
    "Esmoriz atelier visit",
    "visita atelier Esmoriz",
    "Sildel studio Portugal",
    "estúdio Sildel Portugal",
    "cork commission",
    "encomenda cortiça",
    "bespoke cork",
    "cortiça por encomenda",
    "wholesale cork art",
    "cortiça grossista",
    "press Sildel",
    "imprensa Sildel",
    "Sildel Esmoriz",
    "Sildel Aveiro",
    "Sildel Portugal address",
    "morada Sildel Portugal",
  ],
});

const ContactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": new URL(PAGE_PATH, siteConfig.url).toString(),
  url: new URL(PAGE_PATH, siteConfig.url).toString(),
  name: `Contact — ${siteConfig.name}`,
  inLanguage: ["en-US", "pt-PT"],
  isPartOf: { "@type": "WebSite", url: siteConfig.url },
  about: { "@id": `${siteConfig.url}/#organization` },
  mainEntity: { "@id": `${siteConfig.url}/#localbusiness` },
};

export default async function ContactPage() {
  const locale = await getLocale();
  const isPt = locale === "pt";
  // Resolved from Mongo if the founder has edited the page in admin,
  // otherwise from the TS file fallback. Same shape either way.
  const content = await resolveContact(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Contacto" : "Contact", href: PAGE_PATH },
  ]);

  const commissionService = buildServiceJsonLd({
    name: isPt
      ? "Encomendas Personalizadas em Cortiça"
      : "Bespoke Cork Commissions",
    description: isPt
      ? "Encomenda uma peça em cortiça portuguesa desenhada e executada à medida no atelier Sildel em Esmoriz — assinada e numerada."
      : "Commission a one-of-one Portuguese cork piece designed and shaped at the Sildel atelier in Esmoriz — signed and numbered.",
    serviceType: "Bespoke Cork Art Commission",
    path: PAGE_PATH,
  });

  const atelierVisitService = buildServiceJsonLd({
    name: isPt ? "Visitas ao Atelier Sildel" : "Sildel Atelier Visits",
    description: isPt
      ? "Visite o atelier Sildel em Esmoriz, Aveiro — por marcação, para conhecer o processo de criação em cortiça."
      : "Visit the Sildel atelier in Esmoriz, Aveiro — by appointment, to experience the cork-making process first-hand.",
    serviceType: "Atelier Visit",
    path: PAGE_PATH,
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbs,
          ContactPageJsonLd,
          commissionService,
          atelierVisitService,
        ]}
      />
      <main className="flex flex-1 flex-col bg-background text-foreground">
        {/* Editorial hero — image only, no overlay. */}
        <EditorialHero
          src={content.hero.image}
          alt={content.hero.imageAlt}
          eyebrow={content.hero.eyebrow}
        />

        {/* Intro — full editorial row (image LEFT, title + body RIGHT)
            so the rhythm doesn't collapse into a narrow centered text
            block. Matches the other editorial pages. */}
        <StorySection
          data={content.intro}
          mirror={false}
          headingId="contact-intro"
        />

        {/* Form section — split layout: atelier image LEFT (full-bleed,
            sticks while the form scrolls), heading + form RIGHT. Founder
            direction (June 2026 fourteenth pass): no centered narrow
            column — pair the form with a visual anchor so the page reads
            editorially. The hero image is reused intentionally as a
            "bookend" — atelier doorway opens the page and again invites
            the visitor to write. */}
        <section
          aria-labelledby="contact-form-heading"
          className="relative w-full border-y border-border/60 bg-background"
        >
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-[45%_55%]">
            {/* Image column — full-bleed, sticky on desktop. Uses
                form-specific photo so all three slots on /contact (hero,
                intro, form) carry distinct frames. */}
            <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:min-h-0">
              <Image
                src={content.form.image}
                alt={content.form.imageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              />
            </div>

            {/* Form column — heading then form, generous padding. */}
            <div className="flex flex-col justify-center px-6 py-20 lg:px-14 lg:py-28 xl:px-20">
              <div className="mb-12 max-w-xl">
                <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
                  {content.form.eyebrow}
                </p>
                <h2
                  id="contact-form-heading"
                  className="font-serif text-3xl font-light leading-[1.04] tracking-tight md:text-4xl lg:text-5xl"
                >
                  {content.form.heading}
                </h2>
                <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {content.form.body}
                </p>
              </div>
              <div className="max-w-xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map + NAP — closing beat (local-SEO anchor). */}
        <ContactMap locale={locale} />
      </main>
    </>
  );
}