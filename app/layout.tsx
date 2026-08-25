import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_METADATA } from "@/src/config/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const FR_OG_TITLE =
  "Article 4 Institute | Observatoire & Think Tank — Article 4 & Annexe III";
const FR_OG_DESCRIPTION =
  "Opérationnaliser l'Article 4 du règlement européen sur l'IA et la conformité haut risque Annexe III pour l'intégrité de l'enseignement supérieur. Observatoire francophone indépendant (Association loi 1901) — Tiers de confiance ISO/IEC 42001.";

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  authors: [{ name: SITE_METADATA.author }],
  publisher: SITE_METADATA.publisher,
  openGraph: {
    title: FR_OG_TITLE,
    description: FR_OG_DESCRIPTION,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: FR_OG_TITLE,
    description: FR_OG_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
