"use client";

import Link from "next/link";
import { ExternalLink, PlusCircle } from "lucide-react";
import {
  BRAND,
  SITE_CONFIG,
  SUPPORTED_LANGS,
  type Lang,
} from "@/src/config/constants";
import type { TranslationDict } from "@/src/i18n/translations";
import { getLocaleMessages } from "@/src/locales";

function LinkedInIcon({
  className,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export type HeaderNavLink = {
  href: string;
  label: string;
  route?: boolean;
};

type HeaderProps = {
  t: TranslationDict;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  navLinks: HeaderNavLink[];
  onSubmit: () => void;
};

export default function Header({
  t,
  lang,
  onLangChange,
  navLinks,
  onSubmit,
}: HeaderProps) {
  const l = getLocaleMessages(lang);

  return (
    <>
      <div className="bg-indigo-950 text-indigo-50">
        <p className="mx-auto max-w-7xl px-4 py-2.5 text-center text-xs font-medium leading-relaxed tracking-wide sm:px-6 sm:text-sm lg:px-8">
          {t.announcement}
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a href="#" className="group flex min-w-0 flex-col gap-1">
            <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {SITE_CONFIG.name}
            </span>
            <span className="inline-flex w-fit items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-700 ring-1 ring-inset ring-indigo-200">
              {l.header.legalBadge}
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600"
          >
            {navLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium text-slate-500 transition-colors hover:text-indigo-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:text-sm"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-indigo-700 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <a
              href={SITE_CONFIG.ecosystem.assuranceLab}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-800"
            >
              {l.header.verifiaLab}
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
            </a>
            <a
              href={SITE_CONFIG.ecosystem.ledgerVerify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-800"
            >
              {l.header.verifiaLedger}
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
            </a>
            <span className="inline-flex max-w-[11rem] rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium leading-tight text-slate-600 sm:max-w-none">
              {l.header.llcNotice}
            </span>
            <div
              role="group"
              aria-label={t.langToggleLabel}
              className="inline-flex shrink-0 rounded-lg border border-slate-200 bg-slate-100 p-1"
            >
              {SUPPORTED_LANGS.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onLangChange(code)}
                  className={
                    lang === code
                      ? "rounded-md bg-indigo-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
                      : "rounded-md px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-white hover:text-indigo-800"
                  }
                  aria-pressed={lang === code}
                >
                  {code}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <PlusCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {t.submitData}
            </button>
            <a
              href={BRAND.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              aria-label={t.connectLinkedIn}
            >
              <LinkedInIcon className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
