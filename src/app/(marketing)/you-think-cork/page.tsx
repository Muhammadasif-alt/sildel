import { Beaker, Leaf, Settings } from "lucide-react";
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
import { YtcPillars, type YtcPillar } from "@/components/you-think-cork/ytc-pillars";
import {
  StorySection,
  type StorySectionData,
} from "@/components/our-story/story-section";
import { StoryBleed } from "@/components/our-story/story-bleed";

/**
 * /you-think-cork — editorial pass in the Quinta Nova rhythm
 * (founder direction, June 2026). Image-only hero, alternating
 * StorySection rows, a full-bleed palette-cleanser, slogan band
 * for the dark inset beat, then the three collaboration pillars
 * as a vertical typeset list (no 3-column grid).
 */
const PAGE_PATH = "/you-think-cork";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

const HERO_IMAGE =
  "/Slidel/Nano Banana 2 - Close-up of hands selecting a piece of fine even amadia cork bark from a stack_ warm_1.webp";
const BLOCK_IMAGE =
  "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_1.webp";
const BARK_IMAGE =
  "/Slidel/Nano Banana 2 - Extreme macro photograph of authentic Portuguese cork bark texture_ intricate ridged.webp";
const ATELIER_DOOR_IMAGE =
  "/Slidel/Nano Banana 2 - A weathered Portuguese atelier doorway at golden hour_ hand-painted Sildel wooden si_1.webp";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "You Think Cork — Sildel × Material Bank",
  description:
    "SILDEL is a proud member of Material Bank. You Think Cork is our invitation to brands, studios and makers to develop groundbreaking cork-led solutions together.",
  path: PAGE_PATH,
  image: HERO_IMAGE,
  imageAlt: "Cork samples and brochures on a Sildel Material Bank display table.",
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
    image: HERO_IMAGE,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  const t = {
    eyebrow: "Sildel × Material Bank",
    heroTitle: isPt ? "Pensa em" : "You Think",
    heroTitleAccent: isPt ? "cortiça." : "cork.",
    heroBody: isPt
      ? "Como orgulhoso membro do Material Bank, a SILDEL está empenhada em fomentar um ambiente colaborativo onde marcas e empresas se encontrem para inovar e criar. “You Think Cork” não é apenas sobre fazer parcerias connosco — é sobre construir uma rede de empresas com visão de futuro, dedicadas a expandir os limites do que é possível com cortiça autêntica."
      : "As a proud member of Material Bank, SILDEL is committed to fostering a collaborative environment where brands and companies can come together to innovate and create. “You Think Cork” is not just about partnering with us — it's about building a network of forward-thinking companies dedicated to pushing the boundaries of what's possible with authentic cork.",
    innovateEyebrow: isPt ? "Convite" : "Invitation",
    innovateTitle: isPt ? "Vamos inovar" : "Let's innovate",
    innovateTitleAccent: isPt ? "juntos." : "together.",
    innovateBody: isPt
      ? "Acreditamos no poder da colaboração para impulsionar a inovação e criar peças extraordinárias. A nossa dedicação à cortiça autêntica mostrou-nos o potencial ilimitado deste material sustentável. Queremos levar a nossa paixão um passo mais longe e convidamo-lo a juntar-se a nós na exploração de novos horizontes."
      : "We believe in the power of collaboration to drive innovation and create extraordinary pieces. Our dedication for authentic cork has shown us the limitless potential of this sustainable material. We want to take our passion a step further and invite you to join us in exploring new horizons.",
    bannerLine: isPt
      ? "JUNTOS PODEMOS DESENVOLVER SOLUÇÕES REVOLUCIONÁRIAS"
      : "TOGETHER WE CAN DEVELOP GROUNDBREAKING SOLUTIONS",
    pillarsEyebrow: isPt ? "Três caminhos" : "Three paths",
    pillarsTitle: isPt ? "Onde se cruzam" : "Where our work",
    pillarsTitleAccent: isPt ? "os nossos caminhos." : "meets yours.",
    pillarsBody: isPt
      ? "Três frentes de colaboração — cada uma um convite aberto às marcas, estúdios e fabricantes que vêem na cortiça mais do que um material."
      : "Three fronts of collaboration — each an open invitation to brands, studios and makers who see more than a material in cork.",
    pillars: [
      {
        icon: Beaker,
        title: isPt ? "Desenvolvimento de produto" : "Product development",
        body: isPt
          ? "Colabore com a nossa equipa para criar produtos inovadores que tirem partido dos benefícios únicos da cortiça."
          : "Collaborate with our team to create innovative products that leverage the unique benefits of cork.",
      },
      {
        icon: Leaf,
        title: isPt ? "Soluções sustentáveis" : "Sustainable solutions",
        body: isPt
          ? "Trabalhemos lado a lado para desenvolver alternativas ecológicas a materiais tradicionais."
          : "Work together to develop eco-friendly alternatives to traditional materials.",
      },
      {
        icon: Settings,
        title: isPt ? "Projetos personalizados" : "Customised projects",
        body: isPt
          ? "Dê vida às suas ideias com soluções em cortiça desenhadas à medida das suas necessidades."
          : "Bring your unique ideas to life with tailored cork solutions designed to meet your specific needs.",
      },
    ] satisfies YtcPillar[],
    ctaEyebrow: isPt ? "Pensa em cortiça?" : "Do you think cork?",
    ctaHeading: isPt
      ? "Fale connosco e ajude-nos a moldar o futuro."
      : "Reach out and join us in shaping the future.",
  };

  const heroSection: StorySectionData = {
    eyebrow: t.eyebrow,
    title: t.heroTitle,
    titleAccent: t.heroTitleAccent,
    body: [t.heroBody],
    image: BARK_IMAGE,
    imageAlt: isPt
      ? "Pormenor macro da casca de cortiça portuguesa."
      : "Macro detail of Portuguese cork bark.",
  };

  const innovateSection: StorySectionData = {
    eyebrow: t.innovateEyebrow,
    title: t.innovateTitle,
    titleAccent: t.innovateTitleAccent,
    body: [t.innovateBody],
    image: ATELIER_DOOR_IMAGE,
    imageAlt: isPt
      ? "Porta envelhecida do atelier Sildel ao pôr-do-sol."
      : "Weathered Sildel atelier doorway at golden hour.",
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* Editorial hero — image only, no overlay (founder direction
            June 2026: Quinta Nova History page reference). */}
        <YtcHeroEditorial
          src={HERO_IMAGE}
          alt={
            isPt
              ? "Mãos a seleccionar uma peça de cortiça amadia fina."
              : "Hands selecting a piece of fine amadia cork bark."
          }
          eyebrow={t.eyebrow}
        />

        {/* You Think Cork (image LEFT) */}
        <StorySection data={heroSection} mirror={false} headingId="ytc-hero" />

        {/* Full-bleed: cork sheets curing in the open air */}
        <StoryBleed
          src={BLOCK_IMAGE}
          alt={
            isPt
              ? "Pilhas de cortiça portuguesa a curar ao ar livre."
              : "Stacks of Portuguese cork curing in the open air."
          }
        />

        {/* Let's innovate together (image RIGHT) */}
        <StorySection
          data={innovateSection}
          mirror={true}
          headingId="ytc-innovate"
        />

        {/* Dark inset slogan band — the page's one moment of pure type. */}
        <section
          aria-label={t.bannerLine}
          className="bg-foreground text-background"
        >
          <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-10 lg:py-12 text-center">
            <p className="font-medium text-sm md:text-base lg:text-lg tracking-[0.28em] md:tracking-[0.35em] uppercase">
              {t.bannerLine}
            </p>
          </div>
        </section>

        {/* Three collaboration pillars as a vertical typeset list
            (no 3-column grid). Image LEFT, list RIGHT. */}
        <YtcPillars
          eyebrow={t.pillarsEyebrow}
          title={t.pillarsTitle}
          titleAccent={t.pillarsTitleAccent}
          body={t.pillarsBody}
          items={t.pillars}
          imageSrc={
            "/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_4.webp"
          }
          imageAlt={
            isPt
              ? "Peça escultórica em cortiça sobre pedestal de mármore — silhueta minimalista."
              : "A sculptural cork piece on a marble pedestal — minimalist silhouette."
          }
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
                {t.ctaEyebrow}
              </p>
              <h2
                id="ytc-cta-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.04] tracking-tight"
              >
                {t.ctaHeading}
              </h2>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}