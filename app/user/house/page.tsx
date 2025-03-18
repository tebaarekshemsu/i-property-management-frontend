"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSection } from "@/components/Listing/FilterSection";
import { HouseCard } from "@/components/Listing/HouseCard";
import { Pagination } from "@/components/Listing/Pagination";

export default function HouseListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 9;

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("http://127.0.0.1:8000/user/house-list");
      const data = await response.json();
      setHouses(data.houses);
      setFilteredHouses(data.houses); // Set initial filtered houses
    };

    fetchHouses();
  }, []);

  useEffect(() => {
    // Extract filter parameters from the URL
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    const houseType = searchParams.get("house_type");
    const furnishingStatus = searchParams.get("furnishing_status");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const location = searchParams.get("location");

    // Apply filters based on URL parameters
    let newFilteredHouses = houses;

    if (minPrice)
      newFilteredHouses = newFilteredHouses.filter(
        (house) => house.price >= Number(minPrice)
      );
    if (maxPrice)
      newFilteredHouses = newFilteredHouses.filter(
        (house) => house.price <= Number(maxPrice)
      );
    if (houseType)
      newFilteredHouses = newFilteredHouses.filter(
        (house) => house.category === houseType
      );
    if (furnishingStatus)
      newFilteredHouses = newFilteredHouses.filter(
        (house) => house.furnish_status === furnishingStatus
      );
    if (bedrooms)
      newFilteredHouses = newFilteredHouses.filter(
        (house) => house.bedroom === Number(bedrooms)
      );
    if (bathrooms)
      newFilteredHouses = newFilteredHouses.filter(
        (house) => house.bathroom === Number(bathrooms)
      );
    if (location)
      newFilteredHouses = newFilteredHouses.filter((house) =>
        house.location.includes(location)
      );

    setFilteredHouses(newFilteredHouses);
    setCurrentPage(1); // Reset to page 1 when filtering
  }, [searchParams, houses]);

  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses.slice(
    indexOfFirstHouse,
    indexOfLastHouse
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">House Listings</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterSection />
          </div>
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
  );
}
