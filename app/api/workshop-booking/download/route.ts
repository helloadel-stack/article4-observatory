import { NextResponse } from "next/server";
import { ATELIERS_JURIDIQUES, BRAND, SITE_METADATA } from "@/src/config/constants";
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
      "CONVENTION DE MISSION & LETTRE D'INVITATION OFFICIELLE",
      ATELIERS_JURIDIQUES.documentTitle,
      `Identifiant : ${params.bookingId}`,
      "",
      `Date d'émission : ${issued}`,
      `Empreinte SHA-256 : ${params.verificationHash}`,
      "Statut : Attente de Signature Hôte",
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
      "CLAUSES DE GARANTIE FINANCIÈRE DE L'HÔTE",
      params.coversLogistics
        ? "L'établissement hôte confirme la prise en charge des billets de transport aller-retour, de l'hébergement pour la durée de la mission, et des frais de mission raisonnables de l'intervenant."
        : "Garantie financière (transport / hébergement) : à confirmer — convention non émise.",
      "Cette Convention de Mission n'est émise qu'après confirmation expresse de cette garantie.",
      "",
      "Cette lettre vaut Convention de Mission et invitation",
      "officielle à intervenir sur site. Confirmation finale :",
      SITE_METADATA.contactEmail,
      "",
      `Vérification WaqfLedger : ${BRAND.waqfLedgerVerifyUrl}?hash=${params.verificationHash}`,
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
