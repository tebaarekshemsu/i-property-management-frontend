import { useHousePosting } from "@/contexts/HousePostingContext"

export function ContactInfo() {
  const { formData, updateFormData } = useHousePosting()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Listed By</label>
        <select
          value={formData.listedBy}
          onChange={(e) => updateFormData({ listedBy: e.target.value as "owner" | "agent" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="owner">Owner</option>
          <option value="agent">Agent</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Video Link (Optional)</label>
        <input
          type="url"
          value={formData.videoLink}
          onChange={(e) => updateFormData({ videoLink: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  )
}

