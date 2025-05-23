"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "../../public/Logo";
import { Menubar, MenubarMenu } from "./header/Menubar";
import { Button } from "./button";
import { MobileMenu } from "./header/MobileMenu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Path from "@/lib/path";
import path from "path";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const menuItems = (
    <Menubar>
      <Link href={Path.userHouseListPath()}>
        <MenubarMenu>House</MenubarMenu>
      </Link>
      <Link href="#contact">
        <MenubarMenu>Contact</MenubarMenu>
      </Link>
      <Link href={Path.authPath()}>
        <MenubarMenu>Login/Signup</MenubarMenu>
      </Link>
      <Link href="/user/dashboard">
        <MenubarMenu>Profiles</MenubarMenu>
      </Link>
      <MenubarMenu>
        <LanguageSwitcher />
      </MenubarMenu>
    </Menubar>
  );

  const mobileMenuItems = (
    <div className="flex flex-col space-y-4">
      <Link href={Path.userHouseListPath()}>
        <Button variant="ghost">House</Button>
      </Link>
      <Link href="/house">
        <Button variant="ghost">Contact</Button>
      </Link>
      <Link href={Path.authPath()}>
        <Button variant="ghost">Login/Signup</Button>
      </Link>
      <Link href="/user/dashboard">
        <Button variant="ghost">Profiles</Button>
      </Link>
      <LanguageSwitcher />
    </div>
  );

  return (
    <>
      <div
        className="flex justify-between items-center px-4 py-2 bg-white shadow-md fixed top-0 left-0 w-full z-50"
        style={{ height: "64px" }}
      >
        <div className="flex items-center">
          <Link href="/user">
            <Logo />
          </Link>
        </div>
        <div className="max-[799px]:hidden">{menuItems}</div>
        <div className="min-[800px]:hidden">
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(true)}>
            Menu
          </Button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        {mobileMenuItems}
      </MobileMenu>
      <div style={{ marginTop: "64px" }}>
        {/* Your other content goes here */}
      </div>
    </>
  );
}
