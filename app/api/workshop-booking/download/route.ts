import { NextResponse } from "next/server";
import { BRAND, SITE_METADATA } from "@/src/config/constants";
import { getWorkshopBookingByToken } from "@/src/lib/workshopBookings";
import { buildSimplePdf } from "@/src/lib/simplePdf";
import { sanitizeText } from "@/src/lib/sanitize";

export const runtime = "nodejs";

function buildMissionPdf(params: {
  bookingId: string;
  verificationHash: string;
  timestamp: string;
  entityType: string;
  entityName: string;
  city: string;
  country: string;
  format: string;
  contactName: string;
  contactEmail: string;
  coversLogistics: boolean;
}): Buffer {
  const issued = new Date(params.timestamp).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return buildSimplePdf(
    [
      BRAND.institute.toUpperCase(),
      "SafeAI Framework — Mission & Formation Executive",
      BRAND.instituteUrl,
      "",
      "CONVENTION DE FORMATION & LETTRE D'INVITATION OFFICIELLE",
      "Attestation de Prise en Charge & Ordre de Mission",
      "",
      `Référence mission : ${params.bookingId}`,
      `Date d'émission : ${issued}`,
      `Empreinte SHA-256 : ${params.verificationHash}`,
      `Statut : Attente de Signature Hôte`,
      "",
      "Hôte / Établissement",
      `Type : ${params.entityType || "—"}`,
      `Entité : ${params.entityName}`,
      `Lieu : ${params.city}, ${params.country}`,
      `Format : ${params.format || "—"}`,
      "",
      "Contact signataire",
      `Nom : ${params.contactName}`,
      `Email : ${params.contactEmail}`,
      "",
      "Logistique",
      params.coversLogistics
        ? "Prise en charge confirmée : billets transport + hébergement."
        : "Prise en charge transport / hébergement : à confirmer.",
      "",
      "Cette lettre vaut ordre de mission provisoire et invitation",
      "officielle à intervenir sur site. Confirmation finale :",
      SITE_METADATA.salesEmail,
      "",
      `Vérification WaqfLedger : ${BRAND.waqfLedgerUrl}/verify?hash=${params.verificationHash}`,
      "",
      `© ${SITE_METADATA.year} ${BRAND.institute}`,
    ],
    { fontSize: 10, lineHeight: 13 },
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = sanitizeText(searchParams.get("token"), 80);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing download token. Use the secure link from your booking confirmation.",
        },
        { status: 400 },
      );
    }

    const record = await getWorkshopBookingByToken(token);
    if (!record) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid or expired download token. Resubmit the workshop request.",
        },
        { status: 404 },
      );
    }

    const pdf = buildMissionPdf(record);
    const fileName = `${record.bookingId}.pdf`;

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error generating PDF." },
      { status: 500 },
    );
  }
}
