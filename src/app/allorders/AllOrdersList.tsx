"use client";

import React from "react";
import { motion } from "framer-motion";
import { IProducts } from "@/interfaces/products";
import SingleProduct from "../_components/singleProduct/SingleProduct";

export default function AllOrdersList({
  products,
  prefixTitle = "Ordered",
}: {
  products: IProducts[];
  prefixTitle?: string;
}) {
  return (
    <div className="container w-[80%] mx-auto mt-6 mb-12 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-6 rounded-full bg-emerald-600" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {prefixTitle}{" "}
            <span className="text-emerald-600">Products</span>
          </h1>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
        className="flex flex-wrap gap-y-3"
      >
        {products.map((product, index) => (
          <SingleProduct product={product} key={`${product.id}-${index}`} />
        ))}
      </motion.div>
    </div>
  );
}