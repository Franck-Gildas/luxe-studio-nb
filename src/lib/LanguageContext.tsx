"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import i18n from "i18next";

type Lang = "en" | "fr";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
});

function applyLangToDom(newLang: Lang) {
  document.documentElement.lang = newLang;
  document.body.classList.toggle("lang-fr", newLang === "fr");
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("luxe-lang") as Lang;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
      applyLangToDom(saved);
      void i18n.changeLanguage(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("luxe-lang", newLang);
    applyLangToDom(newLang);
    void i18n.changeLanguage(newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
