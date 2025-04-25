"use client";

import { useState, useEffect } from "react";

interface House {
  house_id: string;
  name: string;
  price: number;
  status: "active" | "pending" | "sold";
}

export function PostedHouses() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostedHouses = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          setError("User is not authenticated.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/user/posted", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.detail || "Failed to fetch houses.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setHouses(data);
      } catch (err) {
        setError("An error occurred while fetching houses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostedHouses();
  }, []);

  if (loading) {
    return <p>Loading posted houses...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Posted Houses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">House Id</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {houses.map((house) => (
              <tr
                key={house.house_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {house.house_id}
                </td>
                <td className="py-3 px-6 text-left">
                  ${house.price.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      house.status === "active"
                        ? "bg-green-200 text-green-800"
                        : house.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {house.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="ml-2 text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
