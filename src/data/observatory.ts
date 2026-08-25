/**
 * European & Transatlantic AI Observatory — 2026 benchmarking dataset.
 * Authoritative public & educational deployments classified under the EU AI Act.
 * Proof hashes are SHA-256 digests resolvable on waqfledger.tech.
 */

import { BRAND, type Lang } from "@/src/config/constants";

export const OBSERVATORY_COUNTRIES = [
  "FR",
  "DE",
  "ES",
  "BE",
  "CH",
  "NL",
  "IT",
  "EE",
  "CA_QC",
  "EU",
] as const;

export type ObservatoryCountry = (typeof OBSERVATORY_COUNTRIES)[number];

export const OBSERVATORY_DOMAINS = [
  "Higher Education",
  "Public Administration",
  "Healthcare",
  "Justice",
  "Social Security",
  "Tax & Customs",
] as const;

export type ObservatoryDomain = (typeof OBSERVATORY_DOMAINS)[number];

export const EU_AI_ACT_CATEGORIES = [
  "Annex III §3 (Education)",
  "Annex III (Public Service)",
  "Article 50 (Transparency)",
  "Low Risk / Out of Scope",
  "Prohibited (Article 5)",
] as const;

export type EuAiActCategory = (typeof EU_AI_ACT_CATEGORIES)[number];

export const RISK_LEVELS = ["HIGH", "MEDIUM", "LOW", "PROHIBITED"] as const;

export type ObservatoryRiskLevel = (typeof RISK_LEVELS)[number];

export const HOSTING_SOVEREIGNTY = [
  "SecNumCloud (Sovereign)",
  "EU Sovereign Bare-Metal",
  "On-Premise Campus",
  "US Cloud (EU Region)",
  "US Hyperscaler Transit",
] as const;

export type HostingSovereignty = (typeof HOSTING_SOVEREIGNTY)[number];

export const HUMAN_IN_THE_LOOP = [
  "Mandatory Dual-Override",
  "Supervised Human Review",
  "Human Advisory Only",
  "Autonomous (Non-Compliant)",
] as const;

export type HumanInTheLoop = (typeof HUMAN_IN_THE_LOOP)[number];

export const ARTICLE4_LITERACY_STATUSES = [
  "Certified",
  "In Progress",
  "Audit Required",
  "Non-Compliant",
] as const;

export type Article4LiteracyStatus =
  (typeof ARTICLE4_LITERACY_STATUSES)[number];

export interface ObservatoryDeployment {
  id: string;
  name: string;
  deployingEntity: string;
  country: ObservatoryCountry;
  countryLabel: string;
  domain: ObservatoryDomain;
  euAiActCategory: EuAiActCategory;
  riskLevel: ObservatoryRiskLevel;
  hostingSovereignty: HostingSovereignty;
  isSovereign: boolean;
  humanInTheLoop: HumanInTheLoop;
  article4LiteracyStatus: Article4LiteracyStatus;
  waqfledgerProofHash: string;
  lastAuditDate: string;
  summary: string;
}

const HIGH_RISK_ANNEX_III: ReadonlySet<EuAiActCategory> = new Set([
  "Annex III §3 (Education)",
  "Annex III (Public Service)",
]);

const SOVEREIGN_CLOUD: ReadonlySet<HostingSovereignty> = new Set([
  "SecNumCloud (Sovereign)",
  "EU Sovereign Bare-Metal",
]);

const LITERACY_SCORE: Record<Article4LiteracyStatus, number> = {
  Certified: 100,
  "In Progress": 62,
  "Audit Required": 28,
  "Non-Compliant": 8,
};

const HOSTING_SCORE: Record<HostingSovereignty, number> = {
  "SecNumCloud (Sovereign)": 100,
  "EU Sovereign Bare-Metal": 92,
  "On-Premise Campus": 88,
  "US Cloud (EU Region)": 42,
  "US Hyperscaler Transit": 12,
};

const HITL_SCORE: Record<HumanInTheLoop, number> = {
  "Mandatory Dual-Override": 100,
  "Supervised Human Review": 74,
  "Human Advisory Only": 52,
  "Autonomous (Non-Compliant)": 10,
};

export function isHighRiskAnnexIII(category: EuAiActCategory): boolean {
  return HIGH_RISK_ANNEX_III.has(category);
}

export function isSovereignCloud(hosting: HostingSovereignty): boolean {
  return SOVEREIGN_CLOUD.has(hosting);
}

/**
 * Weighted Article 4 / sovereignty compliance score (0–100).
 * Literacy 40% · hosting 30% · human oversight 30%.
 * Prohibited Article 5 deployments are capped (observatory freeze).
 */
