"use client";

import type React from "react";
import { useState } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";

interface Admin {
  admin_id: string;
  name: string;
  phone_no: string;
  admin_type: string;
  areas: string[];
}

const AdminSearch: React.FC = () => {
  const [areaName, setAreaName] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (!areaName.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/user/admins/search?area_name=${areaName}`
      );
      setAdmins(response.data.admins);
      setIsModalOpen(true);
    } catch (err) {
      setError("Failed to fetch admins. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Search Administrators by Area
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter area name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !areaName.trim()}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                loading || !areaName.trim()
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors sm:w-auto`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-200">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Search Results
            </h3>
            {admins.length > 0 ? (
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div
                    key={admin.admin_id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {admin.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Phone: {admin.phone_no}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {admin.admin_type}
                    </p>
                    <div className="text-sm text-gray-600">
                      Areas: {admin.areas.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No administrators found for this area.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSearch;
