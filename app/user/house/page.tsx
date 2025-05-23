"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterSection } from "@/components/Listing/FilterSection";
import { HouseCard } from "@/components/Listing/HouseCard";
import { ShimmerCard } from "@/components/Listing/ShimmerCard";
import { Pagination } from "@/components/Listing/Pagination";
import { api } from "@/config/api";
import { API_ENDPOINTS } from "@/config/api";

interface House {
  house_id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: "rent" | "sell";
  bedrooms: number;
  bathrooms: number;
  location: string;
}

interface ApiHouse {
  house_id: number;
  name?: string;
  address?: string;
  price: number;
  description: string;
  image_urls?: string[];
  category: string;
  bedroom: number;
  bathroom: number;
  location: string;
}

export default function HouseListingPage() {
  const searchParams = useSearchParams();
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 9;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const response = await api.get(`/user/house-list?${params.toString()}`);
      
      // Handle both array and object responses
      const housesData = Array.isArray(response.data) ? response.data : (response.data?.houses || []);
      
      if (Array.isArray(housesData)) {
        // Transform the data to match our House interface
        const transformedHouses: House[] = housesData.map((house: ApiHouse) => ({
          house_id: house.house_id,
          name: house.name || house.address || "Unnamed Property",
          price: house.price,
          description: house.description,
          imageUrl: house.image_urls?.[0] || "",
          type: house.category === "rent" ? "rent" : "sell",
          bedrooms: house.bedroom || 0,
          bathrooms: house.bathroom || 0,
          location: house.location
        }));
        setHouses(transformedHouses);
        setFilteredHouses(transformedHouses);
      } else {
        console.error("Invalid response format:", response.data);
        setError("Failed to load houses");
        setHouses([]);
        setFilteredHouses([]);
      }
    } catch (error) {
      console.error("Error fetching houses:", error);
      setError("Failed to load houses. Please try again later.");
      setHouses([]);
      setFilteredHouses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [searchParams]);

  const totalPages = Math.ceil((filteredHouses?.length || 0) / housesPerPage);
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses?.slice(indexOfFirstHouse, indexOfLastHouse) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg w-[300px]" />
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterSection />
          </div>
          <div className="w-full md:w-3/4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <ShimmerCard key={index} />
                  ))
                : currentHouses.map((house: House) => (
                    <HouseCard
                      key={house.house_id}
                      house_id={house.house_id.toString()}
                      name={house.name}
                      price={house.price}
                      description={house.description}
                      imageUrl={house.imageUrl}
                      type={house.type}
                      bedrooms={house.bedrooms}
                      bathrooms={house.bathrooms}
                      location={house.location}
                    />
                  ))}
            </div>
            {!loading && !error && filteredHouses.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
