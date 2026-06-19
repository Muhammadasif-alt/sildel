import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
  buildHowToJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { authenticCork, getAuthenticCork } from "@/content/authentic-cork";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { CorkHeroEditorial } from "@/components/authentic-cork/cork-hero-editorial";
import { CorkProperties } from "@/components/authentic-cork/cork-properties";
import { CorkClosing } from "@/components/authentic-cork/cork-closing";
import {
  StorySection,
  type StorySectionData,
} from "@/components/our-story/story-section";
import { StoryBleed } from "@/components/our-story/story-bleed";

const PAGE_PATH = "/authentic-cork";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-06-20T00:00:00Z";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Authentic Cork — What Cork Is, and Why It Matters",
  description:
    "Cork is the bark of the Portuguese cork oak (Quercus suber) — harvested every nine years in the Alentejo without harming the tree. Carbon-negative, fire-resistant, naturally insulating.",
  path: PAGE_PATH,
  image: authenticCork.hero.image,
  imageAlt: authenticCork.hero.imageAlt,
  type: "article",
  publishedTime: DATE_PUBLISHED,
  modifiedTime: DATE_MODIFIED,
  keywords: [
    "Portuguese cork oak",
    "sobreiro português",
    "Quercus suber",
    "cork oak tree",
    "árvore cortiça",
    "cork properties",
    "propriedades cortiça",
    "natural insulation",
    "isolamento natural",
    "fire-resistant cork",
    "cortiça ignífuga",
    "cork cellular structure",
    "estrutura celular cortiça",
    "elastic cork",
    "waterproof cork",
    "cortiça impermeável",
    "sustainable material",
    "material sustentável",
    "carbon-negative material",
    "material carbono negativo",
    "renewable material",
    "material renovável",
    "cork harvest process",
    "processo extração cortiça",
    "cork bark",
    "casca sobreiro",
    "nine-year cycle cork",
    "ciclo nove anos cortiça",
    "Alentejo cork forest",
    "montado cortiça Alentejo",
    "Portugal cork industry",
    "indústria cortiça Portugal",
  ],
});

