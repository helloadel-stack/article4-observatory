"use client";

import { useState, type FormEvent } from "react";
import { ShieldCheck, User, PlusCircle, X } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import WaqfLedgerAuditSection from "@/components/WaqfLedgerAuditSection";
import AssessmentSection from "@/components/AssessmentSection";
import HtmlLangSync from "@/components/HtmlLangSync";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NexusSection from "@/components/NexusSection";
import TechnicalEnginesSection from "@/components/TechnicalEnginesSection";
import PublicationsSection from "@/components/PublicationsSection";
import TransatlanticSection from "@/components/TransatlanticSection";
import ObservatoryExplorer from "@/src/components/ObservatoryExplorer";
import {
  BRAND,
  CONTENT_LICENSES,
  DEFAULT_LANG,
  INSTITUTIONAL_POSITIONING,
  SITE_METADATA,
} from "@/src/config/constants";
import { translations } from "@/src/i18n/translations";
import { getLocaleMessages } from "@/src/locales";
import { useSyncedLang } from "@/src/lib/useSyncedLang";

type SubmitCountry =
  | "France"
  | "Germany"
  | "Spain"
  | "EU"
  | "Quebec / Canada"
  | "North Africa / Other";

interface SubmitFormState {
  agency: string;
  country: SubmitCountry | "";
  toolName: string;
  modelHosting: string;
  verificationUrl: string;
  email: string;
  notes: string;
}

const EMPTY_SUBMIT_FORM: SubmitFormState = {
  agency: "",
  country: "",
  toolName: "",
  modelHosting: "",
  verificationUrl: "",
  email: "",
  notes: "",
};

const SUBMIT_COUNTRIES: SubmitCountry[] = [
  "France",
  "Germany",
  "Spain",
  "EU",
  "Quebec / Canada",
  "North Africa / Other",
];

function LinkedInIcon({
  className,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: BRAND.storefront,
      applicationCategory: "BusinessApplication",
      description: SITE_METADATA.description,
      url: BRAND.instituteUrl,
      author: {
        "@type": "Person",
        name: SITE_METADATA.author,
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice: "49",
        highPrice: "2499",
      },
      publisher: {
        "@type": "Organization",
        name: SITE_METADATA.publisher,
        url: BRAND.instituteUrl,
        sameAs: [BRAND.linkedInUrl],
      },
    },
    {
      "@type": "NGO",
      name: SITE_METADATA.publisher,
      url: BRAND.instituteUrl,
      sameAs: [
        BRAND.linkedInUrl,
        BRAND.safeAiReportUrl,
        BRAND.arabicObservatoryUrl,
        BRAND.waqfLedgerUrl,
      ],
      description: INSTITUTIONAL_POSITIONING.identity.EN,
      slogan: INSTITUTIONAL_POSITIONING.slogan.EN,
      founder: {
        "@type": "Person",
        name: SITE_METADATA.author,
        jobTitle: "Founder & Lead Researcher",
      },
    },
    {
      "@type": "Dataset",
      name: SITE_METADATA.datasetTitle,
      description:
        "2026 multi-criteria benchmarking corpus of 13 authoritative public and educational AI deployments across 10 jurisdictions in Europe, Quebec/Canada, and EU institutions, with WaqfLedger SHA-256 proof hashes.",
      url: `${BRAND.instituteUrl}#observatory`,
      creator: {
        "@type": "Organization",
        name: SITE_METADATA.publisher,
        url: BRAND.instituteUrl,
      },
      temporalCoverage: "2026",
      license: CONTENT_LICENSES.observatory.url,
      usageInfo: CONTENT_LICENSES.observatory.scope.EN,
    },
    {
      "@type": "CreativeWork",
      name: "Bouclier IA Publique (Pro-bono Toolkit)",
      url: `${BRAND.instituteUrl}/bouclier-public`,
      license: CONTENT_LICENSES.bouclier.url,
      usageInfo: CONTENT_LICENSES.bouclier.scope.EN,
    },
    {
      "@type": "ScholarlyArticle",
      name: "Sovereign AI Assurance: Benchmarking Dialect Drift, Token Economics, and PDPL Compliance in MENA-EU Enterprise Deployments",
      datePublished: "2026",
      inLanguage: "en",
      author: {
        "@type": "Person",
        name: "Adel El Bouzagaoui",
        affiliation: {
          "@type": "Organization",
          name: SITE_METADATA.publisher,
        },
      },
      publisher: {
        "@type": "Organization",
        name: SITE_METADATA.publisher,
        url: BRAND.instituteUrl,
      },
      url: BRAND.safeAiReportUrl,
    },
    {
      "@type": "Product",
      name: "SafeAI Framework B2B Enterprise Kits",
      url: BRAND.gumroadStoreUrl,
      usageInfo: CONTENT_LICENSES.enterprise.scope.EN,
      additionalProperty: {
        "@type": "PropertyValue",
        name: "license",
        value: CONTENT_LICENSES.enterprise.short,
      },
    },
  ],
};

