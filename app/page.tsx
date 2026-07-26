"use client";

import { useState } from "react";
import {
  Search,
  ShieldCheck,
  Globe,
  Database,
  Filter,
  ExternalLink,
  Download,
  BookOpen,
  Quote,
  Copy,
  Check,
  X,
  User,
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

const INSTITUTE_URL = "https://article4institute.org";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/l-institut-article-4-a4i/";
const AUTHOR_NAME = "Adel El Bouzagaoui";
const PUBLISHER_NAME = "L'Institut Article 4 (A4I)";
const DATASET_TITLE = "European AI Sovereignty Index";
const APA_CITATION = `Article 4 Institute. (2026). ${DATASET_TITLE}. ${INSTITUTE_URL}`;
const BIBTEX_CITATION = `@misc{article4institute2026easi,
  author       = {{Article 4 Institute}},
  title        = {${DATASET_TITLE}},
  year         = {2026},
  howpublished = {\\url{${INSTITUTE_URL}}},
  note         = {Lead Researcher: ${AUTHOR_NAME}}
}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ResearchProject",
      name: DATASET_TITLE,
      description:
        "An independent research instrument mapping public-sector AI adoption, infrastructure sovereignty, and EU AI Act readiness across Europe.",
      url: INSTITUTE_URL,
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
        jobTitle: "Lead Researcher & Founder",
      },
      publisher: {
        "@type": "Organization",
        name: PUBLISHER_NAME,
        url: INSTITUTE_URL,
        sameAs: [LINKEDIN_URL],
      },
    },
    {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: INSTITUTE_URL,
      sameAs: [LINKEDIN_URL],
      description:
        "A neutral French non-profit initiative (Association 1901) dedicated to European digital resilience and open methodology.",
      founder: {
        "@type": "Person",
        name: AUTHOR_NAME,
        jobTitle: "Founder & Lead Researcher",
      },
    },
  ],
};

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
    downloadCsv: "Download CSV",
    citeDataset: "Cite This Dataset",
    citeModalTitle: "Cite This Dataset",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copy Citation",
    copied: "Copied",
    close: "Close",
    methodologyTitle: "Methodology & Open Research",
    methodologyText:
      "The Article 4 Institute maintains this Observatory as an open, non-partisan research framework. Entries are drawn from publicly verifiable sources and institutional disclosures. Classifications of “Sovereign” and “Dependent” hosting reflect infrastructure jurisdiction and operational control, not political endorsement. Datasets are versioned and open to scholarly scrutiny.",
    safeAiDisclosure:
      "Automated compliance assessment and security benchmarking powered by the open audit framework at SafeAI.report.",
    poweredBySafeAi: "Powered by SafeAI.report",
    aboutTitle: "About the Institute & Research Team",
    leadResearcher: "Lead Researcher",
    founderRole: "Founder & Lead Researcher",
    aboutLeadName: "Adel El Bouzagaoui",
    aboutText:
      "The Article 4 Institute is a neutral French non-profit initiative (Association 1901) dedicated to European digital resilience and open methodology. Led by Adel El Bouzagaoui as Founder & Lead Researcher, the Institute publishes transparent, reproducible indicators for public-sector AI sovereignty and EU AI Act readiness.",
    connectLinkedIn: "Connect on LinkedIn",
    footerCopy: "© 2026 Article 4 Institute. All rights reserved.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
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
    downloadCsv: "Télécharger CSV",
    citeDataset: "Citer ce jeu de données",
    citeModalTitle: "Citer ce jeu de données",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copier la citation",
    copied: "Copié",
    close: "Fermer",
    methodologyTitle: "Méthodologie et recherche ouverte",
    methodologyText:
      "L’Article 4 Institute maintient cet Observatoire comme un cadre de recherche ouvert et non partisan. Les entrées proviennent de sources publiques vérifiables et de divulgations institutionnelles. Les classifications « Souverain » et « Dépendant » reflètent la juridiction et le contrôle opérationnel des infrastructures, et non un endossement politique. Les jeux de données sont versionnés et ouverts à l’examen scientifique.",
    safeAiDisclosure:
      "Évaluation automatisée de la conformité et analyse comparative de la sécurité alimentées par le cadre d’audit ouvert de SafeAI.report.",
    poweredBySafeAi: "Propulsé par SafeAI.report",
    aboutTitle: "À propos de l’Institut et de l’équipe de recherche",
    leadResearcher: "Chercheur principal",
    founderRole: "Fondateur et chercheur principal",
    aboutLeadName: "Adel El Bouzagaoui",
    aboutText:
      "L’Article 4 Institute est une initiative associative française neutre (Association loi 1901) dédiée à la résilience numérique européenne et à une méthodologie ouverte. Sous la direction d’Adel El Bouzagaoui, Fondateur et chercheur principal, l’Institut publie des indicateurs transparents et reproductibles sur la souveraineté de l’IA dans le secteur public et la préparation au règlement européen sur l’IA.",
    connectLinkedIn: "Suivez-nous sur LinkedIn",
    footerCopy: "© 2026 Article 4 Institute. Tous droits réservés.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
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
    downloadCsv: "CSV herunterladen",
    citeDataset: "Datensatz zitieren",
    citeModalTitle: "Datensatz zitieren",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Zitat kopieren",
    copied: "Kopiert",
    close: "Schließen",
    methodologyTitle: "Methodik & offene Forschung",
    methodologyText:
      "Das Article 4 Institute betreibt dieses Observatorium als offenes, überparteiliches Forschungsframework. Einträge stammen aus öffentlich überprüfbaren Quellen und institutionellen Offenlegungen. Die Klassifikationen „Souverän“ und „Abhängig“ spiegeln Infrastrukturzuständigkeit und operative Kontrolle wider – keine politische Empfehlung. Datensätze sind versioniert und wissenschaftlich überprüfbar.",
    safeAiDisclosure:
      "Automatisierte Compliance-Bewertung und Sicherheits-Benchmarking basieren auf dem offenen Audit-Framework von SafeAI.report.",
    poweredBySafeAi: "Unterstützt von SafeAI.report",
    aboutTitle: "Über das Institut & Forschungsteam",
    leadResearcher: "Leitender Forscher",
    founderRole: "Gründer & leitender Forscher",
    aboutLeadName: "Adel El Bouzagaoui",
    aboutText:
      "Das Article 4 Institute ist eine neutrale französische Non-Profit-Initiative (Association 1901), die sich europäischer digitaler Resilienz und offener Methodik widmet. Unter der Leitung von Adel El Bouzagaoui als Gründer und leitendem Forscher veröffentlicht das Institut transparente, reproduzierbare Indikatoren zur KI-Souveränität im öffentlichen Sektor und zur Bereitschaft gemäß dem EU-KI-Gesetz.",
    connectLinkedIn: "Auf LinkedIn verbinden",
    footerCopy: "© 2026 Article 4 Institute. Alle Rechte vorbehalten.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
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
    downloadCsv: "تنزيل CSV",
    citeDataset: "الاستشهاد بمجموعة البيانات",
    citeModalTitle: "الاستشهاد بمجموعة البيانات",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "نسخ الاستشهاد",
    copied: "تم النسخ",
    close: "إغلاق",
    methodologyTitle: "المنهجية والبحث المفتوح",
    methodologyText:
      "يحافظ معهد المادة 4 على هذا المرصد كإطار بحثي مفتوح وغير حزبي. تُستمد الإدخالات من مصادر عامة قابلة للتحقق وإفصاحات مؤسسية. تصنيفا «سيادي» و«تابع» يعكسان ولاية البنية التحتية والسيطرة التشغيلية، لا تأييداً سياسياً. تُصدَر مجموعات البيانات بإصدارات وتكون مفتوحة للمراجعة العلمية.",
    safeAiDisclosure:
      "تقييم الامتثال الآلي وقياس الأداء الأمني مدعومان بإطار التدقيق المفتوح في SafeAI.report.",
    poweredBySafeAi: "مدعوم من SafeAI.report",
    aboutTitle: "عن المعهد وفريق البحث",
    leadResearcher: "الباحث الرئيسي",
    founderRole: "المؤسس والباحث الرئيسي",
    aboutLeadName: "Adel El Bouzagaoui",
    aboutText:
      "معهد المادة 4 مبادرة فرنسية غير ربحية محايدة (جمعية وفق قانون 1901) مكرّسة للمرونة الرقمية الأوروبية والمنهجية المفتوحة. يقوده Adel El Bouzagaoui بصفته المؤسس والباحث الرئيسي، وينشر المعهد مؤشرات شفافة وقابلة للتكرار حول سيادة الذكاء الاصطناعي في القطاع العام وجاهزية الامتثال لقانون الذكاء الاصطناعي للاتحاد الأوروبي.",
    connectLinkedIn: "تابعنا على لينكد إن",
    footerCopy: "© 2026 معهد المادة 4. جميع الحقوق محفوظة.",
    footerLink: "article4institute.org",
    footerLinkedIn: "لينكد إن",
    results: "نتائج",
  },
} as const;

const LANGS: Lang[] = ["EN", "FR", "DE", "AR"];

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
  const [lang, setLang] = useState<Lang>("EN");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [sovereignty, setSovereignty] = useState<SovereigntyFilter>("all");
  const [citeOpen, setCiteOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<"apa" | "bibtex" | null>(null);

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

  const handleCopy = async (key: "apa" | "bibtex", text: string) => {
    const ok = await copyText(text);
    if (ok) {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div dir={dir} className="min-h-full flex flex-col bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label={t.connectLinkedIn}
            >
              <LinkedInIcon className="h-4 w-4" aria-hidden />
            </a>
            <nav
              aria-label="Language"
              className="flex items-center gap-1 rounded-lg bg-slate-800 p-1"
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

          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-slate-500">
              {filtered.length} {t.results}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => downloadFilteredCsv(filtered)}
                className="inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <Download className="h-3.5 w-3.5" aria-hidden />
                {t.downloadCsv}
              </button>
              <button
                type="button"
                onClick={() => setCiteOpen(true)}
                className="inline-flex items-center gap-2 border border-slate-300 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                {t.citeDataset}
              </button>
            </div>
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
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">
                {t.safeAiDisclosure.split("SafeAI.report").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <a
                        href="https://safeai.report"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-900 underline underline-offset-2 hover:text-slate-700"
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

        {/* About Institute & Research Team */}
        <section className="mt-8 border border-slate-200 bg-white px-6 py-6 sm:px-8">
          <div className="flex items-start gap-3">
            <User
              className="mt-0.5 h-5 w-5 shrink-0 text-slate-500"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold tracking-tight">
                {t.aboutTitle}
              </h2>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
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
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-400"
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

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{t.footerCopy}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:underline"
            >
              <LinkedInIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {t.footerLinkedIn}
            </a>
            <a
              href={INSTITUTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:underline"
            >
              {t.footerLink}
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </footer>

      {/* Cite modal */}
      {citeOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cite-modal-title"
          onClick={() => setCiteOpen(false)}
        >
          <div
            dir={dir}
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
    </div>
  );
}
