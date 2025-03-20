"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HouseCard } from "../reusable/HouseCard";
import { ShimmerCard } from "../reusable/ShimmerCard";
import Paths from "@/lib/path";

export function HouseList() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/vip-houses");
        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        setHouses(data.featured_houses);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHouses();
  }, []);

  return (
    <>
      <div className="py-12 text-center">
        <h2 className="text-3xl font-semibold mb-8">About Us</h2>
        <p className="text-xl mb-8 mx-32">
          We are a dedicated team of professionals committed to revolutionizing
          the real estate market. Our platform offers a user-friendly interface
          that enables individuals to browse property listings, request visits,
          and manage their accounts effortlessly. We understand the complexities
          of property transactions, which is why we&#39;ve designed our system
          to reduce manual intervention and enhance efficiency.
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
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ShimmerCard key={index} />
                ))
              : houses.map((house) => <HouseCard key={house.id} {...house} />)}
          </div>
        </div>
      </div>
    </>
  );
}
