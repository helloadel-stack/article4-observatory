import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { BOUCLIER_PUBLIC, BRAND } from "@/src/config/constants";
import { upsertRecord } from "@/src/lib/db";
import { sanitizeText } from "@/src/lib/sanitize";

export const runtime = "nodejs";

const DEPARTMENT_TYPES = ["Collectivité", "Hôpital", "Administration"] as const;
const MATURITY_LEVELS = [0, 1, 2, 3, 4, 5] as const;

type DepartmentType = (typeof DEPARTMENT_TYPES)[number];
type MaturityLevel = (typeof MATURITY_LEVELS)[number];

type AttestationBody = {
  institutionName?: unknown;
  departmentType?: unknown;
  email?: unknown;
  maturityLevel?: unknown;
};

type AttestationRecord = {
  id: string;
  attestationId: string;
  institutionName: string;
  departmentType: DepartmentType;
  email: string;
  maturityLevel: MaturityLevel;
  issuedAt: string;
  hashProof: string;
  verifyUrl: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseMaturityLevel(value: unknown): MaturityLevel | null {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(n)) return null;
  if (!MATURITY_LEVELS.includes(n as MaturityLevel)) return null;
  return n as MaturityLevel;
}

function isDepartmentType(value: string): value is DepartmentType {
  return (DEPARTMENT_TYPES as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  try {
    let body: AttestationBody;
    try {
      body = (await request.json()) as AttestationBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payload JSON invalide. Champs requis : institutionName, departmentType, email, maturityLevel.",
        },
        { status: 400 },
      );
    }

    const institutionName = sanitizeText(body.institutionName, 200);
    const departmentType = sanitizeText(body.departmentType, 64);
    const email = sanitizeText(body.email, 254).toLowerCase();
    const maturityLevel = parseMaturityLevel(body.maturityLevel);

    if (!institutionName || !departmentType || !email || maturityLevel === null) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Champs requis manquants ou invalides : institutionName, departmentType, email, maturityLevel (0–5).",
        },
        { status: 400 },
      );
    }

    if (!isDepartmentType(departmentType)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "departmentType doit être Collectivité, Hôpital ou Administration.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Adresse e-mail invalide." },
        { status: 400 },
      );
    }

    const issuedAt = new Date().toISOString();
    const canonical = JSON.stringify({
      departmentType,
      email,
      institutionName,
      issuedAt,
      maturityLevel,
    });
    const hashProof = createHash("sha256").update(canonical, "utf8").digest("hex");

    const attestationId = `${BOUCLIER_PUBLIC.attestationPrefix}-${hashProof.slice(0, 12).toUpperCase()}`;
    const verifyUrl = `${BRAND.waqfLedgerUrl}/verify?hash=${hashProof}`;

    const record: AttestationRecord = {
      id: attestationId,
      attestationId,
      institutionName,
      departmentType,
      email,
      maturityLevel,
      issuedAt,
      hashProof,
      verifyUrl,
    };

    await upsertRecord("attestations", record);

    console.log("[Bouclier IA Publique Attestation]", {
      attestationId,
      institutionName,
      departmentType,
      maturityLevel,
      issuedAt,
      hashProof,
      hasEmail: true,
    });

    return NextResponse.json(
      {
        success: true,
        attestationId,
        hashProof,
        title: "Attestation de Préparation à la Gouvernance IA",
        issuedAt,
        verifyUrl,
        institutionName,
        departmentType,
        maturityLevel,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne lors de la génération de l'attestation.",
      },
      { status: 500 },
    );
  }
}
