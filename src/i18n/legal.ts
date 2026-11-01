import {
  BRAND,
  INSTITUTIONAL_POSITIONING,
  LEGAL_ARTIFACTS,
  SITE_METADATA,
  TRANSATLANTIC_MAPPING,
  type Lang,
} from "@/src/config/constants";

type LegalCommon = {
  backLabel: string;
  langLabel: string;
};

type PrivacyCopy = LegalCommon & {
  title: string;
  subtitle: string;
  controllerTitle: string;
  controllerBody: string;
  processorTitle: string;
  processorBody: string;
  piiTitle: string;
  piiBody: string;
  cookiesTitle: string;
  cookiesBody: string;
  transatlanticTitle: string;
  transatlanticBody: string;
  contactTitle: string;
  contactBody: string;
};

type TermsCopy = LegalCommon & {
  title: string;
  subtitle: string;
  storeTitle: string;
  storeBody: string;
  productsTitle: string;
  tier0: string;
  tier1: string;
  tier2: string;
  tier3: string;
  artifactsTitle: string;
  artifactsBody: string;
  fulfillmentTitle: string;
  fulfillmentBody: string;
  refundTitle: string;
  refundBody: string;
  ipTitle: string;
  ipBody: string;
};

type GdprCopy = LegalCommon & {
  title: string;
  subtitle: string;
  rightsTitle: string;
  rightsAccess: string;
  rightsRectification: string;
  rightsErasure: string;
  rightsPortability: string;
  transatlanticTitle: string;
  transatlanticBody: string;
  cryptoTitle: string;
  cryptoBody: string;
  dpoTitle: string;
  dpoBody: string;
};

type LegalHubCopy = LegalCommon & {
  title: string;
  subtitle: string;
  identityTitle: string;
  identityBody: string;
  roleTitle: string;
  roleBody: string;
  artifactsTitle: string;
  artifactsBody: string;
  artifactsAttestation: string;
  artifactsMaturity: string;
  artifactsPassport: string;
  artifactsGuardrail: string;
  nexusTitle: string;
  mappingTitle: string;
  franceTitle: string;
  franceBody: string;
  quebecTitle: string;
  quebecBody: string;
  pagesTitle: string;
  pagesPrivacy: string;
  pagesTerms: string;
  pagesGdpr: string;
};

