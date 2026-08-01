import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR & Cryptographic Compliance | SafeAI Framework",
  description:
    "GDPR data protection rights, DPO contact, and zero-knowledge cryptographic verification via WaqfLedger for SafeAI Framework.",
};

export default function GdprLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
