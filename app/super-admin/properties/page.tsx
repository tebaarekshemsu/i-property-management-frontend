import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"

export default function SuperAdminPropertiesPage() {
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Luxury Villa",
      location: "Bole, Addis Ababa",
      price: "$450,000",
      status: "Active",
      type: "Sale",
      owner: "John Doe",
      date: "2023-05-15",
      admin: "Admin A",
    },
    {
      id: 2,
      title: "Modern Apartment",
      location: "Kazanchis, Addis Ababa",
      price: "$1,200/month",
      status: "Active",
      type: "Rent",
      owner: "Sarah Johnson",
      date: "2023-06-02",
      admin: "Admin B",
    },
    {
      id: 3,
      title: "Family House",
      location: "CMC, Addis Ababa",
      price: "$320,000",
      status: "Pending",
      type: "Sale",
      owner: "Michael Brown",
      date: "2023-06-10",
      admin: "Admin A",
    },
    {
      id: 4,
      title: "Studio Apartment",
      location: "Piassa, Addis Ababa",
      price: "$800/month",
      status: "Active",
      type: "Rent",
      owner: "Emily Davis",
      date: "2023-06-15",
      admin: "Admin C",
    },
    {
      id: 5,
      title: "Commercial Space",
      location: "Mexico, Addis Ababa",
      price: "$2,500/month",
      status: "Pending",
      type: "Rent",
      owner: "Robert Wilson",
      date: "2023-06-20",
      admin: "Admin B",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Property Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search properties..." className="w-[250px] pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        property.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {property.status}
                    </span>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>{property.admin}</TableCell>
                  <TableCell>{property.date}</TableCell>
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

