/**
 * Canonical registry for Article 4 Institute (A4I Observatoire) & SafeAI Framework.
 * Metadata truth — never invent free tiers or placeholder commerce as live.
 */

export const SUPPORTED_LANGS = ["FR", "EN", "ES"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

/** Platform primary language — French first across storefront & legal surfaces. */
export const DEFAULT_LANG: Lang = "FR";

/** HTML lang attribute binding — LTR only; Arabic/RTL excluded by mandate. */
export const LANG_TO_HTML: Record<Lang, string> = {
  EN: "en",
  FR: "fr",
  ES: "es",
};

/**
 * Canonical 2026 institutional identity and open-science governance.
 * Association Loi 1901 à gestion strictement désintéressée.
 * Gumroad URL constants stay server-side for the license registry only.
 */
export const SITE_CONFIG = {
  name: "L'Institut Article 4",
  shortName: "A4I",
  legalEntity: "Association Loi 1901",
  legalRole: "Observatoire & Tiers de Confiance Indépendant",
  tagline:
    "Operationalizing EU AI Act Article 4 and Annex III High-Risk Compliance for Higher Education Integrity",
  url: "https://article4institute.org",
  ecosystem: {
    observatory: "https://article4institute.org",
    assuranceLab: "https://safeai.report",
    arabicObservatory:
      "https://huggingface.co/spaces/helloadel/arabic-ai-observatory",
    ledger: "https://waqfledger.tech",
    ledgerVerify: "https://waqfledger.tech/verify",
    researchDesk: "mailto:support@safeai.report",
  },
  gumroad: {
    tier0: "https://safeai.gumroad.com/l/starter",
    tier1: "https://safeai.gumroad.com/l/framework",
    tier2: "https://safeai.gumroad.com/l/Audit",
    tier3: "https://safeai.gumroad.com/l/AIgovernance",
  },
  regulatoryStandards: [
    "EU AI Act (Articles 4, 14, 50 & Annex III §3)",
    "ISO/IEC 42001:2023 (Artificial Intelligence Management System)",
    "Loi 25 du Québec (Protection des renseignements personnels)",
    "Cadres d'éthique et gouvernance de la recherche (OBVIA & Universités)",
  ],
  legalDisclaimer: {
    fr: "L'Institut Article 4 est un observatoire et tiers de confiance indépendant constitué sous forme d'Association Loi 1901 à gestion strictement désintéressée au sens de l'article 206-1 bis du Code général des impôts. Il opère exclusivement sur une base scientifique, non lucrative et non commerciale.",
    en: "The Article 4 Institute is an independent observatory and trusted third-party established as a French Association Loi 1901 with strictly disinterested management within the meaning of Article 206-1 bis of the French General Tax Code. It operates exclusively on a non-profit, non-commercial scientific basis.",
    es: "L'Institut Article 4 es un observatorio y tercero de confianza independiente constituido como Association Loi 1901 con gestión estrictamente desinteresada en el sentido del artículo 206-1 bis del Código General de Impuestos francés. Opera exclusivamente sobre una base científica, no lucrativa y no comercial.",
  },
} as const;

/**
 * Canonical 2026 Sovereign AI Assurance whitepaper.
 * Academic strings are the deposit record; chrome labels live in locale JSON.
 */
export const WHITEPAPER_2026 = {
  doi: "10.5281/zenodo.23737341",
  doiLabel: "CERN Zenodo DOI: 10.5281/zenodo.23737341",
  doiUrl: "https://doi.org/10.5281/zenodo.23737341",
  pdfPath: "/A4I_Sovereign_AI_Assurance_Whitepaper_2026.pdf",
  liveEngineUrl: SITE_CONFIG.ecosystem.assuranceLab,
  citation:
    "El Bouzagaoui, A. (2026). Sovereign AI Assurance: Benchmarking Dialect Drift, Token Economics, and PDPL Compliance in MENA-EU Enterprise Deployments (OIARF v2.1 & Arabic AI Observatory 521-Scenario Specification). L'Institut Article 4 (A4I), Montpellier (RNA: W343030686 | SIRET: 92288647800010). https://doi.org/10.5281/zenodo.23737341",
  bibtex: `@techreport{elbouzagaoui2026sovereign,
  author = {El Bouzagaoui, Adel},
  title = {Sovereign AI Assurance: Benchmarking Dialect Drift, Token Economics, and PDPL Compliance in MENA-EU Enterprise Deployments},
  institution = {L'Institut Article 4 (A4I)},
  year = {2026},
  number = {A4I-WP-2026-V2.1},
  doi = {10.5281/zenodo.23737341},
  url = {https://article4institute.org}
}`,
} as const;

/**
 * Official 2026 doctrinal white paper on enforceable public-sector auditability.
 * Distinct from the Zenodo Sovereign AI Assurance preprint.
 */
export const LIVRE_BLANC_2026 = {
  reference: "A4I-DOC-2026-001",
  license: "CC BY-NC 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-nc/4.0/",
  pdfPath:
    "/docs/Livre_Blanc_2026_Auditabilite_IA_Publique_Institut_Article_4.pdf",
  title: {
    FR: "Livre Blanc 2026 : L'Auditabilité Opposable des Systèmes d'IA dans les Services Publics et l'Enseignement Supérieur",
    EN: "2026 White Paper: Enforceable Auditability of AI Systems in Public Services and Higher Education",
    ES: "Libro Blanco 2026: La auditabilidad exigible de los sistemas de IA en los servicios públicos y la enseñanza superior",
  },
  eyebrow: {
    FR: "Publication scientifique · Mission d'intérêt général",
    EN: "Scientific publication · Public-interest mission",
    ES: "Publicación científica · Misión de interés general",
  },
  cta: {
    FR: "Télécharger le Livre Blanc (PDF)",
    EN: "Download the White Paper (PDF)",
    ES: "Descargar el Libro Blanco (PDF)",
  },
} as const;

export const BRAND = {
  name: SITE_CONFIG.name,
  shortName: SITE_CONFIG.shortName,
  storefront: "SafeAI Framework",
  observatory: "Observatoire Article 4",
  nexus: "A4I Nexus",
  subtitle: {
    EN: SITE_CONFIG.legalRole,
    FR: SITE_CONFIG.legalRole,
    ES: SITE_CONFIG.legalRole,
  },
  institute: SITE_CONFIG.name,
  legalForm: SITE_CONFIG.legalEntity,
  legalRole: SITE_CONFIG.legalRole,
  instituteUrl: SITE_CONFIG.url,
  linkedInUrl: "https://www.linkedin.com/company/l-institut-article-4-a4i/",
  waqfLedgerUrl: SITE_CONFIG.ecosystem.ledger,
  waqfLedgerVerifyUrl: SITE_CONFIG.ecosystem.ledgerVerify,
  safeAiReportUrl: SITE_CONFIG.ecosystem.assuranceLab,
  arabicObservatoryUrl: SITE_CONFIG.ecosystem.arabicObservatory,
} as const;

/**
 * Finalized 2026 institutional positioning — metadata truth for all surfaces.
 */
export const INSTITUTIONAL_POSITIONING = {
  slogan: {
    EN: `${SITE_CONFIG.tagline}.`,
    FR: "Opérationnaliser l’Article 4 du règlement européen sur l’IA et la conformité haut risque Annexe III pour l’intégrité de l’enseignement supérieur.",
    ES: "Operacionalizar el Artículo 4 del Reglamento de IA de la UE y el cumplimiento de alto riesgo del Anexo III para la integridad de la educación superior.",
  },
  identity: {
    EN: "Independent Francophone Observatoire & Think Tank (Association Loi 1901, strictly disinterested management under Article 206-1 bis CGI) for educational AI governance, open science, and the public interest.",
    FR: "Observatoire et think tank francophone indépendant (Association loi 1901 à gestion strictement désintéressée au sens de l’article 206-1 bis du CGI) pour la gouvernance de l’IA éducative, la science ouverte et l’intérêt général.",
    ES: "Observatorio y think tank francófono independiente (Association loi 1901 con gestión estrictamente desinteresada en el sentido del artículo 206-1 bis del CGI) para la gobernanza de la IA educativa, la ciencia abierta y el interés general.",
  },
  role: {
    EN: 'Sovereign "Tiers de Confiance" bridging the EU AI Act, ISO/IEC 42001 (AI Management Systems), applied pedagogical research, and cryptographic evidence provenance.',
    FR: "« Tiers de confiance » souverain articulant le règlement européen sur l’IA, ISO/IEC 42001 (systèmes de management de l’IA), la recherche pédagogique appliquée et la provenance cryptographique des preuves.",
    ES: "« Tiers de confiance » soberano que articula el Reglamento de IA de la UE, ISO/IEC 42001 (sistemas de gestión de la IA), la investigación pedagógica aplicada y la procedencia criptográfica de las pruebas.",
  },
} as const;

/**
 * Tripartite architecture — the A4I Nexus.
 * Non-profit core, VerifIA protocol, and scientific cooperation.
 */
export const A4I_NEXUS = {
  nonprofit: {
    key: "nonprofit",
    title: {
      EN: "Non-Profit Core (Association Loi 1901)",
      FR: "Socle associatif (Association loi 1901)",
      ES: "Núcleo asociativo (Association loi 1901)",
    },
    body: {
      EN: "Custodian of open-access public goods: Bouclier IA Publique and Le Baromètre National de l’IA Literacy.",
      FR: "Gardien des biens publics en accès ouvert : Bouclier IA Publique et Le Baromètre National de l’IA Literacy.",
      ES: "Custodio de bienes públicos de acceso abierto: Bouclier IA Publique y Le Baromètre National de l’IA Literacy.",
    },
    goods: [
      "Bouclier IA Publique",
      "Le Baromètre National de l’IA Literacy",
    ] as const,
  },
  verifia: {
    key: "verifia",
    title: {
      EN: "VerifIA Protocol (Backend RegTech)",
      FR: "Protocole VerifIA (RegTech backend)",
      ES: "Protocolo VerifIA (RegTech backend)",
    },
    body: {
      EN: "Powers automated audits via safeai.report (Assurance Lab) and waqfledger.tech (SHA-256 state receipts), minting the AI Audit Passport™.",
      FR: "Alimente les audits automatisés via safeai.report (Assurance Lab) et waqfledger.tech (reçus d’état SHA-256), et émet le Passeport d’Audit IA™.",
      ES: "Impulsa auditorías automatizadas vía safeai.report (Assurance Lab) y waqfledger.tech (recibos de estado SHA-256), emitiendo el Pasaporte de Auditoría IA™.",
    },
  },
  scientific: {
    key: "scientific",
    title: {
      EN: "Scientific Cooperation (Public-Interest Mission)",
      FR: "Coopération scientifique (mission d'intérêt général)",
      ES: "Cooperación científica (misión de interés general)",
    },
    body: {
      EN: "Doctrinal seminars, executive briefings, and methodological workshops conducted on a non-commercial basis for universities, CNRS joint research units (UMR), university hospitals (CHU), and municipalities, under empirical research protocols and institutional letters of intent (LOI).",
      FR: "Séminaires doctrinaux, briefings de direction et ateliers méthodologiques conduits à titre non commercial pour les universités, les laboratoires (UMR CNRS), les hôpitaux (CHU) et les collectivités, dans le cadre de protocoles de recherche empirique et de lettres d'intention institutionnelles (LOI).",
      ES: "Seminarios doctrinales, briefings de dirección y talleres metodológicos realizados sin carácter comercial para universidades, laboratorios (UMR CNRS), hospitales (CHU) y municipios, en el marco de protocolos de investigación empírica y cartas de intención institucionales (LOI).",
    },
  },
} as const;

export const A4I_NEXUS_PILLARS = [
  A4I_NEXUS.nonprofit,
  A4I_NEXUS.verifia,
  A4I_NEXUS.scientific,
] as const;

/**
 * Transatlantic 2026 regulatory mapping.
 * Canada/Quebec: align to Loi 25, OBVIA, and institutional research ethics.
 */
export const TRANSATLANTIC_MAPPING = {
  franceEu: {
    key: "franceEu",
    region: {
      EN: "France / EU",
      FR: "France / UE",
      ES: "Francia / UE",
    },
    body: {
      EN: "Liaison node for EU AI Act Annex III Section 3 (education and vocational training). Liaison with France Universités and Conférence des Grandes Écoles (CGE) standards, and ISO/IEC 42001 AI Management Systems.",
      FR: "Nœud de liaison pour l’Annexe III section 3 du règlement européen sur l’IA (éducation et formation professionnelle). Liaison avec les référentiels de France Universités et de la Conférence des Grandes Écoles (CGE), et ISO/IEC 42001 (systèmes de management de l’IA).",
      ES: "Nodo de enlace para el Anexo III sección 3 del Reglamento de IA de la UE (educación y formación profesional). Enlace con los estándares de France Universités y de la Conférence des Grandes Écoles (CGE), e ISO/IEC 42001 (sistemas de gestión de la IA).",
    },
    standards: [
      "EU AI Act Annex III Section 3",
      "France Universités",
      "Conférence des Grandes Écoles (CGE)",
      "ISO/IEC 42001",
    ] as const,
  },
  canadaQuebec: {
    key: "canadaQuebec",
    region: {
      EN: "Canada / Quebec",
      FR: "Canada / Québec",
      ES: "Canadá / Quebec",
    },
    body: {
      EN: "Alignment with Quebec Law 25 (Loi 25 sur la protection des renseignements personnels), OBVIA research-ecosystem principles, and institutional research-ethics standards.",
      FR: "Alignement sur la Loi 25 du Québec (protection des renseignements personnels), les principes de l’écosystème de recherche de l’OBVIA et les normes d’éthique de la recherche institutionnelle.",
      ES: "Alineación con la Ley 25 de Quebec (Loi 25 sur la protection des renseignements personnels), los principios del ecosistema de investigación de OBVIA y las normas institucionales de ética de la investigación.",
    },
    standards: [
      "Quebec Law 25 (Loi 25)",
      "OBVIA research ecosystem principles",
      "Institutional research ethics standards",
    ] as const,
  },
} as const;

export const TRANSATLANTIC_NODES = [
  TRANSATLANTIC_MAPPING.franceEu,
  TRANSATLANTIC_MAPPING.canadaQuebec,
] as const;

/**
 * Mandated public-facing legal artifacts. Never describe these as a
 * "Certificat de conformité légale" or "Homologation officielle AI Act".
 */
export const LEGAL_ARTIFACTS = {
  attestation: {
    EN: "AI Governance Readiness Attestation",
    FR: "Attestation de Préparation à la Gouvernance IA",
    ES: "Atestación de Preparación para la Gobernanza IA",
  },
  maturity: {
    EN: "Maturity Assessment (Bilan de Maturité)",
    FR: "Bilan de Maturité",
    ES: "Balance de Madurez",
  },
  passport: {
    EN: "AI Audit Passport™",
    FR: "Passeport d’Audit IA™",
    ES: "Pasaporte de Auditoría IA™",
  },
} as const;

/**
 * Canonical content-licensing registry — never collapse all surfaces into one CC.
 * Observatory benchmarks are open data; public-interest corpora are CC BY-NC.
 */
export const CONTENT_LICENSES = {
  observatory: {
    short: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
    scope: {
      EN: "Observatory Data & Benchmarks: CC BY 4.0",
      FR: "Données et benchmarks de l’Observatoire : CC BY 4.0",
      ES: "Datos y benchmarks del Observatorio: CC BY 4.0",
    },
  },
  bouclier: {
    short: "CC BY-NC 4.0",
    url: "https://creativecommons.org/licenses/by-nc/4.0/",
    scope: {
      EN: "Bouclier IA Publique & White Papers: CC BY-NC 4.0",
      FR: "Bouclier IA Publique et livres blancs : CC BY-NC 4.0",
      ES: "Bouclier IA Publique y libros blancos: CC BY-NC 4.0",
    },
  },
  protocols: {
    short: "CC BY-NC 4.0",
    url: "https://creativecommons.org/licenses/by-nc/4.0/",
    scope: {
      EN: "Research Matrices & Institutional Protocols: CC BY-NC 4.0 (Convention de Recherche Institutionnelle)",
      FR: "Matrices de recherche et protocoles institutionnels : CC BY-NC 4.0 (Convention de Recherche Institutionnelle)",
      ES: "Matrices de investigación y protocolos institucionales: CC BY-NC 4.0 (Convention de Recherche Institutionnelle)",
    },
  },
} as const;

/** Pro bono public-sector shield initiative (French institutional landing) */
export const BOUCLIER_PUBLIC = {
  path: "/bouclier-public",
  title: "Bouclier IA Publique (Safe Public AI Shield)",
  license: CONTENT_LICENSES.bouclier.short,
  licenseUrl: CONTENT_LICENSES.bouclier.url,
  licenseFull: {
    FR: "Licence Creative Commons Attribution - Pas d'Utilisation Commerciale 4.0 International (CC BY-NC 4.0)",
    EN: "Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)",
    ES: "Licencia Creative Commons Atribución-NoComercial 4.0 Internacional (CC BY-NC 4.0)",
  },
  bundlePath: "/bundles/Bouclier_IA_Publique_Bundle_v2026.zip",
  attestationPrefix: "A4I-SHIELD",
  artifactName: {
    FR: "Attestation de Préparation & Bilan de Maturité IA",
    EN: "AI Readiness Attestation & Maturity Assessment",
    ES: "Atestación de Preparación y Balance de Madurez IA",
  },
  artifactDisclaimer: {
    FR: "Livrable de préparation à la gouvernance — jamais un certificat de conformité légale ni une homologation officielle AI Act.",
    EN: "Governance-readiness artifact — never a legal conformity certificate or official AI Act homologation.",
    ES: "Artefacto de preparación a la gobernanza — nunca un certificado de conformidad legal ni una homologación oficial del AI Act.",
  },
  programBadge: {
    FR: "Programme non-lucratif pro bono — CC BY-NC 4.0",
    EN: "Non-profit pro-bono programme — CC BY-NC 4.0",
    ES: "Programa pro bono sin fines de lucro — CC BY-NC 4.0",
  },
} as const;

/** Doctrinal seminars and institutional briefings — public-interest mission */
export const ATELIERS_JURIDIQUES = {
  path: "/ateliers-juridiques",
  title:
    "Séminaires Doctrinaux & Cadrage Méthodologique (Mission d'Intérêt Général)",
  plaquettePath: "/downloads/ateliers-juridiques-plaquette.pdf",
  bookingPrefix: "A4I-MISSION",
  curriculumHours: 6,
  documentTitle:
    "Lettre d'intention institutionnelle (LOI) — Protocole de recherche empirique",
} as const;

export const SITE_METADATA = {
  title: `${SITE_CONFIG.name} | Observatoire — EU AI Act Article 4 & Annex III for Higher Education`,
  description: `${SITE_CONFIG.tagline}. ${SITE_CONFIG.legalRole} (${SITE_CONFIG.legalEntity}) — Tiers de Confiance bridging the EU AI Act, ISO/IEC 42001, and cryptographic evidence provenance via WaqfLedger.`,
  author: "Adel El Bouzagaoui",
  publisher: `${SITE_CONFIG.name} (${SITE_CONFIG.shortName})`,
  datasetTitle:
    "European & Transatlantic AI Observatory — 2026 Benchmarking Dataset",
  /** Canonical institute contact — procurement, privacy, DPO, and general inquiries */
  contactEmail: "contact@article4institute.org",
  salesEmail: "contact@article4institute.org",
  privacyEmail: "contact@article4institute.org",
  dpoEmail: "contact@article4institute.org",
  year: 2026,
} as const;

export const GUMROAD = {
  storeName: "SafeAI Framework",
  /**
   * Absolute https:// Gumroad product URLs for the SafeAI Framework store.
   * Prefer NEXT_PUBLIC_GUMROAD_TIER_*_URL; fallbacks are canonical store links.
   */
  checkoutUrls: {
    tier0:
      process.env.NEXT_PUBLIC_GUMROAD_TIER_0_URL || SITE_CONFIG.gumroad.tier0,
    tier1:
      process.env.NEXT_PUBLIC_GUMROAD_TIER_1_URL || SITE_CONFIG.gumroad.tier1,
    tier2:
      process.env.NEXT_PUBLIC_GUMROAD_TIER_2_URL || SITE_CONFIG.gumroad.tier2,
    tier3:
      process.env.NEXT_PUBLIC_GUMROAD_TIER_3_URL || SITE_CONFIG.gumroad.tier3,
  },
} as const;

export type CheckoutKey = keyof typeof GUMROAD.checkoutUrls;

const PLACEHOLDER_TOKEN_RE = /YOUR_TIER_\d+_SLUG|YOUR_TIER_\d+_ID/i;

/** True when URL is a live absolute Gumroad product link (not a placeholder). */
export function isLiveGumroadCheckoutUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || PLACEHOLDER_TOKEN_RE.test(trimmed)) return false;
  if (!trimmed.startsWith("https://")) return false;
  return trimmed.includes("gumroad.com/l/");
}

