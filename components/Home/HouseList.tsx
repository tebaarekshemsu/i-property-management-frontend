import { HouseCard } from "../reusable/HouseCard"

const houses = [
  {
    id: "1",
    name: "Cozy Cottage",
    price: 1500,
    description: "A charming cottage with a beautiful garden.",
    imageUrl: "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  },
  {
    id: "2",
    name: "Modern Apartment",
    price: 2000,
    description: "Sleek and stylish apartment in the city center.",
    imageUrl: "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  },
  {
    id: "3",
    name: "Suburban Family Home",
    price: 2500,
    description: "Spacious home perfect for families.",
    imageUrl: "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  },
  {
    id: "4",
    name: "Luxury Penthouse",
    price: 5000,
    description: "High-end penthouse with panoramic views.",
    imageUrl: "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  },
  {
    id: "5",
    name: "Beachfront Villa",
    price: 3500,
    description: "Beautiful villa with direct beach access.",
    imageUrl: "https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp",
  },
]

export function HouseList() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houses.map((house) => (
            <HouseCard key={house.id} {...house} />
          ))}
        </div>
      </div>
    </div>
  )
}

