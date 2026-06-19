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

/**
 * /contact — editorial pass in the Quinta Nova rhythm (founder
 * direction, June 2026). Image-only hero, a centered intro block,
 * the existing ContactForm, then the ContactMap. Bypasses the
 * BlocksRenderer here because the CMS layout no longer matches the
 * live page we're tracking.
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

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Contacto" : "Contact", href: PAGE_PATH },
  ]);

  // Two services we explicitly market on this page — surfaces in SERPs
  // as separate "service" rich results for relevant queries.
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

  const t = {
    eyebrow: isPt ? "Contacto" : "Contact",
    title: isPt ? "Fale" : "Talk to",
    titleAccent: isPt ? "connosco." : "us.",
    intro: isPt
      ? "Encomendas personalizadas, visitas ao atelier, imprensa, parcerias — escreva-nos. Respondemos dentro de um dia útil, com calma e dedicação."
      : "Bespoke commissions, atelier visits, press, partnerships — write to us. We reply within one business day, with care.",
    formEyebrow: isPt ? "Escreva-nos" : "Write to us",
    formHeading: isPt
      ? "Conte-nos no que está a pensar."
      : "Tell us what you're thinking about.",
  };

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
          src={HERO_IMAGE}
          alt={
            isPt
              ? "Porta envelhecida do atelier Sildel ao pôr-do-sol, com placa pintada à mão."
              : "Weathered Sildel atelier doorway at golden hour with the hand-painted sign."
          }
          eyebrow={t.eyebrow}
        />

        {/* Title block — centered, mirrors the legal pages' opening. */}
        <section className="border-b border-border/40">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-primary">
              {t.eyebrow}
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.05] md:text-5xl lg:text-6xl">
              {t.title}{" "}
              <span className="italic text-primary">{t.titleAccent}</span>
            </h1>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.intro}
            </p>
          </div>
        </section>

        {/* Contact form — heading then form, narrow column. */}
        <section
          aria-labelledby="contact-form-heading"
          className="relative w-full bg-muted/30 border-b border-border/60"
        >
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
                {t.formEyebrow}
              </p>
              <h2
                id="contact-form-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1]"
              >
                {t.formHeading}
              </h2>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* Map + NAP — kept as the closing beat (local-SEO anchor). */}
        <ContactMap locale={locale} />
      </main>
    </>
  );
}