type LocalizedCorpus = {
  title: string;
  badge: string;
  summary: string;
  cta: string;
};

/** Four methodological research corpora — public-interest, no catalogue prices. */
export const RESEARCH_CORPORA = [
  {
    id: "corpus1",
    href: "/bouclier-public",
    featured: false,
    EN: {
      title: "Pedagogical & Transparency Corpus (Art. 4 & 50)",
      badge: "Open Access (CC BY-NC 4.0)",
      summary:
        "Classroom disclosure, operator literacy, and Article 50 transparency methods released as a public-interest corpus.",
      cta: "Open the corpus",
    },
    FR: {
      title: "Corpus Pédagogique & Transparence (Art. 4 & 50)",
      badge: "Accès Libre (CC BY-NC 4.0)",
      summary:
        "Méthodes de divulgation pédagogique, de littératie des opérateurs et de transparence Article 50, publiées comme bien scientifique.",
      cta: "Consulter le corpus",
    },
    ES: {
      title: "Corpus Pedagógico y de Transparencia (Art. 4 y 50)",
      badge: "Acceso libre (CC BY-NC 4.0)",
      summary:
        "Métodos de divulgación docente, alfabetización de operadores y transparencia del Artículo 50, publicados como bien científico.",
      cta: "Consultar el corpus",
    },
  },
  {
    id: "corpus2",
    href: "/bouclier-public",
    featured: false,
    EN: {
      title: "Institutional Acculturation Framework",
      badge: "Public Good (CC BY-NC 4.0)",
      summary:
        "Shared reference for universities and public bodies building Article 4 acculturation without a commercial licence.",
      cta: "Open the corpus",
    },
    FR: {
      title: "Référentiel d'Acculturation Institutionnelle",
      badge: "Bien Public (CC BY-NC 4.0)",
      summary:
        "Référentiel commun pour les universités et les personnes publiques qui construisent l'acculturation Article 4 hors de toute licence commerciale.",
      cta: "Consulter le corpus",
    },
    ES: {
      title: "Referencial de Aculturación Institucional",
      badge: "Bien público (CC BY-NC 4.0)",
      summary:
        "Referencial común para universidades y entes públicos que construyen la aculturación del Artículo 4 fuera de toda licencia comercial.",
      cta: "Consultar el corpus",
    },
  },
  {
    id: "corpus3",
    href: "/ateliers-juridiques",
    featured: true,
    EN: {
      title: "High-Risk Audit Matrix (Annex III §3)",
      badge: "Research Programme",
      summary:
        "Annex III Section 3 matrix studied with universities, laboratories, hospitals, and municipalities under a research protocol.",
      cta: "Scientific cooperation",
    },
    FR: {
      title: "Matrice d'Audit Haut Risque (Annexe III §3)",
      badge: "Programme de Recherche",
      summary:
        "Matrice Annexe III section 3 étudiée avec les universités, laboratoires, CHU et collectivités dans un protocole de recherche.",
      cta: "Coopération scientifique",
    },
    ES: {
      title: "Matriz de Auditoría de Alto Riesgo (Anexo III §3)",
      badge: "Programa de investigación",
      summary:
        "Matriz del Anexo III sección 3 estudiada con universidades, laboratorios, hospitales universitarios y municipios en un protocolo de investigación.",
      cta: "Cooperación científica",
    },
  },
  {
    id: "corpus4",
    href: "/ateliers-juridiques",
    featured: false,
    EN: {
      title: "VerifIA Protocol & WaqfLedger Anchoring",
      badge: "Scientific Cooperation",
      summary:
        "Cryptographic anchoring of governance evidence on WaqfLedger, opened through institutional letters of intent.",
      cta: "Scientific cooperation",
    },
    FR: {
      title: "Protocole VerifIA & Ancrage WaqfLedger",
      badge: "Coopération Scientifique",
      summary:
        "Ancrage cryptographique des preuves de gouvernance sur WaqfLedger, ouvert par lettres d'intention institutionnelles.",
      cta: "Coopération scientifique",
    },
    ES: {
      title: "Protocolo VerifIA y Anclaje WaqfLedger",
      badge: "Cooperación científica",
      summary:
        "Anclaje criptográfico de las pruebas de gobernanza en WaqfLedger, abierto mediante cartas de intención institucionales.",
      cta: "Cooperación científica",
    },
  },
] as const satisfies readonly {
  id: string;
  href: string;
  featured: boolean;
  EN: LocalizedCorpus;
  FR: LocalizedCorpus;
  ES: LocalizedCorpus;
}[];

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
  Belgium: { EN: "Belgium", FR: "Belgique", ES: "Bélgica" },
  Switzerland: { EN: "Switzerland", FR: "Suisse", ES: "Suiza" },
  Netherlands: { EN: "Netherlands", FR: "Pays-Bas", ES: "Países Bajos" },
  Italy: { EN: "Italy", FR: "Italie", ES: "Italia" },
  Estonia: { EN: "Estonia", FR: "Estonie", ES: "Estonia" },
  EU: { EN: "EU", FR: "UE", ES: "UE" },
  Canada: { EN: "Canada", FR: "Canada", ES: "Canadá" },
  Quebec: { EN: "Quebec", FR: "Québec", ES: "Quebec" },
  FR: { EN: "France", FR: "France", ES: "Francia" },
  DE: { EN: "Germany", FR: "Allemagne", ES: "Alemania" },
  ES: { EN: "Spain", FR: "Espagne", ES: "España" },
  BE: { EN: "Belgium", FR: "Belgique", ES: "Bélgica" },
  CH: { EN: "Switzerland", FR: "Suisse", ES: "Suiza" },
  NL: { EN: "Netherlands", FR: "Pays-Bas", ES: "Países Bajos" },
  IT: { EN: "Italy", FR: "Italie", ES: "Italia" },
  EE: { EN: "Estonia", FR: "Estonie", ES: "Estonia" },
  CA_QC: {
    EN: "Quebec / Canada",
    FR: "Québec / Canada",
    ES: "Quebec / Canadá",
  },
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

