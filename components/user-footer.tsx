"use client"

import Link from "next/link"
import { Building } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function UserFooter() {
  const { dictionary } = useLanguage()

  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">BetEth</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Find your dream home in Ethiopia with BetEth, the leading real estate marketplace.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{dictionary.navigation.home}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/houses" className="text-sm text-muted-foreground hover:text-foreground">
                  {dictionary.navigation.houses}
                </Link>
              </li>
              <li>
                <Link href="/post-house" className="text-sm text-muted-foreground hover:text-foreground">
                  {dictionary.navigation.postHouse}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground">
                  {dictionary.navigation.search}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">{dictionary.navigation.about}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  {dictionary.navigation.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  {dictionary.navigation.contact}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">Bole, Addis Ababa, Ethiopia</li>
              <li className="text-sm text-muted-foreground">+251 91 234 5678</li>
              <li className="text-sm text-muted-foreground">info@beteth.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} BetEth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

