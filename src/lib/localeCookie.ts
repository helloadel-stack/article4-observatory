/**
 * Client-side NEXT_LOCALE cookie sync with proxy.ts geo targeting.
 */

import {
  DEFAULT_LANG,
  SUPPORTED_LANGS,
  type Lang,
} from "@/src/config/constants";

const COOKIE_NAME = "NEXT_LOCALE";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function isLang(value: string): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/** Read NEXT_LOCALE from document.cookie (browser only). */
export function readLocaleCookie(): Lang | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (!part.startsWith(`${COOKIE_NAME}=`)) continue;
    const value = decodeURIComponent(part.slice(COOKIE_NAME.length + 1));
    if (isLang(value)) return value;
  }
  return null;
}

/** Persist user language preference (mirrors proxy.ts maxAge / path / sameSite). */
export function writeLocaleCookie(lang: Lang): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(lang)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

/** Initial client lang: cookie if present, else DEFAULT_LANG (FR). */
export function resolveInitialLang(): Lang {
  return readLocaleCookie() ?? DEFAULT_LANG;
}
