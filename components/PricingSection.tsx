"use client";

import { Check, Mail } from "lucide-react";
import {
  getProcurementMailto,
  isLiveGumroadCheckoutUrl,
  GUMROAD,
  PRICING_TIERS,
  SUPPORTED_LANGS,
  type Lang,
} from "@/src/config/constants";

export type StorefrontLang = Lang;

const sectionCopy = {
  EN: {
    title: "Compliance Kits",
    subtitle:
      "Institutional policy packs, high-risk classification matrices, and Article 4 literacy frameworks ready for university deployment.",
    featuresLabel: "Included",
    cta: "Purchase Kit",
    fallbackCta: "Launch Direct Procurement",
    langGroup: "Pricing language",
    procurementHint:
      "Checkout URL not yet live — request institutional procurement by email.",
  },
  FR: {
    title: "Kits de conformité",
    subtitle:
      "Packs de politiques institutionnelles, matrices de classification à haut risque et cadres de littératie Article 4 prêts pour le déploiement universitaire.",
    featuresLabel: "Inclus",
    cta: "Acheter le kit",
    fallbackCta: "Lancer l’achat direct",
    langGroup: "Langue de la tarification",
    procurementHint:
      "URL de paiement non encore active — demandez l’achat institutionnel par e-mail.",
  },
  ES: {
    title: "Kits de cumplimiento",
    subtitle:
      "Paquetes de políticas institucionales, matrices de clasificación de alto riesgo y marcos de alfabetización Artículo 4 listos para universidades.",
    featuresLabel: "Incluido",
    cta: "Comprar kit",
    fallbackCta: "Iniciar adquisición directa",
    langGroup: "Idioma de precios",
    procurementHint:
      "URL de pago aún no activa — solicite adquisición institucional por correo.",
  },
} as const;

type PricingSectionProps = {
  lang: StorefrontLang;
  onLangChange: (lang: StorefrontLang) => void;
};

export default function PricingSection({
  lang,
  onLangChange,
}: PricingSectionProps) {
  const copy = sectionCopy[lang];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="mt-8 scroll-mt-24 border border-slate-200 bg-white px-6 py-10 sm:px-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h2
            id="pricing-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            {copy.subtitle}
          </p>
        </div>

        <div
          role="group"
          aria-label={copy.langGroup}
          className="inline-flex shrink-0 rounded-lg border border-slate-200 bg-slate-100 p-1"
        >
          {SUPPORTED_LANGS.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onLangChange(code)}
              className={
                lang === code
                  ? "rounded-md bg-indigo-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
                  : "rounded-md px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-white hover:text-indigo-800"
              }
              aria-pressed={lang === code}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => {
          const localized = tier[lang];
          const checkoutUrl = GUMROAD.checkoutUrls[tier.checkoutKey];
          const isLiveUrl = isLiveGumroadCheckoutUrl(checkoutUrl);
          const procurementHref = getProcurementMailto(localized.title);

          return (
            <article
              key={tier.id}
              className={
                tier.featured
                  ? "relative flex flex-col rounded-xl border-2 border-indigo-600 bg-gradient-to-b from-indigo-50/80 to-white p-6 shadow-md ring-1 ring-indigo-100 transition-shadow hover:shadow-lg"
                  : "relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:border-sky-300 hover:shadow-md"
              }
            >
              {localized.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-indigo-700 px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm">
                  {localized.badge}
                </span>
              ) : null}

              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {localized.title}
              </h3>

              <div className="mt-4">
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {tier.price}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {localized.target}
                </p>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {copy.featuresLabel}
              </p>
              <ul className="mt-3 flex flex-1 flex-col gap-2.5">
                {localized.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-snug text-slate-700"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={isLiveUrl ? checkoutUrl : procurementHref}
                {...(isLiveUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={
                  isLiveUrl
                    ? "mt-6 block w-full rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-950 transition-colors duration-200 hover:bg-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                }
              >
                {!isLiveUrl ? (
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                ) : null}
                {isLiveUrl ? copy.cta : copy.fallbackCta}
              </a>
              {!isLiveUrl ? (
                <p className="mt-2 text-center text-[11px] leading-snug text-slate-500">
                  {copy.procurementHint}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
