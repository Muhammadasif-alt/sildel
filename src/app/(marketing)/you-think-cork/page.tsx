import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { PartnersSection } from "@/components/partners/partners-section";
import { YtcHeroEditorial } from "@/components/you-think-cork/ytc-hero-editorial";
import { YtcPillars } from "@/components/you-think-cork/ytc-pillars";
import { StorySection } from "@/components/our-story/story-section";
import { StoryBleed } from "@/components/our-story/story-bleed";
import { resolveYouThinkCork } from "@/lib/editorial/resolvers/you-think-cork";

const PAGE_PATH = "/you-think-cork";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "You Think Cork — Sildel × Material Bank",
  description:
    "SILDEL is a proud member of Material Bank. You Think Cork is our invitation to brands, studios and makers to develop groundbreaking cork-led solutions together.",
  path: PAGE_PATH,
  imageAlt:
    "Cork samples and brochures on a Sildel Material Bank display table.",
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    "you think cork",
    "material bank cork",
    "material bank portugal",
    "cork partnerships",
    "sildel material bank",
    "cork product development",
    "sustainable cork solutions",
    "customised cork projects",
    "cortiça material bank",
    "parcerias cortiça",
    "soluções sustentáveis cortiça",
    "projetos personalizados cortiça",
  ],
});

export default async function YouThinkCorkPage() {
  const locale = await getLocale();
  // Resolved from Mongo if the founder has edited the page in admin,
  // otherwise from the TS file fallback. Same shape either way.
  const content = await resolveYouThinkCork(locale);
  const isPt = locale === "pt";

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Pensa em Cortiça" : "You Think Cork", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `You Think Cork — ${siteConfig.name}`,
    description:
      "Sildel × Material Bank — collaborative cork product development, sustainable solutions and customised projects.",
    image: content.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* Editorial hero — image only, no overlay. */}
        <YtcHeroEditorial
          src={content.hero.image}
          alt={content.hero.imageAlt}
          eyebrow={content.hero.eyebrow}
        />

        {/* "You Think Cork" — image LEFT */}
        <StorySection
          data={content.intro}
          mirror={false}
          headingId="ytc-hero"
        />

        {/* Full-bleed: cork sheets curing in the open air */}
        <StoryBleed src={content.bleed.src} alt={content.bleed.alt} />

        {/* "Let's innovate together" — image RIGHT */}
        <StorySection
          data={content.innovate}
          mirror={true}
          headingId="ytc-innovate"
        />

        {/* Dark inset slogan band — the page's one moment of pure type. */}
        <section
          aria-label={content.banner}
          className="bg-foreground text-background"
        >
          <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-10 lg:py-12 text-center">
            <p className="font-medium text-sm md:text-base lg:text-lg tracking-[0.28em] md:tracking-[0.35em] uppercase">
              {content.banner}
            </p>
          </div>
        </section>

        {/* Three collaboration pillars as a vertical typeset list
            (no 3-column grid). Image LEFT, list RIGHT. */}
        <YtcPillars
          eyebrow={content.pillars.eyebrow}
          title={content.pillars.title}
          titleAccent={content.pillars.titleAccent}
          body={content.pillars.body}
          items={content.pillars.items}
          imageSrc={content.pillars.image}
          imageAlt={content.pillars.imageAlt}
          mirror={false}
        />

        {/* Partnerships — keep the existing editorial cards. */}
        <div className="border-t border-border/60">
          <PartnersSection locale={locale} variant="alt" />
        </div>

        {/* Contact CTA + form — closing beat of the page. */}
        <section
          aria-labelledby="ytc-cta-heading"
          className="relative w-full bg-muted/30 border-t border-border/60"
        >
          <div className="mx-auto max-w-3xl px-6 lg:px-12 py-16 lg:py-24">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
                {content.contactCta.eyebrow}
              </p>
              <h2
                id="ytc-cta-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.04] tracking-tight"
              >
                {content.contactCta.heading}
              </h2>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}