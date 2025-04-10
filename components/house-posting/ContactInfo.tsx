"use client";

import { useHousePosting } from "@/contexts/HousePostingContext";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

export function ContactInfo() {
  const {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    formErrors,
    setFormErrors,
  } = useHousePosting();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      errors.phoneNumber = "Please enter a valid phone number (10-15 digits)";
    }

    if (
      formData.videoLink &&
      !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(
        formData.videoLink
      )
    ) {
      errors.videoLink = "Please enter a valid YouTube link or leave it empty";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Listed By
          </label>
          <select
            value={formData.listedBy}
            onChange={(e) =>
              updateFormData({ listedBy: e.target.value as "owner" | "agent" })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="owner">Owner</option>
            <option value="agent">Agent</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.name} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.phoneNumber
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.phoneNumber} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Video Link (Optional)
          </label>
          <input
            type="url"
            value={formData.videoLink}
            onChange={(e) => updateFormData({ videoLink: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.videoLink
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
            placeholder="https://youtube.com/..."
          />
          <FormError message={formErrors.videoLink} />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
