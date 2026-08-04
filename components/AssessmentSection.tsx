"use client";

import { useState } from "react";
import { Award, ClipboardCheck, ShieldCheck } from "lucide-react";
import {
  ASSESSMENT_PUBLIC_LABEL,
  ASSESSMENT_ROADMAP_BADGE,
  ASSESSMENT_SCENARIO_COUNT,
  ASSESSMENT_SCENARIOS,
  SCENARIO_1_CHOICES,
  type Lang,
} from "@/src/config/constants";
import { generateProofId } from "@/src/lib/hash";

const copy = {
  EN: {
    eyebrow: "Article 4 Institutional Framework",
    title: ASSESSMENT_PUBLIC_LABEL.EN,
    subtitle:
      "Interactive Scenario 1 preview with instant scoring. The full 30-scenario Cisco-grade bank ships with Enterprise licensees.",
    scenarioLabel: "Scenario",
    of: "of",
    rubric: "Scoring rubric",
    cta: "Start Scenario 1 Preview",
    selectPrompt: "Select the compliant control:",
    scorecardTitle: "Instant Scorecard",
    scorePass: "Pass — Human Oversight Control Identified",
    scoreFail: "Needs Review — Revisit Annex III Oversight Duties",
    score: "Score",
    certTitle: "Cryptographic Certificate Proof Preview",
    certHint: "Deterministic SHA-256 proof ID ready for WaqfLedger logging.",
    copyProof: "Copy Proof ID",
    copied: "Copied",
    retry: "Retry Scenario 1",
    hubNote: `Preview scope: Scenario 1 interactive. Scenarios 2–${ASSESSMENT_SCENARIO_COUNT} form the institutional framework roadmap.`,
    roadmapBadge: ASSESSMENT_ROADMAP_BADGE.EN,
    roadmapHint: `Scenarios 2–${ASSESSMENT_SCENARIO_COUNT} — roadmap`,
  },
  FR: {
    eyebrow: "Cadre institutionnel Article 4",
    title: ASSESSMENT_PUBLIC_LABEL.FR,
    subtitle:
      "Aperçu interactif du scénario 1 avec notation instantanée. La banque complète de 30 scénarios de niveau Cisco est réservée aux licenciés Enterprise.",
    scenarioLabel: "Scénario",
    of: "sur",
    rubric: "Barème de notation",
    cta: "Lancer l’aperçu du scénario 1",
    selectPrompt: "Sélectionnez le contrôle conforme :",
    scorecardTitle: "Tableau de bord instantané",
    scorePass: "Réussi — Contrôle de supervision humaine identifié",
    scoreFail: "À revoir — Revoir les devoirs de supervision Annexe III",
    score: "Score",
    certTitle: "Aperçu de preuve de certificat cryptographique",
    certHint:
      "Identifiant de preuve SHA-256 déterministe prêt pour la journalisation WaqfLedger.",
    copyProof: "Copier l’ID de preuve",
    copied: "Copié",
    retry: "Réessayer le scénario 1",
    hubNote: `Périmètre de l’aperçu : scénario 1 interactif. Les scénarios 2–${ASSESSMENT_SCENARIO_COUNT} constituent la feuille de route du cadre institutionnel.`,
    roadmapBadge: ASSESSMENT_ROADMAP_BADGE.FR,
    roadmapHint: `Scénarios 2–${ASSESSMENT_SCENARIO_COUNT} — feuille de route`,
  },
  ES: {
    eyebrow: "Marco institucional Artículo 4",
    title: ASSESSMENT_PUBLIC_LABEL.ES,
    subtitle:
      "Vista previa interactiva del escenario 1 con puntuación instantánea. El banco completo de 30 escenarios de grado Cisco se incluye con licencias Enterprise.",
    scenarioLabel: "Escenario",
    of: "de",
    rubric: "Rúbrica de puntuación",
    cta: "Iniciar vista previa del escenario 1",
    selectPrompt: "Seleccione el control conforme:",
    scorecardTitle: "Tarjeta de puntuación instantánea",
    scorePass: "Aprobado — Control de supervisión humana identificado",
    scoreFail: "Requiere revisión — Revisar deberes de supervisión Anexo III",
    score: "Puntuación",
    certTitle: "Vista previa de prueba de certificado criptográfico",
    certHint:
      "ID de prueba SHA-256 determinista listo para registro en WaqfLedger.",
    copyProof: "Copiar ID de prueba",
    copied: "Copiado",
    retry: "Reintentar escenario 1",
    hubNote: `Alcance de la vista previa: escenario 1 interactivo. Los escenarios 2–${ASSESSMENT_SCENARIO_COUNT} forman la hoja de ruta del marco institucional.`,
    roadmapBadge: ASSESSMENT_ROADMAP_BADGE.ES,
    roadmapHint: `Escenarios 2–${ASSESSMENT_SCENARIO_COUNT} — hoja de ruta`,
  },
} as const;

