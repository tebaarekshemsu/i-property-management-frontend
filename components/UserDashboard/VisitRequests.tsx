"use client";

import { useState, useEffect } from "react";

interface VisitRequest {
  house_id: string;
  houseName: string;
  visitorName: string;
  request_date: string;
  status: "pending" | "approved" | "rejected";
}

export function VisitRequests() {
  const [requests, setRequests] = useState<VisitRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitRequests = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          setError("User is not authenticated.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:8000/user/fetch_visit_request",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.detail || "Failed to fetch visit requests.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log(data);

        setRequests(data);
      } catch (err) {
        setError("An error occurred while fetching visit requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitRequests();
  }, []);

  if (loading) {
    return <p>Loading visit requests...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Visit Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">House Id</th>
              <th className="py-3 px-6 text-left">Visitor</th>
              <th className="py-3 px-6 text-left">Requested Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {requests.map((request) => (
              <tr
                key={request.house_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {request.house_id}
                </td>
                <td className="py-3 px-6 text-left">{request.visitorName}</td>
                <td className="py-3 px-6 text-left">{request.request_date}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : request.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
