"use client";

import { getUserCart } from "@/cartAction/getUserCart.action";
import { removeCartItem } from "@/cartAction/removeCartItem.action";
import { toast } from "@/components/ui/toast";
import { ICart } from "@/interfaces/cart";
import { useContext, useEffect, useState } from "react";

import { updateProductQtn } from "@/cartAction/updateProductQtn.action";
import { clearCart } from "@/cartAction/clearCart.action";
import {
  CartDesktopRow,
  CartMobileCard,
} from "../_components/cartItem/CartItem";
import { CartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Cart() {
  const [products, setProducts] = useState<ICart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { data: session } = useSession();

  const [totalPrice, setTotalPrice] = useState(0);
  const [cardId, setCardId] = useState("");

  const { cartCountItems, setCartCountItems } = useContext(CartContext) ?? {
    cartCountItems: 0,
    setCartCountItems: (count) => {},
  };
  async function getUserProducts() {
    try {
      const res = await getUserCart();
      if (res.status === "success") {
        setProducts(res.data?.products || []);
        setTotalPrice(res.data?.totalCartPrice || 0);

        setCardId(res.cartId);
      } else {
        setProducts([]);
        setTotalPrice(0);
      }
    } catch (error) {
      setProducts([]);
      setTotalPrice(0);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteFromCart(id: string) {
    setUpdatingId(id);
    try {
      const res = await removeCartItem(id);
      if (res.status === "success") {
        toast.add({
          title: res.message,
          type: "success",
        });

        setProducts(res.data?.products || []);
        getUserProducts();
        let sum = 0;
        res.data.products.forEach((product: ICart) => {
          sum += product.count;
        });
        setCartCountItems(sum);
      } else {
        toast.add({
          title: "You can't remove it now",
          type: "error",
        });
      }
    } catch (error) {
      toast.add({
        title: "Something went wrong",
        type: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  async function updateQuantity(id: string, newCount: number, sign: string) {
    if (newCount === 0) {
      return deleteFromCart(id);
    }

    setUpdatingId(id);

    try {
      const res = await updateProductQtn(id, newCount);

      if (res?.status === "success") {
        toast.add({
          title: "Quantity updated successfully",
          type: "success",
        });
        getUserProducts();
        if (sign == "+") {
          setCartCountItems(cartCountItems + 1);
        } else if (sign == "-") {
          setCartCountItems(cartCountItems - 1);
        }

        if (res.data?.products) {
          setProducts(res.data.products);
        } else {
          getUserProducts();
        }
      } else {
        toast.add({
          title: res?.message || "You can't update it now",
          type: "error",
        });
      }
    } catch (error) {
      toast.add({
        title: "Failed to update quantity",
        type: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  async function emptyCart() {
    setUpdatingId("all");
    try {
      const res = await clearCart();

      if (res?.status === "success") {
        toast.add({
          title: "Cart cleared successfully",
          type: "success",
        });
        setProducts([]);
      } else {
        toast.add({
          title: res?.message || "You can't clear cart now",
          type: "error",
        });
      }
    } catch (error) {
      toast.add({
        title: "Failed to clear cart",
        type: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    getUserProducts();
  }, []);

 

  return (
    <>
      {isLoading ? (
        <div className="w-full max-w-7xl mx-auto my-6 sm:my-8 px-3 sm:px-4 font-sans animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
            <div className="space-y-2">
              <div className="w-48 h-6 bg-slate-200 rounded-lg"></div>
              <div className="w-32 h-4 bg-slate-200 rounded-lg"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0"
                  >
                    <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                      <div className="w-20 h-3 bg-slate-200 rounded"></div>
                      <div className="w-24 h-4 bg-slate-200 rounded"></div>
                    </div>
                    <div className="w-24 h-8 bg-slate-200 rounded-xl hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900/10 rounded-3xl p-6 h-80 space-y-4 border border-slate-200">
                <div className="w-1/2 h-6 bg-slate-300 rounded"></div>
                <div className="w-full h-4 bg-slate-300 rounded"></div>
                <div className="w-full h-4 bg-slate-300 rounded"></div>
                <div className="w-full h-12 bg-slate-300 rounded-xl mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      ) : products?.length > 0 ? (
        <div className="w-full max-w-7xl mx-auto my-6 sm:my-8 px-3 sm:px-4 font-sans">
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="bg-linear-to-tr from-emerald-600 to-teal-500 text-white p-2.5 sm:p-3 rounded-2xl shadow-lg shadow-emerald-500/20 transform hover:scale-105 transition-all duration-300">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                You have{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {products.length} {products.length === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="relative overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 transition-all duration-300">
                {/* Mobile Container */}
                <div className="block md:hidden divide-y divide-slate-100">
                  {products.map((prod: ICart) => {
                    const pId = prod.product._id || prod.product.id;
                    return (
                      <CartMobileCard
                        key={prod._id}
                        prod={prod}
                        isItemBusy={updatingId === pId}
                        isAnyBusy={updatingId !== null}
                        updateQuantity={updateQuantity}
                        deleteFromCart={deleteFromCart}
                      />
                    );
                  })}
                </div>

                {/* Desktop Table Container */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs uppercase font-bold tracking-wider text-slate-500 bg-slate-50/90 border-b border-slate-200">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-4 text-right">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((prod: ICart) => {
                        const pId = prod.product._id || prod.product.id;
                        return (
                          <CartDesktopRow
                            key={prod._id}
                            prod={prod}
                            isItemBusy={updatingId === pId}
                            isAnyBusy={updatingId !== null}
                            updateQuantity={updateQuantity}
                            deleteFromCart={deleteFromCart}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between items-center px-1 sm:px-2 pt-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-all group"
                >
                  <span className="transform group-hover:-translate-x-1 transition-transform">
                    ←
                  </span>{" "}
                  Continue Shopping
                </a>
                <button
                  onClick={emptyCart}
                  disabled={updatingId !== null}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-400 hover:text-rose-600 transition-colors group disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4 group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear all items
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-slate-900/20 text-white relative overflow-hidden border border-slate-800">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-5 sm:mb-6 flex items-center justify-between">
                  Order Summary
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">
                      Subtotal ({products.length} items)
                    </span>
                    <span className="font-semibold text-slate-100">
                      {totalPrice} EGP
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Shipping</span>
                    <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="border-t border-slate-800 my-4"></div>

                  <div className="flex justify-between items-end pb-2">
                    <div>
                      <span className="text-[10px] sm:text-xs text-slate-400 block uppercase font-bold tracking-wider">
                        Estimated Total
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-white">
                        {totalPrice}{" "}
                        <span className="text-xs font-semibold text-emerald-400">
                          EGP
                        </span>
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={updatingId !== null}
                    className="w-full mt-4 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 sm:py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>

                    <Link href={`/checkout/${cardId}`}> Login to Checkout</Link>
                   
                  </button>
                  {session ? (
                    <div className=" text-center">By Now</div>
                  ) : (
                    <p className="text-[11px] sm:text-xs text-center text-slate-400 pt-2">
                      Don't have an account?{" "}
                      <a
                        href="#"
                        className="text-emerald-400 font-semibold hover:underline"
                      >
                        Sign up
                      </a>
                    </p>
                  )}

                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2 text-[11px] sm:text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>{" "}
                      Saved cart items automatically
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> Fast
                      & secured checkout process
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto my-16 px-4 text-center font-sans">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-5">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Your Cart is Empty
              </h2>
              <p className="text-slate-500 text-sm">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Start Shopping
            </a>
          </div>
        </div>
      )}
    </>
  );
}
