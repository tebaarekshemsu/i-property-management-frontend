"use client"

import type React from "react"

import { useState, useEffect } from "react"
//import { useLanguage } from "@/contexts/LanguageContext"
import { DollarSign, Users, Home, Calendar } from "lucide-react"

interface DashboardStats {
  totalRevenue: number
  pendingReports: number
  totalHouses: number
  pendingVisits: number
  successRate: number
}

export function AdminDashboard() {
//   const { t } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    pendingReports: 0,
    totalHouses: 0,
    pendingVisits: 0,
    successRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/admin/dashboard', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data = {
          totalRevenue: 125000,
          pendingReports: 35,
          totalHouses: 120,
          pendingVisits: 15,
          successRate: 78,
        }

        setStats(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={("totalRevenue")}
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
          color="bg-green-100"
        />
        <StatCard
          title={("pendingReports")}
          value={stats.pendingReports.toString()}
          icon={<Users className="w-8 h-8 text-blue-500" />}
          color="bg-blue-100"
        />
        <StatCard
          title={("totalHouses")}
          value={stats.totalHouses.toString()}
          icon={<Home className="w-8 h-8 text-purple-500" />}
          color="bg-purple-100"
        />
        <StatCard
          title={("pendingVisits")}
          value={stats.pendingVisits.toString()}
          icon={<Calendar className="w-8 h-8 text-yellow-500" />}
          color="bg-yellow-100"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{("successRate")}</h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {stats.successRate}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${stats.successRate}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentTransactionsCard />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className={`${color} rounded-lg shadow p-6`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  )
}

function RecentTransactionsCard() {
//   const { t } = useLanguage()

  // Mock data
  const transactions = [
    { id: 1, house: "Modern Apartment", amount: 250000, date: "2023-06-15", type: "sale" },
    { id: 2, house: "Cozy Cottage", amount: 1500, date: "2023-06-12", type: "rent" },
    { id: 3, house: "Luxury Villa", amount: 500000, date: "2023-06-10", type: "sale" },
    { id: 4, house: "City Apartment", amount: 1800, date: "2023-06-08", type: "rent" },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{("recentTransactions")}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">{("house")}</th>
              <th className="py-2 px-4 text-left">{("amount")}</th>
              <th className="py-2 px-4 text-left">{("date")}</th>
              <th className="py-2 px-4 text-left">{("type")}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2 px-4">{transaction.house}</td>
                <td className="py-2 px-4">${transaction.amount.toLocaleString()}</td>
                <td className="py-2 px-4">{transaction.date}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === "sale" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TopAgentsCard() {
//   const { t } = useLanguage()

  // Mock data
  const agents = [
    { id: 1, name: "John Doe", sales: 12, revenue: 1250000 },
    { id: 2, name: "Jane Smith", sales: 10, revenue: 980000 },
    { id: 3, name: "Robert Johnson", sales: 8, revenue: 750000 },
    { id: 4, name: "Emily Davis", sales: 7, revenue: 620000 },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{("topAgents")}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">{("agent")}</th>
              <th className="py-2 px-4 text-left">{("sales")}</th>
              <th className="py-2 px-4 text-left">{("revenue")}</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b">
                <td className="py-2 px-4">{agent.name}</td>
                <td className="py-2 px-4">{agent.sales}</td>
                <td className="py-2 px-4">${agent.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

