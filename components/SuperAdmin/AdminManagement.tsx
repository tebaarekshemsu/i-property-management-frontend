"use client"

import type React from "react"

import { useState, useEffect } from "react"
// import { useLanguage } from "@/contexts/LanguageContext"
import { Plus, Edit, Trash } from "lucide-react"

interface Admin {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "senior_admin"
  status: "active" | "inactive"
  dateAdded: string
  transactions: number
  successRate: number
}

export function AdminManagement() {
  // const { t } = useLanguage()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "admin",
    status: "active",
  })

  useEffect(() => {
    // Fetch admins from API
    // This is a mock implementation
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/super-admin/admins', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // const data = await response.json();

        // Mock data
        const data: Admin[] = [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
            role: "admin",
            status: "active",
            dateAdded: "2023-01-15",
            transactions: 45,
            successRate: 92,
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+0987654321",
            role: "senior_admin",
            status: "active",
            dateAdded: "2023-02-20",
            transactions: 38,
            successRate: 88,
          },
          {
            id: "3",
            name: "Robert Johnson",
            email: "robert@example.com",
            phone: "+1122334455",
            role: "admin",
            status: "inactive",
            dateAdded: "2023-03-10",
            transactions: 32,
            successRate: 85,
          },
        ]

        setAdmins(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching admins:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddAdmin = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "admin",
      status: "active",
    })
    setShowAddModal(true)
  }

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin)
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      status: admin.status,
    })
    setShowEditModal(true)
  }

  const handleDeleteAdmin = (admin: Admin) => {
    setSelectedAdmin(admin)
    setShowDeleteModal(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitAddAdmin = async () => {
    try {
      // In a real app, you would send data to your API
      // await fetch('/api/super-admin/admins', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData)
      // });

      // Mock implementation
      const newAdmin: Admin = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role as "admin" | "senior_admin",
        status: formData.status as "active" | "inactive",
        dateAdded: new Date().toISOString().split("T")[0],
        transactions: 0,
        successRate: 0,
      }

      setAdmins([...admins, newAdmin])
      setShowAddModal(false)
    } catch (error) {
      console.error("Error adding admin:", error)
    }
  }

  const submitEditAdmin = async () => {
    if (!selectedAdmin) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/super-admin/admins/${selectedAdmin.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData)
      // });

      // Mock implementation
      setAdmins(
        admins.map((admin) =>
          admin.id === selectedAdmin.id
            ? {
                ...admin,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role as "admin" | "senior_admin",
                status: formData.status as "active" | "inactive",
              }
            : admin,
        ),
      )

      setShowEditModal(false)
      setSelectedAdmin(null)
    } catch (error) {
      console.error("Error editing admin:", error)
    }
  }

  const submitDeleteAdmin = async () => {
    if (!selectedAdmin) return

    try {
      // In a real app, you would send data to your API
      // await fetch(`/api/super-admin/admins/${selectedAdmin.id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // Mock implementation
      setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id))

      setShowDeleteModal(false)
      setSelectedAdmin(null)
    } catch (error) {
      console.error("Error deleting admin:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">{("loading")}...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{("adminManagement")}</h1>
        <button onClick={handleAddAdmin} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          {("addAdmin")}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">{("name")}</th>
              <th className="py-3 px-4 text-left">{("email")}</th>
              <th className="py-3 px-4 text-left">{("phone")}</th>
              <th className="py-3 px-4 text-left">{("role")}</th>
              <th className="py-3 px-4 text-left">{("status")}</th>
              <th className="py-3 px-4 text-left">{("dateAdded")}</th>
              <th className="py-3 px-4 text-left">{("transactions")}</th>
              <th className="py-3 px-4 text-left">{("successRate")}</th>
              <th className="py-3 px-4 text-left">{("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{admin.name}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">{admin.phone}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      admin.role === "senior_admin" ? "bg-purple-200 text-purple-800" : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {admin.role === "senior_admin" ? ("seniorAdmin") : ("admin")}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      admin.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {admin.status === "active" ? ("active") : ("inactive")}
                  </span>
                </td>
                <td className="py-3 px-4">{admin.dateAdded}</td>
                <td className="py-3 px-4">{admin.transactions}</td>
                <td className="py-3 px-4">{admin.successRate}%</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAdmin(admin)}
                      className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      title={("edit")}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
                      className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      title={("delete")}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("addAdmin")}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("name")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("email")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("role")}</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="admin">{("admin")}</option>
                  <option value="senior_admin">{("seniorAdmin")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("status")}</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="active">{("active")}</option>
                  <option value="inactive">{("inactive")}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button onClick={submitAddAdmin} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {("add")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("editAdmin")}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("name")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("email")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("role")}</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="admin">{("admin")}</option>
                  <option value="senior_admin">{("seniorAdmin")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{("status")}</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="active">{("active")}</option>
                  <option value="inactive">{("inactive")}</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button onClick={submitEditAdmin} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {("save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Admin Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{("deleteAdmin")}</h2>
            <p className="mb-4">
              {("deleteAdminConfirmation")} <strong>{selectedAdmin.name}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                {("cancel")}
              </button>
              <button onClick={submitDeleteAdmin} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                {("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

