import { useHousePosting } from "@/contexts/HousePostingContext"

export function AdditionalInfo() {
  const { formData, updateFormData } = useHousePosting()

  const facilities = ["Elevator", "Security", "Parking", "Garden", "Gym", "Swimming Pool"]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Additional Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Facilities</label>
        <div className="mt-2 space-y-2">
          {facilities.map((facility) => (
            <label key={facility} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={formData.facilities.includes(facility)}
                onChange={(e) => {
                  const updatedFacilities = e.target.checked
                    ? [...formData.facilities, facility]
                    : formData.facilities.filter((f) => f !== facility)
                  updateFormData({ facilities: updatedFacilities })
                }}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{facility}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => updateFormData({ price: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Negotiability</label>
        <select
          value={formData.negotiability}
          onChange={(e) =>
            updateFormData({ negotiability: e.target.value as "open to negotiation" | "not negotiable" })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="open to negotiation">Open to negotiation</option>
          <option value="not negotiable">Not negotiable</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Parking Space</label>
        <input
          type="checkbox"
          checked={formData.parkingSpace}
          onChange={(e) => updateFormData({ parkingSpace: e.target.checked })}
          className="mt-1 h-5 w-5 text-blue-600"
        />
      </div>
    </div>
  )
}

