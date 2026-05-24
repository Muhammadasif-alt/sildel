"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Truck, ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  clearCart,
  selectCartHydrated,
  selectCartItems,
  selectCartSubtotalCents,
} from "@/lib/store/cart-slice";
import { formatPrice } from "@/content/treasures";
import { cn } from "@/lib/utils";
import { getUi } from "@/lib/i18n/ui";
import type { Locale } from "@/lib/i18n/config";

type PaymentMethod = "paypal" | "multibanco" | "cod";

const COUNTRIES = [
  "Portugal",
  "Spain",
  "France",
  "Germany",
  "Italy",
  "Netherlands",
  "Belgium",
  "United Kingdom",
  "Ireland",
  "Switzerland",
  "Sweden",
  "Norway",
  "Denmark",
  "United States",
  "Canada",
  "Australia",
  "Brazil",
  "Other",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutPageClient({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotalCents);
  const hydrated = useAppSelector(selectCartHydrated);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!hydrated) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-32">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
          {ui.common.loading}
        </p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">
          {ui.checkout.title}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
          {ui.checkout.emptyCart.title}
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          {ui.checkout.emptyCart.body}
        </p>
        <Link
          href="/treasures"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 py-4 text-xs tracking-[0.35em] uppercase font-medium rounded-sm hover:bg-primary/90 transition-colors"
        >
          {ui.cart.emptyCta}
        </Link>
      </main>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const required: [string, string][] = [
      ["firstName", ui.checkout.fields.firstName],
      ["lastName", ui.checkout.fields.lastName],
      ["country", ui.checkout.fields.country],
      ["street", ui.checkout.fields.street],
      ["city", ui.checkout.fields.city],
      ["postcode", ui.checkout.fields.postcode],
      ["phone", ui.checkout.fields.phone],
      ["email", ui.checkout.fields.email],
    ];
    const next: Record<string, string> = {};
    for (const [field, label] of required) {
      const value = String(fd.get(field) ?? "").trim();
      if (!value) next[field] = ui.checkout.validation.required(label);
    }
    const email = String(fd.get("email") ?? "").trim();
    if (email && !EMAIL_RE.test(email)) {
      next.email = ui.checkout.validation.invalidEmail;
    }
    if (!acceptedTerms) {
      next.terms = ui.checkout.validation.mustAgreeTerms;
    }

    if (Object.keys(next).length > 0) {
      setErrors(next);
      const firstField = Object.keys(next)[0];
      document
        .getElementById(firstField)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 1200));
    const orderNumber = `SD-${Date.now().toString(36).toUpperCase()}`;
    try {
      sessionStorage.setItem(
        "sildel-last-order",
        JSON.stringify({
          orderNumber,
          email,
          totalCents: subtotal,
          paymentMethod,
          placedAt: new Date().toISOString(),
        })
      );
    } catch {}
    dispatch(clearCart());
    router.push(`/checkout/success?order=${orderNumber}`);
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-12 py-12 lg:py-20">
        <div className="mb-10 lg:mb-14">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {ui.checkout.backToCart}
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            {ui.checkout.title}
          </h1>
        </div>

        <div className="mb-10 inline-flex items-center gap-3 rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <span className="inline-block size-1.5 rounded-full bg-primary" aria-hidden />
          {ui.checkout.couponHint}
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <fieldset className="border-0 p-0 m-0">
              <legend className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                {ui.checkout.billingDetails}
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="firstName" name="firstName" label={ui.checkout.fields.firstName} required error={errors.firstName} autoComplete="given-name" />
                <Field id="lastName" name="lastName" label={ui.checkout.fields.lastName} required error={errors.lastName} autoComplete="family-name" />
                <Field id="company" name="company" label={ui.checkout.fields.company} autoComplete="organization" className="sm:col-span-2" />

                <div className="sm:col-span-2">
                  <Label htmlFor="country" required>
                    {ui.checkout.fields.country}
                  </Label>
                  <select
                    id="country"
                    name="country"
                    defaultValue="Portugal"
                    required
                    autoComplete="country-name"
                    className={cn(
                      "block w-full px-4 py-3 rounded-sm border bg-background text-base focus:border-primary focus:outline-none transition-colors",
                      errors.country ? "border-destructive" : "border-border"
                    )}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.country && <ErrorText>{errors.country}</ErrorText>}
                </div>

                <Field id="street" name="street" label={ui.checkout.fields.street} required error={errors.street} autoComplete="address-line1" className="sm:col-span-2" />
                <Field id="apt" name="apt" label={ui.checkout.fields.apt} autoComplete="address-line2" className="sm:col-span-2" />
                <Field id="city" name="city" label={ui.checkout.fields.city} required error={errors.city} autoComplete="address-level2" />
                <Field id="postcode" name="postcode" label={ui.checkout.fields.postcode} required error={errors.postcode} autoComplete="postal-code" />
                <Field id="phone" name="phone" label={ui.checkout.fields.phone} required error={errors.phone} type="tel" autoComplete="tel" />
                <Field id="email" name="email" label={ui.checkout.fields.email} required error={errors.email} type="email" autoComplete="email" />

                <div className="sm:col-span-2">
                  <Label htmlFor="orderNotes">{ui.checkout.fields.orderNotes}</Label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    rows={4}
                    placeholder={ui.checkout.fields.orderNotesPlaceholder}
                    className="block w-full px-4 py-3 rounded-sm border border-border bg-background text-base placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-y"
                  />
                </div>
              </div>
            </fieldset>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-sm border border-border bg-card p-6 lg:p-8">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                {ui.checkout.yourOrder}
              </h2>

              <ul className="space-y-3 mb-6 pb-6 border-b border-border">
                {items.map((it) => (
                  <li key={it.slug} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-muted">
                      <Image src={it.image} alt={it.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif text-base text-foreground truncate">{it.name}</p>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                          × {it.quantity}
                        </p>
                      </div>
                      <span className="font-serif text-sm text-foreground tabular-nums">
                        {formatPrice(it.priceCents * it.quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">{ui.checkout.summary.subtotal}</dt>
                  <dd className="font-serif text-base text-foreground">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 text-sm">
                  <dt className="text-muted-foreground inline-flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {ui.checkout.summary.shipment}
                  </dt>
                  <dd className="text-right">
                    <span className="font-medium text-primary">
                      {ui.checkout.summary.freeShipping}
                    </span>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {ui.checkout.summary.shippingNote}
                    </p>
                  </dd>
                </div>
              </dl>

              <div className="flex items-baseline justify-between mb-8">
                <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  {ui.checkout.summary.total}
                </span>
                <span className="font-serif text-3xl text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {ui.checkout.paymentSectionTitle}
                </h3>
                <div className="space-y-2" role="radiogroup" aria-label={ui.checkout.paymentSectionTitle}>
                  <PaymentOption
                    id="pm-paypal"
                    value="paypal"
                    label={ui.checkout.payment.paypal.label}
                    description={ui.checkout.payment.paypal.description}
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <PaymentOption
                    id="pm-multibanco"
                    value="multibanco"
                    label={ui.checkout.payment.multibanco.label}
                    description={ui.checkout.payment.multibanco.description}
                    checked={paymentMethod === "multibanco"}
                    onChange={() => setPaymentMethod("multibanco")}
                  />
                  <PaymentOption
                    id="pm-cod"
                    value="cod"
                    label={ui.checkout.payment.cod.label}
                    description={ui.checkout.payment.cod.description}
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {ui.checkout.privacyNotice.before}
                <Link href="/privacy" className="text-primary hover:underline">
                  {ui.checkout.privacyNotice.link}
                </Link>
                {ui.checkout.privacyNotice.after}
              </p>

              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-primary cursor-pointer"
                  aria-invalid={!!errors.terms}
                />
                <span className="text-sm text-foreground leading-relaxed">
                  {ui.checkout.termsLabel.before}
                  <Link href="/terms" className="text-primary hover:underline">
                    {ui.checkout.termsLabel.link}
                  </Link>
                  <span className="text-destructive ml-0.5" aria-hidden>*</span>
                </span>
              </label>
              {errors.terms && <ErrorText>{errors.terms}</ErrorText>}

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "group w-full inline-flex items-center justify-center gap-2 px-6 py-4",
                  "rounded-sm text-xs tracking-[0.35em] uppercase font-medium",
                  "bg-primary text-primary-foreground transition-colors hover:bg-primary/90",
                  "disabled:opacity-70 disabled:cursor-not-allowed",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {ui.checkout.placingOrder}
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    {ui.checkout.placeOrderLabel(formatPrice(subtotal))}
                  </>
                )}
              </button>

              <p className="mt-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground text-center">
                {ui.checkout.demoNote}
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-[11px] tracking-[0.25em] uppercase text-foreground/80"
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1 text-sm text-destructive">
      {children}
    </p>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
};

function Field({
  id,
  name,
  label,
  required,
  type = "text",
  autoComplete,
  error,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={cn(
          "block w-full px-4 py-3 rounded-sm border bg-background text-base focus:border-primary focus:outline-none transition-colors",
          error ? "border-destructive" : "border-border"
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function PaymentOption({
  id,
  value,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  value: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "block cursor-pointer rounded-sm border p-4 transition-colors",
        checked
          ? "border-primary bg-primary/5"
          : "border-border bg-background hover:border-primary/50"
      )}
    >
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="radio"
          name="payment-method"
          value={value}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 accent-primary cursor-pointer"
        />
        <span className="font-serif text-lg text-foreground">{label}</span>
      </div>
      {checked && (
        <p className="mt-2 ml-7 text-xs text-muted-foreground">{description}</p>
      )}
    </label>
  );
}
