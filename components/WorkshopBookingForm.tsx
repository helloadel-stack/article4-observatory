"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Download,
  Loader2,
  Scale,
} from "lucide-react";
import type { Lang } from "@/src/config/constants";

const ORGANISM_VALUES = [
  "Doyen université",
  "Directeur UMR CNRS",
  "DPO",
  "Directeur hôpital",
] as const;

const FORMAT_VALUES = [
  "Briefing 30 min pro bono",
  "Convention recherche LOI",
] as const;

type OrganismType = (typeof ORGANISM_VALUES)[number];
type WorkshopFormat = (typeof FORMAT_VALUES)[number];

type BookingResponse = {
  success: boolean;
  bookingId?: string;
  verificationHash?: string;
  hostDetails?: {
    entityName: string;
    city: string;
    country: string;
  };
  invitationTemplate?: {
    title: string;
    downloadUrl: string;
    status: string;
  };
  timestamp?: string;
  error?: string;
};

type FormState = {
  organismType: OrganismType | "";
  organizationName: string;
  city: string;
  country: string;
  format: WorkshopFormat | "";
  signatoryName: string;
  signatoryTitle: string;
  email: string;
  travelCovered: boolean;
};

const INITIAL: FormState = {
  organismType: "",
  organizationName: "",
  city: "",
  country: "",
  format: "",
  signatoryName: "",
  signatoryTitle: "",
  email: "",
  travelCovered: false,
};

