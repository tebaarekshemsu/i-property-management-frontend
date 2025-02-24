"use client"

import { useState, useEffect } from "react"
import { Logo } from "../../public/Logo"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "./header/Menubar"
import { Button } from "./button"
import { MobileMenu } from "./header/MobileMenu"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const menuItems = (
    <Menubar>
      <MenubarMenu>
      File
      </MenubarMenu>
      <MenubarMenu>
        Edit
      </MenubarMenu>
      <MenubarMenu>
        View
      </MenubarMenu>
      <MenubarMenu>
        Profiles
      </MenubarMenu>
    </Menubar>
  )

  const mobileMenuItems = (
    <div className="flex flex-col space-y-4">
      <Button variant="ghost">File</Button>
      <Button variant="ghost">Edit</Button>
      <Button variant="ghost">View</Button>
      <Button variant="ghost">Profiles</Button>
    </div>
  )

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md fixed top-0 left-0 w-full z-50" style={{ height: '64px' }}>
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="max-[799px]:hidden">{menuItems}</div>
        <div className="min-[800px]:hidden">
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(true)}>
            Menu
          </Button>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        {mobileMenuItems}
      </MobileMenu>
      <div style={{ marginTop: '64px' }}>
        {/* Your other content goes here */}
      </div>
    </>
  )
}

