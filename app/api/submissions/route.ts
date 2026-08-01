import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SubmissionBody = {
  agencyName?: unknown;
  country?: unknown;
  sovereigntyStatus?: unknown;
  submitterEmail?: unknown;
  euAiActStatus?: unknown;
};

function sanitizeString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen);
}

function generateSubmissionId(): string {
  const token = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `A4I-SUB-${Date.now()}-${token}`;
}

export async function POST(request: Request) {
  try {
    let body: SubmissionBody;
    try {
      body = (await request.json()) as SubmissionBody;
    } catch {
      return NextResponse.json(
        { error: "Agency name and country are required fields." },
        { status: 400 },
      );
    }

    const agencyName = sanitizeString(body.agencyName, 200);
    const country = sanitizeString(body.country, 64);
    const sovereigntyStatus = sanitizeString(body.sovereigntyStatus, 64);
    const submitterEmail = sanitizeString(body.submitterEmail, 254);
    const euAiActStatus = sanitizeString(body.euAiActStatus, 64);

    if (!agencyName || !country) {
      return NextResponse.json(
        { error: "Agency name and country are required fields." },
        { status: 400 },
      );
    }

    const submissionId = generateSubmissionId();
    const timestamp = new Date().toISOString();

    const payload = {
      agencyName,
      country,
      ...(sovereigntyStatus ? { sovereigntyStatus } : {}),
      ...(submitterEmail ? { submitterEmail } : {}),
      ...(euAiActStatus ? { euAiActStatus } : {}),
    };

    console.log("[SafeAI Registry Submission]", {
      submissionId,
      timestamp,
      ...payload,
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
