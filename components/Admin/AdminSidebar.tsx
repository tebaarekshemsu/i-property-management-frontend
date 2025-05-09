"use client"

import { usePathname } from "next/navigation"
import {
  Users,
  Building,
  BarChart,
  CreditCard,
  UserCircle,
  Settings,
  LogOut,
  MessageSquare,
  FileSpreadsheet,
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
import { useLanguage } from "@/contexts/LanguageContext"
import { useMemo } from "react"

export function AdminSidebar() {
  const pathname = usePathname()

  // Try to use the language context, but provide fallbacks if it's not available
  const languageContext = useLanguage()

  const { lang, dictionary } = useMemo(() => {
    try {
      return {
        lang: languageContext.lang,
        dictionary: languageContext.dictionary,
      }
    } catch (error) {
      console.warn("AdminSidebar used outside of LanguageProvider")
      return {
        lang: "en",
        dictionary: {
          admin: {
            dashboard: "Dashboard",
            users: "Users",
            properties: "Properties",
            transactions: "Transactions",
            messages: "Messages",
            reports: "Reports",
            profile: "Profile",
            settings: "Settings",
          },
          navigation: {
            logout: "Logout",
          },
        },
      }
    }
  }, [languageContext])

  const navigation = [
    {
      name: dictionary.admin.dashboard,
      href: "/admin",
      icon: BarChart,
    },
    {
      name: dictionary.admin.users,
      href: "/admin/users",
      icon: Users,
    },
    {
      name: dictionary.admin.properties,
      href: "/admin/properties",
      icon: Building,
    },
    {
      name: dictionary.admin.transactions,
      href: "/admin/transactions",
      icon: CreditCard,
    },
    {
      name: dictionary.admin.messages,
      href: "/admin/messages",
      icon: MessageSquare,
    },
    {
      name: dictionary.admin.reports,
      href: "/admin/reports",
      icon: FileSpreadsheet,
    },
  ]

  const footerNavigation = [
    {
      name: dictionary.admin.profile,
      href: "/admin/profile",
      icon: UserCircle,
    },
    {
      name: dictionary.admin.settings,
      href: "/admin/settings",
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
          <Logo/>
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

