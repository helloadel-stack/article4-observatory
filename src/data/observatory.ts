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
  /**
   * True only after WaqfLedger acknowledges the hash on-chain.
   * Omitted / false = local SHA-256 digest, not a live ledger receipt.
   */
  waqfAnchored?: boolean;
  lastAuditDate: string;
  summary: Record<Lang, string>;
}

/** Live on-chain receipt — never infer “Verified” from a hash string alone. */
export function isObservatoryProofAnchored(
  deployment: ObservatoryDeployment,
): boolean {
  return deployment.waqfAnchored === true;
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
  highRiskAnnexIiiCount: number;
  highRiskAnnexIiiPct: number;
  sovereignHostingCount: number;
  sovereignHostingPct: number;
  sovereignCloudPct: number;
  averageComplianceScore: number;
  /** Share of records with a confirmed on-chain WaqfLedger receipt (0–100). */
  waqfAnchoredPct: number;
  waqfAnchoredCount: number;
};

export function computeObservatoryKpis(
  rows: readonly ObservatoryDeployment[],
): ObservatoryKpis {
  const totalDeployments = rows.length;
  if (totalDeployments === 0) {
    return {
      totalDeployments: 0,
      highRiskAnnexIiiCount: 0,
      highRiskAnnexIiiPct: 0,
      sovereignHostingCount: 0,
      sovereignHostingPct: 0,
      sovereignCloudPct: 0,
      averageComplianceScore: 0,
      waqfAnchoredPct: 0,
      waqfAnchoredCount: 0,
    };
  }
  const highRiskAnnexIiiCount = rows.filter((d) =>
    isHighRiskAnnexIII(d.euAiActCategory),
  ).length;
  const sovereignHostingCount = rows.filter((d) => d.isSovereign).length;
  const sovereignCloud = rows.filter((d) =>
    isSovereignCloud(d.hostingSovereignty),
  ).length;
  const waqfAnchoredCount = rows.filter(isObservatoryProofAnchored).length;
  const scoreSum = rows.reduce(
    (acc, d) => acc + computeComplianceScore(d),
    0,
  );
  return {
    totalDeployments,
    highRiskAnnexIiiCount,
    highRiskAnnexIiiPct: Math.round(
      (highRiskAnnexIiiCount / totalDeployments) * 100,
    ),
    sovereignHostingCount,
    sovereignHostingPct: Math.round(
      (sovereignHostingCount / totalDeployments) * 100,
    ),
    sovereignCloudPct: Math.round((sovereignCloud / totalDeployments) * 100),
    averageComplianceScore: Math.round(scoreSum / totalDeployments),
    waqfAnchoredPct: Math.round((waqfAnchoredCount / totalDeployments) * 100),
    waqfAnchoredCount,
  };
}

export function getObservatorySummary(
  deployment: ObservatoryDeployment,
  lang: Lang,
): string {
  return deployment.summary[lang];
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
  "waqfAnchored",
  "lastAuditDate",
  "complianceScore",
  "summary_EN",
  "summary_FR",
  "summary_ES",
] as const;

export type ObservatoryExportRow = Omit<ObservatoryDeployment, "summary"> & {
  complianceScore: number;
  summary_EN: string;
  summary_FR: string;
  summary_ES: string;
};

