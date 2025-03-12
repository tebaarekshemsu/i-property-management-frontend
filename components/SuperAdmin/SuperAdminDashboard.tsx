"use client"

import type React from "react"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import { DollarSign, Users, Home, CreditCard, BarChart4 } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalRevenue: number
  totalAdmins: number
  totalUsers: number
  totalHouses: number
  pendingExpenses: number
  systemHealth: number
}

export function SuperAdminDashboard() {
  // const { t } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalAdmins: 0,
    totalUsers: 0,
    totalHouses: 0,
    pendingExpenses: 0,
    systemHealth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/super-admin/dashboard', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data = {
          totalRevenue: 1250000,
          totalAdmins: 12,
          totalUsers: 3500,
          totalHouses: 1200,
          pendingExpenses: 8,
          systemHealth: 98,
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
      <h1 className="text-3xl font-bold mb-8">{("superAdminDashboard")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title={("totalRevenue")}
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
          color="bg-green-100"
          link="/super-admin/finances"
        />
        <StatCard
          title={("totalAdmins")}
          value={stats.totalAdmins.toString()}
          icon={<Users className="w-8 h-8 text-blue-500" />}
          color="bg-blue-100"
          link="/super-admin/admins"
        />
        <StatCard
          title={("totalUsers")}
          value={stats.totalUsers.toString()}
          icon={<Users className="w-8 h-8 text-indigo-500" />}
          color="bg-indigo-100"
          link="/super-admin/users"
        />
        <StatCard
          title={("totalHouses")}
          value={stats.totalHouses.toString()}
          icon={<Home className="w-8 h-8 text-purple-500" />}
          color="bg-purple-100"
          link="/super-admin/houses"
        />
        <StatCard
          title={("pendingExpenses")}
          value={stats.pendingExpenses.toString()}
          icon={<CreditCard className="w-8 h-8 text-yellow-500" />}
          color="bg-yellow-100"
          link="/super-admin/expenses"
        />
        <StatCard
          title={("systemHealth")}
          value={`${stats.systemHealth}%`}
          icon={<BarChart4 className="w-8 h-8 text-teal-500" />}
          color="bg-teal-100"
          link="/super-admin/reports"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivityCard />
        <TopAdminsCard />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
  link,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
  link: string
}) {
  return (
    <Link href={link} className="block">
      <div className={`${color} rounded-lg shadow p-6 transition-transform hover:scale-105`}>
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </div>
    </Link>
  )
}

function RecentActivityCard() {
  // const { t } = useLanguage()

  // Mock data
  const activities = [
    { id: 1, type: "admin_added", description: "New admin John Doe was added", date: "2023-06-15", time: "14:30" },
    {
      id: 2,
      type: "expense_approved",
      description: "Expense request #1234 was approved",
      date: "2023-06-14",
      time: "10:15",
    },
    {
      id: 3,
      type: "expense_rejected",
      description: "Expense request #1235 was rejected",
      date: "2023-06-14",
      time: "09:45",
    },
    { id: 4, type: "admin_removed", description: "Admin Jane Smith was removed", date: "2023-06-13", time: "16:20" },
    {
      id: 5,
      type: "system_update",
      description: "System was updated to version 2.1.0",
      date: "2023-06-12",
      time: "22:00",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "admin_added":
        return "👤"
      case "admin_removed":
        return "🚫"
      case "expense_approved":
        return "✅"
      case "expense_rejected":
        return "❌"
      case "system_update":
        return "🔄"
      default:
        return "📝"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{("recentActivity")}</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{getActivityIcon(activity.type)}</span>
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-gray-500">
                  {activity.date} at {activity.time}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link href="/super-admin/activity" className="text-blue-600 hover:underline">
          {("viewAllActivity")}
        </Link>
      </div>
    </div>
  )
}

function TopAdminsCard() {
  // const { t } = useLanguage()

  // Mock data
  const admins = [
    { id: 1, name: "John Doe", transactions: 45, revenue: 125000, successRate: 92 },
    { id: 2, name: "Jane Smith", transactions: 38, revenue: 98000, successRate: 88 },
    { id: 3, name: "Robert Johnson", transactions: 32, revenue: 87500, successRate: 85 },
    { id: 4, name: "Emily Davis", transactions: 29, revenue: 76000, successRate: 90 },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{("topPerformingAdmins")}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">{("admin")}</th>
              <th className="py-2 px-4 text-left">{("transactions")}</th>
              <th className="py-2 px-4 text-left">{("revenue")}</th>
              <th className="py-2 px-4 text-left">{("successRate")}</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="py-2 px-4">{admin.name}</td>
                <td className="py-2 px-4">{admin.transactions}</td>
                <td className="py-2 px-4">${admin.revenue.toLocaleString()}</td>
                <td className="py-2 px-4">{admin.successRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <Link href="/super-admin/admins" className="text-blue-600 hover:underline">
          {("viewAllAdmins")}
        </Link>
      </div>
    </div>
  )
}