/** Total scenarios in the full institutional Cisco-grade framework. */
export const ASSESSMENT_SCENARIO_COUNT = 30;

/** Scenarios shipped in the public browser Module 1 preview. */
export const ASSESSMENT_MODULE_1_SIZE = 3;

/** Pass mark for A4I-CERT minting — scored server-side only. */
export const ASSESSMENT_PASS_THRESHOLD = 80;

/** Public-facing assessment product label — Module 1 preview, not the live 30-bank. */
export const ASSESSMENT_PUBLIC_LABEL = {
  EN: "Module 1 Assessment Preview (3 Scenarios)",
  FR: "Aperçu d’évaluation — Module 1 (3 scénarios)",
  ES: "Vista previa de evaluación — Módulo 1 (3 escenarios)",
} as const;

export const ASSESSMENT_ROADMAP_BADGE = {
  EN: "The full 30-scenario bank is conducted inside institutional research protocols. This public Module 1 preview publishes 3 scenarios.",
  FR: "La banque de 30 scénarios est conduite dans les protocoles de recherche institutionnels. Cet aperçu public du Module 1 publie 3 scénarios.",
  ES: "El banco de 30 escenarios se conduce dentro de protocolos de investigación institucionales. Esta vista pública del Módulo 1 publica 3 escenarios.",
} as const;

