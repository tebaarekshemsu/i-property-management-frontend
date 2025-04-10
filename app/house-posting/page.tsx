"use client";

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
  return (
    <div className="max-w-2xl mx-auto p-6">
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
    <HousePostingProvider>
      <HousePostingForm />
    </HousePostingProvider>
  );
}
