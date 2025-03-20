"use client"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import { isContext } from "node:vm"

interface VisitRequest {
  id: string
  houseName: string
  houseId: string
  visitorName: string
  visitorPhone: string
  ownerName: string
  ownerPhone: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
}
export function VisitRequestsAdmin() {
//   const { t } = useLanguage()
  const [requests, setRequests] = useState<VisitRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<VisitRequest | null>(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [visitDate, setVisitDate] = useState("")
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => {
    // Fetch visit requests from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/admin/visit', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: VisitRequest[] = [
          {
            id: "1",
            houseName: "Modern Apartment",
            houseId: "101",
            visitorName: "Alice Johnson",
            visitorPhone: "+1234567890",
            ownerName: "Bob Smith",
            ownerPhone: "+0987654321",
            requestDate: "2023-06-15",
            status: "pending",
          },
          {
            id: "2",
            houseName: "Cozy Cottage",
            houseId: "102",
            visitorName: "Charlie Brown",
            visitorPhone: "+1122334455",
            ownerName: "Diana Prince",
            ownerPhone: "+5566778899",
            requestDate: "2023-06-18",
            status: "approved",
          },
          {
            id: "3",
            houseName: "Luxury Villa",
            houseId: "103",
            visitorName: "Eve Wilson",
            visitorPhone: "+9988776655",
            ownerName: "Frank Miller",
            ownerPhone: "+1122334455",
            requestDate: "2023-06-20",
            status: "rejected",
          },
        ]

        setRequests(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching visit requests:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleApprove = (request: VisitRequest) => {
    setSelectedRequest(request)
    setShowApproveModal(true)
  }

  const handleReject = (request: VisitRequest) => {
    setSelectedRequest(request)
    setShowRejectModal(true)
  }

  const submitApproval = async () => {
    if (!selectedRequest || !visitDate) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/admin/visit/${selectedRequest.id}/approve`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     approved: true,
      //     visitDate
      //   })
      // });

      // Update local state
      setRequests(
        requests.map((request) => (request.id === selectedRequest.id ? { ...request, status: "approved" } : request)),
      )

      setShowApproveModal(false)
      setSelectedRequest(null)
      setVisitDate("")
    } catch (error) {
      console.error("Error approving visit request:", error)
    }
  }

  const submitRejection = async () => {
    if (!selectedRequest || !rejectReason) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/admin/visit/${selectedRequest.id}/approve`, {
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
      console.error("Error rejecting visit request:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{("visitRequests")}</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto min-w-full ">
        <table className="min-w-full overflow-x-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">{("house")}</th>
              <th className="py-3 px-4 text-left">{("visitor")}</th>
              <th className="py-3 px-4 text-left">{("visitorPhone")}</th>
              <th className="py-3 px-4 text-left">{("owner")}</th>
              <th className="py-3 px-4 text-left">{("ownerPhone")}</th>
              <th className="py-3 px-4 text-left">{("requestDate")}</th>
              <th className="py-3 px-4 text-left">{("status")}</th>
              <th className="py-3 px-4 text-left">{("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{request.houseName}</td>
                <td className="py-3 px-4">{request.visitorName}</td>
                <td className="py-3 px-4">{request.visitorPhone}</td>
                <td className="py-3 px-4">{request.ownerName}</td>
                <td className="py-3 px-4">{request.ownerPhone}</td>
                <td className="py-3 px-4">{request.requestDate}</td>
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
                  {request.status === "pending" && (
                    <div className="flex space-x-2">
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
                    </div>
                  )}
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
            <h2 className="text-xl font-semibold mb-4">{("approveVisit")}</h2>
            <p className="mb-4">
              {("approveVisitDescription")} <strong>{selectedRequest.houseName}</strong> {("for")}{" "}
              <strong>{selectedRequest.visitorName}</strong>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{("visitDate")}</label>
              <input
                type="datetime-local"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowApproveModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button
                onClick={submitApproval}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={!visitDate}
              >
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
            <h2 className="text-xl font-semibold mb-4">{("rejectVisit")}</h2>
            <p className="mb-4">
              {("rejectVisitDescription")} <strong>{selectedRequest.houseName}</strong> {("for")}{" "}
              <strong>{selectedRequest.visitorName}</strong>
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
    </div>
  )
}

