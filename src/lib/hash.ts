/**
 * Deterministic SHA-256 proof IDs for WaqfLedger license & certificate logging.
 * Works in browser (Web Crypto) and Node (crypto.subtle / node:crypto).
 */

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  if (typeof globalThis.crypto?.subtle?.digest === "function") {
    const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
    return toHex(digest);
  }
  // Node fallback without subtle (rare)
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

export async function generateProofId(
  kind: ProofKind,
  payload: Record<string, unknown>,
): Promise<string> {
  const canonical = JSON.stringify(payload, Object.keys(payload).sort());
  const hash = await sha256Hex(canonical);
  return formatProofId(kind, hash);
}

export function normalizeProofId(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidProofIdFormat(proofId: string): boolean {
  return /^A4I-(LIC|CERT|SUB)-[A-F0-9]{64}$/i.test(proofId.trim());
}