export default function Home() {
  const [lang, handleLangChange] = useSyncedLang(DEFAULT_LANG);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitForm, setSubmitForm] =
    useState<SubmitFormState>(EMPTY_SUBMIT_FORM);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<"required" | "network" | null>(
    null,
  );
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [sessionProofs, setSessionProofs] = useState<string[]>([]);

  const t = translations[lang];
  const locale = getLocaleMessages(lang);

  const countryLabels: Record<SubmitCountry, string> = {
    France: t.submitCountryFrance,
    Germany: t.submitCountryGermany,
    Spain: t.submitCountrySpain,
    EU: t.submitCountryEu,
    "Quebec / Canada": t.submitCountryQuebec,
    "North Africa / Other": t.submitCountryNorthAfricaOther,
  };

  const openSubmitModal = () => {
    setSubmitForm(EMPTY_SUBMIT_FORM);
    setSubmitSuccess(false);
    setSubmitError(null);
    setSubmitLoading(false);
    setSubmissionId(null);
    setSubmitOpen(true);
  };

  const closeSubmitModal = () => {
    setSubmitOpen(false);
    setSubmitSuccess(false);
    setSubmitError(null);
    setSubmitLoading(false);
  };

  const updateSubmitField = <K extends keyof SubmitFormState>(
    key: K,
    value: SubmitFormState[K],
  ) => {
    setSubmitForm((prev) => ({ ...prev, [key]: value }));
    setSubmitError(null);
  };

  const handleSubmitProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      agency,
      country,
      toolName,
      modelHosting,
      verificationUrl,
      email,
      notes,
    } = submitForm;
    const isValid =
      agency.trim() !== "" &&
      country !== "" &&
      toolName.trim() !== "" &&
      modelHosting.trim() !== "" &&
      verificationUrl.trim() !== "";

    if (!isValid) {
      setSubmitError("required");
      setSubmitSuccess(false);
      return;
    }

    setSubmitError(null);
    setSubmitLoading(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agencyName: agency.trim(),
          country,
          toolName: toolName.trim(),
          modelHosting: modelHosting.trim(),
          verificationUrl: verificationUrl.trim(),
          notes: notes.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        submissionId?: string;
        error?: string;
      };

      if (!res.ok || !json.success || !json.submissionId) {
        setSubmitError(res.status === 400 ? "required" : "network");
        setSubmitSuccess(false);
        return;
      }

      setSubmissionId(json.submissionId);
      setSubmitSuccess(true);
    } catch {
      setSubmitError("network");
      setSubmitSuccess(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  const navLinks: {
    href: string;
    label: string;
    route?: boolean;
  }[] = [
    { href: "#observatory", label: t.navFramework },
    { href: "#nexus", label: t.navNexus },
    { href: "#engines", label: locale.engines.nav },
    { href: "#publications", label: locale.publications.nav },
    { href: "#mapping", label: t.navMapping },
    { href: "#pricing", label: t.navComplianceKits },
    { href: "#waqfledger", label: t.navWaqfLedger },
    { href: "#assessment", label: t.navDocumentation },
    { href: "/bouclier-public", label: t.navBouclierPublic, route: true },
    {
      href: "/ateliers-juridiques",
      label: t.navAteliersJuridiques,
      route: true,
    },
  ];

  return (
    <div className="flex min-h-full flex-col bg-slate-50 text-slate-900">
      <HtmlLangSync lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header
        t={t}
        lang={lang}
        onLangChange={handleLangChange}
        navLinks={navLinks}
        onSubmit={openSubmitModal}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Hero t={t} />

        <NexusSection lang={lang} t={t} />

        <TechnicalEnginesSection lang={lang} />

        <TransatlanticSection lang={lang} t={t} />

        <ObservatoryExplorer lang={lang} t={t} />

        <AssessmentSection
          lang={lang}
          onProofGenerated={(proofId) =>
            setSessionProofs((prev) =>
              prev.includes(proofId) ? prev : [...prev, proofId],
            )
          }
        />

        <PricingSection lang={lang} onLangChange={handleLangChange} />

        <WaqfLedgerAuditSection lang={lang} sessionProofs={sessionProofs} />

        <section
          id="framework"
          className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-6 sm:px-8"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
              aria-hidden
            />
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {t.methodologyTitle}
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
                {t.methodologyText}
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">
                {t.safeAiDisclosure.split("SafeAI.report").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <a
                        href={BRAND.safeAiReportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-900"
                      >
                        SafeAI.report
                      </a>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                {t.poweredBySafeAi}
              </p>
            </div>
          </div>
        </section>

        <PublicationsSection lang={lang} />

        <section
          id="about"
          className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-6 sm:px-8"
        >
          <div className="flex items-start gap-3">
            <User
              className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold tracking-tight">
                {t.aboutTitle}
              </h2>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-indigo-100 bg-indigo-50 text-sm font-semibold text-indigo-800">
                  AE
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-slate-900">
                    {t.aboutLeadName}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-500">
                    {t.founderRole}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {t.leadResearcher}
                  </p>
                  <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">
                    {t.aboutText}
                  </p>
                  <a
                    href={BRAND.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  >
                    <LinkedInIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {t.connectLinkedIn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} lang={lang} />

      {submitOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
          onClick={closeSubmitModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-slate-300 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-indigo-950 px-5 py-4 text-white">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-indigo-200" aria-hidden />
                <h3
                  id="submit-modal-title"
                  className="text-base font-semibold tracking-tight"
                >
                  {t.submitModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeSubmitModal}
                className="rounded p-1 text-indigo-200 hover:bg-indigo-900 hover:text-white"
                aria-label={t.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProject} className="space-y-4 px-5 py-5">
              {submitSuccess ? (
                <div
                  role="status"
                  className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
                >
                  <p>{t.submitSuccess}</p>
                  {submissionId ? (
                    <code className="mt-2 block break-all font-mono text-[11px]">
                      {submissionId}
                    </code>
                  ) : null}
                </div>
              ) : null}

              {submitError ? (
                <div
                  role="alert"
                  className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                >
                  {submitError === "required"
                    ? t.submitRequiredError
                    : t.submitNetworkError}
                </div>
              ) : null}

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitAgencyLabel}
                </span>
                <input
                  type="text"
                  required
                  value={submitForm.agency}
                  onChange={(e) => updateSubmitField("agency", e.target.value)}
                  placeholder={t.submitAgencyPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitCountryLabel}
                </span>
                <select
                  required
                  value={submitForm.country}
                  onChange={(e) =>
                    updateSubmitField(
                      "country",
                      e.target.value as SubmitCountry | "",
                    )
                  }
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">{t.submitCountryPlaceholder}</option>
                  {SUBMIT_COUNTRIES.map((code) => (
                    <option key={code} value={code}>
                      {countryLabels[code]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitToolLabel}
                </span>
                <input
                  type="text"
                  required
                  value={submitForm.toolName}
                  onChange={(e) =>
                    updateSubmitField("toolName", e.target.value)
                  }
                  placeholder={t.submitToolPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitModelHostingLabel}
                </span>
                <input
                  type="text"
                  required
                  value={submitForm.modelHosting}
                  onChange={(e) =>
                    updateSubmitField("modelHosting", e.target.value)
                  }
                  placeholder={t.submitModelHostingPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitVerificationLabel}
                </span>
                <input
                  type="url"
                  required
                  value={submitForm.verificationUrl}
                  onChange={(e) =>
                    updateSubmitField("verificationUrl", e.target.value)
                  }
                  placeholder={t.submitVerificationPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitEmailLabel}
                </span>
                <input
                  type="email"
                  value={submitForm.email}
                  onChange={(e) => updateSubmitField("email", e.target.value)}
                  placeholder={t.submitEmailPlaceholder}
                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {t.submitNotesLabel}
                </span>
                <textarea
                  value={submitForm.notes}
                  onChange={(e) => updateSubmitField("notes", e.target.value)}
                  placeholder={t.submitNotesPlaceholder}
                  rows={3}
                  className="w-full resize-y border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </label>

              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={closeSubmitModal}
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  {t.submitCancel}
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="inline-flex items-center gap-2 border border-indigo-700 bg-indigo-700 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 disabled:opacity-60"
                >
                  <PlusCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {submitLoading ? t.submitLoading : t.submitForReview}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
