"use client";

import { useMemo, useState } from "react";
import { Download, FileJson, Quote } from "lucide-react";
import {
  BRAND,
  CONTENT_LICENSES,
  SITE_METADATA,
  type Lang,
} from "@/src/config/constants";
import type { TranslationDict } from "@/src/i18n/translations";
import {
  OBSERVATORY_COUNTRIES,
  OBSERVATORY_COUNTRY_LABELS,
  OBSERVATORY_DATA,
  OBSERVATORY_DOMAIN_LABELS,
  OBSERVATORY_HITL_LABELS,
  OBSERVATORY_HOSTING_LABELS,
  OBSERVATORY_JURISDICTION_COUNT,
  OBSERVATORY_LITERACY_LABELS,
  OBSERVATORY_RISK_LABELS,
  computeComplianceScore,
  computeObservatoryKpis,
  getObservatorySummary,
  getWaqfLedgerProofUrl,
  isObservatoryProofAnchored,
  serializeObservatoryCsv,
  serializeObservatoryJson,
  type ObservatoryCountry,
  type ObservatoryDeployment,
  type ObservatoryRiskLevel,
} from "@/src/data/observatory";

type ObservatoryExplorerProps = {
  lang: Lang;
  t: TranslationDict;
};

type CountryFilter = "ALL" | ObservatoryCountry;
type RiskFilter =
  | "ALL"
  | Extract<ObservatoryRiskLevel, "HIGH" | "LOW" | "PROHIBITED">;
type SovereigntyFilter = "ALL" | "SOVEREIGN" | "NON_SOVEREIGN";

const RISK_BADGE_CLASS: Record<ObservatoryRiskLevel, string> = {
  HIGH: "bg-amber-950 text-amber-300 border-amber-800",
  MEDIUM: "bg-sky-950 text-sky-300 border-sky-800",
  LOW: "bg-emerald-950 text-emerald-300 border-emerald-800",
  PROHIBITED: "bg-red-950 text-red-300 border-red-800",
};

function downloadTextFile(
  content: string,
  filename: string,
  mime: string,
): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function buildApaCitation(): string {
  return `${SITE_METADATA.author}. (${SITE_METADATA.year}). ${SITE_METADATA.datasetTitle}. ${SITE_METADATA.publisher}. ${BRAND.instituteUrl}#observatory`;
}

