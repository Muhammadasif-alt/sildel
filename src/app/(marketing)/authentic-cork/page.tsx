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
import Image from "next/image";
import { CorkHeroEditorial } from "@/components/authentic-cork/cork-hero-editorial";
import { CorkProperties } from "@/components/authentic-cork/cork-properties";
import { CorkClosing } from "@/components/authentic-cork/cork-closing";
import { StorySection } from "@/components/our-story/story-section";
import { StoryBleed } from "@/components/our-story/story-bleed";
import { Sustainability } from "@/components/home/sustainability";
import { resolveAuthenticCork } from "@/lib/editorial/resolvers/authentic-cork";

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
  // Resolved from Mongo if the founder has edited the page in admin,
  // otherwise from the TS file fallback. Same shape either way.
  const content = await resolveAuthenticCork(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: locale === "pt" ? "Início" : "Home", href: "/" },
    { label: locale === "pt" ? "Cortiça Autêntica" : "Authentic Cork", href: PAGE_PATH },
  ]);

  const aboutPage = buildAboutPageJsonLd({
    path: PAGE_PATH,
    name: `Authentic Cork — ${siteConfig.name}`,
    description: "What cork is, how it's harvested, and why it shapes everything Sildel makes.",
    image: content.hero.image,
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
          image: content.hero.image,
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
          image: content.hero.image,
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
        <CorkHeroEditorial hero={content.hero} />

        {/* What is cork (image LEFT) */}
        <StorySection
          data={content.whatIsCork}
          mirror={false}
          headingId="cork-what-is"
        />

        {/* Full-bleed: young harvesters lifting the first bark */}
        <StoryBleed
          src={content.bleeds.afterWhatIsCork.src}
          alt={content.bleeds.afterWhatIsCork.alt}
        />

        {/* The Harvest — master harvester's hands (image RIGHT) */}
        <StorySection
          data={content.harvest}
          mirror={true}
          headingId="cork-harvest"
        />

        {/* Full-bleed: hands selecting amadia cork */}
        <StoryBleed
          src={content.bleeds.afterHarvest.src}
          alt={content.bleeds.afterHarvest.alt}
        />

        {/* Properties — six qualities as a vertical typeset list
            (no 3-col grid). Image LEFT, list RIGHT. */}
        <CorkProperties data={content.properties} mirror={false} />

        {/* Biodiversity sanctuary — pull-quote, split row, facts strip.
            Brings the sildel.pt narrative ("one of the world's 35
            biodiversity sanctuaries" + the 14 M tons of CO2 fact)
            back into the new site (founder feedback, June 2026). */}
        <section
          aria-labelledby="cork-biodiversity"
          className="relative w-full bg-background border-t border-border/40"
        >
          <div className="w-full px-6 py-20 lg:px-12 lg:py-28 xl:px-16">
            {/* Pull quote — centred, italic, large. The page's quiet
                anchor before the facts arrive. */}
            <div className="mx-auto mb-16 max-w-4xl text-center lg:mb-20">
              <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-6">
                {content.biodiversity.eyebrow}
              </p>
              <p className="font-serif text-2xl italic leading-[1.35] text-foreground/85 md:text-3xl lg:text-4xl">
                “{content.biodiversity.pullQuote}”
              </p>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-20">
              <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-[88vh] lg:min-h-[640px]">
                <Image
                  src={content.biodiversity.image}
                  alt={content.biodiversity.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h2
                  id="cork-biodiversity"
                  className="font-serif text-3xl font-light leading-[1.06] tracking-tight text-foreground md:text-4xl lg:text-5xl"
                >
                  {content.biodiversity.title}
                  {content.biodiversity.titleAccent ? (
                    <>
                      {" "}
                      <span className="italic text-primary">
                        {content.biodiversity.titleAccent}
                      </span>
                    </>
                  ) : null}
                </h2>
                <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                  {content.biodiversity.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Facts strip — three values across the bottom. Hairline
                top + bottom rules so it reads as a quiet attribution
                line, not a marketing banner. */}
            {content.biodiversity.facts.length > 0 ? (
              <ul className="mt-16 grid grid-cols-1 gap-y-8 border-y border-border/60 py-10 sm:grid-cols-3 sm:gap-x-10 lg:mt-20">
                {content.biodiversity.facts.map((fact, i) => (
                  <li
                    key={i}
                    className="text-center sm:border-r sm:border-border/60 sm:last:border-r-0"
                  >
                    <p className="font-serif text-4xl font-light tabular-nums text-foreground md:text-5xl">
                      {fact.value}
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                      {fact.label}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        {/* Sustainability — relocated from the home page (founder cut the
            home section but the 9-year-harvest / regeneration narrative
            and stats belong on the material-education page, not lost). */}
        <Sustainability />

        {/* Full-bleed: weathered Sildel atelier doorway at golden hour */}
        <StoryBleed
          src={content.bleeds.beforeInSildel.src}
          alt={content.bleeds.beforeInSildel.alt}
        />

        {/* Cork at Sildel — bark to treasure (image RIGHT) */}
        <StorySection
          data={content.inSildel}
          mirror={true}
          headingId="cork-in-sildel"
        />

        {/* Closing parallax CTA — same treatment as /our-story so the
            editorial pages rhyme. */}
        <CorkClosing cta={content.cta} />
      </main>
    </>
  );
}