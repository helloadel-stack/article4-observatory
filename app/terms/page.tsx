"use client";

import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";
import { DEFAULT_LANG } from "@/src/config/constants";
import { termsCopy } from "@/src/i18n/legal";
import { useSyncedLang } from "@/src/lib/useSyncedLang";

export default function TermsPage() {
  const [lang, handleLangChange] = useSyncedLang(DEFAULT_LANG);
  const t = termsCopy[lang];

  return (
    <LegalPageShell
      lang={lang}
      onLangChange={handleLangChange}
      title={t.title}
      subtitle={t.subtitle}
      backLabel={t.backLabel}
      langLabel={t.langLabel}
    >
      <LegalSection title={t.storeTitle}>
        <p>{t.storeBody}</p>
      </LegalSection>

      <LegalSection title={t.productsTitle}>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t.tier0}</li>
          <li>{t.tier1}</li>
          <li>{t.tier2}</li>
          <li>{t.tier3}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t.artifactsTitle}>
        <p>{t.artifactsBody}</p>
      </LegalSection>

      <LegalSection title={t.fulfillmentTitle}>
        <p>{t.fulfillmentBody}</p>
      </LegalSection>

      <LegalSection title={t.refundTitle}>
        <p>{t.refundBody}</p>
      </LegalSection>

      <LegalSection title={t.ipTitle}>
        <p>{t.ipBody}</p>
      </LegalSection>
    </LegalPageShell>
  );
}
