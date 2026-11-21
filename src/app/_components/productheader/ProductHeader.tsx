"use client";

import React from "react";
import { ShoppingBag, Sparkles } from "lucide-react";

interface ProductsHeaderProps {
  count: number;
}

export default function ProductsHeader({ count }: ProductsHeaderProps) {
  return (
    <section className="container w-[80%] mx-auto mt-10 mb-4">
      <style jsx>{`
        @keyframes shimmerLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shimmer {
          animation: shimmerLine 3.2s ease-in-out infinite;
        }
        .animate-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="animate-fade-up relative overflow-hidden rounded-2xl bg-white border border-emerald-100 shadow-sm px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Animated top emerald shimmer line */}
        <div className="pointer-events-none absolute top-0 left-0 h-[2.5px] w-full bg-emerald-50 overflow-hidden">
          <div className="h-full w-1/3 bg-linear-to-r from-transparent via-emerald-500 to-transparent animate-shimmer" />
        </div>

        <div className="flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/70 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              <Sparkles className="w-3 h-3" />
              Fresh Arrivals
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
              Explore Our Products
            </h1>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/70 px-4 py-1.5 text-xs font-semibold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{count} Items Ready</span>
        </div>
      </div>
    </section>
  );
}