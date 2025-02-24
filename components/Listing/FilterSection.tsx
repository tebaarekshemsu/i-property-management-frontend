"use client"

import { useState } from "react"

export function FilterSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
    <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 md:hidden">
    {isOpen ? "Hide Filters" : "Show Filters"}
    </button>
    <style jsx>{`
      @media (min-width: 768px) {
        .filter-section {
        position: fixed;
        top: 0;
        left: 0;
        width: 300px;
        height: 100%;
        overflow-y: auto;
        background-color: white;
        z-index: 10;
        padding: 1rem;
        }
      }
    `}</style>
      <div className={`space-y-4 ${isOpen ? "block" : "hidden md:block"}`}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="mt-1 flex space-x-2">
            <input type="number" placeholder="Min" className="w-1/2 p-2 border rounded-md" />
            <input type="number" placeholder="Max" className="w-1/2 p-2 border rounded-md" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select className="mt-1 block w-full p-2 border rounded-md">
            <option>Any</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Condo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Furnishing Status</label>
          <select className="mt-1 block w-full p-2 border rounded-md">
            <option>Any</option>
            <option>Furnished</option>
            <option>Unfurnished</option>
            <option>Partially Furnished</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input type="number" min="1" className="mt-1 block w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input type="number" min="1" className="mt-1 block w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" className="mt-1 block w-full p-2 border rounded-md" />
        </div>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">Apply Filters</button>
      </div>
    </div>
  )
}

