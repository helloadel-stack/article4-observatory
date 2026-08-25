/**
 * Durable workshop booking registry (JSON under `.data/bookings.json`).
 * Download access requires a 128-bit secure token — never serve by bookingId alone.
 */

import { randomBytes, randomUUID } from "node:crypto";
import { ATELIERS_JURIDIQUES } from "@/src/config/constants";
import {
  findRecordWhere,
  upsertRecord,
  type DbCollection,
} from "@/src/lib/db";

const COLLECTION: DbCollection = "bookings";

export type WorkshopBookingRecord = {
  /** Stable primary key for the JSON store (= bookingId). */
  id: string;
  bookingId: string;
  /** 128-bit hex token required for PDF download. */
  downloadToken: string;
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
};

export function generateMissionBookingId(): string {
  return `${ATELIERS_JURIDIQUES.bookingPrefix}-${randomUUID()}`;
}

/** Cryptographically strong 128-bit download token (32 hex chars). */
export function generateDownloadToken(): string {
  return randomBytes(16).toString("hex");
}

export async function saveWorkshopBooking(
  record: Omit<WorkshopBookingRecord, "id">,
): Promise<WorkshopBookingRecord> {
  const stored: WorkshopBookingRecord = {
    id: record.bookingId,
    ...record,
  };
  await upsertRecord(COLLECTION, stored);
  return stored;
}

export async function getWorkshopBookingByToken(
  token: string,
): Promise<WorkshopBookingRecord | undefined> {
  const trimmed = token.trim();
  if (!trimmed || trimmed.length < 32) return undefined;
  return findRecordWhere<WorkshopBookingRecord>(
    COLLECTION,
    (r) => r.downloadToken === trimmed,
  );
}

export async function getWorkshopBookingById(
  bookingId: string,
): Promise<WorkshopBookingRecord | undefined> {
  return findRecordWhere<WorkshopBookingRecord>(
    COLLECTION,
    (r) => r.bookingId === bookingId,
  );
}
