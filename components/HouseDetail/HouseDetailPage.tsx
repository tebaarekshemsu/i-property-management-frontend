"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PhotoGallery } from "./PhotoGallery";
import { VisitRequestForm } from "./VisitRequestForm";
import { jwtDecode } from "jwt-decode";
import Paths from "@/lib/path";
import Footer from "@/components/reusable/Footer";
import { API_ENDPOINTS, API_BASE_URL } from "@/config/api";
import { api } from "@/config/api";
import axios from "axios";

interface DecodedToken {
  role?: string;
}

interface HouseData {
  house_id: number;
  category: string;
  location: string;
  address: string;
  size: number;
  toilets: number;
  condition: string;
  bedroom: number;
  facility: string;
  property_type: string;
  furnish_status: string;
  negotiability: string;
  bathroom: number;
  price: number;
  status: string;
  image_urls: string[];
  description: string;
  parking_space: boolean;
  listed_by: string;
  video: string | null;
}

export function HouseDetailPage() {
  const router = useRouter();
  const house_id = useParams();
  const [houseData, setHouseData] = useState<HouseData | null>(null);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const authPath = Paths.authPath();

  useEffect(() => {
    const fetchHouseDetail = async () => {
      try {
        console.log('Fetching house details for ID:', house_id.id);
        const endpoint = API_ENDPOINTS.PROPERTY_DETAILS(house_id.id as string);
        console.log('API Endpoint:', endpoint);
        
        const response = await api.get<[HouseData, number]>(endpoint);
        console.log('API Response:', response);

        if (response.data && Array.isArray(response.data) && response.data[0]) {
          const houseData = response.data[0];
          console.log('Parsed house data:', houseData);
          
          // Parse facility string to array if it's a string
          const parsedFacilities = typeof houseData.facility === 'string' 
            ? JSON.parse(houseData.facility || '[]')
            : houseData.facility;
          
          setHouseData({
            ...houseData,
            facility: parsedFacilities
          });
        } else {
          console.error("Invalid response format:", response.data);
          setHouseData(defaultValues);
        }
      } catch (error) {
        console.error("Error fetching house details:", error);
        if (axios.isAxiosError(error)) {
          console.error("Request failed with status:", error.response?.status);
          console.error("Error message:", error.message);
          console.error("Response data:", error.response?.data);
        }
        setHouseData(defaultValues);
      }
    };

    if (house_id?.id) {
      fetchHouseDetail();
    } else {
      console.error("No house ID provided");
    }

    // Check authentication status on component mount
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken?.role === "user") {
          setIsAuthenticatedUser(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [house_id.id]);

  const handleRequestVisitClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken?.role === "user") {
          setShowVisitForm(true);
        } else {
          router.push("/unauthorized");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push(authPath);
      }
    } else {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push(authPath);
    }
  };

  const handleVisitRequestSubmit = async (visitData: { visitDate: string }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(authPath);
      return;
    }

    const requestData = {
      house_id: house_id.id,
      request_date: visitData.visitDate,
    };

    try {
      console.log('Submitting visit request:', requestData);
      const response = await api.post(
        `${API_ENDPOINTS.USERS}/visite-request`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Visit request response:', response);
      if (response.data) {
        setShowVisitForm(false);
        // You might want to show a success message here
      } else {
        console.error("Error submitting visit request: No data in response");
      }
    } catch (error) {
      console.error("Network error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Request failed with status:", error.response?.status);
        console.error("Error message:", error.message);
        console.error("Response data:", error.response?.data);
      }
      // You might want to show an error message to the user here
    }
  };

  // Default values
  const defaultValues: HouseData = {
    house_id: parseInt(house_id.id as string) || 0,
    category: "Unknown",
    location: "Unknown",
    address: "Unknown",
    size: 0,
    toilets: 0,
    condition: "Unknown",
    bedroom: 0,
    facility: "[]",
    property_type: "Unknown",
    furnish_status: "Unknown",
    negotiability: "Unknown",
    bathroom: 0,
    price: 0,
    status: "Unknown",
    image_urls: [
      "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
    ],
    description: "No description available",
    parking_space: false,
    listed_by: "Unknown",
    video: null
  };

  if (!houseData) {
    return <div>Loading...</div>;
  }

  // Merge incoming data with default values
  const mergedData = { ...defaultValues, ...houseData };

  // Handle the case when image_urls is null or not an array
  const photos =
    Array.isArray(mergedData.image_urls) && mergedData.image_urls.length > 0
      ? mergedData.image_urls
      : defaultValues.image_urls;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Property {mergedData.house_id}</h1>
        <PhotoGallery photos={photos} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
            <ul className="space-y-2">
              <li>
                <strong>Category:</strong> {mergedData.category}
              </li>
              <li>
                <strong>Location:</strong> {mergedData.location}
              </li>
              <li>
                <strong>Address:</strong> {mergedData.address}
              </li>
              <li>
                <strong>Size:</strong> {mergedData.size} sqm
              </li>
              <li>
                <strong>Condition:</strong> {mergedData.condition}
              </li>
              <li>
                <strong>Bedrooms:</strong> {mergedData.bedroom}
              </li>
              <li>
                <strong>Toilets:</strong> {mergedData.toilets}
              </li>
              <li>
                <strong>Bathrooms:</strong> {mergedData.bathroom}
              </li>
              <li>
                <strong>Property Type:</strong> {mergedData.property_type}
              </li>
              <li>
                <strong>Furnish Status:</strong> {mergedData.furnish_status}
              </li>
              <li>
                <strong>Parking Space:</strong>{" "}
                {mergedData.parking_space ? "Yes" : "No"}
              </li>
              <li>
                <strong>Listed By:</strong> {mergedData.listed_by}
              </li>
              <li>
                <strong>Status:</strong> {mergedData.status}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Price & Description</h2>
            <div className="mb-6">
              <p className="text-2xl font-bold text-blue-600">
                ${mergedData.price.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Negotiability: {mergedData.negotiability}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{mergedData.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Facilities</h3>
              <ul className="list-disc list-inside text-gray-700">
                {Array.isArray(mergedData.facility) 
                  ? mergedData.facility.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))
                  : <li>No facilities listed</li>
                }
              </ul>
            </div>
            {isAuthenticatedUser && (
              <button
                onClick={handleRequestVisitClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Request Visit
              </button>
            )}
          </div>
        </div>
        {showVisitForm && (
          <VisitRequestForm
            onSubmit={handleVisitRequestSubmit}
            onClose={() => setShowVisitForm(false)}
            houseId={house_id.id as string}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
