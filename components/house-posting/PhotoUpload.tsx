"use client";

import type React from "react";

import { useHousePosting } from "@/contexts/HousePostingContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FormError } from "@/components/ui/form-error";

export function PhotoUpload() {
  const {
    formData,
    updateFormData,
    prevStep,
    submitForm,
    isSubmitting,
    submitError,
    formErrors,
    setFormErrors,
  } = useHousePosting();

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Generate preview URLs when component mounts or when photos change
  useEffect(() => {
    const urls = formData.photos.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup function to revoke object URLs
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.photos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.photos.length > 7) {
      alert("You can upload a maximum of 7 photos");
      return;
    }
    updateFormData({ photos: [...formData.photos, ...files] });
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...formData.photos];
    newPhotos.splice(index, 1);
    updateFormData({ photos: newPhotos });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (formData.photos.length < 4) {
      errors.photos = "Please upload at least 4 photos";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await submitForm();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Photo Upload</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Photos (4-7 photos) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.photos.length}/7 photos uploaded. Minimum 4 required.
          </p>
          <FormError message={formErrors.photos} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-md border"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {submitError && (
          <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            {submitError}
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || formData.photos.length < 4}
        >
          {isSubmitting ? "Submitting..." : "Submit Listing"}
        </Button>
      </div>
    </div>
  );
}
