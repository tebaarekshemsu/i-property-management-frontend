"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("min_price") || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("max_price") || ""
  );
  const [houseType, setHouseType] = useState<string>(
    searchParams.get("house_type") || ""
  );
  const [furnishingStatus, setFurnishingStatus] = useState<string>(
    searchParams.get("furnishing_status") || ""
  );
  const [bedrooms, setBedrooms] = useState<string>(
    searchParams.get("bedrooms") || ""
  );
  const [bathrooms, setBathrooms] = useState<string>(
    searchParams.get("bathrooms") || ""
  );
  const [location, setLocation] = useState<string>(
    searchParams.get("location") || ""
  );

  // State for Rent or Sell filter
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || ""
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    if (houseType && houseType !== "Any") params.set("house_type", houseType);
    if (furnishingStatus && furnishingStatus !== "Any")
      params.set("furnishing_status", furnishingStatus);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (location) params.set("location", location);
    if (category) params.set("category", category); // Send category to backend

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-4 md:mr-4">
      {" "}
      {/* Added md:mr-4 for right margin on medium and larger screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 md:hidden transition-all duration-300"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>
      <div
        className={`space-y-4 ${
          isOpen ? "block" : "hidden md:block"
        } md:fixed md:top-0 md:left-0 md:w-[300px] md:h-full md:overflow-y-auto md:bg-white md:z-10 md:p-4 md:border-r`}
      >
        <div className="mt-20">
          <label className="block text-sm font-medium text-gray-700">
            Rent or Sell
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="rent"
                checked={category === "rent"}
                onChange={() => setCategory("rent")}
                className="mr-2"
              />
              Rent
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="sell"
                checked={category === "sell"}
                onChange={() => setCategory("sell")}
                className="mr-2"
              />
              Sell
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            House Type
          </label>
          <select
            className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Furnishing Status
          </label>
          <select
            className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={furnishingStatus}
            onChange={(e) => setFurnishingStatus(e.target.value)}
          >
            <option value="">Any</option>
            <option value="Furnished">Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bedrooms
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bathrooms
          </label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          onClick={applyFilters}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
