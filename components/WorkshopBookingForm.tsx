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
  "Cabinet d'Avocats",
  "Direction Juridique",
  "Barreau / Ordre",
  "Autre",
] as const;

const FORMAT_VALUES = [
  "1 Journée Intensive",
  "2 Journées Résidentielles",
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
    eyebrow: "Réservation sur site",
    title: "Convention de Mission & Lettre d'Invitation Officielle",
    subtitle:
      "Validez votre demande pour générer immédiatement la Convention de Mission & Lettre d'Invitation Officielle, identifiée par un jeton unique A4I-MISSION-, avec clauses de garantie financière de l'hôte.",
    organism: "Type d'organisme",
    organismPlaceholder: "Sélectionner…",
    organisms: {
      "Cabinet d'Avocats": "Cabinet d'Avocats",
      "Direction Juridique": "Direction Juridique",
      "Barreau / Ordre": "Barreau / Ordre",
      Autre: "Autre",
    },
    organization: "Nom du Cabinet / Entreprise",
    organizationPh: "Ex. Cabinet Dupont & Associés",
    city: "Ville d'intervention",
    cityPh: "Paris, Bruxelles, Genève…",
    country: "Pays d'intervention",
    countryPh: "France, Belgique, Suisse, Luxembourg…",
    format: "Format souhaité",
    formats: {
      "1 Journée Intensive": "1 Journée Intensive",
      "2 Journées Résidentielles": "2 Journées Résidentielles",
    },
    signatoryName: "Nom du signataire",
    signatoryNamePh: "Ex. Me Sophie Martin",
    signatoryTitle: "Titre du signataire",
    signatoryTitlePh: "Associé Gérant, Directeur Juridique…",
    email: "E-mail professionnel",
    emailPh: "associe@cabinet-avocat.fr",
    travel:
      "Garantie financière de l'hôte : l'établissement prend en charge les billets de transport, l'hébergement et les frais de mission de l'intervenant (condition obligatoire pour émettre la Convention de Mission).",
    submit: "Valider la Demande & Générer la Convention de Mission & Lettre d'Invitation Officielle",
    loading: "Génération en cours…",
    requiredError: "Veuillez compléter tous les champs obligatoires.",
    travelError:
      "La garantie financière de l'hôte (transport + hébergement) est requise pour émettre la Convention de Mission.",
    networkError: "Erreur réseau. Veuillez réessayer.",
    successTitle: "Convention de Mission émise",
    downloadPdf:
      "Télécharger la Convention de Mission & Lettre d'Invitation Officielle (PDF)",
    bookingRef: "Référence mission",
    issuedAt: "Émise le",
    hash: "Empreinte SHA-256",
    status: "Statut",
    host: "Hôte",
  },
  EN: {
    eyebrow: "Onsite reservation",
    title: "Mission Agreement & Official Invitation Letter",
    subtitle:
      "Submit your request to instantly generate the Mission Agreement & Official Invitation Letter, identified by a unique A4I-MISSION- token, including host financial-guarantee clauses.",
    organism: "Organization type",
    organismPlaceholder: "Select…",
    organisms: {
      "Cabinet d'Avocats": "Law Firm",
      "Direction Juridique": "Corporate Legal / CLO",
      "Barreau / Ordre": "Bar Association",
      Autre: "Other",
    },
    organization: "Firm / Company name",
    organizationPh: "e.g. Dupont & Partners",
    city: "Intervention city",
    cityPh: "Paris, Brussels, Geneva…",
    country: "Intervention country",
    countryPh: "France, Belgium, Switzerland, Luxembourg…",
    format: "Preferred format",
    formats: {
      "1 Journée Intensive": "1 Intensive Day",
      "2 Journées Résidentielles": "2 Residential Days",
    },
    signatoryName: "Signatory name",
    signatoryNamePh: "e.g. Sophie Martin, Esq.",
    signatoryTitle: "Signatory title",
    signatoryTitlePh: "Managing Partner, General Counsel…",
    email: "Professional email",
    emailPh: "partner@lawfirm.eu",
    travel:
      "Host financial guarantee: the establishment covers the speaker's travel tickets, accommodation, and mission expenses (mandatory to issue the Mission Agreement).",
    submit: "Validate Request & Generate the Mission Agreement & Official Invitation Letter",
    loading: "Generating…",
    requiredError: "Please complete all required fields.",
    travelError:
      "Host financial guarantee (travel + accommodation) is required to issue the Mission Agreement.",
    networkError: "Network error. Please try again.",
    successTitle: "Mission Agreement issued",
    downloadPdf:
      "Download the Mission Agreement & Official Invitation Letter (PDF)",
    bookingRef: "Mission reference",
    issuedAt: "Issued on",
    hash: "SHA-256 digest",
    status: "Status",
    host: "Host",
  },
  ES: {
    eyebrow: "Reserva in situ",
    title: "Convenio de Misión y Carta de Invitación Oficial",
    subtitle:
      "Valide su solicitud para generar de inmediato el Convenio de Misión y Carta de Invitación Oficial, identificado por un token único A4I-MISSION-, con cláusulas de garantía financiera del anfitrión.",
    organism: "Tipo de organismo",
    organismPlaceholder: "Seleccionar…",
    organisms: {
      "Cabinet d'Avocats": "Despacho de Abogados",
      "Direction Juridique": "Dirección Jurídica / CLO",
      "Barreau / Ordre": "Colegio de Abogados",
      Autre: "Otro",
    },
    organization: "Nombre del despacho / empresa",
    organizationPh: "Ej. Despacho Dupont & Asociados",
    city: "Ciudad de intervención",
    cityPh: "París, Bruselas, Ginebra…",
    country: "País de intervención",
    countryPh: "Francia, Bélgica, Suiza, Luxemburgo…",
    format: "Formato deseado",
    formats: {
      "1 Journée Intensive": "1 Jornada Intensiva",
      "2 Journées Résidentielles": "2 Jornadas Residenciales",
    },
    signatoryName: "Nombre del firmante",
    signatoryNamePh: "Ej. Sophie Martin",
    signatoryTitle: "Cargo del firmante",
    signatoryTitlePh: "Socio Gestor, Director Jurídico…",
    email: "Correo profesional",
    emailPh: "socio@despacho.eu",
    travel:
      "Garantía financiera del anfitrión: el establecimiento cubre los billetes de transporte, el alojamiento y los gastos de misión del interviniente (condición obligatoria para emitir el Convenio de Misión).",
    submit: "Validar la Solicitud y Generar el Convenio de Misión y Carta de Invitación Oficial",
    loading: "Generando…",
    requiredError: "Complete todos los campos obligatorios.",
    travelError:
      "La garantía financiera del anfitrión (transporte + alojamiento) es necesaria para emitir el Convenio de Misión.",
    networkError: "Error de red. Inténtelo de nuevo.",
    successTitle: "Convenio de Misión emitido",
    downloadPdf:
      "Descargar el Convenio de Misión y Carta de Invitación Oficial (PDF)",
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