/** Public MCQ option — no answer key. Keys live in src/lib/assessmentKeys.ts (server). */
export type AssessmentChoice = {
  id: string;
  EN: string;
  FR: string;
  ES: string;
};

/** Scenario 1 public stems (no answer key). Prefer ASSESSMENT_MODULE_1_CHOICES. */
const MODULE_1_SCENARIO_1_CHOICES: readonly AssessmentChoice[] = [
  {
    id: "a",
    EN: "Rely solely on model accuracy metrics published by the vendor.",
    FR: "S’appuyer uniquement sur les métriques de précision publiées par le fournisseur.",
    ES: "Depender únicamente de las métricas de precisión publicadas por el proveedor.",
  },
  {
    id: "b",
    EN: "Ensure meaningful human oversight with documented override rights before adverse actions.",
    FR: "Garantir une supervision humaine effective avec droit d’override documenté avant toute mesure adverse.",
    ES: "Garantizar supervisión humana efectiva con derechos de anulación documentados antes de medidas adversas.",
  },
  {
    id: "c",
    EN: "Exempt education tools from Annex III because they are not law-enforcement systems.",
    FR: "Exempter les outils éducatifs de l’Annexe III car ils ne sont pas des systèmes répressifs.",
    ES: "Eximir las herramientas educativas del Anexo III porque no son sistemas policiales.",
  },
  {
    id: "d",
    EN: "Publish the raw student feature vectors to satisfy transparency.",
    FR: "Publier les vecteurs de caractéristiques bruts des étudiants pour la transparence.",
    ES: "Publicar los vectores de características brutos de los estudiantes por transparencia.",
  },
];

