import type { Metadata } from "next";
import { INSTITUTIONAL_POSITIONING, SITE_METADATA } from "@/src/config/constants";

export const metadata: Metadata = {
  title: "Institutional Mandate & Legal Artifacts | Article 4 Institute",
  description: INSTITUTIONAL_POSITIONING.identity.EN,
  authors: [{ name: SITE_METADATA.author }],
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
