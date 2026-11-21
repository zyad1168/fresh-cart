"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="container w-[80%] mx-auto mt-8 font-sans">
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 flex items-center gap-3"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <div className="h-6 w-48 bg-slate-200/80 rounded-lg" />
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.45 }}
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: index * 0.06,
              ease: "easeInOut",
            }}
            className="mb-6 bg-white rounded-2xl border border-slate-100 p-3 shadow-xs flex flex-col justify-between h-97.5 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)]"
          >
            <div>
              <div className="w-full h-45 bg-slate-100 rounded-xl mb-3" />
              <div className="h-3 w-16 bg-slate-100 rounded mb-2" />
              <div className="h-4 w-full bg-slate-100 rounded mb-1.5" />
              <div className="h-4 w-3/4 bg-slate-100 rounded" />
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="h-5 w-20 bg-slate-100 rounded" />
              <div className="w-8 h-8 rounded-full bg-slate-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}