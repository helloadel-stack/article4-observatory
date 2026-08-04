"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LANG, type Lang } from "@/src/config/constants";
import {
  readLocaleCookie,
  writeLocaleCookie,
} from "@/src/lib/localeCookie";

/**
 * Client language state synced with NEXT_LOCALE (set by proxy.ts geo targeting).
 * Cookie read is deferred so it does not trigger cascading render lint on mount.
 */
export function useSyncedLang(
  initial: Lang = DEFAULT_LANG,
): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const fromCookie = readLocaleCookie();
      if (fromCookie) setLang(fromCookie);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setLangAndCookie = (next: Lang) => {
    setLang(next);
    writeLocaleCookie(next);
  };

  return [lang, setLangAndCookie];
}
