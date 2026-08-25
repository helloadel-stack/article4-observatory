import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Licensing | Article 4 Institute",
  description:
    "B2B digital product terms for SafeAI Framework audit toolkits — pricing tiers, US LLC commercial vehicle, Gumroad fulfillment, and legal artifacts (Attestation, Bilan de Maturité, Passeport d'Audit IA).",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
