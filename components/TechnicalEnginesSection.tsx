"use client";

import { ExternalLink, Fingerprint, Languages, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, type Lang } from "@/src/config/constants";
import { getLocaleMessages } from "@/src/locales";

type TechnicalEnginesSectionProps = {
  lang: Lang;
};

export default function TechnicalEnginesSection({
  lang,
}: TechnicalEnginesSectionProps) {
  const copy = getLocaleMessages(lang).engines;
  const nodes = [
    {
      key: "safeai",
      href: SITE_CONFIG.ecosystem.assuranceLab,
      name: copy.safeaiName,
      role: copy.safeaiRole,
      scope: copy.safeaiScope,
      icon: ShieldCheck,
    },
    {
      key: "arabic",
      href: SITE_CONFIG.ecosystem.arabicObservatory,
      name: copy.arabicName,
      role: copy.arabicRole,
      scope: copy.arabicScope,
      icon: Languages,
    },
    {
      key: "waqf",
      href: SITE_CONFIG.ecosystem.ledger,
      name: copy.waqfName,
      role: copy.waqfRole,
      scope: copy.waqfScope,
      icon: Fingerprint,
    },
  ] as const;

  return (
    <section
      id="engines"
      aria-labelledby="engines-heading"
      className="relative mt-8 scroll-mt-96 overflow-hidden border border-slate-800 bg-slate-950 px-6 py-12 text-slate-100 sm:px-10 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
        aria-hidden
      />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          {copy.eyebrow}
        </p>
        <h2
          id="engines-heading"
          className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          {copy.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {copy.subtitle}
        </p>

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {nodes.map((node) => {
            const Icon = node.icon;
            return (
              <li key={node.key}>
                <article className="flex h-full flex-col rounded-xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-sm shadow-black/20 backdrop-blur-sm transition-colors hover:border-indigo-400/40">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/25">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
                    {node.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-sky-200">
                    {node.role}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                    {node.scope}
                  </p>
                  <a
                    href={node.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 underline-offset-2 hover:text-white hover:underline focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    {copy.openNode}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
