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

interface SuccessReportData {
  buyerName: string
  buyerPhone: string
  finalPrice: number
  commission: number
  transactionDate: string
  notes: string
  transactionPhoto: File | null
}

export function SuccessReportForm({ houseId }: { houseId: string }) {
//   const { t } = useLanguage()
  const router = useRouter()
  const [house, setHouse] = useState<House | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<SuccessReportData>({
    buyerName: "",
    buyerPhone: "",
    finalPrice: 0,
    commission: 0,
    transactionDate: "",
    notes: "",
    transactionPhoto: null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
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
        setFormData((prev) => ({
          ...prev,
          finalPrice: data.price,
        }))
        setLoading(false)
      } catch (error) {
        console.error("Error fetching house details:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [houseId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "finalPrice" || name === "commission" ? Number.parseFloat(value) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({
        ...prev,
        transactionPhoto: file,
      }))

      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!house) return

    setSubmitting(true)

    try {
      // In a real app, you would send data to your API
      // const formDataToSend = new FormData()
      // Object.entries(formData).forEach(([key, value]) => {
      //   formDataToSend.append(key, value)
      // })

      // await fetch(`/api/admin/report/success/${houseId}`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: formDataToSend
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to admin dashboard
      router.push("/admin/houses-report")
    } catch (error) {
      console.error("Error submitting success report:", error)
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
      <h1 className="text-3xl font-bold mb-8">{("successReport")}</h1>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">{("buyerName")}</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("buyerPhone")}</label>
            <input
              type="tel"
              name="buyerPhone"
              value={formData.buyerPhone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("finalPrice")}</label>
            <input
              type="number"
              name="finalPrice"
              value={formData.finalPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("commission")}</label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("transactionDate")}</label>
            <input
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("transactionPhoto")}</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
            {photoPreview && (
              <div className="mt-2">
                <img
                  src={photoPreview || "/placeholder.svg"}
                  alt="Transaction Preview"
                  className="h-40 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{("notes")}</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
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
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? `${("submitting")}...` : ("submitReport")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

