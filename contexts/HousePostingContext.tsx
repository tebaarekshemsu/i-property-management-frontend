"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

interface HousePostingData {
  category: "sell" | "rent"
  location: string
  address: string
  size: number
  condition: "fairly used" | "newly built" | "old and renovated" | ""
  bedrooms: number
  toilets: number
  listedBy: "owner" | "agent"
  propertyType: "apartment" | "condominium"
  furnishStatus: "furnished" | "semi furnished" | "unfurnished"
  bathrooms: number
  facilities: string[]
  description: string
  price: number
  negotiability: "open to negotiation" | "not negotiable"
  parkingSpace: boolean
  photos: File[]
  name: string
  phoneNumber: string
  videoLink: string
}

interface HousePostingContextType {
  formData: HousePostingData
  updateFormData: (data: Partial<HousePostingData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

const defaultFormData: HousePostingData = {
  category: "rent",
  location: "",
  address: "",
  size: 0,
  condition: "",
  bedrooms: 1,
  toilets: 1,
  listedBy: "owner",
  propertyType: "apartment",
  furnishStatus: "unfurnished",
  bathrooms: 1,
  facilities: [],
  description: "",
  price: 0,
  negotiability: "open to negotiation",
  parkingSpace: false,
  photos: [],
  name: "",
  phoneNumber: "",
  videoLink: "",
}

const HousePostingContext = createContext<HousePostingContextType | undefined>(undefined)

export const HousePostingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<HousePostingData>(defaultFormData)
  const [currentStep, setCurrentStep] = useState(1)

  const updateFormData = (data: Partial<HousePostingData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }))
  }

  return (
    <HousePostingContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep }}>
      {children}
    </HousePostingContext.Provider>
  )
}

export const useHousePosting = () => {
  const context = useContext(HousePostingContext)
  if (context === undefined) {
    throw new Error("useHousePosting must be used within a HousePostingProvider")
  }
  return context
}

