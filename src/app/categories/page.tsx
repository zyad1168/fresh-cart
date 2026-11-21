"use client";
import { Category, IProducts } from "@/interfaces/products";
import SingleProduct from "@/app/_components/singleProduct/SingleProduct";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryProducts, setCategoryProducts] = useState<IProducts[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/categories",
        );
        const data = await res.json();
        setCategories(data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  async function handleSelectCategory(category: Category) {
    setSelectedCategory(category);
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${category._id}`,
      );
      const data = await res.json();
      setCategoryProducts(data?.data || []);
    } catch (error) {
      console.log(error);
      setCategoryProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="w-[90%] max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="inline-block">
            <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
              FreshCart Store
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 pb-2">
              Categories
            </h1>
            <span className="block h-1 w-full rounded-full bg-linear-to-r from-emerald-600 via-emerald-400 to-teal-200"></span>
          </div>

          <p className="text-xs md:text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              {categories.length}
            </span>{" "}
            categories available
          </p>
        </div>

        {loadingCategories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 animate-pulse">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="h-44 bg-gray-200/80 w-full" />
                <div className="p-3.5">
                  <div className="h-4 bg-gray-200/80 rounded w-2/3 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((category: Category) => {
              const isSelected = selectedCategory?._id === category._id;
              return (
                <div
                  key={category._id}
                  onClick={() => handleSelectCategory(category)}
                  className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border ${
                    isSelected
                      ? "border-emerald-500 ring-2 ring-emerald-500/20"
                      : "border-gray-200 hover:border-emerald-400"
                  }`}
                >
                  <div className="h-44 w-full bg-gray-50 overflow-hidden flex items-center justify-center p-3">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={220}
                      height={180}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-3.5 text-center border-t border-gray-100">
                    <h2
                      className={`text-sm font-bold transition-colors ${
                        isSelected
                          ? "text-emerald-600"
                          : "text-gray-800 group-hover:text-emerald-600"
                      }`}
                    >
                      {category.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedCategory && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="inline-block">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 pb-2">
                  {selectedCategory.name} Products
                </h2>
                <span className="block h-1 w-full rounded-full bg-linear-to-r from-emerald-600 via-emerald-400 to-teal-200"></span>
              </div>

              <span className="text-xs md:text-sm text-gray-500">
                <span className="font-semibold text-gray-800">
                  {categoryProducts.length}
                </span>{" "}
                items
              </span>
            </div>

            {loadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-white border border-gray-200 rounded-2xl"
                  />
                ))}
              </div>
            ) : categoryProducts.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-sm text-gray-500">
                No products found in {selectedCategory.name}.
              </div>
            ) : (
              <div className="flex flex-wrap gap-y-3">
                {categoryProducts.map((product: IProducts) => {
                  return <SingleProduct product={product} key={product.id} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}