"use client"

import { useState } from "react"
import { MenubarDemo } from "./MenubarDemo"
import { Footer } from "./Footer"
import { PhotoGallery } from "./PhotoGallery"
import { VisitRequestForm } from "./VisitRequestForm"

// Mock data for a house
const houseData = {
  id: "1",
  name: "Beautiful Modern Apartment",
  category: "rent",
  location: "Bole",
  address: "123 Main St, Addis Ababa",
  size: 120,
  condition: "newly built",
  bedrooms: 3,
  toilets: 2,
  propertyType: "apartment",
  furnishStatus: "semi furnished",
  bathrooms: 2,
  facilities: ["Elevator", "Security", "Parking"],
  description: "A beautiful and modern apartment in the heart of Bole. Perfect for families or professionals.",
  price: 25000,
  negotiability: "open to negotiation",
  parkingSpace: true,
  photos: [
    "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
    "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
    "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
    "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  ],
}

export function HouseDetailPage() {
  const [showVisitForm, setShowVisitForm] = useState(false)

  const handleVisitRequest = (data: { name: string; phoneNumber: string; visitDate: string }) => {
    // Here you would typically send this data to your backend
    console.log("Visit request:", data)
    setShowVisitForm(false)
    // You might want to show a success message to the user here
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{houseData.name}</h1>
        <PhotoGallery photos={houseData.photos} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
            <ul className="space-y-2">
              <li>
                <strong>Category:</strong> {houseData.category}
              </li>
              <li>
                <strong>Location:</strong> {houseData.location}
              </li>
              <li>
                <strong>Address:</strong> {houseData.address}
              </li>
              <li>
                <strong>Size:</strong> {houseData.size} sqm
              </li>
              <li>
                <strong>Condition:</strong> {houseData.condition}
              </li>
              <li>
                <strong>Bedrooms:</strong> {houseData.bedrooms}
              </li>
              <li>
                <strong>Toilets:</strong> {houseData.toilets}
              </li>
              <li>
                <strong>Bathrooms:</strong> {houseData.bathrooms}
              </li>
              <li>
                <strong>Property Type:</strong> {houseData.propertyType}
              </li>
              <li>
                <strong>Furnish Status:</strong> {houseData.furnishStatus}
              </li>
              <li>
                <strong>Parking Space:</strong> {houseData.parkingSpace ? "Yes" : "No"}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
            <ul className="space-y-2">
              <li>
                <strong>Price:</strong> {houseData.price.toLocaleString()} ETB{" "}
                {houseData.category === "rent" ? "/ month" : ""}
              </li>
              <li>
                <strong>Negotiability:</strong> {houseData.negotiability}
              </li>
              <li>
                <strong>Facilities:</strong> {houseData.facilities.join(", ")}
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
            <p>{houseData.description}</p>
            <button
              onClick={() => setShowVisitForm(true)}
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Request to Visit
            </button>
          </div>
        </div>
      </main>
      {showVisitForm && <VisitRequestForm onClose={() => setShowVisitForm(false)} onSubmit={handleVisitRequest} />}
    </div>
  )
}

