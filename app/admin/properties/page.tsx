"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/lib/services/admin.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  status: string;
  type: string;
  owner: string;
  date: string;
}

interface Location {
  code: number;
  name: string;
}

interface ApiResponse {
  houses: Array<{
    house_id: number;
    title: string;
    location: string;
    price: number;
    property_type: string;
    owner: string;
    created_at: string;
  }>;
  pagination: {
    current_page: number;
    total_pages: number;
    total_houses: number;
    houses_per_page: number;
  };
}

const CATEGORY_OPTIONS = [
  { value: 'sell', label: 'Sell' },
  { value: 'rent', label: 'Rent' }
];

const CONDITION_OPTIONS = [
  { value: 'fairly used', label: 'Fairly Used' },
  { value: 'newly built', label: 'Newly Built' },
  { value: 'old and renovated', label: 'Old and Renovated' }
];

const LISTED_BY_OPTIONS = [
  { value: 'agent', label: 'Agent' },
  { value: 'owner', label: 'Owner' }
];

const PROPERTY_TYPE_OPTIONS = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'condominium', label: 'Condominium' }
];

const FURNISH_STATUS_OPTIONS = [
  { value: 'furnished', label: 'Furnished' },
  { value: 'semi furnished', label: 'Semi Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' }
];

const NEGOTIABILITY_OPTIONS = [
  { value: 'open to negotiation', label: 'Open to Negotiation' },
  { value: 'not', label: 'Not Negotiable' }
];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'available', label: 'Available' },
  { value: 'rented', label: 'Rented' },
  { value: 'sold', label: 'Sold' }
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    area: "",
    category: "",
    location: "",
    address: "",
    size: "",
    condition: "",
    bedrooms: "",
    toilets: "",
    bathrooms: "",
    propertyType: "",
    furnishStatus: "",
    facilities: "",
    description: "",
    price: "",
    negotiability: "open to negotiation",
    parkingSpace: false,
    listedBy: "agent",
    name: "",
    phoneNumber: "",
    videoLink: "",
    photos: [] as File[],
  });

  useEffect(() => {
    fetchProperties();
    fetchLocations();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await adminService.getAdminHouses();
      const formattedProperties = response.houses.map((house: any) => ({
        id: house.house_id,
        title: house.title,
        location: house.location,
        price: house.price,
        status: "Active", // You might want to get this from the API
        type: house.property_type,
        owner: house.owner,
        date: new Date(house.created_at).toLocaleDateString(),
      }));
      setProperties(formattedProperties);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const data = await adminService.getLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Convert numeric fields to numbers
      const numericFields = ['size', 'bedrooms', 'toilets', 'bathrooms', 'price'];
      numericFields.forEach(field => {
        if (formData[field as keyof typeof formData]) {
          formDataToSend.append(field, Number(formData[field as keyof typeof formData]).toString());
        }
      });

      // Handle boolean fields
      formDataToSend.append('parkingSpace', formData.parkingSpace ? '1' : '0');

      // Handle facilities array
      if (formData.facilities) {
        const facilitiesArray = formData.facilities.split(',').map(f => f.trim()).filter(f => f);
        formDataToSend.append('facilities', JSON.stringify(facilitiesArray));
      }

      // Handle photos
      formData.photos.forEach(photo => {
        formDataToSend.append('photos', photo);
      });

      // Handle remaining string fields
      const stringFields = [
        'area', 'category', 'location', 'address', 'condition',
        'propertyType', 'furnishStatus', 'description', 'negotiability',
        'listedBy', 'name', 'phoneNumber', 'videoLink'
      ];

      stringFields.forEach(field => {
        if (formData[field as keyof typeof formData]) {
          formDataToSend.append(field, formData[field as keyof typeof formData].toString());
        }
      });

      // Add status field
      formDataToSend.append('status', 'pending');

      await adminService.postHouse(formDataToSend);
      onClose();
      fetchProperties();

      // Reset form
      setFormData({
        area: "",
        category: "",
        location: "",
        address: "",
        size: "",
        condition: "",
        bedrooms: "",
        toilets: "",
        bathrooms: "",
        propertyType: "",
        furnishStatus: "",
        facilities: "",
        description: "",
        price: "",
        negotiability: "open to negotiation",
        parkingSpace: false,
        listedBy: "agent",
        name: "",
        phoneNumber: "",
        videoLink: "",
        photos: [],
      });
    } catch (error) {
      console.error("Error posting property:", error);
      // You might want to show an error message to the user here
    }
  };

  const totalPages = 4; // Total number of pages in the form

  const renderFormPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Area</label>
                <Select
                  name="area"
                  value={formData.area}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.code} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Size (sq ft)</label>
                <Input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Enter size"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Condition</label>
                <Select
                  name="condition"
                  value={formData.condition}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITION_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                <Input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="Enter number of bedrooms"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Toilets</label>
                <Input
                  type="number"
                  name="toilets"
                  value={formData.toilets}
                  onChange={handleInputChange}
                  placeholder="Enter number of toilets"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                <Input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="Enter number of bathrooms"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Property Type</label>
                <Select
                  name="propertyType"
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Additional Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Furnish Status</label>
                <Select
                  name="furnishStatus"
                  value={formData.furnishStatus}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, furnishStatus: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select furnish status" />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNISH_STATUS_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Facilities (comma-separated)</label>
                <Input
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleInputChange}
                  placeholder="Enter facilities"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Negotiability</label>
                <Select
                  name="negotiability"
                  value={formData.negotiability}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, negotiability: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select negotiability" />
                  </SelectTrigger>
                  <SelectContent>
                    {NEGOTIABILITY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="parkingSpace"
                    checked={formData.parkingSpace}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <label className="text-sm font-medium">Has Parking Space</label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Information & Media</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Listed By</label>
                <Select
                  name="listedBy"
                  value={formData.listedBy}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, listedBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select listed by" />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTED_BY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Video Link (optional)</label>
                <Input
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleInputChange}
                  placeholder="Enter video link"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Photos</label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Button onClick={onOpen} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>${property.price}</TableCell>
                  <TableCell>{property.status}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>{property.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-white z-[9999]">
          <ModalHeader className="flex justify-between items-center">
            <div className="text-xl font-semibold">Add New Property</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </ModalHeader>
          <ModalBody className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderFormPage()}
            </form>
          </ModalBody>
          <ModalFooter className="border-t pt-4">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                {currentPage === totalPages ? (
                  <Button onClick={handleSubmit}>Submit</Button>
                ) : (
                  <Button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <style jsx global>{`
        .select-content {
          background-color: white !important;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 9999 !important;
        }
        .select-item {
          color: #1a202c !important;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .select-item:hover {
          background-color: #f7fafc !important;
        }
        .select-item[data-highlighted] {
          background-color: #edf2f7 !important;
        }
      `}</style>
    </div>
  );
}

