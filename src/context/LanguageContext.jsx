import { createContext, useContext, useEffect, useState } from "react";
import fr from "../i18n/fr";
import ar from "../i18n/ar";

const translations = { fr, ar };

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("altigo-lang") || "fr";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("altigo-lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "ar" : "fr"));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t, isRTL: language === "ar" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}