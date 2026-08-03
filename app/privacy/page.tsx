"use client";

import { useState } from "react";
import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";
import { DEFAULT_LANG, SITE_METADATA, type Lang } from "@/src/config/constants";
import { privacyCopy } from "@/src/i18n/legal";

export default function PrivacyPage() {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const t = privacyCopy[lang];

  return (
    <LegalPageShell
      lang={lang}
      onLangChange={setLang}
      title={t.title}
      subtitle={t.subtitle}
      backLabel={t.backLabel}
      langLabel={t.langLabel}
    >
      <LegalSection title={t.controllerTitle}>
        <p>{t.controllerBody}</p>
        <p>
          <a
            href={`mailto:${SITE_METADATA.privacyEmail}`}
            className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
          >
            {SITE_METADATA.privacyEmail}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t.processorTitle}>
        <p>{t.processorBody}</p>
      </LegalSection>

      <LegalSection title={t.piiTitle}>
        <p>{t.piiBody}</p>
      </LegalSection>

      <LegalSection title={t.cookiesTitle}>
        <p>{t.cookiesBody}</p>
      </LegalSection>

      <LegalSection title={t.contactTitle}>
        <p>{t.contactBody}</p>
      </LegalSection>
    </LegalPageShell>
  );
}
