"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation" // Import redirect function [^1]

// Define the house data type
export type HouseFormData = {
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  propertyType: string
  listingType: "sale" | "rent"
  images: string[]
  amenities: string[]
  contactName: string
  contactEmail: string
  contactPhone: string
}

// Mock database for demonstration purposes
const houses: HouseFormData[] = []

export async function createHouse(formData: FormData) {
  // Simulate server processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    // Extract form data
    const houseData: Partial<HouseFormData> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      location: formData.get("location") as string,
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      area: Number(formData.get("area")),
      propertyType: formData.get("propertyType") as string,
      listingType: formData.get("listingType") as "sale" | "rent",
      // For simplicity, we're using placeholder images
      images: ["/placeholder.svg?height=400&width=600"],
      // Parse amenities from a comma-separated string
      amenities: (formData.get("amenities") as string)?.split(",").map((a) => a.trim()) || [],
      contactName: formData.get("contactName") as string,
      contactEmail: formData.get("contactEmail") as string,
      contactPhone: formData.get("contactPhone") as string,
    }

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "price",
      "location",
      "bedrooms",
      "bathrooms",
      "area",
      "propertyType",
      "listingType",
      "contactName",
      "contactEmail",
      "contactPhone",
    ]

    for (const field of requiredFields) {
      if (!houseData[field as keyof typeof houseData]) {
        return { success: false, message: `${field} is required` }
      }
    }

    // Add the house to our mock database
    houses.push(houseData as HouseFormData)
    console.log("New house added:", houseData)

    // Revalidate the admin page to show the new house
    revalidatePath("/admin")
    revalidatePath("/admin/properties")

    // Redirect to success page
    redirect("/house-posted-success")
  } catch (error) {
    console.error("Error creating house:", error)
    return { success: false, message: "Failed to create house listing" }
  }
}

// Function to get all houses (for demonstration)
export async function getHouses() {
  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return houses
}

