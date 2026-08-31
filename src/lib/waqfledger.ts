/**
 * Server-side WaqfLedger client. Never import from Client Components.
 * Anchor writes POST to /api/attestation with a Bearer key.
 * Remote verify requires res.ok AND data.valid === true — never HTTP 200 alone.
 */

import { BRAND } from "@/src/config/constants";

const WAQFLEDGER_ATTESTATION_URL = "https://waqfledger.tech/api/attestation";
const WAQFLEDGER_VERIFY_URL = "https://waqfledger.tech/api/verify";
const REQUEST_TIMEOUT_MS = 8000;

export type WaqfLedgerProofType =
  | "attestation"
  | "certificate"
  | "license"
  | "submission";

export type AnchorStateResult = {
  isAnchored: boolean;
  proofId: string;
  verifyUrl: string;
};

export type RemoteVerifyResult = {
  valid: boolean;
  hash: string;
};

type LedgerJson = {
  valid?: unknown;
  anchored?: unknown;
  proofId?: unknown;
  id?: unknown;
  verifyUrl?: unknown;
  hash?: unknown;
};

function getApiKey(): string | null {
  const key =
    process.env.WAQFLEDGER_API_KEY?.trim() ||
    process.env.WAQFLEDGER_API_TOKEN?.trim() ||
    "";
  return key.length > 0 ? key : null;
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const key = getApiKey();
  if (key) {
    headers.Authorization = `Bearer ${key}`;
  }
  return headers;
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function buildVerifyUrl(hash: string): string {
  return `${BRAND.waqfLedgerVerifyUrl}?hash=${encodeURIComponent(hash)}`;
}

async function postLedger(
  url: string,
  body: Record<string, unknown>,
): Promise<{ ok: boolean; status: number; json: LedgerJson | null }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
    const json = (await res.json().catch(() => null)) as LedgerJson | null;
    return { ok: res.ok, status: res.status, json };
  } finally {
    clearTimeout(timer);
  }
}

function fallbackProofId(hash: string, proofType: WaqfLedgerProofType): string {
  const prefix =
    proofType === "license"
      ? "A4I-LIC"
      : proofType === "certificate"
        ? "A4I-CERT"
        : proofType === "submission"
          ? "A4I-SUB"
          : "A4I-SHIELD";
  return `${prefix}-${hash}`;
}

/**
 * Persist a SHA-256 state receipt on WaqfLedger via authenticated POST.
 * Returns isAnchored only when the ledger acknowledges the write — never on
 * a bare HTTP 200 without a proof identifier or explicit valid/anchored flag.
 */
export async function anchorStateToWaqfLedger(
  hash: string,
  proofType: WaqfLedgerProofType,
  entityName: string,
): Promise<AnchorStateResult> {
  const digest = hash.trim().toLowerCase();
  const localProofId = fallbackProofId(digest, proofType);
  const localVerifyUrl = buildVerifyUrl(digest);

  if (!/^[a-f0-9]{64}$/.test(digest)) {
    return {
      isAnchored: false,
      proofId: localProofId,
      verifyUrl: localVerifyUrl,
    };
  }

  if (!getApiKey()) {
    console.warn(
      "[waqfledger] WAQFLEDGER_API_KEY is unset — skipping remote anchor.",
    );
    return {
      isAnchored: false,
      proofId: localProofId,
      verifyUrl: localVerifyUrl,
    };
  }

  try {
    const { ok, json } = await postLedger(WAQFLEDGER_ATTESTATION_URL, {
      hash: digest,
      proofType,
      entityName,
      institute: BRAND.institute,
      source: BRAND.instituteUrl,
    });

    const remoteProofId =
      asNonEmptyString(json?.proofId) ?? asNonEmptyString(json?.id);
    const remoteVerifyUrl =
      asNonEmptyString(json?.verifyUrl) ?? localVerifyUrl;
    const isAnchored = Boolean(
      ok &&
        (json?.valid === true ||
          json?.anchored === true ||
          remoteProofId),
    );

    return {
      isAnchored,
      proofId: remoteProofId ?? localProofId,
      verifyUrl: isAnchored ? remoteVerifyUrl : localVerifyUrl,
    };
  } catch (err) {
    console.warn("[waqfledger] Anchor request failed.", err);
    return {
      isAnchored: false,
      proofId: localProofId,
      verifyUrl: localVerifyUrl,
    };
  }
}

/**
 * Confirm a hash on the remote ledger. True only when res.ok && data.valid === true.
 */
export async function verifyRemoteProof(hash: string): Promise<RemoteVerifyResult> {
  const digest = hash.trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(digest)) {
    return { valid: false, hash: digest };
  }

  try {
    const { ok, json } = await postLedger(WAQFLEDGER_VERIFY_URL, {
      hash: digest,
    });
    return {
      valid: Boolean(ok && json?.valid === true),
      hash: asNonEmptyString(json?.hash) ?? digest,
    };
  } catch {
    return { valid: false, hash: digest };
  }
}
