"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  dictionary: {
    navigation: {
      home: string
      houses: string
      postHouse: string
      search: string
      about: string
      contact: string
      logout: string
    }
    superAdmin: {
      dashboard: string
      admins: string
      users: string
      properties: string
      finance: string
      expenses: string
      reports: string
      auditLogs: string
      profile: string
      settings: string
    }
    admin: {
      dashboard: string
      users: string
      properties: string
      transactions: string
      messages: string
      reports: string
      profile: string
      settings: string
    }
    language: {
      current: string
    }
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode; lang?: Language }> = ({ 
  children,
  lang: initialLang = "en"
}) => {
  const [lang, setLang] = useState<Language>(initialLang)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLang(savedLanguage)
    } else {
      // Set English as default and save to localStorage
      setLang("en")
      localStorage.setItem("language", "en")
    }
  }, [])

  const translations: Record<Language, LanguageContextType["dictionary"]> = {
    en: {
      navigation: {
        home: "Home",
        houses: "Houses",
        postHouse: "Post a House",
        search: "Search",
        about: "About",
        contact: "Contact",
        logout: "Logout"
      },
      superAdmin: {
        dashboard: "Dashboard",
        admins: "Admins",
        users: "Users",
        properties: "Properties",
        finance: "Finance",
        expenses: "Expenses",
        reports: "Reports",
        auditLogs: "Audit Logs",
        profile: "Profile",
        settings: "Settings"
      },
      admin: {
        dashboard: "Dashboard",
        users: "Users",
        properties: "Properties",
        transactions: "Transactions",
        messages: "Messages",
        reports: "Reports",
        profile: "Profile",
        settings: "Settings"
      },
      language: {
        current: "English"
      }
    },
    am: {
      navigation: {
        home: "መነሻ ገጽ",
        houses: "ቤቶች",
        postHouse: "ቤት ለመለጠፍ",
        search: "ፈልግ",
        about: "ስለ እኛ",
        contact: "ያግኙን",
        logout: "ውጣ"
      },
      superAdmin: {
        dashboard: "ዳሽቦርድ",
        admins: "አስተዳዳሪዎች",
        users: "ተጠቃሚዎች",
        properties: "ቤቶች",
        finance: "ፋይናንስ",
        expenses: "ወጪዎች",
        reports: "ሪፖርቶች",
        auditLogs: "የኦዲት ምዝገቦች",
        profile: "መገለጫ",
        settings: "ቅንብሮች"
      },
      admin: {
        dashboard: "ዳሽቦርድ",
        users: "ተጠቃሚዎች",
        properties: "ቤቶች",
        transactions: "ግብይቶች",
        messages: "መልእክቶች",
        reports: "ሪፖርቶች",
        profile: "መገለጫ",
        settings: "ቅንብሮች"
      },
      language: {
        current: "አማርኛ"
      }
    }
  }

  const value = {
    lang,
    setLang,
    dictionary: translations[lang]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