type AssessmentSectionProps = {
  lang: Lang;
  onProofGenerated?: (proofId: string) => void;
};

export default function AssessmentSection({
  lang,
  onProofGenerated,
}: AssessmentSectionProps) {
  const t = copy[lang];
  const scenario = ASSESSMENT_SCENARIOS[0];
  const localized = scenario[lang];

  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [proofId, setProofId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setSelected(null);
    setScore(null);
    setProofId(null);
  };

  const handleSubmitChoice = async (choiceId: string) => {
    setSelected(choiceId);
    const choice = SCENARIO_1_CHOICES.find((c) => c.id === choiceId);
    const passed = Boolean(choice?.correct);
    const nextScore = passed ? 100 : 40;
    setScore(nextScore);

    const id = await generateProofId("certificate", {
      scenarioId: scenario.id,
      choiceId,
      score: nextScore,
      annex: scenario.annex,
      rubric: localized.rubric,
      institute: "Article 4 Institute",
      product: "Article 4 AI Literacy Assessment",
    });
    setProofId(id);
    onProofGenerated?.(id);
  };

  const handleCopy = async () => {
    if (!proofId) return;
    try {
      await navigator.clipboard.writeText(proofId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="assessment"
      aria-labelledby="assessment-heading"
      className="mt-8 scroll-mt-24 border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 px-6 py-10 sm:px-8"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
          {t.eyebrow}
        </p>
        <h2
          id="assessment-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {t.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {t.subtitle}
        </p>
        <p className="mt-4 inline-flex items-center rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-950">
          {t.roadmapBadge}
        </p>
      </div>

      <article className="mt-8 border border-indigo-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <ClipboardCheck className="h-4 w-4 text-indigo-600" aria-hidden />
          <span>
            {t.scenarioLabel} {scenario.id} {t.of} {ASSESSMENT_SCENARIO_COUNT}
          </span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span className="text-indigo-700">{scenario.annex}</span>
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
            Interactive preview
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
          {localized.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {localized.prompt}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-700">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
          {t.rubric}: {localized.rubric}
        </p>

        {!started ? (
          <button
            type="button"
            onClick={handleStart}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Award className="h-4 w-4" aria-hidden />
            {t.cta}
          </button>
        ) : (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-slate-800">{t.selectPrompt}</p>
            <ul className="space-y-2">
              {SCENARIO_1_CHOICES.map((choice) => {
                const active = selected === choice.id;
                return (
                  <li key={choice.id}>
                    <button
                      type="button"
                      disabled={score !== null}
                      onClick={() => handleSubmitChoice(choice.id)}
                      className={
                        active
                          ? "w-full border border-indigo-600 bg-indigo-50 px-4 py-3 text-left text-sm text-slate-900"
                          : "w-full border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-800 transition-colors hover:border-indigo-300 hover:bg-white disabled:opacity-70"
                      }
                    >
                      <span className="font-semibold uppercase text-indigo-700">
                        {choice.id}.
                      </span>{" "}
                      {choice[lang]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {score !== null && proofId ? (
          <div
            className="mt-6 space-y-4 border border-slate-200 bg-slate-50 p-4"
            role="status"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t.scorecardTitle}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {score >= 70 ? t.scorePass : t.scoreFail}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {t.score}:{" "}
                <span className="font-semibold tabular-nums text-indigo-800">
                  {score}/100
                </span>
              </p>
            </div>

            <div className="border border-emerald-200 bg-emerald-50/80 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                {t.certTitle}
              </p>
              <p className="mt-1 text-xs text-emerald-900">{t.certHint}</p>
              <code className="mt-2 block break-all font-mono text-[11px] text-slate-800">
                {proofId}
              </code>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center rounded border border-emerald-700 bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  {copied ? t.copied : t.copyProof}
                </button>
                <button
                  type="button"
                  onClick={handleStart}
                  className="inline-flex items-center rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {t.retry}
                </button>
                <a
                  href="#waqfledger"
                  className="inline-flex items-center rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  WaqfLedger
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </article>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">{t.hubNote}</p>

      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {ASSESSMENT_SCENARIOS.map((s) => (
          <li
            key={s.id}
            className="border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
          >
            <span className="font-semibold text-slate-800">
              {t.scenarioLabel} {s.id}:
            </span>{" "}
            {s[lang].title}
            {s.id === 1 ? (
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Interactive
              </span>
            ) : (
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                {t.roadmapHint}
              </span>
            )}
          </li>
        ))}
        <li className="border border-dashed border-amber-300 bg-amber-50/80 px-3 py-2 text-xs text-amber-950 sm:col-span-3">
          <span className="font-semibold">{t.roadmapBadge}</span>
          <span className="mt-1 block text-amber-900/80">
            {t.roadmapHint}
          </span>
        </li>
      </ul>
    </section>
  );
}
