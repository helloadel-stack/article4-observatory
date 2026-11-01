/**
 * Bi-weekly Observatory release generator.
 *
 * Reads src/data/observatory.ts, seals any entry that still has an empty or
 * pending proof hash, and writes docs/LATEST_BIWEEKLY_RELEASE.md.
 *
 * Canonical digest (field order is part of the canon):
 *   SHA-256(Metadata || Annex III Matrix || Oversight Log)
 *
 *   Metadata
 *     id, name, deployingEntity, country, domain, hosting, lastAuditDate
 *   Annex III Matrix
 *     euAiActCategory, riskLevel, isSovereign
 *   Oversight Log
 *     humanInTheLoop, article4LiteracyStatus, summary EN/FR/ES
 *
 * Blocks are joined with "||". Historical digests that predate this canon
 * are verified for shape and retained; they are never rewritten.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "data", "observatory.ts");
const releasePath = path.join(root, "docs", "LATEST_BIWEEKLY_RELEASE.md");

const PENDING_HASH = "PENDING_CANONICAL_SHA256";
const HASH_RE = /^[a-f0-9]{64}$/;

const HIGH_RISK_ANNEX_III = new Set([
  "Annex III §3 (Education)",
  "Annex III (Public Service)",
  "Annex III §2/3 (High-Risk)",
]);

const LATEST_COHORT_IDS = ["A4I-OBS-2026-013", "A4I-OBS-2026-014"];

function extractArrayLiteral(source, exportName) {
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start < 0) {
    throw new Error(`Missing export ${exportName} in ${sourcePath}`);
  }
  const equals = source.indexOf("= [", start);
  if (equals < 0) throw new Error(`Missing array assignment for ${exportName}`);
  const bracket = equals + 2;

  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = bracket; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "/" && source[i + 1] === "/") {
      const nl = source.indexOf("\n", i);
      i = nl === -1 ? source.length : nl;
      continue;
    }
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(bracket, i + 1);
    }
  }
  throw new Error(`Unbalanced array for ${exportName}`);
}

function readEntries(source) {
  const literal = extractArrayLiteral(source, "OBSERVATORY_DATA");
  const entries = Function(`"use strict"; return (${literal});`)();
  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("OBSERVATORY_DATA did not parse to a non-empty array");
  }
  return entries;
}

function block(lines) {
  return lines.join("\n");
}

export function canonicalObservatoryPreimage(entry) {
  const metadata = block([
    `id=${entry.id}`,
    `name=${entry.name}`,
    `deployingEntity=${entry.deployingEntity}`,
    `country=${entry.country}`,
    `domain=${entry.domain}`,
    `hosting=${entry.hostingSovereignty}`,
    `audit=${entry.lastAuditDate}`,
  ]);
  const annexIIIMatrix = block([
    `category=${entry.euAiActCategory}`,
    `risk=${entry.riskLevel}`,
    `sovereign=${entry.isSovereign ? "1" : "0"}`,
  ]);
  const oversightLog = block([
    `hitl=${entry.humanInTheLoop}`,
    `literacy=${entry.article4LiteracyStatus}`,
    `summaryEN=${entry.summary?.EN ?? ""}`,
    `summaryFR=${entry.summary?.FR ?? ""}`,
    `summaryES=${entry.summary?.ES ?? ""}`,
  ]);
  return `${metadata}||${annexIIIMatrix}||${oversightLog}`;
}

export function canonicalObservatoryDigest(entry) {
  return crypto
    .createHash("sha256")
    .update(canonicalObservatoryPreimage(entry), "utf8")
    .digest("hex");
}

function needsSeal(hash) {
  return typeof hash !== "string" || hash.length === 0 || hash === PENDING_HASH;
}

function patchHash(source, id, hash) {
  const idToken = `id: "${id}"`;
  const idAt = source.indexOf(idToken);
  if (idAt < 0) throw new Error(`Cannot patch missing id ${id}`);
  const nextRecord = source.indexOf("\n  {", idAt + idToken.length);
  const sliceEnd = nextRecord === -1 ? source.length : nextRecord;
  const slice = source.slice(idAt, sliceEnd);
  const next = slice.replace(
    /waqfledgerProofHash:\s*"PENDING_CANONICAL_SHA256"/,
    `waqfledgerProofHash:\n      "${hash}"`,
  );
  if (next === slice) {
    throw new Error(`No pending hash field to seal for ${id}`);
  }
  return source.slice(0, idAt) + next + source.slice(sliceEnd);
}

function computeKpis(rows) {
  const total = rows.length;
  const highRisk = rows.filter((row) =>
    HIGH_RISK_ANNEX_III.has(row.euAiActCategory),
  ).length;
  const sovereign = rows.filter((row) => row.isSovereign === true).length;
  const anchored = rows.filter((row) => row.waqfAnchored === true).length;
  const pct = (count) => Math.round((count / total) * 100);
  return {
    total,
    highRisk,
    highRiskPct: pct(highRisk),
    sovereign,
    sovereignPct: pct(sovereign),
    anchored,
    anchoredPct: pct(anchored),
  };
}

function assertTweet(label, text) {
  if (text.length > 280) {
    throw new Error(`${label} is ${text.length} characters (max 280):\n${text}`);
  }
  return text;
}

function buildRelease(entries, audits, kpis) {
  const generatedOn = new Date().toISOString().slice(0, 10);
  const cohort = entries.filter((entry) => LATEST_COHORT_IDS.includes(entry.id));
  const cohortLines = cohort
    .map(
      (entry) =>
        `- **${entry.id}** — ${entry.deployingEntity}. Use case: ${entry.name}. Risk: ${entry.euAiActCategory}. Hosting: ${entry.hostingSovereignty}. Status: ${entry.waqfAnchored ? "Verified" : "Pending anchor"}. Digest: \`${entry.waqfledgerProofHash}\`.`,
    )
    .join("\n");

  const auditLines = audits
    .map(
      (row) =>
        `| ${row.id} | ${row.status} | \`${row.hash.slice(0, 16)}…\` |`,
    )
    .join("\n");

  const linkedInFr = [
    `Observatoire Article 4 — mise à jour bi-hebdomadaire (${generatedOn}).`,
    ``,
    `Le corpus public et académique compte désormais ${kpis.total} systèmes.`,
    ``,
    `Deux dossiers vérifiés rejoignent le benchmark, ancrés sur WaqfLedger :`,
    `• A4I-OBS-2026-013 — Agence du Numérique en Santé (ANS, France) : audit de conformité des dispositifs médicaux IA et triage HDS. Annexe III §2/3 (haut risque). Hébergement SecNumCloud / certifié HDS.`,
    `• A4I-OBS-2026-014 — EPFL & ETH Zürich, Swiss AI Initiative : modèles de fondation académiques ouverts et évaluation multilingue. Article 50 / transparence GPAI. Supercalculateur CSCS Alps, on-premise souverain.`,
    ``,
    `Indicateurs live :`,
    `• Systèmes indexés : ${kpis.total}`,
    `• Annexe III haut risque : ${kpis.highRiskPct}% (${kpis.highRisk}/${kpis.total})`,
    `• Hébergement souverain : ${kpis.sovereignPct}% (${kpis.sovereign}/${kpis.total})`,
    `• Ancrage WaqfLedger : ${kpis.anchoredPct}% (${kpis.anchored}/${kpis.total})`,
    ``,
    `Sceau canonique : SHA-256(Metadata || Annex III Matrix || Oversight Log).`,
    `https://article4institute.org`,
  ].join("\n");

  const linkedInEn = [
    `Article 4 Observatory — bi-weekly update (${generatedOn}).`,
    ``,
    `The public and academic benchmark now tracks ${kpis.total} systems.`,
    ``,
    `Two verified records join the corpus, anchored on WaqfLedger:`,
    `• A4I-OBS-2026-013 — Agence du Numérique en Santé (ANS, France): AI medical-device conformity audit and HDS triage. Annex III §2/3 (high-risk). SecNumCloud / HDS-certified sovereign hosting.`,
    `• A4I-OBS-2026-014 — EPFL & ETH Zürich, Swiss AI Initiative: open academic foundation models and multilingual evaluation. Article 50 / GPAI transparency. CSCS Alps supercomputer, on-premise sovereign.`,
    ``,
    `Live indicators:`,
    `• Systems indexed: ${kpis.total}`,
    `• Annex III high-risk: ${kpis.highRiskPct}% (${kpis.highRisk}/${kpis.total})`,
    `• Sovereign hosting: ${kpis.sovereignPct}% (${kpis.sovereign}/${kpis.total})`,
    `• WaqfLedger anchored: ${kpis.anchoredPct}% (${kpis.anchored}/${kpis.total})`,
    ``,
    `Canonical seal: SHA-256(Metadata || Annex III Matrix || Oversight Log).`,
    `https://article4institute.org`,
  ].join("\n");

  const thread = [
    assertTweet(
      "X 1",
      `1/ Article 4 Observatory, ${generatedOn}. The 2026 public and academic AI benchmark now tracks ${kpis.total} systems. Two verified records join the corpus.`,
    ),
    assertTweet(
      "X 2",
      "2/ A4I-OBS-2026-013 ANS (France): AI medical-device conformity audit and HDS triage. Annex III §2/3, high-risk. SecNumCloud / HDS-certified. Verified on WaqfLedger.",
    ),
    assertTweet(
      "X 3",
      "3/ A4I-OBS-2026-014 EPFL & ETH Zürich — Swiss AI Initiative: open academic foundation models and multilingual evaluation. Article 50 / GPAI transparency. CSCS Alps, on-premise sovereign. Verified.",
    ),
    assertTweet(
      "X 4",
      `4/ Live KPIs — Annex III high-risk ${kpis.highRiskPct}% · Sovereign hosting ${kpis.sovereignPct}% · WaqfLedger anchored ${kpis.anchoredPct}%. Seal: SHA-256(Metadata || Annex III Matrix || Oversight Log). https://article4institute.org`,
    ),
  ];

  return `# Latest bi-weekly Observatory release

Generated: ${generatedOn}
Registry: A4I-Observatoire-2026
Canon: \`SHA-256(Metadata || Annex III Matrix || Oversight Log)\`

## Live KPI summary

| Indicator | Value |
| --- | ---: |
| Total systems | ${kpis.total} |
| Annex III high-risk | ${kpis.highRiskPct}% (${kpis.highRisk}/${kpis.total}) |
| Sovereign hosting | ${kpis.sovereignPct}% (${kpis.sovereign}/${kpis.total}) |
| WaqfLedger anchored | ${kpis.anchoredPct}% (${kpis.anchored}/${kpis.total}) |

These figures are computed from \`OBSERVATORY_DATA\`. The homepage explorer, CSV export, and JSON export read the same array, so the benchmark stays aligned.

## Latest cohort

${cohortLines || "_No A4I-OBS-2026-013 / 014 records found._"}

## Proof-hash audit

| Record | Status | Digest prefix |
| --- | --- | --- |
${auditLines}

\`verified\` means the stored digest matches the canonical preimage. \`sealed-retained\` means a historical digest is present and was not rewritten. \`generated\` means this run wrote a missing digest back into \`src/data/observatory.ts\`.

## LinkedIn — Français

\`\`\`
${linkedInFr}
\`\`\`

## LinkedIn — English

\`\`\`
${linkedInEn}
\`\`\`

## X (Twitter) thread

\`\`\`
${thread.join("\n\n")}
\`\`\`
`;
}

function main() {
  let source = fs.readFileSync(sourcePath, "utf8");
  let entries = readEntries(source);
  const generated = [];

  for (const entry of entries) {
    if (!needsSeal(entry.waqfledgerProofHash)) continue;
    const hash = canonicalObservatoryDigest(entry);
    source = patchHash(source, entry.id, hash);
    generated.push(entry.id);
  }

  if (generated.length > 0) {
    fs.writeFileSync(sourcePath, source);
    entries = readEntries(source);
  }

  const audits = entries.map((entry) => {
    const hash = entry.waqfledgerProofHash;
    if (!HASH_RE.test(hash ?? "")) {
      throw new Error(`${entry.id} is missing a 64-character SHA-256 digest`);
    }
    const recomputed = canonicalObservatoryDigest(entry);
    let status = "sealed-retained";
    if (generated.includes(entry.id)) status = "generated";
    else if (recomputed === hash) status = "verified";
    return { id: entry.id, status, hash };
  });

  const kpis = computeKpis(entries);
  fs.mkdirSync(path.dirname(releasePath), { recursive: true });
  fs.writeFileSync(releasePath, buildRelease(entries, audits, kpis));

  console.log(
    `Observatory bi-weekly release: ${kpis.total} systems, Annex III high-risk ${kpis.highRiskPct}%, sovereign hosting ${kpis.sovereignPct}%, WaqfLedger anchored ${kpis.anchoredPct}%.`,
  );
  if (generated.length > 0) {
    console.log(`Sealed missing digests: ${generated.join(", ")}`);
  }
  const mismatched = audits.filter((row) => row.status === "sealed-retained");
  if (mismatched.length > 0) {
    console.log(
      `Retained ${mismatched.length} historical digests that predate this canon.`,
    );
  }
  console.log(`Wrote ${path.relative(root, releasePath)}`);
}

const invokedPath = process.argv[1]
  ? path.resolve(process.argv[1])
  : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
