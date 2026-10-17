import type { Metadata } from "next";
import { BRAND } from "@/src/config/constants";

export const metadata: Metadata = {
  title: "Bouclier IA Publique (Safe Public AI Shield) | Article 4 Institute",
  description:
    "Cadre opérationnel de gouvernance et de préparation à l'AI Act pour les collectivités, hôpitaux et institutions publiques francophones. Programme non-lucratif pro bono (CC BY-NC 4.0) — 4 modules, 12 livrables.",
  authors: [{ name: BRAND.institute }],
  openGraph: {
    title: "Bouclier IA Publique — Safe Public AI Shield",
    description:
      "Diagnostic Shadow AI, Boussole du Risque IA™, registre de transparence et scorecard exécutif pour le secteur public francophone. Kit pro bono CC BY-NC 4.0.",
    locale: "fr_FR",
    alternateLocale: ["en_GB", "es_ES"],
  },
};

export default function BouclierPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
