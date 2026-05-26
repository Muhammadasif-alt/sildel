import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildAboutPageJsonLd,
  buildHowToJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { authenticCork } from "@/content/authentic-cork";
import { getLocale } from "@/lib/i18n/get-locale";
import { JsonLd } from "@/components/common/json-ld";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";

const PAGE_PATH = "/authentic-cork";
const DATE_PUBLISHED = "2024-01-01T00:00:00Z";
const DATE_MODIFIED = "2026-05-19T00:00:00Z";

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
    // Tree / species
    "Portuguese cork oak",
    "sobreiro português",
    "Quercus suber",
    "cork oak tree",
    "árvore cortiça",
    // Material properties
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
    // Sustainability
    "sustainable material",
    "material sustentável",
    "carbon-negative material",
    "material carbono negativo",
    "renewable material",
    "material renovável",
    // Process / harvest
    "cork harvest process",
    "processo extração cortiça",
    "cork bark",
    "casca sobreiro",
    "nine-year cycle cork",
    "ciclo nove anos cortiça",
    // Location
    "Alentejo cork forest",
    "montado cortiça Alentejo",
    "Portugal cork industry",
    "indústria cortiça Portugal",
  ],
});

export default async function AuthenticCorkPage() {
  const locale = await getLocale();

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
              text: "O sobreiro cresce durante 25 anos antes da primeira extração — só depois a casca exterior está pronta para ser retirada com segurança.",
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

  return (
    <>
      <JsonLd data={[breadcrumbs, aboutPage, howToJsonLd]} />
      <main className="flex flex-col flex-1">
        <BlocksRenderer pageKey="authentic-cork" />
      </main>
    </>
  );
}