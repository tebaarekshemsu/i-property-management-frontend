"use client"

import { usePathname } from "next/navigation"
import {
  Users,
  Building,
  BarChart,
  UserCircle,
  Settings,
  LogOut,
  CircleDollarSign,
  FileSpreadsheet,
  Shield,
  Wallet,
  FileText,
  Globe,
} from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Logo } from "@/public/Logo"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/components/language-provider"
import { useMemo } from "react"

export function SuperAdminSidebar() {
  const pathname = usePathname()

  // Use the language context, but provide fallbacks if it's not available
  const languageData = useLanguage()
  const { lang, dictionary } = useMemo(() => {
    try {
      return {
        lang: languageData.lang,
        dictionary: languageData.dictionary,
      }
    } catch (error) {
      console.warn("SuperAdminSidebar used outside of LanguageProvider")
      return {
        lang: "en",
        dictionary: {
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
          },
          navigation: {
            logout: "Logout",
          },
        },
      }
    }
  }, [languageData])

  const navigation = [
    {
      name: dictionary.superAdmin.dashboard,
      href: "/super-admin",
      icon: BarChart,
    },
    {
      name: dictionary.superAdmin.admins,
      href: "/super-admin/admins",
      icon: Shield,
    },
    {
      name: dictionary.superAdmin.users,
      href: "/super-admin/users",
      icon: Users,
    },
    {
      name: dictionary.superAdmin.properties,
      href: "/super-admin/properties",
      icon: Building,
    },
    {
      name: dictionary.superAdmin.finance,
      href: "/super-admin/finance",
      icon: CircleDollarSign,
    },
    {
      name: dictionary.superAdmin.expenses,
      href: "/super-admin/expenses",
      icon: Wallet,
    },
    {
      name: dictionary.superAdmin.reports,
      href: "/super-admin/reports",
      icon: FileSpreadsheet,
    },
    {
      name: dictionary.superAdmin.auditLogs,
      href: "/super-admin/audit-logs",
      icon: FileText,
    },
  ]

  const footerNavigation = [
    {
      name: dictionary.superAdmin.profile,
      href: "/super-admin/profile",
      icon: UserCircle,
    },
    {
      name: dictionary.superAdmin.settings,
      href: "/super-admin/settings",
      icon: Settings,
    },
    {
      name: dictionary.navigation.logout,
      href: "/logout",
      icon: LogOut,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="flex items-center space-x-2">
          <Logo />
         
        </div>
      </SidebarHeader>
      <SidebarSeparator />

      {/* Language Switcher at the top of the sidebar for better visibility */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{lang === "en" ? "English" : "አማርኛ"}</span>
          </div>
          <LanguageSwitcher iconOnly={true} />
        </div>
      </div>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarSeparator />
          {footerNavigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.name}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

