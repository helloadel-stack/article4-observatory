import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Geo-location language targeting + NEXT_LOCALE cookie persistence.
 * Next.js 16+: request interception lives in proxy.ts (middleware.ts is deprecated).
 *
 * Priority:
 * 1. Existing NEXT_LOCALE cookie (FR | EN | ES)
 * 2. Geo-IP headers (Francophone countries → FR)
 * 3. Accept-Language (es → ES, en → EN, else FR)
 */

const FRANCOPHONE_COUNTRIES = [
  "FR",
  "BE",
  "CH",
  "CA",
  "MA",
  "DZ",
  "TN",
  "LU",
  "MC",
  "CI",
  "SN",
] as const;

const SUPPORTED_LOCALES = ["FR", "EN", "ES"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Respect existing user preference cookie
  const existingCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (existingCookie && isSupportedLocale(existingCookie)) {
    return response;
  }

  // 2. Detect via Geo-IP headers (Vercel, Cloudflare, generic)
  const country = (
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country") ||
    ""
  ).toUpperCase();

  let targetLocale: Locale = "FR"; // French as ultimate default

  if (
    (FRANCOPHONE_COUNTRIES as readonly string[]).includes(country)
  ) {
    targetLocale = "FR";
  } else {
    // 3. Detect via Accept-Language header
    const acceptLang = (
      request.headers.get("accept-language") || ""
    ).toLowerCase();

    if (acceptLang.startsWith("es")) {
      targetLocale = "ES";
    } else if (acceptLang.startsWith("en")) {
      targetLocale = "EN";
    } else {
      // fr-* and all other tags fall back to French
      targetLocale = "FR";
    }
  }

  // Persist preference for 1 year
  response.cookies.set("NEXT_LOCALE", targetLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
