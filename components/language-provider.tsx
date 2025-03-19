"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define English dictionary
const en = {
  language: {
    current: "English",
    switch: "Switch language",
  },
  navigation: {
    home: "Home",
    houses: "Houses",
    search: "Search",
    postHouse: "Post House",
    dashboard: "Dashboard",
    settings: "Settings",
    logout: "Logout",
    about: "About",
    contact: "Contact",
  },
  admin: {
    dashboard: "Dashboard",
    users: "Users",
    properties: "Properties",
    transactions: "Transactions",
    messages: "Messages",
    reports: "Reports",
    profile: "Profile",
    settings: "Settings",
    overview: "Overview",
    totalUsers: "Total Users",
    totalProperties: "Total Properties",
    totalTransactions: "Total Transactions",
    recentActivity: "Recent Activity",
    pendingApprovals: "Pending Approvals",
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
    settings: "Settings",
    overview: "Overview",
    totalAdmins: "Total Admins",
    totalUsers: "Total Users",
    totalProperties: "Total Properties",
    revenue: "Revenue",
    pendingExpenses: "Pending Expenses",
    systemHealth: "System Health",
  },
  // Add other translations as needed
}

// Define Amharic dictionary
const am = {
  language: {
    current: "አማርኛ",
    switch: "ቋንቋ ቀይር",
  },
  navigation: {
    home: "መነሻ",
    houses: "ቤቶች",
    search: "ፈልግ",
    postHouse: "ቤት አስገባ",
    dashboard: "ዳሽቦርድ",
    settings: "ቅንብሮች",
    logout: "ውጣ",
    about: "ስለኛ",
    contact: "ያግኙን",
  },
  admin: {
    dashboard: "ዳሽቦርድ",
    users: "ተጠቃሚዎች",
    properties: "ንብረቶች",
    transactions: "ግብይቶች",
    messages: "መልዕክቶች",
    reports: "ሪፖርቶች",
    profile: "መገለጫ",
    settings: "ቅንብሮች",
    overview: "አጠቃላይ እይታ",
    totalUsers: "ጠቅላላ ተጠቃሚዎች",
    totalProperties: "ጠቅላላ ንብረቶች",
    totalTransactions: "ጠቅላላ ግብይቶች",
    recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
    pendingApprovals: "በመጠባበቅ ላይ ያሉ ማጽደቆች",
  },
  superAdmin: {
    dashboard: "ዳሽቦርድ",
    admins: "አስተዳዳሪዎች",
    users: "ተጠቃሚዎች",
    properties: "ንብረቶች",
    finance: "ፋይናንስ",
    expenses: "ወጪዎች",
    reports: "ሪፖርቶች",
    auditLogs: "የኦዲት ምዝግብ ማስታወሻዎች",
    profile: "መገለጫ",
    settings: "ቅንብሮች",
    overview: "አጠቃላይ እይታ",
    totalAdmins: "ጠቅላላ አስተዳዳሪዎች",
    totalUsers: "ጠቅላላ ተጠቃሚዎች",
    totalProperties: "ጠቅላላ ንብረቶች",
    revenue: "ገቢ",
    pendingExpenses: "በመጠባበቅ ላይ ያሉ ወጪዎች",
    systemHealth: "የስርዓት ጤንነት",
  },
  // Add other translations as needed
}

type Dictionary = typeof en

type LanguageContextType = {
  lang: string
  dictionary: Dictionary
  setLang: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageProvider({
  children,
  lang: initialLang = "en",
}: {
  children: ReactNode
  lang?: string
}) {
  const [lang, setLang] = useState(initialLang)
  const [dictionary, setDictionary] = useState<Dictionary>(lang === "am" ? am : en)

  useEffect(() => {
    setDictionary(lang === "am" ? am : en)
    document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`
  }, [lang])

  return <LanguageContext.Provider value={{ lang, dictionary, setLang }}>{children}</LanguageContext.Provider>
}

