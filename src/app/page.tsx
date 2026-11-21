import React, { Suspense } from "react";
import { getAllProducts } from "@/api/products.api";
import { IProducts } from "@/interfaces/products";
import SingleProduct from "../app/_components/singleProduct/SingleProduct";
import MainSlider from "../app/_components/mainSlider/MainSlider";
import ProductsHeader from "../app/_components/productheader/ProductHeader";
import ContactUs from "../app/_components/contactUs/contactUs";
import { ShoppingBag } from "lucide-react";

function HomeLoader() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-slate-50/50 px-4">
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 border-r-emerald-500 animate-spin" />
        <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm animate-pulse">
          <ShoppingBag className="w-5 h-5" />
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold tracking-wide text-slate-700 flex items-center gap-1">
        <span>Loading FreshCart</span>
        <span className="inline-flex gap-0.5 text-emerald-600 font-bold">
          <span className="animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="animate-bounce">.</span>
        </span>
      </p>
    </div>
  );
}

async function HomeContent() {
  const data = await getAllProducts();

  return (
    <>
      <MainSlider />
      <ProductsHeader count={data.length} />
      <div className="container w-[80%] mx-auto mt-6">
        <div className="flex flex-wrap gap-y-3">
          {data.map((product: IProducts) => {
            return <SingleProduct product={product} key={product.id} />;
          })}
        </div>
      </div>
      <ContactUs />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeLoader />}>
      <HomeContent />
    </Suspense>
  );
}