const MODULE_1_SCENARIO_2_CHOICES: readonly AssessmentChoice[] = [
  {
    id: "a",
    EN: "Only students must be AI-literate, because they are the end users of the tools.",
    FR: "Seuls les étudiants doivent être alphabétisés en IA, car ils sont les utilisateurs finaux.",
    ES: "Solo el alumnado debe ser alfabetizado en IA, porque es el usuario final de las herramientas.",
  },
  {
    id: "b",
    EN: "Staff who design and operate those disclosure policies must themselves demonstrate Article 4 AI literacy.",
    FR: "Le personnel qui conçoit et applique ces politiques de divulgation doit lui-même démontrer la littératie IA Article 4.",
    ES: "El personal que diseña y opera esas políticas de divulgación debe demostrar alfabetización IA del Artículo 4.",
  },
  {
    id: "c",
    EN: "A vendor EULA is sufficient to discharge the institution’s literacy duty.",
    FR: "Les CGU du fournisseur suffisent à satisfaire l’obligation de littératie de l’établissement.",
    ES: "Un EULA del proveedor basta para cumplir el deber de alfabetización de la institución.",
  },
  {
    id: "d",
    EN: "Public universities are exempt from Article 4 because they are not commercial operators.",
    FR: "Les universités publiques sont exemptées de l’Article 4 car elles ne sont pas des opérateurs commerciaux.",
    ES: "Las universidades públicas están exentas del Artículo 4 porque no son operadores comerciales.",
  },
];