export default async function AuthenticCorkPage() {
  const locale = await getLocale();
  const content = getAuthenticCork(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Cortiça Autêntica" : "Authentic Cork", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Authentic Cork — ${siteConfig.name}`,
    description: "What cork is, how it's harvested, and why it shapes everything Sildel makes.",
    image: authenticCork.hero.image,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    locale,
  });

  // HowTo — the cork harvest process. Bilingual content, picked by locale.
  // Strong SEO signal: HowTo can earn rich "how it works" snippets in
  // SERPs for queries like "how is cork harvested" / "como se extrai a cortiça".
  const howToJsonLd = buildHowToJsonLd(
    locale === "pt"
      ? {
          name: "Como se extrai a cortiça portuguesa",
          description:
            "O processo tradicional de extração da cortiça do sobreiro (Quercus suber) no Alentejo — feito à mão, sem danificar a árvore, a cada nove anos.",
          image: authenticCork.hero.image,
          totalTime: "P9Y",
          steps: [
            {
              name: "Maturação do sobreiro",
              text: "O sobreiro cresce durante 25 anos antes da primeira colheita (a cortiça virgem) — só depois a casca exterior está pronta para ser retirada com segurança.",
            },
            {
              name: "Extração manual com machado",
              text: "Mestres extratores cortam verticalmente a casca exterior com um machado curvo, sem nunca tocar no interior vivo da árvore.",
            },
            {
              name: "Cura ao ar livre",
              text: "As pranchas de cortiça repousam ao ar livre durante seis meses, estabilizando o veio e a cor.",
            },
            {
              name: "Fervura e seleção",
              text: "A cortiça é fervida para limpar e amaciar, depois selecionada por qualidade, espessura e veio.",
            },
            {
              name: "Acabamento no atelier Sildel",
              text: "Cada peça é moldada e finalizada à mão no atelier de Esmoriz — assinada, numerada e feita para durar gerações.",
            },
          ],
        }
      : {
          name: "How Portuguese Cork Is Harvested",
          description:
            "The traditional process of harvesting cork from the Portuguese cork oak (Quercus suber) in the Alentejo — done by hand, every nine years, without harming the tree.",
          image: authenticCork.hero.image,
          totalTime: "P9Y",
          steps: [
            {
              name: "Cork oak maturation",
              text: "The cork oak grows for 25 years before its first harvest — only then is the outer bark ready to be safely stripped.",
            },
            {
              name: "Hand harvest with curved axe",
              text: "Master harvesters cut the outer bark vertically with a curved axe, never touching the living interior of the tree.",
            },
            {
              name: "Open-air curing",
              text: "Cork planks rest outdoors for six months, settling into their grain and colour.",
            },
            {
              name: "Boiling and selection",
              text: "The cork is boiled to clean and soften, then sorted by quality, thickness and grain.",
            },
            {
              name: "Finishing at the Sildel atelier",
              text: "Each piece is shaped and finished by hand in our Esmoriz atelier — signed, numbered, and made to last generations.",
            },
          ],
        },
  );

  // Narrative reel — alternating image+text rows built from the
  // existing localised content (no new copy invented). The harvest
  // row's image is the master harvester's hands so the page has at
  // least one human moment between the macro-bark frames.
  const sections: StorySectionData[] = [
    {
      eyebrow: content.whatIsCork.eyebrow,
      title: content.whatIsCork.title,
      titleAccent: content.whatIsCork.titleAccent,
      body: content.whatIsCork.body,
      image: content.whatIsCork.image,
      imageAlt: content.whatIsCork.imageAlt,
    },
    {
      eyebrow: content.harvest.eyebrow,
      title: content.harvest.title,
      titleAccent: content.harvest.titleAccent,
      body: [content.harvest.body],
      image: content.harvest.images[1].src,
      imageAlt: content.harvest.images[1].alt,
    },
    {
      eyebrow: content.inSildel.eyebrow,
      title: content.inSildel.title,
      titleAccent: content.inSildel.titleAccent,
      body: [content.inSildel.body, content.inSildel.points.join(". ") + "."],
      image: content.inSildel.image,
      imageAlt: content.inSildel.imageAlt,
    },
  ];

  // Full-bleed palette-cleansers slotted between the narrative rows.
  const bleedAfterWhatIsCork = {
    src: content.harvest.images[0].src,
    alt: content.harvest.images[0].alt,
  };
  const bleedAfterHarvest = {
    src: content.harvest.images[2].src,
    alt: content.harvest.images[2].alt,
  };
  const bleedBeforeInSildel = {
    src: content.cta.destinations[1].image,
    alt: content.cta.destinations[1].imageAlt,
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage, howToJsonLd]} />
      <main className="flex flex-col flex-1">
        {/* Editorial hero — image only, no overlay (founder direction
            June 2026: Quinta Nova History page reference). */}
        <CorkHeroEditorial locale={locale} />

        {/* What is cork (image LEFT) */}
        <StorySection
          data={sections[0]}
          mirror={false}
          headingId="cork-what-is"
        />

        {/* Full-bleed: young harvesters lifting the first bark */}
        <StoryBleed
          src={bleedAfterWhatIsCork.src}
          alt={bleedAfterWhatIsCork.alt}
        />

        {/* The Harvest — master harvester's hands (image RIGHT) */}
        <StorySection
          data={sections[1]}
          mirror={true}
          headingId="cork-harvest"
        />

        {/* Full-bleed: hands selecting amadia cork */}
        <StoryBleed
          src={bleedAfterHarvest.src}
          alt={bleedAfterHarvest.alt}
        />

        {/* Properties — six qualities as a vertical typeset list
            (no 3-col grid). Image LEFT, list RIGHT. */}
        <CorkProperties
          locale={locale}
          imageSrc={content.cta.destinations[0].image}
          imageAlt={content.cta.destinations[0].imageAlt}
          mirror={false}
        />

        {/* Full-bleed: weathered Sildel atelier doorway at golden hour */}
        <StoryBleed
          src={bleedBeforeInSildel.src}
          alt={bleedBeforeInSildel.alt}
        />

        {/* Cork at Sildel — bark to treasure (image RIGHT) */}
        <StorySection
          data={sections[2]}
          mirror={true}
          headingId="cork-in-sildel"
        />

        {/* Closing parallax CTA — same treatment as /our-story so the
            editorial pages rhyme. */}
        <CorkClosing locale={locale} />
      </main>
    </>
  );
}