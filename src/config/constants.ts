/**
 * Canonical registry for SafeAI Framework & European Observatory.
 * Metadata truth — never invent free tiers or placeholder commerce as live.
 */

export const SUPPORTED_LANGS = ["EN", "FR", "ES"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

/** HTML lang attribute binding — LTR only; Arabic/RTL excluded by mandate. */
export const LANG_TO_HTML: Record<Lang, string> = {
  EN: "en",
  FR: "fr",
  ES: "es",
};

export const BRAND = {
  name: "SafeAI Framework & European Observatory",
  shortName: "SafeAI Framework",
  subtitle: {
    EN: "by Article 4 Institute",
    FR: "par Article 4 Institute",
    ES: "por Article 4 Institute",
  },
  institute: "Article 4 Institute",
  instituteUrl: "https://article4institute.org",
  linkedInUrl: "https://www.linkedin.com/company/l-institut-article-4-a4i/",
  waqfLedgerUrl: "https://waqfledger.tech",
  safeAiReportUrl: "https://safeai.report",
  lemonSqueezyDocsUrl: "https://docs.lemonsqueezy.com/help/privacy",
} as const;

export const SITE_METADATA = {
  title:
    "SafeAI Framework & European Observatory | EU AI Act & Higher Ed Governance",
  description:
    "Turnkey EU AI Act and ethical AI governance toolkits for higher education. Institutional policies, high-risk audit kits, and Article 4 literacy frameworks — logged via WaqfLedger.",
  author: "Adel El Bouzagaoui",
  publisher: "L'Institut Article 4 (A4I)",
  datasetTitle: "European AI Sovereignty Index",
  salesEmail: "sales@article4institute.org",
  privacyEmail: "privacy@article4institute.org",
  dpoEmail: "dpo@article4institute.org",
  year: 2026,
} as const;

export const LEMON_SQUEEZY = {
  storeName: "SafeAI Framework",
  scriptSrc: "https://assets.lemonsqueezy.com/lemon.js",
  /**
   * Live overlay checkout URLs for the SafeAI Framework store.
   * Prefer NEXT_PUBLIC_LEMON_TIER_*_URL; fallbacks are placeholders until product IDs are wired.
   */
  checkoutUrls: {
    tier1:
      process.env.NEXT_PUBLIC_LEMON_TIER_1_URL ||
      "https://safeai.lemonsqueezy.com/buy/YOUR_TIER_1_ID",
    tier2:
      process.env.NEXT_PUBLIC_LEMON_TIER_2_URL ||
      "https://safeai.lemonsqueezy.com/buy/YOUR_TIER_2_ID",
    tier3:
      process.env.NEXT_PUBLIC_LEMON_TIER_3_URL ||
      "https://safeai.lemonsqueezy.com/buy/YOUR_TIER_3_ID",
  },
} as const;

export type CheckoutKey = keyof typeof LEMON_SQUEEZY.checkoutUrls;

const PLACEHOLDER_TOKEN_RE = /YOUR_TIER_\d+_ID|YOUR_LEMON_SQUEEZY_TIER_\d+_URL/i;

/** True when URL is a live Lemon Squeezy checkout (not a placeholder / missing value). */
export function isLiveLemonCheckoutUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || PLACEHOLDER_TOKEN_RE.test(trimmed)) return false;
  return (
    trimmed.startsWith("https://safeai.lemonsqueezy.com") ||
    trimmed.startsWith("https://lemonsqueezy.com")
  );
}

export function getProcurementMailto(tierTitle: string): string {
  const subject = encodeURIComponent(
    `Direct Procurement — ${tierTitle} | Article 4 Institute`,
  );
  const body = encodeURIComponent(
    [
      "Hello Article 4 Institute Procurement Team,",
      "",
      `I am requesting direct procurement for: ${tierTitle}`,
      "",
      "Institution / Organization:",
      "Contact name:",
      "Business email:",
      "Campus / seats required:",
      "",
      "Thank you.",
    ].join("\n"),
  );
  return `mailto:${SITE_METADATA.salesEmail}?subject=${subject}&body=${body}`;
}

type LocalizedTier = {
  title: string;
  target: string;
  badge: string | null;
  features: readonly string[];
};

type PricingTier = {
  id: string;
  price: string;
  featured: boolean;
  checkoutKey: CheckoutKey;
  EN: LocalizedTier;
  FR: LocalizedTier;
  ES: LocalizedTier;
};

