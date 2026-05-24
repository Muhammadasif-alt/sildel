import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function ComingSoon({
  eyebrow,
  title,
  titleAccent,
  body,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32 lg:py-44">
      <section className="max-w-2xl text-center">
        <div className="flex items-center justify-center gap-4 mb-10" aria-hidden>
          <span className="h-px w-10 bg-primary/40" />
          <span className="text-xs tracking-[0.4em] uppercase text-primary">
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-primary/40" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] mb-2">
          {title}
        </h1>
        <h2 className="font-serif italic text-primary text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] mb-10">
          {titleAccent}
        </h2>

        <div className="mx-auto h-px w-16 bg-primary/60 mb-8" aria-hidden />

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          {body}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-3"
            >
              <span className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 lg:py-4 text-xs tracking-[0.35em] uppercase font-medium rounded-sm transition-colors group-hover:bg-primary/90">
                {primaryCta.label}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="group inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors"
            >
              <span className="border-b border-primary/60 group-hover:border-primary pb-1">
                {secondaryCta.label}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
