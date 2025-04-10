"use client";

import { useHousePosting } from "@/contexts/HousePostingContext";

export function FormProgress() {
  const { currentStep, totalSteps, goToStep } = useHousePosting();

  const steps = [
    { number: 1, name: "Basic Info" },
    { number: 2, name: "Property Details" },
    { number: 3, name: "Additional Info" },
    { number: 4, name: "Contact Info" },
    { number: 5, name: "Photos" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <button
              onClick={() => goToStep(step.number)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                currentStep === step.number
                  ? "bg-blue-600 text-white"
                  : currentStep > step.number
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {step.number}
            </button>
            <span className="text-xs mt-1 hidden sm:block">{step.name}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
