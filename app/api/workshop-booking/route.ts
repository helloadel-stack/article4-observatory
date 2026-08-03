import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { sanitizeText } from "@/src/lib/sanitize";
import {
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
    entityType: fields.entityType,
    entityName: fields.entityName,
    city: fields.city,
    country: fields.country,
    format: fields.format,
    contactName: fields.contactName,
    contactEmail: fields.contactEmail,
    coversLogistics: fields.coversLogistics,
    timestamp: fields.timestamp,
  });
}

export async function POST(request: Request) {
  try {
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

    const bookingId = generateMissionBookingId();
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

    saveWorkshopBooking({
      bookingId,
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
      contactName,
      contactEmail,
      coversLogistics,
      timestamp,
    });

    return NextResponse.json(
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
          title: "Convention de Formation & Lettre d'Invitation Officielle",
          downloadUrl: `/api/workshop-booking/download?id=${encodeURIComponent(bookingId)}`,
          status: "Attente de Signature Hôte",
        },
        timestamp,
      },
      { status: 201 },
    );
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
