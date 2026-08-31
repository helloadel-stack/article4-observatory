"use client";

import { useState } from "react";
import { Award, ClipboardCheck, ShieldCheck } from "lucide-react";
import {
  ASSESSMENT_MODULE_1_CHOICES,
  ASSESSMENT_MODULE_1_SIZE,
  ASSESSMENT_PASS_THRESHOLD,
  ASSESSMENT_PUBLIC_LABEL,
  ASSESSMENT_ROADMAP_BADGE,
  ASSESSMENT_SCENARIO_COUNT,
  ASSESSMENT_SCENARIOS,
  type Lang,
} from "@/src/config/constants";

const copy = {
  EN: {
    eyebrow: "Article 4 Institutional Framework",
    title: ASSESSMENT_PUBLIC_LABEL.EN,
    subtitle:
      "Three interactive Module 1 scenarios, scored on the server. The full 30-scenario Cisco-grade bank is not live in this free browser client — it ships with Enterprise licensees.",
    scenarioLabel: "Scenario",
    of: "of",
    moduleOf: "of Module 1",
    rubric: "Scoring rubric",
    cta: "Start Module 1 Preview",
    selectPrompt: "Select the compliant control:",
    next: "Next scenario",
    submit: "Submit for server scoring",
    submitting: "Scoring…",
    scorecardTitle: "Server Scorecard",
    scorePass: "Pass — A4I-CERT eligible (≥ 80%)",
    scoreFail: "Needs Review — A4I-CERT is not issued below 80%",
    score: "Score",
    certTitle: "AI Audit Passport™ Proof",
    certHint:
      "Issued only after a server-side pass. Anchored on WaqfLedger when the ledger acknowledges the write.",
    certWithheld:
      "No A4I-CERT-* is minted below the 80% pass mark. Retry Module 1 or license the full 30-scenario bank.",
    copyProof: "Copy Proof ID",
    copied: "Copied",
    retry: "Retry Module 1",
    hubNote: `This free client is Module 1 only (scenarios 1–${ASSESSMENT_MODULE_1_SIZE}). Scenarios ${ASSESSMENT_MODULE_1_SIZE + 1}–${ASSESSMENT_SCENARIO_COUNT} are not live here.`,
    roadmapBadge: ASSESSMENT_ROADMAP_BADGE.EN,
    roadmapHint: `Scenarios ${ASSESSMENT_MODULE_1_SIZE + 1}–${ASSESSMENT_SCENARIO_COUNT} — Enterprise only`,
    interactive: "Module 1",
    errorNetwork: "Scoring request failed. Try again.",
    errorGrade: "Unable to grade this attempt.",
    anchored: "Anchored on WaqfLedger",
    notAnchored: "Hash computed — remote ledger did not confirm the write",
  },
  FR: {
    eyebrow: "Cadre institutionnel Article 4",
    title: ASSESSMENT_PUBLIC_LABEL.FR,
    subtitle:
      "Trois scénarios interactifs du Module 1, notés côté serveur. La banque Cisco de 30 scénarios n’est pas active dans ce client navigateur gratuit — elle est réservée aux licenciés Enterprise.",
    scenarioLabel: "Scénario",
    of: "sur",
    moduleOf: "du Module 1",
    rubric: "Barème de notation",
    cta: "Lancer l’aperçu du Module 1",
    selectPrompt: "Sélectionnez le contrôle conforme :",
    next: "Scénario suivant",
    submit: "Envoyer pour notation serveur",
    submitting: "Notation…",
    scorecardTitle: "Tableau de bord serveur",
    scorePass: "Réussi — éligible A4I-CERT (≥ 80 %)",
    scoreFail: "À revoir — aucun A4I-CERT sous 80 %",
    score: "Score",
    certTitle: "Preuve du Passeport d’Audit IA™",
    certHint:
      "Émise uniquement après une réussite côté serveur. Ancrée sur WaqfLedger lorsque le registre confirme l’écriture.",
    certWithheld:
      "Aucun A4I-CERT-* n’est émis sous le seuil de 80 %. Réessayez le Module 1 ou licenciez la banque complète.",
    copyProof: "Copier l’ID de preuve",
    copied: "Copié",
    retry: "Réessayer le Module 1",
    hubNote: `Ce client gratuit couvre uniquement le Module 1 (scénarios 1–${ASSESSMENT_MODULE_1_SIZE}). Les scénarios ${ASSESSMENT_MODULE_1_SIZE + 1}–${ASSESSMENT_SCENARIO_COUNT} ne sont pas actifs ici.`,
    roadmapBadge: ASSESSMENT_ROADMAP_BADGE.FR,
    roadmapHint: `Scénarios ${ASSESSMENT_MODULE_1_SIZE + 1}–${ASSESSMENT_SCENARIO_COUNT} — Enterprise uniquement`,
    interactive: "Module 1",
    errorNetwork: "Échec de la notation. Réessayez.",
    errorGrade: "Impossible de noter cette tentative.",
    anchored: "Ancré sur WaqfLedger",
    notAnchored: "Hash calculé — le registre distant n’a pas confirmé l’écriture",
  },
  ES: {
    eyebrow: "Marco institucional Artículo 4",
    title: ASSESSMENT_PUBLIC_LABEL.ES,
    subtitle:
      "Tres escenarios interactivos del Módulo 1, puntuados en el servidor. El banco Cisco de 30 escenarios no está activo en este cliente de navegador gratuito — se incluye con licencias Enterprise.",
    scenarioLabel: "Escenario",
    of: "de",
    moduleOf: "del Módulo 1",
    rubric: "Rúbrica de puntuación",
    cta: "Iniciar vista previa del Módulo 1",
    selectPrompt: "Seleccione el control conforme:",
    next: "Siguiente escenario",
    submit: "Enviar para puntuación en servidor",
    submitting: "Puntuando…",
    scorecardTitle: "Tarjeta de puntuación del servidor",
    scorePass: "Aprobado — elegible para A4I-CERT (≥ 80 %)",
    scoreFail: "Requiere revisión — no se emite A4I-CERT por debajo del 80 %",
    score: "Puntuación",
    certTitle: "Prueba del Pasaporte de Auditoría IA™",
    certHint:
      "Se emite solo tras un aprobado en el servidor. Se ancla en WaqfLedger cuando el registro confirma la escritura.",
    certWithheld:
      "No se acuña ningún A4I-CERT-* por debajo del 80 %. Reintente el Módulo 1 o licencie el banco completo.",
    copyProof: "Copiar ID de prueba",
    copied: "Copiado",
    retry: "Reintentar Módulo 1",
    hubNote: `Este cliente gratuito cubre solo el Módulo 1 (escenarios 1–${ASSESSMENT_MODULE_1_SIZE}). Los escenarios ${ASSESSMENT_MODULE_1_SIZE + 1}–${ASSESSMENT_SCENARIO_COUNT} no están activos aquí.`,
    roadmapBadge: ASSESSMENT_ROADMAP_BADGE.ES,
    roadmapHint: `Escenarios ${ASSESSMENT_MODULE_1_SIZE + 1}–${ASSESSMENT_SCENARIO_COUNT} — solo Enterprise`,
    interactive: "Módulo 1",
    errorNetwork: "Falló la puntuación. Inténtelo de nuevo.",
    errorGrade: "No se pudo calificar este intento.",
    anchored: "Anclado en WaqfLedger",
    notAnchored: "Hash calculado — el registro remoto no confirmó la escritura",
  },
} as const;

