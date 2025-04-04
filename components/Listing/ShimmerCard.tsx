// components/Listing/ShimmerCard.tsx
export function ShimmerCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-48 bg-gray-300"></div>
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between text-sm text-gray-300">
          <span className="h-4 w-12 bg-gray-300 rounded"></span>
          <span className="h-4 w-12 bg-gray-300 rounded"></span>
          <span className="h-4 w-20 bg-gray-300 rounded"></span>
        </div>
        <div className="mt-4 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
