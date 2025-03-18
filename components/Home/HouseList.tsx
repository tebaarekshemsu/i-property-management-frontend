"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HouseCard } from "../reusable/HouseCard";
import Paths from "@/path";

export function HouseList() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/vip-houses"); // Update with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        setHouses(data.featured_houses);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    }

    fetchHouses();
  }, []);

  return (
    <>
      <div className="py-12 text-center">
        <h2 className="text-3xl font-semibold mb-8">About Us</h2>
        <p className="text-xl mb-8">
          We are dedicated to helping you find the perfect home for rent or
          purchase.
        </p>
        <Link href={Paths.userHouseListPath()}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Contact us
          </button>
        </Link>
      </div>
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {houses.map((house) => (
              <HouseCard key={house.id} {...house} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
