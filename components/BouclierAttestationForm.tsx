"use client";

import { useState, type FormEvent } from "react";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { DEFAULT_LANG, type Lang } from "@/src/config/constants";

export type DepartmentType = "Collectivité" | "Hôpital" | "Administration";

const formCopy = {
  FR: {
    eyebrow: "Scorecard exécutif",
    title: "Niveaux 0 à 5 — Attestation de préparation",
    description:
      "Auto-évaluez la maturité de gouvernance IA de votre institution, puis générez une attestation scellée par empreinte SHA-256 via WaqfLedger.",
    badge: "1 page · Preuve cryptographique",
    levelLabel: "Niveau",
    selectedLevel: "Niveau sélectionné",
    institutionLabel: "Nom de l'institution",
    institutionPlaceholder: "Ex. Métropole de Lyon, CHU de Bordeaux…",
    departmentLabel: "Type de département",
    selectPlaceholder: "Sélectionner…",
    departmentOptions: {
      Collectivité: "Collectivité",
      Hôpital: "Hôpital",
      Administration: "Administration",
    },
    emailLabel: "E-mail de contact",
    emailPlaceholder: "dgs@collectivite.fr",
    errorRequired:
      "Veuillez renseigner l'institution, le type et l'e-mail de contact.",
    errorGeneration: "Échec de la génération de l'attestation.",
    errorNetwork: "Erreur réseau. Veuillez réessayer dans un instant.",
    submitLoading: "Génération en cours…",
    submitButton: "Générer l'Attestation de Préparation",
    successSeal: "Sceau d'attestation",
    successId: "Identifiant",
    successIssued: "Émise le",
    successHash: "Empreinte SHA-256",
    successVerify: "Vérifier sur WaqfLedger.tech",
    maturityLevels: [
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
    ],
    dateLocale: "fr-FR",
  },
  EN: {
    eyebrow: "Executive scorecard",
    title: "Levels 0 to 5 — Readiness attestation",
    description:
      "Self-assess your institution's AI governance maturity, then generate an attestation sealed with a SHA-256 fingerprint via WaqfLedger.",
    badge: "1 page · Cryptographic proof",
    levelLabel: "Level",
    selectedLevel: "Selected level",
    institutionLabel: "Institution name",
    institutionPlaceholder: "e.g. City of Lyon, Bordeaux University Hospital…",
    departmentLabel: "Department type",
    selectPlaceholder: "Select…",
    departmentOptions: {
      Collectivité: "Local government",
      Hôpital: "Hospital",
      Administration: "Public administration",
    },
    emailLabel: "Contact email",
    emailPlaceholder: "dgs@municipality.gov",
    errorRequired:
      "Please provide the institution, department type, and contact email.",
    errorGeneration: "Failed to generate the attestation.",
    errorNetwork: "Network error. Please try again shortly.",
    submitLoading: "Generating…",
    submitButton: "Generate Readiness Attestation",
    successSeal: "Attestation seal",
    successId: "Identifier",
    successIssued: "Issued on",
    successHash: "SHA-256 fingerprint",
    successVerify: "Verify on WaqfLedger.tech",
    maturityLevels: [
      {
        level: 0,
        label: "Wild AI",
        description:
          "Ungoverned use, widespread Shadow AI, no register or charter.",
      },
      {
        level: 1,
        label: "Awareness",
        description:
          "Initial Shadow AI mapping and Article 4 awareness underway.",
      },
      {
        level: 2,
        label: "Initial Framework",
        description:
          "Use charter adopted; procurement clause and risk compass in progress.",
      },
      {
        level: 3,
        label: "Operational Governance",
        description:
          "Active general register, Art. 50 transparency and formal DPO/IT controls.",
      },
      {
        level: 4,
        label: "Institutional Mastery",
        description:
          "Executive scorecard tracked, budgeted roadmap, periodic audits.",
      },
      {
        level: 5,
        label: "Exemplary AI",
        description:
          "Mature governance, WaqfLedger proofs, DINUM/CNIL/APD/nLPD alignment demonstrated.",
      },
    ],
    dateLocale: "en-GB",
  },
  ES: {
    eyebrow: "Scorecard ejecutivo",
    title: "Niveles 0 a 5 — Attestation de preparación",
    description:
      "Autoevalúe la madurez de gobernanza IA de su institución y genere una attestation sellada con huella SHA-256 vía WaqfLedger.",
    badge: "1 página · Prueba criptográfica",
    levelLabel: "Nivel",
    selectedLevel: "Nivel seleccionado",
    institutionLabel: "Nombre de la institución",
    institutionPlaceholder: "Ej. Metrópolis de Lyon, CHU de Burdeos…",
    departmentLabel: "Tipo de departamento",
    selectPlaceholder: "Seleccionar…",
    departmentOptions: {
      Collectivité: "Colectividad",
      Hôpital: "Hospital",
      Administration: "Administración",
    },
    emailLabel: "Correo de contacto",
    emailPlaceholder: "dgs@colectividad.es",
    errorRequired:
      "Indique la institución, el tipo y el correo de contacto.",
    errorGeneration: "Error al generar la attestation.",
    errorNetwork: "Error de red. Inténtelo de nuevo en un momento.",
    submitLoading: "Generando…",
    submitButton: "Generar Attestation de Preparación",
    successSeal: "Sello de attestation",
    successId: "Identificador",
    successIssued: "Emitida el",
    successHash: "Huella SHA-256",
    successVerify: "Verificar en WaqfLedger.tech",
    maturityLevels: [
      {
        level: 0,
        label: "IA Salvaje",
        description:
          "Usos no gobernados, Shadow AI generalizada, sin registro ni carta.",
      },
      {
        level: 1,
        label: "Sensibilización",
        description:
          "Primera cartografía Shadow AI y sensibilización Artículo 4 iniciada.",
      },
      {
        level: 2,
        label: "Marco Inicial",
        description:
          "Carta de uso adoptada; cláusula de contratación pública y brújula de riesgo en curso.",
      },
      {
        level: 3,
        label: "Gobernanza Operativa",
        description:
          "Registro general activo, transparencia Art. 50 y controles DPO/DSI formalizados.",
      },
      {
        level: 4,
        label: "Dominio Institucional",
        description:
          "Scorecard ejecutivo seguido, hoja de ruta presupuestada, auditorías periódicas.",
      },
      {
        level: 5,
        label: "IA Ejemplar",
        description:
          "Gobernanza madura, pruebas WaqfLedger, alineación DINUM/CNIL/APD/nLPD demostrada.",
      },
    ],
    dateLocale: "es-ES",
  },
} as const;

