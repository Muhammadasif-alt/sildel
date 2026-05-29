import Image from "next/image";
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

/**
 * /you-think-cork — direct mirror of the live sildel.pt page.
 *
 * Founder asked for the original Material-Bank / "Let's Innovate Together"
 * pitch to come back verbatim. We stopped using the BlocksRenderer here
 * because the older fine-art manifesto layout the CMS still points at no
 * longer matches the real page; the simpler inline layout below tracks the
 * live site one-to-one (hero, body, black band, three pillars, contact form).
 */
const PAGE_PATH = "/you-think-cork";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-05-26T00:00:00Z";

const HERO_IMAGE =
  "/Slidel/Nano Banana 2 - Close-up of hands selecting a piece of fine even amadia cork bark from a stack_ warm_1.webp";
const BLOCK_IMAGE =
  "/Slidel/Nano Banana 2 - Tall stacks of freshly harvested cork sheets curing under cork oak trees_ golden hou_1.webp";

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
  });

  const t = {
    heroTitle: isPt ? "PENSA EM CORTIÇA!" : "YOU THINK CORK!",
    heroBody: isPt
      ? "Como orgulhoso membro do Material Bank, a SILDEL está empenhada em fomentar um ambiente colaborativo onde marcas e empresas se encontrem para inovar e criar. “You Think Cork” não é apenas sobre fazer parcerias connosco — é sobre construir uma rede de empresas com visão de futuro, dedicadas a expandir os limites do que é possível com cortiça autêntica."
      : "As a proud member of Material Bank, SILDEL is committed to fostering a collaborative environment where brands and companies can come together to innovate and create. “You Think Cork” is not just about partnering with us — it's about building a network of forward-thinking companies dedicated to pushing the boundaries of what's possible with authentic cork.",
    bodyHeading: isPt ? "Vamos inovar juntos!" : "Let's innovate together!",
    bodyBody: isPt
      ? "Acreditamos no poder da colaboração para impulsionar a inovação e criar peças extraordinárias. A nossa dedicação à cortiça autêntica mostrou-nos o potencial ilimitado deste material sustentável. Queremos levar a nossa paixão um passo mais longe e convidamo-lo a juntar-se a nós na exploração de novos horizontes."
      : "We believe in the power of collaboration to drive innovation and create extraordinary pieces. Our dedication for authentic cork has shown us the limitless potential of this sustainable material. We want to take our passion a step further and invite you to join us in exploring new horizons.",
    bannerLine: isPt
      ? "JUNTOS PODEMOS DESENVOLVER SOLUÇÕES REVOLUCIONÁRIAS:"
      : "TOGETHER WE CAN DEVELOP GROUNDBREAKING SOLUTIONS:",
    pillars: [
      {
        icon: Beaker,
        title: isPt ? "DESENVOLVIMENTO DE PRODUTO" : "PRODUCT DEVELOPMENT",
        body: isPt
          ? "Colabore com a nossa equipa para criar produtos inovadores que tirem partido dos benefícios únicos da cortiça."
          : "Collaborate with our team to create innovative products that leverage the unique benefits of cork.",
      },
      {
        icon: Leaf,
        title: isPt ? "SOLUÇÕES SUSTENTÁVEIS" : "SUSTAINABLE SOLUTIONS",
        body: isPt
          ? "Trabalhemos lado a lado para desenvolver alternativas ecológicas a materiais tradicionais."
          : "Work together to develop eco-friendly alternatives to traditional materials.",
      },
      {
        icon: Settings,
        title: isPt ? "PROJETOS PERSONALIZADOS" : "CUSTOMIZED PROJECTS",
        body: isPt
          ? "Dê vida às suas ideias com soluções em cortiça desenhadas à medida das suas necessidades."
          : "Bring your unique ideas to life with tailored cork solutions designed to meet your specific needs.",
      },
    ],
    ctaEyebrow: isPt ? "Pensa em cortiça?" : "Do you think cork?",
    ctaHeading: isPt
      ? "Fale connosco e ajude-nos a moldar o futuro."
      : "Reach out and join us in shaping the future.",
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage]} />
      <main className="flex flex-col flex-1 bg-background text-foreground">
        {/* ─────────── Hero ─────────── */}
        <section
          aria-labelledby="ytc-heading"
          className="relative w-full border-b border-border/40"
        >
          <div className="mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-6 lg:px-12 py-16 lg:py-24 items-center">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
                Sildel × Material Bank
              </p>
              <h1
                id="ytc-heading"
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-8"
              >
                {t.heroTitle}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                {t.heroBody}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted/40">
              <Image
                src={HERO_IMAGE}
                alt={
                  isPt
                    ? "Amostras de cortiça em sessão de inspeção Sildel."
                    : "Cork samples being inspected in the Sildel atelier."
                }
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ─────────── Innovate together ─────────── */}
        <section className="relative w-full">
          <div className="mx-auto max-w-[1480px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-6 lg:px-12 py-16 lg:py-24 items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted/40 order-2 lg:order-1">
              <Image
                src={BLOCK_IMAGE}
                alt={
                  isPt
                    ? "Pilhas de cortiça portuguesa a curar ao ar livre."
                    : "Stacks of Portuguese cork curing in the open air."
                }
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8 max-w-xl">
                {t.bodyBody}
              </p>
              <p className="font-serif italic text-2xl md:text-3xl text-foreground leading-snug">
                {t.bodyHeading}
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── Black band ─────────── */}
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

        {/* ─────────── Three pillars ─────────── */}
        <section
          aria-label={isPt ? "Pilares de colaboração" : "Collaboration pillars"}
          className="relative w-full"
        >
          <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-16 lg:py-20">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {t.pillars.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="group rounded-md border border-border/60 bg-card/60 p-7 md:p-8 transition-all duration-500 ease-out hover:border-foreground/40 hover:bg-card/80"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 text-foreground mb-6"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h2 className="font-medium text-sm tracking-[0.28em] uppercase text-foreground mb-4">
                    {title}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────── Partnerships ─────────── */}
        <div className="border-t border-border/60">
          <PartnersSection locale={locale} variant="alt" />
        </div>

        {/* ─────────── Contact CTA + form ─────────── */}
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
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1]"
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