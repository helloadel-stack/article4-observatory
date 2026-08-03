"use client";

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
import { BOUCLIER_PUBLIC, BRAND, SITE_METADATA } from "@/src/config/constants";

const BUNDLE_HREF = BOUCLIER_PUBLIC.bundlePath;

const MODULES = [
  {
    id: 1,
    title: "Diagnostic Shadow AI & Charte d'Usage (Art. 4)",
    summary:
      "Cartographiez les usages non déclarés et adoptez une charte d'usage alignée sur les obligations de littératie IA de l'Article 4.",
    deliverables: [
      "Matrice Shadow AI (services, outils, données)",
      "Charte d'usage institutionnelle (.docx)",
      "Plan de sensibilisation DGS / DSI / DPO",
    ],
  },
  {
    id: 2,
    title: "La Boussole du Risque IA™ & Clause Marchés Publics (CCAP)",
    summary:
      "Classez les systèmes selon le risque et intégrez une clause AI Act prête à l'emploi dans vos marchés publics.",
    deliverables: [
      "Boussole du Risque IA™ (.xlsx)",
      "Clause CCAP / CCTP fournisseurs IA",
      "Grille d'évaluation des offres",
    ],
  },
  {
    id: 3,
    title: "Registre Général & Transparence Algorithmique (Art. 50)",
    summary:
      "Tenez le registre des systèmes d'IA et formalisez les obligations de transparence envers usagers et agents.",
    deliverables: [
      "Registre général des systèmes IA",
      "Journal de transparence Article 50",
      "Modèles de mentions usagers / patients",
    ],
  },
  {
    id: 4,
    title: "Scorecard Exécutif (Niveaux 0 à 5) & Feuille de Route",
    summary:
      "Mesurez la maturité de gouvernance (IA Sauvage → IA Exemplaire) et priorisez les actions budgétaires.",
    deliverables: [
      "Scorecard exécutif 1 page",
      "Feuille de route 12–24 mois",
      "Attestation de préparation (WaqfLedger)",
    ],
  },
] as const;

const AUDIENCE = [
  { label: "Collectivités territoriales", icon: Landmark },
  { label: "Hôpitaux (CH / CHU)", icon: Hospital },
  { label: "DGS · DSI · DPO", icon: Users },
  { label: "Administrations publiques", icon: Building2 },
] as const;

const REGIONAL_BADGES = [
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
] as const;

export default function BouclierPublicPage() {
  const [openModule, setOpenModule] = useState<number | null>(1);

  return (
    <div className="flex min-h-full flex-col bg-slate-950 text-slate-100">
      <HtmlLangSync lang="FR" />

      <div className="border-b border-indigo-900/80 bg-indigo-950">
        <p className="mx-auto max-w-6xl px-4 py-2.5 text-center text-xs font-medium tracking-wide text-indigo-100 sm:px-6 sm:text-sm">
          Initiative pro bono · Article 4 Institute · Journalisation
          cryptographique via {BRAND.waqfLedgerUrl.replace("https://", "")}
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <Link
              href="/"
              className="text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
            >
              ← {BRAND.shortName}
            </Link>
            <p className="mt-1 truncate text-xs text-slate-500">
              {BRAND.institute} · Secteur public francophone
            </p>
          </div>
          <nav
            aria-label="Navigation Bouclier"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-400"
          >
            <a href="#modules" className="transition hover:text-white">
              Modules
            </a>
            <a href="#bundle" className="transition hover:text-white">
              Bundle open source
            </a>
            <a href="#scorecard" className="transition hover:text-white">
              Scorecard
            </a>
            <a
              href={BUNDLE_HREF}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              Télécharger
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
              Programme Non-Lucratif &amp; Open Source (CC BY-NC 4.0)
            </span>

            <h1
              id="bouclier-hero-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              Bouclier IA Publique{" "}
              <span className="text-indigo-300">(Safe Public AI Shield)</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Cadre opérationnel de gouvernance et de préparation à l&apos;AI Act
              pour les collectivités, hôpitaux et institutions publiques
              francophones.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {AUDIENCE.map(({ label, icon: Icon }) => (
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
                href={BUNDLE_HREF}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <Download className="h-4 w-4" aria-hidden />
                Télécharger le bundle 4 modules
              </a>
              <a
                href="#scorecard"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-indigo-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Shield className="h-4 w-4" aria-hidden />
                Générer une attestation
              </a>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="alignment-heading"
          className="mt-12"
        >
          <h2
            id="alignment-heading"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Alignement régional
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Le Bouclier IA Publique est conçu pour rester compatible avec les
            cadres nationaux de la francophonie européenne.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {REGIONAL_BADGES.map((badge) => (
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
              Parcours opérationnel
            </p>
            <h2
              id="modules-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Les 4 modules du Bouclier
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Dépliez chaque module pour découvrir les livrables prêts à
              déployer dans votre collectivité, CH/CHU ou administration.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {MODULES.map((mod) => {
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
                        Module {mod.id}
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
                Bundle gratuit · CC BY-NC 4.0
              </p>
              <h2
                id="bundle-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-white"
              >
                Pack open source des 4 modules
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                Téléchargez le package complet de modèles opérationnels — charte
                et diagnostic (.docx), boussole de risque (.xlsx), registres et
                scorecard (.pdf) — sans coût de licence pour le secteur public.
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
                Télécharger le package complet
              </a>
              <p className="text-center text-xs text-slate-500 lg:text-right">
                Archive ZIP · modèles éditables · usage non commercial
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <BouclierAttestationForm />
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-medium text-slate-400">
              © {SITE_METADATA.year} {BRAND.institute}
            </p>
            <p className="mt-1 text-xs">
              Bouclier IA Publique — programme non-lucratif sous licence CC BY-NC
              4.0
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <Link href="/" className="hover:text-indigo-300">
              Observatoire
            </Link>
            <Link href="/privacy" className="hover:text-indigo-300">
              Confidentialité
            </Link>
            <Link href="/gdpr" className="hover:text-indigo-300">
              RGPD
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
