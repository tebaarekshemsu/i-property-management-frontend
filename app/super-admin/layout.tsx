import type React from "react"
import { cookies } from "next/headers"
import { SuperAdminSidebar } from "@/components/SuperAdmin/SuperAdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { LanguageProvider } from "@/contexts/LanguageContext"

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "am"

  return (
    <LanguageProvider lang={lang}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <SuperAdminSidebar />
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 sticky">
                <SidebarTrigger className="md:hidden" />
              </div>
            </div>
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </LanguageProvider>
  )
}

