import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

import { useGlobalData } from "../context/DataContext";

export default function CategoryCarousel() {
  const { categories: globalCategories, loading } = useGlobalData();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (globalCategories.length > 0) {
      const printerParent = globalCategories.find(
        (cat) => cat.slug === "printers" || cat.id === 46
      );
      const items = printerParent && printerParent.children
        ? printerParent.children
        : globalCategories.filter(c => !c.name.toLowerCase().includes("laptop"));
      setCategories(items);
    }
  }, [globalCategories]);

  if (loading && categories.length === 0) {
    return (
      <section className="w-full py-10 bg-[#F5F5F5] mt-10">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="min-w-[100px] md:min-w-[140px] aspect-square rounded-full bg-slate-50 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="w-full py-14 bg-[#Fff] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-0 relative overflow-hidden">

        {/* Section Header - Very Clean */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-slate-900  flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#05718A] rounded-full"></span>
              Shop by Category
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous categories"
              className="category-prev w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#05718A] hover:border-[#05718A] transition-all bg-white shadow-sm active:scale-90"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Next categories"
              className="category-next w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#05718A] hover:border-[#05718A] transition-all bg-white shadow-sm active:scale-90"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Categories Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".category-prev",
            nextEl: ".category-next",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={25}
          slidesPerView={"auto"}
          className="!overflow-visible "
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id} style={{ width: 'auto' }}>
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group block relative w-[110px] md:w-[150px] text-center "
              >
                {/* Smaller Circle Container */}
                <div className="relative aspect-square w-full mb-3 p-1">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#05718A]/20 group-hover:border-[#05718A] group-hover:rotate-90 transition-all duration-1000"></div>

                  <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-90 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-[#05718A]/5">
                    <img
                      src={`/category/${cat.slug}_thumb.avif`}
                      srcSet={`/category/${cat.slug}_thumb.avif 300w, /category/${cat.slug}_med.avif 600w`}
                      sizes="(max-width: 768px) 110px, 150px"
                      alt={`${cat.name} Category`}
                      className="w-[100%] h-[100%] object-contain transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => { e.target.src = "/logo/fabicon.avif"; }}
                    />
                  </div>

                  {/* Tiny Hover Badge */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-[#05718A] text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg z-10">
                    <ArrowRight size={14} />
                  </div>
                </div>

                <h3 className="text-[13px] md:text-[14px] font-bold text-slate-600 group-hover:text-[#05718A] transition-colors line-clamp-1 px-1">
                  {cat.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}

          {/* Circle View All */}
          <SwiperSlide style={{ width: 'auto' }}>
            <Link
              to="/shop"
              className="group block relative w-[110px] md:w-[150px] text-center"
            >
              <div className="relative aspect-square w-full mb-3 p-1">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 group-hover:border-[#05718A] transition-colors duration-500"></div>
                <div className="w-full h-full rounded-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 group-hover:text-[#05718A] group-hover:bg-white transition-all">
                  <ArrowRight size={20} className="mb-0.5" />
                  <span className="text-[9px] font-black uppercase tracking-tighter">View All</span>
                </div>
              </div>
              <h3 className="text-[13px] font-bold text-slate-400 group-hover:text-[#05718A]">Explore</h3>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
