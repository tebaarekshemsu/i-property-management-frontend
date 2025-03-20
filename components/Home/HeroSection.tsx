import Image from "next/image"
import Link from "next/link"
import Paths from "@/lib/path"
export function HeroSection() {
  return (
    <div className="relative flex items-center justify-center  from-gray-100 to-white py-16 px-8">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 relative">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
              alt="Beautiful home"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out hover:scale-105 opacity-90"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Discover the perfect place to rent or buy with our extensive
            listings. Let us help you find your next home.
          </p>
          <Link href={Paths.userHouseListPath()}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
              Explore Homes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
