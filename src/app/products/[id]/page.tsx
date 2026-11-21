"use client";
import MyAddToCart from "@/app/_components/myAddToCart/MyAddToCart";
import { Button } from "@/components/ui/button";
import { IProducts } from "@/interfaces/products";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  Share2,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { getAllProducts } from "@/api/products.api";
import SingleProduct from "@/app/_components/singleProduct/SingleProduct";

export default function ProductDetails() {
  const [count, setCount] = useState(1);
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState<IProducts | undefined>(
    undefined,
  );
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [allProducts ,setAllProducts] = useState([])

  async function getProductDetails() {
    await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(async (res) => {
        const data = await res.json();

        getRelatedProducts(data.data.category._id);

        setProductDetails(data.data);
        setSelectedImage(data.data.imageCover);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, []);

 if (productDetails === undefined) {
    return (
      <div className="bg-gray-50 p-4 md:p-6 flex justify-center items-center">
        <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start animate-pulse">
          <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-4">
            <div className="w-full h-80 bg-gray-200/80 rounded-2xl" />
            <div className="flex gap-2.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 bg-gray-200/80 rounded-xl shrink-0"
                />
              ))}
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-gray-200/80 rounded-full" />
              <div className="h-6 w-20 bg-gray-200/80 rounded-full" />
            </div>

            <div className="h-8 w-3/4 bg-gray-200/80 rounded-lg" />
            <div className="h-4 w-36 bg-gray-200/70 rounded-md" />

            <div className="h-9 w-40 bg-gray-200/80 rounded-lg mt-1" />
            <div className="h-10 w-52 bg-gray-200/70 rounded-lg" />

            <div className="h-12 w-full bg-emerald-100/70 rounded-xl my-1" />

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="h-11 bg-gray-200/80 rounded-xl" />
              <div className="h-11 bg-gray-300/80 rounded-xl" />
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-gray-100">
              <div className="h-12 bg-gray-100 rounded-lg" />
              <div className="h-12 bg-gray-100 rounded-lg" />
              <div className="h-12 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  async function getRelatedProducts(categoryId: string) {
    const res = await getAllProducts(`?category[in]=${categoryId}`);
    setAllProducts(res)
  }

  return <>
    <div className="bg-gray-50 p-4 md:p-6 flex justify-center items-center">
      <div className="w-[90%] mx-auto bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="w-full h-80 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center p-3">
            <Image
              src={selectedImage || productDetails.imageCover}
              alt={productDetails.title || "product image"}
              width={320}
              height={320}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {productDetails.images?.map((img, index) => {
              const isSelected =
                (selectedImage || productDetails.imageCover) === img;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden cursor-pointer transition-all shrink-0 bg-gray-50 ${
                    isSelected
                      ? "border-blue-600 p-0.5"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productDetails.title} ${index + 1}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-lg"
                    unoptimized
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-medium">
              {productDetails?.category?.name || "Category"}
            </span>
            {productDetails?.brand?.name && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {productDetails.brand.name}
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5 leading-tight">
              {productDetails?.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={
                      i < Math.floor(productDetails?.ratingsAverage || 4)
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      i < Math.floor(productDetails?.ratingsAverage || 4)
                        ? "text-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-700 text-sm">
                {productDetails?.ratingsAverage || 3.9}
              </span>
              <span>({productDetails?.ratingsQuantity || 43} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-gray-900">
              {productDetails?.price} EGP
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              In Stock
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-semibold text-gray-500">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-9">
              <Button
                variant="ghost"
                size="sm"
                className="h-full px-2.5 text-gray-600 hover:bg-gray-200 text-xs"
                onClick={() => count > 1 && setCount(count - 1)}
              >
                -
              </Button>
              <input
                type="number"
                value={count}
                min={1}
                max={productDetails.quantity}
                className="w-10 text-center bg-transparent text-xs font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > productDetails.quantity)
                    setCount(productDetails.quantity);
                  else if (val < 1) setCount(1);
                  else setCount(val);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-full px-2.5 text-gray-600 hover:bg-gray-200 text-xs"
                onClick={() =>
                  count < productDetails.quantity && setCount(count + 1)
                }
              >
                +
              </Button>
            </div>
            <span className="text-xs text-gray-400">
              {productDetails.quantity} available
            </span>
          </div>

          <div className="bg-emerald-50/70 rounded-xl p-3 flex justify-between items-center my-1 border border-emerald-100/60">
            <span className="text-xs font-medium text-gray-600">
              Total Price:
            </span>
            <span className="text-xl font-bold text-emerald-600">
              {(productDetails?.price * count).toFixed(2)} EGP
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MyAddToCart id={productDetails._id} isProductDertails />

            <Button className="w-full h-11 bg-[#0f172a] hover:bg-[#1e293b] text-white font-medium text-sm rounded-xl shadow-[0_8px_20px_-6px_rgba(15,23,42,0.45)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]">
              <Zap size={16} className="text-white fill-white" />
              <span>Buy Now</span>
            </Button>
          </div>

          <div className="flex gap-2.5">
            <button className="flex-1 h-9 border border-gray-200 rounded-xl flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
              <Heart size={15} />
              Add to Wishlist
            </button>
            <button className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition shrink-0">
              <Share2 size={15} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Truck size={18} className="text-emerald-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 leading-tight">
                  Free Delivery
                </p>
                <p className="text-[10px] text-gray-400">Orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <RotateCcw size={18} className="text-emerald-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 leading-tight">
                  30 Days Return
                </p>
                <p className="text-[10px] text-gray-400">Money back</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 leading-tight">
                  Secure Payment
                </p>
                <p className="text-[10px] text-gray-400">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-50 pt-6 pb-16">
      <div className="w-[90%] mx-auto px-4 md:px-6">
        <div className="inline-block mt-2 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 pb-2">
            Related Product
          </h2>
          <span className="block h-1 w-full rounded-full bg-linear-to-r from-emerald-600 via-emerald-400 to-teal-200"></span>
        </div>

        <div className="flex flex-wrap gap-y-3">
          {allProducts.map((product: IProducts) => {
            return <SingleProduct product={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  </>
}