const MODULE_1_SCENARIO_3_CHOICES: readonly AssessmentChoice[] = [
  {
    id: "a",
    EN: "Disclose clearly that the user is interacting with an AI system, before or during the exchange.",
    FR: "Divulguer clairement que l’utilisateur interagit avec un système d’IA, avant ou pendant l’échange.",
    ES: "Divulgar claramente que la persona usuaria interactúa con un sistema de IA, antes o durante el intercambio.",
  },
  {
    id: "b",
    EN: "No disclosure is required if chatbot answers meet an internal accuracy target.",
    FR: "Aucune divulgation n’est requise si les réponses atteignent un objectif interne de précision.",
    ES: "No se exige divulgación si las respuestas cumplen un objetivo interno de precisión.",
  },
  {
    id: "c",
    EN: "Article 50 only applies to deepfakes, not campus helpdesk bots.",
    FR: "L’Article 50 ne s’applique qu’aux deepfakes, pas aux chatbots d’accueil campus.",
    ES: "El Artículo 50 solo aplica a deepfakes, no a chatbots de ayuda del campus.",
  },
  {
    id: "d",
    EN: "Hide the AI notice exclusively in a privacy-policy footer linked from another site.",
    FR: "Dissimuler l’avis d’IA uniquement dans un pied de politique de confidentialité hébergé ailleurs.",
    ES: "Ocultar el aviso de IA solo en un pie de política de privacidad enlazado desde otro sitio.",
  },
];

