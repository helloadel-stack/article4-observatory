/**
 * Sliding-window rate limiter (process memory).
 * 5 requests / 10 minutes / IP / route. Suitable for a single Node instance;
 * pair with an edge/KV limiter when scaling out.
 */

import { NextResponse } from "next/server";

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const fallback =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-vercel-forwarded-for") ||
    "unknown";
  return fallback.split(",")[0]?.trim().slice(0, 64) || "unknown";
}

function prune(bucket: Bucket, now: number): void {
  bucket.timestamps = bucket.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );
}

export function consumeRateLimit(key: string): {
  ok: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  prune(bucket, now);

  if (bucket.timestamps.length >= RATE_LIMIT_MAX) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSec = Math.max(
      1,
      Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000),
    );
    buckets.set(key, bucket);
    return { ok: false, retryAfterSec };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { ok: true, retryAfterSec: 0 };
}

export function rateLimitedResponse(retryAfterSec: number): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: "Too many requests. Try again later.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSec),
        "Cache-Control": "no-store",
      },
    },
  );
}

/** Returns a 429 response when the IP+route budget is exhausted; otherwise null. */
export function enforceRateLimit(
  request: Request,
  route: string,
): NextResponse | null {
  const { ok, retryAfterSec } = consumeRateLimit(
    `${route}:${clientIp(request)}`,
  );
  return ok ? null : rateLimitedResponse(retryAfterSec);
}
