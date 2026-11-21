

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
    
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="w-full animate-pulse">
          <div className="h-4 bg-white/30 rounded w-32 mb-4"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/30 rounded-2xl"></div>
            <div>
              <div className="h-8 bg-white/30 rounded w-48 mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-64"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xs animate-pulse"
            >
              <div className="w-full h-28 bg-gray-100 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}