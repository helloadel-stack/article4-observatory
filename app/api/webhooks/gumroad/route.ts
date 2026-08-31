import { NextRequest, NextResponse } from "next/server";
import {
  getSiteLicenseBySaleId,
  mintAndAnchorSiteLicense,
} from "@/src/lib/siteLicenses";

export const runtime = "nodejs";

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isTrueFlag(value: string): boolean {
  const v = value.toLowerCase();
  return v === "true" || v === "1" || v === "yes";
}

function isGumroadTestPing(formData: FormData, saleId: string): boolean {
  if (isTrueFlag(formString(formData, "is_test"))) return true;
  if (isTrueFlag(formString(formData, "test"))) return true;
  if (!saleId || saleId === "test_sale_id") return true;
  return false;
}

/**
 * Gumroad Ping sends application/x-www-form-urlencoded.
 * Resource subscriptions may send JSON — normalize both into FormData.
 */
async function readGumroadPayload(req: NextRequest): Promise<FormData> {
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const parsed = (await req.json()) as Record<string, unknown>;
    const formData = new FormData();
    for (const [key, value] of Object.entries(parsed)) {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        formData.append(key, String(value));
      }
    }
    return formData;
  }
  return req.formData();
}

export async function POST(req: NextRequest) {
  try {
    const formData = await readGumroadPayload(req);

    const sellerId = formString(formData, "seller_id");
    const email = formString(formData, "email");
    const permalink =
      formString(formData, "permalink") ||
      formString(formData, "product_permalink");
    const saleId = formString(formData, "sale_id");
    const refunded = isTrueFlag(formString(formData, "refunded"));
    const disputed = isTrueFlag(formString(formData, "disputed"));
    const resourceName = formString(formData, "resource_name").toLowerCase();

    const configuredSellerId = process.env.GUMROAD_SELLER_ID?.trim();

    // Acknowledge Gumroad "Test Ping" before seller checks so empty/sample
    // payloads never 401 or 500.
    if (isGumroadTestPing(formData, saleId)) {
      console.log(
        "[Gumroad Webhook] Successfully received test ping from Gumroad.",
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Test ping acknowledged by Article 4 Institute webhook handler.",
        },
        { status: 200 },
      );
    }

    if (configuredSellerId && sellerId && sellerId !== configuredSellerId) {
      console.warn(
        `[Gumroad Webhook] Seller ID mismatch: received ${sellerId}, expected ${configuredSellerId}`,
      );
      return NextResponse.json(
        { error: "Unauthorized seller_id" },
        { status: 401 },
      );
    }

    if (
      refunded ||
      disputed ||
      resourceName === "refund" ||
      resourceName === "dispute"
    ) {
      return NextResponse.json(
        { message: "Ignored refund/dispute event" },
        { status: 200 },
      );
    }

    const existing = await getSiteLicenseBySaleId(saleId);
    if (existing) {
      return NextResponse.json({
        success: true,
        entitled: true,
        licenseProofId: existing.proofId,
        hash: existing.hash,
        isAnchored: existing.isAnchored,
      });
    }

    const license = await mintAndAnchorSiteLicense({
      saleId,
      productPermalink: permalink,
      productName: formString(formData, "product_name"),
      purchaserEmail: email,
      saleTimestamp: formString(formData, "sale_timestamp"),
      resourceName: resourceName || "sale",
    });

    return NextResponse.json({
      success: true,
      entitled: true,
      licenseProofId: license.proofId,
      hash: license.hash,
      isAnchored: license.isAnchored,
    });
  } catch (error) {
    console.error("[Gumroad Webhook Error]:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 200 },
    );
  }
}
