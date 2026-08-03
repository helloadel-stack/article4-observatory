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
  "SafeAI Framework | Observatoire Européen & Kit de Conformité AI Act";
const FR_OG_DESCRIPTION =
  "Cadre opérationnel de gouvernance IA, matrices de risques Annexe III et kits de conformité Article 4 pour établissements d'enseignement supérieur, collectivités et éditeurs EdTech.";

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