const copy = {
  FR: {
    eyebrow: "Invitation institutionnelle",
    title: "Briefing méthodologique de 30 minutes ou convention de recherche (LOI)",
    subtitle:
      "Invitation réservée aux doyens d'université, aux directeurs de laboratoires de recherche (UMR CNRS), aux DPO et aux directeurs d'hôpital. Demandez un briefing méthodologique pro bono de 30 minutes, ou établissez une convention de recherche empirique (LOI). Aucun honoraire de conseil ni frais de formation.",
    organism: "Qualité du demandeur",
    organismPlaceholder: "Sélectionner…",
    organisms: {
      "Doyen université": "Doyen d'université",
      "Directeur UMR CNRS": "Directeur de laboratoire de recherche (UMR CNRS)",
      DPO: "DPO",
      "Directeur hôpital": "Directeur d'hôpital",
    },
    organization: "Nom de l'établissement",
    organizationPh: "Ex. Université de Montpellier",
    city: "Ville d'intervention",
    cityPh: "Paris, Bruxelles, Genève…",
    country: "Pays d'intervention",
    countryPh: "France, Belgique, Suisse, Luxembourg…",
    format: "Demande",
    formats: {
      "Briefing 30 min pro bono": "Briefing méthodologique pro bono (30 minutes)",
      "Convention recherche LOI": "Convention de recherche empirique (LOI)",
    },
    signatoryName: "Nom du demandeur",
    signatoryNamePh: "Ex. Pr. Camille Bernard",
    signatoryTitle: "Fonction",
    signatoryTitlePh: "Doyen, directeur d'UMR CNRS, DPO, directeur d'hôpital…",
    email: "E-mail professionnel",
    emailPh: "direction@universite.fr",
    travel:
      "Logistique de recherche, sans honoraire : l'établissement hôte confirme la prise en charge éventuelle du transport et de l'hébergement du chercheur. Aucun frais de formation ni rémunération de conseil n'est facturé (condition pour émettre la LOI).",
    submit: "Déposer la lettre d'intention institutionnelle",
    loading: "Génération en cours…",
    requiredError: "Veuillez compléter tous les champs obligatoires.",
    travelError:
      "La confirmation de la logistique de recherche (sans honoraire) est requise pour émettre la lettre d'intention.",
    networkError: "Erreur réseau. Veuillez réessayer.",
    successTitle: "Lettre d'intention émise",
    downloadPdf: "Télécharger la lettre d'intention institutionnelle (PDF)",
    bookingRef: "Référence mission",
    issuedAt: "Émise le",
    hash: "Empreinte SHA-256",
    status: "Statut",
    host: "Hôte",
  },
  EN: {
    eyebrow: "Institutional invitation",
    title: "30-minute methodological briefing or research convention (LOI)",
    subtitle:
      "An invitation for University Deans, Research Laboratory Directors (UMR CNRS), DPOs, and Hospital Directors to request a 30-minute pro-bono methodological briefing or to establish an empirical research convention (LOI). No consulting fee and no training rate.",
    organism: "Requester role",
    organismPlaceholder: "Select…",
    organisms: {
      "Doyen université": "University Dean",
      "Directeur UMR CNRS": "Research Laboratory Director (UMR CNRS)",
      DPO: "DPO",
      "Directeur hôpital": "Hospital Director",
    },
    organization: "Institution name",
    organizationPh: "e.g. University of Montpellier",
    city: "Intervention city",
    cityPh: "Paris, Brussels, Geneva…",
    country: "Intervention country",
    countryPh: "France, Belgium, Switzerland, Luxembourg…",
    format: "Request",
    formats: {
      "Briefing 30 min pro bono": "30-minute pro-bono methodological briefing",
      "Convention recherche LOI": "Empirical research convention (LOI)",
    },
    signatoryName: "Requester name",
    signatoryNamePh: "e.g. Prof. Camille Bernard",
    signatoryTitle: "Role",
    signatoryTitlePh: "Dean, UMR CNRS director, DPO, hospital director…",
    email: "Professional email",
    emailPh: "office@university.edu",
    travel:
      "Research logistics, with no fee: the host institution confirms it may cover the researcher's travel and accommodation. No training fee and no consulting remuneration is charged (required to issue the LOI).",
    submit: "File the institutional letter of intent",
    loading: "Generating…",
    requiredError: "Please complete all required fields.",
    travelError:
      "Confirmation of research logistics (with no fee) is required to issue the letter of intent.",
    networkError: "Network error. Please try again.",
    successTitle: "Letter of intent issued",
    downloadPdf: "Download the institutional letter of intent (PDF)",
    bookingRef: "Mission reference",
    issuedAt: "Issued on",
    hash: "SHA-256 digest",
    status: "Status",
    host: "Host",
  },
  ES: {
    eyebrow: "Invitación institucional",
    title: "Briefing metodológico de 30 minutos o convenio de investigación (LOI)",
    subtitle:
      "Invitación a decanos de universidad, directores de laboratorios de investigación (UMR CNRS), DPO y directores de hospital para solicitar un briefing metodológico pro bono de 30 minutos o establecer un convenio de investigación empírica (LOI). Sin honorarios de consultoría ni tarifa de formación.",
    organism: "Calidad del solicitante",
    organismPlaceholder: "Seleccionar…",
    organisms: {
      "Doyen université": "Decano de universidad",
      "Directeur UMR CNRS": "Director de laboratorio de investigación (UMR CNRS)",
      DPO: "DPO",
      "Directeur hôpital": "Director de hospital",
    },
    organization: "Nombre de la institución",
    organizationPh: "Ej. Universidad de Montpellier",
    city: "Ciudad de intervención",
    cityPh: "París, Bruselas, Ginebra…",
    country: "País de intervención",
    countryPh: "Francia, Bélgica, Suiza, Luxemburgo…",
    format: "Solicitud",
    formats: {
      "Briefing 30 min pro bono": "Briefing metodológico pro bono (30 minutos)",
      "Convention recherche LOI": "Convenio de investigación empírica (LOI)",
    },
    signatoryName: "Nombre del solicitante",
    signatoryNamePh: "Ej. Prof. Camille Bernard",
    signatoryTitle: "Función",
    signatoryTitlePh: "Decano, director de UMR CNRS, DPO, director de hospital…",
    email: "Correo profesional",
    emailPh: "direccion@universidad.edu",
    travel:
      "Logística de investigación, sin honorarios: la institución anfitriona confirma la posible cobertura del transporte y del alojamiento del investigador. No se factura ninguna tarifa de formación ni remuneración de consultoría (condición para emitir la LOI).",
    submit: "Presentar la carta de intención institucional",
    loading: "Generando…",
    requiredError: "Complete todos los campos obligatorios.",
    travelError:
      "La confirmación de la logística de investigación (sin honorarios) es necesaria para emitir la carta de intención.",
    networkError: "Error de red. Inténtelo de nuevo.",
    successTitle: "Carta de intención emitida",
    downloadPdf: "Descargar la carta de intención institucional (PDF)",
    bookingRef: "Referencia de misión",
    issuedAt: "Emitida el",
    hash: "Huella SHA-256",
    status: "Estado",
    host: "Anfitrión",
  },
} as const;

type WorkshopBookingFormProps = {
  lang: Lang;
};

