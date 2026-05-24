"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  AtSign,
  Check,
  ChevronDown,
  Loader2,
  MessageSquare,
  Phone,
  Send,
  Tag,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/(marketing)/contact/actions";

const TOPICS = [
  { value: "general", label: "General enquiry" },
  { value: "commission", label: "Commission a piece" },
  { value: "visit", label: "Visit the atelier" },
  { value: "press", label: "Press & media" },
  { value: "wholesale", label: "Wholesale" },
  { value: "other", label: "Other" },
];

const INITIAL: ContactFormState = { ok: false };

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, INITIAL);

  if (state.ok && state.message) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-sm border border-primary/40 bg-primary/5 p-8"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <h3 className="font-serif text-2xl text-foreground">Message received.</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label="Full name"
          type="text"
          autoComplete="name"
          required
          icon={<User className="h-4 w-4" />}
          placeholder="Isabel Silva"
        />
        <Field
          id="contact-email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          icon={<AtSign className="h-4 w-4" />}
          placeholder="you@sildel.pt"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="contact-phone"
          name="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          icon={<Phone className="h-4 w-4" />}
          placeholder="+351 …"
        />
        <TopicSelect />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          Message
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-4 text-primary">
            <MessageSquare className="h-4 w-4" />
          </span>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            rows={6}
            placeholder="Tell us about your enquiry, commission, or visit…"
            className="block w-full resize-y rounded-sm border border-border bg-background px-4 py-3 pl-11 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {state.message && !state.ok && (
        <p
          role="alert"
          className="rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.message}
        </p>
      )}

      <p className="text-[11px] tracking-wider text-muted-foreground">
        We respect your inbox. We reply within two working days.
      </p>

      <SubmitButton />
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type,
  autoComplete,
  required,
  icon,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-sm border border-border bg-background px-4 py-3 pl-11 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

function TopicSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(TOPICS[0].value);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selected = TOPICS.find((t) => t.value === value) ?? TOPICS[0];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Sync highlight to selected when opening
  useEffect(() => {
    if (open) {
      const i = TOPICS.findIndex((t) => t.value === value);
      setHighlight(i >= 0 ? i : 0);
    }
  }, [open, value]);

  function select(i: number) {
    setValue(TOPICS[i].value);
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setHighlight((h) => (h + 1) % TOPICS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      else setHighlight((h) => (h - 1 + TOPICS.length) % TOPICS.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) setOpen(true);
      else select(highlight);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div>
      <label
        htmlFor={listboxId}
        className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Topic
      </label>
      <div ref={containerRef} className="relative">
        {/* Hidden native input — submits the value with the form */}
        <input type="hidden" name="topic" value={value} />

        <button
          id={listboxId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${listboxId}-list`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKey}
          className={cn(
            "group relative flex w-full items-center justify-between gap-3 rounded-sm border bg-background px-4 py-3 pl-11 text-left text-sm text-foreground outline-none transition-colors",
            open
              ? "border-primary ring-2 ring-primary/20"
              : "border-border hover:border-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          )}
        >
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <Tag className="h-4 w-4" />
          </span>
          <span className="truncate">{selected.label}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180 text-primary",
            )}
            strokeWidth={1.5}
          />
        </button>

        {/* Dropdown panel */}
        {open && (
          <ul
            id={`${listboxId}-list`}
            role="listbox"
            aria-label="Topic"
            tabIndex={-1}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-sm border border-border bg-card shadow-xl shadow-foreground/10"
          >
            {TOPICS.map((t, i) => {
              const isSelected = t.value === value;
              const isHighlighted = i === highlight;
              return (
                <li
                  key={t.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => {
                    e.preventDefault(); // keep focus on the button
                    select(i);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-medium transition-colors",
                    isHighlighted
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full transition-colors",
                        isHighlighted
                          ? "bg-primary-foreground"
                          : isSelected
                            ? "bg-primary"
                            : "bg-border",
                      )}
                    />
                    {t.label}
                  </span>
                  {isSelected && (
                    <Check
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isHighlighted ? "text-primary-foreground" : "text-primary",
                      )}
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 inline-flex items-center justify-center gap-3 self-start rounded-sm bg-primary px-7 py-4 text-xs font-medium uppercase tracking-[0.35em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Send message
        </>
      )}
    </button>
  );
}