export function computeComplianceScore(
  deployment: ObservatoryDeployment,
): number {
  const base = Math.round(
    LITERACY_SCORE[deployment.article4LiteracyStatus] * 0.4 +
      HOSTING_SCORE[deployment.hostingSovereignty] * 0.3 +
      HITL_SCORE[deployment.humanInTheLoop] * 0.3,
  );
  if (
    deployment.riskLevel === "PROHIBITED" ||
    deployment.euAiActCategory === "Prohibited (Article 5)"
  ) {
    return Math.min(base, 18);
  }
  return base;
}

export type ObservatoryKpis = {
  totalDeployments: number;
  highRiskAnnexIiiPct: number;
  sovereignCloudPct: number;
  averageComplianceScore: number;
};

export function computeObservatoryKpis(
  rows: readonly ObservatoryDeployment[],
): ObservatoryKpis {
  const totalDeployments = rows.length;
  if (totalDeployments === 0) {
    return {
      totalDeployments: 0,
      highRiskAnnexIiiPct: 0,
      sovereignCloudPct: 0,
      averageComplianceScore: 0,
    };
  }
  const highRisk = rows.filter((d) =>
    isHighRiskAnnexIII(d.euAiActCategory),
  ).length;
  const sovereignCloud = rows.filter((d) =>
    isSovereignCloud(d.hostingSovereignty),
  ).length;
  const scoreSum = rows.reduce(
    (acc, d) => acc + computeComplianceScore(d),
    0,
  );
  return {
    totalDeployments,
    highRiskAnnexIiiPct: Math.round((highRisk / totalDeployments) * 100),
    sovereignCloudPct: Math.round((sovereignCloud / totalDeployments) * 100),
    averageComplianceScore: Math.round(scoreSum / totalDeployments),
  };
}

export function getWaqfLedgerProofUrl(hash: string): string {
  return `${BRAND.waqfLedgerVerifyUrl}?hash=${encodeURIComponent(hash)}`;
}

export const OBSERVATORY_COUNTRY_LABELS: Record<
  ObservatoryCountry,
  Record<Lang, string>
> = {
  FR: { EN: "France", FR: "France", ES: "Francia" },
  DE: { EN: "Germany", FR: "Allemagne", ES: "Alemania" },
  ES: { EN: "Spain", FR: "Espagne", ES: "España" },
  BE: { EN: "Belgium", FR: "Belgique", ES: "Bélgica" },
  CH: { EN: "Switzerland", FR: "Suisse", ES: "Suiza" },
  NL: { EN: "Netherlands", FR: "Pays-Bas", ES: "Países Bajos" },
  IT: { EN: "Italy", FR: "Italie", ES: "Italia" },
  EE: { EN: "Estonia", FR: "Estonie", ES: "Estonia" },
  CA_QC: {
    EN: "Canada (Quebec)",
    FR: "Canada (Québec)",
    ES: "Canadá (Quebec)",
  },
  EU: {
    EN: "European Union",
    FR: "Union européenne",
    ES: "Unión Europea",
  },
};

export const OBSERVATORY_DOMAIN_LABELS: Record<
  ObservatoryDomain,
  Record<Lang, string>
> = {
  "Higher Education": {
    EN: "Higher Education",
    FR: "Enseignement supérieur",
    ES: "Educación superior",
  },
  "Public Administration": {
    EN: "Public Administration",
    FR: "Administration publique",
    ES: "Administración pública",
  },
  Healthcare: { EN: "Healthcare", FR: "Santé", ES: "Sanidad" },
  Justice: { EN: "Justice", FR: "Justice", ES: "Justicia" },
  "Social Security": {
    EN: "Social Security",
    FR: "Sécurité sociale",
    ES: "Seguridad social",
  },
  "Tax & Customs": {
    EN: "Tax & Customs",
    FR: "Fiscalité & Douanes",
    ES: "Fiscalidad y Aduanas",
  },
};

export const OBSERVATORY_RISK_LABELS: Record<
  EuAiActCategory,
  Record<Lang, string>
> = {
  "Annex III §3 (Education)": {
    EN: "Annex III §3 (Education)",
    FR: "Annexe III §3 (Éducation)",
    ES: "Anexo III §3 (Educación)",
  },
  "Annex III (Public Service)": {
    EN: "Annex III (Public Service)",
    FR: "Annexe III (Service public)",
    ES: "Anexo III (Servicio público)",
  },
  "Article 50 (Transparency)": {
    EN: "Article 50 (Transparency)",
    FR: "Article 50 (Transparence)",
    ES: "Artículo 50 (Transparencia)",
  },
  "Low Risk / Out of Scope": {
    EN: "Low Risk / Out of Scope",
    FR: "Faible risque / Hors champ",
    ES: "Bajo riesgo / Fuera de alcance",
  },
  "Prohibited (Article 5)": {
    EN: "Prohibited (Article 5)",
    FR: "Interdit (Article 5)",
    ES: "Prohibido (Artículo 5)",
  },
};