/** FR labels preserved for backward compatibility with external imports. */
export const MATURITY_LEVELS = formCopy.FR.maturityLevels;

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

const DEPARTMENT_VALUES: DepartmentType[] = [
  "Collectivité",
  "Hôpital",
  "Administration",
];

type BouclierAttestationFormProps = {
  lang?: Lang;
};

export default function BouclierAttestationForm({
  lang = DEFAULT_LANG,
}: BouclierAttestationFormProps) {
  const t = formCopy[lang];
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AttestationResponse | null>(null);

  const selectedLevel =
    t.maturityLevels.find((m) => m.level === form.maturityLevel) ??
    t.maturityLevels[0];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!form.institutionName.trim() || !form.departmentType || !form.email.trim()) {
      setError(t.errorRequired);
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
        setError(data.error ?? t.errorGeneration);
        return;
      }
      setResult(data);
    } catch {
      setError(t.errorNetwork);
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
            {t.eyebrow}
          </p>
          <h2
            id="scorecard-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {t.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            {t.description}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-950/60 px-3 py-2 text-xs font-medium text-indigo-200">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
          {t.badge}
        </div>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.maturityLevels.map((item) => {
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
                  {t.levelLabel} {item.level}
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
            {t.selectedLevel}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {t.levelLabel} {selectedLevel.level} — {selectedLevel.label}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.institutionLabel}
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
              placeholder={t.institutionPlaceholder}
              className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.departmentLabel}
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
                {t.selectPlaceholder}
              </option>
              {DEPARTMENT_VALUES.map((value) => (
                <option key={value} value={value}>
                  {t.departmentOptions[value]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.emailLabel}
            </span>
            <input
              type="email"
              required
              maxLength={254}
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder={t.emailPlaceholder}
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
              {t.submitLoading}
            </>
          ) : (
            <>
              <Award className="h-4 w-4" aria-hidden />
              {t.submitButton}
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
                {t.successSeal}
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">
                {result.title}
              </h3>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">{t.successId}</dt>
                  <dd className="mt-0.5 font-mono text-xs text-slate-200 break-all">
                    {result.attestationId}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">{t.successIssued}</dt>
                  <dd className="mt-0.5 text-slate-200">
                    {result.issuedAt
                      ? new Date(result.issuedAt).toLocaleString(t.dateLocale)
                      : "—"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">{t.successHash}</dt>
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
                {t.successVerify}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
