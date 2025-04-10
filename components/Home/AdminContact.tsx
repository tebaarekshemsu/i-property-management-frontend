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

const AdminSearch: React.FC = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Fetch available locations from the backend
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

  // Fetch admins by selected location
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
    } catch (err) {
      setError("Failed to fetch admins. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Search Administrators by Area</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !selectedLocation}
          className={`px-4 py-2 rounded-md text-white font-medium flex items-center justify-center gap-2 ${
            loading || !selectedLocation
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors sm:w-auto min-w-[100px]`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-200">
          {error}
        </div>
      )}

      {/* Results Section */}
      {searched && !loading && !error && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            {admins.length > 0
              ? `Administrators in ${selectedLocation}`
              : `No administrators found in ${selectedLocation}`}
          </h2>

          {admins.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {admins.map((admin) => (
                <div key={admin.admin_id} className="py-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {admin.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {admin.admin_type}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                      Phone: {admin.phone_no}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Areas:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {admin.areas.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-4">
              No administrators are assigned to this area.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminSearch;
