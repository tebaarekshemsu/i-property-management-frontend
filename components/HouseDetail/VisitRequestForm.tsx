import type React from "react";
import { useState } from "react";

interface VisitRequestFormProps {
  onClose: () => void;
  houseId: number; // Pass the house ID as a prop
}

export function VisitRequestForm({ onClose, houseId }: VisitRequestFormProps) {
  const [visitDate, setVisitDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const requestData = {
      house_id: houseId,
      request_date: visitDate,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage or another storage mechanism

      const response = await fetch(
        "http://127.0.0.1:8000/user/visite-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        onClose(); // Close the form on success
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.detail || "An error occurred");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Request a Visit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="visitDate"
              className="block text-sm font-medium text-gray-700"
            >
              Preferred Visit Date
            </label>
            <input
              type="date"
              id="visitDate"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
