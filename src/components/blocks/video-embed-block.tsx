import type { Block, Locale } from "@/lib/blocks/types";
import { loc, str, renderParagraphs, videoEmbedUrl } from "./block-utils";

export function VideoEmbedBlock({ block, locale }: { block: Block; locale: Locale }) {
  const heading = loc(block, "heading", locale);
  const body = loc(block, "body", locale);
  const url = str(block, "videoUrl");
  const poster = str(block, "poster");
  const v = url ? videoEmbedUrl(url) : null;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 lg:px-10">
        {(heading || body) && (
          <div className="mb-8 max-w-3xl">
            {heading && (
              <h2 className="font-serif text-3xl text-foreground md:text-4xl">{heading}</h2>
            )}
            {body && (
              <div className="mt-4 space-y-3 text-base text-muted-foreground md:text-lg">
                {renderParagraphs(body)}
              </div>
            )}
          </div>
        )}

        <div className="aspect-video overflow-hidden rounded-none bg-muted">
          {v?.kind === "youtube" || v?.kind === "vimeo" ? (
            <iframe
              src={v.src}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={heading || "Video"}
            />
          ) : v?.kind === "file" ? (
            <video src={v.src} poster={poster || undefined} controls className="h-full w-full object-cover" />
          ) : poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={heading} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No video URL set
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
