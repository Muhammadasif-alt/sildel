import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/brand-icons";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n/get-locale";
import { getUi } from "@/lib/i18n/ui";
import { getSiteSettings } from "@/lib/content/site-settings";
import { pickLocalized } from "@/lib/blocks/types";

export async function SiteFooter() {
  const year = new Date().getFullYear();
  const locale = await getLocale();
  const ui = getUi(locale);
  const settings = await getSiteSettings();

  const social = [
    { href: settings.social.instagram || siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: settings.social.facebook || siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: settings.social.linkedin || siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ].filter((s) => s.href);

  // Footer columns: prefer settings, fall back to defaults.
  const columns = settings.footer.columns.length
    ? settings.footer.columns.map((c) => ({
        heading: pickLocalized(c.heading, locale),
        links: c.links.map((l) => ({
          label: pickLocalized(l.label, locale),
          href: l.href || "#",
        })),
      }))
    : [
        {
          heading: locale === "pt" ? "Descobrir" : "Discover",
          links: [
            { label: ui.nav.ourStory, href: "/our-story" },
            { label: ui.nav.authenticCork, href: "/authentic-cork" },
            { label: ui.nav.youThinkCork, href: "/you-think-cork" },
            { label: locale === "pt" ? "Parcerias" : "Partnerships", href: "/partners" },
            { label: ui.nav.treasures, href: "/treasures" },
          ],
        },
        {
          heading: locale === "pt" ? "Apoio" : "Help",
          links: [
            { label: ui.nav.contact, href: "/contact" },
            { label: ui.footer.helpLinks.faq, href: "/faq" },
            { label: ui.nav.blog, href: "/blog" },
            { label: ui.nav.press, href: "/press" },
            { label: ui.footer.legalLinks.shipping, href: "/shipping" },
            { label: ui.footer.legalLinks.terms, href: "/terms" },
            { label: ui.footer.legalLinks.privacy, href: "/privacy" },
          ],
        },
      ];

  const legalLinks = [
    { label: ui.footer.legalLinks.privacy, href: "/privacy" },
    { label: ui.footer.legalLinks.terms, href: "/terms" },
    { label: ui.footer.legalLinks.shipping, href: "/shipping" },
  ];

  // Black footer (founder direction, June 2026): use the LIGHT logo
  // variant so the wordmark stays legible against the dark ground.
  const logoLight = settings.brand.logoLightUrl || "/brand/sildel-logo-light-trim.webp";
  const tagline = pickLocalized(settings.brand.tagline, locale) || ui.footer.tagline;
  const footerTagline = pickLocalized(settings.footer.tagline, locale);
  const email = settings.contact.email || siteConfig.contact.email;
  const phone = settings.contact.phone || siteConfig.contact.phone;
  const address = pickLocalized(settings.contact.address, locale);
  const copyright = pickLocalized(settings.footer.copyright, locale);

  return (
    <footer
      className="relative w-full bg-black text-white/85 border-t border-white/10"
      aria-labelledby="site-footer-heading"
    >
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-20 lg:gap-y-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block">
              <Image
                src={logoLight}
                alt={`${siteConfig.name} — ${siteConfig.tagline}`}
                width={197}
                height={200}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-7 max-w-md font-serif text-lg font-light leading-snug text-white sm:text-xl text-balance">
              {tagline}
            </p>
            {footerTagline && (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">
                {footerTagline}
              </p>
            )}

            {social.length > 0 && (
              <ul className="mt-7 flex items-center gap-3">
                {social.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${label}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dynamic columns */}
          {columns.map((col, i) => (
            <nav key={i} className="lg:col-span-2" aria-label={`Footer — ${col.heading}`}>
              <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-primary">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((item, j) => (
                  <li key={`${item.href}-${j}`}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/65 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-primary">
              {locale === "pt" ? "Contacto" : "Contact"}
            </h3>
            <ul className="space-y-5 text-sm">
              {phone && (
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block whitespace-nowrap font-medium text-white transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  </div>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="truncate text-white transition-colors hover:text-primary"
                  >
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <address className="not-italic leading-relaxed text-white/65">
                    {address.split("\n").map((line, i) => (
                      <span key={i} className={i === 0 ? "block text-white" : "block"}>
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row lg:px-10">
          <p className="text-[11px] tracking-wider text-white/55">
            {copyright ||
              `© ${year} ${siteConfig.name}. ${
                locale === "pt" ? "Desenhado em Portugal." : "Designed in Portugal."
              } ${ui.footer.rights}`}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] tracking-wider text-white/55">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