function buildBibtexCitation(): string {
  return `@dataset{a4i_observatoire_${SITE_METADATA.year},
  author    = {${SITE_METADATA.author}},
  title     = {${SITE_METADATA.datasetTitle}},
  year      = {${SITE_METADATA.year}},
  publisher = {${SITE_METADATA.publisher}},
  url       = {${BRAND.instituteUrl}#observatory},
  note      = {${CONTENT_LICENSES.observatory.short}}
}`;
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [citeOpen, setCiteOpen] = useState(false);
  const [copied, setCopied] = useState<"apa" | "bibtex" | null>(null);

  const filteredData = useMemo(() => {
    const query = search.toLowerCase();
    return OBSERVATORY_DATA.filter((item) => {
      const summaryBlob = `${item.summary.EN} ${item.summary.FR} ${item.summary.ES}`;
      const matchSearch =
        query.length === 0 ||
        item.name.toLowerCase().includes(query) ||
        item.deployingEntity.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        summaryBlob.toLowerCase().includes(query);

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

  const kpis = useMemo(() => computeObservatoryKpis(OBSERVATORY_DATA), []);
  const totalCount = kpis.totalDeployments;
  const datasetMeta = {
    title: SITE_METADATA.datasetTitle,
    publisher: SITE_METADATA.publisher,
    year: SITE_METADATA.year,
  };

  const copyCitation = async (kind: "apa" | "bibtex") => {
    const text = kind === "apa" ? buildApaCitation() : buildBibtexCitation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section
      id="observatory"
      className="mt-8 scroll-mt-24 border border-slate-800 bg-slate-900 text-slate-100"
    >
      <div className="space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-start md:justify-between">
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
            <a
              href={CONTENT_LICENSES.observatory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-xs font-medium text-indigo-300 underline-offset-2 hover:underline"
            >
              {t.licenseHint}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                downloadTextFile(
                  serializeObservatoryCsv(filteredData),
                  "A4I_Observatory_Dataset_2026.csv",
                  "text/csv;charset=utf-8;",
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              {t.exportDatasetCsv}
            </button>
            <button
              type="button"
              onClick={() =>
                downloadTextFile(
                  serializeObservatoryJson(filteredData, datasetMeta),
                  "A4I_Observatory_Dataset_2026.json",
                  "application/json;charset=utf-8;",
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
            >
              <FileJson className="h-3.5 w-3.5" aria-hidden="true" />
              {t.exportDatasetJson}
            </button>
            <button
              type="button"
              onClick={() => setCiteOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-700 bg-indigo-950 px-4 py-2 text-xs font-semibold text-indigo-100 shadow-sm transition-colors hover:bg-indigo-900"
            >
              <Quote className="h-3.5 w-3.5" aria-hidden="true" />
              {t.citeDataset}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">
              {t.kpiTotalDeployments}
            </span>
            <div className="mt-1 text-2xl font-bold text-white">{totalCount}</div>
            <span className="text-[11px] font-medium text-indigo-400">
              {t.kpiCoverageHint.replace(
                "10",
                String(OBSERVATORY_JURISDICTION_COUNT),
              )}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiHighRiskSystems}</span>
            <div className="mt-1 text-2xl font-bold text-amber-400">
              {kpis.highRiskAnnexIiiCount}
            </div>
            <span className="text-[11px] text-slate-400">
              {t.kpiArt14Hint} · {kpis.highRiskAnnexIiiPct}%
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiSovereignRate}</span>
            <div className="mt-1 text-2xl font-bold text-emerald-400">
              {kpis.sovereignHostingPct}%
            </div>
            <span className="text-[11px] font-medium text-emerald-400">
              {t.kpiSovereignHint} ({kpis.sovereignHostingCount}/{totalCount})
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiAvgCompliance}</span>
            <div className="mt-1 text-2xl font-bold text-sky-300">
              {kpis.averageComplianceScore}
            </div>
            <span className="text-[11px] text-slate-400">
              {t.kpiComplianceHint}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-400">{t.kpiWaqfAnchored}</span>
            <div
              className={`mt-1 text-2xl font-bold ${
                kpis.waqfAnchoredPct === 100
                  ? "text-indigo-400"
                  : "text-amber-400"
              }`}
            >
              {kpis.waqfAnchoredPct}%
            </div>
            <span className="text-[11px] text-slate-400">
              {t.kpiWaqfSealHint} ({kpis.waqfAnchoredCount}/{totalCount})
            </span>
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
              {OBSERVATORY_COUNTRIES.map((code) => (
                <option key={code} value={code}>
                  {OBSERVATORY_COUNTRY_LABELS[code][lang]} (
                  {code === "CA_QC" ? "QC" : code})
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
                  <th className="px-4 py-3">{t.colLiteracy}</th>
                  <th className="px-4 py-3">{t.colComplianceScore}</th>
                  <th className="px-4 py-3">{t.colAuditDate}</th>
                  <th className="px-4 py-3 text-right">{t.colWaqfProof}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-500">
                      {t.noResultsCriteria}
                    </td>
                  </tr>
                ) : (
                  filteredData.map((d) => (
                    <ObservatoryRow
                      key={d.id}
                      deployment={d}
                      lang={lang}
                      t={t}
                      expanded={expandedId === d.id}
                      onToggle={() =>
                        setExpandedId((prev) => (prev === d.id ? null : d.id))
                      }
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 border-t border-slate-800 bg-slate-950 p-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {t.showingFiltered
                .replace("{filtered}", String(filteredData.length))
                .replace("{total}", String(totalCount))}
            </span>
            <span>{t.waqfIntegrityCertified}</span>
          </div>
        </div>
      </div>

      {citeOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cite-dataset-title"
          onClick={() => setCiteOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="cite-dataset-title"
              className="text-base font-semibold text-white"
            >
              {t.citeModalTitle}
            </h3>
            <p className="mt-2 text-xs text-slate-400">{t.licenseHint}</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t.citeApaLabel}
                </p>
                <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-300">
                  {buildApaCitation()}
                </pre>
                <button
                  type="button"
                  onClick={() => copyCitation("apa")}
                  className="mt-2 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  {copied === "apa" ? t.copied : t.copyCitation}
                </button>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t.citeBibtexLabel}
                </p>
                <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] leading-relaxed text-slate-300">
                  {buildBibtexCitation()}
                </pre>
                <button
                  type="button"
                  onClick={() => copyCitation("bibtex")}
                  className="mt-2 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  {copied === "bibtex" ? t.copied : t.copyCitation}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCiteOpen(false)}
              className="mt-5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800"
            >
              {t.close}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ObservatoryRow({
  deployment: d,
  lang,
  t,
  expanded,
  onToggle,
}: {
  deployment: ObservatoryDeployment;
  lang: Lang;
  t: TranslationDict;
  expanded: boolean;
  onToggle: () => void;
}) {
  const score = computeComplianceScore(d);
  return (
    <>
      <tr
        className="cursor-pointer transition-colors hover:bg-slate-800/50"
        onClick={onToggle}
      >
        <td className="px-4 py-3.5 font-medium text-white">
          <div>{d.name}</div>
          <div className="text-[11px] font-normal text-slate-400">
            {d.id} · {OBSERVATORY_DOMAIN_LABELS[d.domain][lang]}
          </div>
        </td>
        <td className="px-4 py-3.5 text-slate-300">{d.deployingEntity}</td>
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
        <td className="px-4 py-3.5 text-[11px] text-slate-300">
          {OBSERVATORY_LITERACY_LABELS[d.article4LiteracyStatus][lang]}
        </td>
        <td className="px-4 py-3.5 font-mono text-[11px] font-semibold text-sky-300">
          {score}
        </td>
        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">
          {d.lastAuditDate}
        </td>
        <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
          {isObservatoryProofAnchored(d) ? (
            <a
              href={getWaqfLedgerProofUrl(d.waqfledgerProofHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-end gap-1"
              title={d.waqfledgerProofHash}
            >
              <span className="rounded border border-emerald-800 bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                {t.proofVerifiedOnChain}
              </span>
              <span className="inline-flex items-center font-mono text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline">
                {d.waqfledgerProofHash.substring(0, 8)}...
                <span className="ml-1 text-[10px]" aria-hidden="true">
                  ↗
                </span>
              </span>
            </a>
          ) : (
            <span
              className="inline-flex flex-col items-end gap-1"
              title={d.waqfledgerProofHash}
            >
              <span className="rounded border border-amber-800 bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                {t.proofLocalPending}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {d.waqfledgerProofHash.substring(0, 8)}...
              </span>
            </span>
          )}
        </td>
      </tr>
      {expanded ? (
        <tr className="bg-slate-950/80">
          <td colSpan={10} className="px-4 py-3 text-sm leading-relaxed text-slate-300">
            {getObservatorySummary(d, lang)}
          </td>
        </tr>
      ) : null}
    </>
  );
}
