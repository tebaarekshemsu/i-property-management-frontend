"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PhotoGallery } from "./PhotoGallery";
import { VisitRequestForm } from "./VisitRequestForm";
import { jwtDecode } from "jwt-decode";
import Paths from "@/lib/path";

interface DecodedToken {
  role?: string;
}

export function HouseDetailPage() {
  const router = useRouter();
  const house_id = useParams();
  const [houseData, setHouseData] = useState(null);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const authPath = Paths.authPath();

  useEffect(() => {
    const fetchHouseDetail = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/user/house/${house_id.id}`
        );
        if (!response.ok) throw new Error("House not found");
        const data = await response.json();
        const house = Array.isArray(data) ? data[0] : {};
        setHouseData(house);
      } catch (error) {
        console.error("Error fetching house details:", error);
      }
    };

    fetchHouseDetail();

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
          router.push("/unauthorized"); // Or display a message
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push(authPath); // Redirect to login if token is invalid
      }
    } else {
      // Store the current path for redirection after login
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push(authPath); // Redirect to login if no token
    }
  };

  if (!houseData) {
    return <div>Loading...</div>;
  }

  // Default values
  const defaultValues = {
    name: `${house_id.id}`,
    image_urls: [
      "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
    ],
    category: "Unknown",
    location: "Unknown",
    address: "Unknown",
    size: "N/A",
    condition: "Unknown",
    bedroom: "N/A",
    toilet: "N/A",
    bathroom: "N/A",
    property_type: "Unknown",
    furnish_status: "Unknown",
    parking_space: false,
    price: 0,
    negotiability: "Unknown",
    facilities: ["N/A"],
    description: "No description available",
  };

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
        <h1 className="text-3xl font-bold mb-4">{mergedData.name}</h1>
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
                <strong>Toilets:</strong> {mergedData.toilet}
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
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Additional Information
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Price:</strong> {mergedData.price.toLocaleString()} ETB{" "}
                {mergedData.category === "rent" ? "/ month" : ""}
              </li>
              <li>
                <strong>Negotiability:</strong> {mergedData.negotiability}
              </li>
              <li>
                <strong>Facilities:</strong> {mergedData.facilities.join(", ")}
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
            <p>{mergedData.description}</p>
            {isAuthenticatedUser ? (
              <button
                onClick={handleRequestVisitClick}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request to Visit
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.setItem(
                    "redirectAfterLogin",
                    window.location.pathname
                  );
                  router.push(authPath);
                }}
                className="mt-8 px-6 py-3 bg-gray-400 text-white rounded-md cursor-pointer"
              >
                Login to Request Visit
              </button>
            )}
          </div>
        </div>
      </main>
      {showVisitForm && (
        <VisitRequestForm
          onClose={() => setShowVisitForm(false)}
          onSubmit={() => {}}
        />
      )}
    </div>
  );
}
