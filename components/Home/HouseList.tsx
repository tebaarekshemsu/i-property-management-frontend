"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HouseCard } from "../reusable/HouseCard";
import { ShimmerCard } from "../reusable/ShimmerCard";
import Paths from "@/lib/path";

export function HouseList() {
<<<<<<< HEAD
  const [houses, setHouses] = useState<any[]>([]);
  let placeholder = [{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },
  {
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  }];
=======
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
>>>>>>> 6a59f0ca2ba0a4d3980b2e16bc7878061c76d9fe

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
        setHouses(placeholder)
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
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
