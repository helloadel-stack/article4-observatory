"use client";

import Link from "next/link";
import LegalPageShell, { LegalSection } from "@/components/LegalPageShell";
import {
  A4I_NEXUS_PILLARS,
  DEFAULT_LANG,
  SITE_CONFIG,
} from "@/src/config/constants";
import { legalHubCopy } from "@/src/i18n/legal";
import { localeMessages } from "@/src/locales";
import { useSyncedLang } from "@/src/lib/useSyncedLang";

export default function LegalPage() {
  const [lang, handleLangChange] = useSyncedLang(DEFAULT_LANG);
  const t = legalHubCopy[lang];

  return (
    <LegalPageShell
      lang={lang}
      onLangChange={handleLangChange}
      title={t.title}
      subtitle={t.subtitle}
      backLabel={t.backLabel}
      langLabel={t.langLabel}
    >
      <LegalSection title={t.identityTitle}>
        <p>{t.identityBody}</p>
      </LegalSection>

      <LegalSection title={t.roleTitle}>
        <p>{t.roleBody}</p>
        <p>{localeMessages[lang].legal.entityNotice}</p>
      </LegalSection>

      <LegalSection title={t.artifactsTitle}>
        <p>{t.artifactsBody}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t.artifactsAttestation}</li>
          <li>{t.artifactsMaturity}</li>
          <li>{t.artifactsPassport}</li>
        </ul>
        <p className="text-slate-400">{t.artifactsGuardrail}</p>
      </LegalSection>

      <LegalSection title={t.nexusTitle}>
        <ul className="list-disc space-y-3 pl-5">
          {A4I_NEXUS_PILLARS.map((pillar) => (
            <li key={pillar.key}>
              <span className="font-semibold text-white">
                {pillar.title[lang]}
              </span>
              {" — "}
              {pillar.body[lang]}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title={t.mappingTitle}>
        <p>
          <span className="font-semibold text-white">{t.franceTitle}.</span>{" "}
          {t.franceBody}
        </p>
        <p>
          <span className="font-semibold text-white">{t.quebecTitle}.</span>{" "}
          {t.quebecBody}
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {SITE_CONFIG.regulatoryStandards.map((standard) => (
            <li key={standard}>{standard}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title={t.pagesTitle}>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link
              href="/privacy"
              className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
            >
              {t.pagesPrivacy}
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
            >
              {t.pagesTerms}
            </Link>
          </li>
          <li>
            <Link
              href="/gdpr"
              className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
            >
              {t.pagesGdpr}
            </Link>
          </li>
        </ul>
      </LegalSection>
    </LegalPageShell>
  );
}
