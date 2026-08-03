import type { Metadata } from "next";
import { ATELIERS_JURIDIQUES, BRAND } from "@/src/config/constants";

export const metadata: Metadata = {
  title: `${ATELIERS_JURIDIQUES.title} | ${BRAND.institute}`,
  description:
    "Formation exécutive et audit terrain pour cabinets d'avocats, directeurs juridiques et barreaux — gouvernance IA, secret professionnel, clauses SaaS et attestation WaqfLedger.",
  authors: [{ name: BRAND.institute }],
  openGraph: {
    title: "Ateliers Juridiques — Gouvernance IA & Audit AI Act",
    description:
      "Masterclass & workshop in-situ pour professionnels du droit : Shadow AI, clauses SaaS, Art. 50 et audit cryptographique.",
    locale: "fr_FR",
  },
};

export default function AteliersJuridiquesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
