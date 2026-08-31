import { NextResponse } from "next/server";
import { sanitizeText } from "@/src/lib/sanitize";
import {
  getSiteLicenseBySaleId,
  mintAndAnchorSiteLicense,
} from "@/src/lib/siteLicenses";

export const runtime = "nodejs";

function configuredSellerId(): string {
  return (process.env.GUMROAD_SELLER_ID ?? "").trim();
}

function asFormMap(request: Request, raw: string): Map<string, string> {
  const contentType = request.headers.get("content-type") ?? "";
  const map = new Map<string, string>();

  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          map.set(key, String(value));
        }
      }
    } catch {
      return map;
    }
    return map;
  }

  const params = new URLSearchParams(raw);
  for (const [key, value] of params.entries()) {
    map.set(key, value);
  }
  return map;
}

function isTruthyFlag(value: string | undefined): boolean {
  const v = (value ?? "").trim().toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

function parsePriceCents(value: string | undefined): number {
  const n = Number((value ?? "").trim());
  return Number.isFinite(n) ? n : 0;
}

/**
 * Gumroad Ping / resource subscription.
 * Validates seller_id, then mints and anchors an A4I-LIC-* site license on confirmed sale.
 */
export async function POST(request: Request) {
  const expectedSeller = configuredSellerId();
  if (!expectedSeller) {
    console.warn("[gumroad webhook] GUMROAD_SELLER_ID is unset — refusing pings.");
    return NextResponse.json(
      { success: false, error: "Webhook is not configured." },
      { status: 503 },
    );
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to read webhook body." },
      { status: 400 },
    );
  }

  const fields = asFormMap(request, raw);
  const sellerId = sanitizeText(fields.get("seller_id"), 128);
  if (!sellerId || sellerId !== expectedSeller) {
    return NextResponse.json(
      { success: false, error: "Invalid seller_id." },
      { status: 401 },
    );
  }

  const resourceName = sanitizeText(
    fields.get("resource_name") || "sale",
    32,
  ).toLowerCase();
  const saleId = sanitizeText(fields.get("sale_id"), 128);

  if (!saleId) {
    return NextResponse.json(
      { success: false, error: "Missing sale_id." },
      { status: 400 },
    );
  }

  if (resourceName === "refund" || resourceName === "dispute") {
    return NextResponse.json({
      success: true,
      ignored: true,
      reason: resourceName,
      saleId,
    });
  }

  if (resourceName !== "sale") {
    return NextResponse.json({
      success: true,
      ignored: true,
      reason: "unsupported_resource",
      resourceName,
    });
  }

  if (isTruthyFlag(fields.get("refunded")) || isTruthyFlag(fields.get("disputed"))) {
    return NextResponse.json({
      success: true,
      ignored: true,
      reason: "sale_not_confirmed",
      saleId,
    });
  }

  if (process.env.NODE_ENV === "production" && isTruthyFlag(fields.get("test"))) {
    return NextResponse.json({
      success: true,
      ignored: true,
      reason: "test_sale",
      saleId,
    });
  }

  const priceRaw = fields.get("price");
  if (
    priceRaw !== undefined &&
    priceRaw.trim() !== "" &&
    parsePriceCents(priceRaw) <= 0
  ) {
    return NextResponse.json({
      success: true,
      ignored: true,
      reason: "unpaid",
      saleId,
    });
  }

  const existing = await getSiteLicenseBySaleId(saleId);
  if (existing) {
    return NextResponse.json({
      success: true,
      duplicate: true,
      proofId: existing.proofId,
      isAnchored: existing.isAnchored,
      verifyUrl: existing.verifyUrl,
    });
  }

  try {
    const license = await mintAndAnchorSiteLicense({
      saleId,
      productPermalink: sanitizeText(
        fields.get("product_permalink") || fields.get("permalink"),
        300,
      ),
      productName: sanitizeText(fields.get("product_name"), 200),
      purchaserEmail: sanitizeText(fields.get("email"), 254).toLowerCase(),
      saleTimestamp: sanitizeText(fields.get("sale_timestamp"), 64),
      resourceName,
    });

    console.log("[gumroad webhook] Site license minted", {
      saleId: license.saleId,
      proofId: license.proofId,
      tier: license.tier,
      isAnchored: license.isAnchored,
    });

    return NextResponse.json(
      {
        success: true,
        proofId: license.proofId,
        isAnchored: license.isAnchored,
        verifyUrl: license.verifyUrl,
        tier: license.tier,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[gumroad webhook] Failed to mint site license.", err);
    return NextResponse.json(
      { success: false, error: "Internal server error processing sale." },
      { status: 500 },
    );
  }
}