export const privacyCopy: Record<Lang, PrivacyCopy> = {
  EN: {
    backLabel: "Back to Article 4 Institute",
    langLabel: "Interface language",
    title: "Privacy Policy",
    subtitle:
      "How Article 4 Institute processes institutional data under GDPR, Quebec Law 25, and EU AI Act transparency duties.",
    controllerTitle: "Data Controller",
    controllerBody: `The data controller is ${BRAND.institute} (${BRAND.legalForm}), a scientific association with strictly disinterested management within the meaning of Article 206-1 bis of the French General Tax Code. It operates exclusively on a non-profit, non-commercial basis. Privacy contact: ${SITE_METADATA.contactEmail}.`,
    processorTitle: "No commercial payment processing",
    processorBody:
      "L'Institut Article 4 does not sell digital goods, does not operate a commercial checkout, and does not resell through any commercial company. No payment-card data is collected on article4institute.org.",
    piiTitle: "PII Collection via Research Forms",
    piiBody:
      "Form submissions collect basic institutional contact information (organization name, country, optional contributor email or notes, and verification source URLs) solely for research verification and governance logging. We do not sell personal data.",
    cookiesTitle: "Cookies & Analytics",
    cookiesBody:
      "Zero non-essential tracking cookies are used on article4institute.org. We do not deploy third-party advertising, behavioral analytics, or checkout scripts.",
    transatlanticTitle: "Transatlantic Alignment (EU & Quebec)",
    transatlanticBody:
      "EU processing follows the GDPR and EU AI Act transparency duties. For Quebec and Canadian institutional counterparts, processing is aligned with Quebec Law 25 (Loi 25 sur la protection des renseignements personnels), OBVIA research-ecosystem principles, and institutional research-ethics standards.",
    contactTitle: "Privacy Contact",
    contactBody: `For privacy requests related to this policy, email ${SITE_METADATA.contactEmail}. For formal GDPR or Loi 25 rights requests, contact the DPO at ${SITE_METADATA.contactEmail}.`,
  },
  FR: {
    backLabel: "Retour à Article 4 Institute",
    langLabel: "Langue de l’interface",
    title: "Politique de confidentialité",
    subtitle:
      "Comment Article 4 Institute traite les données institutionnelles au titre du RGPD, de la Loi 25 du Québec et des devoirs de transparence de l’AI Act UE.",
    controllerTitle: "Responsable du traitement",
    controllerBody: `Le responsable du traitement est ${BRAND.institute} (${BRAND.legalForm}), association scientifique à gestion strictement désintéressée au sens de l'article 206-1 bis du Code général des impôts. Elle opère exclusivement sur une base non lucrative et non commerciale. Contact confidentialité : ${SITE_METADATA.contactEmail}.`,
    processorTitle: "Absence de paiement commercial",
    processorBody:
      "L'Institut Article 4 ne vend pas de biens numériques, n'exploite aucun paiement en ligne et ne revend rien par l'intermédiaire d'une société commerciale. Aucune donnée de carte n'est collectée sur article4institute.org.",
    piiTitle: "Collecte de données via les formulaires",
    piiBody:
      "Les soumissions de formulaires collectent des informations de contact institutionnelles de base (nom d’organisation, pays, e-mail ou notes facultatifs, URL de vérification) uniquement pour la vérification de recherche et la journalisation de gouvernance. Nous ne vendons pas de données personnelles.",
    cookiesTitle: "Cookies et analytique",
    cookiesBody:
      "Aucun cookie de suivi non essentiel n’est utilisé sur article4institute.org. Nous n’utilisons pas de cookies publicitaires, d’analytique comportementale ni de scripts de paiement.",
    transatlanticTitle: "Alignement transatlantique (UE et Québec)",
    transatlanticBody:
      "Le traitement dans l’UE suit le RGPD et les devoirs de transparence de l’AI Act. Pour les homologues institutionnels du Québec et du Canada, le traitement est aligné sur la Loi 25 (protection des renseignements personnels), les principes de l’écosystème de recherche de l’OBVIA et les normes d’éthique de la recherche institutionnelle.",
    contactTitle: "Contact confidentialité",
    contactBody: `Pour les demandes liées à cette politique, écrivez à ${SITE_METADATA.contactEmail}. Pour les droits RGPD ou Loi 25 formels, contactez le DPO : ${SITE_METADATA.contactEmail}.`,
  },
  ES: {
    backLabel: "Volver a Article 4 Institute",
    langLabel: "Idioma de la interfaz",
    title: "Política de privacidad",
    subtitle:
      "Cómo Article 4 Institute procesa datos institucionales bajo el RGPD, la Ley 25 de Quebec y los deberes de transparencia del AI Act UE.",
    controllerTitle: "Responsable del tratamiento",
    controllerBody: `El responsable del tratamiento es ${BRAND.institute} (${BRAND.legalForm}), asociación científica con gestión estrictamente desinteresada en el sentido del artículo 206-1 bis del Código General de Impuestos francés. Opera exclusivamente sobre una base no lucrativa y no comercial. Contacto de privacidad: ${SITE_METADATA.contactEmail}.`,
    processorTitle: "Ausencia de pago comercial",
    processorBody:
      "L'Institut Article 4 no vende bienes digitales, no opera ningún pago en línea y no revende a través de ninguna sociedad comercial. No se recogen datos de tarjeta en article4institute.org.",
    piiTitle: "Recogida de datos mediante formularios",
    piiBody:
      "Los envíos de formularios recogen información de contacto institucional básica (nombre de la organización, país, correo o notas opcionales y URL de verificación) únicamente para verificación de investigación y registro de gobernanza. No vendemos datos personales.",
    cookiesTitle: "Cookies y analítica",
    cookiesBody:
      "No se utilizan cookies de seguimiento no esenciales en article4institute.org. No desplegamos cookies publicitarias, de analítica comportamental ni scripts de pago.",
    transatlanticTitle: "Alineación transatlántica (UE y Quebec)",
    transatlanticBody:
      "El tratamiento en la UE sigue el RGPD y los deberes de transparencia del AI Act. Para homólogos institucionales de Quebec y Canadá, el tratamiento se alinea con la Ley 25 (protección de datos personales), los principios del ecosistema de investigación de OBVIA y las normas institucionales de ética de la investigación.",
    contactTitle: "Contacto de privacidad",
    contactBody: `Para solicitudes relacionadas con esta política, escriba a ${SITE_METADATA.contactEmail}. Para derechos formales RGPD o Loi 25, contacte al DPO: ${SITE_METADATA.contactEmail}.`,
  },
};

