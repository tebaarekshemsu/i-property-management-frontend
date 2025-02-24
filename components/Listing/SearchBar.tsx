import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for houses..."
        className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  )
}

