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
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp";

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

        {/* Form section — wider container, centered heading + form,
            with a soft muted band so the page breathes between the
            editorial row above and the map below. */}
        <section
          aria-labelledby="contact-form-heading"
          className="relative w-full border-y border-border/60 bg-muted/30"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 lg:px-12 lg:py-28">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
                {content.form.eyebrow}
              </p>
              <h2
                id="contact-form-heading"
                className="font-serif text-3xl font-light leading-[1.04] tracking-tight md:text-4xl lg:text-5xl"
              >
                {content.form.heading}
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {content.form.body}
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Map + NAP — closing beat (local-SEO anchor). */}
        <ContactMap locale={locale} />
      </main>
    </>
  );
}