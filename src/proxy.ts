/**
 * Next.js 16 proxy (renamed from middleware). Runs before every request.
 *
 * We use it to expose the request pathname to server components via the
 * `x-sildel-pathname` request header. Server layouts/pages read it with
 * `(await headers()).get('x-sildel-pathname')` to decide what to render
 * (e.g. hide the public site chrome on /admin routes).
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-sildel-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Skip Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:webp|png|jpg|svg|ico)).*)"],
};
