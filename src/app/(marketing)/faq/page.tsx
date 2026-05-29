import Link from "next/link";
import {
  buildMetadata,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { getLocale } from "@/lib/i18n/get-locale";
import { getFaqs } from "@/content/legal";

const PAGE_PATH = "/faq";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "FAQ — Buying, shipping, returns and authentic cork",
  description:
    "Answers to common questions about Sildel — how to buy a one-of-a-kind cork treasure, worldwide shipping, returns, care, and authentic Portuguese cork.",
  path: PAGE_PATH,
  keywords: [
    "Sildel FAQ",
    "perguntas frequentes Sildel",
    "cork art FAQ",
    "FAQ cortiça",
    "how to buy Sildel",
    "como comprar Sildel",
    "Sildel shipping FAQ",
    "Sildel returns FAQ",
    "cork care",
    "cuidar cortiça",
    "authentic Portuguese cork",
    "cortiça portuguesa autêntica",
  ],
});

export default async function FaqPage() {
  const locale = await getLocale();
  const isPt = locale === "pt";
  const faqs = getFaqs(locale);

  const breadcrumbs = buildBreadcrumbJsonLd([
    { label: isPt ? "Início" : "Home", href: "/" },
    { label: isPt ? "Perguntas Frequentes" : "FAQ", href: PAGE_PATH },
  ]);
  // FAQ schema — surfaces answers directly in Google results.
  const faqJsonLd = buildFaqJsonLd(faqs);

  const t = {
    eyebrow: isPt ? "Apoio" : "Help",
    title: isPt ? "Perguntas" : "Frequently asked",
    titleAccent: isPt ? "frequentes." : "questions.",
    intro: isPt
      ? "Tudo o que normalmente nos perguntam sobre comprar, envios, devoluções e cortiça autêntica. Se algo aqui não responder à sua dúvida, fale connosco — temos todo o gosto."
      : "Everything we're usually asked about buying, shipping, returns and authentic cork. If you don't find your answer here, just reach out — we'd love to hear from you.",
    ctaEyebrow: isPt ? "Ainda com dúvidas?" : "Still have a question?",
    ctaBody: isPt
      ? "Fale connosco diretamente — respondemos com calma e dedicação."
      : "Talk to us directly — we reply with care.",
    ctaLink: isPt ? "Contacte-nos" : "Contact us",
  };

  return (
    <>
      <JsonLd data={[breadcrumbs, faqJsonLd]} />
      <main className="flex flex-1 flex-col bg-background text-foreground">
        {/* Header */}
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

        {/* Q&A — native <details> so it works without JS and is SEO-friendly. */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {faqs.map((f, i) => (
                <li key={i}>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-base font-medium text-foreground transition-colors hover:text-primary md:text-lg [&::-webkit-details-marker]:hidden">
                      <span>{f.q}</span>
                      <span
                        aria-hidden
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-primary transition-transform group-open:rotate-45"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5"
                          aria-hidden
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="pb-7 pr-10 text-[15px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-14 text-center lg:px-10 lg:py-16">
            <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {t.ctaEyebrow}
            </p>
            <p className="font-serif text-2xl font-light leading-snug md:text-3xl">
              {t.ctaBody}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.32em] text-background transition-colors hover:bg-foreground/90"
            >
              {t.ctaLink}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}