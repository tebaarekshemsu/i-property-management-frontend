import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"

export default function AdminsPage() {
  // Sample admin data
  const admins = [
    {
      id: 1,
      name: "Admin A",
      email: "admin.a@example.com",
      role: "Property Manager",
      status: "Active",
      properties: 15,
      joinDate: "2022-01-15",
    },
    {
      id: 2,
      name: "Admin B",
      email: "admin.b@example.com",
      role: "User Manager",
      status: "Active",
      properties: 0,
      joinDate: "2022-02-20",
    },
    {
      id: 3,
      name: "Admin C",
      email: "admin.c@example.com",
      role: "Finance Manager",
      status: "Active",
      properties: 0,
      joinDate: "2022-03-10",
    },
    {
      id: 4,
      name: "Admin D",
      email: "admin.d@example.com",
      role: "Property Manager",
      status: "Inactive",
      properties: 8,
      joinDate: "2022-04-05",
    },
    {
      id: 5,
      name: "Admin E",
      email: "admin.e@example.com",
      role: "Support Manager",
      status: "Active",
      properties: 0,
      joinDate: "2022-05-12",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admins</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Admin
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Admin Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search admins..." className="w-[250px] pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        admin.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell>{admin.properties}</TableCell>
                  <TableCell>{admin.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

