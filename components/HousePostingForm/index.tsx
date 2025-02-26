"use client"

import { useState } from "react"
import { BasicInfo } from "./BasicInfo"
import { PropertyDetails } from "./PropertyDetails"
import { AdditionalInfo } from "./AdditionalInfo"
import { ContactInfo } from "./ContactInfo"
import { PhotoUpload } from "./PhotoUpload"
import { HousePostingProvider } from "@/contexts/HousePostingContext"

export function HousePostingForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { title: "Basic Info", component: BasicInfo },
    { title: "Property Details", component: PropertyDetails },
    { title: "Additional Info", component: AdditionalInfo },
    { title: "Contact Info", component: ContactInfo },
    { title: "Photo Upload", component: PhotoUpload },
  ]

  const CurrentStepComponent = steps[currentStep - 1].component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the formData to your backend
    console.log("Form submitted")
    // You might want to show a success message and redirect the user
  }

  return (
    <HousePostingProvider>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Post a House</h1>
        <div className="mb-6">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-center ${index + 1 === currentStep ? "font-bold" : "text-gray-500"}`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        <CurrentStepComponent />
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button onClick={handlePrevious} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Previous
            </button>
          )}
          <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {currentStep === steps.length ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </HousePostingProvider>
  )
}

