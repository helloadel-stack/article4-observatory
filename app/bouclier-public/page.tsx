"use client";

import {
  BOUCLIER_PUBLIC,
  BRAND,
  DEFAULT_LANG,
  SITE_METADATA,
  SUPPORTED_LANGS,
  type Lang,
} from "@/src/config/constants";
import { useSyncedLang } from "@/src/lib/useSyncedLang";
import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Hospital,
  Landmark,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import BouclierAttestationForm from "@/components/BouclierAttestationForm";
import HtmlLangSync from "@/components/HtmlLangSync";

const BUNDLE_HREF = BOUCLIER_PUBLIC.bundlePath;

const AUDIENCE_ICONS = {
  collectivites: Landmark,
  hopitaux: Hospital,
  dgs: Users,
  administrations: Building2,
} as const;

type AudienceKey = keyof typeof AUDIENCE_ICONS;

const pageCopy = {
  FR: {
    langLabel: "Langue de l'interface",
    back: "Retour à l'Observatoire",
    headerSubtitle: "Secteur public francophone",
    banner: `Initiative pro bono · Article 4 Institute · Journalisation cryptographique via ${BRAND.waqfLedgerUrl.replace("https://", "")}`,
    navModules: "Modules",
    navBundle: "Bundle open source",
    navScorecard: "Scorecard",
    downloadShort: "Télécharger",
    badge: "Programme Non-Lucratif & Open Source (CC BY-NC 4.0)",
    title: "Bouclier IA Publique",
    titleAccent: "(Safe Public AI Shield)",
    subtitle:
      "Cadre opérationnel de gouvernance et de préparation à l'AI Act pour les collectivités, hôpitaux et institutions publiques francophones.",
    ctaPrimary: "Télécharger le bundle 4 modules",
    ctaSecondary: "Générer une attestation",
    audience: [
      { key: "collectivites" as AudienceKey, label: "Collectivités territoriales" },
      { key: "hopitaux" as AudienceKey, label: "Hôpitaux (CH / CHU)" },
      { key: "dgs" as AudienceKey, label: "DGS · DSI · DPO" },
      { key: "administrations" as AudienceKey, label: "Administrations publiques" },
    ],
    alignmentHeading: "Alignement régional",
    alignmentSubtitle:
      "Le Bouclier IA Publique est conçu pour rester compatible avec les cadres nationaux de la francophonie européenne.",
    regionalBadges: [
      {
        region: "France",
        body: "Compatible DINUM / CNIL — gouvernance & protection des données",
      },
      {
        region: "Belgique",
        body: "Aligné APD — autorité de protection des données",
      },
      {
        region: "Suisse",
        body: "Compatible nLPD / PFPDT — cadre fédéral de protection des données",
      },
    ],
    modulesEyebrow: "Parcours opérationnel",
    modulesTitle: "Les 4 modules du Bouclier",
    modulesSubtitle:
      "Dépliez chaque module pour découvrir les livrables prêts à déployer dans votre collectivité, CH/CHU ou administration.",
    moduleLabel: "Module",
    modules: [
      {
        id: 1,
        title: "Diagnostic Shadow AI & Charte d'Usage (Art. 4)",
        summary:
          "Cartographiez les usages non déclarés et adoptez une charte d'usage alignée sur les obligations de littératie IA de l'Article 4.",
        deliverables: [
          "Matrice Shadow AI (.xlsx)",
          "Charte d'usage institutionnelle (.docx)",
          "Plan de sensibilisation DGS/DSI/DPO (.pdf)",
        ],
      },
      {
        id: 2,
        title: "La Boussole du Risque IA™ & Clause Marchés Publics (CCAP)",
        summary:
          "Arbre décisionnel pour qualifier les systèmes IA et clause type à insérer dans les cahiers des charges (CCAP) imposant la transparence et la souveraineté.",
        deliverables: [
          "Boussole du Risque IA™ (.xlsx)",
          "Clause Type CCAP Marchés Publics IA (.docx)",
          "Grille d'évaluation fournisseurs (.pdf)",
        ],
      },
      {
        id: 3,
        title: "Registre Général & Transparence Algorithmique (Art. 50)",
        summary:
          "Inventaire public des algorithmes déployés, traçabilité des consignes structurantes et chaîne d'arbitrage humain.",
        deliverables: [
          "Registre des Modèles & Prompts à Haut Impact (.xlsx)",
          "Protocoles de Supervision Humaine (.docx)",
          "Formulaire de signalement d'incident (.pdf)",
        ],
      },
      {
        id: 4,
        title: "Scorecard Exécutif (Niveaux 0 à 5) & Feuille de Route",
        summary:
          "Auto-évaluation de maturité et chronogramme d'actions à 6 et 12 mois pour le comité de gouvernance.",
        deliverables: [
          "Scorecard de Maturité IA Publique (.pdf)",
          "Roadmap stratégique 6/12 mois (.docx)",
          "Guide de structuration du Comité IA (.pdf)",
        ],
      },
    ],
    bundleEyebrow: "Bundle gratuit · CC BY-NC 4.0",
    bundleTitle: "Pack open source des 4 modules",
    bundleBody:
      "Téléchargez le package complet de modèles opérationnels — charte et diagnostic (.docx), boussole de risque (.xlsx), registres et scorecard (.pdf) — sans coût de licence pour le secteur public.",
    bundleCta: "Télécharger le package complet",
    bundleNote: "Archive ZIP · modèles éditables · usage non commercial",
    footerNote:
      "Bouclier IA Publique — programme non-lucratif sous licence CC BY-NC 4.0",
    footerObservatory: "Observatoire",
    footerPrivacy: "Confidentialité",
    footerGdpr: "RGPD",
  },
  EN: {
    langLabel: "Interface language",
    back: "Back to Observatory",
    headerSubtitle: "Francophone public sector",
    banner: `Pro bono initiative · Article 4 Institute · Cryptographic logging via ${BRAND.waqfLedgerUrl.replace("https://", "")}`,
    navModules: "Modules",
    navBundle: "Open source bundle",
    navScorecard: "Scorecard",
    downloadShort: "Download",
    badge: "Non-Profit & Open Source Programme (CC BY-NC 4.0)",
    title: "Public AI Shield",
    titleAccent: "(Bouclier IA Publique)",
    subtitle:
      "Operational AI governance and AI Act readiness framework for municipalities, hospitals, and francophone public institutions.",
    ctaPrimary: "Download the 4-module bundle",
    ctaSecondary: "Generate an attestation",
    audience: [
      { key: "collectivites" as AudienceKey, label: "Local governments" },
      { key: "hopitaux" as AudienceKey, label: "Hospitals (public / university)" },
      { key: "dgs" as AudienceKey, label: "CIO · IT · DPO teams" },
      { key: "administrations" as AudienceKey, label: "Public administrations" },
    ],
    alignmentHeading: "Regional alignment",
    alignmentSubtitle:
      "The Public AI Shield is designed to remain compatible with national frameworks across European francophone jurisdictions.",
    regionalBadges: [
      {
        region: "France",
        body: "DINUM / CNIL compatible — governance & data protection",
      },
      {
        region: "Belgium",
        body: "APD aligned — data protection authority",
      },
      {
        region: "Switzerland",
        body: "nLPD / PFPDT compatible — federal data-protection framework",
      },
    ],
    modulesEyebrow: "Operational track",
    modulesTitle: "The Shield's 4 modules",
    modulesSubtitle:
      "Expand each module to discover deliverables ready to deploy in your municipality, hospital, or administration.",
    moduleLabel: "Module",
    modules: [
      {
        id: 1,
        title: "Shadow AI Diagnostic & Use Charter (Art. 4)",
        summary:
          "Map undeclared AI use and adopt an institutional use charter aligned with Article 4 AI literacy obligations.",
        deliverables: [
          "Shadow AI Matrix (.xlsx)",
          "Institutional Use Charter (.docx)",
          "Awareness Plan for CIO/IT/DPO (.pdf)",
        ],
      },
      {
        id: 2,
        title: "AI Risk Compass™ & Public Procurement Clause (CCAP)",
        summary:
          "Decision tree to qualify AI systems and a model clause for procurement specifications (CCAP) requiring transparency and sovereignty.",
        deliverables: [
          "AI Risk Compass™ (.xlsx)",
          "Model CCAP AI Public Procurement Clause (.docx)",
          "Vendor Evaluation Grid (.pdf)",
        ],
      },
      {
        id: 3,
        title: "General Register & Algorithmic Transparency (Art. 50)",
        summary:
          "Public inventory of deployed algorithms, traceability of structuring prompts, and the human arbitration chain.",
        deliverables: [
          "High-Impact Models & Prompts Register (.xlsx)",
          "Human Oversight Protocols (.docx)",
          "Incident Reporting Form (.pdf)",
        ],
      },
      {
        id: 4,
        title: "Executive Scorecard (Levels 0–5) & Roadmap",
        summary:
          "Maturity self-assessment and a 6- and 12-month action timeline for the governance committee.",
        deliverables: [
          "Public AI Maturity Scorecard (.pdf)",
          "Strategic Roadmap 6/12 months (.docx)",
          "AI Committee Structuring Guide (.pdf)",
        ],
      },
    ],
    bundleEyebrow: "Free bundle · CC BY-NC 4.0",
    bundleTitle: "Open source 4-module pack",
    bundleBody:
      "Download the full package of operational templates — charter and diagnostic (.docx), risk compass (.xlsx), registers and scorecard (.pdf) — at no licence cost for the public sector.",
    bundleCta: "Download the full package",
    bundleNote: "ZIP archive · editable templates · non-commercial use",
    footerNote:
      "Public AI Shield — non-profit programme under CC BY-NC 4.0 licence",
    footerObservatory: "Observatory",
    footerPrivacy: "Privacy",
    footerGdpr: "GDPR",
  },
  ES: {
    langLabel: "Idioma de la interfaz",
    back: "Volver al Observatorio",
    headerSubtitle: "Sector público francófono",
    banner: `Iniciativa pro bono · Article 4 Institute · Registro criptográfico vía ${BRAND.waqfLedgerUrl.replace("https://", "")}`,
    navModules: "Módulos",
    navBundle: "Bundle open source",
    navScorecard: "Scorecard",
    downloadShort: "Descargar",
    badge: "Programa Sin Fines de Lucro & Open Source (CC BY-NC 4.0)",
    title: "Escudo IA Pública",
    titleAccent: "(Bouclier IA Publique)",
    subtitle:
      "Marco operativo de gobernanza y preparación para el AI Act para colectividades, hospitales e instituciones públicas francófonas.",
    ctaPrimary: "Descargar el bundle de 4 módulos",
    ctaSecondary: "Generar una attestation",
    audience: [
      { key: "collectivites" as AudienceKey, label: "Colectividades territoriales" },
      { key: "hopitaux" as AudienceKey, label: "Hospitales (públicos / universitarios)" },
      { key: "dgs" as AudienceKey, label: "DGS · DSI · DPO" },
      { key: "administrations" as AudienceKey, label: "Administraciones públicas" },
    ],
    alignmentHeading: "Alineación regional",
    alignmentSubtitle:
      "El Escudo IA Pública está diseñado para mantenerse compatible con los marcos nacionales de la francofonía europea.",
    regionalBadges: [
      {
        region: "Francia",
        body: "Compatible DINUM / CNIL — gobernanza y protección de datos",
      },
      {
        region: "Bélgica",
        body: "Alineado APD — autoridad de protección de datos",
      },
      {
        region: "Suiza",
        body: "Compatible nLPD / PFPDT — marco federal de protección de datos",
      },
    ],
    modulesEyebrow: "Itinerario operativo",
    modulesTitle: "Los 4 módulos del Escudo",
    modulesSubtitle:
      "Despliegue cada módulo para descubrir los entregables listos para implementar en su colectividad, hospital o administración.",
    moduleLabel: "Módulo",
    modules: [
      {
        id: 1,
        title: "Diagnóstico Shadow AI & Carta de Uso (Art. 4)",
        summary:
          "Cartografíe los usos no declarados y adopte una carta de uso alineada con las obligaciones de alfabetización IA del Artículo 4.",
        deliverables: [
          "Matriz Shadow AI (.xlsx)",
          "Carta de uso institucional (.docx)",
          "Plan de sensibilización DGS/DSI/DPO (.pdf)",
        ],
      },
      {
        id: 2,
        title: "La Brújula del Riesgo IA™ & Cláusula de Contratación Pública (CCAP)",
        summary:
          "Árbol de decisión para calificar los sistemas de IA y cláusula tipo para insertar en los pliegos de condiciones (CCAP) que impone transparencia y soberanía.",
        deliverables: [
          "Brújula del Riesgo IA™ (.xlsx)",
          "Cláusula Tipo CCAP Contratación Pública IA (.docx)",
          "Cuadrícula de evaluación de proveedores (.pdf)",
        ],
      },
      {
        id: 3,
        title: "Registro General & Transparencia Algorítmica (Art. 50)",
        summary:
          "Inventario público de los algoritmos desplegados, trazabilidad de las consignas estructurantes y cadena de arbitraje humano.",
        deliverables: [
          "Registro de Modelos y Prompts de Alto Impacto (.xlsx)",
          "Protocolos de Supervisión Humana (.docx)",
          "Formulario de notificación de incidentes (.pdf)",
        ],
      },
      {
        id: 4,
        title: "Scorecard Ejecutivo (Niveles 0 a 5) & Hoja de Ruta",
        summary:
          "Autoevaluación de madurez y cronograma de acciones a 6 y 12 meses para el comité de gobernanza.",
        deliverables: [
          "Scorecard de Madurez IA Pública (.pdf)",
          "Hoja de ruta estratégica 6/12 meses (.docx)",
          "Guía de estructuración del Comité IA (.pdf)",
        ],
      },
    ],
    bundleEyebrow: "Bundle gratuito · CC BY-NC 4.0",
    bundleTitle: "Pack open source de 4 módulos",
    bundleBody:
      "Descargue el paquete completo de modelos operativos — carta y diagnóstico (.docx), brújula de riesgo (.xlsx), registros y scorecard (.pdf) — sin coste de licencia para el sector público.",
    bundleCta: "Descargar el paquete completo",
    bundleNote: "Archivo ZIP · modelos editables · uso no comercial",
    footerNote:
      "Escudo IA Pública — programa sin fines de lucro bajo licencia CC BY-NC 4.0",
    footerObservatory: "Observatorio",
    footerPrivacy: "Privacidad",
    footerGdpr: "RGPD",
  },
} as const;

