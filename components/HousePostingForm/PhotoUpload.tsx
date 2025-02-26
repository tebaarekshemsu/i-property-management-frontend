"use client"

import type React from "react"
import { useHousePosting } from "@/contexts/HousePostingContext"
import { useState } from "react"

export function PhotoUpload() {
  const { formData, updateFormData } = useHousePosting()
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + formData.photos.length > 7) {
      alert("You can upload a maximum of 7 photos")
      return
    }
    updateFormData({ photos: [...formData.photos, ...files] })

    // Generate preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls([...previewUrls, ...newPreviewUrls])
  }

  const removePhoto = (index: number) => {
    const newPhotos = [...formData.photos]
    newPhotos.splice(index, 1)
    updateFormData({ photos: newPhotos })

    const newPreviewUrls = [...previewUrls]
    URL.revokeObjectURL(newPreviewUrls[index])
    newPreviewUrls.splice(index, 1)
    setPreviewUrls(newPreviewUrls)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Photo Upload</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Photos (4-7 photos)</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => removePhoto(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

