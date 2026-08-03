"use client";

import { useState, type FormEvent } from "react";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export const MATURITY_LEVELS = [
  {
    level: 0,
    label: "IA Sauvage",
    description:
      "Usages non gouvernés, Shadow AI généralisée, aucun registre ni charte.",
  },
  {
    level: 1,
    label: "Sensibilisation",
    description:
      "Première cartographie Shadow AI et sensibilisation Article 4 engagée.",
  },
  {
    level: 2,
    label: "Cadre Initial",
    description:
      "Charte d'usage adoptée ; clause marchés publics et boussole de risque en cours.",
  },
  {
    level: 3,
    label: "Gouvernance Opérationnelle",
    description:
      "Registre général actif, transparence Art. 50 et contrôles DPO/DSI formalisés.",
  },
  {
    level: 4,
    label: "Maîtrise Institutionnelle",
    description:
      "Scorecard exécutif suivi, feuille de route budgétée, audits périodiques.",
  },
  {
    level: 5,
    label: "IA Exemplaire",
    description:
      "Gouvernance mature, preuves WaqfLedger, alignement DINUM/CNIL/APD/nLPD démontré.",
  },
] as const;

export type DepartmentType = "Collectivité" | "Hôpital" | "Administration";

type AttestationResponse = {
  success: boolean;
  attestationId?: string;
  hashProof?: string;
  title?: string;
  issuedAt?: string;
  verifyUrl?: string;
  error?: string;
};

type FormState = {
  institutionName: string;
  departmentType: DepartmentType | "";
  email: string;
  maturityLevel: number;
};

const INITIAL_FORM: FormState = {
  institutionName: "",
  departmentType: "",
  email: "",
  maturityLevel: 0,
};

export default function BouclierAttestationForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AttestationResponse | null>(null);

  const selectedLevel =
    MATURITY_LEVELS.find((m) => m.level === form.maturityLevel) ??
    MATURITY_LEVELS[0];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!form.institutionName.trim() || !form.departmentType || !form.email.trim()) {
      setError("Veuillez renseigner l'institution, le type et l'e-mail de contact.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/attestation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institutionName: form.institutionName.trim(),
          departmentType: form.departmentType,
          email: form.email.trim(),
          maturityLevel: form.maturityLevel,
        }),
      });

      const data = (await response.json()) as AttestationResponse;
      if (!response.ok || !data.success) {
        setError(data.error ?? "Échec de la génération de l'attestation.");
        return;
      }
      setResult(data);
    } catch {
      setError("Erreur réseau. Veuillez réessayer dans un instant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="scorecard"
      aria-labelledby="scorecard-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Scorecard exécutif
          </p>
          <h2
            id="scorecard-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Niveaux 0 à 5 — Attestation de préparation
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            Auto-évaluez la maturité de gouvernance IA de votre institution, puis
            générez une attestation scellée par empreinte SHA-256 via WaqfLedger.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-950/60 px-3 py-2 text-xs font-medium text-indigo-200">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
          1 page · Preuve cryptographique
        </div>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MATURITY_LEVELS.map((item) => {
          const active = form.maturityLevel === item.level;
          return (
            <li key={item.level}>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, maturityLevel: item.level }))
                }
                className={
                  active
                    ? "flex h-full w-full flex-col rounded-xl border border-indigo-400 bg-indigo-600/30 p-4 text-left shadow-lg shadow-indigo-950/40 ring-2 ring-indigo-400/60 transition"
                    : "flex h-full w-full flex-col rounded-xl border border-slate-700 bg-slate-950/50 p-4 text-left transition hover:border-indigo-500/50 hover:bg-slate-900"
                }
                aria-pressed={active}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Niveau {item.level}
                </span>
                <span className="mt-1 text-base font-semibold text-white">
                  {item.label}
                </span>
                <span className="mt-2 text-xs leading-relaxed text-slate-400">
                  {item.description}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 border-t border-slate-700 pt-8">
        <div className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Niveau sélectionné
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            Niveau {selectedLevel.level} — {selectedLevel.label}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              Nom de l&apos;institution
            </span>
            <input
              type="text"
              required
              maxLength={200}
              value={form.institutionName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  institutionName: e.target.value,
                }))
              }
              placeholder="Ex. Métropole de Lyon, CHU de Bordeaux…"
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              Type de département
            </span>
            <select
              required
              value={form.departmentType}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  departmentType: e.target.value as DepartmentType | "",
                }))
              }
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            >
              <option value="" disabled>
                Sélectionner…
              </option>
              <option value="Collectivité">Collectivité</option>
              <option value="Hôpital">Hôpital</option>
              <option value="Administration">Administration</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              E-mail de contact
            </span>
            <input
              type="email"
              required
              maxLength={254}
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="dgs@collectivite.fr"
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </label>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-rose-500/40 bg-rose-950/40 px-3.5 py-2.5 text-sm text-rose-200"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Génération en cours…
            </>
          ) : (
            <>
              <Award className="h-4 w-4" aria-hidden />
              Générer l&apos;Attestation de Préparation
            </>
          )}
        </button>
      </form>

      {result?.success && result.hashProof && result.verifyUrl ? (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-indigo-950/60 p-6"
        >
          <div className="flex flex-wrap items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400/70 bg-emerald-500/10 text-emerald-300"
              aria-hidden
            >
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Sceau d&apos;attestation
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">
                {result.title}
              </h3>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">Identifiant</dt>
                  <dd className="mt-0.5 font-mono text-xs text-slate-200 break-all">
                    {result.attestationId}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Émise le</dt>
                  <dd className="mt-0.5 text-slate-200">
                    {result.issuedAt
                      ? new Date(result.issuedAt).toLocaleString("fr-FR")
                      : "—"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">Empreinte SHA-256</dt>
                  <dd className="mt-0.5 font-mono text-xs text-indigo-200 break-all">
                    {result.hashProof}
                  </dd>
                </div>
              </dl>
              <a
                href={result.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Vérifier sur WaqfLedger.tech
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
