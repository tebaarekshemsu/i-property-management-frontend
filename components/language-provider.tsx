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
    login: "Login",
    signup: "Sign Up",
  },
  common: {
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    price: "Price",
    location: "Location",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area",
    amenities: "Amenities",
    contactInfo: "Contact Information",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    loading: "Loading...",
    noResults: "No results found",
    sqm: "sqm",
    required: "Required",
  },
  landing: {
    hero: {
      title: "Find Your Dream Home in Ethiopia",
      subtitle: "Browse thousands of properties for sale and rent across the country",
      cta: "Start Searching",
    },
    featured: "Featured Properties",
    recentlyAdded: "Recently Added",
    popularLocations: "Popular Locations",
    testimonials: "What Our Clients Say",
    partners: "Our Partners",
  },
  houseList: {
    title: "Properties",
    filter: "Filter Properties",
    sort: {
      newest: "Newest First",
      priceAsc: "Price: Low to High",
      priceDesc: "Price: High to Low",
    },
    propertyType: "Property Type",
    priceRange: "Price Range",
    noProperties: "No properties match your criteria",
    resultsCount: "Showing {{count}} properties",
  },
  houseDetail: {
    overview: "Overview",
    description: "Description",
    features: "Features",
    location: "Location",
    contactOwner: "Contact Owner",
    similarProperties: "Similar Properties",
    requestVisit: "Request a Visit",
    share: "Share",
    save: "Save",
    report: "Report",
  },
  postHouse: {
    title: "Post a New Property",
    description: "Fill out the form below to list your property on BetEth Real Estate Marketplace",
    basicInfo: "Basic Information",
    propertyTitle: "Property Title",
    propertyType: "Property Type",
    listingType: "Listing Type",
    propertyDetails: "Property Details",
    contactInfo: "Contact Information",
    amenitiesPlaceholder: "e.g., Swimming Pool, Garden, Security, Parking",
    success: {
      title: "Property Listed Successfully!",
      message: "Your property has been successfully submitted and is now pending approval.",
      details:
        "Our team will review your listing and it will be published soon. You will receive a notification once your property is approved.",
      dashboard: "Go to Dashboard",
      postAnother: "Post Another Property",
    },
  },
  propertyTypes: {
    house: "House",
    apartment: "Apartment",
    villa: "Villa",
    commercial: "Commercial",
    land: "Land",
  },
  listingTypes: {
    sale: "For Sale",
    rent: "For Rent",
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
    login: "ግባ",
    signup: "ተመዝገብ",
  },
  common: {
    search: "ፈልግ",
    filter: "አጣራ",
    sort: "አስተካክል",
    price: "ዋጋ",
    location: "አካባቢ",
    bedrooms: "መኝታ ቤቶች",
    bathrooms: "መታጠቢያ ቤቶች",
    area: "ስፋት",
    amenities: "አገልግሎቶች",
    contactInfo: "የመገኛ መረጃ",
    submit: "አስገባ",
    cancel: "ሰርዝ",
    save: "አስቀምጥ",
    edit: "አስተካክል",
    delete: "ሰርዝ",
    view: "እይ",
    loading: "በመጫን ላይ...",
    noResults: "ምንም ውጤት አልተገኘም",
    sqm: "ካሬ ሜትር",
    required: "አስፈላጊ",
  },
  landing: {
    hero: {
      title: "በኢትዮጵያ የህልም ቤትዎን ያግኙ",
      subtitle: "በመላው አገሪቱ ለሽያጭና ለኪራይ የሚቀርቡ ሺዎች ንብረቶችን ይመልከቱ",
      cta: "መፈለግ ይጀምሩ",
    },
    featured: "ተለይተው የቀረቡ ንብረቶች",
    recentlyAdded: "በቅርብ ጊዜ የተጨመሩ",
    popularLocations: "ታዋቂ አካባቢዎች",
    testimonials: "ደንበኞቻችን ምን ይላሉ",
    partners: "አጋሮቻችን",
  },
  houseList: {
    title: "ንብረቶች",
    filter: "ንብረቶችን አጣራ",
    sort: {
      newest: "አዲስ መጀመሪያ",
      priceAsc: "ዋጋ፡ ከዝቅተኛ ወደ ከፍተኛ",
      priceDesc: "ዋጋ፡ ከከፍተኛ ወደ ዝቅተኛ",
    },
    propertyType: "የንብረት አይነት",
    priceRange: "የዋጋ ክልል",
    noProperties: "መስፈርትዎን የሚያሟሉ ንብረቶች የሉም",
    resultsCount: "{{count}} ንብረቶች እያሳየ ነው",
  },
  houseDetail: {
    overview: "አጠቃላይ እይታ",
    description: "መግለጫ",
    features: "ባህሪያት",
    location: "አካባቢ",
    contactOwner: "ባለቤቱን ያግኙ",
    similarProperties: "ተመሳሳይ ንብረቶች",
    requestVisit: "ጉብኝት ይጠይቁ",
    share: "አጋራ",
    save: "አስቀምጥ",
    report: "ሪፖርት አድርግ",
  },
  postHouse: {
    title: "አዲስ ንብረት ያስገቡ",
    description: "በቤት ኢት የሪል እስቴት ገበያ ላይ ንብረትዎን ለመዘርዘር ከዚህ በታች ያለውን ቅጽ ይሙሉ",
    basicInfo: "መሰረታዊ መረጃ",
    propertyTitle: "የንብረት ርዕስ",
    propertyType: "የንብረት አይነት",
    listingType: "የዝርዝር አይነት",
    propertyDetails: "የንብረት ዝርዝሮች",
    contactInfo: "የመገኛ መረጃ",
    amenitiesPlaceholder: "ለምሳሌ፣ የዋና መዋኛ፣ የአትክልት ስፍራ፣ ደህንነት፣ መኪና ማቆሚያ",
    success: {
      title: "ንብረት በተሳካ ሁኔታ ተዘርዝሯል!",
      message: "ንብረትዎ በተሳካ ሁኔታ ቀርቧል እና አሁን ማጽደቅን በመጠበቅ ላይ ነው።",
      details: "ቡድናችን ዝርዝርዎን ይገመግማል እና በቅርቡ ይታተማል። ንብረትዎ ሲፈቀድ ማሳወቂያ ይደርስዎታል።",
      dashboard: "ወደ ዳሽቦርድ ሂድ",
      postAnother: "ሌላ ንብረት አስገባ",
    },
  },
  propertyTypes: {
    house: "ቤት",
    apartment: "አፓርታማ",
    villa: "ቪላ",
    commercial: "ንግድ",
    land: "መሬት",
  },
  listingTypes: {
    sale: "ለሽያጭ",
    rent: "ለኪራይ",
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
}

type Dictionary = typeof en

type LanguageContextType = {
  lang: string
  dictionary: Dictionary
  setLang: (lang: string) => void
}

// Create a default context value to avoid the "must be used within a provider" error
const defaultContextValue: LanguageContextType = {
  lang: "en",
  dictionary: en,
  setLang: () => {},
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function useLanguage() {
  return useContext(LanguageContext)
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

