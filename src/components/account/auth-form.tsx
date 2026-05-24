"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import type { AuthFormState } from "@/app/account/actions";

type Mode = "login" | "register";

type Props = {
  mode: Mode;
  action: (prev: AuthFormState, formData: FormData) => Promise<AuthFormState>;
};

const INITIAL: AuthFormState = { ok: false };

export function AuthForm({ mode, action }: Props) {
  const [state, formAction] = useActionState(action, INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const isRegister = mode === "register";

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {isRegister && (
        <Field
          id="name"
          name="name"
          label="Full name"
          type="text"
          autoComplete="name"
          required
          icon={<User className="h-4 w-4" />}
          placeholder="Isabel Silva"
        />
      )}

      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        icon={<Mail className="h-4 w-4" />}
        placeholder="you@sildel.pt"
      />

      <div>
        <Field
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          minLength={isRegister ? 8 : undefined}
          icon={<Lock className="h-4 w-4" />}
          placeholder={isRegister ? "Min. 8 characters" : "••••••••"}
          trailing={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />
        {isRegister && (
          <p className="mt-2 text-[11px] tracking-wider text-muted-foreground">
            Use 8+ characters with a mix of letters and numbers.
          </p>
        )}
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      <SubmitButton label={isRegister ? "Create account" : "Sign in"} />
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
  minLength,
  icon,
  trailing,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
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
          minLength={minLength}
          placeholder={placeholder}
          className="block w-full rounded-sm border border-border bg-background px-4 py-3 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {trailing && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-xs font-medium uppercase tracking-[0.35em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Please wait…
        </>
      ) : (
        label
      )}
    </button>
  );
}
