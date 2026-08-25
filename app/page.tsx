"use client";

import { useState, type FormEvent } from "react";
import {
  Search,
  ShieldCheck,
  Globe,
  Database,
  Filter,
  Download,
  BookOpen,
  Quote,
  Copy,
  Check,
  X,
  User,
  PlusCircle,
} from "lucide-react";
import observatoryData from "@/data/data.json";
import PricingSection from "@/components/PricingSection";
import WaqfLedgerAuditSection from "@/components/WaqfLedgerAuditSection";
import AssessmentSection from "@/components/AssessmentSection";
import HtmlLangSync from "@/components/HtmlLangSync";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NexusSection from "@/components/NexusSection";
import TransatlanticSection from "@/components/TransatlanticSection";
import {
  BRAND,
  DEFAULT_LANG,
  INSTITUTIONAL_POSITIONING,
  SITE_METADATA,
  localizeCountry,
  localizeEuAiActStatus,
} from "@/src/config/constants";
import { translations } from "@/src/i18n/translations";
import { useSyncedLang } from "@/src/lib/useSyncedLang";

type SovereigntyFilter = "all" | "Sovereign" | "Dependent";
type SubmitCountry =
  | "France"
  | "Germany"
  | "Spain"
  | "EU"
  | "Quebec / Canada"
  | "North Africa / Other";

interface SubmitFormState {
  agency: string;
  country: SubmitCountry | "";
  toolName: string;
  modelHosting: string;
  verificationUrl: string;
  email: string;
  notes: string;
}

const EMPTY_SUBMIT_FORM: SubmitFormState = {
  agency: "",
  country: "",
  toolName: "",
  modelHosting: "",
  verificationUrl: "",
  email: "",
  notes: "",
};

const SUBMIT_COUNTRIES: SubmitCountry[] = [
  "France",
  "Germany",
  "Spain",
  "EU",
  "Quebec / Canada",
  "North Africa / Other",
];

interface ObservatoryEntry {
  id: string;
  agency: string;
  country: string;
  toolName: string;
  primaryModel: string;
  hostingProvider: string;
  sovereigntyType: "Sovereign" | "Dependent";
  euAiActStatus: string;
  lastUpdated: string;
}

