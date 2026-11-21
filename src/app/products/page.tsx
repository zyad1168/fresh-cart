// "use client"

import { IProducts } from "@/interfaces/products";
import SingleProduct from "../_components/singleProduct/SingleProduct";
import { getAllProducts } from "@/api/products.api";

export default async function Products() {
  const data = await getAllProducts();

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="w-[90%] max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="inline-block">
            <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
              FreshCart Store
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 pb-2">
              Shop All Products
            </h1>
            <span className="block h-1 w-full rounded-full bg-linear-to-r from-emerald-600 via-emerald-400 to-teal-200"></span>
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {Array.isArray(data) ? data.length : 0}
            </span>{" "}
            products
          </p>
        </div>

        <div className="flex flex-wrap gap-y-3">
          {data.map((product: IProducts) => {
            return <SingleProduct product={product} key={product.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