export const termsCopy: Record<Lang, TermsCopy> = {
  EN: {
    backLabel: "Back to Article 4 Institute",
    langLabel: "Interface language",
    title: "Terms of Use & Scientific Licensing",
    subtitle:
      "Non-commercial terms for the open-science corpora of L'Institut Article 4, an Association Loi 1901 with strictly disinterested management under Article 206-1 bis of the French General Tax Code.",
    storeTitle: "Institutional status",
    storeBody: `${BRAND.institute} (${BRAND.legalForm}) operates exclusively on a non-profit, non-commercial scientific basis. It does not sell toolkits, does not collect catalogue prices, and does not resell through a commercial company.`,
    productsTitle: "The 4 methodological research corpora",
    tier0:
      "Corpus 1 — Pedagogical & Transparency Corpus (Art. 4 & 50): Open Access (CC BY-NC 4.0), via /bouclier-public.",
    tier1:
      "Corpus 2 — Institutional Acculturation Framework: Public Good (CC BY-NC 4.0), via /bouclier-public.",
    tier2:
      "Corpus 3 — High-Risk Audit Matrix (Annex III §3): Research Programme, via an institutional letter of intent at /ateliers-juridiques.",
    tier3:
      "Corpus 4 — VerifIA Protocol & WaqfLedger Anchoring: Scientific Cooperation, via an institutional letter of intent at /ateliers-juridiques.",
    artifactsTitle: "Legal Artifacts — What We Issue",
    artifactsBody: `${BRAND.institute} issues ${LEGAL_ARTIFACTS.attestation.EN}, a ${LEGAL_ARTIFACTS.maturity.EN}, and the ${LEGAL_ARTIFACTS.passport.EN} minted by the VerifIA Protocol. These are governance-readiness artifacts with cryptographic provenance. They are not a legal conformity certificate and do not constitute official AI Act homologation.`,
    fulfillmentTitle: "Non-commercial dissemination",
    fulfillmentBody:
      "Public-interest documents are disseminated directly by the Institute under the licence stated on each corpus. There is no checkout, no invoicing, and no merchant of record.",
    refundTitle: "No sale",
    refundBody:
      "Because L'Institut Article 4 does not sell digital content on article4institute.org, consumer withdrawal and refund rules for paid downloads do not apply to these corpora. Institutional cooperation is documented by a letter of intent, not by a paid order.",
    ipTitle: "Intellectual Property",
    ipBody:
      "Observatory data and benchmarks are published under CC BY 4.0. Bouclier IA Publique and white papers are published under CC BY-NC 4.0. Research matrices and institutional protocols are published under CC BY-NC 4.0 (Convention de Recherche Institutionnelle). Non-commercial reuse requires attribution. Commercial exploitation is outside these licences.",
  },
  FR: {
    backLabel: "Retour à Article 4 Institute",
    langLabel: "Langue de l’interface",
    title: "Conditions d’utilisation et licences scientifiques",
    subtitle:
      "Conditions non commerciales des corpus de science ouverte de L'Institut Article 4, Association loi 1901 à gestion strictement désintéressée au sens de l'article 206-1 bis du Code général des impôts.",
    storeTitle: "Statut de l'Institut",
    storeBody: `${BRAND.institute} (${BRAND.legalForm}) opère exclusivement sur une base scientifique, non lucrative et non commerciale. Il ne vend pas de kits, n'affiche aucun prix catalogue et ne revend rien par une société commerciale.`,
    productsTitle: "Les 4 corpus méthodologiques de recherche",
    tier0:
      "Corpus 1 — Corpus Pédagogique & Transparence (Art. 4 & 50) : Accès Libre (CC BY-NC 4.0), via /bouclier-public.",
    tier1:
      "Corpus 2 — Référentiel d'Acculturation Institutionnelle : Bien Public (CC BY-NC 4.0), via /bouclier-public.",
    tier2:
      "Corpus 3 — Matrice d'Audit Haut Risque (Annexe III §3) : Programme de Recherche, via une lettre d'intention institutionnelle sur /ateliers-juridiques.",
    tier3:
      "Corpus 4 — Protocole VerifIA & Ancrage WaqfLedger : Coopération Scientifique, via une lettre d'intention institutionnelle sur /ateliers-juridiques.",
    artifactsTitle: "Artefacts juridiques — ce que nous émettons",
    artifactsBody: `${BRAND.institute} émet l’${LEGAL_ARTIFACTS.attestation.FR}, un ${LEGAL_ARTIFACTS.maturity.FR} et le ${LEGAL_ARTIFACTS.passport.FR} minté par le protocole VerifIA. Ce sont des artefacts de préparation à la gouvernance avec provenance cryptographique. Ils ne constituent pas un certificat de conformité légale ni une homologation officielle AI Act.`,
    fulfillmentTitle: "Diffusion non commerciale",
    fulfillmentBody:
      "Les documents d'intérêt général sont diffusés directement par l'Institut selon la licence indiquée sur chaque corpus. Il n'y a ni paiement, ni facturation, ni intermédiaire de vente.",
    refundTitle: "Absence de vente",
    refundBody:
      "L'Institut Article 4 ne vend pas de contenu numérique sur article4institute.org. Les règles de rétractation et de remboursement propres aux téléchargements payants ne s'appliquent donc pas à ces corpus. La coopération institutionnelle est documentée par une lettre d'intention, et non par une commande payante.",
    ipTitle: "Propriété intellectuelle",
    ipBody:
      "Les données et benchmarks de l'Observatoire sont publiés sous CC BY 4.0. Le Bouclier IA Publique et les livres blancs sont publiés sous CC BY-NC 4.0. Les matrices de recherche et protocoles institutionnels sont publiés sous CC BY-NC 4.0 (Convention de Recherche Institutionnelle). La réutilisation non commerciale exige l'attribution. L'exploitation commerciale est hors de ces licences.",
  },
  ES: {
    backLabel: "Volver a Article 4 Institute",
    langLabel: "Idioma de la interfaz",
    title: "Condiciones de uso y licencias científicas",
    subtitle:
      "Condiciones no comerciales de los corpus de ciencia abierta de L'Institut Article 4, Association loi 1901 con gestión estrictamente desinteresada en el sentido del artículo 206-1 bis del Código General de Impuestos francés.",
    storeTitle: "Estatuto del Instituto",
    storeBody: `${BRAND.institute} (${BRAND.legalForm}) opera exclusivamente sobre una base científica, no lucrativa y no comercial. No vende kits, no publica precios de catálogo y no revende a través de una sociedad comercial.`,
    productsTitle: "Los 4 corpus metodológicos de investigación",
    tier0:
      "Corpus 1 — Corpus Pedagógico y de Transparencia (Art. 4 y 50): Acceso libre (CC BY-NC 4.0), vía /bouclier-public.",
    tier1:
      "Corpus 2 — Referencial de Aculturación Institucional: Bien público (CC BY-NC 4.0), vía /bouclier-public.",
    tier2:
      "Corpus 3 — Matriz de Auditoría de Alto Riesgo (Anexo III §3): Programa de investigación, mediante carta de intención institucional en /ateliers-juridiques.",
    tier3:
      "Corpus 4 — Protocolo VerifIA y Anclaje WaqfLedger: Cooperación científica, mediante carta de intención institucional en /ateliers-juridiques.",
    artifactsTitle: "Artefactos jurídicos — lo que emitimos",
    artifactsBody: `${BRAND.institute} emite la ${LEGAL_ARTIFACTS.attestation.ES}, un ${LEGAL_ARTIFACTS.maturity.ES} y el ${LEGAL_ARTIFACTS.passport.ES} acuñado por el protocolo VerifIA. Son artefactos de preparación a la gobernanza con procedencia criptográfica. No constituyen un certificado de conformidad legal ni una homologación oficial del AI Act.`,
    fulfillmentTitle: "Difusión no comercial",
    fulfillmentBody:
      "Los documentos de interés general se difunden directamente por el Instituto según la licencia indicada en cada corpus. No hay pago, facturación ni intermediario de venta.",
    refundTitle: "Ausencia de venta",
    refundBody:
      "L'Institut Article 4 no vende contenido digital en article4institute.org. Las reglas de desistimiento y reembolso propias de las descargas de pago no se aplican a estos corpus. La cooperación institucional se documenta mediante una carta de intención, y no mediante un pedido de pago.",
    ipTitle: "Propiedad intelectual",
    ipBody:
      "Los datos y benchmarks del Observatorio se publican bajo CC BY 4.0. Bouclier IA Publique y los libros blancos se publican bajo CC BY-NC 4.0. Las matrices de investigación y los protocolos institucionales se publican bajo CC BY-NC 4.0 (Convention de Recherche Institutionnelle). La reutilización no comercial exige atribución. La explotación comercial queda fuera de estas licencias.",
  },
};

