"use client"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"

interface ExpenseRequest {
  id: string
  title: string
  description: string
  amount: number
  category: "office" | "marketing" | "travel" | "maintenance" | "other"
  requestedBy: string
  requestDate: string
  receiptImage?: string
  status: "pending" | "approved" | "rejected"
}

export function ExpenseRequests() {
  // const { t } = useLanguage()
  const [expenses, setExpenses] = useState<ExpenseRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedExpense, setSelectedExpense] = useState<ExpenseRequest | null>(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Fetch expense requests from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/super-admin/expenses', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: ExpenseRequest[] = [
          {
            id: "1",
            title: "Office Supplies",
            description: "Purchased new stationery and printer ink",
            amount: 500,
            category: "office",
            requestedBy: "John Doe",
            requestDate: "2023-06-15",
            receiptImage: "/placeholder.svg?height=400&width=300",
            status: "pending",
          },
          {
            id: "2",
            title: "Marketing Campaign",
            description: "Facebook and Instagram ads for new property listings",
            amount: 2000,
            category: "marketing",
            requestedBy: "Jane Smith",
            requestDate: "2023-06-14",
            receiptImage: "/placeholder.svg?height=400&width=300",
            status: "pending",
          },
          {
            id: "3",
            title: "Property Visit Travel",
            description: "Fuel expenses for visiting remote properties",
            amount: 150,
            category: "travel",
            requestedBy: "Robert Johnson",
            requestDate: "2023-06-12",
            status: "approved",
          },
          {
            id: "4",
            title: "Office Maintenance",
            description: "Repair of air conditioning system",
            amount: 800,
            category: "maintenance",
            requestedBy: "Emily Davis",
            requestDate: "2023-06-10",
            receiptImage: "/placeholder.svg?height=400&width=300",
            status: "rejected",
          },
        ]

        setExpenses(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching expense requests:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true
    return expense.status === filter
  })

  const handleViewDetails = (expense: ExpenseRequest) => {
    setSelectedExpense(expense)
    setShowDetailsModal(true)
  }

  const handleApprove = (expense: ExpenseRequest) => {
    setSelectedExpense(expense)
    setShowApproveModal(true)
  }

  const handleReject = (expense: ExpenseRequest) => {
    setSelectedExpense(expense)
    setShowRejectModal(true)
  }

  const submitApproval = async () => {
    if (!selectedExpense) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/super-admin/expenses/${selectedExpense.id}/approve`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // Mock implementation
      setExpenses(
        expenses.map((expense) => (expense.id === selectedExpense.id ? { ...expense, status: "approved" } : expense)),
      )

      setShowApproveModal(false)
      setSelectedExpense(null)
    } catch (error) {
      console.error("Error approving expense:", error)
    }
  }

  const submitRejection = async () => {
    if (!selectedExpense || !rejectReason) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/super-admin/expenses/${selectedExpense.id}/reject`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({ reason: rejectReason })
      // });

      // Mock implementation
      setExpenses(
        expenses.map((expense) => (expense.id === selectedExpense.id ? { ...expense, status: "rejected" } : expense)),
      )

      setShowRejectModal(false)
      setSelectedExpense(null)
      setRejectReason("")
    } catch (error) {
      console.error("Error rejecting expense:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{("expenseRequests")}</h1>

      <div className="mb-6">
        <div className="flex space-x-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
            <option value="all">{("allRequests")}</option>
            <option value="pending">{("pending")}</option>
            <option value="approved">{("approved")}</option>
            <option value="rejected">{("rejected")}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-scroll w-full">
        <table className="w-full min-w-max boder-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">{("title")}</th>
              <th className="py-3 px-4 text-left">{("amount")}</th>
              <th className="py-3 px-4 text-left">{("category")}</th>
              <th className="py-3 px-4 text-left">{("requestedBy")}</th>
              <th className="py-3 px-4 text-left">{("requestDate")}</th>
              <th className="py-3 px-4 text-left">{("status")}</th>
              <th className="py-3 px-4 text-left">{("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{expense.title}</td>
                <td className="py-3 px-4">${expense.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      expense.category === "office"
                        ? "bg-blue-200 text-blue-800"
                        : expense.category === "marketing"
                          ? "bg-purple-200 text-purple-800"
                          : expense.category === "travel"
                            ? "bg-green-200 text-green-800"
                            : expense.category === "maintenance"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {(expense.category)}
                  </span>
                </td>
                <td className="py-3 px-4">{expense.requestedBy}</td>
                <td className="py-3 px-4">{expense.requestDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      expense.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : expense.status === "approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                    }`}
                  >
                    {(expense.status)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(expense)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      {("details")}
                    </button>
                    {expense.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(expense)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          {("approve")}
                        </button>
                        <button
                          onClick={() => handleReject(expense)}
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

      {/* Details Modal */}
      {showDetailsModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">{("expenseDetails")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2">
                  <strong>{("title")}:</strong> {selectedExpense.title}
                </p>
                <p className="mb-2">
                  <strong>{("description")}:</strong> {selectedExpense.description}
                </p>
                <p className="mb-2">
                  <strong>{("amount")}:</strong> ${selectedExpense.amount.toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>{("category")}:</strong> {(selectedExpense.category)}
                </p>
                <p className="mb-2">
                  <strong>{("requestedBy")}:</strong> {selectedExpense.requestedBy}
                </p>
                <p className="mb-2">
                  <strong>{("requestDate")}:</strong> {selectedExpense.requestDate}
                </p>
                <p className="mb-2">
                  <strong>{("status")}:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedExpense.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : selectedExpense.status === "approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                    }`}
                  >
                    {(selectedExpense.status)}
                  </span>
                </p>
              </div>
              {selectedExpense.receiptImage && (
                <div>
                  <p className="mb-2">
                    <strong>{("receipt")}:</strong>
                  </p>
                  <div className="relative h-64 w-full">
                    <Image
                      src={selectedExpense.receiptImage || "/placeholder.svg"}
                      alt="Receipt"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                {("close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("approveExpense")}</h2>
            <p className="mb-4">
              {("approveExpenseConfirmation")} <strong>{selectedExpense.title}</strong> {("for")}{" "}
              <strong>${selectedExpense.amount.toLocaleString()}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowApproveModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button onClick={submitApproval} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                {("approve")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("rejectExpense")}</h2>
            <p className="mb-4">
              {("rejectExpenseConfirmation")} <strong>{selectedExpense.title}</strong>?
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
                {("reject")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

