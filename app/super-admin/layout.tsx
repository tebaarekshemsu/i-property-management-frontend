import type React from "react"
import { SuperAdminSidebar } from "@/components/SuperAdmin/SuperAdminSidebar"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}

