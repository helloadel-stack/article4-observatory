"use client";

import { useState } from "react";
import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";
import { type Lang } from "@/src/config/constants";
import { termsCopy } from "@/src/i18n/legal";

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>("EN");
  const t = termsCopy[lang];

  return (
    <LegalPageShell
      lang={lang}
      onLangChange={setLang}
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
