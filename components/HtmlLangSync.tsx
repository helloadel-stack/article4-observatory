"use client";

import { useEffect } from "react";
import { LANG_TO_HTML, type Lang } from "@/src/config/constants";

/** Binds `<html lang>` dynamically for EN / FR / ES (LTR only). */
export default function HtmlLangSync({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = LANG_TO_HTML[lang];
    document.documentElement.removeAttribute("dir");
  }, [lang]);

  return null;
}
