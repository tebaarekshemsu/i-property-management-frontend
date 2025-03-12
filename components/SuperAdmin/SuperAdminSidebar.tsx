"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, DollarSign, CreditCard, BarChart, Settings, LogOut } from "lucide-react"
// import { useLanguage } from "@/contexts/LanguageContext"

export function SuperAdminSidebar() {
  const pathname = usePathname()
  // const { t } = useLanguage()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/super-admin", label: ("dashboard"), icon: LayoutDashboard },
    { href: "/super-admin/admins", label: ("adminManagement"), icon: Users },
    { href: "/super-admin/finances", label: ("financialOverview"), icon: DollarSign },
    { href: "/super-admin/expenses", label: ("expenseRequests"), icon: CreditCard },
    { href: "/super-admin/reports", label: ("systemReports"), icon: BarChart },
    { href: "/super-admin/settings", label: ("systemSettings"), icon: Settings },
  ]

  return (
    <div className="w-64 bg-white shadow-md ">
      <div className="p-6 bg-blue-700 text-white">
        <h1 className="text-2xl font-bold">{("superAdminPanel")}</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive(item.href) ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : ""
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <li className="mt-6">
            <Link href="/auth" className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              <span>{("logout")}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

