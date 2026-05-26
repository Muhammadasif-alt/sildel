import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";
import { ContactMap } from "@/components/contact/contact-map";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Contact — Sildel Atelier, Esmoriz, Portugal",
  description:
    "Reach the Sildel atelier in Esmoriz, Aveiro — enquiries about a treasure, bespoke commissions, atelier visits, press, or wholesale. We reply within one business day.",
  path: "/contact",
  keywords: [
    // Contact intent
    "contact Sildel",
    "contactar Sildel",
    "Sildel email",
    "Sildel phone",
    "telefone Sildel",
    // Atelier visit
    "visit Sildel atelier",
    "visitar atelier Sildel",
    "Esmoriz atelier visit",
    "visita atelier Esmoriz",
    "Sildel studio Portugal",
    "estúdio Sildel Portugal",
    // Services
    "cork commission",
    "encomenda cortiça",
    "bespoke cork",
    "cortiça por encomenda",
    "wholesale cork art",
    "cortiça grossista",
    "press Sildel",
    "imprensa Sildel",
    // Location
    "Sildel Esmoriz",
    "Sildel Aveiro",
    "Sildel Portugal address",
    "morada Sildel Portugal",
  ],
});

const ContactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": new URL("/contact", siteConfig.url).toString(),
  url: new URL("/contact", siteConfig.url).toString(),
  name: `Contact — ${siteConfig.name}`,
  inLanguage: ["en-US", "pt-PT"],
  isPartOf: { "@type": "WebSite", url: siteConfig.url },
  about: { "@id": `${siteConfig.url}/#organization` },
  mainEntity: { "@id": `${siteConfig.url}/#localbusiness` },
};

export default async function ContactPage() {
  const locale = await getLocale();

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Contacto" : "Contact", href: "/contact" },
  ]);

  // Two services we explicitly market on this page — surfaces in SERPs
  // as separate "service" rich results for relevant queries.
  const commissionService = buildServiceJsonLd({
    name:
      locale === "pt"
        ? "Encomendas Personalizadas em Cortiça"
        : "Bespoke Cork Commissions",
    description:
      locale === "pt"
        ? "Encomenda uma peça em cortiça portuguesa desenhada e executada à medida no atelier Sildel em Esmoriz — assinada e numerada."
        : "Commission a one-of-one Portuguese cork piece designed and crafted at the Sildel atelier in Esmoriz — signed and numbered.",
    serviceType: "Bespoke Cork Art Commission",
    path: "/contact",
  });

  const atelierVisitService = buildServiceJsonLd({
    name:
      locale === "pt"
        ? "Visitas ao Atelier Sildel"
        : "Sildel Atelier Visits",
    description:
      locale === "pt"
        ? "Visite o atelier Sildel em Esmoriz, Aveiro — por marcação, para conhecer o processo de criação em cortiça."
        : "Visit the Sildel atelier in Esmoriz, Aveiro — by appointment, to experience the cork-making process first-hand.",
    serviceType: "Atelier Visit",
    path: "/contact",
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
      <main className="flex flex-1 flex-col">
        <BlocksRenderer pageKey="contact" />
        <ContactMap locale={locale} />
      </main>
    </>
  );
}