"use client"

import { useHousePosting } from "@/contexts/HousePostingContext"

export function BasicInfo() {
  const { formData, updateFormData } = useHousePosting()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value as "sell" | "rent" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => updateFormData({ location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Size (sqm)</label>
        <input
          type="number"
          value={formData.size}
          onChange={(e) => updateFormData({ size: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  )
}

