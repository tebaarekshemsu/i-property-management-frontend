import type React from "react"
import { Button } from "../button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <nav className="mt-8">{children}</nav>
      </div>
    </div>
  )
}

