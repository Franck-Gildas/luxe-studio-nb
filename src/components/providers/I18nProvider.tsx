"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nConfig } from "@/lib/i18n";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    ...i18nConfig,
    lng: "en",
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
