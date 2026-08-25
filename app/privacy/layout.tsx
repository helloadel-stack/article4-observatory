import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Article 4 Institute",
  description:
    "Privacy policy for Article 4 Institute — GDPR, Quebec Law 25, Gumroad Merchant of Record disclosure, and zero non-essential cookies.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
