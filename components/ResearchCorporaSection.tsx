"use client";

import { ArrowRight } from "lucide-react";
import { RESEARCH_CORPORA, type Lang } from "@/src/config/constants";

const sectionCopy = {
  EN: {
    title: "The 4 Methodological Research Corpora",
    subtitle:
      "Open-science corpora of L'Institut Article 4. No catalogue price, no checkout, and no commercial site licence — access follows the stated Creative Commons terms or an institutional research protocol.",
  },
  FR: {
    title: "Les 4 corpus méthodologiques de recherche",
    subtitle:
      "Corpus de science ouverte de L'Institut Article 4. Aucun prix catalogue, aucun paiement, aucune licence commerciale de site — l'accès suit la licence Creative Commons indiquée ou un protocole de recherche institutionnel.",
  },
  ES: {
    title: "Los 4 corpus metodológicos de investigación",
    subtitle:
      "Corpus de ciencia abierta de L'Institut Article 4. Sin precio de catálogo, sin pago y sin licencia comercial de sitio — el acceso sigue la licencia Creative Commons indicada o un protocolo de investigación institucional.",
  },
} as const;

type ResearchCorporaSectionProps = {
  lang: Lang;
};

export default function ResearchCorporaSection({
  lang,
}: ResearchCorporaSectionProps) {
  const copy = sectionCopy[lang];

  return (
    <section
      id="corpus"
      aria-labelledby="corpus-heading"
      className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-10 sm:px-8"
    >
      <div className="max-w-3xl">
        <h2
          id="corpus-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {copy.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {copy.subtitle}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {RESEARCH_CORPORA.map((corpus) => {
          const localized = corpus[lang];
          return (
            <article
              key={corpus.id}
              className={
                corpus.featured
                  ? "relative flex flex-col rounded-xl border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/80 to-white p-6 shadow-md ring-1 ring-indigo-100"
                  : "relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              }
            >
              <span className="w-fit rounded-full bg-indigo-700 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                {localized.badge}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                {localized.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {localized.summary}
              </p>
              <a
                href={corpus.href}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {localized.cta}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
