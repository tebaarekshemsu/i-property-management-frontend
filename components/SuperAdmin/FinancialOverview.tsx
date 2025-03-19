"use client"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import { Download, Filter } from "lucide-react"

interface Transaction {
  id: string
  date: string
  type: "sale" | "rent" | "commission" | "expense"
  description: string
  amount: number
  admin: string
  status: "completed" | "pending" | "failed"
}

export function FinancialOverview() {
  // const { t } = useLanguage()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  })
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    pendingAmount: 0,
  })

  useEffect(() => {
    // Fetch financial data from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/super-admin/finances', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: Transaction[] = [
          {
            id: "1",
            date: "2023-06-15",
            type: "sale",
            description: "Property sale: Modern Apartment",
            amount: 250000,
            admin: "John Doe",
            status: "completed",
          },
          {
            id: "2",
            date: "2023-06-14",
            type: "commission",
            description: "Commission from property sale",
            amount: 12500,
            admin: "John Doe",
            status: "completed",
          },
          {
            id: "3",
            date: "2023-06-12",
            type: "rent",
            description: "Property rent: Cozy Cottage",
            amount: 1500,
            admin: "Jane Smith",
            status: "completed",
          },
          {
            id: "4",
            date: "2023-06-10",
            type: "expense",
            description: "Office supplies",
            amount: -500,
            admin: "Robert Johnson",
            status: "completed",
          },
          {
            id: "5",
            date: "2023-06-08",
            type: "expense",
            description: "Marketing campaign",
            amount: -2000,
            admin: "Jane Smith",
            status: "pending",
          },
        ]

        setTransactions(data)

        // Calculate stats
        const totalRevenue = data
          .filter((t) => t.type !== "expense" && t.status === "completed")
          .reduce((sum, t) => sum + t.amount, 0)

        const totalExpenses = data
          .filter((t) => t.type === "expense" && t.status === "completed")
          .reduce((sum, t) => sum + Math.abs(t.amount), 0)

        const pendingAmount = data.filter((t) => t.status === "pending").reduce((sum, t) => sum + Math.abs(t.amount), 0)

        setStats({
          totalRevenue,
          totalExpenses,
          netProfit: totalRevenue - totalExpenses,
          pendingAmount,
        })

        setLoading(false)
      } catch (error) {
        console.error("Error fetching financial data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true
    return transaction.type === filter
  })

  const handleExportData = () => {
    // In a real app, you would generate a CSV or Excel file
    alert("Exporting financial data...")
  }

  const applyFilters = () => {
    // In a real app, you would apply date range filters
    setShowFilterModal(false)
  }

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{("financialOverview")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={("totalRevenue")}
          value={`$${stats.totalRevenue.toLocaleString()}`}
          color="bg-green-100 text-green-800"
        />
        <StatCard
          title={("totalExpenses")}
          value={`$${stats.totalExpenses.toLocaleString()}`}
          color="bg-red-100 text-red-800"
        />
        <StatCard
          title={("netProfit")}
          value={`$${stats.netProfit.toLocaleString()}`}
          color="bg-blue-100 text-blue-800"
        />
        <StatCard
          title={("pendingAmount")}
          value={`$${stats.pendingAmount.toLocaleString()}`}
          color="bg-yellow-100 text-yellow-800"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
              <option value="all">{("allTransactions")}</option>
              <option value="sale">{("sales")}</option>
              <option value="rent">{("rentals")}</option>
              <option value="commission">{("commissions")}</option>
              <option value="expense">{("expenses")}</option>
            </select>
            <button onClick={() => setShowFilterModal(true)} className="px-4 py-2 border rounded flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              {("dateFilter")}
            </button>
          </div>
          <button onClick={handleExportData} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center">
            <Download className="w-4 h-4 mr-2" />
            {("exportData")}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">{("date")}</th>
                <th className="py-3 px-4 text-left">{("type")}</th>
                <th className="py-3 px-4 text-left">{("description")}</th>
                <th className="py-3 px-4 text-left">{("amount")}</th>
                <th className="py-3 px-4 text-left">{("admin")}</th>
                <th className="py-3 px-4 text-left">{("status")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === "sale"
                          ? "bg-green-200 text-green-800"
                          : transaction.type === "rent"
                            ? "bg-blue-200 text-blue-800"
                            : transaction.type === "commission"
                              ? "bg-purple-200 text-purple-800"
                              : "bg-red-200 text-red-800"
                      }`}
                    >
                      {(transaction.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{transaction.description}</td>
                  <td className={`py-3 px-4 font-medium ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                    {transaction.amount < 0 ? "-" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{transaction.admin}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                      }`}
                    >
                      {(transaction.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("filterByDate")}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("startDate")}</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("endDate")}</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowFilterModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {("applyFilter")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className={`rounded-lg shadow p-6  ${color}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}