/** Strict B2B pricing registry — never invent free tiers */
export const PRICING_TIERS = [
  {
    id: "tier1",
    price: "€399",
    featured: false,
    checkoutKey: "tier1",
    EN: {
      title: "Article 4 AI Literacy Kit",
      target: "Single Campus / Department Pass",
      badge: null,
      features: [
        "Institutional Policy (.docx)",
        "Syllabus Clauses",
        "Staff Training Deck (.pptx)",
      ],
    },
    FR: {
      title: "Kit Culture IA Art. 4",
      target: "Pass campus unique / département",
      badge: null,
      features: [
        "Politique institutionnelle (.docx)",
        "Clauses pour syllabus",
        "Support de formation du personnel (.pptx)",
      ],
    },
    ES: {
      title: "Kit de Alfabetización IA Art. 4",
      target: "Pase de campus único / departamento",
      badge: null,
      features: [
        "Política institucional (.docx)",
        "Cláusulas para sílabos",
        "Presentación de formación del personal (.pptx)",
      ],
    },
  },
  {
    id: "tier2",
    price: "€999",
    featured: true,
    checkoutKey: "tier2",
    EN: {
      title: "EdTech & High-Risk Audit Kit",
      target: "Institutional & EdTech Platform License",
      badge: "Most Popular for Universities",
      features: [
        "Annex III Risk Matrix (.xlsx)",
        "Predictive Retention Audit SOP",
        "Article 50 Transparency Log",
      ],
    },
    FR: {
      title: "Kit d'Audit Risque Élevé",
      target: "Licence institutionnelle & plateforme EdTech",
      badge: "Le plus populaire pour les universités",
      features: [
        "Matrice de risque Annexe III (.xlsx)",
        "SOP d’audit de rétention prédictive",
        "Journal de transparence Article 50",
      ],
    },
    ES: {
      title: "Kit de Auditoría de Alto Riesgo",
      target: "Licencia institucional y plataforma EdTech",
      badge: "El más popular para universidades",
      features: [
        "Matriz de riesgo Anexo III (.xlsx)",
        "SOP de auditoría de retención predictiva",
        "Registro de transparencia Artículo 50",
      ],
    },
  },
  {
    id: "tier3",
    price: "€2,499",
    featured: false,
    checkoutKey: "tier3",
    EN: {
      title: "SafeAI Enterprise + WaqfLedger Proof",
      target: "Enterprise & Multi-Campus System",
      badge: null,
      features: [
        "Full Redistribution Rights",
        "Custom Governance SOPs",
        "Cryptographic Verification Setup via waqfledger.tech",
      ],
    },
    FR: {
      title: "Licence Entreprise + WaqfLedger",
      target: "Entreprise & système multi-campus",
      badge: null,
      features: [
        "Droits de redistribution complets",
        "SOP de gouvernance sur mesure",
        "Configuration de vérification cryptographique via waqfledger.tech",
      ],
    },
    ES: {
      title: "Licencia Enterprise + WaqfLedger",
      target: "Empresa y sistema multi-campus",
      badge: null,
      features: [
        "Derechos de redistribución completos",
        "SOP de gobernanza a medida",
        "Configuración de verificación criptográfica vía waqfledger.tech",
      ],
    },
  },
] as const satisfies readonly PricingTier[];

/** EU AI Act status enums — localize table cells via these keys */
export const EU_AI_ACT_STATUS = {
  HIGH_COMPLIANCE: "High Compliance",
  IN_TRANSITION: "In Transition",
  NON_COMPLIANT: "Non-Compliant",
} as const;

export type EuAiActStatus =
  (typeof EU_AI_ACT_STATUS)[keyof typeof EU_AI_ACT_STATUS];

export const STATUS_LABELS: Record<
  EuAiActStatus,
  Record<Lang, string>
> = {
  "High Compliance": {
    EN: "High Compliance",
    FR: "Conformité Élevée",
    ES: "Cumplimiento Alto",
  },
  "In Transition": {
    EN: "In Transition",
    FR: "En Transition",
    ES: "En Transición",
  },
  "Non-Compliant": {
    EN: "Non-Compliant",
    FR: "Non Conforme",
    ES: "No Conforme",
  },
};

export function localizeEuAiActStatus(
  status: string,
  lang: Lang,
): string {
  if (status in STATUS_LABELS) {
    return STATUS_LABELS[status as EuAiActStatus][lang];
  }
  return status;
}

export const COUNTRY_LABELS: Record<string, Record<Lang, string>> = {
  France: { EN: "France", FR: "France", ES: "Francia" },
  Germany: { EN: "Germany", FR: "Allemagne", ES: "Alemania" },
  Spain: { EN: "Spain", FR: "Espagne", ES: "España" },
  EU: { EN: "EU", FR: "UE", ES: "UE" },
};

export function localizeCountry(country: string, lang: Lang): string {
  return COUNTRY_LABELS[country]?.[lang] ?? country;
}

/** 30-Scenario Article 4 AI Literacy Assessment registry (Cisco-grade hub) */
export type AssessmentScenario = {
  id: number;
  annex: "Annex III High-Risk" | "Article 4 Literacy" | "Article 50 Transparency";
  EN: { title: string; prompt: string; rubric: string };
  FR: { title: string; prompt: string; rubric: string };
  ES: { title: string; prompt: string; rubric: string };
};

