import type React from "react"
import { AdminSidebar } from "@/components/Admin/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { LanguageProvider } from "@/components/language-provider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider lang={"en"}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 p-6 sticky">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              </div>
              <div className="hidden md:block">
              </div>
            </div>
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </LanguageProvider>
  )
}

