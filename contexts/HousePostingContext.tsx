"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import toast from "react-hot-toast"; // ✅ Import toast

// Define the form data type
export type HousePostingFormData = {
  category: "sell" | "rent";
  location: string;
  address: string;
  size: number;

  condition: "fairly used" | "newly built" | "old and renovated" | "";
  bedrooms: number;
  toilets: number;
  bathrooms: number;
  propertyType: "apartment" | "condominium";
  furnishStatus: "furnished" | "semi furnished" | "unfurnished";

  facilities: string[];
  description: string;
  price: number;
  negotiability: "open to negotiation" | "not negotiable";
  parkingSpace: boolean;

  listedBy: "owner" | "agent";
  name: string;
  phoneNumber: string;
  videoLink: string;

  photos: File[];
};

// Initial form data
const initialFormData: HousePostingFormData = {
  category: "sell",
  location: "",
  address: "",
  size: 0,

  condition: "",
  bedrooms: 0,
  toilets: 0,
  bathrooms: 0,
  propertyType: "apartment",
  furnishStatus: "unfurnished",

  facilities: [],
  description: "",
  price: 0,
  negotiability: "open to negotiation",
  parkingSpace: false,

  listedBy: "owner",
  name: "",
  phoneNumber: "",
  videoLink: "",

  photos: [],
};

// Context type
type HousePostingContextType = {
  formData: HousePostingFormData;
  updateFormData: (data: Partial<HousePostingFormData>) => void;
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
  validateCurrentStep: () => boolean;
  formErrors: Record<string, string>;
  setFormErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  clearErrors: () => void;
};

// Create context
const HousePostingContext = createContext<HousePostingContextType | undefined>(
  undefined
);

// Provider component
export function HousePostingProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] =
    useState<HousePostingFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;

  const updateFormData = (data: Partial<HousePostingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const clearErrors = () => {
    setFormErrors({});
  };

  const validateCurrentStep = (): boolean => {
    return true;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      clearErrors();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      clearErrors();
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      clearErrors();
    }
  };

  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  const submitForm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formDataToSubmit = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photos") {
          if (key === "facilities") {
            formDataToSubmit.append(key, JSON.stringify(value));
          } else if (typeof value === "boolean") {
            formDataToSubmit.append(key, value.toString());
          } else {
            formDataToSubmit.append(key, String(value));
          }
        }
      });

      formData.photos.forEach((photo) => {
        formDataToSubmit.append("photos", photo);
      });

      const apiUrl = "http://localhost:8000/user/house-post";

      // Retrieve the token from localStorage (or wherever it's stored)
      const token = localStorage.getItem("token");

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSubmit,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to submit form: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("API Response:", result);

      toast.success("Form submitted successfully!"); // ✅ Toast success
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);

      if (
        fetchError instanceof TypeError &&
        fetchError.message.includes("Failed to fetch")
      ) {
        toast.error(
          `Connection error: Make sure your FastAPI server is running.`
        );
      } else {
        toast.error(
          fetchError instanceof Error
            ? fetchError.message
            : "An unknown error occurred"
        );
      }

      setSubmitError(
        fetchError instanceof Error
          ? fetchError.message
          : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    formData,
    updateFormData,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isLastStep,
    isFirstStep,
    submitForm,
    isSubmitting,
    submitError,
    validateCurrentStep,
    formErrors,
    setFormErrors,
    clearErrors,
  };

  return (
    <HousePostingContext.Provider value={value}>
      {children}
    </HousePostingContext.Provider>
  );
}

// Custom hook
export function useHousePosting() {
  const context = useContext(HousePostingContext);
  if (context === undefined) {
    throw new Error(
      "useHousePosting must be used within a HousePostingProvider"
    );
  }
  return context;
}
