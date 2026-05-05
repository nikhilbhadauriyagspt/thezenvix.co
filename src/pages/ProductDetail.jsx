import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useCart } from "../context/CartContext";
import {
  Heart,
  ChevronRight,
  Truck,
  Plus,
  Minus,
  ShoppingCart,
  Share2,
  Info,
  Zap,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { m } from "framer-motion";
import API_BASE_URL from "../config";

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("/logo/fabicon.avif");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [zoomBgPos, setZoomBgPos] = useState("0% 0%");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomBgPos(`${x}% ${y}%`);
    setZoomStyle({ display: "block" });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          url: window.location.href,
        })
        .catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProduct(data.data);

          const productImages = getImages(data.data.images);
          setImages(productImages);
          setMainImage(
            productImages.length > 0 ? productImages[0] : "/logo/fabicon.avif"
          );

          const categories = data.data.categories || [];
          const categorySlug =
            categories.length > 0 ? categories[0].slug : "";

          let fetchUrl = `${API_BASE_URL}/products?limit=12`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === "success") {
                setRelatedProducts(
                  relData.data
                    .filter((p) => p.id !== data.data.id)
                    .slice(0, 6)
                );
              }
            });
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      return Array.isArray(imgs)
        ? imgs.map((img) => `/${img.replace(/\\/g, "/")}`)
        : [];
    } catch {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, "/")}`.replace(
          /\.(png|jpg|jpeg)$/i,
          ".avif"
        );
      }
    } catch { }
    return "/logo/fabicon.avif";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-black animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-[34px] font-extrabold text-black mb-4">
          Product Not Found
        </h2>

        <Link
          to="/shop"
          className="h-[48px] px-8 rounded-full bg-black text-white text-[13px] font-bold flex items-center justify-center hover:bg-[#d4aa72] transition"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <SEO title={product.name} />

      <section className="w-full bg-white py-14">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="rounded-[14px] border-2 border-black p-8 md:p-12">
            <nav className="flex items-center gap-2 text-[12px] font-bold text-gray-400 mb-6">
              <Link to="/" className="hover:text-[#d4aa72] transition">
                Home
              </Link>
              <ChevronRight size={14} />
              <Link to="/shop" className="hover:text-[#d4aa72] transition">
                Shop
              </Link>
              <ChevronRight size={14} />
              <span className="text-black">Product Details</span>
            </nav>

            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-[#d4aa72]" />
              <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                Product Details
              </span>
            </div>

            <h1 className="text-[38px] md:text-[56px] font-extrabold leading-tight max-w-[1100px]">
              {product.name}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-5">
              {images.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[610px] order-2 md:order-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => {
                        setActiveImage(idx);
                        setMainImage(img);
                      }}
                      onClick={() => {
                        setActiveImage(idx);
                        setMainImage(img);
                      }}
                      className={`w-20 h-20 rounded-[10px] border-2 p-2 bg-white shrink-0 transition ${activeImage === idx
                          ? "border-black"
                          : "border-gray-200 hover:border-black"
                        }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div
                className="relative flex-1 aspect-square rounded-[14px] bg-[#f1f1f1] border-2 border-black flex items-center justify-center p-8 md:p-12 overflow-hidden cursor-crosshair order-1 md:order-2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <m.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />

                <div
                  className="hidden lg:block absolute left-full top-0 ml-6 w-[560px] h-[560px] bg-white border-2 border-black z-[100] pointer-events-none rounded-[14px] overflow-hidden"
                  style={{
                    ...zoomStyle,
                    backgroundImage: `url(${mainImage})`,
                    backgroundPosition: zoomBgPos,
                    backgroundSize: "300%",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
                >
                  <Heart
                    size={21}
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
                    className={
                      isInWishlist(product.id) ? "text-red-500" : "text-black"
                    }
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-[14px] bg-[#f7f7f7] p-6 border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Truck size={23} />
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-black">
                    Delivery Available
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Shipping options shown at checkout
                  </p>
                </div>
              </div>

              <div className="rounded-[14px] bg-[#f7f7f7] p-6 border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <RotateCcw size={23} />
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-black">
                    Return Policy
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Check return details before purchase
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[14px] border-2 border-black p-7 md:p-10 bg-white">
              <div className="flex items-center justify-between gap-5 mb-8">
                <div>
                  <p className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                    Selected Product
                  </p>
                </div>

                <button
                  onClick={handleShare}
                  className="w-11 h-11 rounded-full bg-[#f7f7f7] flex items-center justify-center hover:bg-black hover:text-white transition"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {discount > 0 && (
                <span className="inline-block mb-5 bg-[#d94438] text-white text-[12px] font-bold px-4 py-2 rounded-full">
                  Save {discount}% Off
                </span>
              )}

              <div className="mb-8">
                <div className="flex items-start">
                  <span className="text-[22px] font-extrabold mt-2 mr-1">
                    $
                  </span>
                  <span className="text-[50px] md:text-[62px] font-extrabold leading-none">
                    {parseFloat(product.price).toLocaleString()}
                  </span>
                </div>

                {product.old_price && (
                  <p className="mt-2 text-[15px] text-gray-500">
                    Was{" "}
                    <span className="line-through">
                      ${parseFloat(product.old_price).toLocaleString()}
                    </span>
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-8 space-y-7">
                <div className="flex items-center gap-5">
                  <span className="text-[14px] font-extrabold text-black">
                    Quantity
                  </span>

                  <div className="inline-flex items-center rounded-full border-2 border-black overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-11 h-11 flex items-center justify-center hover:bg-black hover:text-white transition"
                    >
                      <Minus size={16} strokeWidth={2.5} />
                    </button>

                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-12 bg-transparent text-center text-[16px] font-extrabold outline-none"
                    />

                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center hover:bg-black hover:text-white transition"
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`h-[54px] rounded-full text-[13px] font-bold transition flex items-center justify-center gap-3 ${isAdded
                        ? "bg-[#d4aa72] text-white"
                        : "bg-black text-white hover:bg-[#d4aa72]"
                      }`}
                  >
                    <ShoppingCart size={18} />
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="h-[54px] rounded-full border-2 border-black text-black text-[13px] font-bold flex items-center justify-center gap-3 hover:bg-black hover:text-white transition"
                  >
                    <Zap size={18} />
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-gray-200">
                <h4 className="text-[17px] font-extrabold text-black mb-5">
                  Overview
                </h4>

                <ul className="space-y-4">
                  {product.description ? (
                    product.description.split(".").map(
                      (sentence, idx) =>
                        sentence.trim() && (
                          <li
                            key={idx}
                            className="flex gap-3 text-[14px] text-gray-600 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 bg-[#d4aa72] rounded-full mt-2 shrink-0" />
                            <span>{sentence.trim()}.</span>
                          </li>
                        )
                    )
                  ) : (
                    <>
                      <li className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-[#d4aa72] rounded-full mt-2 shrink-0" />
                        <span>
                          Reliable printer product for everyday printing needs.
                        </span>
                      </li>
                      <li className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-[#d4aa72] rounded-full mt-2 shrink-0" />
                        <span>
                          Designed for simple use at home, office, or workspace.
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="rounded-[14px] bg-black text-white p-7 md:p-9">
              <div className="flex items-center gap-3 mb-7">
                <Info size={23} className="text-[#d4aa72]" />
                <h3 className="text-[22px] font-extrabold">
                  Product Highlights
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Product Type", value: "Printer Product" },
                  { label: "Use", value: "Home & Office" },
                  { label: "Availability", value: "Online Catalog" },
                  { label: "Checkout", value: "Secure Order" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      {spec.label}
                    </p>
                    <p className="mt-1 text-[15px] font-extrabold text-white">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="w-10 h-[2px] bg-[#d4aa72]" />
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                    More Products
                  </span>
                </div>

                <h3 className="text-[34px] md:text-[42px] font-extrabold text-black">
                  Recommended for You
                </h3>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 h-[48px] px-7 rounded-full border-2 border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition"
              >
                See All Products <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  to={`/product/${p.slug}`}
                  key={p.id}
                  className="group"
                >
                  <div className="relative bg-[#f1f1f1] rounded-[10px] h-[230px] flex items-center justify-center p-6 overflow-hidden">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-h-[170px] max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-4">
                    <h4 className="text-[14px] font-extrabold text-black line-clamp-2 min-h-[38px] group-hover:text-[#d4aa72] transition">
                      {p.name}
                    </h4>

                    <p className="mt-2 text-[17px] font-extrabold text-black">
                      ${parseFloat(p.price).toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}