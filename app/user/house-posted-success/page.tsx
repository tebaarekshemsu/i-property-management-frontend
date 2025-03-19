"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createHouse } from "@/actions/user/house-action"

export default function PostHouseForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await createHouse(formData)
      // The server action will handle the redirect
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input id="title" name="title" placeholder="e.g., Luxury Villa in Bole" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select name="propertyType" defaultValue="house">
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your property in detail..."
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="listingType">Listing Type</Label>
            <Select name="listingType" defaultValue="sale">
              <SelectTrigger id="listingType">
                <SelectValue placeholder="Select listing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (ETB)</Label>
            <Input id="price" name="price" type="number" placeholder="e.g., 2500000" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="e.g., Bole, Addis Ababa" required />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Property Details</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" name="bedrooms" type="number" min="0" placeholder="e.g., 3" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" name="bathrooms" type="number" min="0" step="0.5" placeholder="e.g., 2" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area (sqm)</Label>
            <Input id="area" name="area" type="number" min="0" placeholder="e.g., 150" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amenities">Amenities (comma-separated)</Label>
          <Input
            id="amenities"
            name="amenities"
            placeholder="e.g., Swimming Pool, Garden, Security, Parking"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input id="contactName" name="contactName" placeholder="Your full name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input id="contactPhone" name="contactPhone" placeholder="e.g., +251 91 234 5678" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" name="contactEmail" type="email" placeholder="your.email@example.com" required />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Property Listing"}
      </Button>
    </form>
  )
}

