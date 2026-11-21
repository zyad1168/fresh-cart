"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import { ArrowRight, Layers, ShoppingBag, Award, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    badge: "Categories",
    title: "Fast & Free Delivery",
    subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    primaryLabel: "Explore Categories",
    primaryHref: "/categories",
    secondaryLabel: "All Products",
    secondaryHref: "/products",
    Icon: Layers,
  },
  {
    id: 2,
    badge: "Shop Now",
    title: "Fresh Organic Produce",
    subtitle: "Get 20% off your first order today.",
    primaryLabel: "Go to Shop",
    primaryHref: "/products",
    secondaryLabel: "All Products",
    secondaryHref: "/products",
    Icon: ShoppingBag,
  },
  {
    id: 3,
    badge: "Top Brands",
    title: "Best Deals & Discounts",
    subtitle: "Quality products delivered right to your doorstep.",
    primaryLabel: "Browse Brands",
    primaryHref: "/brands",
    secondaryLabel: "All Products",
    secondaryHref: "/products",
    Icon: Award,
  },
];

export default function MainSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative group mySwiper overflow-hidden">
      <style jsx>{`
        @keyframes slideContentIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideContentIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-slide-in-delay {
          animation: slideContentIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
        }
        .animate-slide-in-btns {
          animation: slideContentIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Autoplay]}
        loop={true}
        speed={600}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== "boolean") {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        pagination={{ clickable: true }}
        mousewheel={{ thresholdTime: 1000 }}
        spaceBetween={2}
        slidesPerView={1}
      >
        {slides.map(
          ({
            id,
            badge,
            title,
            subtitle,
            primaryLabel,
            primaryHref,
            secondaryLabel,
            secondaryHref,
            Icon,
          }) => (
            <SwiperSlide key={id}>
              <div
                style={{
                  backgroundImage: `url('/assets/Images/home-slider-1.d79601a8.png')`,
                }}
                className="relative h-[400px] bg-no-repeat bg-center bg-cover"
              >
                <div className="absolute bg-green-600/60 inset-0">
                  <div className="absolute top-1/2 -translate-y-1/2 text-white left-14 md:left-20 max-w-xl pr-12 space-y-3">
                    <span className="animate-slide-in inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/25 text-white">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      {badge}
                    </span>

                    <h1 className="animate-slide-in text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm">
                      {title}
                    </h1>

                    <p className="animate-slide-in-delay text-sm md:text-lg text-white/95 leading-relaxed">
                      {subtitle}
                    </p>

                    <div className="animate-slide-in-btns pt-2 flex flex-wrap items-center gap-3">
                      <Link
                        href={primaryHref}
                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#060d18] text-white text-sm font-semibold shadow-lg hover:bg-slate-900 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                      >
                        <Icon className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover/btn:scale-110" />
                        <span>{primaryLabel}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>

                      <Link
                        href={secondaryHref}
                        className="group/sec inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-md text-white border border-white/35 text-sm font-semibold hover:bg-white hover:text-emerald-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                      >
                        <span>{secondaryLabel}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/sec:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ),
        )}

        <button
          ref={prevRef}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-emerald-500 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          ref={nextRef}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-emerald-500 stroke-[2.5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Swiper>
    </div>
  );
}