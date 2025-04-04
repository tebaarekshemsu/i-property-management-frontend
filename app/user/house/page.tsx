"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSection } from "@/components/Listing/FilterSection";
import { HouseCard } from "@/components/Listing/HouseCard";
interface House {
  house_id: number;
  price: number;
  category: string;
  furnish_status: string;
  bedroom: number;
  bathroom: number;
  location: string;
}
import { ShimmerCard } from "@/components/Listing/ShimmerCard"; // Import ShimmerCard
import { Pagination } from "@/components/Listing/Pagination";

export default function HouseListingPage() {
  // Removed unused variable 'router'
  const searchParams = useSearchParams();
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 9;
  const [loading, setLoading] = useState(true);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const response = await fetch(
        `http://127.0.0.1:8000/user/house-list?${params.toString()}`
      );
      const data = await response.json();
      setHouses(data.houses);
      setFilteredHouses(data.houses);
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [searchParams]);

  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses.slice(
    indexOfFirstHouse,
    indexOfLastHouse
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg w-[300px] "></header>
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterSection />
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <ShimmerCard key={index} />
                      ))
                    : currentHouses.map((house: House) => (
                        <HouseCard
                          key={house.house_id}
                          {...house}
                        />
                      ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
