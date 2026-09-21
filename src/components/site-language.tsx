import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/data/site";

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "ar",
  setLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}
