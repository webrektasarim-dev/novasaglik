"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "tr" | "en" | "ru" | "ar";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("nova-language") as Language | null;
    if (stored && ["tr", "en", "ru", "ar"].includes(stored)) {
      setLanguage(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("nova-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const order: Language[] = ["tr", "en", "ru", "ar"];
      const currentIndex = order.indexOf(prev);
      const nextIndex = (currentIndex + 1) % order.length;
      return order[nextIndex];
    });
  };

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

