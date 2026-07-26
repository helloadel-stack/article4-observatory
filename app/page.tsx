"use client";

import { useState } from "react";
import {
  Search,
  ShieldCheck,
  Globe,
  Database,
  Filter,
  ExternalLink,
} from "lucide-react";
import observatoryData from "@/data/data.json";

type Lang = "EN" | "FR" | "DE" | "AR";
type SovereigntyFilter = "all" | "Sovereign" | "Dependent";

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

const data = observatoryData as ObservatoryEntry[];

const translations = {
  EN: {
    brand: "Article 4 Institute",
    platform: "European AI Sovereignty Observatory",
    heroTitle: "Mapping public-sector AI adoption across Europe",
    heroText:
      "An independent research instrument tracking European public administrations’ AI tool deployments, infrastructure sovereignty, and readiness under the EU AI Act. Built for policymakers, compliance officers, and civic technologists.",
    totalEntities: "Total Entities Monitored",
    sovereignPct: "Sovereign Infrastructure %",
    compliancePct: "Compliance %",
    coverageRegion: "Active Coverage Region",
    explorerTitle: "Data Explorer",
    explorerSubtitle:
      "Filter monitored agencies and tools by name, country, and hosting sovereignty.",
    searchPlaceholder: "Search by agency or tool name…",
    countryFilter: "Country",
    sovereigntyFilter: "Sovereignty type",
    allCountries: "All countries",
    allTypes: "All types",
    sovereign: "Sovereign",
    dependent: "Dependent",
    colAgency: "Agency",
    colCountry: "Country",
    colTool: "Tool",
    colModel: "Primary Model",
    colHosting: "Hosting Provider",
    colSovereignty: "Sovereignty",
    colCompliance: "EU AI Act Status",
    colUpdated: "Last Updated",
    noResults: "No records match the current filters.",
    methodologyTitle: "Methodology & Neutrality",
    methodologyText:
      "The Article 4 Institute maintains this Observatory as an open, non-partisan research framework. Entries are drawn from publicly verifiable sources and institutional disclosures. Classifications of “Sovereign” and “Dependent” hosting reflect infrastructure jurisdiction and operational control, not political endorsement. Datasets are versioned and open to scholarly scrutiny.",
    footerCopy: "© 2026 Article 4 Institute. All rights reserved.",
    footerLink: "article4institute.org",
    results: "results",
  },
  FR: {
    brand: "Article 4 Institute",
    platform: "Observatoire européen de la souveraineté de l’IA",
    heroTitle: "Cartographier l’adoption de l’IA dans le secteur public européen",
    heroText:
      "Un instrument de recherche indépendant suivant les déploiements d’outils d’IA dans les administrations publiques européennes, la souveraineté des infrastructures et la préparation au règlement européen sur l’IA. Conçu pour les décideurs, les responsables conformité et les technologues civiques.",
    totalEntities: "Entités suivies au total",
    sovereignPct: "% d’infrastructure souveraine",
    compliancePct: "% de conformité",
    coverageRegion: "Région de couverture active",
    explorerTitle: "Explorateur de données",
    explorerSubtitle:
      "Filtrez les agences et outils suivis par nom, pays et souveraineté d’hébergement.",
    searchPlaceholder: "Rechercher par agence ou outil…",
    countryFilter: "Pays",
    sovereigntyFilter: "Type de souveraineté",
    allCountries: "Tous les pays",
    allTypes: "Tous les types",
    sovereign: "Souverain",
    dependent: "Dépendant",
    colAgency: "Agence",
    colCountry: "Pays",
    colTool: "Outil",
    colModel: "Modèle principal",
    colHosting: "Fournisseur d’hébergement",
    colSovereignty: "Souveraineté",
    colCompliance: "Statut AI Act UE",
    colUpdated: "Dernière mise à jour",
    noResults: "Aucun enregistrement ne correspond aux filtres actuels.",
    methodologyTitle: "Méthodologie et neutralité",
    methodologyText:
      "L’Article 4 Institute maintient cet Observatoire comme un cadre de recherche ouvert et non partisan. Les entrées proviennent de sources publiques vérifiables et de divulgations institutionnelles. Les classifications « Souverain » et « Dépendant » reflètent la juridiction et le contrôle opérationnel des infrastructures, et non un endossement politique. Les jeux de données sont versionnés et ouverts à l’examen scientifique.",
    footerCopy: "© 2026 Article 4 Institute. Tous droits réservés.",
    footerLink: "article4institute.org",
    results: "résultats",
  },
  DE: {
    brand: "Article 4 Institute",
    platform: "Europäisches Observatorium für KI-Souveränität",
    heroTitle: "KI-Einführung im europäischen öffentlichen Sektor erfassen",
    heroText:
      "Ein unabhängiges Forschungsinstrument zur Erfassung von KI-Werkzeugeinsätzen in europäischen Verwaltungen, der Souveränität der Infrastruktur und der Bereitschaft gemäß dem EU-KI-Gesetz. Für politische Entscheider, Compliance-Verantwortliche und Civic Technologists.",
    totalEntities: "Überwachte Einrichtungen gesamt",
    sovereignPct: "Anteil souveräner Infrastruktur",
    compliancePct: "Compliance-Anteil",
    coverageRegion: "Aktiver Abdeckungsraum",
    explorerTitle: "Datenexplorer",
    explorerSubtitle:
      "Filtern Sie überwachte Behörden und Tools nach Name, Land und Hosting-Souveränität.",
    searchPlaceholder: "Nach Behörde oder Tool suchen…",
    countryFilter: "Land",
    sovereigntyFilter: "Souveränitätstyp",
    allCountries: "Alle Länder",
    allTypes: "Alle Typen",
    sovereign: "Souverän",
    dependent: "Abhängig",
    colAgency: "Behörde",
    colCountry: "Land",
    colTool: "Tool",
    colModel: "Primäres Modell",
    colHosting: "Hosting-Anbieter",
    colSovereignty: "Souveränität",
    colCompliance: "EU-KI-Gesetz-Status",
    colUpdated: "Zuletzt aktualisiert",
    noResults: "Keine Einträge entsprechen den aktuellen Filtern.",
    methodologyTitle: "Methodik & Neutralität",
    methodologyText:
      "Das Article 4 Institute betreibt dieses Observatorium als offenes, überparteiliches Forschungsframework. Einträge stammen aus öffentlich überprüfbaren Quellen und institutionellen Offenlegungen. Die Klassifikationen „Souverän“ und „Abhängig“ spiegeln Infrastrukturzuständigkeit und operative Kontrolle wider – keine politische Empfehlung. Datensätze sind versioniert und wissenschaftlich überprüfbar.",
    footerCopy: "© 2026 Article 4 Institute. Alle Rechte vorbehalten.",
    footerLink: "article4institute.org",
    results: "Ergebnisse",
  },
  AR: {
    brand: "معهد المادة 4",
    platform: "مرصد السيادة الأوروبية في الذكاء الاصطناعي",
    heroTitle: "تتبع تبنّي الذكاء الاصطناعي في القطاع العام الأوروبي",
    heroText:
      "أداة بحث مستقلة ترصد نشر أدوات الذكاء الاصطناعي لدى الإدارات العامة الأوروبية، وسيادة البنية التحتية، وجاهزية الامتثال لقانون الذكاء الاصطناعي للاتحاد الأوروبي. موجهة لصنّاع السياسات ومسؤولي الامتثال وتقنيي القطاع العام.",
    totalEntities: "إجمالي الجهات المراقَبة",
    sovereignPct: "نسبة البنية السيادية",
    compliancePct: "نسبة الامتثال",
    coverageRegion: "نطاق التغطية النشط",
    explorerTitle: "مستكشف البيانات",
    explorerSubtitle:
      "صفِّ الجهات والأدوات حسب الاسم أو البلد أو نوع سيادة الاستضافة.",
    searchPlaceholder: "ابحث باسم الجهة أو الأداة…",
    countryFilter: "البلد",
    sovereigntyFilter: "نوع السيادة",
    allCountries: "كل البلدان",
    allTypes: "كل الأنواع",
    sovereign: "سيادي",
    dependent: "تابع",
    colAgency: "الجهة",
    colCountry: "البلد",
    colTool: "الأداة",
    colModel: "النموذج الأساسي",
    colHosting: "مزوّد الاستضافة",
    colSovereignty: "السيادة",
    colCompliance: "حالة قانون الذكاء الاصطناعي",
    colUpdated: "آخر تحديث",
    noResults: "لا توجد سجلات مطابقة للمرشحات الحالية.",
    methodologyTitle: "المنهجية والحياد",
    methodologyText:
      "يحافظ معهد المادة 4 على هذا المرصد كإطار بحثي مفتوح وغير حزبي. تُستمد الإدخالات من مصادر عامة قابلة للتحقق وإفصاحات مؤسسية. تصنيفا «سيادي» و«تابع» يعكسان ولاية البنية التحتية والسيطرة التشغيلية، لا تأييداً سياسياً. تُصدَر مجموعات البيانات بإصدارات وتكون مفتوحة للمراجعة العلمية.",
    footerCopy: "© 2026 معهد المادة 4. جميع الحقوق محفوظة.",
    footerLink: "article4institute.org",
    results: "نتائج",
  },
} as const;

