"use client";

import React, { useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { checkoutSchema, CheckoutFormData } from "@/schema/Checkout.schema";
import { createCashOrder } from "@/paymentActions/cashOrder.action";
import { checkoutPayment } from "@/paymentActions/checkout.action";
import { CartContext } from "@/context/CartContext";
import { toast } from "@/components/ui/toast";
import {
  Banknote,
  CreditCard,
  MapPin,
  Phone,
  Building2,
  Mail,
} from "lucide-react";

type PaymentMethod = "cash" | "visa";

export default function CheckoutPage() {
  const params = useParams<{ cartId: string }>();
  const cartId = params?.cartId || "";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setCartCountItems } = useContext(CartContext) ?? {
    setCartCountItems: () => {},
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cash",
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  function handleSelectPayment(method: PaymentMethod) {
    setValue("paymentMethod", method);
    clearErrors("postalCode");
    if (method === "visa") {
      setValue("postalCode", "");
    }
  }

  async function onSubmit(values: CheckoutFormData) {
    if (!cartId) {
      toast.add({
        title: "Invalid cart ID",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (values.paymentMethod === "cash") {
        const res = await createCashOrder(cartId, values);

        if (res?.status === "success") {
          setCartCountItems(0);
          toast.add({
            title: "Cash order placed successfully!",
            type: "success",
          });
          router.push("/allorders");
        } else {
          toast.add({
            title: res?.message || "Failed to place cash order",
            type: "error",
          });
        }
      } else {
        const res = await checkoutPayment(cartId, {
          details: values.details,
          phone: values.phone,
          city: values.city,
        });

        if (res?.status === "success" && res?.session?.url) {
          window.location.href = res.session.url;
        } else {
          toast.add({
            title: res?.message || "Failed to start card checkout",
            type: "error",
          });
        }
      }
    } catch (error) {
      toast.add({
        title: error instanceof Error ? error.message : "Something went wrong",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-8"
      >
        <div className="mb-6 pb-5 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Choose your payment method and fill your shipping details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-2">
              Payment Method
            </span>
            <div className="grid grid-cols-2 gap-3 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => handleSelectPayment("cash")}
                className={`relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  paymentMethod === "cash"
                    ? "text-emerald-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {paymentMethod === "cash" && (
                  <motion.div
                    layoutId="activePaymentTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white rounded-xl border border-emerald-200/80 shadow-xs"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  Cash on Delivery
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPayment("visa")}
                className={`relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  paymentMethod === "visa"
                    ? "text-emerald-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {paymentMethod === "visa" && (
                  <motion.div
                    layoutId="activePaymentTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-white rounded-xl border border-emerald-200/80 shadow-xs"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  Visa / Card
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Address Details
            </label>
            <input
              type="text"
              placeholder="Street, building, apartment..."
              {...register("details")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all"
            />
            {errors.details && (
              <p className="text-xs text-rose-600 font-medium mt-1">
                {errors.details.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="01020134454"
                {...register("phone")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all"
              />
              {errors.phone && (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                City
              </label>
              <input
                type="text"
                placeholder="Cairo / Alexandria"
                {...register("city")}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all"
              />
              {errors.city && (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {paymentMethod === "cash" && (
              <motion.div
                key="postalCodeField"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-0.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="12345"
                    {...register("postalCode")}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                  {"postalCode" in errors && errors.postalCode && (
                    <p className="text-xs text-rose-600 font-medium mt-1">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-emerald-600/20 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {paymentMethod === "cash" ? (
              <Banknote className="w-4 h-4" />
            ) : (
              <CreditCard className="w-4 h-4" />
            )}
            {isSubmitting
              ? "Processing..."
              : paymentMethod === "cash"
                ? "Confirm Cash Order"
                : "Pay with Visa"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}