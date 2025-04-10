"use client";

import { useHousePosting } from "@/contexts/HousePostingContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";

export function AdditionalInfo() {
  const {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    formErrors,
    setFormErrors,
  } = useHousePosting();

  const facilities = [
    "Elevator",
    "Security",
    "Parking",
    "Garden",
    "Gym",
    "Swimming Pool",
  ];

  const handleFacilityChange = (facility: string, checked: boolean) => {
    const updatedFacilities = checked
      ? [...formData.facilities, facility]
      : formData.facilities.filter((f) => f !== facility);
    updateFormData({ facilities: updatedFacilities });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 20) {
      errors.description = "Description should be at least 20 characters";
    }

    if (!formData.price || formData.price <= 0) {
      errors.price = "Price must be greater than 0";
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
      <h2 className="text-2xl font-bold">Additional Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facilities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {facilities.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={facility}
                  checked={formData.facilities.includes(facility)}
                  onCheckedChange={(checked) =>
                    handleFacilityChange(facility, checked === true)
                  }
                />
                <Label htmlFor={facility}>{facility}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.description
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.description} />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length} characters (minimum 20)
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.price || ""}
            onChange={(e) => updateFormData({ price: Number(e.target.value) })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
              formErrors.price
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-300"
            }`}
          />
          <FormError message={formErrors.price} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Negotiability
          </label>
          <select
            value={formData.negotiability}
            onChange={(e) =>
              updateFormData({
                negotiability: e.target.value as
                  | "open to negotiation"
                  | "not negotiable",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="open to negotiation">Open to negotiation</option>
            <option value="not">Not negotiable</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="parkingSpace"
            checked={formData.parkingSpace}
            onCheckedChange={(checked) =>
              updateFormData({ parkingSpace: checked === true })
            }
          />
          <Label htmlFor="parkingSpace">Parking Space</Label>
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