function LangToggle({
  lang,
  onChange,
  ariaLabel,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex shrink-0 rounded-lg border border-slate-700 bg-slate-900 p-1"
    >
      {SUPPORTED_LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={
            lang === code
              ? "rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white"
              : "rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
          }
          aria-pressed={lang === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export default function BouclierPublicPage() {
  const [lang, handleLangChange] = useSyncedLang(DEFAULT_LANG);
  const [openModule, setOpenModule] = useState<number | null>(1);
  const t = pageCopy[lang];

  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-100">
      <HtmlLangSync lang={lang} />

      <div className="border-b border-indigo-900/80 bg-indigo-950">
        <p className="mx-auto max-w-6xl px-4 py-2.5 text-center text-xs font-medium tracking-wide text-indigo-100 sm:px-6 sm:text-sm">
          {t.banner}
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <Link
              href="/"
              className="text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
            >
              ← {t.back}
            </Link>
            <p className="mt-1 truncate text-xs text-slate-500">
              {BRAND.institute} · {t.headerSubtitle}
            </p>
          </div>
          <nav
            aria-label="Navigation Bouclier"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-400"
          >
            <a href="#modules" className="transition hover:text-white">
              {t.navModules}
            </a>
            <a href="#bundle" className="transition hover:text-white">
              {t.navBundle}
            </a>
            <a href="#scorecard" className="transition hover:text-white">
              {t.navScorecard}
            </a>
            <LangToggle
              lang={lang}
              onChange={handleLangChange}
              ariaLabel={t.langLabel}
            />
            <a
              href={BUNDLE_HREF}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              {t.downloadShort}
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <section
          aria-labelledby="bouclier-hero-heading"
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-6 py-12 sm:px-10 sm:py-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.28),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.9),_transparent_55%)]"
            aria-hidden
          />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
              <Scale className="h-3.5 w-3.5" aria-hidden />
              {t.badge}
            </span>

            <h1
              id="bouclier-hero-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              {t.title}{" "}
              <span className="text-indigo-300">{t.titleAccent}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t.subtitle}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {t.audience.map(({ key, label }) => {
                const Icon = AUDIENCE_ICONS[key];
                return (
                  <li
                    key={key}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    <Icon className="h-3.5 w-3.5 text-indigo-300" aria-hidden />
                    {label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={BUNDLE_HREF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <Download className="h-4 w-4" aria-hidden />
                {t.ctaPrimary}
              </a>
              <a
                href="#scorecard"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-indigo-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Shield className="h-4 w-4" aria-hidden />
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="alignment-heading" className="mt-12">
          <h2
            id="alignment-heading"
            className="text-lg font-semibold tracking-tight text-white"
          >
            {t.alignmentHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            {t.alignmentSubtitle}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.regionalBadges.map((badge) => (
              <li
                key={badge.region}
                className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  {badge.region}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {badge.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="modules"
          aria-labelledby="modules-heading"
          className="mt-16 scroll-mt-24"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              {t.modulesEyebrow}
            </p>
            <h2
              id="modules-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {t.modulesTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {t.modulesSubtitle}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {t.modules.map((mod) => {
              const open = openModule === mod.id;
              return (
                <div
                  key={mod.id}
                  className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50"
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() =>
                      setOpenModule((prev) => (prev === mod.id ? null : mod.id))
                    }
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-900/80"
                  >
                    <span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                        {t.moduleLabel} {mod.id}
                      </span>
                      <span className="mt-1 block text-base font-semibold text-white sm:text-lg">
                        {mod.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <div className="border-t border-slate-800 px-5 py-4">
                      <p className="text-sm leading-relaxed text-slate-300">
                        {mod.summary}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {mod.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-slate-400"
                          >
                            <FileText
                              className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="bundle"
          aria-labelledby="bundle-heading"
          className="mt-16 scroll-mt-24 overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950"
        >
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                {t.bundleEyebrow}
              </p>
              <h2
                id="bundle-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-white"
              >
                {t.bundleTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                {t.bundleBody}
              </p>
              <ul className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-slate-300">
                <li className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950/50 px-2.5 py-1">
                  <FileText className="h-3.5 w-3.5 text-indigo-300" aria-hidden />
                  .docx
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950/50 px-2.5 py-1">
                  <FileSpreadsheet
                    className="h-3.5 w-3.5 text-indigo-300"
                    aria-hidden
                  />
                  .xlsx
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950/50 px-2.5 py-1">
                  <FileText className="h-3.5 w-3.5 text-indigo-300" aria-hidden />
                  .pdf
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-stretch gap-3 lg:items-end">
              <a
                href={BUNDLE_HREF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-950 transition hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Download className="h-4 w-4" aria-hidden />
                {t.bundleCta}
              </a>
              <p className="text-center text-xs text-slate-500 lg:text-right">
                {t.bundleNote}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <BouclierAttestationForm lang={lang} />
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-medium text-slate-400">
              © {SITE_METADATA.year} {BRAND.institute}
            </p>
            <p className="mt-1 text-xs">{t.footerNote}</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <Link href="/" className="hover:text-indigo-300">
              {t.footerObservatory}
            </Link>
            <Link href="/privacy" className="hover:text-indigo-300">
              {t.footerPrivacy}
            </Link>
            <Link href="/gdpr" className="hover:text-indigo-300">
              {t.footerGdpr}
            </Link>
            <a
              href={BRAND.waqfLedgerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-300"
            >
              WaqfLedger
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
