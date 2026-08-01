"use client";

import { useMemo, useState } from "react";
import {
  Fingerprint,
  Shield,
  Link2,
  SearchCheck,
  FileKey2,
} from "lucide-react";
import {
  BRAND,
  WAQFLEDGER_SEED_PROOFS,
  type Lang,
} from "@/src/config/constants";
import {
  generateProofId,
  isValidProofIdFormat,
  normalizeProofId,
} from "@/src/lib/hash";

const copy = {
  EN: {
    title: "Cryptographic Auditability Powered by WaqfLedger Engine",
    badge: "Powered by WaqfLedger Engine",
    headline: "Mathematical Proof for Institutional AI Audits",
    body: "Compliance isn't just about static documentation—it requires immutable verification. SafeAI Framework Enterprise integrates directly with waqfledger.tech to store cryptographic hash proofs of your institutional AI risk assessments, ensuring audit trails cannot be altered post-inspection.",
    cta: "Open WaqfLedger.tech",
    features: [
      {
        title: "Cryptographic Hashing",
        description:
          "Every risk log generated creates an immutable verification hash.",
        icon: Fingerprint,
      },
      {
        title: "Zero-Knowledge Logs",
        description:
          "Verify compliance without exposing sensitive student or operational data.",
        icon: Shield,
      },
      {
        title: "Institutional Chain of Custody",
        description:
          "Link every certification and B2B license to a verifiable WaqfLedger proof.",
        icon: Link2,
      },
    ],
    engineTitle: "Proof Engine",
    generateLicense: "Generate License Proof",
    generateCert: "Generate Certificate Proof",
    generating: "Hashing…",
    latestProof: "Latest generated proof ID",
    verifierTitle: "Hash Verifier",
    verifierHint:
      "Paste a proof ID (A4I-LIC-… / A4I-CERT-…) to verify against the local WaqfLedger registry and waqfledger.tech.",
    verifierPlaceholder: "A4I-CERT-…",
    verify: "Verify Proof",
    statusValid: "Verified — proof found in WaqfLedger registry",
    statusInvalidFormat: "Invalid proof ID format",
    statusUnknown: "Not found in local registry — check on waqfledger.tech",
    seedLabel: "Demo seed proofs",
    externalVerify: "Verify on waqfledger.tech",
  },
  FR: {
    title: "Auditabilité cryptographique propulsée par le moteur WaqfLedger",
    badge: "Propulsé par le moteur WaqfLedger",
    headline: "Preuve mathématique pour les audits IA institutionnels",
    body: "La conformité ne se limite pas à la documentation statique — elle exige une vérification immuable. SafeAI Framework Enterprise s’intègre directement à waqfledger.tech pour stocker des preuves de hachage cryptographique de vos évaluations de risque IA, garantissant des pistes d’audit inaltérables après inspection.",
    cta: "Ouvrir WaqfLedger.tech",
    features: [
      {
        title: "Hachage cryptographique",
        description:
          "Chaque journal de risque génère un hash de vérification immuable.",
        icon: Fingerprint,
      },
      {
        title: "Journaux zero-knowledge",
        description:
          "Vérifiez la conformité sans exposer les données sensibles des étudiants ou des opérations.",
        icon: Shield,
      },
      {
        title: "Chaîne de custodie institutionnelle",
        description:
          "Reliez chaque certification et licence B2B à une preuve WaqfLedger vérifiable.",
        icon: Link2,
      },
    ],
    engineTitle: "Moteur de preuve",
    generateLicense: "Générer une preuve de licence",
    generateCert: "Générer une preuve de certificat",
    generating: "Hachage…",
    latestProof: "Dernier ID de preuve généré",
    verifierTitle: "Vérificateur de hash",
    verifierHint:
      "Collez un ID de preuve (A4I-LIC-… / A4I-CERT-…) pour vérifier dans le registre WaqfLedger local et sur waqfledger.tech.",
    verifierPlaceholder: "A4I-CERT-…",
    verify: "Vérifier la preuve",
    statusValid: "Vérifié — preuve trouvée dans le registre WaqfLedger",
    statusInvalidFormat: "Format d’ID de preuve invalide",
    statusUnknown:
      "Introuvable dans le registre local — vérifiez sur waqfledger.tech",
    seedLabel: "Preuves de démonstration",
    externalVerify: "Vérifier sur waqfledger.tech",
  },
  ES: {
    title: "Auditabilidad criptográfica impulsada por el motor WaqfLedger",
    badge: "Impulsado por el motor WaqfLedger",
    headline: "Prueba matemática para auditorías institucionales de IA",
    body: "El cumplimiento no es solo documentación estática: requiere verificación inmutable. SafeAI Framework Enterprise se integra directamente con waqfledger.tech para almacenar pruebas hash criptográficas de sus evaluaciones de riesgo de IA, garantizando pistas de auditoría inalterables tras la inspección.",
    cta: "Abrir WaqfLedger.tech",
    features: [
      {
        title: "Hashing criptográfico",
        description:
          "Cada registro de riesgo genera un hash de verificación inmutable.",
        icon: Fingerprint,
      },
      {
        title: "Registros de conocimiento cero",
        description:
          "Verifique el cumplimiento sin exponer datos sensibles de estudiantes u operaciones.",
        icon: Shield,
      },
      {
        title: "Cadena de custodia institucional",
        description:
          "Vincule cada certificación y licencia B2B a una prueba WaqfLedger verificable.",
        icon: Link2,
      },
    ],
    engineTitle: "Motor de pruebas",
    generateLicense: "Generar prueba de licencia",
    generateCert: "Generar prueba de certificado",
    generating: "Hasheando…",
    latestProof: "Último ID de prueba generado",
    verifierTitle: "Verificador de hash",
    verifierHint:
      "Pegue un ID de prueba (A4I-LIC-… / A4I-CERT-…) para verificar contra el registro local de WaqfLedger y waqfledger.tech.",
    verifierPlaceholder: "A4I-CERT-…",
    verify: "Verificar prueba",
    statusValid: "Verificado — prueba encontrada en el registro WaqfLedger",
    statusInvalidFormat: "Formato de ID de prueba inválido",
    statusUnknown:
      "No encontrado en el registro local — compruebe en waqfledger.tech",
    seedLabel: "Pruebas de demostración",
    externalVerify: "Verificar en waqfledger.tech",
  },
} as const;

