"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
// import { useLanguage } from "@/contexts/LanguageContext"

interface House {
  id: string
  name: string
  location: string
  price: number
  category: "rent" | "sell"
}

export function FailureReportForm({ houseId }: { houseId: string }) {
//   const { t } = useLanguage()
  const router = useRouter()
  const [house, setHouse] = useState<House | null>(null)
  const [loading, setLoading] = useState(true)
  const [reason, setReason] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Fetch house details from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/admin/houses/${houseId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: House = {
          id: houseId,
          name: "Modern Apartment",
          location: "City Center",
          price: 250000,
          category: "sell",
        }

        setHouse(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching house details:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [houseId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!house || !reason) return

    setSubmitting(true)

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/admin/report/failure/${houseId}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ reason })
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to admin dashboard
      router.push("/admin/houses-report")
    } catch (error) {
      console.error("Error submitting failure report:", error)
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  if (!house) {
    return <div className="text-center py-10">{("houseNotFound")}</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{("failureReport")}</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{("houseDetails")}</h2>
          <p>
            <strong>{("name")}:</strong> {house.name}
          </p>
          <p>
            <strong>{("location")}:</strong> {house.location}
          </p>
          <p>
            <strong>{("listedPrice")}:</strong> ${house.price.toLocaleString()}
          </p>
          <p>
            <strong>{("category")}:</strong> {house.category}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("failureReason")}</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
              rows={5}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={submitting}
            >
              {("cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              disabled={submitting || !reason}
            >
              {submitting ? `${("submitting")}...` : ("submitReport")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

