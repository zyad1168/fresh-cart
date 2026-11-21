import React from "react";
import Link from "next/link";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/201020134454?text=" +
    encodeURIComponent("Hello FreshCart, I need help with my order.");
  const mailtoUrl =
    "mailto:zyadibrahimedu11@gmail.com?subject=" +
    encodeURIComponent("FreshCart Support Inquiry");

  return (
    <footer className="w-full bg-[#0b132b] text-gray-300">
      <div className="bg-[#eafaf1] text-gray-800 py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 w-full">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Free Shipping</h4>
              <p className="text-xs text-gray-600">On orders over 500 EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Easy Returns</h4>
              <p className="text-xs text-gray-600">14-day return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">
                Secure Payment
              </h4>
              <p className="text-xs text-gray-600">100% secure checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">24/7 Support</h4>
              <p className="text-xs text-gray-600">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white inline-block px-4 py-2 rounded-md">
              <span className="text-emerald-600 font-bold text-xl flex items-center gap-2">
                🛒 FreshCart
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-2 text-xs text-gray-300">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition w-fit"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>01020134454</span>
              </a>
              <a
                href={mailtoUrl}
                className="flex items-center gap-2 hover:text-emerald-400 transition w-fit"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>zyadibrahimedu11@gmail.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-600 p-2.5 rounded-full transition text-white"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-600 p-2.5 rounded-full transition text-white"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-600 p-2.5 rounded-full transition text-white"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-emerald-600 p-2.5 rounded-full transition text-white"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Shop
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-emerald-400 transition"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="hover:text-emerald-400 transition"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:text-emerald-400 transition"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/electronics"
                    className="hover:text-emerald-400 transition"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mens-fashion"
                    className="hover:text-emerald-400 transition"
                  >
                    Men&apos;s Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/womens-fashion"
                    className="hover:text-emerald-400 transition"
                  >
                    Women&apos;s Fashion
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Account
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-emerald-400 transition"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/orders"
                    className="hover:text-emerald-400 transition"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="hover:text-emerald-400 transition"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-emerald-400 transition"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-emerald-400 transition"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-emerald-400 transition"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Support
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-emerald-400 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-emerald-400 transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping-info"
                    className="hover:text-emerald-400 transition"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="hover:text-emerald-400 transition"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="hover:text-emerald-400 transition"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Legal
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-emerald-400 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-emerald-400 transition"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="hover:text-emerald-400 transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}