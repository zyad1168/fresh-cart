import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/interfaces/products";
import { FaTag } from "react-icons/fa";

interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Brand[];
}

async function getBrands(): Promise<Brand[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];
    const data: BrandsResponse = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export default async function Brands() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-linear-to-r from-purple-600 via-purple-500 to-indigo-600 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="w-full">
          <div className="text-xs text-purple-200 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Brands</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl shadow-inner text-white text-2xl flex items-center justify-center">
              <FaTag />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Top Brands
              </h1>
              <p className="text-purple-100 text-sm mt-1">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        {brands.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xs border border-gray-100">
            <p className="text-gray-500 text-lg">
              No brands available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-between shadow-xs hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative w-full h-28 bg-gray-50/80 rounded-xl flex items-center justify-center overflow-hidden mb-3 group-hover:bg-purple-50/50 transition-colors">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-contain p-3 group-hover:scale-108 transition-transform duration-300 ease-out"
                  />
                </div>

                <div className="text-center w-full">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {brand.name}
                  </h3>
                  <span className="text-[11px] font-medium text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity block mt-1">
                    View Products →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
