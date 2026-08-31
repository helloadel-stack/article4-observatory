import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { ATELIERS_JURIDIQUES } from "@/src/config/constants";
import { enforceRateLimit } from "@/src/lib/rateLimit";
import { sanitizeText } from "@/src/lib/sanitize";
import {
  WORKSHOP_DOWNLOAD_COOKIE,
  WORKSHOP_DOWNLOAD_MAX_AGE_SEC,
  generateDownloadToken,
  generateMissionBookingId,
  saveWorkshopBooking,
} from "@/src/lib/workshopBookings";

export const runtime = "nodejs";

type BookingBody = {
  entityType?: unknown;
  entityName?: unknown;
  city?: unknown;
  country?: unknown;
  format?: unknown;
  contactName?: unknown;
  contactEmail?: unknown;
  coversLogistics?: unknown;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function canonicalBookingPayload(fields: {
  entityType: string;
  entityName: string;
  city: string;
  country: string;
  format: string;
  contactName: string;
  contactEmail: string;
  coversLogistics: boolean;
  bookingId: string;
  timestamp: string;
}): string {
  return JSON.stringify({
    bookingId: fields.bookingId,
    city: fields.city,
    contactEmail: fields.contactEmail,
    contactName: fields.contactName,
    country: fields.country,
    coversLogistics: fields.coversLogistics,
    entityName: fields.entityName,
    entityType: fields.entityType,
    format: fields.format,
    timestamp: fields.timestamp,
  });
}

export async function POST(request: Request) {
  try {
    const limited = enforceRateLimit(request, "workshop-booking");
    if (limited) return limited;

    let body: BookingBody;
    try {
      body = (await request.json()) as BookingBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid JSON payload. Required: entityName, city, country, contactName, contactEmail.",
        },
        { status: 400 },
      );
    }

    const entityType = sanitizeText(body.entityType, 64);
    const entityName = sanitizeText(body.entityName, 200);
    const city = sanitizeText(body.city, 120);
    const country = sanitizeText(body.country, 120);
    const format = sanitizeText(body.format, 64);
    const contactName = sanitizeText(body.contactName, 160);
    const contactEmail = sanitizeText(body.contactEmail, 254).toLowerCase();
    const coversLogistics = body.coversLogistics === true;

    if (!entityName || !city || !country || !contactName || !contactEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: entityName, city, country, contactName, contactEmail.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(contactEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid contactEmail address." },
        { status: 400 },
      );
    }

    if (!coversLogistics) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Host financial guarantee is required: travel tickets, accommodation, and mission expenses must be confirmed to issue the Convention de Mission.",
        },
        { status: 400 },
      );
    }

    const bookingId = generateMissionBookingId();
    const downloadToken = generateDownloadToken();
    const timestamp = new Date().toISOString();
    const verificationHash = createHash("sha256")
      .update(
        canonicalBookingPayload({
          bookingId,
          entityType,
          entityName,
          city,
          country,
          format,
          contactName,
          contactEmail,
          coversLogistics,
          timestamp,
        }),
        "utf8",
      )
      .digest("hex");

    await saveWorkshopBooking({
      bookingId,
      downloadToken,
      verificationHash,
      timestamp,
      entityType,
      entityName,
      city,
      country,
      format,
      contactName,
      contactEmail,
      coversLogistics,
    });

    console.log("[Workshop Booking / Mission Reference]", {
      bookingId,
      verificationHash,
      entityType,
      entityName,
      city,
      country,
      format,
      coversLogistics,
      timestamp,
      hasContactEmail: true,
    });

    const json = NextResponse.json(
      {
        success: true,
        bookingId,
        verificationHash,
        hostDetails: {
          entityName,
          city,
          country,
        },
        invitationTemplate: {
          title: ATELIERS_JURIDIQUES.documentTitle,
          downloadUrl: "/api/workshop-booking/download",
          status: "Attente de Signature Hôte",
        },
        timestamp,
      },
      { status: 201 },
    );
    json.cookies.set(WORKSHOP_DOWNLOAD_COOKIE, downloadToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/api/workshop-booking/download",
      maxAge: WORKSHOP_DOWNLOAD_MAX_AGE_SEC,
    });
    return json;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing workshop booking.",
      },
      { status: 500 },
    );
  }
}
