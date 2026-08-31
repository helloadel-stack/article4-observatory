/**
 * Deterministic SHA-256 proof IDs for WaqfLedger license & AI Audit Passport logging.
 * Works in browser (Web Crypto) and Node (crypto.subtle / node:crypto).
 * Remote verify attempts hit waqfledger.tech with local hash fallback.
 */

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  if (typeof globalThis.crypto?.subtle?.digest === "function") {
    const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
    return toHex(digest);
  }
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(input, "utf8").digest("hex");
}

export type ProofKind = "license" | "certificate" | "submission";

export function formatProofId(kind: ProofKind, hashHex: string): string {
  const prefix =
    kind === "license"
      ? "A4I-LIC"
      : kind === "certificate"
        ? "A4I-CERT"
        : "A4I-SUB";
  return `${prefix}-${hashHex}`;
}

export function canonicalPayload(payload: Record<string, unknown>): string {
  return JSON.stringify(payload, Object.keys(payload).sort());
}

export async function generateProofId(
  kind: ProofKind,
  payload: Record<string, unknown>,
): Promise<string> {
  const hash = await sha256Hex(canonicalPayload(payload));
  return formatProofId(kind, hash);
}

export function normalizeProofId(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidProofIdFormat(proofId: string): boolean {
  return /^A4I-(LIC|CERT|SUB)-[A-F0-9]{64}$/i.test(proofId.trim());
}

export function extractHashFromProofId(proofId: string): string | null {
  const m = proofId.trim().match(/^A4I-(?:LIC|CERT|SUB)-([A-Fa-f0-9]{64})$/);
  return m ? m[1].toLowerCase() : null;
}

export type WaqfLedgerVerifyResult = {
  /** Whether the proof format is valid A4I-* SHA-256. */
  formatValid: boolean;
  /** True when waqfledger.tech confirmed the hash. */
  remoteVerified: boolean;
  /** True when local registry / local SHA-256 check succeeded. */
  localVerified: boolean;
  /** Human-readable source of truth for the UI. */
  source: "waqfledger.tech" | "local-engine" | "invalid-format" | "unknown";
  message: string;
  hashHex: string | null;
};

/**
 * Attempt remote WaqfLedger verification, then fall back to local SHA-256
 * format validation (and optional local registry membership handled by caller).
 */
export async function verifyAgainstWaqfLedger(
  proofId: string,
  opts?: { localRegistryHit?: boolean },
): Promise<WaqfLedgerVerifyResult> {
  const normalized = normalizeProofId(proofId);
  if (!isValidProofIdFormat(normalized)) {
    return {
      formatValid: false,
      remoteVerified: false,
      localVerified: false,
      source: "invalid-format",
      message: "Invalid proof ID format",
      hashHex: null,
    };
  }

  const hashHex = extractHashFromProofId(normalized);
  let remoteVerified = false;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch("https://waqfledger.tech/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        proofId: normalized,
        hash: hashHex,
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const body = (await res.json().catch(() => null)) as {
      valid?: boolean;
    } | null;
    // Strict remote truth: HTTP OK is not enough — ledger must set valid: true.
    remoteVerified = Boolean(res.ok && body?.valid === true);
    if (remoteVerified) {
      return {
        formatValid: true,
        remoteVerified: true,
        localVerified: Boolean(opts?.localRegistryHit),
        source: "waqfledger.tech",
        message: "Verified on waqfledger.tech",
        hashHex,
      };
    }
  } catch {
    // Network / CORS / timeout — fall through to local engine
  }

  if (opts?.localRegistryHit) {
    return {
      formatValid: true,
      remoteVerified: false,
      localVerified: true,
      source: "local-engine",
      message:
        "Verified by Local Cryptographic Proof Engine (WaqfLedger Hash Verification)",
      hashHex,
    };
  }

  return {
    formatValid: true,
    remoteVerified: false,
    localVerified: Boolean(opts?.localRegistryHit),
    source: opts?.localRegistryHit ? "local-engine" : "unknown",
    message: opts?.localRegistryHit
      ? "Verified by Local Cryptographic Proof Engine (WaqfLedger Hash Verification)"
      : "Not found in remote ledger — format alone is not verification",
    hashHex,
  };
}