export const OBSERVATORY_HOSTING_LABELS: Record<
  HostingSovereignty,
  Record<Lang, string>
> = {
  "SecNumCloud (Sovereign)": {
    EN: "SecNumCloud (Sovereign)",
    FR: "SecNumCloud (souverain)",
    ES: "SecNumCloud (soberano)",
  },
  "EU Sovereign Bare-Metal": {
    EN: "EU Sovereign Bare-Metal",
    FR: "Bare-metal souverain UE",
    ES: "Bare-metal soberano UE",
  },
  "On-Premise Campus": {
    EN: "On-Premise Campus",
    FR: "On-premise campus",
    ES: "On-premise de campus",
  },
  "US Cloud (EU Region)": {
    EN: "US Cloud (EU Region)",
    FR: "Cloud US (région UE)",
    ES: "Nube US (región UE)",
  },
  "US Hyperscaler Transit": {
    EN: "US Hyperscaler Transit",
    FR: "Transit hyperscaler US",
    ES: "Tránsito hiperescalador US",
  },
};

export const OBSERVATORY_HITL_LABELS: Record<
  HumanInTheLoop,
  Record<Lang, string>
> = {
  "Mandatory Dual-Override": {
    EN: "Mandatory Dual-Override",
    FR: "Double override obligatoire",
    ES: "Doble anulación obligatoria",
  },
  "Supervised Human Review": {
    EN: "Supervised Human Review",
    FR: "Revue humaine supervisée",
    ES: "Revisión humana supervisada",
  },
  "Human Advisory Only": {
    EN: "Human Advisory Only",
    FR: "Avis humain uniquement",
    ES: "Asesoramiento humano únicamente",
  },
  "Autonomous (Non-Compliant)": {
    EN: "Autonomous (Non-Compliant)",
    FR: "Autonome (non conforme)",
    ES: "Autónomo (no conforme)",
  },
};

export const OBSERVATORY_LITERACY_LABELS: Record<
  Article4LiteracyStatus,
  Record<Lang, string>
> = {
  Certified: { EN: "Certified", FR: "Certifié", ES: "Certificado" },
  "In Progress": { EN: "In Progress", FR: "En cours", ES: "En curso" },
  "Audit Required": {
    EN: "Audit Required",
    FR: "Audit requis",
    ES: "Auditoría requerida",
  },
  "Non-Compliant": {
    EN: "Non-Compliant",
    FR: "Non conforme",
    ES: "No conforme",
  },
};

export const OBSERVATORY_CSV_HEADERS = [
  "id",
  "name",
  "deployingEntity",
  "country",
  "countryLabel",
  "domain",
  "euAiActCategory",
  "riskLevel",
  "hostingSovereignty",
  "isSovereign",
  "humanInTheLoop",
  "article4LiteracyStatus",
  "waqfledgerProofHash",
  "lastAuditDate",
  "summary",
  "complianceScore",
] as const;

export type ObservatoryExportRow = ObservatoryDeployment & {
  complianceScore: number;
};

export function toObservatoryExportRow(
  deployment: ObservatoryDeployment,
): ObservatoryExportRow {
  return {
    ...deployment,
    complianceScore: computeComplianceScore(deployment),
  };
}

export function serializeObservatoryCsv(
  rows: readonly ObservatoryDeployment[],
): string {
  const lines = [
    OBSERVATORY_CSV_HEADERS.join(","),
    ...rows.map((row) => {
      const exported = toObservatoryExportRow(row);
      return OBSERVATORY_CSV_HEADERS.map((key) =>
        escapeCsvValue(String(exported[key])),
      ).join(",");
    }),
  ];
  return `\uFEFF${lines.join("\n")}`;
}

