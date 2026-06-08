import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { AdminAwareShell } from "@/components/admin/AdminAwareShell";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";
import "@/styles/legacy.css";
import "@/styles/french-typography.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luxe-studio-nb.vercel.app"),
  title: {
    template: "%s · Luxe Studio NB",
    default: "Luxe Studio NB — Where Beauty Becomes Ritual",
  },
  description:
    "A luxury beauty and wellness atelier in Moncton, New Brunswick. By appointment only. Hair, skin, nails, lash & brow, barbering, and wellness rituals.",
  keywords: [
    "luxury salon Moncton",
    "beauty atelier NB",
    "hair salon Moncton",
    "spa Moncton",
    "New Brunswick beauty",
    "private salon Moncton",
    "wellness rituals NB",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: "fr_CA",
    siteName: "Luxe Studio NB",
    url: "/",
    images: ["/img/hero-vial.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@luxestudionb",
    creator: "@luxestudionb",
    images: ["/img/hero-vial.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    // fr-CA: '/fr' — add when /fr routes exist
    languages: {
      "en-CA": "/",
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=localStorage.getItem('luxe-lang');if(l==='fr'){document.documentElement.lang='fr';document.body.classList.add('lang-fr');}if(window.location.pathname==='/'&&!sessionStorage.getItem('luxe-loaded')){document.documentElement.classList.add('luxe-intro-pending');}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <LanguageProvider>
          <I18nProvider>
            <AdminAwareShell>{children}</AdminAwareShell>
          </I18nProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
