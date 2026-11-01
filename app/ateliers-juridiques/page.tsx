"use client";

import {
  ATELIERS_JURIDIQUES,
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
  Hospital,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import WorkshopBookingForm from "@/components/WorkshopBookingForm";
import HtmlLangSync from "@/components/HtmlLangSync";

const PLAQUETTE_HREF = ATELIERS_JURIDIQUES.plaquettePath;

const pageCopy = {
  FR: {
    langLabel: "Langue de l'interface",
    back: "Retour à l'Observatoire",
    banner:
      "Séminaires doctrinaux · Briefings de direction · Coopération scientifique — mission d'intérêt général",
    navModules: "Curriculum",
    navTrust: "Référentiels",
    navBook: "Lettre d'intention",
    downloadShort: "Plaquette PDF",
    badge:
      "Mission d'intérêt général — aucun honoraire de conseil ni frais de formation",
    title:
      "Séminaires Doctrinaux, Briefings de Direction & Coopération Scientifique (Mission d'Intérêt Général)",
    subtitle:
      "Briefings et ateliers méthodologiques conduits à titre strictement non commercial pour les universités, les laboratoires de recherche (UMR CNRS), les hôpitaux (CHU) et les collectivités, dans le cadre de protocoles de recherche empirique et de lettres d'intention institutionnelles (LOI).",
    ctaPrimary: "Déposer une lettre d'intention (LOI)",
    ctaSecondary: "Télécharger la Plaquette Programme (PDF)",
    audienceHeading: "Public cible",
    audience: [
      { label: "Universités", icon: Building2 },
      { label: "Laboratoires (UMR CNRS)", icon: Users },
      { label: "Hôpitaux (CHU)", icon: Hospital },
      { label: "Collectivités", icon: Landmark },
    ],
    modulesEyebrow: "Séminaire doctrinal · 6 heures · base non commerciale",
    modulesTitle: "4 modules : Article 4, Article 14, supervision humaine & preuve WaqfLedger",
    modulesSubtitle:
      "Parcours méthodologique de 6 heures, conduit sans honoraire dans le cadre d'un protocole de recherche empirique et d'une lettre d'intention institutionnelle.",
    curriculumFocus: [
      "EU AI Act Art. 4",
      "EU AI Act Art. 14",
      "Secret professionnel",
      "Avenants SaaS",
    ],
    modules: [
      {
        id: 1,
        duration: "1,5 h",
        title: "Article 4, Secret Professionnel & Shadow AI Juridique",
        points: [
          "Obligations d'acculturation et de littératie IA au titre de l'Article 4.",
          "Secret professionnel (client privilege) : risques de fuite de données d'instruction sur les LLM grand public.",
          "Rédaction d'une charte d'usage de l'IA pour un établissement public d'enseignement, un laboratoire ou un CHU.",
        ],
      },
      {
        id: 2,
        duration: "2 h",
        title: "Avenants SaaS IA & Qualification Contractuelle",
        points: [
          "Rédaction d'avenants SaaS (transparence, souveraineté des données, indemnisation des biais).",
          "Application de La Boussole du Risque IA™ aux contrats fournisseurs d'IA.",
          "Clause type pour les marchés publics et conventions de recherche.",
        ],
      },
      {
        id: 3,
        duration: "1,5 h",
        title: "Article 14 — Supervision Humaine, Transparence & Registre Art. 50",
        points: [
          "Contrôles de supervision humaine (Article 14) pour les systèmes à haut risque.",
          "Montage du registre des cas d'usage IA à haut risque (Annexe III) et transparence Art. 50.",
          "Traçabilité des décisions assistées par IA et chaîne d'arbitrage humain.",
        ],
      },
      {
        id: 4,
        duration: "1 h",
        title: "Audit Cryptographique & Attestation WaqfLedger",
        points: [
          "Ancrage des rapports d'audit et preuves d'acculturation via waqfledger.tech.",
        ],
      },
    ],
    trustTitle: "Badges de confiance institutionnelle",
    trustSubtitle:
      "Alignement avec les autorités de protection des données et les cadres de recherche des universités, UMR, CHU et collectivités.",
    trustBadges: [
      {
        region: "France",
        body: "Compatible CNIL & DINUM — gouvernance, littératie IA et protection des données",
      },
      {
        region: "Belgique",
        body: "Aligné APD — autorité de protection des données",
      },
      {
        region: "Suisse",
        body: "Compatible PFPDT / nLPD — cadre fédéral de protection des données",
      },
      {
        region: "Québec",
        body: "Aligné Loi 25 — protection des renseignements personnels, principes OBVIA et éthique de la recherche",
      },
      {
        region: "Recherche",
        body: "Conçu pour les protocoles empiriques et les lettres d'intention des établissements publics",
      },
    ],
    footerNote:
      "Séminaires doctrinaux et coopération scientifique — base non commerciale, gestion désintéressée",
  },
  EN: {
    langLabel: "Interface language",
    back: "Back to Observatory",
    banner:
      "Doctrinal seminars · Executive briefings · Scientific cooperation — public-interest mission",
    navModules: "Curriculum",
    navTrust: "Trust marks",
    navBook: "Letter of intent",
    downloadShort: "Programme PDF",
    badge:
      "Public-interest mission — no consulting fees and no commercial training rates",
    title:
      "Doctrinal Seminars, Executive Briefings & Scientific Cooperation (Public-Interest Mission)",
    subtitle:
      "Briefings and methodological workshops conducted on a strictly non-commercial basis for universities, research laboratories (CNRS joint research units), university hospitals, and municipalities, under empirical research protocols and institutional letters of intent (LOI).",
    ctaPrimary: "Submit an institutional letter of intent (LOI)",
    ctaSecondary: "Download Programme Brochure (PDF)",
    audienceHeading: "Target audience",
    audience: [
      { label: "Universities", icon: Building2 },
      { label: "Research laboratories (UMR CNRS)", icon: Users },
      { label: "University hospitals (CHU)", icon: Hospital },
      { label: "Municipalities", icon: Landmark },
    ],
    modulesEyebrow: "Doctrinal seminar · 6 hours · non-commercial basis",
    modulesTitle: "4 modules: Article 4, Article 14, human oversight & WaqfLedger proof",
    modulesSubtitle:
      "A 6-hour methodological track conducted without fees, under an empirical research protocol and an institutional letter of intent.",
    curriculumFocus: [
      "EU AI Act Art. 4",
      "EU AI Act Art. 14",
      "Client privilege",
      "SaaS addenda",
    ],
    modules: [
      {
        id: 1,
        duration: "1.5 h",
        title: "Article 4, Professional Secrecy & Legal Shadow AI",
        points: [
          "Article 4 AI literacy and acculturation duties for legal professionals.",
          "Client privilege (secret professionnel): risk of leaking case and instruction data into consumer LLMs.",
          "Drafting an AI use charter for a university, research laboratory, or university hospital.",
        ],
      },
      {
        id: 2,
        duration: "2 h",
        title: "SaaS AI Addenda & Contract Qualification",
        points: [
          "Drafting SaaS addenda (transparency, data sovereignty, bias indemnification).",
          "Applying the AI Risk Compass™ to AI vendor contracts.",
          "Model clauses for public procurement and research agreements.",
        ],
      },
      {
        id: 3,
        duration: "1.5 h",
        title: "Article 14 — Human Oversight, Transparency & Art. 50 Register",
        points: [
          "Human-oversight controls (Article 14) for high-risk systems.",
          "Building the register of high-risk AI use cases (Annex III) and Art. 50 transparency.",
          "Traceability of AI-assisted decisions and the human arbitration chain.",
        ],
      },
      {
        id: 4,
        duration: "1 h",
        title: "Cryptographic Audit & WaqfLedger Attestation",
        points: [
          "Anchoring audit reports and literacy proofs via waqfledger.tech.",
        ],
      },
    ],
    trustTitle: "Institutional trust badges",
    trustSubtitle:
      "Aligned with data-protection authorities and the research frameworks of universities, laboratories, hospitals, and municipalities.",
    trustBadges: [
      {
        region: "France",
        body: "CNIL & DINUM compatible — governance, AI literacy and data protection",
      },
      {
        region: "Belgium",
        body: "APD aligned — data protection authority",
      },
      {
        region: "Switzerland",
        body: "PFPDT / nLPD compatible — federal data-protection framework",
      },
      {
        region: "Quebec",
        body: "Law 25 aligned — personal-information protection, OBVIA principles, and research ethics",
      },
      {
        region: "Research",
        body: "Designed for empirical protocols and letters of intent of public institutions",
      },
    ],
    footerNote:
      "Doctrinal seminars and scientific cooperation — non-commercial basis, disinterested management",
  },
  ES: {
    langLabel: "Idioma de la interfaz",
    back: "Volver al Observatorio",
    banner:
      "Seminarios doctrinales · Briefings de dirección · Cooperación científica — misión de interés general",
    navModules: "Currículo",
    navTrust: "Referencias",
    navBook: "Carta de intención",
    downloadShort: "Folleto PDF",
    badge:
      "Misión de interés general — sin honorarios de consultoría ni tarifas de formación",
    title:
      "Seminarios Doctrinales, Briefings de Dirección y Cooperación Científica (Misión de Interés General)",
    subtitle:
      "Briefings y talleres metodológicos realizados de forma estrictamente no comercial para universidades, laboratorios de investigación (UMR CNRS), hospitales universitarios (CHU) y municipios, en el marco de protocolos de investigación empírica y cartas de intención institucionales (LOI).",
    ctaPrimary: "Presentar una carta de intención (LOI)",
    ctaSecondary: "Descargar el Folleto del Programa (PDF)",
    audienceHeading: "Público objetivo",
    audience: [
      { label: "Universidades", icon: Building2 },
      { label: "Laboratorios (UMR CNRS)", icon: Users },
      { label: "Hospitales (CHU)", icon: Hospital },
      { label: "Municipios", icon: Landmark },
    ],
    modulesEyebrow: "Seminario doctrinal · 6 horas · base no comercial",
    modulesTitle: "4 módulos: Artículo 4, Artículo 14, supervisión humana y prueba WaqfLedger",
    modulesSubtitle:
      "Itinerario metodológico de 6 horas, sin honorarios, en el marco de un protocolo de investigación empírica y de una carta de intención institucional.",
    curriculumFocus: [
      "EU AI Act Art. 4",
      "EU AI Act Art. 14",
      "Secreto profesional",
      "Anexos SaaS",
    ],
    modules: [
      {
        id: 1,
        duration: "1,5 h",
        title: "Artículo 4, Secreto Profesional & Shadow AI Jurídica",
        points: [
          "Obligaciones de aculturación y alfabetización IA del Artículo 4.",
          "Secreto profesional (client privilege): riesgos de fuga de datos de instrucción en LLM de consumo.",
          "Redacción de una carta de uso de la IA para una universidad, un laboratorio o un hospital universitario.",
        ],
      },
      {
        id: 2,
        duration: "2 h",
        title: "Anexos SaaS IA & Calificación Contractual",
        points: [
          "Redacción de anexos SaaS (transparencia, soberanía de datos, indemnización por sesgos).",
          "Aplicación de La Brújula del Riesgo IA™ a contratos de proveedores de IA.",
          "Cláusula tipo para contratación pública y convenios de investigación.",
        ],
      },
      {
        id: 3,
        duration: "1,5 h",
        title: "Artículo 14 — Supervisión Humana, Transparencia & Registro Art. 50",
        points: [
          "Controles de supervisión humana (Artículo 14) para sistemas de alto riesgo.",
          "Montaje del registro de casos de uso de IA de alto riesgo (Anexo III) y transparencia Art. 50.",
          "Trazabilidad de decisiones asistidas por IA y cadena de arbitraje humano.",
        ],
      },
      {
        id: 4,
        duration: "1 h",
        title: "Auditoría Criptográfica & Attestation WaqfLedger",
        points: [
          "Anclaje de informes de auditoría y pruebas de aculturación vía waqfledger.tech.",
        ],
      },
    ],
    trustTitle: "Sellos de confianza institucional",
    trustSubtitle:
      "Alineado con las autoridades de protección de datos y los marcos de investigación de universidades, laboratorios, hospitales y municipios.",
    trustBadges: [
      {
        region: "Francia",
        body: "Compatible CNIL & DINUM — gobernanza, alfabetización IA y protección de datos",
      },
      {
        region: "Bélgica",
        body: "Alineado APD — autoridad de protección de datos",
      },
      {
        region: "Suiza",
        body: "Compatible PFPDT / nLPD — marco federal de protección de datos",
      },
      {
        region: "Quebec",
        body: "Alineado Ley 25 — protección de datos personales, principios OBVIA y ética de la investigación",
      },
      {
        region: "Investigación",
        body: "Diseñado para protocolos empíricos y cartas de intención de instituciones públicas",
      },
    ],
    footerNote:
      "Seminarios doctrinales y cooperación científica — base no comercial, gestión desinteresada",
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

export default function AteliersJuridiquesPage() {
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
              {BRAND.institute} · Ateliers Juridiques
            </p>
          </div>
          <nav
            aria-label="Ateliers"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-400"
          >
            <a href="#modules" className="transition hover:text-white">
              {t.navModules}
            </a>
            <a href="#confiance" className="transition hover:text-white">
              {t.navTrust}
            </a>
            <a href="#reservation" className="transition hover:text-white">
              {t.navBook}
            </a>
            <LangToggle
              lang={lang}
              onChange={handleLangChange}
              ariaLabel={t.langLabel}
            />
            <a
              href={PLAQUETTE_HREF}
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
          aria-labelledby="ateliers-hero-heading"
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
              id="ateliers-hero-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.55rem] lg:leading-tight"
            >
              {t.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t.subtitle}
            </p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {t.audienceHeading}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.audience.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-950/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  <Icon className="h-3.5 w-3.5 text-indigo-300" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#reservation"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden />
                {t.ctaPrimary}
              </a>
              <a
                href={PLAQUETTE_HREF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-indigo-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Download className="h-4 w-4" aria-hidden />
                {t.ctaSecondary}
              </a>
            </div>
          </div>
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
            <ul className="mt-4 flex flex-wrap gap-2">
              {t.curriculumFocus.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-indigo-500/30 bg-indigo-950/50 px-2.5 py-1 text-xs font-semibold text-indigo-200"
                >
                  {item}
                </li>
              ))}
            </ul>
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
                      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
                        Module {mod.id}
                        <span className="rounded border border-indigo-500/30 bg-indigo-950/50 px-1.5 py-0.5 font-medium normal-case tracking-normal text-indigo-200">
                          {mod.duration}
                        </span>
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
                      <ul className="space-y-2">
                        {mod.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"
                              aria-hidden
                            />
                            {point}
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
          id="confiance"
          aria-labelledby="trust-heading"
          className="mt-16 scroll-mt-24"
        >
          <h2
            id="trust-heading"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            {t.trustTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            {t.trustSubtitle}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.trustBadges.map((badge) => (
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

        <div className="mt-16">
          <WorkshopBookingForm lang={lang} />
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
              Observatoire
            </Link>
            <Link href="/bouclier-public" className="hover:text-indigo-300">
              Bouclier IA Publique
            </Link>
            <Link href="/privacy" className="hover:text-indigo-300">
              Privacy
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
