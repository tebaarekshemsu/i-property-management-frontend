"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import Paths from "@/lib/path";

export default function UserNavbar() {
  const { dictionary } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: dictionary.navigation.home, href: "/" },
    { name: dictionary.navigation.houses, href: "/houses" },
    { name: dictionary.navigation.postHouse, href: "/post-house" },
    { name: dictionary.navigation.about, href: "/about" },
    { name: dictionary.navigation.contact, href: "/contact" },
  ];

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">BetEth</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild size="sm" variant="outline">
              <Link href={Paths.authPath()}>{dictionary.navigation.login}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={Paths.authPath()}>
                {dictionary.navigation.signup}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center px-3">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full mb-2"
                >
                  <Link href={Paths.authPath()}>
                    {dictionary.navigation.login}
                  </Link>
                </Button>
              </div>
              <div className="flex items-center px-3">
                <Button asChild size="sm" className="w-full">
                  <Link href={Paths.authPath()}>
                    {dictionary.navigation.signup}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
