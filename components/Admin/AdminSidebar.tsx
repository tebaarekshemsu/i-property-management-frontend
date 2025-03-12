"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, FileText, ClipboardList, CheckSquare, XSquare, LogOut } from "lucide-react"
import Paths from "@/path"
// import { useLanguage } from "@/contexts/LanguageContext"

export function AdminSidebar() {
  const pathname = usePathname()
//   const { t } = useLanguage()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: `${Paths.adminDashboardPath()}`, label: ("dashboard"), icon: LayoutDashboard },
    { href:`${Paths.adminVisitRequestsPath()}`, label: "visitRequests", icon: Calendar },
    { href: `${Paths.adminPostRequestsPath()}`, label: "postRequests", icon: FileText },
    { href: `${Paths.adminHouseReportPath()}`, label: "housesReport", icon: ClipboardList },
    { href: "/admin/success-reports", label: "successReports", icon: CheckSquare },
    { href: "/admin/failure-reports", label: ("failureReports"), icon: XSquare },
  ]

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">{("adminPanel")}</h1>
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

function t(arg0: string) {
    throw new Error("Function not implemented.")
}

