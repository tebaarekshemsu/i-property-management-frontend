"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "am")) {
      setLanguage(savedLanguage)
    } else {
      // Set English as default and save to localStorage
      setLanguage("en")
      localStorage.setItem("language", "en")
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const translations: Record<Language, Record<string, string>> = {
    en: {
      home: "Home",
      houses: "Houses",
      postHouse: "Post a House",
      dashboard: "Dashboard",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      email: "Email address",
      password: "Password",
      name: "Name",
      signIn: "Sign in",
      createAccount: "Create account",
      needAccount: "Need an account? Sign up",
      haveAccount: "Already have an account? Sign in",
      // Add more translations here
      // Admin Dashboard
      adminPanel: "Admin Panel",
      adminDashboard: "Admin Dashboard",
      dashboardd: "Dashboard",
      visitRequests: "Visit Requests",
      postRequests: "Post Requests",
      housesReport: "Houses Report",
      successReports: "Success Reports",
      failureReports: "Failure Reports",
      totalRevenue: "Total Revenue",
      totalUsers: "Total Users",
      totalHouses: "Total Houses",
      pendingVisits: "Pending Visits",
      successRate: "Success Rate",
      recentTransactions: "Recent Transactions",
      topAgents: "Top Agents",

      // Tables
      house: "House",
      visitor: "Visitor",
      visitorPhone: "Visitor Phone",
      owner: "Owner",
      ownerPhone: "Owner Phone",
      requestDate: "Request Date",
      status: "Status",
      actions: "Actions",
      location: "Location",
      price: "Price",
      category: "Category",
      submissionDate: "Submission Date",
      amount: "Amount",
      date: "Date",
      type: "Type",
      agent: "Agent",
      sales: "Sales",
      revenue: "Revenue",
      visitDate: "Visit Date",

      //  'Agent',
      saless: "Sales",
      revenuee: "Revenue",
      visitDatee: "Visit Date",

      // Actions
      approve: "Approve",
      reject: "Reject",
      viewPhotos: "View Photos",
      successReport: "Success Report",
      failureReport: "Failure Report",
      loading: "Loading",
      cancel: "Cancel",
      confirm: "Confirm",
      close: "Close",

      // Visit Requests
      approveVisit: "Approve Visit",
      approveVisitDescription: "You are about to approve a visit request for",
      for: "for",
      rejectVisit: "Reject Visit",
      rejectVisitDescription: "You are about to reject a visit request for",
      rejectReason: "Rejection Reason",

      // Post Requests
      approvePost: "Approve Post",
      approvePostDescription: "You are about to approve the house post",
      rejectPost: "Reject Post",
      rejectPostDescription: "You are about to reject the house post",
      housePhotos: "House Photos",

      // Houses Report
      housesNeedingReports: "Houses Needing Reports",

      // Success Report
      houseDetails: "House Details",
      namee: "Name",
      listedPrice: "Listed Price",
      buyerName: "Buyer/Renter Name",
      buyerPhone: "Buyer/Renter Phone",
      finalPrice: "Final Price",
      commission: "Commission",
      transactionDate: "Transaction Date",
      transactionPhoto: "Transaction Photo",
      notes: "Notes",
      submitReport: "Submit Report",
      submitting: "Submitting",
      houseNotFound: "House not found",

      // Failure Report
      failureReason: "Failure Reason",

      // Super Admin Dashboard
      superAdminPanel: "Super Admin Panel",
      superAdminDashboard: "Super Admin Dashboard",
      adminManagement: "Admin Management",
      financialOverview: "Financial Overview",
      expenseRequests: "Expense Requests",
      systemReports: "System Reports",
      systemSettings: "System Settings",
      totalAdmins: "Total Admins",
      pendingExpenses: "Pending Expenses",
      systemHealth: "System Health",
      recentActivity: "Recent Activity",
      topPerformingAdmins: "Top Performing Admins",
      viewAllActivity: "View All Activity",
      viewAllAdmins: "View All Admins",

      // Admin Management
      addAdmin: "Add Admin",
      editAdmin: "Edit Admin",
      deleteAdmin: "Delete Admin",
      deleteAdminConfirmation: "Are you sure you want to delete admin",
      seniorAdmin: "Senior Admin",
      admin: "Admin",
      active: "Active",
      inactive: "Inactive",
      dateAdded: "Date Added",
      transactions: "Transactions",
      add: "Add",
      save: "Save",
      edit: "Edit",
      delete: "Delete",

      // Financial Overview
      totalRevenuee: "Total Revenue",
      totalExpenses: "Total Expenses",
      netProfit: "Net Profit",
      pendingAmount: "Pending Amount",
      allTransactions: "All Transactions",
      salesss: "Sales",
      rentals: "Rentals",
      commissions: "Commissions",
      expenses: "Expenses",
      dateFilter: "Date Filter",
      exportData: "Export Data",
      sale: "Sale",
      rent: "Rent",
      commissionn: "Commission",
      expense: "Expense",
      completed: "Completed",
      pending: "Pending",
      failed: "Failed",
      filterByDate: "Filter by Date",
      startDate: "Start Date",
      endDate: "End Date",
      applyFilter: "Apply Filter",

      // Expense Requests
      title: "Title",
      description: "Description",
      amountt: "Amount",
      categoryy: "Category",
      requestedBy: "Requested By",
      requestDatee: "Request Date",
      statuss: "Status",
      allRequests: "All Requests",
      approved: "Approved",
      rejected: "Rejected",
      details: "Details",
      expenseDetails: "Expense Details",
      receipt: "Receipt",
      approveExpense: "Approve Expense",
      approveExpenseConfirmation: "Are you sure you want to approve the expense",
      rejectExpense: "Reject Expense",
      rejectExpenseConfirmation: "Are you sure you want to reject the expense",
      office: "Office",
      marketing: "Marketing",
      travel: "Travel",
      maintenance: "Maintenance",
      other: "Other",
    },
    am: {
      home: "መነሻ ገጽ",
      houses: "ቤቶች",
      postHouse: "ቤት ለመለጠፍ",
      dashboard: "ዳሽቦርድ",
      login: "ግባ",
      signup: "ተመዝገብ",
      logout: "ውጣ",
      email: "ኢሜይል አድራሻ",
      password: "የይለፍ ቃል",
      name: "ስም",
      signIn: "ግባ",
      createAccount: "አካውንት ፍጠር",
      needAccount: "አካውንት ያስፈልግዎታል? ተመዝገብ",
      haveAccount: "አካውንት አለህ? ግባ",
      // Add more translations here
      // Admin Dashboard
      adminPanel: "የአስተዳዳሪ ፓነል",
      adminDashboard: "የአስተዳዳሪ ዳሽቦርድ",
      dashboardd: "ዳሽቦርድ",
      visitRequests: "የጉብኝት ጥያቄዎች",
      postRequests: "የልጥፍ ጥያቄዎች",
      housesReport: "የቤቶች ሪፖርት",
      successReports: "የስኬት ሪፖርቶች",
      failureReports: "የውድቀት ሪፖርቶች",
      totalRevenue: "ጠቅላላ ገቢ",
      totalUsers: "ጠቅላላ ተጠቃሚዎች",
      totalHouses: "ጠቅላላ ቤቶች",
      pendingVisits: "በመጠባበቅ ላይ ያሉ ጉብኝቶች",
      successRate: "የስኬት መጠን",
      recentTransactions: "የቅርብ ጊዜ ግብይቶች",
      topAgents: "ከፍተኛ ወኪሎች",

      // Tables
      house: "ቤት",
      visitor: "ጎብኚ",
      visitorPhone: "የጎብኚ ስልክ",
      owner: "ባለቤት",
      ownerPhone: "የባለቤት ስልክ",
      requestDate: "የጥያቄ ቀን",
      status: "ሁኔታ",
      actions: "ድርጊቶች",
      location: "አድራሻ",
      price: "ዋጋ",
      category: "ምድብ",
      submissionDate: "የማስገቢያ ቀን",
      amount: "መጠን",
      date: "ቀን",
      type: "ዓይነት",
      agent: "ወኪል",
      sales: "ሽያጮች",
      revenue: "ገቢ",
      visitDate: "የጉብኝት ቀን",

      // Actions
      approve: "ፍቀድ",
      reject: "ውድቅ አድርግ",
      viewPhotos: "ፎቶዎችን ይመልከቱ",
      successReport: "የስኬት ሪፖርት",
      failureReport: "የውድቀት ሪፖርት",
      loading: "በመጫን ላይ",
      cancel: "ይቅር",
      confirm: "አረጋግጥ",
      close: "ዝጋ",

      // Visit Requests
      approveVisit: "ጉብኝትን ፍቀድ",
      approveVisitDescription: "የጉብኝት ጥያቄን ለመፍቀድ ነው",
      for: "ለ",
      rejectVisit: "ጉብኝትን ውድቅ አድርግ",
      rejectVisitDescription: "የጉብኝት ጥያቄን ውድቅ ለማድረግ ነው",
      rejectReason: "የውድቅ ምክንያት",

      // Post Requests
      approvePost: "ልጥፍን ፍቀድ",
      approvePostDescription: "የቤት ልጥፍን ለመፍቀድ ነው",
      rejectPost: "ልጥፍን ውድቅ አድርግ",
      rejectPostDescription: "የቤት ልጥፍን ውድቅ ለማድረግ ነው",
      housePhotos: "የቤት ፎቶዎች",

      // Houses Report
      housesNeedingReports: "ሪፖርት የሚያስፈልጋቸው ቤቶች",

      // Success Report
      houseDetails: "የቤት ዝርዝሮች",
      namee: "ስም",
      listedPrice: "የተዘረዘረ ዋጋ",
      buyerName: "የገዢ/ተከራይ ስም",
      buyerPhone: "የገዢ/ተከራይ ስልክ",
      finalPrice: "የመጨረሻ ዋጋ",
      commission: "ኮሚሽን",
      transactionDate: "የግብይት ቀን",
      transactionPhoto: "የግብይት ፎቶ",
      notes: "ማስታወሻዎች",
      submitReport: "ሪፖርት አስገባ",
      submitting: "በማስገባት ላይ",
      houseNotFound: "ቤት አልተገኘም",

      // Failure Report
      failureReason: "የውድቀት ምክንያት",

      // Super Admin Dashboard
      superAdminPanel: "የበላይ አስተዳዳሪ ፓነል",
      superAdminDashboard: "የበላይ አስተዳዳሪ ዳሽቦርድ",
      adminManagement: "የአስተዳዳሪ አስተዳደር",
      financialOverview: "የፋይናንስ አጠቃላይ እይታ",
      expenseRequests: "የወጪ ጥያቄዎች",
      systemReports: "የስርዓት ሪፖርቶች",
      systemSettings: "የስርዓት ቅንብሮች",
      totalAdmins: "ጠቅላላ አስተዳዳሪዎች",
      pendingExpenses: "በመጠባበቅ ላይ ያሉ ወጪዎች",
      systemHealth: "የስርዓት ጤንነት",
      recentActivity: "የቅርብ ጊዜ እንቅስቃሴ",
      topPerformingAdmins: "ከፍተኛ አፈጻጸም ያላቸው አስተዳዳሪዎች",
      viewAllActivity: "ሁሉንም እንቅስቃሴዎች ይመልከቱ",
      viewAllAdmins: "ሁሉንም አስተዳዳሪዎች ይመልከቱ",

      // Admin Management
      addAdmin: "አስተዳዳሪ ጨምር",
      editAdmin: "አስተዳዳሪ አርትዕ",
      deleteAdmin: "አስተዳዳሪ ሰርዝ",
      deleteAdminConfirmation: "አስተዳዳሪን መሰረዝ መፈለግዎን እርግጠኛ ነዎት",
      seniorAdmin: "ከፍተኛ አስተዳዳሪ",
      admin: "አስተዳዳሪ",
      active: "ንቁ",
      inactive: "ንቁ ያልሆነ",
      dateAdded: "የተጨመረበት ቀን",
      transactions: "ግብይቶች",
      add: "ጨምር",
      save: "አስቀምጥ",
      edit: "አርትዕ",
      delete: "ሰርዝ",

      // Financial Overview
      totalRevenuee: "ጠቅላላ ገቢ",
      totalExpenses: "ጠቅላላ ወጪዎች",
      netProfit: "ተጣራ ትርፍ",
      pendingAmount: "በመጠባበቅ ላይ ያለ መጠን",
      allTransactions: "ሁሉም ግብይቶች",
      saless: "ሽያጮች",
      rentals: "ኪራዮች",
      commissions: "ኮሚሽኖች",
      expenses: "ወጪዎች",
      dateFilter: "በቀን አጣራ",
      exportData: "ውሂብ ላክ",
      sale: "ሽያጭ",
      rent: "ኪራይ",
      commissionn: "ኮሚሽን",
      expense: "ወጪ",
      completed: "የተጠናቀቀ",
      pending: "በመጠባበቅ ላይ",
      failed: "ያልተሳካ",
      filterByDate: "በቀን አጣራ",
      startDate: "የመጀመሪያ ቀን",
      endDate: "የመጨረሻ ቀን",
      applyFilter: "ማጣሪያ ተግብር",

      // Expense Requests
      title: "ርዕስ",
      description: "መግለጫ",
      amountt: "መጠን",
      categoryy: "ምድብ",
      requestedBy: "የጠየቀው",
      requestDatee: "የጥያቄ ቀን",
      statuss: "ሁኔታ",
      allRequests: "ሁሉም ጥያቄዎች",
      approved: "የተፈቀደ",
      rejected: "የተከለከለ",
      details: "ዝርዝሮች",
      expenseDetails: "የወጪ ዝርዝሮች",
      receipt: "ደረሰኝ",
      approveExpense: "ወጪን ፍቀድ",
      approveExpenseConfirmation: "ወጪውን መፍቀድ መፈለግዎን እርግጠኛ ነዎት",
      rejectExpense: "ወጪን ውድቅ አድርግ",
      rejectExpenseConfirmation: "ወጪውን ውድቅ ማድረግ መፈለግዎን እርግጠኛ ነዎት",
      office: "ቢሮ",
      marketing: "ማርኬቲንግ",
      travel: "ጉዞ",
      maintenance: "ጥገና",
      other: "ሌላ",
    },
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

