"use client"

import { useState, useEffect } from "react"

interface VisitRequest {
  id: string
  houseName: string
  visitorName: string
  date: string
  status: "pending" | "approved" | "rejected"
}

export function VisitRequests() {
  const [requests, setRequests] = useState<VisitRequest[]>([])

  useEffect(() => {
    // Fetch visit requests from your API
    // This is a mock implementation
    const mockRequests: VisitRequest[] = [
      { id: "1", houseName: "Modern Apartment", visitorName: "Alice Johnson", date: "2023-06-15", status: "pending" },
      { id: "2", houseName: "Cozy Cottage", visitorName: "Bob Smith", date: "2023-06-18", status: "approved" },
      { id: "3", houseName: "Luxury Villa", visitorName: "Charlie Brown", date: "2023-06-20", status: "rejected" },
    ]
    setRequests(mockRequests)
  }, [])

  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    // Update the status in your backend
    // This is a mock implementation
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: newStatus } : request)))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Visit Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">House</th>
              <th className="py-3 px-6 text-left">Visitor</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{request.houseName}</td>
                <td className="py-3 px-6 text-left">{request.visitorName}</td>
                <td className="py-3 px-6 text-left">{request.date}</td>
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
                <td className="py-3 px-6 text-left">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request.id, "approved")}
                        className="text-green-500 hover:underline mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, "rejected")}
                        className="text-red-500 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

