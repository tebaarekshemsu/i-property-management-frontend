import Paths from "@/lib/path"
import Image from "next/image"
import Link from "next/link"

interface HouseCardProps {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
}

export function HouseCard({ id, name, price, description, imageUrl }: HouseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">${price.toLocaleString()} / month</p>
        <p className="text-gray-500 mb-4">{description}</p>
        <Link
          href={`${Paths.userHouseDetailPath(id)}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

