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
  DEFAULT_LANG,
  WAQFLEDGER_PASSPORT_PRODUCT,
  WAQFLEDGER_SEED_PROOFS,
  type Lang,
} from "@/src/config/constants";
import {
  generateProofId,
  normalizeProofId,
  verifyAgainstWaqfLedger,
} from "@/src/lib/hash";

const copy = {
  EN: {
    title: "Cryptographic Auditability Powered by WaqfLedger Engine",
    badge: "Local Cryptographic Proof Engine (WaqfLedger Hash Verification)",
    headline: "Mathematical Proof for Institutional AI Audits",
    body: "Compliance isn't just about static documentation—it requires immutable verification. This page runs a Local Cryptographic Proof Engine (WaqfLedger Hash Verification): SHA-256 proof IDs are checked locally, then a live request is attempted against waqfledger.tech/api/verify with graceful fallback.",
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
          "Link every AI Audit Passport™ and B2B license to a verifiable WaqfLedger proof.",
        icon: Link2,
      },
    ],
    engineTitle: "Local Cryptographic Proof Engine",
    generateLicense: "Generate License Proof",
    generateCert: "Generate AI Audit Passport™ Proof",
    generating: "Hashing…",
    latestProof: "Latest generated proof ID",
    verifierTitle: "WaqfLedger Hash Verification",
    verifierHint:
      "Paste a proof ID (A4I-LIC-… / A4I-CERT-…). We attempt https://waqfledger.tech/api/verify, then fall back to local SHA-256 validation against the demo registry.",
    verifierPlaceholder: "A4I-CERT-…",
    verify: "Verify Proof",
    verifying: "Verifying…",
    statusRemote: "Verified on waqfledger.tech",
    statusLocal: "Verified by Local Cryptographic Proof Engine",
    statusInvalidFormat: "Invalid proof ID format",
    statusUnknown:
      "Format OK — not found in remote ledger or local demo registry",
    seedLabel: "Canonical demo proofs (real payload hashes)",
    externalVerify: "Verify on waqfledger.tech",
  },
  FR: {
    title: "Auditabilité cryptographique propulsée par le moteur WaqfLedger",
    badge: "Moteur de preuve cryptographique local (vérification de hash WaqfLedger)",
    headline: "Preuve mathématique pour les audits IA institutionnels",
    body: "La conformité ne se limite pas à la documentation statique — elle exige une vérification immuable. Cette page exécute un moteur de preuve cryptographique local (vérification de hash WaqfLedger) : les ID SHA-256 sont contrôlés localement, puis une requête live est tentée vers waqfledger.tech/api/verify avec repli gracieux.",
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
          "Reliez chaque Passeport d’Audit IA™ et licence B2B à une preuve WaqfLedger vérifiable.",
        icon: Link2,
      },
    ],
    engineTitle: "Moteur de preuve cryptographique local",
    generateLicense: "Générer une preuve de licence",
    generateCert: "Générer une preuve de Passeport d’Audit IA™",
    generating: "Hachage…",
    latestProof: "Dernier ID de preuve généré",
    verifierTitle: "Vérification de hash WaqfLedger",
    verifierHint:
      "Collez un ID de preuve (A4I-LIC-… / A4I-CERT-…). Tentative vers https://waqfledger.tech/api/verify, puis validation SHA-256 locale contre le registre de démonstration.",
    verifierPlaceholder: "A4I-CERT-…",
    verify: "Vérifier la preuve",
    verifying: "Vérification…",
    statusRemote: "Vérifié sur waqfledger.tech",
    statusLocal: "Vérifié par le moteur de preuve cryptographique local",
    statusInvalidFormat: "Format d’ID de preuve invalide",
    statusUnknown:
      "Format OK — introuvable dans le registre distant ou le registre de démo local",
    seedLabel: "Preuves de démonstration canoniques (vrais hash de payload)",
    externalVerify: "Vérifier sur waqfledger.tech",
  },
  ES: {
    title: "Auditabilidad criptográfica impulsada por el motor WaqfLedger",
    badge: "Motor de prueba criptográfica local (verificación de hash WaqfLedger)",
    headline: "Prueba matemática para auditorías institucionales de IA",
    body: "El cumplimiento no es solo documentación estática: requiere verificación inmutable. Esta página ejecuta un motor de prueba criptográfica local (verificación de hash WaqfLedger): los ID SHA-256 se comprueban localmente y luego se intenta una solicitud en vivo a waqfledger.tech/api/verify con fallback.",
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
          "Vincule cada Pasaporte de Auditoría IA™ y licencia B2B a una prueba WaqfLedger verificable.",
        icon: Link2,
      },
    ],
    engineTitle: "Motor de prueba criptográfica local",
    generateLicense: "Generar prueba de licencia",
    generateCert: "Generar prueba de Pasaporte de Auditoría IA™",
    generating: "Hasheando…",
    latestProof: "Último ID de prueba generado",
    verifierTitle: "Verificación de hash WaqfLedger",
    verifierHint:
      "Pegue un ID de prueba (A4I-LIC-… / A4I-CERT-…). Intentamos https://waqfledger.tech/api/verify y, si falla, validamos SHA-256 localmente contra el registro demo.",
    verifierPlaceholder: "A4I-CERT-…",
    verify: "Verificar prueba",
    verifying: "Verificando…",
    statusRemote: "Verificado en waqfledger.tech",
    statusLocal: "Verificado por el motor de prueba criptográfica local",
    statusInvalidFormat: "Formato de ID de prueba inválido",
    statusUnknown:
      "Formato OK — no encontrado en el ledger remoto ni en el registro demo local",
    seedLabel: "Pruebas demo canónicas (hashes reales de payload)",
    externalVerify: "Verificar en waqfledger.tech",
  },
} as const;

