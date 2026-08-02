import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Licensing | SafeAI Framework",
  description:
    "B2B digital product terms for SafeAI Framework compliance kits — pricing tiers, Gumroad, Inc. fulfillment, EU refund policy, and IP licensing.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