export function toObservatoryExportRow(
  deployment: ObservatoryDeployment,
): ObservatoryExportRow {
  const { summary, ...rest } = deployment;
  return {
    ...rest,
    waqfAnchored: isObservatoryProofAnchored(deployment),
    complianceScore: computeComplianceScore(deployment),
    summary_EN: summary.EN,
    summary_FR: summary.FR,
    summary_ES: summary.ES,
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
      "d084d03072b4199f16637c657e22a0f2ec1fc9da3b92d203e9279f35b4ff0e22",
    lastAuditDate: "2026-08-01",
    summary: {
      EN: "Open-weights administrative assistant trained on official documentation and hosted on French SecNumCloud infrastructure, with Article 50 interaction disclosure.",
      FR: "Assistant administratif à poids ouverts, entraîné sur la documentation officielle et hébergé sur SecNumCloud, avec mention de transparence Article 50.",
      ES: "Asistente administrativo de pesos abiertos, entrenado con documentación oficial y alojado en SecNumCloud, con divulgación de interacción del Artículo 50.",
    },
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
      "06a02a8b790890f01fc79bcd0e34e7a32b46f656cd45ddd3aca28135e80f735d",
    lastAuditDate: "2026-07-28",
    summary: {
      EN: "Federated LLM workflow for federal administrative document synthesis, hosted on Bundes-Cloud bare-metal servers.",
      FR: "Flux LLM fédéré pour la synthèse de documents administratifs fédéraux, hébergé sur serveurs bare-metal Bundes-Cloud.",
      ES: "Flujo LLM federado para la síntesis de documentos administrativos federales, alojado en servidores bare-metal de Bundes-Cloud.",
    },
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
      "6289675af194f1138beff36992e489ee084fed9a66e2a87c856ffad8ea828d8a",
    lastAuditDate: "2026-08-10",
    summary: {
      EN: "Predictive early-alert system tracking student engagement; an advisor interview is mandatory before any academic intervention (Annex III §3).",
      FR: "Système d’alerte précoce prédictif sur l’engagement étudiant ; un entretien conseiller est obligatoire avant toute intervention académique (Annexe III §3).",
      ES: "Sistema predictivo de alerta temprana sobre el compromiso estudiantil; entrevista con tutor obligatoria antes de cualquier intervención académica (Anexo III §3).",
    },
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
      "3980314a2a4be4f131d63a1bcafc86704191d19f4b0c1efa87e4f8e5a908394a",
    lastAuditDate: "2026-08-04",
    summary: {
      EN: "Regulatory sandbox engine evaluating bias and disparate impact in commercial AI models submitted for Spanish conformity assessment.",
      FR: "Moteur de bac à sable réglementaire évaluant les biais et l’impact disparate des modèles commerciaux soumis à l’évaluation de conformité espagnole.",
      ES: "Motor de sandbox regulatorio que evalúa sesgo e impacto dispar en modelos comerciales presentados a evaluación de conformidad española.",
    },
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
      "39c0b715ade7974a62be1d0464e2d16b278fc7a391da717518f78665bf3ce86c",
    lastAuditDate: "2026-07-30",
    summary: {
      EN: "Oncology imaging assistance with mandatory clinician sign-off and HDS-certified sovereign hosting.",
      FR: "Aide à l’imagerie oncologique avec visa clinicien obligatoire et hébergement souverain certifié HDS.",
      ES: "Apoyo de imagen oncológica con validación clínica obligatoria y alojamiento soberano certificado HDS.",
    },
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
      "e7cc7e8a336e4540e1654ce2c48d943665b4ebf5398ee1afd4a513d13a306970",
    lastAuditDate: "2026-06-25",
    summary: {
      EN: "Healthcare-claims anomaly detection; a human auditor must confirm findings before any claim suspension.",
      FR: "Détection d’anomalies sur les feuilles de soins ; un auditeur humain confirme avant toute suspension de remboursement.",
      ES: "Detección de anomalías en prestaciones sanitarias; un auditor humano confirma antes de suspender un reembolso.",
    },
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
      "6833d2a090a143f190a76266ff2a7d146f2212e6dad7753703b85faa3c54bc29",
    lastAuditDate: "2026-07-15",
    summary: {
      EN: "Judicial research assistant indexing Belgian case law without autonomous decision-making capability.",
      FR: "Assistant de recherche judiciaire indexant la jurisprudence belge, sans capacité de décision autonome.",
      ES: "Asistente de investigación judicial que indexa jurisprudencia belga, sin capacidad de decisión autónoma.",
    },
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
      "cc86f8b339cc312a1440547f2c0555924d714a3efc5c258ae5e83dc0dd8cd4a1",
    lastAuditDate: "2026-08-05",
    summary: {
      EN: "Statistical epidemiological spread model running in isolated Swiss federal private-cloud infrastructure.",
      FR: "Modèle statistique de diffusion épidémiologique opéré dans un cloud privé fédéral suisse isolé.",
      ES: "Modelo estadístico de difusión epidemiológica ejecutado en una nube privada federal suiza aislada.",
    },
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
      "909f97a6e49344cbf78badc05f3bfe274c9b5b610a182de7c2147d24c185098d",
    lastAuditDate: "2026-08-12",
    summary: {
      EN: "Public algorithmic inventory mapping municipal-service AI with Article 50 transparency notices.",
      FR: "Inventaire algorithmique public cartographiant l’IA des services municipaux, avec mentions de transparence Article 50.",
      ES: "Inventario algorítmico público que mapea la IA de servicios municipales, con avisos de transparencia del Artículo 50.",
    },
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
      "ce5eef8b9ddd4f8253e8464f078efd79803d0c844797d80ec9715465fafc5fad",
    lastAuditDate: "2026-07-20",
    summary: {
      EN: "Small-claims procedural document processing under judicial clerk oversight and dual-override control.",
      FR: "Traitement documentaire des petits litiges sous supervision des greffiers et double override obligatoire.",
      ES: "Tramitación documental de reclamaciones menores bajo supervisión de letrados y doble anulación obligatoria.",
    },
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
      "2b1bf27856183eb43386ebf1733f466f32f200ea12cf5bb274301f4d7d4a7456",
    lastAuditDate: "2026-08-14",
    summary: {
      EN: "Academic research evaluator aligned with Quebec Law 25, migrating from US-cloud (EU region) hosting to Canadian sovereign infrastructure.",
      FR: "Évaluateur de recherche académique aligné sur la Loi 25, en migration d’un cloud US (région UE) vers une infrastructure souveraine canadienne.",
      ES: "Evaluador de investigación académica alineado con la Ley 25, en migración de nube US (región UE) a infraestructura soberana canadiense.",
    },
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
      "a7265fc21e2f7faf95889d747b64cad5fe98c7fe86dd8440b471d863256c676d",
    lastAuditDate: "2026-06-15",
    summary: {
      EN: "Decommissioned historical case: real-time public biometric identification prohibited under EU AI Act Article 5.",
      FR: "Cas historique décommissionné : identification biométrique publique en temps réel interdite au titre de l’Article 5.",
      ES: "Caso histórico desmantelado: identificación biométrica pública en tiempo real prohibida por el Artículo 5.",
    },
  },
  {
    id: "OBS-2026-013",
    name: "INPS Automated Claims Routing",
    deployingEntity: "Istituto Nazionale della Previdenza Sociale (INPS)",
    country: "IT",
    countryLabel: "Italy",
    domain: "Social Security",
    euAiActCategory: "Annex III (Public Service)",
    riskLevel: "HIGH",
    hostingSovereignty: "US Cloud (EU Region)",
    isSovereign: false,
    humanInTheLoop: "Supervised Human Review",
    article4LiteracyStatus: "Audit Required",
    waqfledgerProofHash:
      "2f00c9ab6dc9ce1b3976961ac7cd960ef25ce481d05a9af733f5917fdf69dd97",
    lastAuditDate: "2026-08-18",
    summary: {
      EN: "Social-security claims routing on a US hyperscaler EU region; human review is required before benefit denial, with an Article 4 literacy audit pending.",
      FR: "Routage des dossiers de prévoyance sur un hyperscaler US en région UE ; revue humaine obligatoire avant tout refus de prestation, audit de littératie Article 4 en attente.",
      ES: "Enrutado de expedientes de previsión en hiperescalador US (región UE); revisión humana obligatoria antes de denegar una prestación, con auditoría de alfabetización del Artículo 4 pendiente.",
    },
  },
];

/** Alias used by the explorer — same 13-deployment 2026 corpus. */
export const OBSERVATORY_DEPLOYMENTS: readonly ObservatoryDeployment[] =
  OBSERVATORY_DATA;

export const OBSERVATORY_CORPUS_COUNT = OBSERVATORY_DATA.length;
export const OBSERVATORY_JURISDICTION_COUNT = OBSERVATORY_COUNTRIES.length;
