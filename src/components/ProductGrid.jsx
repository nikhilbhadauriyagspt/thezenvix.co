import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Eye,
  ChevronRight,
  Printer,
  Grid2x2,
  Truck,
  BadgeCheck,
  ShieldCheck,
  ShoppingCart,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const formatPrice = (value) => {
  const num = parseFloat(value || 0);
  return Number.isNaN(num) ? 0 : num;
};

const getImagePath = (images) => {
  try {
    const imgs = typeof images === "string" ? JSON.parse(images) : images;
    if (Array.isArray(imgs) && imgs.length > 0) {
      const cleanPath = String(imgs[0])
        .replace(/\\/g, "/")
        .replace(/^public\//, "");
      const base = cleanPath.substring(0, cleanPath.lastIndexOf("."));
      return `/${base}_thumb.avif`;
    }
  } catch { }
  return "/logo/fabicon.avif";
};

const CategoryPill = ({ icon: Icon, title, link }) => (
  <Link
    to={link}
    className="group flex items-center justify-between p-4 bg-[#f5f5f5] hover:bg-white rounded-[18px] border border-transparent hover:border-black transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
        <Icon size={22} className="text-black" />
      </div>
      <div>
        <h4 className="font-extrabold text-black text-sm">{title}</h4>
        <p className="text-xs text-gray-500">Shop Collection</p>
      </div>
    </div>

    <ChevronRight
      size={18}
      className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition"
    />
  </Link>
);

const ProductCard = ({
  product,
  addToCart,
  toggleWishlist,
  isInWishlist,
  toggleCompare,
  isInCompare,
}) => {
  const price = formatPrice(product.price);
  const salePrice = formatPrice(product.sale_price);
  const hasSale = salePrice > 0 && salePrice < price;
  const finalPrice = hasSale ? salePrice : price;
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className="group">
      <div className="relative bg-[#f1f1f1] rounded-[10px] h-[330px] flex items-center justify-center p-8 overflow-hidden">
        {hasSale && (
          <span className="absolute top-4 left-4 z-20 bg-[#d94438] text-white text-[12px] font-bold px-3 py-1.5 rounded-full">
            Sale
          </span>
        )}

        <Link
          to={`/product/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={getImagePath(product.images)}
            alt={product.name}
            className="max-h-[235px] max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/logo/fabicon.avif";
            }}
          />
        </Link>

        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <div className="relative group/tooltip">
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition ${isWishlisted ? "text-red-500" : "text-black"
                }`}
            >
              <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none z-50">
              {isWishlisted ? "Remove Wishlist" : "Add Wishlist"}
            </span>
          </div>

          <div className="relative group/tooltip">
            <button
              onClick={() => toggleCompare(product)}
              aria-label="Compare Product"
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition ${isCompared ? "text-[#d4aa72]" : "text-black"
                }`}
            >
              <Layers size={17} />
            </button>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none z-50">
              Compare
            </span>
          </div>

          <div className="relative group/tooltip">
            <Link
              to={`/product/${product.slug}`}
              aria-label="View Product Details"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <Eye size={17} />
            </Link>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none z-50">
              Quick View
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-[15px] font-extrabold text-black leading-snug line-clamp-2 min-h-[40px] hover:text-[#d4aa72] transition">
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
            <span className="text-[14px] text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-5 w-full h-[42px] rounded-full border-2 border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const TrustBadge = ({ icon: Icon, title, desc }) => (
  <div className="bg-[#f7f7f7] rounded-[22px] p-7 border border-gray-100">
    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5">
      <Icon size={24} className="text-black" />
    </div>
    <h4 className="font-extrabold text-black text-[15px] mb-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default function ProductGrid({ products = [], loading = false }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useCart();

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "all") return true;
    const name = p.name.toLowerCase();
    if (activeFilter === "laser") return name.includes("laser");
    if (activeFilter === "inktank") return name.includes("ink tank") || name.includes("supertank") || name.includes("ecotank");
    if (activeFilter === "all-in-one") return name.includes("all-in-one") || name.includes("mfp");
    return true;
  });

  const displayProducts = filteredProducts.slice(0, 16);

  if (loading) {
    return (
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="h-[500px] bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[34px] md:text-[42px] font-extrabold text-black">
            Printer Essentials Collection
          </h2>
          <p className="mt-2 text-[13px] text-gray-500">
            Browse reliable printers, ink, toner, and accessories for everyday use.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center border-b border-gray-200">
            {["all", "laser", "inktank", "all-in-one"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 pb-4 text-[15px] font-bold capitalize transition ${activeFilter === filter
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black"
                  }`}
              >
                {filter.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr]  gap-10">
          <div className="space-y-6 sticky top-[120px] h-fit">
            <div className="rounded-[12px] border-2 border-black p-7 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={22} className="text-[#d4aa72]" />
                <h3 className="text-[22px] font-extrabold text-black">
                  Shop by Type
                </h3>
              </div>

              <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                Choose from popular printer categories and useful supplies.
              </p>

              <div className="space-y-3">
                <CategoryPill
                  title="Inkjet Printers"
                  icon={Printer}
                  link="/shop?category=inkjet-printers"
                />
                <CategoryPill
                  title="Laser Printers"
                  icon={Printer}
                  link="/shop?category=laser-printers"
                />
                <CategoryPill
                  title="All-in-One Printers"
                  icon={Printer}
                  link="/shop?category=all-in-one-printers"
                />
                <CategoryPill
                  title="Printer Accessories"
                  icon={Grid2x2}
                  link="/shop?category=printer-accessories"
                />
              </div>
            </div>

            <div className="rounded-[12px] bg-[#f1f1f1] p-7 overflow-hidden">
              <p className="text-[12px] font-bold uppercase tracking-widest text-[#d4aa72] mb-3">
                Selected Deals
              </p>
              <h3 className="text-[30px] font-extrabold text-black leading-tight mb-4">
                Save on Printer Products
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Explore selected printers and supplies for home and office
                printing needs.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-[44px] px-7 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
              >
                View Collection
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-7">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
                toggleCompare={toggleCompare}
                isInCompare={isInCompare}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          <TrustBadge
            icon={Truck}
            title="Fast Delivery"
            desc="Quick shipping on selected printer products and accessories."
          />
          <TrustBadge
            icon={BadgeCheck}
            title="Quality Products"
            desc="Carefully listed products with clear details and pricing."
          />
          <TrustBadge
            icon={ShieldCheck}
            title="Secure Checkout"
            desc="Safe shopping experience with protected payment processing."
          />
        </div>
      </div>
    </section>
  );
}