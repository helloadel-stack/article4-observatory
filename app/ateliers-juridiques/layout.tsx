import type { Metadata } from "next";
import { ATELIERS_JURIDIQUES, BRAND } from "@/src/config/constants";

export const metadata: Metadata = {
  title: `${ATELIERS_JURIDIQUES.title} | ${BRAND.institute}`,
  description:
    "Séminaires doctrinaux, briefings de direction et coopération scientifique à titre non commercial pour universités, UMR CNRS, CHU et collectivités — protocoles de recherche empirique et lettres d'intention institutionnelles.",
  authors: [{ name: BRAND.institute }],
  openGraph: {
    title: ATELIERS_JURIDIQUES.title,
    description:
      "Mission d'intérêt général : ateliers méthodologiques sans honoraire de conseil ni frais de formation, dans le cadre d'une lettre d'intention institutionnelle.",
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
