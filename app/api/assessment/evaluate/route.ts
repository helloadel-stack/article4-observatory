import { NextResponse } from "next/server";
import {
  ASSESSMENT_MODULE_1_CHOICES,
  ASSESSMENT_MODULE_1_SIZE,
  ASSESSMENT_PASS_THRESHOLD,
  ASSESSMENT_SCENARIOS,
  BRAND,
} from "@/src/config/constants";
import {
  isCorrectModule1Choice,
  isModule1ScenarioId,
} from "@/src/lib/assessmentKeys";
import { canonicalPayload, formatProofId, sha256Hex } from "@/src/lib/hash";
import { sanitizeText } from "@/src/lib/sanitize";
import { anchorStateToWaqfLedger } from "@/src/lib/waqfledger";

export const runtime = "nodejs";

type AnswerIn = {
  scenarioId?: unknown;
  choiceId?: unknown;
};

type EvaluateBody = {
  answers?: unknown;
};

function parseAnswers(
  raw: unknown,
): { scenarioId: number; choiceId: string }[] | null {
  if (!Array.isArray(raw) || raw.length !== ASSESSMENT_MODULE_1_SIZE) {
    return null;
  }

  const seen = new Set<number>();
  const parsed: { scenarioId: number; choiceId: string }[] = [];

  for (const item of raw as AnswerIn[]) {
    const scenarioId =
      typeof item?.scenarioId === "number"
        ? item.scenarioId
        : Number(item?.scenarioId);
    const choiceId = sanitizeText(item?.choiceId, 8).toLowerCase();

    if (!isModule1ScenarioId(scenarioId) || !choiceId) return null;
    if (seen.has(scenarioId)) return null;

    const publicChoices = ASSESSMENT_MODULE_1_CHOICES[scenarioId];
    if (!publicChoices?.some((c) => c.id === choiceId)) return null;

    seen.add(scenarioId);
    parsed.push({ scenarioId, choiceId });
  }

  if (seen.size !== ASSESSMENT_MODULE_1_SIZE) return null;
  return parsed.sort((a, b) => a.scenarioId - b.scenarioId);
}

export async function POST(request: Request) {
  try {
    let body: EvaluateBody;
    try {
      body = (await request.json()) as EvaluateBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid JSON. Submit answers for all Module 1 scenarios (1–3).",
        },
        { status: 400 },
      );
    }

    const answers = parseAnswers(body.answers);
    if (!answers) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Submit exactly one valid choice per Module 1 scenario (ids 1–3).",
        },
        { status: 400 },
      );
    }

    const perScenario = answers.map((answer) => ({
      scenarioId: answer.scenarioId,
      passed: isCorrectModule1Choice(answer.scenarioId, answer.choiceId),
    }));
    const correctCount = perScenario.filter((row) => row.passed).length;
    const score = Math.round((correctCount / ASSESSMENT_MODULE_1_SIZE) * 100);
    const passed = score >= ASSESSMENT_PASS_THRESHOLD;

    let proofId: string | null = null;
    let isAnchored = false;
    let verifyUrl: string | null = null;

    if (passed) {
      const hash = await sha256Hex(
        canonicalPayload({
          annexes: ASSESSMENT_SCENARIOS.map((s) => s.annex),
          answers: answers.map((a) => `${a.scenarioId}:${a.choiceId}`),
          institute: BRAND.institute,
          kind: "certificate",
          module: "module-1-preview",
          product: "Article 4 AI Literacy Assessment — Module 1",
          score,
        }),
      );
      const anchored = await anchorStateToWaqfLedger(
        hash,
        "certificate",
        BRAND.institute,
      );
      proofId = anchored.proofId.startsWith("A4I-CERT-")
        ? anchored.proofId
        : formatProofId("certificate", hash);
      isAnchored = anchored.isAnchored;
      verifyUrl = anchored.verifyUrl;
    }

    return NextResponse.json(
      {
        success: true,
        score,
        passed,
        passThreshold: ASSESSMENT_PASS_THRESHOLD,
        perScenario,
        proofId,
        isAnchored,
        verifyUrl,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error grading assessment." },
      { status: 500 },
    );
  }
}
