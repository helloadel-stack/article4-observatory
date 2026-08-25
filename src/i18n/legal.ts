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
    controllerBody: `The data controller is ${BRAND.institute} (${BRAND.legalForm}), operating the Observatoire and the ${BRAND.storefront} storefront. Privacy contact: ${SITE_METADATA.contactEmail}.`,
    processorTitle: "Payment & Processor Disclosure (Gumroad, Inc.)",
    processorBody:
      "Digital products, invoicing, and EU VAT collection for the US LLC commercial vehicle of L'Institut Article 4 are securely processed and fulfilled by Gumroad, Inc., our global Merchant of Record. Payment card data is processed by Gumroad, Inc. and its payment partners — L'Institut Article 4 does not store full payment card numbers.",
    piiTitle: "PII Collection via Crowdsource Forms",
    piiBody:
      "Form submissions collect basic institutional contact information (agency/organization name, country, optional contributor email or notes, and verification source URLs) solely for research verification, governance logging, and procurement follow-up. We do not sell personal data.",
    cookiesTitle: "Cookies & Analytics",
    cookiesBody:
      "Zero non-essential tracking cookies are used on article4institute.org. We do not deploy third-party advertising or behavioral analytics cookies. Essential checkout scripts from Gumroad, Inc. load only when interacting with purchase flows.",
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
    controllerBody: `Le responsable du traitement est ${BRAND.institute} (${BRAND.legalForm}), opérant l’Observatoire et la vitrine ${BRAND.storefront}. Contact confidentialité : ${SITE_METADATA.contactEmail}.`,
    processorTitle: "Paiement et sous-traitant (Gumroad, Inc.)",
    processorBody:
      "Les produits numériques, la facturation et la collecte de la TVA UE pour le véhicule commercial LLC de L'Institut Article 4 sont traités et fournis de manière sécurisée par Gumroad, Inc., notre Merchant of Record mondial. Les données de carte sont traitées par Gumroad, Inc. et ses partenaires — L'Institut Article 4 ne stocke pas les numéros de carte complets.",
    piiTitle: "Collecte de données via les formulaires",
    piiBody:
      "Les soumissions de formulaires collectent des informations de contact institutionnelles de base (nom d’agence/organisation, pays, e-mail ou notes facultatifs, URL de vérification) uniquement pour la vérification de recherche, la journalisation de gouvernance et le suivi des achats. Nous ne vendons pas de données personnelles.",
    cookiesTitle: "Cookies et analytique",
    cookiesBody:
      "Aucun cookie de suivi non essentiel n’est utilisé sur article4institute.org. Nous n’utilisons pas de cookies publicitaires ou d’analytique comportementale tiers. Les scripts essentiels de paiement de Gumroad, Inc. ne se chargent que lors des parcours d’achat.",
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
    controllerBody: `El responsable del tratamiento es ${BRAND.institute} (${BRAND.legalForm}), que opera el Observatorio y la vitrina ${BRAND.storefront}. Contacto de privacidad: ${SITE_METADATA.contactEmail}.`,
    processorTitle: "Pagos y encargado del tratamiento (Gumroad, Inc.)",
    processorBody:
      "Los productos digitales, la facturación y la recaudación del IVA de la UE para el vehículo comercial LLC de L'Institut Article 4 son procesados y entregados de forma segura por Gumroad, Inc., nuestro Merchant of Record global. Los datos de tarjeta los procesan Gumroad, Inc. y sus socios — L'Institut Article 4 no almacena números completos de tarjeta.",
    piiTitle: "Recogida de datos mediante formularios",
    piiBody:
      "Los envíos de formularios recogen información de contacto institucional básica (nombre de agencia/organización, país, correo o notas opcionales y URL de verificación) únicamente para verificación de investigación, registro de gobernanza y seguimiento de compras. No vendemos datos personales.",
    cookiesTitle: "Cookies y analítica",
    cookiesBody:
      "No se utilizan cookies de seguimiento no esenciales en article4institute.org. No desplegamos cookies publicitarias ni de analítica comportamental de terceros. Los scripts esenciales de checkout de Gumroad, Inc. solo se cargan al interactuar con flujos de compra.",
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
    title: "Terms of Service & Licensing",
    subtitle:
      "B2B digital product terms for SafeAI Framework audit toolkits sold by the US LLC commercial vehicle via Gumroad, Inc. as Merchant of Record.",
    storeTitle: "Store Name",
    storeBody: `${BRAND.storefront} is the storefront brand of the ${BRAND.commercialVehicle} commercial vehicle operated by ${BRAND.institute} (${BRAND.legalForm}) for institutional EU AI Act governance toolkits.`,
    productsTitle: "B2B Digital Products & List Prices",
    tier0:
      "Tier 0 — Faculty AI Starter Pack: €49 Individual Faculty / Course Pass.",
    tier1:
      "Tier 1 — Article 4 AI Literacy Kit: €399 Single Campus / Department Pass.",
    tier2:
      "Tier 2 — EdTech & High-Risk Audit Kit: €999 Institutional & EdTech Platform License.",
    tier3:
      "Tier 3 — SafeAI Enterprise + WaqfLedger Proof: €2,499 Enterprise Site License (multi-campus).",
    artifactsTitle: "Legal Artifacts — What We Issue",
    artifactsBody: `${BRAND.institute} issues ${LEGAL_ARTIFACTS.attestation.EN}, a ${LEGAL_ARTIFACTS.maturity.EN}, and the ${LEGAL_ARTIFACTS.passport.EN} minted by the VerifIA Protocol. These are governance-readiness artifacts with cryptographic provenance. They are not a legal conformity certificate and do not constitute official AI Act homologation.`,
    fulfillmentTitle: "Digital Fulfillment",
    fulfillmentBody:
      "Digital products, invoicing, and EU VAT collection for SafeAI Framework are securely processed and fulfilled by Gumroad, Inc., our global Merchant of Record. Products are delivered as instant digital downloads upon checkout confirmation. Access credentials and download links are provided to the purchasing institutional contact after payment confirmation.",
    refundTitle: "Refunds & EU Digital Content Withdrawal",
    refundBody:
      "Under EU consumer rules for digital content, the standard 14-day statutory withdrawal right may be waived once delivery begins and the buyer expressly consents to immediate performance — particularly where the digital content is unsealed/downloaded. For B2B institutional purchases of digital goods, immediate access upon checkout confirmation typically begins performance and may extinguish the statutory withdrawal right for that download package. Refund requests for defective files or failed delivery are reviewed by Article 4 Institute and Gumroad, Inc. support on a case-by-case basis.",
    ipTitle: "Intellectual Property",
    ipBody:
      "All kit assets, templates, matrices, and documentation remain the intellectual property of Article 4 Institute. Purchasers receive a non-exclusive usage license scoped to the purchased tier (single campus, institutional platform, or enterprise multi-campus redistribution rights as listed). Redistribution beyond tier rights is prohibited without written authorization.",
  },
  FR: {
    backLabel: "Retour à Article 4 Institute",
    langLabel: "Langue de l’interface",
    title: "Conditions d’utilisation et licences",
    subtitle:
      "Conditions des produits numériques B2B SafeAI Framework vendus par le véhicule commercial LLC via Gumroad, Inc. en tant que Merchant of Record.",
    storeTitle: "Nom de la boutique",
    storeBody: `${BRAND.storefront} est la marque commerciale du véhicule ${BRAND.commercialVehicle} exploité par ${BRAND.institute} (${BRAND.legalForm}) pour les boîtes à outils institutionnelles de gouvernance AI Act UE.`,
    productsTitle: "Produits numériques B2B et prix catalogue",
    tier0:
      "Niveau 0 — Pack Démarrage IA Enseignant : €49 Pass enseignant / cours individuel.",
    tier1:
      "Niveau 1 — Kit Culture IA Article 4 : €399 Pass campus unique / département.",
    tier2:
      "Niveau 2 — Kit d’Audit Risque Élevé : €999 Licence institutionnelle & plateforme EdTech.",
    tier3:
      "Niveau 3 — SafeAI Enterprise + WaqfLedger : €2,499 Licence site entreprise (multi-campus).",
    artifactsTitle: "Artefacts juridiques — ce que nous émettons",
    artifactsBody: `${BRAND.institute} émet l’${LEGAL_ARTIFACTS.attestation.FR}, un ${LEGAL_ARTIFACTS.maturity.FR} et le ${LEGAL_ARTIFACTS.passport.FR} minté par le protocole VerifIA. Ce sont des artefacts de préparation à la gouvernance avec provenance cryptographique. Ils ne constituent pas un certificat de conformité légale ni une homologation officielle AI Act.`,
    fulfillmentTitle: "Livraison numérique",
    fulfillmentBody:
      "Les produits numériques, la facturation et la collecte de la TVA UE pour SafeAI Framework sont traités et fournis de manière sécurisée par Gumroad, Inc., notre Merchant of Record mondial. Les produits sont livrés en téléchargement numérique instantané dès confirmation du paiement. Les accès et liens de téléchargement sont fournis au contact institutionnel acheteur après confirmation.",
    refundTitle: "Remboursements et rétractation (contenu numérique UE)",
    refundBody:
      "Selon le droit de la consommation UE relatif aux contenus numériques, le droit légal de rétractation de 14 jours peut être perdu dès le début de l’exécution lorsque l’acheteur consent expressément à une fourniture immédiate — notamment lorsque le contenu numérique est « déballé » / téléchargé. Pour les achats B2B institutionnels de biens numériques, l’accès immédiat à la confirmation de paiement commence généralement l’exécution et peut éteindre ce droit pour le pack téléchargé. Les demandes de remboursement pour fichiers défectueux ou échec de livraison sont examinées au cas par cas par Article 4 Institute et le support Gumroad, Inc.",
    ipTitle: "Propriété intellectuelle",
    ipBody:
      "Tous les actifs, modèles, matrices et documentations restent la propriété intellectuelle d’Article 4 Institute. Les acheteurs reçoivent une licence d’usage non exclusive limitée au niveau acheté (campus unique, plateforme institutionnelle, ou droits de redistribution multi-campus entreprise). Toute redistribution hors droits du niveau est interdite sans autorisation écrite.",
  },
  ES: {
    backLabel: "Volver a Article 4 Institute",
    langLabel: "Idioma de la interfaz",
    title: "Términos de servicio y licencias",
    subtitle:
      "Términos de productos digitales B2B de SafeAI Framework vendidos por el vehículo comercial LLC a través de Gumroad, Inc. como Merchant of Record.",
    storeTitle: "Nombre de la tienda",
    storeBody: `${BRAND.storefront} es la marca comercial del vehículo ${BRAND.commercialVehicle} operado por ${BRAND.institute} (${BRAND.legalForm}) para kits institucionales de gobernanza del AI Act UE.`,
    productsTitle: "Productos digitales B2B y precios de lista",
    tier0:
      "Nivel 0 — Pack Inicial IA Docente: €49 Pase docente / curso individual.",
    tier1:
      "Nivel 1 — Kit de Alfabetización IA Artículo 4: €399 Pase de campus único / departamento.",
    tier2:
      "Nivel 2 — Kit de Auditoría de Alto Riesgo: €999 Licencia institucional y plataforma EdTech.",
    tier3:
      "Nivel 3 — SafeAI Enterprise + WaqfLedger: €2,499 Licencia empresarial de sitio (multi-campus).",
    artifactsTitle: "Artefactos jurídicos — lo que emitimos",
    artifactsBody: `${BRAND.institute} emite la ${LEGAL_ARTIFACTS.attestation.ES}, un ${LEGAL_ARTIFACTS.maturity.ES} y el ${LEGAL_ARTIFACTS.passport.ES} acuñado por el protocolo VerifIA. Son artefactos de preparación a la gobernanza con procedencia criptográfica. No constituyen un certificado de conformidad legal ni una homologación oficial del AI Act.`,
    fulfillmentTitle: "Entrega digital",
    fulfillmentBody:
      "Los productos digitales, la facturación y la recaudación del IVA de la UE para SafeAI Framework son procesados y entregados de forma segura por Gumroad, Inc., nuestro Merchant of Record global. Los productos se entregan como descarga digital instantánea tras la confirmación del checkout. Las credenciales y enlaces de descarga se proporcionan al contacto institucional comprador tras la confirmación del pago.",
    refundTitle: "Reembolsos y desistimiento (contenido digital UE)",
    refundBody:
      "Conforme a la normativa UE sobre contenidos digitales, el derecho legal de desistimiento de 14 días puede perderse una vez comienza la entrega si el comprador consiente expresamente la ejecución inmediata — en particular cuando el contenido digital se «desprecinta» / descarga. En compras B2B institucionales de bienes digitales, el acceso inmediato tras la confirmación del pago suele iniciar la ejecución y puede extinguir ese derecho para el paquete descargado. Las solicitudes de reembolso por archivos defectuosos o fallo de entrega se revisan caso por caso por Article 4 Institute y el soporte de Gumroad, Inc.",
    ipTitle: "Propiedad intelectual",
    ipBody:
      "Todos los activos, plantillas, matrices y documentación siguen siendo propiedad intelectual de Article 4 Institute. Los compradores reciben una licencia de uso no exclusiva según el nivel adquirido (campus único, plataforma institucional o derechos de redistribución empresarial multi-campus). Queda prohibida la redistribución fuera de esos derechos sin autorización escrita.",
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
