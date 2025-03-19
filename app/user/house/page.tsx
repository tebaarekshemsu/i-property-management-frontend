"use client"

import { useState } from "react"
import { SearchBar } from "@/components/Listing/SearchBar"
import { FilterSection } from "@/components/Listing/FilterSection"
import { HouseCard } from "@/components/Listing/HouseCard"
import { Pagination } from "@/components/Listing/Pagination"

const houses = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `House ${i + 1}`,
  price: Math.floor(Math.random() * 500000) + 100000,
  description: "A beautiful house with modern amenities.",
  imageUrl:
    "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  type: Math.random() > 0.5 ? "rent" : ("sell" as "rent" | "sell"),
  bedrooms: Math.floor(Math.random() * 5) + 1,
  bathrooms: Math.floor(Math.random() * 3) + 1,
  location: "City Center",
}))

export default function HouseListingPage() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const housesPerPage = 9

  // State for filtering by type; default is "rent"
  const [filterType, setFilterType] = useState<"rent" | "sell">("rent")

  // Filter houses based on the filterType
  const filteredHouses = houses.filter((house) => house.type === filterType)

  // Calculate pagination after filtering
  const totalPages = Math.ceil(filteredHouses.length / housesPerPage)
  const indexOfLastHouse = currentPage * housesPerPage
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage
  const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse)

  // Handle filter type change and reset pagination to page 1
  const handleFilterChange = (type: "rent" | "sell") => {
    setFilterType(type)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky header containing title and search bar */}
      <header className="sticky top-0 z-20 bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">House Listings</h1>
            <SearchBar />
          {/* Filter buttons for Rent and Sell */}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleFilterChange("rent")}
              className={`px-4 py-2 rounded ${
                filterType === "rent"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => handleFilterChange("sell")}
              className={`px-4 py-2 rounded ${
                filterType === "sell"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Sell
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <div className="md:w-1/4">
            <div className="md:sticky md:top-[1rem] md:h-[calc(100vh-16rem)] overflow-y-auto">
              <FilterSection />
            </div>
          </div>
          {/* House Listings */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentHouses.map((house) => (
                <HouseCard key={house.id} {...house} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