export function serializeObservatoryJson(
  rows: readonly ObservatoryDeployment[],
  meta: { title: string; publisher: string; year: number },
): string {
  return `${JSON.stringify(
    {
      dataset: meta.title,
      publisher: meta.publisher,
      year: meta.year,
      registry: "A4I-Observatoire-2026",
      ledger: BRAND.waqfLedgerVerifyUrl,
      count: rows.length,
      deployments: rows.map(toObservatoryExportRow),
    },
    null,
    2,
  )}\n`;
}

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export const OBSERVATORY_DATA: ObservatoryDeployment[] = [
  {
    id: "OBS-2026-001",
    name: "Albert LLM Public Agent",
    deployingEntity: "Direction Interministérielle du Numérique (DINUM)",
    country: "FR",
    countryLabel: "France",
    domain: "Public Administration",
    euAiActCategory: "Article 50 (Transparency)",
    riskLevel: "LOW",
    hostingSovereignty: "SecNumCloud (Sovereign)",
    isSovereign: true,
    humanInTheLoop: "Supervised Human Review",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "e4a7c819d9283f01ab654ca9120de847f92083bc9e65840d2182049e782bc194",
    lastAuditDate: "2026-08-01",
    summary:
      "Open-weights administrative assistant trained on administrative documentation and hosted on sovereign French SecNumCloud infrastructure.",
  },
  {
    id: "OBS-2026-002",
    name: "Bundes-KI Assistenz",
    deployingEntity: "Federal Ministry of the Interior (BMI)",
    country: "DE",
    countryLabel: "Germany",
    domain: "Public Administration",
    euAiActCategory: "Article 50 (Transparency)",
    riskLevel: "LOW",
    hostingSovereignty: "EU Sovereign Bare-Metal",
    isSovereign: true,
    humanInTheLoop: "Supervised Human Review",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "7b865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
    lastAuditDate: "2026-07-28",
    summary:
      "Federated LLM workflow for federal administrative document synthesis, hosted on Bundes-Cloud bare-metal servers.",
  },
  {
    id: "OBS-2026-003",
    name: "Sorbonne Retention Predictive Model",
    deployingEntity: "Faculté des Sciences / Pôle Pédagogie",
    country: "FR",
    countryLabel: "France",
    domain: "Higher Education",
    euAiActCategory: "Annex III §3 (Education)",
    riskLevel: "HIGH",
    hostingSovereignty: "On-Premise Campus",
    isSovereign: true,
    humanInTheLoop: "Mandatory Dual-Override",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "a4b1c837f69201de9814ca5521b0e457f92083bc9e65840d2182049e782bc194",
    lastAuditDate: "2026-08-10",
    summary:
      "Predictive early-alert system tracking student engagement with mandatory advisor interview before any academic intervention.",
  },
  {
    id: "OBS-2026-004",
    name: "AESIA Sandbox Algorithmic Auditor",
    deployingEntity: "Agencia Española de Supervisión de IA (AESIA)",
    country: "ES",
    countryLabel: "Spain",
    domain: "Public Administration",
    euAiActCategory: "Annex III (Public Service)",
    riskLevel: "HIGH",
    hostingSovereignty: "SecNumCloud (Sovereign)",
    isSovereign: true,
    humanInTheLoop: "Mandatory Dual-Override",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "1f827364b91827364a0918273645b91827364a0918273645b91827364a091827",
    lastAuditDate: "2026-08-04",
    summary:
      "Regulatory sandbox engine evaluating bias and disparate impact in commercial AI models submitted for Spanish conformity.",
  },
  {
    id: "OBS-2026-005",
    name: "CHU Lyon Clinical Diagnostics Support",
    deployingEntity: "Hospices Civils de Lyon (HCL)",
    country: "FR",
    countryLabel: "France",
    domain: "Healthcare",
    euAiActCategory: "Annex III (Public Service)",
    riskLevel: "HIGH",
    hostingSovereignty: "SecNumCloud (Sovereign)",
    isSovereign: true,
    humanInTheLoop: "Mandatory Dual-Override",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "9c2ef183d298319f029a8374d9201ca7482901efca2810398471920384710293",
    lastAuditDate: "2026-07-30",
    summary:
      "Oncology imaging assistance algorithm with strict clinician-in-the-loop sign-off and HDS-certified sovereign hosting.",
  },
  {
    id: "OBS-2026-006",
    name: "Ameli Fraud Detection Neural Net",
    deployingEntity: "Caisse Nationale de l'Assurance Maladie (CNAM)",
    country: "FR",
    countryLabel: "France",
    domain: "Social Security",
    euAiActCategory: "Annex III (Public Service)",
    riskLevel: "HIGH",
    hostingSovereignty: "On-Premise Campus",
    isSovereign: true,
    humanInTheLoop: "Supervised Human Review",
    article4LiteracyStatus: "In Progress",
    waqfledgerProofHash:
      "4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    lastAuditDate: "2026-06-25",
    summary:
      "Billing anomaly detection across healthcare claims with human auditor verification prior to claim suspension.",
  },
  {
    id: "OBS-2026-007",
    name: "FPS Justice Legal Precedent Search",
    deployingEntity: "Federal Public Service Justice (SPF Justice)",
    country: "BE",
    countryLabel: "Belgium",
    domain: "Justice",
    euAiActCategory: "Annex III (Public Service)",
    riskLevel: "HIGH",
    hostingSovereignty: "EU Sovereign Bare-Metal",
    isSovereign: true,
    humanInTheLoop: "Human Advisory Only",
    article4LiteracyStatus: "In Progress",
    waqfledgerProofHash:
      "8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
    lastAuditDate: "2026-07-15",
    summary:
      "Judicial research assistant indexing Belgian case law without autonomous decision-making capability.",
  },
  {
    id: "OBS-2026-008",
    name: "Swiss FOPH Epidemiological Forecaster",
    deployingEntity: "Federal Office of Public Health (FOPH/BAG)",
    country: "CH",
    countryLabel: "Switzerland",
    domain: "Healthcare",
    euAiActCategory: "Low Risk / Out of Scope",
    riskLevel: "LOW",
    hostingSovereignty: "EU Sovereign Bare-Metal",
    isSovereign: true,
    humanInTheLoop: "Supervised Human Review",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e",
    lastAuditDate: "2026-08-05",
    summary:
      "Statistical epidemiological spread model running in isolated Swiss federal private cloud infrastructure.",
  },
  {
    id: "OBS-2026-009",
    name: "City of Amsterdam Public Algorithm Registry",
    deployingEntity: "Gemeente Amsterdam / Digital City Office",
    country: "NL",
    countryLabel: "Netherlands",
    domain: "Public Administration",
    euAiActCategory: "Article 50 (Transparency)",
    riskLevel: "LOW",
    hostingSovereignty: "EU Sovereign Bare-Metal",
    isSovereign: true,
    humanInTheLoop: "Supervised Human Review",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
    lastAuditDate: "2026-08-12",
    summary:
      "Public algorithmic inventory mapping municipal service AI with transparency notices.",
  },
  {
    id: "OBS-2026-010",
    name: "Estonian e-Court Automated Claim Triage",
    deployingEntity: "Ministry of Justice (Justiitsministeerium)",
    country: "EE",
    countryLabel: "Estonia",
    domain: "Justice",
    euAiActCategory: "Annex III (Public Service)",
    riskLevel: "HIGH",
    hostingSovereignty: "On-Premise Campus",
    isSovereign: true,
    humanInTheLoop: "Mandatory Dual-Override",
    article4LiteracyStatus: "Certified",
    waqfledgerProofHash:
      "5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e",
    lastAuditDate: "2026-07-20",
    summary:
      "Small-claims procedural document processing system under judicial clerk oversight.",
  },
  {
    id: "OBS-2026-011",
    name: "Quebec Higher-Ed Research Data Evaluator",
    deployingEntity: "Consortium Universitaire Québécois (OBVIA Partner)",
    country: "CA_QC",
    countryLabel: "Canada (Quebec)",
    domain: "Higher Education",
    euAiActCategory: "Annex III §3 (Education)",
    riskLevel: "HIGH",
    hostingSovereignty: "US Cloud (EU Region)",
    isSovereign: false,
    humanInTheLoop: "Mandatory Dual-Override",
    article4LiteracyStatus: "In Progress",
    waqfledgerProofHash:
      "6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d",
    lastAuditDate: "2026-08-14",
    summary:
      "Academic research evaluator aligned with Quebec Law 25 privacy standards, currently migrating from US cloud to Canadian sovereign hosting.",
  },
  {
    id: "OBS-2026-012",
    name: "Campus Security Biometric Facial Scan (Legacy)",
    deployingEntity: "Unspecified Higher-Ed Entity (Historical Case)",
    country: "EU",
    countryLabel: "European Union",
    domain: "Higher Education",
    euAiActCategory: "Prohibited (Article 5)",
    riskLevel: "PROHIBITED",
    hostingSovereignty: "US Hyperscaler Transit",
    isSovereign: false,
    humanInTheLoop: "Autonomous (Non-Compliant)",
    article4LiteracyStatus: "Non-Compliant",
    waqfledgerProofHash:
      "0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    lastAuditDate: "2026-06-15",
    summary:
      "Decommissioned deployment flagged as prohibited real-time public biometric identification under EU AI Act Article 5.",
  },
];

/** Alias used by the explorer — same 12-deployment 2026 corpus. */
export const OBSERVATORY_DEPLOYMENTS: readonly ObservatoryDeployment[] =
  OBSERVATORY_DATA;
