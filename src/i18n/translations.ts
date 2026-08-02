import { BRAND, SITE_METADATA, type Lang } from "@/src/config/constants";

export type TranslationDict = {
  platform: string;
  logoSubtitle: string;
  announcement: string;
  navFramework: string;
  navComplianceKits: string;
  navWaqfLedger: string;
  navDocumentation: string;
  heroTitle: string;
  heroText: string;
  primaryCta: string;
  langToggleLabel: string;
  badgeTrilingual: string;
  badgeGdpr: string;
  badgeZeroDev: string;
  totalEntities: string;
  sovereignPct: string;
  compliancePct: string;
  countriesIndexed: string;
  explorerTitle: string;
  explorerSubtitle: string;
  searchPlaceholder: string;
  countryFilter: string;
  sovereigntyFilter: string;
  allCountries: string;
  allTypes: string;
  sovereign: string;
  dependent: string;
  colAgency: string;
  colCountry: string;
  colTool: string;
  colModel: string;
  colHosting: string;
  colSovereignty: string;
  colCompliance: string;
  colUpdated: string;
  noResults: string;
  downloadCsv: string;
  citeDataset: string;
  citeModalTitle: string;
  citeApaLabel: string;
  citeBibtexLabel: string;
  copyCitation: string;
  copied: string;
  close: string;
  methodologyTitle: string;
  methodologyText: string;
  safeAiDisclosure: string;
  poweredBySafeAi: string;
  aboutTitle: string;
  leadResearcher: string;
  founderRole: string;
  aboutLeadName: string;
  aboutText: string;
  connectLinkedIn: string;
  footerCopy: string;
  footerLink: string;
  footerLinkedIn: string;
  footerLegalHeading: string;
  footerEcosystemHeading: string;
  footerPrivacy: string;
  footerTerms: string;
  footerGdpr: string;
  footerWaqfLedger: string;
  footerAssessment: string;
  footerStorefront: string;
  footerMerchantDisclosure: string;
  results: string;
  submitData: string;
  submitModalTitle: string;
  submitAgencyLabel: string;
  submitAgencyPlaceholder: string;
  submitCountryLabel: string;
  submitCountryPlaceholder: string;
  submitToolLabel: string;
  submitToolPlaceholder: string;
  submitModelHostingLabel: string;
  submitModelHostingPlaceholder: string;
  submitVerificationLabel: string;
  submitVerificationPlaceholder: string;
  submitNotesLabel: string;
  submitNotesPlaceholder: string;
  submitForReview: string;
  submitCancel: string;
  submitSuccess: string;
  submitLoading: string;
  submitRequiredError: string;
  submitNetworkError: string;
  submitCountryFrance: string;
  submitCountryGermany: string;
  submitCountrySpain: string;
  submitCountryEu: string;
  submitCountryNorthAfricaOther: string;
  privacyTitle: string;
  privacyIntro: string;
  privacyTerms: string;
  privacyDpo: string;
  privacyProcessor: string;
  privacyGumroadLink: string;
  privacyClose: string;
};

