"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home, ShoppingBag, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

export default function NotFound() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-8 text-center relative overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 12, -8, 0],
            y: [0, -10, 8, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-100/70 blur-xl pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -10, 10, 0],
            y: [0, 10, -8, 0],
            scale: [1, 0.95, 1.15, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-teal-100/70 blur-xl pointer-events-none"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1.5 rounded-full border border-dotted border-teal-400/70"
            />
            <motion.div
              animate={{ y: [-3, 3, -3], rotate: [-6, 6, -6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shadow-xs"
            >
              <Compass className="w-7 h-7" />
            </motion.div>

            <motion.span
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 right-1 text-emerald-500"
            >
              <Sparkles className="w-4 h-4" />
            </motion.span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-2"
          >
            {["4", "0", "4"].map((digit, idx) => (
              <motion.span
                key={idx}
                animate={{
                  y: [0, idx === 1 ? -8 : -4, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: idx * 0.18,
                  ease: "easeInOut",
                }}
                className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  idx === 1 ? "text-emerald-600" : "text-slate-800"
                }`}
              >
                {digit}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2"
          >
            Lost in the Aisles?
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm text-slate-500 mb-7"
          >
            This page doesn&apos;t exist or may have been moved. Let&apos;s get
            you back on track.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-colors"
              >
                <Home className="w-4 h-4" />
                Back Home
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/products"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Browse Shop
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}