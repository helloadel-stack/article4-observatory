"use client";

import Link from "next/link";
import {
  BRAND,
  SUPPORTED_LANGS,
  type Lang,
} from "@/src/config/constants";
import HtmlLangSync from "@/components/HtmlLangSync";

type LegalPageShellProps = {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  title: string;
  subtitle: string;
  backLabel: string;
  langLabel: string;
  children: React.ReactNode;
};

export default function LegalPageShell({
  lang,
  onLangChange,
  title,
  subtitle,
  backLabel,
  langLabel,
  children,
}: LegalPageShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-100">
      <HtmlLangSync lang={lang} />

      <div className="border-b border-slate-800 bg-indigo-950/80">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              {BRAND.shortName}
            </p>
            <p className="mt-1 text-sm text-slate-400">{BRAND.subtitle[lang]}</p>
          </div>
          <div
            role="group"
            aria-label={langLabel}
            className="inline-flex shrink-0 rounded-lg border border-slate-700 bg-slate-900 p-1"
          >
            {SUPPORTED_LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onLangChange(code)}
                className={
                  lang === code
                    ? "rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"
                    : "rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
                }
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          ← {backLabel}
        </Link>

        <header className="mt-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-400">
            {subtitle}
          </p>
        </header>

        <div className="prose-legal mt-8 space-y-8 text-sm leading-relaxed text-slate-300">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-x-4 gap-y-2 px-4 py-6 text-xs text-slate-500 sm:px-6">
          <Link href="/privacy" className="hover:text-indigo-300">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-indigo-300">
            Terms
          </Link>
          <Link href="/gdpr" className="hover:text-indigo-300">
            GDPR
          </Link>
          <span className="text-slate-600">© {BRAND.institute}</span>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-slate-300">{children}</div>
    </section>
  );
}
