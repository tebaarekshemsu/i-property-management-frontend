"use client";

import { useState, useEffect } from "react";
import { useHousePosting } from "@/contexts/HousePostingContext";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import axios from "axios";

export function BasicInfo() {
  const { formData, updateFormData, nextStep, formErrors, setFormErrors } =
    useHousePosting();

  const [locations, setLocations] = useState<string[]>([]); // State to hold location data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/user/locations"
        ); // Make the API call
        setLocations(response.data.locations); // Set locations in the state
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.size || formData.size <= 0) {
      errors.size = "Size must be greater than 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Basic Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              updateFormData({ category: e.target.value as "sell" | "rent" })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          {loading ? (
            <p>Loading locations...</p>
          ) : (
            <select
              value={formData.location}
              onChange={(e) => updateFormData({ location: e.target.value })}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                formErrors.location
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-300"
              }`}
            >
              <option value="" disabled>
                Select Location
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          )}
          <FormError message={formErrors.location} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.address
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.address} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Size (sqm) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.size || ""}
            onChange={(e) => updateFormData({ size: Number(e.target.value) })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.size
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.size} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