type EvaluateResponse = {
  success: boolean;
  score?: number;
  passed?: boolean;
  proofId?: string | null;
  isAnchored?: boolean;
  verifyUrl?: string | null;
  error?: string;
};

type AssessmentSectionProps = {
  lang: Lang;
  onProofGenerated?: (proofId: string) => void;
};

export default function AssessmentSection({
  lang,
  onProofGenerated,
}: AssessmentSectionProps) {
  const t = copy[lang];
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);
  const [proofId, setProofId] = useState<string | null>(null);
  const [isAnchored, setIsAnchored] = useState(false);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scenario = ASSESSMENT_SCENARIOS[step] ?? ASSESSMENT_SCENARIOS[0];
  const localized = scenario[lang];
  const choices = ASSESSMENT_MODULE_1_CHOICES[scenario.id] ?? [];
  const selected = answers[scenario.id] ?? null;
  const isLast = step === ASSESSMENT_MODULE_1_SIZE - 1;
  const graded = score !== null;

  const reset = () => {
    setStarted(true);
    setStep(0);
    setAnswers({});
    setScore(null);
    setPassed(false);
    setProofId(null);
    setIsAnchored(false);
    setVerifyUrl(null);
    setError(null);
    setCopied(false);
  };

  const handleStart = () => {
    reset();
  };

  const handleSelect = (choiceId: string) => {
    if (graded || submitting) return;
    setAnswers((prev) => ({ ...prev, [scenario.id]: choiceId }));
  };

  const handleNext = () => {
    if (!selected || isLast) return;
    setStep((prev) => Math.min(prev + 1, ASSESSMENT_MODULE_1_SIZE - 1));
  };

  const handleSubmit = async () => {
    if (!selected || submitting) return;
    const payload = ASSESSMENT_SCENARIOS.map((s) => ({
      scenarioId: s.id,
      choiceId: answers[s.id],
    }));
    if (payload.some((row) => !row.choiceId)) {
      setError(t.errorGrade);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/assessment/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });
      const data = (await response.json()) as EvaluateResponse;
      if (!response.ok || !data.success || typeof data.score !== "number") {
        setError(data.error ?? t.errorGrade);
        return;
      }
      setScore(data.score);
      setPassed(Boolean(data.passed));
      const nextProof = data.proofId ?? null;
      setProofId(nextProof);
      setIsAnchored(Boolean(data.isAnchored));
      setVerifyUrl(data.verifyUrl ?? null);
      if (nextProof) onProofGenerated?.(nextProof);
    } catch {
      setError(t.errorNetwork);
    } finally {
      setSubmitting(false);
    }
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
            {t.scenarioLabel} {scenario.id} {t.moduleOf} {ASSESSMENT_MODULE_1_SIZE}
          </span>
          <span className="text-slate-300" aria-hidden>
            ·
          </span>
          <span className="text-indigo-700">{scenario.annex}</span>
          <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
            {t.interactive}
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
              {choices.map((choice) => {
                const active = selected === choice.id;
                return (
                  <li key={choice.id}>
                    <button
                      type="button"
                      disabled={graded || submitting}
                      onClick={() => handleSelect(choice.id)}
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
            {!graded ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {isLast ? (
                  <button
                    type="button"
                    disabled={!selected || submitting}
                    onClick={() => void handleSubmit()}
                    className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
                  >
                    {submitting ? t.submitting : t.submit}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!selected}
                    onClick={handleNext}
                    className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
                  >
                    {t.next}
                  </button>
                )}
              </div>
            ) : null}
            {error ? (
              <p role="alert" className="text-sm text-rose-700">
                {error}
              </p>
            ) : null}
          </div>
        )}

        {graded ? (
          <div
            className="mt-6 space-y-4 border border-slate-200 bg-slate-50 p-4"
            role="status"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t.scorecardTitle}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {passed ? t.scorePass : t.scoreFail}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {t.score}:{" "}
                <span className="font-semibold tabular-nums text-indigo-800">
                  {score}/{100}
                </span>
                <span className="text-slate-500">
                  {" "}
                  (pass {ASSESSMENT_PASS_THRESHOLD}+)
                </span>
              </p>
            </div>

            {proofId ? (
              <div className="border border-emerald-200 bg-emerald-50/80 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {t.certTitle}
                </p>
                <p className="mt-1 text-xs text-emerald-900">{t.certHint}</p>
                <p className="mt-1 text-[11px] font-medium text-emerald-900">
                  {isAnchored ? t.anchored : t.notAnchored}
                </p>
                <code className="mt-2 block break-all font-mono text-[11px] text-slate-800">
                  {proofId}
                </code>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void handleCopy()}
                    className="inline-flex items-center rounded border border-emerald-700 bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    {copied ? t.copied : t.copyProof}
                  </button>
                  {verifyUrl ? (
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      WaqfLedger
                    </a>
                  ) : (
                    <a
                      href="#waqfledger"
                      className="inline-flex items-center rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      WaqfLedger
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex items-center rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    {t.retry}
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs text-amber-950">{t.certWithheld}</p>
                <button
                  type="button"
                  onClick={handleStart}
                  className="mt-3 inline-flex items-center rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {t.retry}
                </button>
              </div>
            )}
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
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              {t.interactive}
            </span>
          </li>
        ))}
        <li className="border border-dashed border-amber-300 bg-amber-50/80 px-3 py-2 text-xs text-amber-950 sm:col-span-3">
          <span className="font-semibold">{t.roadmapBadge}</span>
          <span className="mt-1 block text-amber-900/80">{t.roadmapHint}</span>
        </li>
      </ul>
    </section>
  );
}
