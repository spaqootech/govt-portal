"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.support": "Support",
    "nav.about": "About",
    "auth.signin": "Sign In",
    "auth.register": "Register",
  },
  ur: {
    "nav.home": "ہوم",
    "nav.services": "خدمات",
    "nav.support": "سپورٹ",
    "nav.about": "کے بارے میں",
    "auth.signin": "سائن ان",
    "auth.register": "رجسٹر",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