export const gdprCopy: Record<Lang, GdprCopy> = {
  EN: {
    backLabel: "Back to Article 4 Institute",
    langLabel: "Interface language",
    title: "GDPR, Loi 25 & Cryptographic Compliance",
    subtitle:
      "Data subject rights under GDPR and Quebec Law 25, EU AI Act-aligned processing, and zero-knowledge proof logging via WaqfLedger.",
    rightsTitle: "Your Data Protection Rights",
    rightsAccess:
      "Access — You may request confirmation of whether we process your personal data and obtain a copy.",
    rightsRectification:
      "Rectification — You may request correction of inaccurate or incomplete institutional contact data.",
    rightsErasure:
      "Erasure — You may request deletion of personal data when no longer necessary for research verification, legal, or audit retention duties.",
    rightsPortability:
      "Portability — Where processing is based on consent or contract and carried out by automated means, you may request a structured, commonly used, machine-readable export of your personal data.",
    transatlanticTitle: "Quebec Law 25 Alignment",
    transatlanticBody:
      "For Quebec and Canadian institutional counterparts, Article 4 Institute aligns processing with Loi 25 (protection of personal information), OBVIA research-ecosystem principles, and institutional research-ethics standards. Rights of access, rectification, and erasure are honoured on the same operational basis as GDPR.",
    cryptoTitle: "Zero-Knowledge Cryptographic Verification (WaqfLedger)",
    cryptoBody: `${BRAND.storefront} integrates with ${BRAND.waqfLedgerUrl} to store SHA-256 cryptographic hashes of compliance logs, license proofs, and ${LEGAL_ARTIFACTS.passport.EN} artifacts. Hash proofs enable immutable auditability without storing raw PII in the ledger. Verification confirms integrity of the hashed artifact — not reconstruction of personal data.`,
    dpoTitle: "Data Protection Officer",
    dpoBody: `Contact the Data Protection Officer at ${SITE_METADATA.contactEmail} for GDPR or Loi 25 rights requests, supervisory authority inquiries, or EU AI Act governance documentation questions.`,
  },
  FR: {
    backLabel: "Retour à Article 4 Institute",
    langLabel: "Langue de l’interface",
    title: "Conformité RGPD, Loi 25 et cryptographique",
    subtitle:
      "Droits des personnes au titre du RGPD et de la Loi 25 du Québec, traitement aligné AI Act UE, et journalisation zero-knowledge via WaqfLedger.",
    rightsTitle: "Vos droits en matière de protection des données",
    rightsAccess:
      "Accès — Vous pouvez demander confirmation du traitement de vos données personnelles et en obtenir une copie.",
    rightsRectification:
      "Rectification — Vous pouvez demander la correction de données de contact institutionnelles inexactes ou incomplètes.",
    rightsErasure:
      "Effacement — Vous pouvez demander la suppression des données personnelles lorsqu’elles ne sont plus nécessaires à la vérification de recherche, aux obligations légales ou de conservation d’audit.",
    rightsPortability:
      "Portabilité — Lorsque le traitement repose sur le consentement ou un contrat et est automatisé, vous pouvez demander un export structuré, couramment utilisé et lisible par machine de vos données personnelles.",
    transatlanticTitle: "Alignement Loi 25 du Québec",
    transatlanticBody:
      "Pour les homologues institutionnels du Québec et du Canada, Article 4 Institute aligne le traitement sur la Loi 25 (protection des renseignements personnels), les principes de l’écosystème de recherche de l’OBVIA et les normes d’éthique de la recherche institutionnelle. Les droits d’accès, de rectification et d’effacement sont honorés sur la même base opérationnelle que le RGPD.",
    cryptoTitle: "Vérification cryptographique zero-knowledge (WaqfLedger)",
    cryptoBody: `${BRAND.storefront} s’intègre à ${BRAND.waqfLedgerUrl} pour stocker des hachages SHA-256 des journaux de gouvernance, preuves de licence et artefacts ${LEGAL_ARTIFACTS.passport.FR}. Ces preuves permettent une auditabilité immuable sans stocker de PII brutes dans le registre. La vérification confirme l’intégrité de l’artefact haché — pas la reconstruction des données personnelles.`,
    dpoTitle: "Délégué à la protection des données",
    dpoBody: `Contactez le DPO à ${SITE_METADATA.contactEmail} pour les demandes de droits RGPD ou Loi 25, les questions des autorités de contrôle, ou la documentation de gouvernance AI Act UE.`,
  },
  ES: {
    backLabel: "Volver a Article 4 Institute",
    langLabel: "Idioma de la interfaz",
    title: "Cumplimiento RGPD, Loi 25 y criptográfico",
    subtitle:
      "Derechos del interesado bajo el RGPD y la Ley 25 de Quebec, tratamiento alineado con el AI Act UE y registro de pruebas zero-knowledge vía WaqfLedger.",
    rightsTitle: "Sus derechos de protección de datos",
    rightsAccess:
      "Acceso — Puede solicitar confirmación de si tratamos sus datos personales y obtener una copia.",
    rightsRectification:
      "Rectificación — Puede solicitar la corrección de datos de contacto institucionales inexactos o incompletos.",
    rightsErasure:
      "Supresión — Puede solicitar la eliminación de datos personales cuando ya no sean necesarios para verificación de investigación, obligaciones legales o de conservación de auditoría.",
    rightsPortability:
      "Portabilidad — Cuando el tratamiento se base en consentimiento o contrato y se realice por medios automatizados, puede solicitar una exportación estructurada, de uso común y legible por máquina de sus datos personales.",
    transatlanticTitle: "Alineación con la Ley 25 de Quebec",
    transatlanticBody:
      "Para homólogos institucionales de Quebec y Canadá, Article 4 Institute alinea el tratamiento con la Loi 25 (protección de datos personales), los principios del ecosistema de investigación de OBVIA y las normas institucionales de ética de la investigación. Los derechos de acceso, rectificación y supresión se honran sobre la misma base operativa que el RGPD.",
    cryptoTitle: "Verificación criptográfica zero-knowledge (WaqfLedger)",
    cryptoBody: `${BRAND.storefront} se integra con ${BRAND.waqfLedgerUrl} para almacenar hashes SHA-256 de registros de gobernanza, pruebas de licencia y artefactos ${LEGAL_ARTIFACTS.passport.ES}. Las pruebas hash permiten auditabilidad inmutable sin almacenar PII en bruto en el registro. La verificación confirma la integridad del artefacto hasheado — no la reconstrucción de datos personales.`,
    dpoTitle: "Delegado de protección de datos",
    dpoBody: `Contacte al DPO en ${SITE_METADATA.contactEmail} para solicitudes de derechos RGPD o Loi 25, consultas de autoridades de control o documentación de gobernanza del AI Act UE.`,
  },
};

