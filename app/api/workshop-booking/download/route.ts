import { NextRequest, NextResponse } from "next/server";
import { ATELIERS_JURIDIQUES, BRAND, SITE_METADATA } from "@/src/config/constants";
import {
  WORKSHOP_DOWNLOAD_COOKIE,
  getWorkshopBookingByToken,
} from "@/src/lib/workshopBookings";
import { buildSimplePdf } from "@/src/lib/simplePdf";
import { maskEmail, sanitizeText } from "@/src/lib/sanitize";

export const runtime = "nodejs";

function resolveDownloadToken(request: NextRequest): string {
  const fromCookie = sanitizeText(
    request.cookies.get(WORKSHOP_DOWNLOAD_COOKIE)?.value,
    80,
  );
  if (fromCookie.length >= 32) return fromCookie;

  const fromHeader = sanitizeText(
    request.headers.get("x-workshop-download-token"),
    80,
  );
  if (fromHeader.length >= 32) return fromHeader;

  return "";
}

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
  const maskedEmail = maskEmail(params.contactEmail);

  return buildSimplePdf(
    [
      BRAND.institute.toUpperCase(),
      "Protocole de recherche empirique — mission d'intérêt général",
      BRAND.instituteUrl,
      "",
      "LETTRE D'INTENTION INSTITUTIONNELLE (LOI)",
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
      `Email : ${maskedEmail}`,
      `Référence de réservation : ${params.bookingId}`,
      "",
      "COOPÉRATION SCIENTIFIQUE — BASE NON COMMERCIALE",
      "Aucun honoraire de conseil et aucun frais de formation ne sont facturés.",
      params.coversLogistics
        ? "L'établissement hôte peut prendre en charge le transport et l'hébergement du chercheur au titre de la logistique de recherche."
        : "Logistique de recherche (transport / hébergement) : à confirmer — lettre non émise.",
      "Cette lettre d'intention n'est émise qu'après confirmation de cette logistique, sans rémunération.",
      "",
      "Cette lettre vaut LOI pour un séminaire doctrinal",
      "ou un briefing de direction. Confirmation finale :",
      SITE_METADATA.contactEmail,
      "",
      `Vérification WaqfLedger : ${BRAND.waqfLedgerVerifyUrl}?hash=${params.verificationHash}`,
      "",
      `© ${SITE_METADATA.year} ${BRAND.institute}`,
    ],
    { fontSize: 10, lineHeight: 13 },
  );
}

export async function GET(request: NextRequest) {
  try {
    const token = resolveDownloadToken(request);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing download credential. Request the PDF from the same browser session as the booking, or resubmit.",
        },
        { status: 401 },
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
