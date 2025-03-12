"use client"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"

interface PostRequest {
  id: string
  houseName: string
  ownerName: string
  ownerPhone: string
  location: string
  price: number
  category: "rent" | "sell"
  submissionDate: string
  photos: string[]
  status: "pending" | "approved" | "rejected"
}

export function PostRequestsAdmin() {
//   const { t } = useLanguage()
  const [requests, setRequests] = useState<PostRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<PostRequest | null>(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [showPhotos, setShowPhotos] = useState(false)

  useEffect(() => {
    // Fetch post requests from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/admin/post-requests', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: PostRequest[] = [
          {
            id: "1",
            houseName: "Modern Apartment",
            ownerName: "John Doe",
            ownerPhone: "+1234567890",
            location: "City Center",
            price: 250000,
            category: "sell",
            submissionDate: "2023-06-15",
            photos: [
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
            ],
            status: "pending",
          },
          {
            id: "2",
            houseName: "Cozy Cottage",
            ownerName: "Jane Smith",
            ownerPhone: "+0987654321",
            location: "Suburbs",
            price: 1500,
            category: "rent",
            submissionDate: "2023-06-18",
            photos: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
            status: "approved",
          },
          {
            id: "3",
            houseName: "Luxury Villa",
            ownerName: "Robert Johnson",
            ownerPhone: "+1122334455",
            location: "Beachfront",
            price: 500000,
            category: "sell",
            submissionDate: "2023-06-20",
            photos: [
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
              "/placeholder.svg?height=400&width=600",
            ],
            status: "rejected",
          },
        ]

        setRequests(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching post requests:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleApprove = (request: PostRequest) => {
    setSelectedRequest(request)
    setShowApproveModal(true)
  }

  const handleReject = (request: PostRequest) => {
    setSelectedRequest(request)
    setShowRejectModal(true)
  }

  const handleViewPhotos = (request: PostRequest) => {
    setSelectedRequest(request)
    setShowPhotos(true)
  }

  const submitApproval = async () => {
    if (!selectedRequest) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/admin/post-requests/${selectedRequest.id}/approve`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     approved: true
      //   })
      // });

      // Update local state
      setRequests(
        requests.map((request) => (request.id === selectedRequest.id ? { ...request, status: "approved" } : request)),
      )

      setShowApproveModal(false)
      setSelectedRequest(null)
    } catch (error) {
      console.error("Error approving post request:", error)
    }
  }

  const submitRejection = async () => {
    if (!selectedRequest || !rejectReason) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/admin/post-requests/${selectedRequest.id}/approve`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     approved: false,
      //     reason: rejectReason
      //   })
      // });

      // Update local state
      setRequests(
        requests.map((request) => (request.id === selectedRequest.id ? { ...request, status: "rejected" } : request)),
      )

      setShowRejectModal(false)
      setSelectedRequest(null)
      setRejectReason("")
    } catch (error) {
      console.error("Error rejecting post request:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{("postRequests")}</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">{("house")}</th>
              <th className="py-3 px-4 text-left">{("owner")}</th>
              <th className="py-3 px-4 text-left">{("location")}</th>
              <th className="py-3 px-4 text-left">{("price")}</th>
              <th className="py-3 px-4 text-left">{("category")}</th>
              <th className="py-3 px-4 text-left">{("submissionDate")}</th>
              <th className="py-3 px-4 text-left">{("status")}</th>
              <th className="py-3 px-4 text-left">{("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{request.houseName}</td>
                <td className="py-3 px-4">{request.ownerName}</td>
                <td className="py-3 px-4">{request.location}</td>
                <td className="py-3 px-4">
                  ${request.price.toLocaleString()}
                  {request.category === "rent" && "/month"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.category === "rent" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"
                    }`}
                  >
                    {request.category}
                  </span>
                </td>
                <td className="py-3 px-4">{request.submissionDate}</td>
                <td className="py-3 px-4">
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
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewPhotos(request)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {("viewPhotos")}
                    </button>
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(request)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          {("approve")}
                        </button>
                        <button
                          onClick={() => handleReject(request)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          {("reject")}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("approvePost")}</h2>
            <p className="mb-4">
              {("approvePostDescription")} <strong>{selectedRequest.houseName}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowApproveModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button onClick={submitApproval} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                {("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("rejectPost")}</h2>
            <p className="mb-4">
              {("rejectPostDescription")} <strong>{selectedRequest.houseName}</strong>?
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{("rejectReason")}</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button
                onClick={submitRejection}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={!rejectReason}
              >
                {("confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photos Modal */}
      {showPhotos && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {("housePhotos")}: {selectedRequest.houseName}
              </h2>
              <button onClick={() => setShowPhotos(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedRequest.photos.map((photo, index) => (
                <div key={index} className="relative h-48">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`House photo ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowPhotos(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                {("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

