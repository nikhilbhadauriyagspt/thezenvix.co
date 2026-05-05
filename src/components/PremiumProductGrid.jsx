import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Heart from "lucide-react/dist/esm/icons/heart";
import Eye from "lucide-react/dist/esm/icons/eye";
import Layers from "lucide-react/dist/esm/icons/layers";
import { useCart } from "../context/CartContext";

export default function PremiumProductGrid({ products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare } = useCart();
  const [activeTab, setActiveTab] = useState("latest");

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        let path = String(imgs[0]).replace(/\\/g, "/").replace(/^public\//, "/");
        const base = path.substring(0, path.lastIndexOf("."));
        return `${base}_thumb.avif`;
      }
    } catch (e) { }
    return "/logo/fabicon.avif";
  };

  const normalizePrice = (value) => {
    const num = parseFloat(value || 0);
    return Number.isNaN(num) ? 0 : num;
  };

  const latestProducts = useMemo(() => products.slice(0, 10), [products]);
  const featuredProducts = useMemo(() => products.slice(10, 20), [products]);
  const bestProducts = useMemo(() => products.slice(20, 30), [products]);

  const currentProducts =
    activeTab === "latest"
      ? latestProducts
      : activeTab === "featured"
        ? featuredProducts
        : bestProducts;

  const ProductCard = ({ product, index }) => {
    const price = normalizePrice(product.price);
    const salePrice = normalizePrice(product.sale_price);
    const hasSale = salePrice > 0 && salePrice < price;
    const finalPrice = hasSale ? salePrice : price;
    const inWishlist = isInWishlist(product.id);

    return (
      <div className="group">
        <div className="relative h-[338px] bg-[#f1f1f1] rounded-[9px] overflow-hidden flex items-center justify-center p-8">
          {hasSale && (
            <span className="absolute top-4 left-4 z-20 bg-[#d94438] text-white text-[14px] font-bold px-4 py-2 rounded-full">
              -10%
            </span>
          )}

          <Link
            to={`/product/${product.slug}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={getImagePath(product.images)}
              alt={product.name}
              className="max-w-full max-h-[240px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/logo/fabicon.avif";
              }}
              loading="lazy"
            />
          </Link>

          <div className="absolute top-5 right-4 flex flex-col gap-3 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <div className="relative group/tooltip">
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition"
              >
                <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
              </button>
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none">
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </span>
            </div>

            <div className="relative group/tooltip">
              <button
                onClick={() => toggleCompare(product)}
                aria-label="Compare Product"
                className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition"
              >
                <Layers size={17} />
              </button>
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none">
                Compare
              </span>
            </div>

            <div className="relative group/tooltip">
              <Link
                to={`/product/${product.slug}`}
                aria-label="View Product Details"
                className="w-[46px] h-[46px] rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition"
              >
                <Eye size={17} />
              </Link>
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[12px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none">
                Quick View
              </span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="absolute left-4 right-4 bottom-4 h-[46px] rounded-full bg-white text-black text-[15px] font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
          >
            Add to cart
          </button>
        </div>

        <div className="pt-4">
          <Link to={`/product/${product.slug}`}>
            <h3 className="text-[16px] font-bold text-[#151515] leading-snug line-clamp-2 hover:text-[#d4aa72] transition">
              {product.name}
            </h3>
          </Link>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`text-[16px] font-bold ${hasSale ? "text-[#d94438]" : "text-black"
                }`}
            >
              ${finalPrice.toFixed(2)}
            </span>

            {hasSale && (
              <span className="text-[15px] text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-20">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="h-10 w-72 bg-gray-200 mx-auto mb-10 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-[430px] bg-gray-100 rounded-[9px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[34px] md:text-[40px] font-extrabold text-black">
            Best Selling
          </h2>

          <div className="mt-7 inline-flex items-center border-b border-gray-200">
            {[
              { id: "latest", label: "Latest Arrivals" },
              { id: "featured", label: "Featured Collection" },
              { id: "best", label: "Top Printers" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-7 pb-4 text-[16px] font-bold transition ${activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-7">
          {currentProducts.slice(0, 10).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}