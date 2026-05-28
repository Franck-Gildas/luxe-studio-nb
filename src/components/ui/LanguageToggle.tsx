"use client";

import { useLang } from "@/lib/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className={`lang-switch${lang === "fr" ? " fr" : ""}`} role="group" aria-label="Language">
      <span className="knob" aria-hidden />
      <button
        type="button"
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === "fr" ? "on" : ""}
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
    </div>
  );
}
