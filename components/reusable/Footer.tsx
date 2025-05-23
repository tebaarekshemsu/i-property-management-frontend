import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              We are dedicated to helping you find the perfect home for rent or
              purchase.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/listings"
                  className="text-gray-300 hover:text-white"
                >
                  Listings
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <section id="contact">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">123 Main St, AA, ETH 12345</p>
              <p className="text-gray-300">Phone: (251) 456-7890</p>
              <p className="text-gray-300">Email: info@homerentalcompany.com</p>
            </div>
          </section>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 I Property Management Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