export default function WorkshopBookingForm({ lang }: WorkshopBookingFormProps) {
  const t = copy[lang];
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResponse | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (
      !form.organismType ||
      !form.organizationName.trim() ||
      !form.city.trim() ||
      !form.country.trim() ||
      !form.format ||
      !form.signatoryName.trim() ||
      !form.signatoryTitle.trim() ||
      !form.email.trim()
    ) {
      setError(t.requiredError);
      return;
    }

    if (!form.travelCovered) {
      setError(t.travelError);
      return;
    }

    setLoading(true);
    try {
      const contactName = form.signatoryTitle.trim()
        ? `${form.signatoryName.trim()} — ${form.signatoryTitle.trim()}`
        : form.signatoryName.trim();

      const response = await fetch("/api/workshop-booking", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityType: form.organismType,
          entityName: form.organizationName.trim(),
          city: form.city.trim(),
          country: form.country.trim(),
          format: form.format,
          contactName,
          contactEmail: form.email.trim(),
          coversLogistics: form.travelCovered,
        }),
      });
      const data = (await response.json()) as BookingResponse;
      if (!response.ok || !data.success) {
        setError(data.error ?? t.networkError);
        return;
      }
      setResult(data);
    } catch {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    const url = result?.invitationTemplate?.downloadUrl;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "w-full rounded-lg border border-slate-600 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40";

  return (
    <section
      id="reservation"
      aria-labelledby="reservation-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            {t.eyebrow}
          </p>
          <h2
            id="reservation-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {t.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            {t.subtitle}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-950/60 px-3 py-2 text-xs font-medium text-indigo-200">
          <Scale className="h-4 w-4 shrink-0" aria-hidden />
          Visa · A4I-MISSION
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.organism}
            </span>
            <select
              required
              value={form.organismType}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  organismType: e.target.value as OrganismType | "",
                }))
              }
              className={fieldClass}
            >
              <option value="" disabled>
                {t.organismPlaceholder}
              </option>
              {ORGANISM_VALUES.map((value) => (
                <option key={value} value={value}>
                  {t.organisms[value]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.organization}
            </span>
            <input
              type="text"
              required
              maxLength={200}
              value={form.organizationName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  organizationName: e.target.value,
                }))
              }
              placeholder={t.organizationPh}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.city}
            </span>
            <input
              type="text"
              required
              maxLength={120}
              value={form.city}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder={t.cityPh}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.country}
            </span>
            <input
              type="text"
              required
              maxLength={120}
              value={form.country}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, country: e.target.value }))
              }
              placeholder={t.countryPh}
              className={fieldClass}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.format}
            </span>
            <select
              required
              value={form.format}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  format: e.target.value as WorkshopFormat | "",
                }))
              }
              className={fieldClass}
            >
              <option value="" disabled>
                {t.organismPlaceholder}
              </option>
              {FORMAT_VALUES.map((value) => (
                <option key={value} value={value}>
                  {t.formats[value]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.signatoryName}
            </span>
            <input
              type="text"
              required
              maxLength={160}
              value={form.signatoryName}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  signatoryName: e.target.value,
                }))
              }
              placeholder={t.signatoryNamePh}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.signatoryTitle}
            </span>
            <input
              type="text"
              required
              maxLength={160}
              value={form.signatoryTitle}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  signatoryTitle: e.target.value,
                }))
              }
              placeholder={t.signatoryTitlePh}
              className={fieldClass}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {t.email}
            </span>
            <input
              type="email"
              required
              maxLength={254}
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder={t.emailPh}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3">
          <input
            type="checkbox"
            checked={form.travelCovered}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                travelCovered: e.target.checked,
              }))
            }
            className="mt-1 h-4 w-4 rounded border-slate-500 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm leading-relaxed text-slate-300">
            {t.travel}
          </span>
        </label>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-rose-500/40 bg-rose-950/40 px-3.5 py-2.5 text-sm text-rose-200"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {t.loading}
            </>
          ) : (
            t.submit
          )}
        </button>
      </form>

      {result?.success && result.invitationTemplate ? (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-indigo-950/60 p-6"
        >
          <div className="flex flex-wrap items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400/70 bg-emerald-500/10 text-emerald-300"
              aria-hidden
            >
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {t.successTitle}
              </p>
              <h3 className="mt-1 text-lg font-bold text-white">
                {result.invitationTemplate.title}
              </h3>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">{t.bookingRef}</dt>
                  <dd className="mt-0.5 font-mono text-xs text-slate-200 break-all">
                    {result.bookingId}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">{t.status}</dt>
                  <dd className="mt-0.5 text-amber-200">
                    {result.invitationTemplate.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">{t.host}</dt>
                  <dd className="mt-0.5 text-slate-200">
                    {result.hostDetails
                      ? `${result.hostDetails.entityName} — ${result.hostDetails.city}, ${result.hostDetails.country}`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">{t.issuedAt}</dt>
                  <dd className="mt-0.5 text-slate-200">
                    {result.timestamp
                      ? new Date(result.timestamp).toLocaleString(
                          lang === "FR"
                            ? "fr-FR"
                            : lang === "ES"
                              ? "es-ES"
                              : "en-GB",
                        )
                      : "—"}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">{t.hash}</dt>
                  <dd className="mt-0.5 font-mono text-xs text-indigo-200 break-all">
                    {result.verificationHash}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={downloadPdf}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Download className="h-4 w-4" aria-hidden />
                {t.downloadPdf}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