type WaqfLedgerAuditSectionProps = {
  lang?: Lang;
  sessionProofs?: readonly string[];
};

type VerifyState =
  | { kind: "idle" }
  | { kind: "valid"; label?: string }
  | { kind: "invalid-format" }
  | { kind: "unknown" };

export default function WaqfLedgerAuditSection({
  lang = "EN",
  sessionProofs = [],
}: WaqfLedgerAuditSectionProps) {
  const t = copy[lang];
  const [busy, setBusy] = useState<"license" | "certificate" | null>(null);
  const [latestProof, setLatestProof] = useState<string | null>(null);
  const [localProofs, setLocalProofs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [verifyState, setVerifyState] = useState<VerifyState>({ kind: "idle" });

  const registry = useMemo(() => {
    const map = new Map<string, string>();
    for (const seed of WAQFLEDGER_SEED_PROOFS) {
      map.set(normalizeProofId(seed.proofId), seed.label);
    }
    for (const p of localProofs) {
      map.set(normalizeProofId(p), "Session-generated proof");
    }
    for (const p of sessionProofs) {
      map.set(normalizeProofId(p), "Assessment certificate proof");
    }
    return map;
  }, [localProofs, sessionProofs]);

  const mintProof = async (kind: "license" | "certificate") => {
    setBusy(kind);
    try {
      const proofId = await generateProofId(kind, {
        kind,
        product: kind === "license" ? "B2B Institutional License" : "Article 4 Certificate",
        institute: BRAND.institute,
        tsBucket: new Date().toISOString().slice(0, 13),
        tier: kind === "license" ? "tier3" : "benchmark",
      });
      setLatestProof(proofId);
      setLocalProofs((prev) =>
        prev.includes(proofId) ? prev : [...prev, proofId],
      );
      setInput(proofId);
      setVerifyState({ kind: "valid", label: "Session-generated proof" });
    } finally {
      setBusy(null);
    }
  };

  const handleVerify = () => {
    const normalized = normalizeProofId(input);
    if (!isValidProofIdFormat(normalized)) {
      setVerifyState({ kind: "invalid-format" });
      return;
    }
    const label = registry.get(normalized);
    if (label) {
      setVerifyState({ kind: "valid", label });
      return;
    }
    setVerifyState({ kind: "unknown" });
  };

  const externalUrl = `${BRAND.waqfLedgerUrl}/verify?id=${encodeURIComponent(input.trim())}`;

  return (
    <section
      id="waqfledger"
      aria-labelledby="waqfledger-heading"
      className="relative mt-8 scroll-mt-24 overflow-hidden border border-slate-800 bg-slate-950 px-6 py-12 text-slate-100 sm:px-10 sm:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <span className="inline-flex items-center rounded-md bg-indigo-500/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
          {t.badge}
        </span>

        <h2
          id="waqfledger-heading"
          className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg font-medium text-sky-200">
          {t.headline}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
          {t.body}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {t.features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-sm shadow-black/20 backdrop-blur-sm transition-colors hover:border-indigo-400/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/25">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2">
              <FileKey2 className="h-4 w-4 text-indigo-300" aria-hidden />
              <h3 className="text-sm font-semibold text-white">{t.engineTitle}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => mintProof("license")}
                className="inline-flex items-center rounded-lg border border-indigo-400/40 bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
              >
                {busy === "license" ? t.generating : t.generateLicense}
              </button>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => mintProof("certificate")}
                className="inline-flex items-center rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
              >
                {busy === "certificate" ? t.generating : t.generateCert}
              </button>
            </div>
            {latestProof ? (
              <div className="mt-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {t.latestProof}
                </p>
                <code className="mt-1 block break-all font-mono text-[11px] text-sky-200">
                  {latestProof}
                </code>
              </div>
            ) : null}
            <div className="mt-4">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {t.seedLabel}
              </p>
              <ul className="mt-2 space-y-1">
                {WAQFLEDGER_SEED_PROOFS.map((seed) => (
                  <li key={seed.proofId}>
                    <button
                      type="button"
                      onClick={() => {
                        setInput(seed.proofId);
                        setVerifyState({ kind: "idle" });
                      }}
                      className="break-all text-left font-mono text-[10px] text-indigo-300 hover:text-indigo-200"
                    >
                      {seed.proofId}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-5">
            <div className="flex items-center gap-2">
              <SearchCheck className="h-4 w-4 text-sky-300" aria-hidden />
              <h3 className="text-sm font-semibold text-white">
                {t.verifierTitle}
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {t.verifierHint}
            </p>
            <label className="mt-4 block">
              <span className="sr-only">{t.verifierTitle}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setVerifyState({ kind: "idle" });
                }}
                placeholder={t.verifierPlaceholder}
                className="w-full border border-slate-600 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleVerify}
                className="inline-flex items-center rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-500"
              >
                {t.verify}
              </button>
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
              >
                {t.externalVerify}
              </a>
            </div>
            {verifyState.kind === "valid" ? (
              <p
                role="status"
                className="mt-3 border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200"
              >
                {t.statusValid}
                {verifyState.label ? ` — ${verifyState.label}` : ""}
              </p>
            ) : null}
            {verifyState.kind === "invalid-format" ? (
              <p
                role="alert"
                className="mt-3 border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200"
              >
                {t.statusInvalidFormat}
              </p>
            ) : null}
            {verifyState.kind === "unknown" ? (
              <p
                role="status"
                className="mt-3 border border-slate-500/40 bg-slate-800 px-3 py-2 text-xs text-slate-300"
              >
                {t.statusUnknown}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          <a
            href={BRAND.waqfLedgerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-indigo-400/40 bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {t.cta}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
