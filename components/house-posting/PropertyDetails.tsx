"use client";

import { useHousePosting } from "@/contexts/HousePostingContext";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

export function PropertyDetails() {
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

    if (!formData.condition) {
      errors.condition = "Condition is required";
    }

    if (formData.bedrooms <= 0) {
      errors.bedrooms = "Number of bedrooms must be greater than 0";
    }

    if (formData.toilets <= 0) {
      errors.toilets = "Number of toilets must be greater than 0";
    }

    if (formData.bathrooms <= 0) {
      errors.bathrooms = "Number of bathrooms must be greater than 0";
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
      <h2 className="text-2xl font-bold">Property Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Condition <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.condition}
            onChange={(e) =>
              updateFormData({
                condition: e.target.value as
                  | "fairly used"
                  | "newly built"
                  | "old and renovated"
                  | "",
              })
            }
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.condition
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          >
            <option value="">Select condition</option>
            <option value="fairly used">Fairly used</option>
            <option value="newly built">Newly built</option>
            <option value="old and renovated">Old and renovated</option>
          </select>
          <FormError message={formErrors.condition} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bedrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.bedrooms || ""}
            onChange={(e) =>
              updateFormData({ bedrooms: Number(e.target.value) })
            }
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.bedrooms
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.bedrooms} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Toilets <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.toilets || ""}
            onChange={(e) =>
              updateFormData({ toilets: Number(e.target.value) })
            }
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.toilets
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.toilets} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bathrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.bathrooms || ""}
            onChange={(e) =>
              updateFormData({ bathrooms: Number(e.target.value) })
            }
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.bathrooms
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.bathrooms} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) =>
              updateFormData({
                propertyType: e.target.value as "apartment" | "condominium",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="apartment">Apartment</option>
            <option value="condominium">Condominium</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Furnish Status
          </label>
          <select
            value={formData.furnishStatus}
            onChange={(e) =>
              updateFormData({
                furnishStatus: e.target.value as
                  | "furnished"
                  | "semi furnished"
                  | "unfurnished",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="furnished">Furnished</option>
            <option value="semi furnished">Semi furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
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
