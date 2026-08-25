"use client";

import { Building2, Landmark, ShieldCheck } from "lucide-react";
import {
  A4I_NEXUS,
  type Lang,
} from "@/src/config/constants";
import type { TranslationDict } from "@/src/i18n/translations";

const PILLAR_ICONS = {
  nonprofit: Landmark,
  verifia: ShieldCheck,
  commercial: Building2,
} as const;

type NexusSectionProps = {
  lang: Lang;
  t: TranslationDict;
};

export default function NexusSection({ lang, t }: NexusSectionProps) {
  const pillars = [
    { ...A4I_NEXUS.nonprofit, icon: PILLAR_ICONS.nonprofit },
    { ...A4I_NEXUS.verifia, icon: PILLAR_ICONS.verifia },
    { ...A4I_NEXUS.commercial, icon: PILLAR_ICONS.commercial },
  ];

  return (
    <section
      id="nexus"
      aria-labelledby="nexus-heading"
      className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-10 sm:px-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
        {t.nexusEyebrow}
      </p>
      <h2
        id="nexus-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
      >
        {t.nexusTitle}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {t.nexusSubtitle}
      </p>

      <ul className="mt-8 grid gap-4 lg:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <li
              key={pillar.key}
              className="border border-slate-200 bg-slate-50 p-5"
            >
              <Icon
                className="h-5 w-5 text-indigo-700"
                aria-hidden
              />
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {pillar.key === "verifia" ? t.ecosystemBadge : pillar.title[lang]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {pillar.key === "verifia" ? t.ecosystemDesc : pillar.body[lang]}
              </p>
              {"goods" in pillar ? (
                <ul className="mt-3 space-y-1 text-xs font-medium text-indigo-800">
                  {pillar.goods.map((good) => (
                    <li key={good}>· {good}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
