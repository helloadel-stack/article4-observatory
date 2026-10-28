"use client";

import { useState } from "react";
import { Check, Copy, Download, ExternalLink, FileText, Mail } from "lucide-react";
import { SITE_CONFIG, WHITEPAPER_2026, type Lang } from "@/src/config/constants";
import { getLocaleMessages } from "@/src/locales";

type PublicationsSectionProps = {
  lang: Lang;
};

type CopiedKind = "citation" | "bibtex" | null;

export default function PublicationsSection({ lang }: PublicationsSectionProps) {
  const copy = getLocaleMessages(lang).publications;
  const [copied, setCopied] = useState<CopiedKind>(null);
  const [bibtexOpen, setBibtexOpen] = useState(false);

  const copyText = async (kind: Exclude<CopiedKind, null>) => {
    const text =
      kind === "citation" ? WHITEPAPER_2026.citation : WHITEPAPER_2026.bibtex;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => {
        setCopied((current) => (current === kind ? null : current));
      }, 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section
      id="publications"
      aria-labelledby="publications-heading"
      className="mt-8 scroll-mt-96 border border-slate-200 bg-white px-6 py-10 sm:px-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
        {copy.eyebrow}
      </p>
      <h2
        id="publications-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
      >
        {copy.title}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {copy.subtitle}
      </p>

      <article className="mt-8 border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200">
            <FileText className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-700">
              {copy.featured}
            </p>
            <a
              href={WHITEPAPER_2026.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-indigo-800 bg-indigo-700 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {WHITEPAPER_2026.doiLabel}
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
            </a>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              {copy.titleText}
            </h3>
            <p className="mt-3 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">
                {copy.authorityLabel}
                {": "}
              </span>
              {copy.authority}
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
              {copy.summary}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={WHITEPAPER_2026.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {copy.ctaDownload}
              </a>
              <a
                href={WHITEPAPER_2026.liveEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {copy.ctaEngine}
              </a>
              <a
                href={SITE_CONFIG.ecosystem.researchDesk}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {copy.ctaContact}
              </a>
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100 shadow-sm sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                {copy.citeHeading}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                {WHITEPAPER_2026.citation}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={() => void copyText("citation")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {copied === "citation" ? (
                    <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  )}
                  {copied === "citation" ? copy.copiedCitation : copy.copyCitation}
                </button>
                <button
                  type="button"
                  onClick={() => void copyText("bibtex")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-indigo-400 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {copied === "bibtex" ? (
                    <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  )}
                  {copied === "bibtex" ? copy.copiedBibtex : copy.copyBibtex}
                </button>
                <button
                  type="button"
                  aria-expanded={bibtexOpen}
                  aria-controls="whitepaper-bibtex"
                  onClick={() => setBibtexOpen((open) => !open)}
                  className="inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {bibtexOpen ? copy.hideBibtex : copy.showBibtex}
                </button>
              </div>
              <p className="sr-only" aria-live="polite">
                {copied === "citation"
                  ? copy.copiedCitation
                  : copied === "bibtex"
                    ? copy.copiedBibtex
                    : ""}
              </p>
              {bibtexOpen ? (
                <pre
                  id="whitepaper-bibtex"
                  className="mt-4 overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-slate-200"
                >
                  {WHITEPAPER_2026.bibtex}
                </pre>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
