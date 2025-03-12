import Paths from "@/path"
import Image from "next/image"
import Link from "next/link"

interface HouseCardProps {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  type: "rent" | "sell"
  bedrooms: number
  bathrooms: number
  location: string
}

export function HouseCard({
  id,
  name,
  price,
  description,
  imageUrl,
  type,
  bedrooms,
  bathrooms,
  location,
}: HouseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl || "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"}
          alt={name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${type === "rent" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}
        >
          {type === "rent" ? "For Rent" : "For Sale"}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">
          ${price.toLocaleString()} {type === "rent" ? "/ month" : ""}
        </p>
        <p className="text-gray-500 mb-2">{description}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{bedrooms} bd</span>
          <span>{bathrooms} ba</span>
          <span>{location}</span>
        </div>
        <Link
          href={`${Paths.userHouseDetailPath(id)}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

