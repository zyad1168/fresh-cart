"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";

import { FaHeart, FaTrashCan } from "react-icons/fa6";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import MyAddToCart from "../_components/myAddToCart/MyAddToCart";

export default function WishlistPage() {
  const {
    wishlistItems,
    wishlistCount,
    loadingWishlist,
    loadingId,
    toggleWishlist,
  } = useWishlist();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
            <FaHeart className="text-base" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">My Wishlist</h1>
            <p className="text-xs text-slate-500 font-medium">
              {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/70 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>

      {loadingWishlist ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="h-88 rounded-2xl bg-slate-100 animate-pulse border border-slate-200/60"
            />
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-xs max-w-lg mx-auto my-8">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-2xl" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlistItems.map((product) => {
            const productId =
              product.id || (product as { _id?: string })._id || "";
            const isRemoving = loadingId === productId;

            return (
              <div
                key={productId}
                className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-96"
              >
                <div>
                  <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3">
                    <Link
                      href={`/products/${productId}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={300}
                        height={300}
                        unoptimized
                        className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <button
                      type="button"
                      disabled={isRemoving}
                      onClick={() => toggleWishlist(productId)}
                      title="Remove from wishlist"
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200/70 flex items-center justify-center shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <FaTrashCan className="text-xs" />
                    </button>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-600 uppercase block truncate mb-0.5">
                    {product.category?.name || "Fashion"}
                  </span>

                  <Link href={`/products/${productId}`}>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2 h-8 hover:text-emerald-600 transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-slate-900">
                      {product.priceAfterDiscount ?? product.price}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      EGP
                    </span>
                  </div>

                  <MyAddToCart id={productId} isProductDertails={false} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}