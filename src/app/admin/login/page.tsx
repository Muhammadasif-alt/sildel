import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import { AdminLoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  // Already logged in? Bounce to dashboard.
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl tracking-wide text-foreground">Sildel</h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            Admin · Sign in
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