const LANGS: Lang[] = ["EN", "FR", "DE", "AR"];

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
  const [lang, setLang] = useState<Lang>("EN");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [sovereignty, setSovereignty] = useState<SovereigntyFilter>("all");

  const t = translations[lang];
  const dir = lang === "AR" ? "rtl" : "ltr";

  const countries = Array.from(new Set(data.map((d) => d.country))).sort();

  const total = data.length;
  const sovereignCount = data.filter(
    (d) => d.sovereigntyType === "Sovereign",
  ).length;
  const highCompliance = data.filter(
    (d) => d.euAiActStatus === "High Compliance",
  ).length;
  const regionCount = new Set(data.map((d) => d.country)).size;
  const metrics = {
    total,
    sovereignPct: total ? Math.round((sovereignCount / total) * 100) : 0,
    compliancePct: total ? Math.round((highCompliance / total) * 100) : 0,
    regionCount,
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

  return (
    <div dir={dir} className="min-h-full flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-sm font-semibold tracking-wide text-slate-300">
              {t.brand}
            </span>
            <span className="hidden text-slate-600 sm:inline" aria-hidden>
              |
            </span>
            <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
              {t.platform}
            </h1>
          </div>
          <nav
            aria-label="Language"
            className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-800 p-1"
          >
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={
                  lang === code
                    ? "rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-slate-900"
                    : "rounded-md px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                }
                aria-pressed={lang === code}
              >
                {code}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="border border-slate-200 bg-white px-6 py-8 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {t.brand}
          </p>
          <h2 className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {t.heroTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            {t.heroText}
          </p>
        </section>

        {/* Metric cards */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="border border-slate-200 bg-white p-5">
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
          <article className="border border-slate-200 bg-white p-5">
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
          <article className="border border-slate-200 bg-white p-5">
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
          <article className="border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {t.coverageRegion}
              </p>
              <Globe className="h-5 w-5 text-slate-400" aria-hidden />
            </div>
            <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {metrics.regionCount}{" "}
              <span className="text-base font-medium text-slate-500">EU</span>
            </p>
          </article>
        </section>

        {/* Data Explorer */}
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
                className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 start-3"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full border border-slate-200 bg-slate-50 py-2 pe-3 ps-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-slate-500">
                {t.countryFilter}
              </span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <option value="all">{t.allCountries}</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
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
                className="w-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <option value="all">{t.allTypes}</option>
                <option value="Sovereign">{t.sovereign}</option>
                <option value="Dependent">{t.dependent}</option>
              </select>
            </label>
          </div>

          <div className="px-6 py-3 text-xs font-medium text-slate-500">
            {filtered.length} {t.results}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-start text-sm">
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
                    <tr key={row.id} className="hover:bg-slate-50/80">
                      <td className="max-w-[14rem] px-4 py-3 font-medium text-slate-900">
                        {row.agency}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {row.country}
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
                        {row.euAiActStatus}
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

        {/* Methodology */}
        <section className="mt-8 border border-slate-200 bg-white px-6 py-6 sm:px-8">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-slate-500"
              aria-hidden
            />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {t.methodologyTitle}
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
                {t.methodologyText}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{t.footerCopy}</p>
          <a
            href="https://article4institute.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:underline"
          >
            {t.footerLink}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </footer>
    </div>
  );
}
