import Image from "next/image"
import Link from "next/link"
import Paths from "@/lib/path"
export function HeroSection() {
  return (
    <div className="relative h-[70vh] flex items-center justify-center">
      <Image
        src="https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
        alt="Beautiful home"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
        <p className="text-xl mb-8">Discover the perfect place to rent or buy with our extensive listings.</p>
        <Link href={Paths.userHouseListPath()}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Explore Homes</button>
        </Link>
      </div>
    </div>
  )
}