export const translations: Record<Lang, TranslationDict> = {
  EN: {
    platform: BRAND.name,
    logoSubtitle: BRAND.subtitle.EN,
    announcement:
      "EU AI Act Enforcement Active | Mandatory Article 4 & High-Risk Compliance Kits",
    navFramework: "Framework",
    navComplianceKits: "Compliance Kits",
    navWaqfLedger: "WaqfLedger Proof",
    navDocumentation: "Documentation",
    heroTitle:
      "Turnkey EU AI Act & Ethical AI Governance Toolkits for Higher Education.",
    heroText:
      "Ready-to-deploy institutional policies, risk classification matrices, and Article 4 AI literacy frameworks. Standardized for European Universities and EdTech platforms.",
    primaryCta: "View Compliance Kits",
    langToggleLabel: "Interface language",
    badgeTrilingual: "EN · FR · ES Trilingual",
    badgeGdpr: "GDPR & EU AI Act Aligned",
    badgeZeroDev: "Zero-Dev Setup",
    totalEntities: "Total Entities Monitored",
    sovereignPct: "Sovereign Infrastructure %",
    compliancePct: "Compliance %",
    countriesIndexed: "Countries Indexed",
    explorerTitle: "Data Explorer",
    explorerSubtitle:
      "Filter monitored agencies and tools by name, country, and hosting sovereignty.",
    searchPlaceholder: "Search by agency or tool name…",
    countryFilter: "Country",
    sovereigntyFilter: "Sovereignty type",
    allCountries: "All countries",
    allTypes: "All types",
    sovereign: "Sovereign",
    dependent: "Dependent",
    colAgency: "Agency",
    colCountry: "Country",
    colTool: "Tool",
    colModel: "Primary Model",
    colHosting: "Hosting Provider",
    colSovereignty: "Sovereignty",
    colCompliance: "EU AI Act Status",
    colUpdated: "Last Updated",
    noResults: "No records match the current filters.",
    downloadCsv: "Download CSV",
    citeDataset: "Cite This Dataset",
    citeModalTitle: "Cite This Dataset",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copy Citation",
    copied: "Copied",
    close: "Close",
    methodologyTitle: "Methodology & Open Research",
    methodologyText:
      "The Article 4 Institute maintains this Observatory as an open, non-partisan research framework. Entries are drawn from publicly verifiable sources and institutional disclosures. Classifications of “Sovereign” and “Dependent” hosting reflect infrastructure jurisdiction and operational control, not political endorsement. Datasets are versioned and open to scholarly scrutiny.",
    safeAiDisclosure:
      "Automated compliance assessment and security benchmarking powered by the open audit framework at SafeAI.report.",
    poweredBySafeAi: "Powered by SafeAI.report",
    aboutTitle: "About the Institute & Research Team",
    leadResearcher: "Lead Researcher",
    founderRole: "Founder & Lead Researcher",
    aboutLeadName: SITE_METADATA.author,
    aboutText:
      "The Article 4 Institute is a neutral French non-profit initiative (Association 1901) dedicated to European digital resilience and open methodology. Led by Adel El Bouzagaoui as Founder & Lead Researcher, the Institute publishes transparent, reproducible indicators for public-sector AI sovereignty and EU AI Act readiness.",
    connectLinkedIn: "Connect on LinkedIn",
    footerCopy: "© 2026 Article 4 Institute. All rights reserved.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
    footerLegalHeading: "Legal & Compliance",
    footerEcosystemHeading: "Ecosystem",
    footerPrivacy: "Privacy Policy / Politique de Confidentialité",
    footerTerms: "Terms of Service / Conditions Générales",
    footerGdpr: "GDPR & Cryptographic Compliance",
    footerWaqfLedger: "WaqfLedger Proof Engine",
    footerAssessment: "Article 4 AI Assessment",
    footerStorefront: "SafeAI Storefront",
    footerMerchantDisclosure:
      "SafeAI Framework is a project of Article 4 Institute. Payments, invoicing, and EU VAT collection are securely processed by Gumroad, Inc., our Merchant of Record.",
    results: "results",
    submitData: "Submit Data",
    submitModalTitle: "Submit a Public AI Project",
    submitAgencyLabel: "Public Agency / Organization Name",
    submitAgencyPlaceholder: "e.g., French Ministry of Health",
    submitCountryLabel: "Country",
    submitCountryPlaceholder: "Select a country",
    submitToolLabel: "AI Tool / Framework Name",
    submitToolPlaceholder: "e.g., Albert API",
    submitModelHostingLabel: "Primary Model & Hosting Provider",
    submitModelHostingPlaceholder: "e.g., SecNumCloud Sovereign Cloud",
    submitVerificationLabel: "Verification Source Link",
    submitVerificationPlaceholder: "https://…",
    submitNotesLabel: "Contributor Email / Notes",
    submitNotesPlaceholder: "Optional contact or context",
    submitForReview: "Submit for Review",
    submitCancel: "Cancel",
    submitSuccess:
      "Thank you! Submission accepted. Our research team will review your source URL.",
    submitLoading: "Submitting…",
    submitRequiredError: "Please complete all required fields.",
    submitNetworkError: "Submission failed. Please try again.",
    submitCountryFrance: "France",
    submitCountryGermany: "Germany",
    submitCountrySpain: "Spain",
    submitCountryEu: "EU",
    submitCountryNorthAfricaOther: "North Africa / Other",
    privacyTitle: "GDPR & EU AI Act Compliance",
    privacyIntro:
      "SafeAI Framework & European Observatory processes limited contact and crowdsource metadata to operate institutional compliance services under the GDPR and the EU AI Act.",
    privacyTerms:
      "Privacy Terms: We collect only information you voluntarily submit (agency names, tool metadata, optional contact notes). Data is used for research review, procurement follow-up, and cryptographic proof logging via WaqfLedger. We do not sell personal data. Retention is limited to verification and audit necessities.",
    privacyDpo: `Data Protection Officer: ${SITE_METADATA.dpoEmail}`,
    privacyProcessor:
      "Digital products, invoicing, and EU VAT collection for SafeAI Framework are securely processed and fulfilled by Gumroad, Inc., our global Merchant of Record.",
    privacyGumroadLink: "Gumroad, Inc. privacy documentation",
    privacyClose: "Close privacy notice",
  },
  FR: {
    platform: BRAND.name,
    logoSubtitle: BRAND.subtitle.FR,
    announcement:
      "Application de l’AI Act UE active | Kits de conformité Article 4 & haut risque obligatoires",
    navFramework: "Cadre",
    navComplianceKits: "Kits de conformité",
    navWaqfLedger: "Preuve WaqfLedger",
    navDocumentation: "Documentation",
    heroTitle:
      "Boîtes à outils clés en main de gouvernance IA éthique et AI Act UE pour l’enseignement supérieur.",
    heroText:
      "Politiques institutionnelles prêtes à déployer, matrices de classification des risques et cadres de littératie IA Article 4. Standardisés pour les universités européennes et les plateformes EdTech.",
    primaryCta: "Voir les kits de conformité",
    langToggleLabel: "Langue de l’interface",
    badgeTrilingual: "Trilingue EN · FR · ES",
    badgeGdpr: "Aligné RGPD & AI Act UE",
    badgeZeroDev: "Mise en place sans développement",
    totalEntities: "Entités suivies au total",
    sovereignPct: "% d’infrastructure souveraine",
    compliancePct: "% de conformité",
    countriesIndexed: "Pays indexés",
    explorerTitle: "Explorateur de données",
    explorerSubtitle:
      "Filtrez les agences et outils suivis par nom, pays et souveraineté d’hébergement.",
    searchPlaceholder: "Rechercher par agence ou outil…",
    countryFilter: "Pays",
    sovereigntyFilter: "Type de souveraineté",
    allCountries: "Tous les pays",
    allTypes: "Tous les types",
    sovereign: "Souverain",
    dependent: "Dépendant",
    colAgency: "Agence",
    colCountry: "Pays",
    colTool: "Outil",
    colModel: "Modèle principal",
    colHosting: "Fournisseur d’hébergement",
    colSovereignty: "Souveraineté",
    colCompliance: "Statut AI Act UE",
    colUpdated: "Dernière mise à jour",
    noResults: "Aucun enregistrement ne correspond aux filtres actuels.",
    downloadCsv: "Télécharger CSV",
    citeDataset: "Citer ce jeu de données",
    citeModalTitle: "Citer ce jeu de données",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copier la citation",
    copied: "Copié",
    close: "Fermer",
    methodologyTitle: "Méthodologie et recherche ouverte",
    methodologyText:
      "L’Article 4 Institute maintient cet Observatoire comme un cadre de recherche ouvert et non partisan. Les entrées proviennent de sources publiques vérifiables et de divulgations institutionnelles. Les classifications « Souverain » et « Dépendant » reflètent la juridiction et le contrôle opérationnel des infrastructures, et non un endossement politique. Les jeux de données sont versionnés et ouverts à l’examen scientifique.",
    safeAiDisclosure:
      "Évaluation automatisée de la conformité et analyse comparative de la sécurité alimentées par le cadre d’audit ouvert de SafeAI.report.",
    poweredBySafeAi: "Propulsé par SafeAI.report",
    aboutTitle: "À propos de l’Institut et de l’équipe de recherche",
    leadResearcher: "Chercheur principal",
    founderRole: "Fondateur et chercheur principal",
    aboutLeadName: SITE_METADATA.author,
    aboutText:
      "L’Article 4 Institute est une initiative associative française neutre (Association loi 1901) dédiée à la résilience numérique européenne et à une méthodologie ouverte. Sous la direction d’Adel El Bouzagaoui, Fondateur et chercheur principal, l’Institut publie des indicateurs transparents et reproductibles sur la souveraineté de l’IA dans le secteur public et la préparation au règlement européen sur l’IA.",
    connectLinkedIn: "Suivez-nous sur LinkedIn",
    footerCopy: "© 2026 Article 4 Institute. All rights reserved.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
    footerLegalHeading: "Juridique & Conformité",
    footerEcosystemHeading: "Écosystème",
    footerPrivacy: "Privacy Policy / Politique de Confidentialité",
    footerTerms: "Terms of Service / Conditions Générales",
    footerGdpr: "GDPR & Cryptographic Compliance",
    footerWaqfLedger: "Moteur de preuve WaqfLedger",
    footerAssessment: "Évaluation IA Article 4",
    footerStorefront: "Boutique SafeAI",
    footerMerchantDisclosure:
      "SafeAI Framework est un projet d’Article 4 Institute. Les paiements, la facturation et la collecte de la TVA UE sont traités de manière sécurisée par Gumroad, Inc., notre Merchant of Record.",
    results: "résultats",
    submitData: "Soumettre une donnée",
    submitModalTitle: "Proposer un projet IA public",
    submitAgencyLabel: "Nom de l’agence / organisation publique",
    submitAgencyPlaceholder: "ex. : Ministère français de la Santé",
    submitCountryLabel: "Pays",
    submitCountryPlaceholder: "Sélectionner un pays",
    submitToolLabel: "Nom de l’outil / cadre IA",
    submitToolPlaceholder: "ex. : Albert API",
    submitModelHostingLabel: "Modèle principal et hébergeur",
    submitModelHostingPlaceholder: "ex. : Cloud souverain SecNumCloud",
    submitVerificationLabel: "Lien de vérification",
    submitVerificationPlaceholder: "https://…",
    submitNotesLabel: "E-mail du contributeur / notes",
    submitNotesPlaceholder: "Contact ou contexte (facultatif)",
    submitForReview: "Envoyer pour vérification",
    submitCancel: "Annuler",
    submitSuccess:
      "Merci ! Soumission acceptée. Notre équipe de recherche examinera votre URL source.",
    submitLoading: "Envoi en cours…",
    submitRequiredError: "Veuillez renseigner tous les champs obligatoires.",
    submitNetworkError: "Échec de la soumission. Veuillez réessayer.",
    submitCountryFrance: "France",
    submitCountryGermany: "Allemagne",
    submitCountrySpain: "Espagne",
    submitCountryEu: "UE",
    submitCountryNorthAfricaOther: "Afrique du Nord / Autre",
    privacyTitle: "Conformité RGPD & AI Act UE",
    privacyIntro:
      "SafeAI Framework & European Observatory traite des métadonnées de contact et de crowdsourcing limitées pour opérer des services de conformité institutionnelle au titre du RGPD et de l’AI Act UE.",
    privacyTerms:
      "Conditions de confidentialité : nous collectons uniquement les informations que vous soumettez volontairement (noms d’agences, métadonnées d’outils, notes de contact facultatives). Les données servent à la revue de recherche, au suivi des achats et à la journalisation cryptographique via WaqfLedger. Nous ne vendons pas de données personnelles. La conservation est limitée aux nécessités de vérification et d’audit.",
    privacyDpo: `Délégué à la protection des données : ${SITE_METADATA.dpoEmail}`,
    privacyProcessor:
      "Les produits numériques, la facturation et la collecte de la TVA UE pour SafeAI Framework sont traités et fournis de manière sécurisée par Gumroad, Inc., notre Merchant of Record mondial.",
    privacyGumroadLink: "Documentation confidentialité Gumroad, Inc.",
    privacyClose: "Fermer l’avis de confidentialité",
  },
  ES: {
    platform: BRAND.name,
    logoSubtitle: BRAND.subtitle.ES,
    announcement:
      "Aplicación del AI Act UE activa | Kits de cumplimiento Artículo 4 y alto riesgo obligatorios",
    navFramework: "Marco",
    navComplianceKits: "Kits de cumplimiento",
    navWaqfLedger: "Prueba WaqfLedger",
    navDocumentation: "Documentación",
    heroTitle:
      "Kits llave en mano de gobernanza ética de IA y AI Act UE para educación superior.",
    heroText:
      "Políticas institucionales listas para desplegar, matrices de clasificación de riesgo y marcos de alfabetización IA Artículo 4. Estandarizados para universidades europeas y plataformas EdTech.",
    primaryCta: "Ver kits de cumplimiento",
    langToggleLabel: "Idioma de la interfaz",
    badgeTrilingual: "Trilingüe EN · FR · ES",
    badgeGdpr: "Alineado con RGPD y AI Act UE",
    badgeZeroDev: "Configuración sin desarrollo",
    totalEntities: "Entidades monitoreadas",
    sovereignPct: "% de infraestructura soberana",
    compliancePct: "% de cumplimiento",
    countriesIndexed: "Países indexados",
    explorerTitle: "Explorador de datos",
    explorerSubtitle:
      "Filtre agencias y herramientas monitoreadas por nombre, país y soberanía de alojamiento.",
    searchPlaceholder: "Buscar por agencia o herramienta…",
    countryFilter: "País",
    sovereigntyFilter: "Tipo de soberanía",
    allCountries: "Todos los países",
    allTypes: "Todos los tipos",
    sovereign: "Soberano",
    dependent: "Dependiente",
    colAgency: "Agencia",
    colCountry: "País",
    colTool: "Herramienta",
    colModel: "Modelo principal",
    colHosting: "Proveedor de alojamiento",
    colSovereignty: "Soberanía",
    colCompliance: "Estado AI Act UE",
    colUpdated: "Última actualización",
    noResults: "Ningún registro coincide con los filtros actuales.",
    downloadCsv: "Descargar CSV",
    citeDataset: "Citar este conjunto de datos",
    citeModalTitle: "Citar este conjunto de datos",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copiar cita",
    copied: "Copiado",
    close: "Cerrar",
    methodologyTitle: "Metodología e investigación abierta",
    methodologyText:
      "El Article 4 Institute mantiene este Observatorio como un marco de investigación abierto y no partidista. Las entradas proceden de fuentes públicas verificables y divulgaciones institucionales. Las clasificaciones «Soberano» y «Dependiente» reflejan jurisdicción e infraestructura, no un respaldo político. Los conjuntos de datos están versionados y abiertos al escrutinio académico.",
    safeAiDisclosure:
      "Evaluación automatizada de cumplimiento y benchmarking de seguridad impulsados por el marco de auditoría abierto de SafeAI.report.",
    poweredBySafeAi: "Impulsado por SafeAI.report",
    aboutTitle: "Sobre el Instituto y el equipo de investigación",
    leadResearcher: "Investigador principal",
    founderRole: "Fundador e investigador principal",
    aboutLeadName: SITE_METADATA.author,
    aboutText:
      "El Article 4 Institute es una iniciativa asociativa francesa neutral (Association 1901) dedicada a la resiliencia digital europea y a una metodología abierta. Bajo la dirección de Adel El Bouzagaoui, Fundador e investigador principal, el Instituto publica indicadores transparentes y reproducibles sobre soberanía de IA en el sector público y preparación para el reglamento europeo de IA.",
    connectLinkedIn: "Conectar en LinkedIn",
    footerCopy: "© 2026 Article 4 Institute. All rights reserved.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
    footerLegalHeading: "Legal y cumplimiento",
    footerEcosystemHeading: "Ecosistema",
    footerPrivacy: "Privacy Policy / Politique de Confidentialité",
    footerTerms: "Terms of Service / Conditions Générales",
    footerGdpr: "GDPR & Cryptographic Compliance",
    footerWaqfLedger: "Motor de pruebas WaqfLedger",
    footerAssessment: "Evaluación IA Artículo 4",
    footerStorefront: "Tienda SafeAI",
    footerMerchantDisclosure:
      "SafeAI Framework es un proyecto de Article 4 Institute. Los pagos, la facturación y la recaudación del IVA de la UE son procesados de forma segura por Gumroad, Inc., nuestro Merchant of Record.",
    results: "resultados",
    submitData: "Enviar datos",
    submitModalTitle: "Proponer un proyecto de IA público",
    submitAgencyLabel: "Nombre de la agencia / organización pública",
    submitAgencyPlaceholder: "p. ej., Ministerio francés de Salud",
    submitCountryLabel: "País",
    submitCountryPlaceholder: "Seleccionar un país",
    submitToolLabel: "Nombre de la herramienta / marco de IA",
    submitToolPlaceholder: "p. ej., Albert API",
    submitModelHostingLabel: "Modelo principal y proveedor de alojamiento",
    submitModelHostingPlaceholder: "p. ej., Nube soberana SecNumCloud",
    submitVerificationLabel: "Enlace de verificación",
    submitVerificationPlaceholder: "https://…",
    submitNotesLabel: "Correo del colaborador / notas",
    submitNotesPlaceholder: "Contacto o contexto (opcional)",
    submitForReview: "Enviar para revisión",
    submitCancel: "Cancelar",
    submitSuccess:
      "¡Gracias! Envío aceptado. Nuestro equipo de investigación revisará su URL de origen.",
    submitLoading: "Enviando…",
    submitRequiredError: "Complete todos los campos obligatorios.",
    submitNetworkError: "Error en el envío. Inténtelo de nuevo.",
    submitCountryFrance: "Francia",
    submitCountryGermany: "Alemania",
    submitCountrySpain: "España",
    submitCountryEu: "UE",
    submitCountryNorthAfricaOther: "Norte de África / Otro",
    privacyTitle: "Cumplimiento RGPD y AI Act UE",
    privacyIntro:
      "SafeAI Framework & European Observatory procesa metadatos de contacto y crowdsourcing limitados para operar servicios de cumplimiento institucional bajo el RGPD y el AI Act UE.",
    privacyTerms:
      "Términos de privacidad: solo recopilamos la información que usted envía voluntariamente (nombres de agencias, metadatos de herramientas, notas de contacto opcionales). Los datos se usan para revisión de investigación, seguimiento de compras y registro criptográfico vía WaqfLedger. No vendemos datos personales. La retención se limita a necesidades de verificación y auditoría.",
    privacyDpo: `Delegado de protección de datos: ${SITE_METADATA.dpoEmail}`,
    privacyProcessor:
      "Los productos digitales, la facturación y la recaudación del IVA de la UE para SafeAI Framework son procesados y entregados de forma segura por Gumroad, Inc., nuestro Merchant of Record global.",
    privacyGumroadLink: "Documentación de privacidad de Gumroad, Inc.",
    privacyClose: "Cerrar aviso de privacidad",
  },
};
