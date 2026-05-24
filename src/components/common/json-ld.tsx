import Script from "next/script";

/**
 * Renders one or more JSON-LD structured-data blocks via next/script.
 * Server component — emitted as inline payload, executed after interactive.
 */
export function JsonLd({ data, idPrefix = "jsonld" }: { data: object | object[]; idPrefix?: string }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <Script
          key={i}
          id={`${idPrefix}-${i}`}
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(item)}
        </Script>
      ))}
    </>
  );
}
