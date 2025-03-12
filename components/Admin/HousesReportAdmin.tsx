"use client"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"

interface House {
  id: string
  name: string
  location: string
  price: number
  category: "rent" | "sell"
  visitDate: string
  needsReport: boolean
}

export function HousesReportAdmin() {
//   const { t } = useLanguage()
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch houses that need reports from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/admin/houses-report', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: House[] = [
          {
            id: "1",
            name: "Modern Apartment",
            location: "City Center",
            price: 250000,
            category: "sell",
            visitDate: "2023-06-15",
            needsReport: true,
          },
          {
            id: "2",
            name: "Cozy Cottage",
            location: "Suburbs",
            price: 1500,
            category: "rent",
            visitDate: "2023-06-18",
            needsReport: true,
          },
          {
            id: "3",
            name: "Luxury Villa",
            location: "Beachfront",
            price: 500000,
            category: "sell",
            visitDate: "2023-06-20",
            needsReport: true,
          },
        ]

        setHouses(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching houses report:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{("housesNeedingReports")}</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">{("house")}</th>
              <th className="py-3 px-4 text-left">{("location")}</th>
              <th className="py-3 px-4 text-left">{("price")}</th>
              <th className="py-3 px-4 text-left">{("category")}</th>
              <th className="py-3 px-4 text-left">{("visitDate")}</th>
              <th className="py-3 px-4 text-left">{("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => (
              <tr key={house.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{house.name}</td>
                <td className="py-3 px-4">{house.location}</td>
                <td className="py-3 px-4">
                  ${house.price.toLocaleString()}
                  {house.category === "rent" && "/month"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      house.category === "rent" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"
                    }`}
                  >
                    {house.category}
                  </span>
                </td>
                <td className="py-3 px-4">{house.visitDate}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/report/success/${house.id}`}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      {("successReport")}
                    </Link>
                    <Link
                      href={`/admin/report/failure/${house.id}`}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      {("failureReport")}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

