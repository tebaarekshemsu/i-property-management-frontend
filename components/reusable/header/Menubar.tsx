"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

const MenubarContext = createContext<{
  activeMenu: string | null
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>
}>({
  activeMenu: null,
  setActiveMenu: () => {},
})

export function Menubar({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div className="flex space-x-4">{children}</div>
    </MenubarContext.Provider>
  )
}

export function MenubarMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

export function MenubarTrigger({ children }: { children: React.ReactNode }) {
  const { activeMenu, setActiveMenu } = useContext(MenubarContext)
  const isActive = activeMenu === children?.toString()

  return (
    <button
      className={`px-3 py-2 rounded-md ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}
      onClick={() => setActiveMenu(isActive ? null : children?.toString() || '')}
    >
      {children}
    </button>
  )
}

export function MenubarContent({ children }: { children: React.ReactNode }) {
  const { activeMenu } = useContext(MenubarContext)

  if (!activeMenu) return null

  return (
    <div className="absolute top-full left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">{children}</div>
    </div>
  )
}

export function MenubarItem({ children, disabled = false }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <a
      href="#"
      className={`block px-4 py-2 text-sm ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </a>
  )
}

export function MenubarSeparator() {
  return <hr className="my-1" />
}

export function MenubarCheckboxItem({ children, checked = false }: { children: React.ReactNode; checked?: boolean }) {
  return (
    <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" checked={checked} readOnly />
      <span className="ml-2">{children}</span>
    </label>
  )
}

export function MenubarRadioGroup({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function MenubarRadioItem({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
      <input type="radio" className="form-radio h-4 w-4 text-blue-600" value={value} name="radio-group" />
      <span className="ml-2">{children}</span>
    </label>
  )
}

