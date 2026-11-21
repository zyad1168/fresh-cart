
import { IProducts } from "@/interfaces/products";
import Link from "next/link";
import { BiShowAlt } from "react-icons/bi";
import { FaArrowsRotate } from "react-icons/fa6";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import MyAddToCart from "../myAddToCart/MyAddToCart";
import WishlistButton from "@/components/wishlistButton/WishlistButton";


export default function SingleProduct({ product }: { product: IProducts }) {
  const discountPercentage = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : null;

  return (
    <div
      key={product.id}
      className="mb-10 group bg-white rounded-2xl border m-1 border-gray-100 p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-97.5 relative overflow-hidden w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)]"
    >
      <div className="relative w-full">
        {discountPercentage && (
          <span className="absolute top-2 left-2 z-10 bg-red-500/90 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
            -{discountPercentage}%
          </span>
        )}

        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          <WishlistButton productId={product.id} />

          <button
            type="button"
            className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-white shadow-sm transition-all hover:scale-110 active:scale-95 cursor-pointer"
            title="مقارنة"
          >
            <FaArrowsRotate className="text-xs" />
          </button>

          <Link
            href={`/products/${product.id}`}
            className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-white shadow-sm transition-all hover:scale-110 active:scale-95"
            title="معاينة السلعة"
          >
            <BiShowAlt className="text-base" />
          </Link>
        </div>

        <div className="relative w-full h-45 bg-gray-50/60 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={400}
            height={400}
            unoptimized
            className="object-contain w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </div>

        <span className="text-[11px] font-semibold text-emerald-600 tracking-wider uppercase mb-0.5 block truncate">
          {product.category?.name || "Fashion"}
        </span>

        <h3
          className="text-xs font-bold text-gray-800 leading-snug line-clamp-2 h-8 group-hover:text-emerald-600 transition-colors"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5 my-1.5">
          <Rating
            style={{ maxWidth: 65 }}
            value={product.ratingsAverage}
            readOnly
          />
          <span className="text-[11px] font-bold text-gray-700">
            {product.ratingsAverage}
          </span>
          <span className="text-[11px] text-gray-400">
            ({product.ratingsQuantity})
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <div className="flex flex-col">
          {product.priceAfterDiscount ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-emerald-600">
                {product.priceAfterDiscount}
              </span>
              <span className="text-[10px] font-bold text-emerald-600">EGP</span>
              <span className="text-xs text-gray-400 line-through font-normal">
                {product.price}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-gray-900">
                {product.price}
              </span>
              <span className="text-[10px] font-bold text-gray-500">EGP</span>
            </div>
          )}
        </div>

        <MyAddToCart id={product.id} isProductDertails={false} />
      </div>
    </div>
  );
}