"use client";

import { ICart } from "@/interfaces/cart";

type CartItemProps = {
  prod: ICart;
  isItemBusy: boolean;
  isAnyBusy: boolean;
  updateQuantity: (id: string, newCount: number , sign :string) => void;
  deleteFromCart: (id: string) => void;
};

export function CartMobileCard({
  prod,
  isItemBusy,
  isAnyBusy,
  updateQuantity,
  deleteFromCart,
}: CartItemProps) {
  
  const productId = prod.product._id;

  return (
    <div className="p-4 space-y-4 bg-white border-b border-slate-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className="relative overflow-hidden rounded-xl border border-slate-200/80 p-2 bg-slate-50 w-20 h-20 shrink-0 flex items-center justify-center">
          <img
            src={prod.product.imageCover}
            className="max-w-full max-h-full object-contain"
            alt={prod.product.title}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-800 text-sm truncate">
              {prod.product.title}
            </h3>
            <button
              disabled={isAnyBusy}
              onClick={() => deleteFromCart(productId)}
              type="button"
              className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg bg-rose-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              title="Remove item"
            >
              {isItemBusy ? (
                <svg className="w-4 h-4 animate-spin text-rose-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>

          <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            {prod.product.category?.name}
          </span>

          <div className="mt-2 text-emerald-700 font-extrabold text-base">
            {prod.price * prod.count} <span className="text-xs font-semibold text-slate-500">EGP</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500">Quantity:</span>
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            disabled={isAnyBusy}
            onClick={() => updateQuantity(productId, prod.count - 1 , "-")}
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm active:scale-95 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            −
          </button>

          <span className="w-10 text-center bg-transparent font-bold text-slate-800 text-xs flex items-center justify-center">
            {isItemBusy ? (
              <svg className="w-3.5 h-3.5 animate-spin text-emerald-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : (
              prod.count
            )}
          </span>

          <button
            disabled={isAnyBusy}
            onClick={() => updateQuantity(productId, prod.count + 1,"+")}
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm active:scale-95 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartDesktopRow({
  prod,
  isItemBusy,
  isAnyBusy,
  updateQuantity,
  deleteFromCart,
}: CartItemProps) {
  
  const productId = prod.product._id;

  return (
    <tr
      className={`group transition-colors duration-200 ${
        isItemBusy ? "bg-slate-50/80" : "bg-white hover:bg-emerald-50/30"
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="relative overflow-hidden rounded-xl border border-slate-200/80 p-2 bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300 w-20 h-20 flex items-center justify-center">
          <img
            src={prod.product.imageCover}
            className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
            alt={prod.product.title}
          />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors duration-200">
            {prod.product.title}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            {prod.product.category?.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200 shadow-inner hover:border-slate-300 transition-all">
            <button
              disabled={isAnyBusy}
              onClick={() => updateQuantity(productId, prod.count - 1,"-")}
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:bg-emerald-600 hover:text-white active:scale-95 transition-all duration-200 font-bold focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="w-12 text-center bg-transparent font-bold text-slate-800 text-sm flex items-center justify-center">
              {isItemBusy ? (
                <svg className="w-4 h-4 animate-spin text-emerald-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : (
                prod.count
              )}
            </span>
            <button
              disabled={isAnyBusy}
              onClick={() => updateQuantity(productId, prod.count + 1,"+")}
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm hover:bg-emerald-600 hover:text-white active:scale-95 transition-all duration-200 font-bold focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <span className="font-extrabold text-slate-900 text-base">
          {prod.price * prod.count} <span className="text-xs font-semibold text-slate-500">EGP</span>
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          disabled={isAnyBusy}
          onClick={() => deleteFromCart(productId)}
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-500/30 active:scale-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          title="Remove item"
        >
          {isItemBusy ? (
            <svg className="w-5 h-5 animate-spin text-rose-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
}