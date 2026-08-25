"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Lang } from "@/src/config/constants";
import type { TranslationDict } from "@/src/i18n/translations";
import {
  OBSERVATORY_COUNTRIES,
  OBSERVATORY_COUNTRY_LABELS,
  OBSERVATORY_DATA,
  OBSERVATORY_DOMAIN_LABELS,
  OBSERVATORY_HITL_LABELS,
  OBSERVATORY_HOSTING_LABELS,
  OBSERVATORY_RISK_LABELS,
  getWaqfLedgerProofUrl,
  type ObservatoryCountry,
  type ObservatoryDeployment,
  type ObservatoryRiskLevel,
} from "@/src/data/observatory";

type ObservatoryExplorerProps = {
  lang: Lang;
  t: TranslationDict;
};

type CountryFilter = "ALL" | ObservatoryCountry;
type RiskFilter = "ALL" | Extract<ObservatoryRiskLevel, "HIGH" | "LOW" | "PROHIBITED">;
type SovereigntyFilter = "ALL" | "SOVEREIGN" | "NON_SOVEREIGN";

const COUNTRY_SELECT_CODES: ObservatoryCountry[] = [
  "FR",
  "DE",
  "ES",
  "BE",
  "CH",
  "NL",
  "EE",
  "CA_QC",
  "EU",
];

