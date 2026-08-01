import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SafeAI Framework",
  description:
    "Privacy policy for Article 4 Institute / SafeAI Framework — Lemon Squeezy Merchant of Record disclosure, PII practices, and zero non-essential cookies.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
