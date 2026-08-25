import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR, Loi 25 & Cryptographic Compliance | Article 4 Institute",
  description:
    "GDPR and Quebec Law 25 data protection rights, DPO contact, and zero-knowledge cryptographic verification via WaqfLedger for Article 4 Institute.",
};

export default function GdprLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
