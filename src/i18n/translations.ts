import {
  BRAND,
  INSTITUTIONAL_POSITIONING,
  LEGAL_ARTIFACTS,
  SITE_METADATA,
  type Lang,
} from "@/src/config/constants";
import { localeMessages } from "@/src/locales";

export type TranslationDict = {
  platform: string;
  logoSubtitle: string;
  announcement: string;
  navFramework: string;
  navNexus: string;
  navMapping: string;
  navComplianceKits: string;
  navWaqfLedger: string;
  navDocumentation: string;
  navBouclierPublic: string;
  navAteliersJuridiques: string;
  heroTitle: string;
  heroIdentity: string;
  heroRole: string;
  heroText: string;
  heroBadge: string;
  ecosystemBadge: string;
  ecosystemDesc: string;
  standardsQuebec: string;
  primaryCta: string;
  langToggleLabel: string;
  badgeTrilingual: string;
  badgeGdpr: string;
  badgeIso: string;
  totalEntities: string;
  sovereignPct: string;
  compliancePct: string;
  countriesIndexed: string;
  explorerEyebrow: string;
  explorerTitle: string;
  explorerSubtitle: string;
  searchPlaceholder: string;
  countryFilter: string;
  sovereigntyFilter: string;
  riskFilter: string;
  allCountries: string;
  allTypes: string;
  allRisks: string;
  hostingToggle: string;
  hostingAll: string;
  sovereign: string;
  dependent: string;
  sovereignHosting: string;
  dependentHosting: string;
  kpiTotalDeployments: string;
  kpiHighRiskAnnexIii: string;
  kpiSovereignCloud: string;
  kpiAvgCompliance: string;
  kpiCoverageHint: string;
  kpiHighRiskSystems: string;
  kpiArt14Hint: string;
  kpiSovereignRate: string;
  kpiSovereignHint: string;
  kpiWaqfAnchored: string;
  kpiWaqfSealHint: string;
  exportDatasetCsv: string;
  searchLabel: string;
  searchPlaceholderEntity: string;
  jurisdictionFilter: string;
  aiActClassificationFilter: string;
  hostingSovereigntyFilter: string;
  allAiActCategories: string;
  riskFilterHigh: string;
  riskFilterLow: string;
  riskFilterProhibited: string;
  hostingFilterSovereign: string;
  hostingFilterDependent: string;
  colSystemDeployment: string;
  colAiActCategory: string;
  colWaqfProof: string;
  noResultsCriteria: string;
  showingFiltered: string;
  waqfIntegrityCertified: string;
  colAgency: string;
  colCountry: string;
  colTool: string;
  colModel: string;
  colHosting: string;
  colSovereignty: string;
  colCompliance: string;
  colUpdated: string;
  colEntity: string;
  colSystem: string;
  colDomain: string;
  colRisk: string;
  colHitl: string;
  colLiteracy: string;
  colAuditDate: string;
  verifyProofSha256: string;
  noResults: string;
  downloadCsv: string;
  downloadJson: string;
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
  footerLegalHub: string;
  footerNexus: string;
  footerWaqfLedger: string;
  footerAssessment: string;
  footerStorefront: string;
  footerMerchantDisclosure: string;
  footerIdentity: string;
  nexusEyebrow: string;
  nexusTitle: string;
  nexusSubtitle: string;
  mappingEyebrow: string;
  mappingTitle: string;
  mappingSubtitle: string;
  artifactsDisclaimer: string;
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
  submitEmailLabel: string;
  submitEmailPlaceholder: string;
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
  submitCountryQuebec: string;
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
    logoSubtitle: localeMessages.EN.hero.badge,
    announcement:
      "2026 Mandate | Article 4 · Annex III High-Risk · ISO/IEC 42001 · Quebec Law 25",
    navFramework: "Observatoire",
    navNexus: "A4I Nexus",
    navMapping: "2026 Mapping",
    navComplianceKits: "Audit Toolkits",
    navWaqfLedger: "WaqfLedger Proof",
    navDocumentation: "Benchmark",
    navBouclierPublic: "Bouclier IA Publique (Pro Bono)",
    navAteliersJuridiques: "Ateliers Juridiques",
    heroTitle: localeMessages.EN.hero.title,
    heroIdentity: localeMessages.EN.hero.badge,
    heroRole: localeMessages.EN.hero.badge,
    heroText: localeMessages.EN.hero.subtitle,
    heroBadge: localeMessages.EN.hero.badge,
    ecosystemBadge: localeMessages.EN.ecosystem.badge,
    ecosystemDesc: localeMessages.EN.ecosystem.desc,
    standardsQuebec: localeMessages.EN.standards.quebec,
    primaryCta: "View Audit Toolkits",
    langToggleLabel: "Interface language",
    badgeTrilingual: "EN · FR · ES Trilingual",
    badgeGdpr: "GDPR · EU AI Act · Loi 25",
    badgeIso: "ISO/IEC 42001 Aligned",
    totalEntities: "Total Deployments",
    sovereignPct: "% Sovereign Cloud Adoption",
    compliancePct: "Average Compliance Score",
    countriesIndexed: "Countries Indexed",
    explorerEyebrow: localeMessages.EN.explorer.eyebrow,
    explorerTitle: localeMessages.EN.explorer.title,
    explorerSubtitle: localeMessages.EN.explorer.subtitle,
    searchPlaceholder: localeMessages.EN.explorer.searchPlaceholder,
    countryFilter: "Country",
    sovereigntyFilter: "Sovereignty type",
    riskFilter: "Risk classification",
    allCountries: localeMessages.EN.explorer.allCountries,
    allTypes: "All types",
    allRisks: "All classifications",
    hostingToggle: "Hosting sovereignty",
    hostingAll: localeMessages.EN.explorer.hostingAll,
    sovereign: "Sovereign",
    dependent: "Dependent",
    sovereignHosting: "Sovereign hosting",
    dependentHosting: "Non-sovereign hosting",
    kpiTotalDeployments: localeMessages.EN.explorer.kpiTotalDeployments,
    kpiHighRiskAnnexIii: "% High-Risk Annex III",
    kpiSovereignCloud: "% Sovereign Cloud Adoption",
    kpiAvgCompliance: "Average Compliance Score",
    kpiCoverageHint: localeMessages.EN.explorer.kpiCoverageHint,
    kpiHighRiskSystems: localeMessages.EN.explorer.kpiHighRiskSystems,
    kpiArt14Hint: localeMessages.EN.explorer.kpiArt14Hint,
    kpiSovereignRate: localeMessages.EN.explorer.kpiSovereignRate,
    kpiSovereignHint: localeMessages.EN.explorer.kpiSovereignHint,
    kpiWaqfAnchored: localeMessages.EN.explorer.kpiWaqfAnchored,
    kpiWaqfSealHint: localeMessages.EN.explorer.kpiWaqfSealHint,
    exportDatasetCsv: localeMessages.EN.explorer.exportDatasetCsv,
    searchLabel: localeMessages.EN.explorer.searchLabel,
    searchPlaceholderEntity: localeMessages.EN.explorer.searchPlaceholderEntity,
    jurisdictionFilter: localeMessages.EN.explorer.jurisdictionFilter,
    aiActClassificationFilter: localeMessages.EN.explorer.aiActClassificationFilter,
    hostingSovereigntyFilter: localeMessages.EN.explorer.hostingSovereigntyFilter,
    allAiActCategories: localeMessages.EN.explorer.allAiActCategories,
    riskFilterHigh: localeMessages.EN.explorer.riskFilterHigh,
    riskFilterLow: localeMessages.EN.explorer.riskFilterLow,
    riskFilterProhibited: localeMessages.EN.explorer.riskFilterProhibited,
    hostingFilterSovereign: localeMessages.EN.explorer.hostingFilterSovereign,
    hostingFilterDependent: localeMessages.EN.explorer.hostingFilterDependent,
    colSystemDeployment: localeMessages.EN.explorer.colSystemDeployment,
    colAiActCategory: localeMessages.EN.explorer.colAiActCategory,
    colWaqfProof: localeMessages.EN.explorer.colWaqfProof,
    noResultsCriteria: localeMessages.EN.explorer.noResultsCriteria,
    showingFiltered: localeMessages.EN.explorer.showingFiltered,
    waqfIntegrityCertified: localeMessages.EN.explorer.waqfIntegrityCertified,
    colAgency: "Agency",
    colCountry: localeMessages.EN.explorer.colCountry,
    colTool: "Tool",
    colModel: "Primary Model",
    colHosting: localeMessages.EN.explorer.colHosting,
    colSovereignty: "Sovereignty",
    colCompliance: "EU AI Act Status",
    colUpdated: "Last Updated",
    colEntity: localeMessages.EN.explorer.colEntity,
    colSystem: "System",
    colDomain: "Domain",
    colRisk: "Risk tier",
    colHitl: localeMessages.EN.explorer.colHitl,
    colLiteracy: "Article 4 literacy",
    colAuditDate: "Last audit",
    verifyProofSha256: "Verify SHA-256 Proof",
    noResults: "No records match the current filters.",
    downloadCsv: "Download CSV",
    downloadJson: "Download JSON",
    citeDataset: "Cite This Dataset",
    citeModalTitle: "Cite This Dataset",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copy Citation",
    copied: "Copied",
    close: "Close",
    methodologyTitle: "Methodology & Open Research",
    methodologyText:
      "The Article 4 Institute maintains this Observatoire as an open, non-partisan research framework. The 2026 benchmarking corpus indexes 12 authoritative public and educational AI deployments. Entries are drawn from publicly verifiable sources and institutional disclosures. Risk tiers follow EU AI Act Annex III, Article 50, and Article 5. Hosting sovereignty reflects infrastructure jurisdiction and operational control, not political endorsement. Each record is bound to a SHA-256 digest resolvable on WaqfLedger. Datasets are versioned and open to scholarly scrutiny.",
    safeAiDisclosure:
      "Automated audits and security assurance powered by the VerifIA Protocol at SafeAI.report (Assurance Lab), with SHA-256 state receipts on WaqfLedger.",
    poweredBySafeAi: "Powered by VerifIA · SafeAI.report",
    aboutTitle: "About the Institute & Research Team",
    leadResearcher: "Lead Researcher",
    founderRole: "Founder & Lead Researcher",
    aboutLeadName: SITE_METADATA.author,
    aboutText:
      "The Article 4 Institute is an independent Francophone Observatoire and think tank (Association Loi 1901) for educational AI governance and compliance. As a sovereign Tiers de Confiance, it bridges the EU AI Act, ISO/IEC 42001, applied pedagogical research, and cryptographic evidence provenance. Led by Adel El Bouzagaoui, the Institute publishes transparent, reproducible indicators for public-sector AI sovereignty and higher-education integrity.",
    connectLinkedIn: "Connect on LinkedIn",
    footerCopy: "© 2026 Article 4 Institute — Association Loi 1901. All rights reserved.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
    footerLegalHeading: "Legal & Compliance",
    footerEcosystemHeading: "A4I Nexus",
    footerPrivacy: "Privacy Policy / Politique de Confidentialité",
    footerTerms: "Terms of Service / Conditions Générales",
    footerGdpr: "GDPR, Loi 25 & Cryptographic Compliance",
    footerLegalHub: "Institutional Mandate & Legal Artifacts",
    footerNexus: "A4I Nexus Architecture",
    footerWaqfLedger: "WaqfLedger Proof Engine",
    footerAssessment: "Article 4 AI Assessment",
    footerStorefront: "SafeAI Storefront (LLC / Gumroad MoR)",
    footerMerchantDisclosure: localeMessages.EN.legal.entityNotice,
    footerIdentity: INSTITUTIONAL_POSITIONING.identity.EN,
    nexusEyebrow: localeMessages.EN.ecosystem.badge,
    nexusTitle: "The A4I Nexus — Tripartite Architecture",
    nexusSubtitle:
      "A sovereign Tiers de Confiance spanning a non-profit observatoire, a RegTech audit protocol, and a US LLC commercial vehicle.",
    mappingEyebrow: "2026 Standards",
    mappingTitle: "Transatlantic Regulatory Mapping",
    mappingSubtitle:
      "Liaison node for EU Annex III Section 3 and Quebec Law 25 — without claiming official homologation.",
    artifactsDisclaimer: `Deliverables are issued as ${LEGAL_ARTIFACTS.attestation.EN}, ${LEGAL_ARTIFACTS.maturity.EN}, and ${LEGAL_ARTIFACTS.passport.EN} — never as a legal conformity certificate or official AI Act homologation.`,
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
    submitEmailLabel: "Contributor email (optional)",
    submitEmailPlaceholder: "name@institution.eu",
    submitNotesLabel: "Notes (optional)",
    submitNotesPlaceholder: "Context for research review",
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
    submitCountryQuebec: "Quebec / Canada",
    submitCountryNorthAfricaOther: "North Africa / Other",
    privacyTitle: "GDPR, Loi 25 & EU AI Act Alignment",
    privacyIntro:
      "Article 4 Institute processes limited contact and crowdsource metadata to operate observatoire and institutional governance services under the GDPR, Quebec Law 25, and EU AI Act transparency duties.",
    privacyTerms:
      "Privacy Terms: We collect only information you voluntarily submit (agency names, tool metadata, optional contact notes). Data is used for research review, procurement follow-up, and cryptographic proof logging via WaqfLedger. We do not sell personal data. Retention is limited to verification and audit necessities.",
    privacyDpo: `Data Protection Officer: ${SITE_METADATA.contactEmail}`,
    privacyProcessor:
      "Digital products, invoicing, and EU VAT collection for SafeAI Framework are securely processed and fulfilled by Gumroad, Inc., our global Merchant of Record.",
    privacyGumroadLink: "Gumroad, Inc. privacy documentation",
    privacyClose: "Close privacy notice",
  },
  FR: {
    platform: BRAND.name,
    logoSubtitle: localeMessages.FR.hero.badge,
    announcement:
      "Mandat 2026 | Article 4 · Annexe III haut risque · ISO/IEC 42001 · Loi 25 Québec",
    navFramework: "Observatoire",
    navNexus: "A4I Nexus",
    navMapping: "Cartographie 2026",
    navComplianceKits: "Kits d’audit",
    navWaqfLedger: "Preuve WaqfLedger",
    navDocumentation: "Benchmark / Évaluation",
    navBouclierPublic: "Bouclier IA Publique (Pro Bono)",
    navAteliersJuridiques: "Ateliers Juridiques",
    heroTitle: localeMessages.FR.hero.title,
    heroIdentity: localeMessages.FR.hero.badge,
    heroRole: localeMessages.FR.hero.badge,
    heroText: localeMessages.FR.hero.subtitle,
    heroBadge: localeMessages.FR.hero.badge,
    ecosystemBadge: localeMessages.FR.ecosystem.badge,
    ecosystemDesc: localeMessages.FR.ecosystem.desc,
    standardsQuebec: localeMessages.FR.standards.quebec,
    primaryCta: "Voir les kits d’audit",
    langToggleLabel: "Langue de l’interface",
    badgeTrilingual: "Trilingue EN · FR · ES",
    badgeGdpr: "RGPD · AI Act UE · Loi 25",
    badgeIso: "Aligné ISO/IEC 42001",
    totalEntities: "Déploiements suivis",
    sovereignPct: "% d’adoption cloud souverain",
    compliancePct: "Score moyen de conformité",
    countriesIndexed: "Pays indexés",
    explorerEyebrow: localeMessages.FR.explorer.eyebrow,
    explorerTitle: localeMessages.FR.explorer.title,
    explorerSubtitle: localeMessages.FR.explorer.subtitle,
    searchPlaceholder: localeMessages.FR.explorer.searchPlaceholder,
    countryFilter: "Pays",
    sovereigntyFilter: "Type de souveraineté",
    riskFilter: "Classification du risque",
    allCountries: localeMessages.FR.explorer.allCountries,
    allTypes: "Tous les types",
    allRisks: "Toutes les classifications",
    hostingToggle: "Souveraineté d’hébergement",
    hostingAll: localeMessages.FR.explorer.hostingAll,
    sovereign: "Souverain",
    dependent: "Dépendant",
    sovereignHosting: "Hébergement souverain",
    dependentHosting: "Hébergement non souverain",
    kpiTotalDeployments: localeMessages.FR.explorer.kpiTotalDeployments,
    kpiHighRiskAnnexIii: "% haut risque Annexe III",
    kpiSovereignCloud: "% d’adoption cloud souverain",
    kpiAvgCompliance: "Score moyen de conformité",
    kpiCoverageHint: localeMessages.FR.explorer.kpiCoverageHint,
    kpiHighRiskSystems: localeMessages.FR.explorer.kpiHighRiskSystems,
    kpiArt14Hint: localeMessages.FR.explorer.kpiArt14Hint,
    kpiSovereignRate: localeMessages.FR.explorer.kpiSovereignRate,
    kpiSovereignHint: localeMessages.FR.explorer.kpiSovereignHint,
    kpiWaqfAnchored: localeMessages.FR.explorer.kpiWaqfAnchored,
    kpiWaqfSealHint: localeMessages.FR.explorer.kpiWaqfSealHint,
    exportDatasetCsv: localeMessages.FR.explorer.exportDatasetCsv,
    searchLabel: localeMessages.FR.explorer.searchLabel,
    searchPlaceholderEntity: localeMessages.FR.explorer.searchPlaceholderEntity,
    jurisdictionFilter: localeMessages.FR.explorer.jurisdictionFilter,
    aiActClassificationFilter: localeMessages.FR.explorer.aiActClassificationFilter,
    hostingSovereigntyFilter: localeMessages.FR.explorer.hostingSovereigntyFilter,
    allAiActCategories: localeMessages.FR.explorer.allAiActCategories,
    riskFilterHigh: localeMessages.FR.explorer.riskFilterHigh,
    riskFilterLow: localeMessages.FR.explorer.riskFilterLow,
    riskFilterProhibited: localeMessages.FR.explorer.riskFilterProhibited,
    hostingFilterSovereign: localeMessages.FR.explorer.hostingFilterSovereign,
    hostingFilterDependent: localeMessages.FR.explorer.hostingFilterDependent,
    colSystemDeployment: localeMessages.FR.explorer.colSystemDeployment,
    colAiActCategory: localeMessages.FR.explorer.colAiActCategory,
    colWaqfProof: localeMessages.FR.explorer.colWaqfProof,
    noResultsCriteria: localeMessages.FR.explorer.noResultsCriteria,
    showingFiltered: localeMessages.FR.explorer.showingFiltered,
    waqfIntegrityCertified: localeMessages.FR.explorer.waqfIntegrityCertified,
    colAgency: "Agence",
    colCountry: localeMessages.FR.explorer.colCountry,
    colTool: "Outil",
    colModel: "Modèle principal",
    colHosting: localeMessages.FR.explorer.colHosting,
    colSovereignty: "Souveraineté",
    colCompliance: "Statut AI Act UE",
    colUpdated: "Dernière mise à jour",
    colEntity: localeMessages.FR.explorer.colEntity,
    colSystem: "Système",
    colDomain: "Domaine",
    colRisk: "Niveau de risque",
    colHitl: localeMessages.FR.explorer.colHitl,
    colLiteracy: "Littératie Article 4",
    colAuditDate: "Dernier audit",
    verifyProofSha256: "Vérifier la Preuve SHA-256",
    noResults: "Aucun enregistrement ne correspond aux filtres actuels.",
    downloadCsv: "Télécharger CSV",
    downloadJson: "Télécharger JSON",
    citeDataset: "Citer ce jeu de données",
    citeModalTitle: "Citer ce jeu de données",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copier la citation",
    copied: "Copié",
    close: "Fermer",
    methodologyTitle: "Méthodologie et recherche ouverte",
    methodologyText:
      "L’Article 4 Institute maintient cet Observatoire comme un cadre de recherche ouvert et non partisan. Le corpus de benchmarking 2026 indexe 12 déploiements publics et éducatifs faisant autorité. Les entrées proviennent de sources publiques vérifiables et de divulgations institutionnelles. Les niveaux de risque suivent l’Annexe III, l’Article 50 et l’Article 5 du règlement européen sur l’IA. La souveraineté d’hébergement reflète la juridiction et le contrôle opérationnel des infrastructures, et non un endossement politique. Chaque enregistrement est lié à un condensé SHA-256 résoluble sur WaqfLedger. Les jeux de données sont versionnés et ouverts à l’examen scientifique.",
    safeAiDisclosure:
      "Audits automatisés et assurance de sécurité alimentés par le protocole VerifIA sur SafeAI.report (Assurance Lab), avec reçus d’état SHA-256 sur WaqfLedger.",
    poweredBySafeAi: "Propulsé par VerifIA · SafeAI.report",
    aboutTitle: "À propos de l’Institut et de l’équipe de recherche",
    leadResearcher: "Chercheur principal",
    founderRole: "Fondateur et chercheur principal",
    aboutLeadName: SITE_METADATA.author,
    aboutText:
      "L’Article 4 Institute est un Observatoire et think tank francophone indépendant (Association loi 1901) pour la gouvernance et la conformité de l’IA éducative. En tant que Tiers de confiance souverain, il articule le règlement européen sur l’IA, ISO/IEC 42001, la recherche pédagogique appliquée et la provenance cryptographique des preuves. Sous la direction d’Adel El Bouzagaoui, l’Institut publie des indicateurs transparents et reproductibles sur la souveraineté de l’IA dans le secteur public et l’intégrité de l’enseignement supérieur.",
    connectLinkedIn: "Suivez-nous sur LinkedIn",
    footerCopy: "© 2026 Article 4 Institute — Association loi 1901. Tous droits réservés.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
    footerLegalHeading: "Juridique & Conformité",
    footerEcosystemHeading: "A4I Nexus",
    footerPrivacy: "Privacy Policy / Politique de Confidentialité",
    footerTerms: "Terms of Service / Conditions Générales",
    footerGdpr: "RGPD, Loi 25 & conformité cryptographique",
    footerLegalHub: "Mandat institutionnel & artefacts juridiques",
    footerNexus: "Architecture A4I Nexus",
    footerWaqfLedger: "Moteur de preuve WaqfLedger",
    footerAssessment: "Évaluation IA Article 4",
    footerStorefront: "Boutique SafeAI (LLC / Gumroad MoR)",
    footerMerchantDisclosure: localeMessages.FR.legal.entityNotice,
    footerIdentity: INSTITUTIONAL_POSITIONING.identity.FR,
    nexusEyebrow: localeMessages.FR.ecosystem.badge,
    nexusTitle: "Le A4I Nexus — architecture tripartite",
    nexusSubtitle:
      "Un Tiers de confiance souverain articulant un observatoire associatif, un protocole d’audit RegTech et un véhicule commercial LLC américaine.",
    mappingEyebrow: "Référentiels 2026",
    mappingTitle: "Cartographie réglementaire transatlantique",
    mappingSubtitle:
      "Nœud de liaison pour l’Annexe III section 3 et la Loi 25 du Québec — sans homologation officielle.",
    artifactsDisclaimer: `Les livrables sont émis en tant qu’${LEGAL_ARTIFACTS.attestation.FR}, ${LEGAL_ARTIFACTS.maturity.FR} et ${LEGAL_ARTIFACTS.passport.FR} — jamais en tant que certificat de conformité légale ou homologation officielle AI Act.`,
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
    submitEmailLabel: "E-mail du contributeur (facultatif)",
    submitEmailPlaceholder: "nom@institution.eu",
    submitNotesLabel: "Notes (facultatif)",
    submitNotesPlaceholder: "Contexte pour la revue de recherche",
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
    submitCountryQuebec: "Québec / Canada",
    submitCountryNorthAfricaOther: "Afrique du Nord / Autre",
    privacyTitle: "Alignement RGPD, Loi 25 & AI Act UE",
    privacyIntro:
      "Article 4 Institute traite des métadonnées de contact et de crowdsourcing limitées pour opérer l’Observatoire et les services de gouvernance institutionnelle au titre du RGPD, de la Loi 25 du Québec et des devoirs de transparence de l’AI Act UE.",
    privacyTerms:
      "Conditions de confidentialité : nous collectons uniquement les informations que vous soumettez volontairement (noms d’agences, métadonnées d’outils, notes de contact facultatives). Les données servent à la revue de recherche, au suivi des achats et à la journalisation cryptographique via WaqfLedger. Nous ne vendons pas de données personnelles. La conservation est limitée aux nécessités de vérification et d’audit.",
    privacyDpo: `Délégué à la protection des données : ${SITE_METADATA.contactEmail}`,
    privacyProcessor:
      "Les produits numériques, la facturation et la collecte de la TVA UE pour SafeAI Framework sont traités et fournis de manière sécurisée par Gumroad, Inc., notre Merchant of Record mondial.",
    privacyGumroadLink: "Documentation confidentialité Gumroad, Inc.",
    privacyClose: "Fermer l’avis de confidentialité",
  },
  ES: {
    platform: BRAND.name,
    logoSubtitle: localeMessages.ES.hero.badge,
    announcement:
      "Mandato 2026 | Artículo 4 · Anexo III alto riesgo · ISO/IEC 42001 · Ley 25 de Quebec",
    navFramework: "Observatorio",
    navNexus: "A4I Nexus",
    navMapping: "Cartografía 2026",
    navComplianceKits: "Kits de auditoría",
    navWaqfLedger: "Prueba WaqfLedger",
    navDocumentation: "Benchmark / Evaluación",
    navBouclierPublic: "Bouclier IA Publique (Pro Bono)",
    navAteliersJuridiques: "Ateliers Juridiques",
    heroTitle: localeMessages.ES.hero.title,
    heroIdentity: localeMessages.ES.hero.badge,
    heroRole: localeMessages.ES.hero.badge,
    heroText: localeMessages.ES.hero.subtitle,
    heroBadge: localeMessages.ES.hero.badge,
    ecosystemBadge: localeMessages.ES.ecosystem.badge,
    ecosystemDesc: localeMessages.ES.ecosystem.desc,
    standardsQuebec: localeMessages.ES.standards.quebec,
    primaryCta: "Ver kits de auditoría",
    langToggleLabel: "Idioma de la interfaz",
    badgeTrilingual: "Trilingüe EN · FR · ES",
    badgeGdpr: "RGPD · AI Act UE · Loi 25",
    badgeIso: "Alineado ISO/IEC 42001",
    totalEntities: "Despliegues monitoreados",
    sovereignPct: "% de adopción de nube soberana",
    compliancePct: "Puntuación media de cumplimiento",
    countriesIndexed: "Países indexados",
    explorerEyebrow: localeMessages.ES.explorer.eyebrow,
    explorerTitle: localeMessages.ES.explorer.title,
    explorerSubtitle: localeMessages.ES.explorer.subtitle,
    searchPlaceholder: localeMessages.ES.explorer.searchPlaceholder,
    countryFilter: "País",
    sovereigntyFilter: "Tipo de soberanía",
    riskFilter: "Clasificación de riesgo",
    allCountries: localeMessages.ES.explorer.allCountries,
    allTypes: "Todos los tipos",
    allRisks: "Todas las clasificaciones",
    hostingToggle: "Soberanía de alojamiento",
    hostingAll: localeMessages.ES.explorer.hostingAll,
    sovereign: "Soberano",
    dependent: "Dependiente",
    sovereignHosting: "Alojamiento soberano",
    dependentHosting: "Alojamiento no soberano",
    kpiTotalDeployments: localeMessages.ES.explorer.kpiTotalDeployments,
    kpiHighRiskAnnexIii: "% alto riesgo Anexo III",
    kpiSovereignCloud: "% de adopción de nube soberana",
    kpiAvgCompliance: "Puntuación media de cumplimiento",
    kpiCoverageHint: localeMessages.ES.explorer.kpiCoverageHint,
    kpiHighRiskSystems: localeMessages.ES.explorer.kpiHighRiskSystems,
    kpiArt14Hint: localeMessages.ES.explorer.kpiArt14Hint,
    kpiSovereignRate: localeMessages.ES.explorer.kpiSovereignRate,
    kpiSovereignHint: localeMessages.ES.explorer.kpiSovereignHint,
    kpiWaqfAnchored: localeMessages.ES.explorer.kpiWaqfAnchored,
    kpiWaqfSealHint: localeMessages.ES.explorer.kpiWaqfSealHint,
    exportDatasetCsv: localeMessages.ES.explorer.exportDatasetCsv,
    searchLabel: localeMessages.ES.explorer.searchLabel,
    searchPlaceholderEntity: localeMessages.ES.explorer.searchPlaceholderEntity,
    jurisdictionFilter: localeMessages.ES.explorer.jurisdictionFilter,
    aiActClassificationFilter: localeMessages.ES.explorer.aiActClassificationFilter,
    hostingSovereigntyFilter: localeMessages.ES.explorer.hostingSovereigntyFilter,
    allAiActCategories: localeMessages.ES.explorer.allAiActCategories,
    riskFilterHigh: localeMessages.ES.explorer.riskFilterHigh,
    riskFilterLow: localeMessages.ES.explorer.riskFilterLow,
    riskFilterProhibited: localeMessages.ES.explorer.riskFilterProhibited,
    hostingFilterSovereign: localeMessages.ES.explorer.hostingFilterSovereign,
    hostingFilterDependent: localeMessages.ES.explorer.hostingFilterDependent,
    colSystemDeployment: localeMessages.ES.explorer.colSystemDeployment,
    colAiActCategory: localeMessages.ES.explorer.colAiActCategory,
    colWaqfProof: localeMessages.ES.explorer.colWaqfProof,
    noResultsCriteria: localeMessages.ES.explorer.noResultsCriteria,
    showingFiltered: localeMessages.ES.explorer.showingFiltered,
    waqfIntegrityCertified: localeMessages.ES.explorer.waqfIntegrityCertified,
    colAgency: "Agencia",
    colCountry: localeMessages.ES.explorer.colCountry,
    colTool: "Herramienta",
    colModel: "Modelo principal",
    colHosting: localeMessages.ES.explorer.colHosting,
    colSovereignty: "Soberanía",
    colCompliance: "Estado AI Act UE",
    colUpdated: "Última actualización",
    colEntity: localeMessages.ES.explorer.colEntity,
    colSystem: "Sistema",
    colDomain: "Dominio",
    colRisk: "Nivel de riesgo",
    colHitl: localeMessages.ES.explorer.colHitl,
    colLiteracy: "Alfabetización Artículo 4",
    colAuditDate: "Última auditoría",
    verifyProofSha256: "Verificar la prueba SHA-256",
    noResults: "Ningún registro coincide con los filtros actuales.",
    downloadCsv: "Descargar CSV",
    downloadJson: "Descargar JSON",
    citeDataset: "Citar este conjunto de datos",
    citeModalTitle: "Citar este conjunto de datos",
    citeApaLabel: "APA",
    citeBibtexLabel: "BibTeX",
    copyCitation: "Copiar cita",
    copied: "Copiado",
    close: "Cerrar",
    methodologyTitle: "Metodología e investigación abierta",
    methodologyText:
      "El Article 4 Institute mantiene este Observatorio como un marco de investigación abierto y no partidista. El corpus de benchmarking 2026 indexa 12 despliegues públicos y educativos de referencia. Las entradas proceden de fuentes públicas verificables y divulgaciones institucionales. Los niveles de riesgo siguen el Anexo III, el Artículo 50 y el Artículo 5 del Reglamento de IA. La soberanía de alojamiento refleja jurisdicción e infraestructura, no un respaldo político. Cada registro se vincula a un digest SHA-256 resoluble en WaqfLedger. Los conjuntos de datos están versionados y abiertos al escrutinio académico.",
    safeAiDisclosure:
      "Auditorías automatizadas y aseguramiento de seguridad impulsados por el protocolo VerifIA en SafeAI.report (Assurance Lab), con recibos de estado SHA-256 en WaqfLedger.",
    poweredBySafeAi: "Impulsado por VerifIA · SafeAI.report",
    aboutTitle: "Sobre el Instituto y el equipo de investigación",
    leadResearcher: "Investigador principal",
    founderRole: "Fundador e investigador principal",
    aboutLeadName: SITE_METADATA.author,
    aboutText:
      "El Article 4 Institute es un Observatorio y think tank francófono independiente (Association loi 1901) para la gobernanza y el cumplimiento de la IA educativa. Como Tiers de confiance soberano, articula el Reglamento de IA de la UE, ISO/IEC 42001, la investigación pedagógica aplicada y la procedencia criptográfica de las pruebas. Bajo la dirección de Adel El Bouzagaoui, el Instituto publica indicadores transparentes y reproducibles sobre soberanía de IA en el sector público e integridad de la educación superior.",
    connectLinkedIn: "Conectar en LinkedIn",
    footerCopy: "© 2026 Article 4 Institute — Association loi 1901. Todos los derechos reservados.",
    footerLink: "article4institute.org",
    footerLinkedIn: "LinkedIn",
    footerLegalHeading: "Legal y cumplimiento",
    footerEcosystemHeading: "A4I Nexus",
    footerPrivacy: "Privacy Policy / Politique de Confidentialité",
    footerTerms: "Terms of Service / Conditions Générales",
    footerGdpr: "RGPD, Loi 25 y cumplimiento criptográfico",
    footerLegalHub: "Mandato institucional y artefactos jurídicos",
    footerNexus: "Arquitectura A4I Nexus",
    footerWaqfLedger: "Motor de pruebas WaqfLedger",
    footerAssessment: "Evaluación IA Artículo 4",
    footerStorefront: "Tienda SafeAI (LLC / Gumroad MoR)",
    footerMerchantDisclosure: localeMessages.ES.legal.entityNotice,
    footerIdentity: INSTITUTIONAL_POSITIONING.identity.ES,
    nexusEyebrow: localeMessages.ES.ecosystem.badge,
    nexusTitle: "El A4I Nexus — arquitectura tripartita",
    nexusSubtitle:
      "Un Tiers de confiance soberano que articula un observatorio asociativo, un protocolo de auditoría RegTech y un vehículo comercial LLC estadounidense.",
    mappingEyebrow: "Estándares 2026",
    mappingTitle: "Cartografía regulatoria transatlántica",
    mappingSubtitle:
      "Nodo de enlace para el Anexo III sección 3 y la Ley 25 de Quebec — sin homologación oficial.",
    artifactsDisclaimer: `Los entregables se emiten como ${LEGAL_ARTIFACTS.attestation.ES}, ${LEGAL_ARTIFACTS.maturity.ES} y ${LEGAL_ARTIFACTS.passport.ES} — nunca como certificado de conformidad legal ni homologación oficial del AI Act.`,
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
    submitEmailLabel: "Correo del colaborador (opcional)",
    submitEmailPlaceholder: "nombre@institucion.eu",
    submitNotesLabel: "Notas (opcional)",
    submitNotesPlaceholder: "Contexto para la revisión de investigación",
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
    submitCountryQuebec: "Quebec / Canadá",
    submitCountryNorthAfricaOther: "Norte de África / Otro",
    privacyTitle: "Alineación RGPD, Loi 25 y AI Act UE",
    privacyIntro:
      "Article 4 Institute procesa metadatos de contacto y crowdsourcing limitados para operar el Observatorio y los servicios de gobernanza institucional bajo el RGPD, la Ley 25 de Quebec y los deberes de transparencia del AI Act UE.",
    privacyTerms:
      "Términos de privacidad: solo recopilamos la información que usted envía voluntariamente (nombres de agencias, metadatos de herramientas, notas de contacto opcionales). Los datos se usan para revisión de investigación, seguimiento de compras y registro criptográfico vía WaqfLedger. No vendemos datos personales. La retención se limita a necesidades de verificación y auditoría.",
    privacyDpo: `Delegado de protección de datos: ${SITE_METADATA.contactEmail}`,
    privacyProcessor:
      "Los productos digitales, la facturación y la recaudación del IVA de la UE para SafeAI Framework son procesados y entregados de forma segura por Gumroad, Inc., nuestro Merchant of Record global.",
    privacyGumroadLink: "Documentación de privacidad de Gumroad, Inc.",
    privacyClose: "Cerrar aviso de privacidad",
  },
};
