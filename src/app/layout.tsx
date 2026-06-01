import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { NavSpacer } from "@/components/layout/NavSpacer";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { LanguageProvider } from "@/lib/LanguageContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Concierge } from "@/components/ui/Concierge";
import PageTransition from "@/components/ui/PageTransition";
import RouteOverlay from "@/components/ui/RouteOverlay";
import GSAPAnimations from "@/components/ui/GSAPAnimations";
import "./globals.css";
import "@/styles/legacy.css";

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
  title: {
    default: "Luxe Studio NB",
    template: "%s · Luxe Studio NB",
  },
  description: "Where beauty becomes ritual. Où la beauté devient rituel.",
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
            __html: `(function(){var l=localStorage.getItem('luxe-lang');if(l==='fr'){document.documentElement.lang='fr';document.body.classList.add('lang-fr');}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <LanguageProvider>
          <I18nProvider>
            <LoadingScreen />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <GSAPAnimations />
            <NavSpacer />
            <RouteOverlay />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
            <Concierge />
          </I18nProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
