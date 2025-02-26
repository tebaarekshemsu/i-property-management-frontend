"use client"

import { useState, useEffect } from "react"

interface House {
  id: string
  name: string
  price: number
  status: "active" | "pending" | "sold"
}

export function PostedHouses() {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    // Fetch posted houses from your API
    // This is a mock implementation
    const mockHouses: House[] = [
      { id: "1", name: "Modern Apartment", price: 250000, status: "active" },
      { id: "2", name: "Cozy Cottage", price: 180000, status: "pending" },
      { id: "3", name: "Luxury Villa", price: 500000, status: "sold" },
    ]
    setHouses(mockHouses)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Posted Houses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {houses.map((house) => (
              <tr key={house.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{house.name}</td>
                <td className="py-3 px-6 text-left">${house.price.toLocaleString()}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      house.status === "active"
                        ? "bg-green-200 text-green-800"
                        : house.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                    }`}
                  >
                    {house.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="ml-2 text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

