"use client";

import { Globe2, Scale } from "lucide-react";
import {
  TRANSATLANTIC_MAPPING,
  type Lang,
} from "@/src/config/constants";
import type { TranslationDict } from "@/src/i18n/translations";

type TransatlanticSectionProps = {
  lang: Lang;
  t: TranslationDict;
};

export default function TransatlanticSection({
  lang,
  t,
}: TransatlanticSectionProps) {
  const nodes = [
    { ...TRANSATLANTIC_MAPPING.franceEu, icon: Scale },
    { ...TRANSATLANTIC_MAPPING.canadaQuebec, icon: Globe2 },
  ];

  return (
    <section
      id="mapping"
      aria-labelledby="mapping-heading"
      className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-10 sm:px-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
        {t.mappingEyebrow}
      </p>
      <h2
        id="mapping-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
      >
        {t.mappingTitle}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {t.mappingSubtitle}
      </p>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <li
              key={node.key}
              className="border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-indigo-700" aria-hidden />
                <h3 className="text-base font-semibold text-slate-900">
                  {node.region[lang]}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {node.key === "canadaQuebec"
                  ? t.standardsQuebec
                  : node.body[lang]}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {node.standards.map((standard) => (
                  <li
                    key={standard}
                    className="rounded-full border border-indigo-100 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-indigo-800"
                  >
                    {standard}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-500">
        {t.artifactsDisclaimer}
      </p>
    </section>
  );
}
