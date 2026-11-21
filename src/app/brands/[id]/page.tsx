import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProducts } from '@/interfaces/products';
import SingleProduct from '@/app/_components/singleProduct/SingleProduct';
import { FaTag } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface ProductsResponse {
  results: number;
  data: IProducts[];
}

async function getProducts(brandId: string, clearFilter?: string): Promise<IProducts[]> {
  try {
    const url = clearFilter === 'true' 
      ? 'https://ecommerce.routemisr.com/api/v1/products'
      : `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`;

    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(8000)
    });

    if (!res.ok) return [];
    const data: ProductsResponse = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getSingleBrand(brandId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000)
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching brand details:', error);
    return null;
  }
}

export default async function BrandDetailsPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>, 
  searchParams: Promise<{ clear?: string }> 
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const id = resolvedParams.id;
  const isCleared = resolvedSearchParams.clear === 'true';

  const products = await getProducts(id, isCleared ? 'true' : 'false');
  const brand = await getSingleBrand(id);

  return (
    <div className="min-h-screen bg-gray-50/60 pb-20">
      <div className="bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="w-full">
          <div className="text-xs text-emerald-100 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-90">Home</Link> / 
            <Link href="/brands" className="hover:underline opacity-90">Brands</Link> / 
            <span className="text-white font-semibold">{isCleared ? 'All Products' : (brand?.name || 'Brand')}</span>
          </div>

          <div className="flex items-center gap-6">
            {!isCleared && brand?.image ? (
              <div className="bg-white p-3.5 rounded-2xl shadow-sm w-24 h-24 relative flex items-center justify-center border border-emerald-400/30">
                <Image 
                  src={brand.image} 
                  alt={brand.name || 'Brand Logo'} 
                  fill 
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-sm w-24 h-24 flex items-center justify-center text-white text-3xl font-bold border border-white/30">
                📦
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {isCleared ? 'All Products' : (brand?.name || 'Brand Products')}
              </h1>
              <p className="text-emerald-100 text-sm mt-1.5 opacity-95">
                {isCleared ? 'Explore our complete product collection' : `Shop exclusive ${brand?.name} products`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
        {!isCleared && brand?.name && (
          <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs w-fit">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter:</span>
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-100 px-3.5 py-1.5 rounded-full text-sm font-medium">
              <FaTag className="text-xs text-purple-500" />
              <span>{brand.name}</span>
              <Link href={`/brands/${id}?clear=true`} title="Remove filter" className="hover:text-red-500 transition ml-1">
                <IoClose className="text-base" />
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm font-medium">
            Showing <span className="text-gray-900 font-bold">{products.length}</span> products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xs border border-gray-100">
            <p className="text-gray-500 text-lg font-medium">No products found or connection timed out.</p>
          </div>
        ) : (
          <div className="flex flex-wrap -m-1">
            {products.map((product) => (
              <SingleProduct key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}