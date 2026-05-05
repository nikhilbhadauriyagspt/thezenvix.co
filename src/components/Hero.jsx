import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function Hero({ products = [] }) {
  // Use first 5 featured products for the slider
  const heroProducts = products.slice(0, 5);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        let path = String(imgs[0]).replace(/\\/g, "/").replace(/^public\//, "/");
        const base = path.substring(0, path.lastIndexOf("."));
        // Try to use the optimized AVIF if it exists, otherwise fallback to original
        return `${base}_thumb.avif`;
      }
    } catch (e) { }
    return "/logo/fabicon.avif";
  };

  return (
    <section className="w-full bg-white px-4 py-1 overflow-hidden pb-20">
      <div className="relative max-w-[1800px] mx-auto h-[750px]">
        {/* Main Banner */}
        <div className="relative h-full rounded-[20px] overflow-hidden bg-[#d7c4ad]">
          <img
            src="/banner/new-banner/banner_02.png"
            alt="Printer hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Floating White Card Container */}
        <div className="absolute right-0 bottom-0 z-40 w-[650px] bg-white rounded-tl-[28px] rounded-br-[16px] overflow-visible">

          {/* Inverted Border Radius Pseudo-elements (Static) */}
          <div className="absolute right-0 bottom-0 w-full h-full pointer-events-none">
            {/* Bottom-Left Cutout */}
            <div className="absolute bottom-0 -left-[55px] w-[55px] h-[69px] bg-transparent rounded-br-[38px] shadow-[18px_18px_0_0_white]"></div>
            {/* Top-Right Cutout */}
            <div className="absolute -top-[44px] right-0 w-[44px] h-[44px] bg-transparent rounded-br-[28px] shadow-[14px_14px_0_0_white]"></div>
          </div>

          <div className="relative p-8">
            <Swiper
              modules={[Autoplay, EffectFade]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="h-full"
            >
              {heroProducts.length > 0 ? (
                heroProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="grid grid-cols-[1fr_250px] gap-8 items-center">
                      <div>
                        <h3 className="text-[22px] font-extrabold text-black leading-tight max-w-[390px] tracking-tight line-clamp-2">
                          {product.name}
                        </h3>

                        <p className="mt-3 text-[13px] font-medium leading-6 text-[#666] max-w-[430px] line-clamp-2">
                          {product.short_description || "High-quality printing solutions for your home and professional office needs."}
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                          <Link
                            to={`/product/${product.slug}`}
                            className="inline-flex items-center gap-4 bg-[#d4aa72] text-white px-8 py-3.5 rounded-[4px] text-[12px] font-black uppercase tracking-widest hover:bg-[#c39961] transition-colors"
                          >
                            Explore
                            <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                              <ArrowRight size={12} />
                            </span>
                          </Link>

                          <div className="text-[18px] font-black text-slate-900">
                            ${parseFloat(product.price).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="h-[180px] rounded-[18px] overflow-hidden bg-[#f6eee6] flex items-center justify-center p-2">
                        <img
                          src={getImagePath(product.images)}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply"
                          onError={(e) => { e.target.src = "/logo/fabicon.avif"; }}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                // Fallback static content if no products
                <SwiperSlide>
                  <div className="grid grid-cols-[1fr_250px] gap-8 items-center">
                    <div>
                      <h3 className="text-[19px] font-bold text-black leading-snug max-w-[390px] line-clamp-2">
                        Printers and Supplies for Home & Office
                      </h3>
                      <p className="mt-3 text-[12px] leading-6 text-[#666] max-w-[430px]">
                        Explore printer options, useful accessories, ink, and toner
                        made for everyday printing needs.
                      </p>
                      <Link
                        to="/shop"
                        className="mt-5 inline-flex items-center gap-4 bg-[#d4aa72] text-white px-6 py-3 rounded-[4px] text-[12px] font-bold"
                      >
                        Explore
                        <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center">
                          <ArrowRight size={12} />
                        </span>
                      </Link>
                    </div>
                    <div className="h-[145px] rounded-[18px] overflow-hidden bg-[#f6eee6]">
                      <img
                        src="/products/image_51_thumb.avif"
                        alt="Printer product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Marquee Strip */}
      <div className="w-full border-b border-[#e8e8e8] bg-white overflow-hidden mt-0 mx-10">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[
            "Simple shopping for printers, ink, toner, and accessories",
            "Clear product details for easy browsing",
            "Secure checkout for every order",
            "Carefully packed printer products",
            "Useful Products for home and office printing",
            "Browse selected printer products in one place",

            "Simple shopping for printers, ink, toner, and accessories",
            "Clear product details for easy browsing",
            "Secure checkout for every order",
            "Carefully packed printer products",
            "Useful Products for home and office printing",
            "Browse selected printer products in one place",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-center gap-14 px-10 py-5 text-[15px] font-semibold text-[#222]"
            >
              <span>{text}</span>
              <span className="text-[#4b5563] text-[18px]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}