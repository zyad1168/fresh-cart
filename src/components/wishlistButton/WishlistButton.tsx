"use client";

import { FaHeart } from "react-icons/fa6";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ productId }: { productId: string }) {
  const { isInWishlist, toggleWishlist, loadingId } = useWishlist();
  const active = isInWishlist(productId);
  const isLoading = loadingId === productId;

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={() => toggleWishlist(productId)}
      aria-pressed={active}
      title={active ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-60 ${
        active
          ? "bg-rose-50 border-rose-200 text-rose-500"
          : "bg-white/80 backdrop-blur-md border-gray-100 text-gray-500 hover:text-rose-500 hover:bg-white"
      }`}
    >
      <FaHeart className={`text-xs ${active ? "text-rose-500" : ""}`} />
    </button>
  );
}