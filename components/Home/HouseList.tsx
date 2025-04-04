"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HouseCard } from "../reusable/HouseCard";
import { ShimmerCard } from "../reusable/ShimmerCard";
import Paths from "@/lib/path";
import {
  Home,
  Calendar,
  Shield,
  UserCog,
  BarChart3,
  ClipboardCheck,
} from "lucide-react";

export function HouseList() {
  const [houses, setHouses] = useState<any[]>([]);
  let placeholder = [{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },
  {
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  },{
    "id": 1,
    "price": 14561,
    "description": "a greate house for us",
    "imageUrl":"https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp"
  }];
  const [loading, setLoading] = useState(true); // Add loading state

  // State for the service carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Services data with icons
  const services = [
    {
      icon: <Home className="w-8 h-8 text-blue-500" />,
      title: "House Listings",
      description:
        "Browse houses for rent or sale with detailed descriptions and images.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      title: "Property Visits & Requests",
      description: "Schedule property visits and receive real-time updates.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Secure Transactions",
      description: "Track your rental and purchase history securely.",
    },
    {
      icon: <UserCog className="w-8 h-8 text-blue-500" />,
      title: "Landlord Management",
      description:
        "List and manage properties with full control over pricing and availability.",
    },
    {
      icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />,
      title: "Admin & Financial Oversight",
      description:
        "Admins track listings, approve properties, and manage financial reports.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Performance Insights",
      description: "Real-time analytics to track rental and sales performance.",
    },
  ];

  // Fetch houses data
  useEffect(() => {
    async function fetchHouses() {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/vip-houses");
        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        setHouses(data.featured_houses);
      } catch (error) {
        setHouses(placeholder)
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHouses();
  }, []);

  // Setup automatic carousel - this will run on component mount and when currentSlide changes
  useEffect(() => {
    // Clear any existing timeout to prevent multiple timers
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }

    // Set up the next slide change
    autoPlayRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000); // Change slide every 4 seconds

    // Cleanup on unmount or when currentSlide changes
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, services.length]);

  // Calculate which slides to show (for desktop we'll show 3 at a time)
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % services.length;
      slides.push({ ...services[index], index });
    }
    return slides;
  };

  return (
    <>
      {/* Services Section with Automatic Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive services designed to make house renting
              and selling simple, efficient, and stress-free.
            </p>
          </motion.div>

          {/* Carousel container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Desktop view - show multiple slides */}
            <div className="hidden md:block">
              <div className="flex justify-between items-stretch gap-6">
                <AnimatePresence mode="wait">
                  {getVisibleSlides().map((service, idx) => (
                    <motion.div
                      key={`${service.title}-${service.index}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1 bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm"
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div className="mb-4 p-3 bg-blue-50 rounded-full">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 flex-grow">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile view - show single slide */}
            <div className="md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-blue-50 rounded-full">
                      {services[currentSlide].icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {services[currentSlide].title}
                    </h3>
                    <p className="text-gray-600">
                      {services[currentSlide].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {services.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    idx === currentSlide ||
                    idx === (currentSlide + 1) % services.length ||
                    idx === (currentSlide + 2) % services.length
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href={Paths.userHouseListPath()}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md shadow-md transition-all duration-300 hover:shadow-lg">
                Contact Us
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <div className="py-14 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Listings
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ShimmerCard key={index} />
                ))
              : houses.map((house) => <HouseCard key={house.id} {...house} />)}
          </div>
        </div>
      </div>
    </>
  );
}
