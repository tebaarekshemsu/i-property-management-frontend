"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Admin {
  admin_id: number;
  name: string;
  phone_no: string;
  area_codes: string[];
}

interface Location {
  area_code: string;
  name: string;
}

export function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    phone_no: "",
    area_codes: [] as string[],
    id_front: null as File | null, // Changed to File | null
    id_back: null as File | null, // Changed to File | null
    admin_type: "admin",
    password: "",
  });
  const [newLocation, setNewLocation] = useState({
    area_code: "",
    name: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const adminsRes = await fetch(
        "http://127.0.0.1:8000/super_admin/get_admins"
      );
      const adminsData: Admin[] = await adminsRes.json();
      setAdmins(adminsData);

      const locationsRes = await fetch(
        "http://127.0.0.1:8000/super_admin/location"
      );
      const locationsData: Location[] = await locationsRes.json();
      setLocations(locationsData);

      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch data");
      setLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const invitation_code = `INV${newAdmin.phone_no}`;

      const formData = new FormData();
      formData.append("name", newAdmin.name);
      formData.append("phone_no", newAdmin.phone_no);
      formData.append("password", newAdmin.password);
      formData.append("admin_type", newAdmin.admin_type);
      formData.append("invitation_code", invitation_code);

      // Append area_codes as a JSON string, or as individual items if your backend expects it that way
      formData.append("area_codes", JSON.stringify(newAdmin.area_codes));

      if (newAdmin.id_front) {
        formData.append("id_front", newAdmin.id_front);
      }
      if (newAdmin.id_back) {
        formData.append("id_back", newAdmin.id_back);
      }

      // Note: For file uploads with FormData, you typically do NOT set 'Content-Type': 'application/json'
      const response = await fetch(
        "http://127.0.0.1:8000/super_admin/add_admin",
        {
          method: "POST",
          body: formData, // Send FormData directly
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add admin");
      }

      toast.success("Admin added successfully");
      fetchData();
      setNewAdmin({
        name: "",
        phone_no: "",
        area_codes: [],
        id_front: null,
        id_back: null,
        admin_type: "admin",
        password: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Error adding admin");
    }
  };

  const handleAddLocation = async () => {
    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add location");
      }

      toast.success("Location added successfully");
      fetchData();
      setNewLocation({ area_code: "", name: "" });
    } catch (error: any) {
      toast.error(error.message || "Error adding location");
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    try {
      const res = await fetch(`/api/admins/${adminId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete admin");
      }

      toast.success("Admin deleted successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Error deleting admin");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <div className="space-x-4">
          {/* Add Admin Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-md max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">
                  Add New Admin
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone_no">Phone Number</Label>
                  <Input
                    id="phone_no"
                    value={newAdmin.phone_no}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, phone_no: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="id_front">ID Front</Label>
                  <Input
                    id="id_front"
                    type="file" // Changed to file input
                    accept="image/*" // Restrict to image files
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        id_front: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                  {newAdmin.id_front && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected: {newAdmin.id_front.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="id_back">ID Back</Label>
                  <Input
                    id="id_back"
                    type="file" // Changed to file input
                    accept="image/*" // Restrict to image files
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        id_back: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                  {newAdmin.id_back && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected: {newAdmin.id_back.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Area Codes</Label>
                  <Select
                    onValueChange={(value) => {
                      if (!newAdmin.area_codes.includes(value)) {
                        setNewAdmin((prev) => ({
                          ...prev,
                          area_codes: [...prev.area_codes, value],
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select area codes" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.area_code} value={loc.area_code}>
                          {loc.name} ({loc.area_code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-2 text-sm text-gray-600">
                    Selected:{" "}
                    {newAdmin.area_codes.length > 0
                      ? newAdmin.area_codes
                          .map((code) => {
                            const found = locations.find(
                              (loc) => loc.area_code === code
                            );
                            return found ? found.name : code;
                          })
                          .join(", ")
                      : "None"}
                    {newAdmin.area_codes.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setNewAdmin({ ...newAdmin, area_codes: [] })
                        }
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>
                <Button onClick={handleAddAdmin} className="w-full">
                  Add Admin
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Location Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-md max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">
                  Add New Location
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="area_code">Area Code</Label>
                  <Input
                    id="area_code"
                    value={newLocation.area_code}
                    onChange={(e) =>
                      setNewLocation({
                        ...newLocation,
                        area_code: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="location_name">Location Name</Label>
                  <Input
                    id="location_name"
                    value={newLocation.name}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, name: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleAddLocation} className="w-full">
                  Add Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Admin List Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Admin List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-100 text-sm">
                <th className="p-2">Name</th>
                <th className="p-2">Phone No</th>
                <th className="p-2">Area Codes</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.admin_id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{admin.name}</td>
                  <td className="p-2">{admin.phone_no}</td>
                  <td className="p-2">{admin.area_codes.join(", ")}</td>
                  <td className="p-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAdmin(admin.admin_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No admins available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
