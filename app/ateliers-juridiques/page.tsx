"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  ChevronDown,
  Download,
  Gavel,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import WorkshopBookingForm from "@/components/WorkshopBookingForm";
import HtmlLangSync from "@/components/HtmlLangSync";
import {
  ATELIERS_JURIDIQUES,
  BRAND,
  DEFAULT_LANG,
  SITE_METADATA,
  SUPPORTED_LANGS,
  type Lang,
} from "@/src/config/constants";

const PLAQUETTE_HREF = ATELIERS_JURIDIQUES.plaquettePath;

const pageCopy = {
  FR: {
    langLabel: "Langue de l'interface",
    back: "Retour à l'Observatoire",
    banner:
      "Formation exécutive sur site · Cabinets · Directions Juridiques · Barreaux",
    navModules: "Curriculum",
    navTrust: "Référentiels",
    navBook: "Réserver",
    downloadShort: "Plaquette PDF",
    badge: "Formation Exécutive & Audit Terrain — Juristes & Avocats",
    title:
      "Masterclass & Workshop In-Situ : Gouvernance IA & Audit AI Act pour Professionnels du Droit",
    subtitle:
      "Sécurisez l'usage interne de l'IA (Secret professionnel, RGPD) et développez votre capacité d'audit réglementaire pour vos clients et contrats SaaS.",
    ctaPrimary: "Réserver un Workshop sur Site",
    ctaSecondary: "Télécharger la Plaquette Programme (PDF)",
    audienceHeading: "Public cible",
    audience: [
      { label: "Cabinets d'Avocats", icon: Briefcase },
      { label: "Directeurs Juridiques / CLO", icon: Building2 },
      { label: "Ordres des Avocats / Barreaux", icon: Gavel },
      { label: "Équipes compliance & DPO", icon: Users },
    ],
    modulesEyebrow: "Curriculum exécutif",
    modulesTitle: "4 modules adaptés au secteur juridique",
    modulesSubtitle:
      "Un parcours opérationnel de 6 heures pédagogiques, déployable en journée intensive ou format résidentiel.",
    modules: [
      {
        id: 1,
        duration: "1,5 h",
        title: "Secret Professionnel & Shadow AI Juridique",
        points: [
          "Risques de fuite de données d'instruction sur les LLM grand public.",
          "Rédaction de la Charte d'Usage de l'IA en Cabinet & Direction Juridique.",
        ],
      },
      {
        id: 2,
        duration: "2 h",
        title: 'Qualification Contractuelle & Clause "Marchés & SaaS IA"',
        points: [
          "Application de La Boussole du Risque IA™ aux contrats fournisseurs d'IA.",
          "Rédaction d'Avenants IA type (Transparence, Souveraineté des données, Indemnisation des biais).",
        ],
      },
      {
        id: 3,
        duration: "1,5 h",
        title: "Transparence Algorithmique & Registre Art. 50",
        points: [
          "Montage du registre des cas d'usage IA à haut risque (Annexe III).",
          "Supervision humaine et traçabilité des décisions assistées par IA.",
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
      "Alignement avec les autorités de protection des données et les standards de formation continue des barreaux.",
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
        region: "Barreaux",
        body: "Conçu pour les standards de formation continue des Ordres des Avocats",
      },
    ],
    footerNote:
      "Ateliers Juridiques Executive — intervention sur site · France, Belgique, Suisse, Luxembourg",
  },
  EN: {
    langLabel: "Interface language",
    back: "Back to Observatory",
    banner:
      "Executive onsite training · Law firms · Legal departments · Bar associations",
    navModules: "Curriculum",
    navTrust: "Trust marks",
    navBook: "Book",
    downloadShort: "Programme PDF",
    badge: "Executive Training & Field Audit — Lawyers & Legal Counsel",
    title:
      "Masterclass & Onsite Workshop: AI Governance & AI Act Audit for Legal Professionals",
    subtitle:
      "Secure internal AI use (professional secrecy, GDPR) and build regulatory audit capacity for clients and SaaS contracts.",
    ctaPrimary: "Book an Onsite Workshop",
    ctaSecondary: "Download Programme Brochure (PDF)",
    audienceHeading: "Target audience",
    audience: [
      { label: "Law Firms", icon: Briefcase },
      { label: "General Counsel / CLOs", icon: Building2 },
      { label: "Bar Associations", icon: Gavel },
      { label: "Compliance & DPO teams", icon: Users },
    ],
    modulesEyebrow: "Executive curriculum",
    modulesTitle: "4 modules tailored for the legal sector",
    modulesSubtitle:
      "A 6-hour operational track, delivered as an intensive day or residential format.",
    modules: [
      {
        id: 1,
        duration: "1.5 h",
        title: "Professional Secrecy & Legal Shadow AI",
        points: [
          "Risk of leaking case and instruction data into consumer LLMs.",
          "Drafting the AI Use Charter for law firms and legal departments.",
        ],
      },
      {
        id: 2,
        duration: "2 h",
        title: 'Contract Qualification & "Procurement & AI SaaS" Clauses',
        points: [
          "Applying the AI Risk Compass™ to AI vendor contracts.",
          "Drafting model AI addenda (Transparency, Data sovereignty, Bias indemnification).",
        ],
      },
      {
        id: 3,
        duration: "1.5 h",
        title: "Algorithmic Transparency & Art. 50 Register",
        points: [
          "Building the register of high-risk AI use cases (Annex III).",
          "Human oversight and traceability of AI-assisted decisions.",
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
      "Aligned with data-protection authorities and bar continuing-education standards.",
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
        region: "Bar associations",
        body: "Designed for continuing-education standards of Bars / Ordres",
      },
    ],
    footerNote:
      "Executive Legal Workshops — onsite delivery · France, Belgium, Switzerland, Luxembourg",
  },
  ES: {
    langLabel: "Idioma de la interfaz",
    back: "Volver al Observatorio",
    banner:
      "Formación ejecutiva in situ · Despachos · Direcciones jurídicas · Colegios",
    navModules: "Currículo",
    navTrust: "Referencias",
    navBook: "Reservar",
    downloadShort: "Folleto PDF",
    badge: "Formación Ejecutiva & Auditoría de Campo — Juristas y Abogados",
    title:
      "Masterclass & Workshop In-Situ: Gobernanza de IA & Auditoría AI Act para Profesionales del Derecho",
    subtitle:
      "Asegure el uso interno de la IA (secreto profesional, RGPD) y desarrolle su capacidad de auditoría regulatoria para clientes y contratos SaaS.",
    ctaPrimary: "Reservar un Workshop In Situ",
    ctaSecondary: "Descargar el Folleto del Programa (PDF)",
    audienceHeading: "Público objetivo",
    audience: [
      { label: "Despachos de Abogados", icon: Briefcase },
      { label: "Directores Jurídicos / CLO", icon: Building2 },
      { label: "Colegios de Abogados", icon: Gavel },
      { label: "Equipos compliance & DPO", icon: Users },
    ],
    modulesEyebrow: "Currículo ejecutivo",
    modulesTitle: "4 módulos adaptados al sector jurídico",
    modulesSubtitle:
      "Un itinerario operativo de 6 horas pedagógicas, en jornada intensiva o formato residencial.",
    modules: [
      {
        id: 1,
        duration: "1,5 h",
        title: "Secreto Profesional & Shadow AI Jurídica",
        points: [
          "Riesgos de fuga de datos de instrucción en LLM de consumo.",
          "Redacción de la Carta de Uso de la IA en despacho y dirección jurídica.",
        ],
      },
      {
        id: 2,
        duration: "2 h",
        title: 'Calificación Contractual & Cláusula "Mercados & SaaS IA"',
        points: [
          "Aplicación de La Brújula del Riesgo IA™ a contratos de proveedores de IA.",
          "Redacción de anexos IA tipo (Transparencia, Soberanía de datos, Indemnización por sesgos).",
        ],
      },
      {
        id: 3,
        duration: "1,5 h",
        title: "Transparencia Algorítmica & Registro Art. 50",
        points: [
          "Montaje del registro de casos de uso de IA de alto riesgo (Anexo III).",
          "Supervisión humana y trazabilidad de decisiones asistidas por IA.",
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
      "Alineado con autoridades de protección de datos y estándares de formación continua de los colegios.",
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
        region: "Colegios",
        body: "Diseñado para los estándares de formación continua de los Colegios de Abogados",
      },
    ],
    footerNote:
      "Talleres Jurídicos Executive — intervención in situ · Francia, Bélgica, Suiza, Luxemburgo",
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
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
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
              onChange={setLang}
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
