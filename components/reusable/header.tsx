"use client"; // Ensure this runs on the client side in Next.js (for App Router)

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow fixed
w-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
          href="/"
        >
          DevMeetup
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-4 items-center">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-2 pb-4">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}

// Extracted NavLinks Component for Reusability
function NavLinks() {
  return (
    <>
      <Link className="nav-link" href="/">Home</Link>
      <Link className="nav-link" href="/v1">V1</Link>
      <Link className="nav-link" href="/v2">V2</Link>
      <Link className="nav-link" href="/about-us">About Us</Link>
      <Link className="nav-link" href="/contact-us">Contact Us</Link>
      <Link className="nav-link" href="/sponsor-us">Sponsor Us</Link>
      <Link className="nav-link" href="/help-us">Help Us</Link>
    </>
  );
}
