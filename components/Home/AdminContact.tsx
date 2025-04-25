"use client";

import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";

interface Admin {
  admin_id: string;
  name: string;
  phone_no: string;
  admin_type: string;
  areas: string[];
}

const AdminSearchLayoutUpdate: React.FC = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Fetch available locations from the backend (functionality unchanged)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/user/locations");
        setLocations(res.data.locations);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };
    fetchLocations();
  }, []);

  // Fetch admins by selected location (functionality unchanged)
  const handleSearch = async () => {
    if (!selectedLocation) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/user/admins/search?area_name=${selectedLocation}`
      );
      setAdmins(response.data.admins);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to fetch admins. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-6 max-w-xl">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Find Administrators
      </h1>

      <div className="flex items-center space-x-3 mb-6">
        <div className="relative flex-grow">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="block w-full py-2.5 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !selectedLocation}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading || !selectedLocation
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Search className="h-5 w-5 mr-2" />
          )}
          Search
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {searched && !loading && !error && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {admins.length > 0
              ? `Administrators in ${selectedLocation}`
              : `No administrators found in ${selectedLocation}`}
          </h2>

          {admins.length > 0 ? (
            <ul className="divide-y divide-gray-200 rounded-md shadow-sm bg-white">
              {admins.map((admin) => (
                <li key={admin.admin_id} className="py-4 px-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {admin.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {admin.admin_type}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Phone: {admin.phone_no}
                    </p>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-sm font-medium text-gray-700 mb-1">
                      Areas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {admin.areas.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white rounded-md shadow-sm p-4 text-gray-600">
              No administrators are assigned to this area.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSearchLayoutUpdate;
