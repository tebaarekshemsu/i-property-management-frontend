import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"

import { cn } from "@/lib/utils"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "I property solution",
  description: "Find your dream home in Ethiopia",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const lang = (await cookieStore).get("lang")?.value || "en"

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div>{children}</div>
      </body>
    </html>
  )
}
