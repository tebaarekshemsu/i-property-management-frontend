"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  HousePostingProvider,
  useHousePosting,
} from "@/contexts/HousePostingContext";
import { BasicInfo } from "@/components/house-posting/BasicInfo";
import { PropertyDetails } from "@/components/house-posting/PropertyDetails";
import { AdditionalInfo } from "@/components/house-posting/AdditionalInfo";
import { ContactInfo } from "@/components/house-posting/ContactInfo";
import { PhotoUpload } from "@/components/house-posting/PhotoUpload";
import { FormProgress } from "@/components/house-posting/FormProgress";
import { UserGuard } from "@/components/Guards/UserGuard"; // Import the UserGuard

function FormStep() {
  const { currentStep } = useHousePosting();

  // Render the appropriate form step based on currentStep
  switch (currentStep) {
    case 1:
      return <BasicInfo />;
    case 2:
      return <PropertyDetails />;
    case 3:
      return <AdditionalInfo />;
    case 4:
      return <ContactInfo />;
    case 5:
      return <PhotoUpload />;
    default:
      return <BasicInfo />;
  }
}

function HousePostingForm() {
  const router = useRouter(); // Initialize useRouter for navigation

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/user")} // Navigate to the home page
        className="mb-4 flex items-center text-blue-700 font-bold hover:text-blue-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a1 1 0 01-.707-.293l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 10l6.293 6.293A1 1 0 0110 18z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-6">Post Your Property</h1>
      <FormProgress />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <FormStep />
      </div>
    </div>
  );
}

export default function HousePostingPage() {
  return (
    <UserGuard>
      {/* Wrap the content with UserGuard */}
      <HousePostingProvider>
        <HousePostingForm />
      </HousePostingProvider>
    </UserGuard>
  );
}
