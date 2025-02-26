"use client"

import { useState, useEffect } from "react"

interface House {
  id: string
  name: string
  price: number
  type: "rented" | "bought"
  date: string
}

export function RentedBoughtHouses() {
  const [houses, setHouses] = useState<House[]>([])

  useEffect(() => {
    // Fetch rented/bought houses from your API
    // This is a mock implementation
    const mockHouses: House[] = [
      { id: "1", name: "City Apartment", price: 1500, type: "rented", date: "2023-01-15" },
      { id: "2", name: "Suburban House", price: 300000, type: "bought", date: "2022-11-20" },
      { id: "3", name: "Beach Condo", price: 2000, type: "rented", date: "2023-03-01" },
    ]
    setHouses(mockHouses)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Rented/Bought Houses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {houses.map((house) => (
              <tr key={house.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{house.name}</td>
                <td className="py-3 px-6 text-left">
                  ${house.type === "rented" ? `${house.price}/month` : house.price.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      house.type === "rented" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"
                    }`}
                  >
                    {house.type}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{house.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

