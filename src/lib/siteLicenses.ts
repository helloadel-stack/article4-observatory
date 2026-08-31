/**
 * Server-only B2B site-license registry (A4I-LIC-*).
 * Minted from confirmed Gumroad purchases, then anchored on WaqfLedger.
 */

import {
  BRAND,
  SITE_CONFIG,
  type CheckoutKey,
} from "@/src/config/constants";
import {
  findRecordById,
  upsertRecord,
  type DbCollection,
} from "@/src/lib/db";
import { canonicalPayload, formatProofId, sha256Hex } from "@/src/lib/hash";
import { maskEmail } from "@/src/lib/sanitize";
import { anchorStateToWaqfLedger } from "@/src/lib/waqfledger";

const COLLECTION: DbCollection = "licenses";

export type SiteLicenseRecord = {
  id: string;
  saleId: string;
  proofId: string;
  hash: string;
  productPermalink: string;
  productName: string;
  tier: CheckoutKey | "unknown";
  purchaserEmailMasked: string;
  isAnchored: boolean;
  verifyUrl: string;
  timestamp: string;
  resourceName: string;
};

const PERMALINK_TO_TIER: Record<string, CheckoutKey> = {
  starter: "tier0",
  framework: "tier1",
  audit: "tier2",
  aigovernance: "tier3",
};

export function resolveCheckoutTier(permalink: string): CheckoutKey | "unknown" {
  const slug = permalink
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?(safeai\.)?gumroad\.com\/l\//, "")
    .replace(/^https?:\/\/gum\.co\//, "")
    .split(/[/?#]/)[0];
  if (slug && slug in PERMALINK_TO_TIER) {
    return PERMALINK_TO_TIER[slug];
  }
  for (const [key, url] of Object.entries(SITE_CONFIG.gumroad)) {
    if (url.toLowerCase().includes(`/${slug}`)) {
      return key as CheckoutKey;
    }
  }
  return "unknown";
}

export async function getSiteLicenseBySaleId(
  saleId: string,
): Promise<SiteLicenseRecord | undefined> {
  const id = saleId.trim();
  if (!id) return undefined;
  return findRecordById<SiteLicenseRecord>(COLLECTION, id);
}

export async function mintAndAnchorSiteLicense(params: {
  saleId: string;
  productPermalink: string;
  productName: string;
  purchaserEmail: string;
  saleTimestamp: string;
  resourceName: string;
}): Promise<SiteLicenseRecord> {
  const existing = await getSiteLicenseBySaleId(params.saleId);
  if (existing) return existing;

  const timestamp = params.saleTimestamp || new Date().toISOString();
  const tier = resolveCheckoutTier(params.productPermalink);
  const payload = {
    institute: BRAND.institute,
    kind: "license",
    product: params.productName,
    permalink: params.productPermalink,
    saleId: params.saleId,
    timestamp,
    tier,
  };
  const hash = await sha256Hex(canonicalPayload(payload));
  const proofId = formatProofId("license", hash);
  const anchored = await anchorStateToWaqfLedger(
    hash,
    "license",
    params.productName || BRAND.storefront,
  );

  const record: SiteLicenseRecord = {
    id: params.saleId,
    saleId: params.saleId,
    proofId: anchored.proofId || proofId,
    hash,
    productPermalink: params.productPermalink,
    productName: params.productName,
    tier,
    purchaserEmailMasked: maskEmail(params.purchaserEmail),
    isAnchored: anchored.isAnchored,
    verifyUrl: anchored.verifyUrl,
    timestamp,
    resourceName: params.resourceName,
  };

  await upsertRecord(COLLECTION, record);
  return record;
}
