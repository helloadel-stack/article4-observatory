"use client";

import { ExternalLink, FileText, Mail } from "lucide-react";
import { SITE_CONFIG, type Lang } from "@/src/config/constants";
import { getLocaleMessages } from "@/src/locales";

type PublicationsSectionProps = {
  lang: Lang;
};

export default function PublicationsSection({ lang }: PublicationsSectionProps) {
  const copy = getLocaleMessages(lang).publications;

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
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
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
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE_CONFIG.ecosystem.assuranceLab}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {copy.ctaLab}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </a>
              <a
                href={SITE_CONFIG.ecosystem.researchDesk}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {copy.ctaContact}
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