type WaqfLedgerAuditSectionProps = {
  lang?: Lang;
  sessionProofs?: readonly string[];
};

type VerifyState =
  | { kind: "idle" }
  | { kind: "verifying" }
  | { kind: "remote"; label?: string }
  | { kind: "local"; label?: string }
  | { kind: "invalid-format" }
  | { kind: "unknown" };

export default function WaqfLedgerAuditSection({
  lang = DEFAULT_LANG,
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
      map.set(normalizeProofId(p), "Assessment AI Audit Passport™ proof");
    }
    return map;
  }, [localProofs, sessionProofs]);

  const mintProof = async (kind: "license" | "certificate") => {
    setBusy(kind);
    try {
      const proofId = await generateProofId(kind, {
        kind,
        product: kind === "license" ? "B2B Institutional License" : WAQFLEDGER_PASSPORT_PRODUCT,
        institute: BRAND.institute,
        tsBucket: new Date().toISOString().slice(0, 13),
        tier: kind === "license" ? "tier3" : "benchmark",
      });
      setLatestProof(proofId);
      setLocalProofs((prev) =>
        prev.includes(proofId) ? prev : [...prev, proofId],
      );
      setInput(proofId);
      setVerifyState({ kind: "local", label: "Session-generated proof" });
    } finally {
      setBusy(null);
    }
  };

  const handleVerify = async () => {
    setVerifyState({ kind: "verifying" });
    const normalized = normalizeProofId(input);
    const label = registry.get(normalized);
    const result = await verifyAgainstWaqfLedger(input, {
      localRegistryHit: Boolean(label),
    });

    if (result.source === "invalid-format") {
      setVerifyState({ kind: "invalid-format" });
      return;
    }
    if (result.remoteVerified) {
      setVerifyState({ kind: "remote", label });
      return;
    }
    if (result.localVerified && label) {
      setVerifyState({ kind: "local", label });
      return;
    }
    setVerifyState({ kind: "unknown" });
  };

  const externalUrl = `${BRAND.waqfLedgerVerifyUrl}?id=${encodeURIComponent(input.trim())}`;

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
                onClick={() => void handleVerify()}
                disabled={verifyState.kind === "verifying"}
                className="inline-flex items-center rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-500 disabled:opacity-60"
              >
                {verifyState.kind === "verifying" ? t.verifying : t.verify}
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
            {verifyState.kind === "remote" ? (
              <p
                role="status"
                className="mt-3 border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200"
              >
                {t.statusRemote}
                {verifyState.label ? ` — ${verifyState.label}` : ""}
              </p>
            ) : null}
            {verifyState.kind === "local" ? (
              <p
                role="status"
                className="mt-3 border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs text-sky-200"
              >
                {t.statusLocal}
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
