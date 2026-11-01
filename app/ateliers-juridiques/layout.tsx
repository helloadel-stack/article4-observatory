import type { Metadata } from "next";
import { ATELIERS_JURIDIQUES, BRAND } from "@/src/config/constants";

export const metadata: Metadata = {
  title: `${ATELIERS_JURIDIQUES.title} | ${BRAND.institute}`,
  description:
    "Invitation aux doyens d'université, directeurs de laboratoires (UMR CNRS), DPO et directeurs d'hôpital : briefing méthodologique pro bono de 30 minutes ou convention de recherche empirique (LOI).",
  authors: [{ name: BRAND.institute }],
  openGraph: {
    title: ATELIERS_JURIDIQUES.title,
    description:
      "Mission d'intérêt général : briefing méthodologique pro bono de 30 minutes ou convention de recherche empirique (LOI), sans honoraire de conseil.",
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