export const ASSESSMENT_SCENARIOS: readonly AssessmentScenario[] = [
  {
    id: 1,
    annex: "Annex III High-Risk",
    EN: {
      title: "Automated Student Retention Risk Scoring",
      prompt:
        "A university deploys an ML model to score students for dropout risk and triggers advisor outreach. Which control is mandatory under Annex III & human oversight?",
      rubric: "Annex III High-Risk Compliance & Human Oversight",
    },
    FR: {
      title: "Score automatisé du risque de rétention étudiante",
      prompt:
        "Une université déploie un modèle ML pour scorer le risque d’abandon et déclencher un suivi. Quel contrôle est obligatoire au titre de l’Annexe III et de la supervision humaine ?",
      rubric: "Conformité Annexe III haut risque & supervision humaine",
    },
    ES: {
      title: "Puntuación automatizada del riesgo de retención estudiantil",
      prompt:
        "Una universidad despliega un modelo ML para puntuar el riesgo de abandono y activar tutoría. ¿Qué control es obligatorio bajo el Anexo III y la supervisión humana?",
      rubric: "Cumplimiento Anexo III de alto riesgo y supervisión humana",
    },
  },
  {
    id: 2,
    annex: "Article 4 Literacy",
    EN: {
      title: "Faculty Generative AI Syllabus Disclosure",
      prompt:
        "Instructors require students to disclose GenAI use. What Article 4 literacy duty applies to staff who design those policies?",
      rubric: "Article 4 AI Literacy — operator competence",
    },
    FR: {
      title: "Divulgation GenAI dans les syllabus enseignants",
      prompt:
        "Les enseignants exigent la divulgation de l’usage GenAI. Quelle obligation de littératie Article 4 s’applique au personnel qui conçoit ces politiques ?",
      rubric: "Littératie IA Article 4 — compétence des opérateurs",
    },
    ES: {
      title: "Divulgación GenAI en sílabos docentes",
      prompt:
        "El profesorado exige divulgar el uso de GenAI. ¿Qué deber de alfabetización del Artículo 4 aplica al personal que diseña esas políticas?",
      rubric: "Alfabetización IA Artículo 4 — competencia del operador",
    },
  },
  {
    id: 3,
    annex: "Article 50 Transparency",
    EN: {
      title: "Campus Chatbot Impersonation Risk",
      prompt:
        "An EdTech chatbot answers student queries without disclosing it is AI. Which transparency control is required?",
      rubric: "Article 50 — clear AI interaction disclosure",
    },
    FR: {
      title: "Risque d’usurpation par chatbot campus",
      prompt:
        "Un chatbot EdTech répond aux étudiants sans indiquer qu’il est une IA. Quel contrôle de transparence est requis ?",
      rubric: "Article 50 — divulgation claire de l’interaction IA",
    },
    ES: {
      title: "Riesgo de suplantación por chatbot del campus",
      prompt:
        "Un chatbot EdTech responde a estudiantes sin revelar que es IA. ¿Qué control de transparencia se exige?",
      rubric: "Artículo 50 — divulgación clara de interacción con IA",
    },
  },
] as const;

/** Total scenarios in the full Cisco-grade benchmark (hub teaser surfaces Scenario 1+) */
export const ASSESSMENT_SCENARIO_COUNT = 30;

export type AssessmentChoice = {
  id: string;
  correct: boolean;
  EN: string;
  FR: string;
  ES: string;
};

/** Scenario 1 interactive choices for the live preview scorecard */
export const SCENARIO_1_CHOICES: readonly AssessmentChoice[] = [
  {
    id: "a",
    correct: false,
    EN: "Rely solely on model accuracy metrics published by the vendor.",
    FR: "S’appuyer uniquement sur les métriques de précision publiées par le fournisseur.",
    ES: "Depender únicamente de las métricas de precisión publicadas por el proveedor.",
  },
  {
    id: "b",
    correct: true,
    EN: "Ensure meaningful human oversight with documented override rights before adverse actions.",
    FR: "Garantir une supervision humaine effective avec droit d’override documenté avant toute mesure adverse.",
    ES: "Garantizar supervisión humana efectiva con derechos de anulación documentados antes de medidas adversas.",
  },
  {
    id: "c",
    correct: false,
    EN: "Exempt education tools from Annex III because they are not law-enforcement systems.",
    FR: "Exempter les outils éducatifs de l’Annexe III car ils ne sont pas des systèmes répressifs.",
    ES: "Eximir las herramientas educativas del Anexo III porque no son sistemas policiales.",
  },
  {
    id: "d",
    correct: false,
    EN: "Publish the raw student feature vectors to satisfy transparency.",
    FR: "Publier les vecteurs de caractéristiques bruts des étudiants pour la transparence.",
    ES: "Publicar los vectores de características brutos de los estudiantes por transparencia.",
  },
] as const;

/** Seed proofs for the in-page WaqfLedger Hash Verifier (deterministic demo registry) */
export const WAQFLEDGER_SEED_PROOFS = [
  {
    proofId:
      "A4I-LIC-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    kind: "license" as const,
    label: "Enterprise License — Tier 3 (demo seed)",
  },
  {
    proofId:
      "A4I-CERT-7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
    kind: "certificate" as const,
    label: "Article 4 Benchmark Certificate (demo seed)",
  },
] as const;
