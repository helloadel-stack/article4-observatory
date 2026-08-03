/**
 * In-process booking registry for mission invitation PDF downloads.
 * Suitable for demo / single-instance Node runtime.
 */

export type WorkshopBookingRecord = {
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
};

const bookings = new Map<string, WorkshopBookingRecord>();

export function saveWorkshopBooking(record: WorkshopBookingRecord): void {
  bookings.set(record.bookingId, record);
}

export function getWorkshopBooking(
  bookingId: string,
): WorkshopBookingRecord | undefined {
  return bookings.get(bookingId);
}

export function generateMissionBookingId(): string {
  const token = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `A4I-MISSION-${Date.now()}-${token}`;
}
