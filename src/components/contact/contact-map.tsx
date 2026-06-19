import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n/config";

/**
 * Embedded Google Map + NAP block.
 *
 * Local-SEO load-bearing — gives Google a strong, visible "place" signal
 * on the contact page, tied to the same coords carried in our
 * LocalBusiness JSON-LD. The address is wrapped in microformat-style
 * tags (itemProp) for redundancy with the structured data.
 */
export function ContactMap({ locale }: { locale: Locale }) {
  const isPt = locale === "pt";
  const { address, geo, phone, phoneHref, email, openingHours } =
    siteConfig.contact;

  // Maps embed using the public "place" URL — no API key required.
  // q-param is the address, output=embed makes it iframe-friendly.
  const mapsQuery = encodeURIComponent(
    `${address.streetAddress}, ${address.postalCode} ${address.locality}, ${address.countryName}`,
  );
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapsLinkUrl = `https://maps.google.com/?q=${mapsQuery}`;

  const i18n = {
    eyebrow: isPt ? "Visite o atelier" : "Visit the atelier",
    title: isPt
      ? "Encontre-nos em Esmoriz, Portugal."
      : "Find us in Esmoriz, Portugal.",
    body: isPt
      ? "O atelier Sildel fica em Esmoriz, Aveiro — visitas por marcação. Estamos disponíveis para encomendas personalizadas, imprensa e parceiros."
      : "The Sildel atelier sits in Esmoriz, Aveiro — visits by appointment. Available for bespoke commissions, press, and trade partners.",
    addressLabel: isPt ? "Morada" : "Address",
    emailLabel: isPt ? "E-mail" : "Email",
    phoneLabel: isPt ? "Telefone" : "Phone",
    hoursLabel: isPt ? "Horário" : "Hours",
    hoursValue: isPt
      ? "Seg–Sex · 10:00–18:00 · visitas por marcação"
      : "Mon–Fri · 10:00–18:00 · visits by appointment",
    directionsLabel: isPt ? "Obter direções" : "Get directions",
  };

  return (
    <section
      aria-labelledby="contact-map-heading"
      className="relative w-full border-t border-border/60 bg-background"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <meta itemProp="name" content={siteConfig.name} />
      <meta itemProp="url" content={siteConfig.url} />
      <meta itemProp="telephone" content={phone} />
      <meta itemProp="email" content={email} />

      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text + NAP */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-primary">
              {i18n.eyebrow}
            </p>
            <h2
              id="contact-map-heading"
              className="font-serif text-3xl font-light leading-[1.05] md:text-4xl lg:text-5xl"
            >
              {i18n.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {i18n.body}
            </p>

            {/* NAP — Name / Address / Phone with microformats */}
            <dl className="mt-10 space-y-6">
              <div
                className="flex items-start gap-4"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <MapPin
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {i18n.addressLabel}
                  </dt>
                  <dd className="mt-1 text-base text-foreground">
                    <span itemProp="streetAddress">{address.streetAddress}</span>
                    <br />
                    <span itemProp="postalCode">{address.postalCode}</span>{" "}
                    <span itemProp="addressLocality">{address.locality}</span>,{" "}
                    <span itemProp="addressRegion">{address.region}</span>
                    <br />
                    <span itemProp="addressCountry">{address.countryName}</span>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {i18n.emailLabel}
                  </dt>
                  <dd className="mt-1 text-base">
                    <a
                      href={`mailto:${email}`}
                      className="text-foreground transition-colors hover:text-primary"
                    >
                      {email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {i18n.phoneLabel}
                  </dt>
                  <dd className="mt-1 text-base">
                    <a
                      href={`tel:${phoneHref}`}
                      className="text-foreground transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock
                  className="mt-1 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {i18n.hoursLabel}
                  </dt>
                  <dd
                    className="mt-1 text-base text-foreground"
                    itemProp="openingHours"
                    content={openingHours
                      .map(
                        (h) => `${h.days.join(",")} ${h.opens}-${h.closes}`,
                      )
                      .join(" ")}
                  >
                    {i18n.hoursValue}
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={mapsLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-[#5b6740] px-9 py-4 text-[11px] uppercase tracking-[0.32em] text-white transition-colors hover:bg-[#4a5530]"
            >
              <MapPin className="h-4 w-4" />
              {i18n.directionsLabel}
            </a>
          </div>

          {/* Embedded Google Map */}
          <div className="relative overflow-hidden rounded-none border border-border/60 bg-muted shadow-2xl shadow-foreground/10">
            <div
              className="relative w-full"
              style={{ aspectRatio: "4 / 5" }}
            >
              <iframe
                src={mapsEmbedUrl}
                title={`${siteConfig.name} — ${address.locality}, ${address.countryName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden geo coords for additional microformat coverage */}
      <span
        itemProp="geo"
        itemScope
        itemType="https://schema.org/GeoCoordinates"
        className="sr-only"
      >
        <meta itemProp="latitude" content={String(geo.latitude)} />
        <meta itemProp="longitude" content={String(geo.longitude)} />
      </span>
    </section>
  );
}