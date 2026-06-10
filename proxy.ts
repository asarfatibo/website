import { NextRequest, NextResponse } from "next/server";

// Root-only locale redirect: "/" → /fr (default) or /en when the browser
// clearly prefers English. All other routes are statically generated under
// /fr and /en.
export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const prefersEnglish = /^en\b/i.test(acceptLanguage.split(",")[0] ?? "");
  const locale = prefersEnglish ? "en" : "fr";
  return NextResponse.redirect(new URL(`/${locale}`, request.url), 308);
}

export const config = {
  matcher: "/",
};
