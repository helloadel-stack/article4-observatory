"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  ATELIERS_JURIDIQUES,
  BOUCLIER_PUBLIC,
  SITE_CONFIG,
  type Lang,
} from "@/src/config/constants";
import type { TranslationDict } from "@/src/i18n/translations";
import { getLocaleMessages } from "@/src/locales";

const linkClass =
  "inline-flex items-center gap-1.5 font-medium text-slate-800 transition-colors hover:text-indigo-700 hover:underline";

type FooterProps = {
  t: TranslationDict;
  lang: Lang;
};

export default function Footer({ t, lang }: FooterProps) {
  const l = getLocaleMessages(lang);
  const regulatoryItems = [
    l.footer.regEu,
    l.footer.regIso,
    l.footer.regQuebec,
    l.footer.regFrance,
  ];

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {SITE_CONFIG.name}
            </p>
            <span className="mt-2 inline-flex w-fit items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-700 ring-1 ring-inset ring-indigo-200">
              {SITE_CONFIG.legalEntity}
            </span>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
              {l.footer.mission}
            </p>
          </div>

          <nav aria-labelledby="footer-ecosystem-heading">
            <h2
              id="footer-ecosystem-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              {l.footer.ecosystemHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.ecosystem.assuranceLab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {l.footer.safeAi}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.ecosystem.ledgerVerify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {l.footer.waqfLedger}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </a>
              </li>
              <li>
                <Link href={BOUCLIER_PUBLIC.path} className={linkClass}>
                  {l.footer.bouclier}
                </Link>
              </li>
              <li>
                <Link href={ATELIERS_JURIDIQUES.path} className={linkClass}>
                  {l.footer.ateliers}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-regulatory-heading">
            <h2
              id="footer-regulatory-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              {l.footer.regulatoryHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {regulatoryItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal-heading">
            <h2
              id="footer-legal-heading"
              className="text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              {l.footer.legalHeading}
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              {l.footer.morNotice}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/legal" className={linkClass}>
                  {t.footerLegalHub}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t.footerPrivacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  {t.footerTerms}
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className={linkClass}>
                  {t.footerGdpr}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-600">{l.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
