"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaCartShopping,
  FaRegHeart,
  FaBarsStaggered,
  FaXmark,
} from "react-icons/fa6";
import {
  LogOut,
  ShoppingBag,
  LayoutGrid,
  Tag,
  Home,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";

type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const formatBadgeCount = (count: number) => (count > 9 ? "9+" : count);

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  const baseNavLinks: NavLink[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/products", icon: ShoppingBag },
    { name: "Categories", href: "/categories", icon: LayoutGrid },
    { name: "Brands", href: "/brands", icon: Tag },
  ];

  const navLinks = React.useMemo(() => {
    const links = [...baseNavLinks];
    if (session) {
      links.splice(2, 0, { name: "Cart", href: "/cart", icon: FaCartShopping });
    }
    return links;
  }, [session]);

  const { cartCountItems } = React.useContext(CartContext) ?? {
    cartCountItems: 0,
  };

  const { wishlistCount } = React.useContext(WishlistContext) ?? {
    wishlistCount: 0,
  };

  return (
    <header className="sticky top-0 z-50 font-sans transition-all duration-300 overflow-x-hidden">
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? "max-w-6xl mt-2 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm py-2 px-3 sm:px-5"
            : "max-w-7xl bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 px-3 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-2 lg:gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-700 transition-colors duration-200"
            >
              <FaCartShopping className="text-base sm:text-lg" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-black text-xl sm:text-2xl tracking-tight">
                Fresh<span className="text-emerald-600">Cart</span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-widest uppercase text-slate-400 -mt-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-emerald-500" /> Express
                Grocery
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm font-extrabold transition-all duration-200 flex items-center gap-1.5 lg:gap-2 ${
                    isActive
                      ? "text-emerald-700 bg-white shadow-xs"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-white/50"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2 lg:gap-3 shrink-0">
            {session ? (
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/wishlist"
                    className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition-colors duration-200 flex items-center justify-center"
                    title="Wishlist"
                  >
                    <FaRegHeart className="text-lg" />
                    {wishlistCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/cart"
                    className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition-colors duration-200 flex items-center justify-center"
                    title="Shopping Cart"
                  >
                    <FaCartShopping className="text-2xl" />
                    {cartCountItems > 0 && (
                      <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[9px] font-bold min-w-5 h-4.5 px-1 rounded-full flex items-center justify-center border-2 border-emerald-200">
                        {formatBadgeCount(cartCountItems)}
                      </span>
                    )}
                  </Link>
                </motion.div>

                <div className="h-4 w-px bg-slate-200 mx-0.5"></div>

                <div className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-100 border border-slate-200/60 text-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                    {session.user?.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <span className="text-xs font-bold text-slate-700 max-w-22.5 truncate">
                    {session.user?.name}
                  </span>

                  <button
                    onClick={logOut}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 font-bold text-slate-700 hover:text-emerald-600 rounded-xl text-xs lg:text-sm transition-colors"
                >
                  Sign In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/register"
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs lg:text-sm transition-colors shadow-xs inline-block"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-1.5">
            {session && (
              <Link
                href="/wishlist"
                className="p-2 text-slate-700 hover:text-rose-500 rounded-xl relative"
                title="Wishlist"
              >
                <FaRegHeart className="text-lg" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </Link>
            )}
            {session && (
              <Link
                href="/cart"
                className="p-2 text-slate-700 hover:text-emerald-600 rounded-xl relative"
              >
                <FaCartShopping className="text-lg" />
                {cartCountItems > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full"></span>
                )}
              </Link>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:text-emerald-600 transition-colors border border-slate-200/60"
            >
              {isMobileMenuOpen ? (
                <FaXmark className="text-lg" />
              ) : (
                <FaBarsStaggered className="text-lg" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/80 shadow-lg space-y-3"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {link.name}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3">
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      {session.user?.name
                        ? session.user.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={logOut}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl font-bold text-xs sm:text-sm bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors border border-rose-200/60"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2 rounded-xl font-bold border border-slate-200 text-slate-700 text-xs sm:text-sm hover:bg-slate-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-emerald-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
