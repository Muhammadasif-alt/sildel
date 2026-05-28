"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Check, Loader2, Mail, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { home, type HomeContent } from "@/content/home";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter({ data: dataProp }: { data?: HomeContent["newsletter"] } = {}) {
  const data = dataProp ?? home.newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement)
      ?.value;
    if (honeypot) return;

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg(data.errorMessage);
      return;
    }

    setStatus("loading");
    setErrorMsg(null);
    try {
      // TODO: wire to real API route (e.g. /api/newsletter)
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="newsletter"
      className="relative w-full overflow-hidden bg-muted/30 border-t border-border/60 py-24 lg:py-32"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="overflow-hidden rounded-none border border-border/70 bg-card shadow-2xl shadow-foreground/10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
            {/* Left — atmospheric atelier image */}
            <div className="relative min-h-[340px] lg:min-h-[560px]">
              <Image
                src="/Slidel/Nano Banana 2 - Wide cinematic shot of a Portuguese atelier interior at golden hour_ warm sunlight s.webp"
                alt="Sildel atelier interior at golden hour."
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-foreground/55 via-foreground/15 to-transparent"
              />
              {/* Badge */}
              <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-card/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur-sm">
                <Mail className="h-3 w-3 text-primary" aria-hidden />
                The Atelier Letter
              </span>
              {/* Quote at bottom */}
              <figure className="absolute bottom-8 left-8 right-8 text-background">
                <blockquote className="font-serif text-2xl font-light italic leading-[1.2] md:text-3xl">
                  &ldquo;A quiet letter from the atelier — once a month, never more.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[10px] uppercase tracking-[0.3em] text-background/75">
                  — Sildel Atelier
                </figcaption>
              </figure>
            </div>

            {/* Right — content + form */}
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-primary">
                <span className="h-px w-8 bg-primary/60" aria-hidden />
                {data.eyebrow}
              </p>

              <h2
                id="newsletter-heading"
                className="font-serif text-3xl font-light leading-[1.05] text-foreground md:text-4xl lg:text-5xl"
              >
                {data.title}{" "}
                <span className="italic text-primary">{data.titleAccent}</span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {data.body}
              </p>

              {/* Perks */}
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Calendar, label: "Once a month" },
                  { icon: ShieldCheck, label: "No spam, ever" },
                  { icon: Mail, label: "Unsubscribe anytime" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                {status === "success" ? (
                  <SuccessState
                    title={data.successTitle}
                    body={data.successBody}
                  />
                ) : (
                  <form
                    onSubmit={onSubmit}
                    noValidate
                    aria-describedby="newsletter-help"
                  >
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden
                    />

                    <div
                      className={cn(
                        "group relative flex items-stretch overflow-hidden rounded-sm border bg-background transition-colors",
                        status === "error"
                          ? "border-destructive focus-within:border-destructive"
                          : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                      )}
                    >
                      <span
                        className="pointer-events-none flex items-center pl-4 text-primary"
                        aria-hidden
                      >
                        <Mail className="h-4 w-4" />
                      </span>

                      <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") {
                            setStatus("idle");
                            setErrorMsg(null);
                          }
                        }}
                        disabled={status === "loading"}
                        placeholder={data.placeholder}
                        autoComplete="email"
                        inputMode="email"
                        className="flex-1 bg-transparent px-3 py-4 text-base outline-none placeholder:text-muted-foreground disabled:opacity-60"
                        aria-invalid={status === "error"}
                        aria-errormessage={
                          status === "error" ? "newsletter-error" : undefined
                        }
                      />

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className={cn(
                          "shrink-0 inline-flex items-center justify-center gap-2",
                          "bg-primary text-primary-foreground",
                          "px-6 py-4 text-xs tracking-[0.3em] uppercase font-medium",
                          "transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30",
                          "disabled:opacity-70 disabled:cursor-not-allowed",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        )}
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>{data.loadingLabel}</span>
                          </>
                        ) : (
                          <>
                            <span>{data.cta}</span>
                            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                          </>
                        )}
                      </button>
                    </div>

                    {status === "error" && errorMsg && (
                      <p
                        id="newsletter-error"
                        role="alert"
                        className="mt-3 text-sm text-destructive"
                      >
                        {errorMsg}
                      </p>
                    )}

                    <p
                      id="newsletter-help"
                      className="mt-5 text-[11px] tracking-wider text-muted-foreground"
                    >
                      {data.privacyNote}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessState({ title, body }: { title: string; body: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-start gap-4"
    >
      <span
        aria-hidden
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary"
      >
        <Check className="h-6 w-6" strokeWidth={2.5} />
      </span>
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
