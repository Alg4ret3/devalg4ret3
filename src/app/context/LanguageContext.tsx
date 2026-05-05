"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type Lang = "ES" | "EN";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (es: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "EN",
  toggleLang: () => { },
  t: (es, en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ES" ? "EN" : "ES"));
  }, []);

  const t = useCallback(
    (es: string, en: string) => (lang === "ES" ? es : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

/**
 * Animated translation component
 * Uses a unique key to trigger mount animations on language change
 */
export const T = ({ es, en }: { es: string; en: string }) => {
  const { lang } = useLang();
  const text = lang === "ES" ? es : en;

  return (
    <span key={text} className="gl-animate-lang-text">
      {text}
    </span>
  );
};
