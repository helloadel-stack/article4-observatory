"use client";

import { useState, type FormEvent } from "react";
import {
  Award,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import { BOUCLIER_PUBLIC, BRAND, DEFAULT_LANG, type Lang } from "@/src/config/constants";

export type DepartmentType = "Collectivité" | "Hôpital" | "Administration";

const formCopy = {
  FR: {
    eyebrow: "Scorecard exécutif",
    title: "Niveaux 0 à 5 — Attestation de Préparation & Bilan de Maturité IA",
    description:
      "Auto-évaluez la maturité de gouvernance IA de votre institution, puis générez une Attestation de Préparation & Bilan de Maturité IA scellée par empreinte SHA-256 via WaqfLedger. Ce livrable n'est pas un certificat de conformité légale.",
    badge: "A4I-SHIELD · Preuve cryptographique",
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
    submitLoading: "Calcul de l'empreinte SHA-256...",
    submitButton: "Générer l'Attestation de Préparation & Bilan de Maturité IA",
    modalTitle: "Attestation de Préparation & Bilan de Maturité IA",
    successSeal: "Sceau d'attestation",
    successId: "Identifiant d'attestation",
    successIssued: "Émise le",
    successHash: "Preuve d'empreinte SHA-256",
    copyHash: "Copier le hash",
    copiedHash: "Hash copié",
    successVerify: "Vérifier le Hash sur WaqfLedger.tech",
    successProofId: "Identifiant de preuve WaqfLedger",
    successAnchored: "Ancré sur WaqfLedger",
    successNotAnchored:
      "Empreinte locale — le registre distant n’a pas confirmé l’écriture",
    closeModal: "Fermer",
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
    title: "Levels 0 to 5 — AI Readiness Attestation & Maturity Assessment",
    description:
      "Self-assess your institution's AI governance maturity, then generate an AI Readiness Attestation & Maturity Assessment sealed with a SHA-256 fingerprint via WaqfLedger. This artifact is not a legal conformity certificate.",
    badge: "A4I-SHIELD · Cryptographic proof",
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
    submitLoading: "Computing SHA-256 fingerprint...",
    submitButton: "Generate the AI Readiness Attestation & Maturity Assessment",
    modalTitle: "AI Readiness Attestation & Maturity Assessment",
    successSeal: "Attestation seal",
    successId: "Attestation ID",
    successIssued: "Issued on",
    successHash: "SHA-256 hash proof",
    copyHash: "Copy hash",
    copiedHash: "Hash copied",
    successVerify: "Verify the Hash on WaqfLedger.tech",
    successProofId: "WaqfLedger proof ID",
    successAnchored: "Anchored on WaqfLedger",
    successNotAnchored:
      "Local fingerprint — remote ledger did not confirm the write",
    closeModal: "Close",
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
    title: "Niveles 0 a 5 — Atestación de Preparación y Balance de Madurez IA",
    description:
      "Autoevalúe la madurez de gobernanza IA de su institución y genere una Atestación de Preparación y Balance de Madurez IA sellada con huella SHA-256 vía WaqfLedger. Este entregable no es un certificado de conformidad legal.",
    badge: "A4I-SHIELD · Prueba criptográfica",
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
    submitLoading: "Calculando la huella SHA-256...",
    submitButton: "Generar la Atestación de Preparación y Balance de Madurez IA",
    modalTitle: "Atestación de Preparación y Balance de Madurez IA",
    successSeal: "Sello de attestation",
    successId: "ID de attestation",
    successIssued: "Emitida el",
    successHash: "Prueba de huella SHA-256",
    copyHash: "Copiar hash",
    copiedHash: "Hash copiado",
    successVerify: "Verificar el Hash en WaqfLedger.tech",
    successProofId: "ID de prueba WaqfLedger",
    successAnchored: "Anclado en WaqfLedger",
    successNotAnchored:
      "Huella local — el registro remoto no confirmó la escritura",
    closeModal: "Cerrar",
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
  proofId?: string;
  isAnchored?: boolean;
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
  const [modalOpen, setModalOpen] = useState(false);
  const [hashCopied, setHashCopied] = useState(false);

  const selectedLevel =
    t.maturityLevels.find((m) => m.level === form.maturityLevel) ??
    t.maturityLevels[0];

  const closeModal = () => {
    setModalOpen(false);
    setHashCopied(false);
  };

  const handleCopyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setHashCopied(true);
      window.setTimeout(() => setHashCopied(false), 2000);
    } catch {
      setHashCopied(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    setModalOpen(false);
    setHashCopied(false);

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
      if (response.status !== 201 || !data.success || !data.hashProof || !data.attestationId) {
        setError(data.error ?? t.errorGeneration);
        return;
      }
      setResult(data);
      setModalOpen(true);
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
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-amber-200/90">
            {BOUCLIER_PUBLIC.artifactDisclaimer[lang]}
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

      {modalOpen && result?.success && result.hashProof && result.attestationId ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="attestation-modal-title"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 shadow-2xl shadow-emerald-950/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-emerald-500/20 px-5 py-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400/70 bg-emerald-500/10 text-emerald-300"
                  aria-hidden
                >
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    {t.successSeal}
                  </p>
                  <h3
                    id="attestation-modal-title"
                    className="mt-1 text-lg font-bold leading-snug text-white"
                  >
                    {result.title ?? t.modalTitle}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label={t.closeModal}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5">
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="text-slate-500">{t.successId}</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold tracking-wide text-emerald-200">
                    {result.attestationId}
                  </dd>
                </div>
                {result.proofId ? (
                  <div>
                    <dt className="text-slate-500">{t.successProofId}</dt>
                    <dd className="mt-1 break-all font-mono text-xs font-semibold tracking-wide text-sky-200">
                      {result.proofId}
                    </dd>
                    <p className="mt-1 text-xs text-slate-400">
                      {result.isAnchored
                        ? t.successAnchored
                        : t.successNotAnchored}
                    </p>
                  </div>
                ) : null}
                <div>
                  <dt className="text-slate-500">{t.successIssued}</dt>
                  <dd className="mt-1 text-slate-200">
                    {result.issuedAt
                      ? new Date(result.issuedAt).toLocaleString(t.dateLocale)
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">{t.successHash}</dt>
                  <dd className="mt-2 rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                    <code className="block break-all font-mono text-xs leading-relaxed text-indigo-200">
                      {result.hashProof}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(result.hashProof!)}
                      className="mt-3 inline-flex items-center gap-2 rounded-md border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-indigo-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      {hashCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                          {t.copiedHash}
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden />
                          {t.copyHash}
                        </>
                      )}
                    </button>
                  </dd>
                </div>
              </dl>

              <a
                href={
                  result.verifyUrl ??
                  `${BRAND.waqfLedgerVerifyUrl}?hash=${encodeURIComponent(result.hashProof)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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