/**
 * Public Module 1 choices keyed by scenario id. Contains no `correct` flags.
 * Grading is performed by POST /api/assessment/evaluate.
 */
export const ASSESSMENT_MODULE_1_CHOICES: Readonly<
  Record<number, readonly AssessmentChoice[]>
> = {
  1: MODULE_1_SCENARIO_1_CHOICES,
  2: MODULE_1_SCENARIO_2_CHOICES,
  3: MODULE_1_SCENARIO_3_CHOICES,
};

export const SCENARIO_1_CHOICES = MODULE_1_SCENARIO_1_CHOICES;

/**
 * Canonical demo payloads whose SHA-256 digests seed the local proof registry.
 * Hashes are derived via the same sorted-key JSON canonicalization as generateProofId.
 */
export const WAQFLEDGER_DEMO_PAYLOADS = {
  license: {
    demo: true,
    institute: "Article 4 Institute",
    kind: "license",
    product: "B2B Institutional License",
    tier: "tier3",
  },
  certificate: {
    demo: true,
    institute: "Article 4 Institute",
    kind: "certificate",
    product: "Article 4 Certificate",
    tier: "benchmark",
  },
} as const;

/** User-facing product for newly minted proofs. Seed payloads stay frozen for hash stability. */
export const WAQFLEDGER_PASSPORT_PRODUCT = LEGAL_ARTIFACTS.passport.EN;

/** Seed proofs for the in-page Local Cryptographic Proof Engine (canonical demo hashes). */
export const WAQFLEDGER_SEED_PROOFS = [
  {
    proofId:
      "A4I-LIC-afffdf2657dcc06630f4c752a9ba9285d178eecdf06d08e07927e75c26ffb999",
    kind: "license" as const,
    label: "VerifIA research corpus — canonical demo",
    payload: WAQFLEDGER_DEMO_PAYLOADS.license,
  },
  {
    proofId:
      "A4I-CERT-b5ceff92fd3f3396ae6b7006c76c5fe21fe1302535e03810917285ba95573947",
    kind: "certificate" as const,
    label: "AI Audit Passport™ — Article 4 Benchmark (canonical demo)",
    payload: WAQFLEDGER_DEMO_PAYLOADS.certificate,
  },
] as const;