const RISK_BADGE_CLASS: Record<ObservatoryRiskLevel, string> = {
  HIGH: "bg-amber-950 text-amber-300 border-amber-800",
  MEDIUM: "bg-sky-950 text-sky-300 border-sky-800",
  LOW: "bg-emerald-950 text-emerald-300 border-emerald-800",
  PROHIBITED: "bg-red-950 text-red-300 border-red-800",
};

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadCsv(rows: readonly ObservatoryDeployment[]): void {
  const headers =
    "ID,Name,Entity,Country,Domain,RiskCategory,RiskLevel,Hosting,Sovereign,HumanOversight,Article4Status,WaqfLedgerHash,AuditDate";
  const body = rows
    .map((d) =>
      [
        d.id,
        d.name,
        d.deployingEntity,
        d.country,
        d.domain,
        d.euAiActCategory,
        d.riskLevel,
        d.hostingSovereignty,
        String(d.isSovereign),
        d.humanInTheLoop,
        d.article4LiteracyStatus,
        d.waqfledgerProofHash,
        d.lastAuditDate,
      ]
        .map(escapeCsvValue)
        .join(","),
    )
    .join("\n");
  const blob = new Blob([`\uFEFF${headers}\n${body}\n`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "A4I_Observatory_Dataset_2026.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ObservatoryExplorer({
  lang,
  t,
}: ObservatoryExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryFilter>("ALL");
  const [selectedRisk, setSelectedRisk] = useState<RiskFilter>("ALL");
  const [selectedSovereignty, setSelectedSovereignty] =
    useState<SovereigntyFilter>("ALL");

  const filteredData = useMemo(() => {
    const query = search.toLowerCase();
    return OBSERVATORY_DATA.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(query) ||
        item.deployingEntity.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query);

      const matchCountry =
        selectedCountry === "ALL" || item.country === selectedCountry;
      const matchRisk =
        selectedRisk === "ALL" || item.riskLevel === selectedRisk;
      const matchSovereignty =
        selectedSovereignty === "ALL" ||
        (selectedSovereignty === "SOVEREIGN"
          ? item.isSovereign
          : !item.isSovereign);

      return matchSearch && matchCountry && matchRisk && matchSovereignty;
    });
  }, [search, selectedCountry, selectedRisk, selectedSovereignty]);

  const totalCount = OBSERVATORY_DATA.length;
  const highRiskCount = OBSERVATORY_DATA.filter(
    (d) => d.riskLevel === "HIGH",
  ).length;
  const sovereignCount = OBSERVATORY_DATA.filter((d) => d.isSovereign).length;
  const sovereignRate =
    totalCount === 0
      ? "0"
      : ((sovereignCount / totalCount) * 100).toFixed(0);

  const countryOptions = COUNTRY_SELECT_CODES.filter((code) =>
    OBSERVATORY_COUNTRIES.includes(code),
  );

  return (
    <section
      id="observatory"
      className="mt-8 scroll-mt-24 border border-slate-800 bg-slate-900 text-slate-100"
    >
      <div className="space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="rounded-full border border-indigo-800 bg-indigo-950 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              {t.explorerEyebrow}
            </span>
            <h2
              id="observatory-heading"
              className="mt-2 text-2xl font-bold text-white sm:text-3xl"
            >
              {t.explorerTitle}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">
              {t.explorerSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadCsv(filteredData)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            {t.exportDatasetCsv}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiTotalDeployments}</span>
            <div className="mt-1 text-2xl font-bold text-white">{totalCount}</div>
            <span className="text-[11px] font-medium text-indigo-400">
              {t.kpiCoverageHint}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiHighRiskSystems}</span>
            <div className="mt-1 text-2xl font-bold text-amber-400">
              {highRiskCount}
            </div>
            <span className="text-[11px] text-slate-400">{t.kpiArt14Hint}</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiSovereignRate}</span>
            <div className="mt-1 text-2xl font-bold text-emerald-400">
              {sovereignRate}%
            </div>
            <span className="text-[11px] font-medium text-emerald-400">
              {t.kpiSovereignHint}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiWaqfAnchored}</span>
            <div className="mt-1 text-2xl font-bold text-indigo-400">100%</div>
            <span className="text-[11px] text-slate-400">{t.kpiWaqfSealHint}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="observatory-search"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              {t.searchLabel}
            </label>
            <input
              id="observatory-search"
              type="text"
              placeholder={t.searchPlaceholderEntity}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="observatory-country"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              {t.jurisdictionFilter}
            </label>
            <select
              id="observatory-country"
              value={selectedCountry}
              onChange={(e) =>
                setSelectedCountry(e.target.value as CountryFilter)
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">
                {t.allCountries} ({totalCount})
              </option>
              {countryOptions.map((code) => (
                <option key={code} value={code}>
                  {OBSERVATORY_COUNTRY_LABELS[code][lang]} ({code === "CA_QC" ? "QC" : code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="observatory-risk"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              {t.aiActClassificationFilter}
            </label>
            <select
              id="observatory-risk"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value as RiskFilter)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">{t.allAiActCategories}</option>
              <option value="HIGH">{t.riskFilterHigh}</option>
              <option value="LOW">{t.riskFilterLow}</option>
              <option value="PROHIBITED">{t.riskFilterProhibited}</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="observatory-sovereignty"
              className="mb-1 block text-xs font-medium text-slate-400"
            >
              {t.hostingSovereigntyFilter}
            </label>
            <select
              id="observatory-sovereignty"
              value={selectedSovereignty}
              onChange={(e) =>
                setSelectedSovereignty(e.target.value as SovereigntyFilter)
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">{t.hostingAll}</option>
              <option value="SOVEREIGN">{t.hostingFilterSovereign}</option>
              <option value="NON_SOVEREIGN">{t.hostingFilterDependent}</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-950 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3">{t.colSystemDeployment}</th>
                  <th className="px-4 py-3">{t.colEntity}</th>
                  <th className="px-4 py-3">{t.colCountry}</th>
                  <th className="px-4 py-3">{t.colAiActCategory}</th>
                  <th className="px-4 py-3">{t.colHosting}</th>
                  <th className="px-4 py-3">{t.colHitl}</th>
                  <th className="px-4 py-3 text-right">{t.colWaqfProof}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      {t.noResultsCriteria}
                    </td>
                  </tr>
                ) : (
                  filteredData.map((d) => (
                    <tr
                      key={d.id}
                      className="transition-colors hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-3.5 font-medium text-white">
                        <div>{d.name}</div>
                        <div className="text-[11px] font-normal text-slate-400">
                          {OBSERVATORY_DOMAIN_LABELS[d.domain][lang]}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">
                        {d.deployingEntity}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                          {OBSERVATORY_COUNTRY_LABELS[d.country][lang]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${RISK_BADGE_CLASS[d.riskLevel]}`}
                        >
                          {OBSERVATORY_RISK_LABELS[d.euAiActCategory][lang]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center space-x-1.5">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              d.isSovereign ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                          <span className="text-[11px] text-slate-300">
                            {OBSERVATORY_HOSTING_LABELS[d.hostingSovereignty][lang]}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[11px] text-slate-300">
                        {OBSERVATORY_HITL_LABELS[d.humanInTheLoop][lang]}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <a
                          href={getWaqfLedgerProofUrl(d.waqfledgerProofHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-mono text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline"
                          title={d.waqfledgerProofHash}
                        >
                          {d.waqfledgerProofHash.substring(0, 8)}...
                          <span className="ml-1 text-[10px]" aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 p-3 text-xs text-slate-500">
            <span>
              {t.showingFiltered
                .replace("{filtered}", String(filteredData.length))
                .replace("{total}", String(totalCount))}
            </span>
            <span>{t.waqfIntegrityCertified}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
