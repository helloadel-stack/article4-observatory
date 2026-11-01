import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Licensing | Article 4 Institute",
  description:
    "Non-commercial scientific licensing for Article 4 Institute research corpora — CC BY 4.0 and CC BY-NC 4.0, disinterested management under Article 206-1 bis CGI, and legal artifacts (Attestation, Bilan de Maturité, Passeport d'Audit IA).",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
