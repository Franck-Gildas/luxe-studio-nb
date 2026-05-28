"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLng } from "@/lib/i18n";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("fr") ? "fr" : "en") as SupportedLng;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`lang-switch${lang === "fr" ? " fr" : ""}`} role="group" aria-label="Language">
      <span className="knob" aria-hidden />
      <button
        type="button"
        className={lang === "en" ? "on" : ""}
        onClick={() => i18n.changeLanguage("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === "fr" ? "on" : ""}
        onClick={() => i18n.changeLanguage("fr")}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
    </div>
  );
}