function LinkedInIcon({
  className,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const data = observatoryData as ObservatoryEntry[];

const APA_CITATION = `Article 4 Institute. (${SITE_METADATA.year}). ${SITE_METADATA.datasetTitle}. ${BRAND.instituteUrl}`;
const BIBTEX_CITATION = `@misc{article4institute2026easi,
  author       = {{Article 4 Institute}},
  title        = {${SITE_METADATA.datasetTitle}},
  year         = {${SITE_METADATA.year}},
  howpublished = {\\url{${BRAND.instituteUrl}}},
  note         = {Lead Researcher: ${SITE_METADATA.author}}
}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: BRAND.storefront,
      applicationCategory: "BusinessApplication",
      description: SITE_METADATA.description,
      url: BRAND.instituteUrl,
      author: {
        "@type": "Person",
        name: SITE_METADATA.author,
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "49",
        highPrice: "2499",
      },
      publisher: {
        "@type": "Organization",
        name: SITE_METADATA.publisher,
        url: BRAND.instituteUrl,
        sameAs: [BRAND.linkedInUrl],
      },
    },
    {
      "@type": "NGO",
      name: SITE_METADATA.publisher,
      url: BRAND.instituteUrl,
      sameAs: [BRAND.linkedInUrl],
      description: INSTITUTIONAL_POSITIONING.identity.EN,
      slogan: INSTITUTIONAL_POSITIONING.slogan.EN,
      founder: {
        "@type": "Person",
        name: SITE_METADATA.author,
        jobTitle: "Founder & Lead Researcher",
      },
    },
  ],
};

const CSV_HEADERS = [
  "id",
  "agency",
  "country",
  "toolName",
  "primaryModel",
  "hostingProvider",
  "sovereigntyType",
  "euAiActStatus",
  "lastUpdated",
] as const;

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadFilteredCsv(rows: ObservatoryEntry[]): void {
  const lines = [
    CSV_HEADERS.join(","),
    ...rows.map((row) =>
      CSV_HEADERS.map((key) => escapeCsvValue(String(row[key]))).join(","),
    ),
  ];
  const blob = new Blob(["\uFEFF" + lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "european-ai-sovereignty-index.csv";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function SovereigntyBadge({
  type,
  label,
}: {
  type: "Sovereign" | "Dependent";
  label: string;
}) {
  const isSovereign = type === "Sovereign";
  return (
    <span
      className={
        isSovereign
          ? "inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/20"
          : "inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20"
      }
    >
      {label}
    </span>
  );
}

export default function Home() {
  const [lang, handleLangChange] = useSyncedLang(DEFAULT_LANG);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [sovereignty, setSovereignty] = useState<SovereigntyFilter>("all");
  const [citeOpen, setCiteOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<"apa" | "bibtex" | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitForm, setSubmitForm] =
    useState<SubmitFormState>(EMPTY_SUBMIT_FORM);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<"required" | "network" | null>(
    null,
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [sessionProofs, setSessionProofs] = useState<string[]>([]);

  const t = translations[lang];

  const countryLabels: Record<SubmitCountry, string> = {
    France: t.submitCountryFrance,
    Germany: t.submitCountryGermany,
    Spain: t.submitCountrySpain,
    EU: t.submitCountryEu,
    "Quebec / Canada": t.submitCountryQuebec,
    "North Africa / Other": t.submitCountryNorthAfricaOther,
  };

  const openSubmitModal = () => {
    setSubmitForm(EMPTY_SUBMIT_FORM);
    setSubmitSuccess(false);
    setSubmitError(null);
    setSubmitLoading(false);
    setSubmissionId(null);
    setSubmitOpen(true);
  };

  const closeSubmitModal = () => {
    setSubmitOpen(false);
    setSubmitSuccess(false);
    setSubmitError(null);
    setSubmitLoading(false);
  };

  const updateSubmitField = <K extends keyof SubmitFormState>(
    key: K,
    value: SubmitFormState[K],
  ) => {
    setSubmitForm((prev) => ({ ...prev, [key]: value }));
    setSubmitError(null);
  };

  const handleSubmitProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      agency,
      country,
      toolName,
      modelHosting,
      verificationUrl,
      email,
      notes,
    } = submitForm;
    const isValid =
      agency.trim() !== "" &&
      country !== "" &&
      toolName.trim() !== "" &&
      modelHosting.trim() !== "" &&
      verificationUrl.trim() !== "";

    if (!isValid) {
      setSubmitError("required");
      setSubmitSuccess(false);
      return;
    }

    setSubmitError(null);
    setSubmitLoading(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agencyName: agency.trim(),
          country,
          toolName: toolName.trim(),
          modelHosting: modelHosting.trim(),
          verificationUrl: verificationUrl.trim(),
          notes: notes.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        submissionId?: string;
        error?: string;
      };

      if (!res.ok || !json.success || !json.submissionId) {
        setSubmitError(res.status === 400 ? "required" : "network");
        setSubmitSuccess(false);
        return;
      }

      setSubmissionId(json.submissionId);
      setSubmitSuccess(true);
    } catch {
      setSubmitError("network");
      setSubmitSuccess(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  const countries = Array.from(new Set(data.map((d) => d.country))).sort();

  const total = data.length;
  const sovereignCount = data.filter(
    (d) => d.sovereigntyType === "Sovereign",
  ).length;
  const highCompliance = data.filter(
    (d) => d.euAiActStatus === "High Compliance",
  ).length;
  const countriesIndexed = new Set(data.map((d) => d.country)).size;
  const metrics = {
    total,
    sovereignPct: total ? Math.round((sovereignCount / total) * 100) : 0,
    compliancePct: total ? Math.round((highCompliance / total) * 100) : 0,
    countriesIndexed,
  };

  const q = search.trim().toLowerCase();
  const filtered = data.filter((row) => {
    const matchesSearch =
      !q ||
      row.agency.toLowerCase().includes(q) ||
      row.toolName.toLowerCase().includes(q);
    const matchesCountry = country === "all" || row.country === country;
    const matchesSovereignty =
      sovereignty === "all" || row.sovereigntyType === sovereignty;
    return matchesSearch && matchesCountry && matchesSovereignty;
  });

  const handleCopy = async (key: "apa" | "bibtex", text: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const navLinks: {
    href: string;
    label: string;
    route?: boolean;
  }[] = [
    { href: "#nexus", label: t.navNexus },
    { href: "#mapping", label: t.navMapping },
    { href: "#pricing", label: t.navComplianceKits },
    { href: "#waqfledger", label: t.navWaqfLedger },
    { href: "#assessment", label: t.navDocumentation },
    { href: "/bouclier-public", label: t.navBouclierPublic, route: true },
    {
      href: "/ateliers-juridiques",
      label: t.navAteliersJuridiques,
      route: true,
    },
  ];

  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <HtmlLangSync lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header
        t={t}
        lang={lang}
        onLangChange={handleLangChange}
        navLinks={navLinks}
        onSubmit={openSubmitModal}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Hero t={t} />

        <NexusSection lang={lang} t={t} />

        <TransatlanticSection lang={lang} t={t} />

        <AssessmentSection
          lang={lang}
          onProofGenerated={(proofId) =>
            setSessionProofs((prev) =>
              prev.includes(proofId) ? prev : [...prev, proofId],
            )
          }
        />

        <PricingSection lang={lang} onLangChange={handleLangChange} />

        <WaqfLedgerAuditSection lang={lang} sessionProofs={sessionProofs} />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {t.totalEntities}
              </p>
              <Database className="h-5 w-5 text-slate-400" aria-hidden />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {metrics.total}
            </p>
          </article>
          <article className="border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {t.sovereignPct}
              </p>
              <ShieldCheck className="h-5 w-5 text-slate-400" aria-hidden />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {metrics.sovereignPct}%
            </p>
          </article>
          <article className="border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {t.compliancePct}
              </p>
              <Filter className="h-5 w-5 text-slate-400" aria-hidden />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {metrics.compliancePct}%
            </p>
          </article>
          <article className="border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {t.countriesIndexed}
              </p>
              <Globe className="h-5 w-5 text-slate-400" aria-hidden />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {metrics.countriesIndexed}
            </p>
          </article>
        </section>

        <section className="mt-8 border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold tracking-tight">
              {t.explorerTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{t.explorerSubtitle}</p>
          </div>

          <div className="grid gap-3 border-b border-slate-200 px-6 py-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="relative block sm:col-span-2">
              <span className="sr-only">{t.searchPlaceholder}</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                {t.countryFilter}
              </span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              >
                <option value="all">{t.allCountries}</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {localizeCountry(c, lang)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                {t.sovereigntyFilter}
              </span>
              <select
                value={sovereignty}
                onChange={(e) =>
                  setSovereignty(e.target.value as SovereigntyFilter)
                }
                className="w-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              >
                <option value="all">{t.allTypes}</option>
                <option value="Sovereign">{t.sovereign}</option>
                <option value="Dependent">{t.dependent}</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-slate-500">
              {filtered.length} {t.results}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => downloadFilteredCsv(filtered)}
                className="inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                {t.downloadCsv}
              </button>
              <button
                type="button"
                onClick={() => setCiteOpen(true)}
                className="inline-flex items-center gap-2 border border-indigo-700 bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-800 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                {t.citeDataset}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colAgency}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colCountry}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colTool}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colModel}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colHosting}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colSovereignty}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colCompliance}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    {t.colUpdated}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-10 text-center text-slate-500"
                    >
                      {t.noResults}
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id} className="hover:bg-indigo-50/40">
                      <td className="max-w-[14rem] px-4 py-3 font-medium text-slate-900">
                        {row.agency}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {localizeCountry(row.country, lang)}
                      </td>
                      <td className="max-w-[12rem] px-4 py-3 text-slate-700">
                        {row.toolName}
                      </td>
                      <td className="max-w-[12rem] px-4 py-3 text-slate-600">
                        {row.primaryModel}
                      </td>
                      <td className="max-w-[14rem] px-4 py-3 text-slate-600">
                        {row.hostingProvider}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <SovereigntyBadge
                          type={row.sovereigntyType}
                          label={
                            row.sovereigntyType === "Sovereign"
                              ? t.sovereign
                              : t.dependent
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {localizeEuAiActStatus(row.euAiActStatus, lang)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-500">
                        {row.lastUpdated}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="framework"
          className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-6 sm:px-8"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
              aria-hidden
            />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {t.methodologyTitle}
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
                {t.methodologyText}
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">
                {t.safeAiDisclosure.split("SafeAI.report").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <a
                        href={BRAND.safeAiReportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-900"
                      >
                        SafeAI.report
                      </a>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                {t.poweredBySafeAi}
              </p>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-6 sm:px-8"
        >
          <div className="flex items-start gap-3">
            <User
              className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold tracking-tight">
                {t.aboutTitle}
              </h2>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-indigo-100 bg-indigo-50 text-sm font-semibold text-indigo-800">
                  AE
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-slate-900">
                    {t.aboutLeadName}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-500">
                    {t.founderRole}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {t.leadResearcher}
                  </p>
                  <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
                    {t.aboutText}
                  </p>
                  <a
                    href={BRAND.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {t.connectLinkedIn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} lang={lang} />

      {citeOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cite-modal-title"
          onClick={() => setCiteOpen(false)}
        >
          <div
            className="w-full max-w-lg border border-slate-200 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <Quote className="h-4 w-4 text-slate-500" aria-hidden />
                <h3
                  id="cite-modal-title"
                  className="text-base font-semibold text-slate-900"
                >
                  {t.citeModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCiteOpen(false)}
                className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                aria-label={t.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t.citeApaLabel}
                </p>
                <pre className="whitespace-pre-wrap break-words border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                  {APA_CITATION}
                </pre>
                <button
                  type="button"
                  onClick={() => handleCopy("apa", APA_CITATION)}
                  className="mt-2 inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {copiedKey === "apa" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden />
                  )}
                  {copiedKey === "apa" ? t.copied : t.copyCitation}
                </button>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t.citeBibtexLabel}
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-800">
                  {BIBTEX_CITATION}
                </pre>
                <button
                  type="button"
                  onClick={() => handleCopy("bibtex", BIBTEX_CITATION)}
                  className="mt-2 inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {copiedKey === "bibtex" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden />
                  )}
                  {copiedKey === "bibtex" ? t.copied : t.copyCitation}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {submitOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
          onClick={closeSubmitModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-slate-300 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-indigo-950 px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-indigo-200" aria-hidden />
                <h3
                  id="submit-modal-title"
                  className="text-base font-semibold tracking-tight"
                >
                  {t.submitModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeSubmitModal}
                className="rounded p-1 text-indigo-200 hover:bg-indigo-900 hover:text-white"
                aria-label={t.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProject} className="space-y-4 px-5 py-5">
              {submitSuccess ? (
                <div
                  role="status"
                  className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
                >
                  <p>{t.submitSuccess}</p>
                  {submissionId ? (
                    <code className="mt-2 block break-all font-mono text-[11px]">
                      {submissionId}
                    </code>
                  ) : null}
                </div>
              ) : null}

              {submitError ? (
                <div
                  role="alert"
                  className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                >
                  {submitError === "required"
                    ? t.submitRequiredError
                    : t.submitNetworkError}
                </div>
              ) : null}

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitAgencyLabel}
                </span>
                <input
                  type="text"
                  required
                  value={submitForm.agency}
                  onChange={(e) => updateSubmitField("agency", e.target.value)}
                  placeholder={t.submitAgencyPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitCountryLabel}
                </span>
                <select
                  required
                  value={submitForm.country}
                  onChange={(e) =>
                    updateSubmitField(
                      "country",
                      e.target.value as SubmitCountry | "",
                    )
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">{t.submitCountryPlaceholder}</option>
                  {SUBMIT_COUNTRIES.map((code) => (
                    <option key={code} value={code}>
                      {countryLabels[code]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitToolLabel}
                </span>
                <input
                  type="text"
                  required
                  value={submitForm.toolName}
                  onChange={(e) =>
                    updateSubmitField("toolName", e.target.value)
                  }
                  placeholder={t.submitToolPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitModelHostingLabel}
                </span>
                <input
                  type="text"
                  required
                  value={submitForm.modelHosting}
                  onChange={(e) =>
                    updateSubmitField("modelHosting", e.target.value)
                  }
                  placeholder={t.submitModelHostingPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitVerificationLabel}
                </span>
                <input
                  type="url"
                  required
                  value={submitForm.verificationUrl}
                  onChange={(e) =>
                    updateSubmitField("verificationUrl", e.target.value)
                  }
                  placeholder={t.submitVerificationPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitEmailLabel}
                </span>
                <input
                  type="email"
                  value={submitForm.email}
                  onChange={(e) => updateSubmitField("email", e.target.value)}
                  placeholder={t.submitEmailPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitNotesLabel}
                </span>
                <textarea
                  value={submitForm.notes}
                  onChange={(e) => updateSubmitField("notes", e.target.value)}
                  placeholder={t.submitNotesPlaceholder}
                  rows={3}
                  className="w-full resize-y border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={closeSubmitModal}
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  {t.submitCancel}
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="inline-flex items-center gap-2 border border-indigo-700 bg-indigo-700 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 disabled:opacity-60"
                >
                  <PlusCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {submitLoading ? t.submitLoading : t.submitForReview}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
