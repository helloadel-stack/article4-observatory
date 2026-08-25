"use client";

import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";
import { DEFAULT_LANG, SITE_METADATA } from "@/src/config/constants";
import { privacyCopy } from "@/src/i18n/legal";
import { useSyncedLang } from "@/src/lib/useSyncedLang";

export default function PrivacyPage() {
  const [lang, handleLangChange] = useSyncedLang(DEFAULT_LANG);
  const t = privacyCopy[lang];

  return (
    <LegalPageShell
      lang={lang}
      onLangChange={handleLangChange}
      title={t.title}
      subtitle={t.subtitle}
      backLabel={t.backLabel}
      langLabel={t.langLabel}
    >
      <LegalSection title={t.controllerTitle}>
        <p>{t.controllerBody}</p>
        <p>
          <a
            href={`mailto:${SITE_METADATA.contactEmail}`}
            className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
          >
            {SITE_METADATA.contactEmail}
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

      <LegalSection title={t.transatlanticTitle}>
        <p>{t.transatlanticBody}</p>
      </LegalSection>

      <LegalSection title={t.contactTitle}>
        <p>{t.contactBody}</p>
      </LegalSection>
    </LegalPageShell>
  );
}
