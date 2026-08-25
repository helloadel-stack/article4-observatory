"use client";

import type { TranslationDict } from "@/src/i18n/translations";

type HeroProps = {
  t: TranslationDict;
};

export default function Hero({ t }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-6 py-12 sm:px-10 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.14),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.08),_transparent_40%)]"
        aria-hidden
      />
      <div className="relative max-w-3xl">
        <p className="text-sm font-bold tracking-tight text-indigo-700">
          {t.platform}
        </p>
        <p className="mt-2 inline-flex w-fit items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-700 ring-1 ring-inset ring-indigo-200 sm:text-xs">
          {t.heroBadge}
        </p>
        <h1
          id="hero-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
        >
          {t.heroTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {t.heroText}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {t.primaryCta}
          </a>
          <a
            href="#nexus"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {t.navNexus}
          </a>
          <a
            href="#waqfledger"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            {t.navWaqfLedger}
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Trust signals">
          {[t.badgeTrilingual, t.badgeGdpr, t.badgeIso].map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
