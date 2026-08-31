import { NextResponse } from "next/server";
import { upsertRecord } from "@/src/lib/db";
import { enforceRateLimit } from "@/src/lib/rateLimit";
import { sanitizeText } from "@/src/lib/sanitize";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

type SubmissionBody = {
  agencyName?: unknown;
  country?: unknown;
  toolName?: unknown;
  modelHosting?: unknown;
  verificationUrl?: unknown;
  notes?: unknown;
  email?: unknown;
  sovereigntyStatus?: unknown;
  euAiActStatus?: unknown;
};

type SubmissionRecord = {
  id: string;
  submissionId: string;
  timestamp: string;
  agencyName: string;
  country: string;
  toolName: string;
  modelHosting: string;
  verificationUrl: string;
  notes: string;
  email: string;
  sovereigntyStatus: string;
  euAiActStatus: string;
};

function isValidEmail(value: string): boolean {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isHttpUrl(value: string): boolean {
  if (!value) return true;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const limited = enforceRateLimit(request, "submissions");
    if (limited) return limited;

    let body: SubmissionBody;
    try {
      body = (await request.json()) as SubmissionBody;
    } catch {
      return NextResponse.json(
        { error: "Agency name and country are required fields." },
        { status: 400 },
      );
    }

    const agencyName = sanitizeText(body.agencyName, 200);
    const country = sanitizeText(body.country, 64);
    const toolName = sanitizeText(body.toolName, 200);
    const modelHosting = sanitizeText(body.modelHosting, 200);
    const verificationUrl = sanitizeText(body.verificationUrl, 500);
    const notes = sanitizeText(body.notes, 2000);
    const email = sanitizeText(body.email, 254).toLowerCase();
    const sovereigntyStatus = sanitizeText(body.sovereigntyStatus, 64);
    const euAiActStatus = sanitizeText(body.euAiActStatus, 64);

    if (!agencyName || !country) {
      return NextResponse.json(
        { error: "Agency name and country are required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    if (!isHttpUrl(verificationUrl)) {
      return NextResponse.json(
        { error: "verificationUrl must be an http(s) URL when provided." },
        { status: 400 },
      );
    }

    const submissionId = `A4I-SUB-${randomUUID()}`;
    const timestamp = new Date().toISOString();

    const record: SubmissionRecord = {
      id: submissionId,
      submissionId,
      timestamp,
      agencyName,
      country,
      toolName,
      modelHosting,
      verificationUrl,
      notes,
      email,
      sovereigntyStatus,
      euAiActStatus,
    };

    await upsertRecord("submissions", record);

    console.log("[SafeAI Registry Submission]", {
      submissionId,
      timestamp,
      agencyName,
      country,
      toolName,
      hasEmail: Boolean(email),
    });

    return NextResponse.json(
      {
        success: true,
        submissionId,
        timestamp,
        message:
          "Submission successfully logged to SafeAI Governance Registry.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error processing submission." },
      { status: 500 },
    );
  }
}
