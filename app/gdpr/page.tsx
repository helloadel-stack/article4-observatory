"use client";

import { useState } from "react";
import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";
import {
  BRAND,
  DEFAULT_LANG,
  SITE_METADATA,
  type Lang,
} from "@/src/config/constants";
import { gdprCopy } from "@/src/i18n/legal";

export default function GdprPage() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = gdprCopy[lang];

  return (
    <LegalPageShell
      lang={lang}
      onLangChange={setLang}
      title={t.title}
      subtitle={t.subtitle}
      backLabel={t.backLabel}
      langLabel={t.langLabel}
    >
      <LegalSection title={t.rightsTitle}>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t.rightsAccess}</li>
          <li>{t.rightsRectification}</li>
          <li>{t.rightsErasure}</li>
          <li>{t.rightsPortability}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t.cryptoTitle}>
        <p>{t.cryptoBody}</p>
        <p>
          <a
            href={BRAND.waqfLedgerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
          >
            waqfledger.tech
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t.dpoTitle}>
        <p>{t.dpoBody}</p>
        <p>
          <a
            href={`mailto:${SITE_METADATA.dpoEmail}`}
            className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
          >
            {SITE_METADATA.dpoEmail}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