export const legalHubCopy: Record<Lang, LegalHubCopy> = {
  EN: {
    backLabel: "Back to Article 4 Institute",
    langLabel: "Interface language",
    title: "Institutional Mandate & Legal Artifacts",
    subtitle: INSTITUTIONAL_POSITIONING.slogan.EN,
    identityTitle: "Identity",
    identityBody: INSTITUTIONAL_POSITIONING.identity.EN,
    roleTitle: "Role — Tiers de Confiance",
    roleBody: INSTITUTIONAL_POSITIONING.role.EN,
    artifactsTitle: "Mandated terminology",
    artifactsBody:
      "Article 4 Institute issues governance-readiness artifacts with cryptographic provenance. They document a Bilan de Maturité and mint an AI Audit Passport™ — they do not certify legal conformity and do not constitute official AI Act homologation.",
    artifactsAttestation: LEGAL_ARTIFACTS.attestation.EN,
    artifactsMaturity: LEGAL_ARTIFACTS.maturity.EN,
    artifactsPassport: LEGAL_ARTIFACTS.passport.EN,
    artifactsGuardrail:
      "Prohibited public claims: legal conformity certificate; official AI Act homologation.",
    nexusTitle: "The A4I Nexus",
    mappingTitle: "Transatlantic regulatory mapping (2026)",
    franceTitle: TRANSATLANTIC_MAPPING.franceEu.region.EN,
    franceBody: TRANSATLANTIC_MAPPING.franceEu.body.EN,
    quebecTitle: TRANSATLANTIC_MAPPING.canadaQuebec.region.EN,
    quebecBody: TRANSATLANTIC_MAPPING.canadaQuebec.body.EN,
    pagesTitle: "Legal pages",
    pagesPrivacy: "Privacy Policy",
    pagesTerms: "Terms of Service",
    pagesGdpr: "GDPR, Loi 25 & Cryptographic Compliance",
  },
  FR: {
    backLabel: "Retour à Article 4 Institute",
    langLabel: "Langue de l’interface",
    title: "Mandat institutionnel et artefacts juridiques",
    subtitle: INSTITUTIONAL_POSITIONING.slogan.FR,
    identityTitle: "Identité",
    identityBody: INSTITUTIONAL_POSITIONING.identity.FR,
    roleTitle: "Rôle — Tiers de confiance",
    roleBody: INSTITUTIONAL_POSITIONING.role.FR,
    artifactsTitle: "Terminologie obligatoire",
    artifactsBody:
      "Article 4 Institute émet des artefacts de préparation à la gouvernance avec provenance cryptographique. Ils documentent un Bilan de Maturité et émettent un Passeport d’Audit IA™ — ils ne certifient pas une conformité légale et ne constituent pas une homologation officielle AI Act.",
    artifactsAttestation: LEGAL_ARTIFACTS.attestation.FR,
    artifactsMaturity: LEGAL_ARTIFACTS.maturity.FR,
    artifactsPassport: LEGAL_ARTIFACTS.passport.FR,
    artifactsGuardrail:
      "Mentions publiques prohibées : certificat de conformité légale ; homologation officielle AI Act.",
    nexusTitle: "Le A4I Nexus",
    mappingTitle: "Cartographie réglementaire transatlantique (2026)",
    franceTitle: TRANSATLANTIC_MAPPING.franceEu.region.FR,
    franceBody: TRANSATLANTIC_MAPPING.franceEu.body.FR,
    quebecTitle: TRANSATLANTIC_MAPPING.canadaQuebec.region.FR,
    quebecBody: TRANSATLANTIC_MAPPING.canadaQuebec.body.FR,
    pagesTitle: "Pages juridiques",
    pagesPrivacy: "Politique de confidentialité",
    pagesTerms: "Conditions générales",
    pagesGdpr: "RGPD, Loi 25 et conformité cryptographique",
  },
  ES: {
    backLabel: "Volver a Article 4 Institute",
    langLabel: "Idioma de la interfaz",
    title: "Mandato institucional y artefactos jurídicos",
    subtitle: INSTITUTIONAL_POSITIONING.slogan.ES,
    identityTitle: "Identidad",
    identityBody: INSTITUTIONAL_POSITIONING.identity.ES,
    roleTitle: "Rol — Tiers de confiance",
    roleBody: INSTITUTIONAL_POSITIONING.role.ES,
    artifactsTitle: "Terminología obligatoria",
    artifactsBody:
      "Article 4 Institute emite artefactos de preparación a la gobernanza con procedencia criptográfica. Documentan un Balance de Madurez y acuñan un Pasaporte de Auditoría IA™ — no certifican conformidad legal ni constituyen una homologación oficial del AI Act.",
    artifactsAttestation: LEGAL_ARTIFACTS.attestation.ES,
    artifactsMaturity: LEGAL_ARTIFACTS.maturity.ES,
    artifactsPassport: LEGAL_ARTIFACTS.passport.ES,
    artifactsGuardrail:
      "Alegaciones públicas prohibidas: certificado de conformidad legal; homologación oficial del AI Act.",
    nexusTitle: "El A4I Nexus",
    mappingTitle: "Cartografía regulatoria transatlántica (2026)",
    franceTitle: TRANSATLANTIC_MAPPING.franceEu.region.ES,
    franceBody: TRANSATLANTIC_MAPPING.franceEu.body.ES,
    quebecTitle: TRANSATLANTIC_MAPPING.canadaQuebec.region.ES,
    quebecBody: TRANSATLANTIC_MAPPING.canadaQuebec.body.ES,
    pagesTitle: "Páginas legales",
    pagesPrivacy: "Política de privacidad",
    pagesTerms: "Términos de servicio",
    pagesGdpr: "RGPD, Loi 25 y cumplimiento criptográfico",
  },
};
