import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useCart } from "../context/CartContext";
import {
  Search,
  ChevronDown,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  ShoppingCart,
  SlidersHorizontal,
  LayoutGrid,
  Eye,
  ArrowLeftRight,
  Printer,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import API_BASE_URL from "../config";
import { useGlobalData } from "../context/DataContext";

const getImagePath = (images) => {
  try {
    const imgs = typeof images === "string" ? JSON.parse(images) : images;
    if (Array.isArray(imgs) && imgs.length > 0) {
      let path = `/${imgs[0].replace(/\\/g, "/")}`;
      const basePath = path.substring(0, path.lastIndexOf("."));
      return `${basePath}_thumb.avif`;
    }
  } catch { }
  return "/logo/fabicon.avif";
};

export default function Shop() {
  const { categories: globalCategories } = useGlobalData();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItems, setAddedItems] = useState({});

  const itemsPerPage = 12;
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || "";

  const currentCategoryObj = categories.find((c) => c.slug === category);
  const heroTitle = currentCategoryObj ? currentCategoryObj.name : "Printer Collection";

  useEffect(() => {
    if (globalCategories.length > 0) {
      const printers = globalCategories.find(
        (c) => c.slug === "printers" || c.id === 46
      );

      const printerCats =
        printers?.children?.length > 0
          ? printers.children
          : globalCategories.filter((c) => {
            const name = c.name?.toLowerCase() || "";
            const slug = c.slug?.toLowerCase() || "";
            return (
              !name.includes("laptop") &&
              !name.includes("computer") &&
              !name.includes("pc") &&
              !slug.includes("laptop") &&
              !slug.includes("computer") &&
              !slug.includes("pc")
            );
          });

      setCategories(printerCats);
    }
  }, [globalCategories]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("limit", "1000");

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          let filtered = data.data.filter((p) => {
            const name = p.name?.toLowerCase() || "";
            return (
              !name.includes("laptop") &&
              !name.includes("macbook") &&
              !name.includes("notebook") &&
              !name.includes("computer")
            );
          });

          if (sort === "price_low") {
            filtered.sort((a, b) => Number(a.price) - Number(b.price));
          } else if (sort === "price_high") {
            filtered.sort((a, b) => Number(b.price) - Number(a.price));
          }

          setProducts(filtered);
          setCurrentPage(1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, sort]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedItems((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [p.id]: false }));
    }, 1400);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="rounded-[14px] border-2 border-black bg-white p-7">
        <div className="flex items-center gap-3 mb-6">
          <Printer size={22} className="text-[#d4aa72]" />
          <h4 className="text-[22px] font-extrabold text-black">Categories</h4>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => updateFilter("category", "")}
            className={`w-full text-left px-5 py-3 rounded-full text-[13px] font-bold transition ${!category
              ? "bg-black text-white"
              : "bg-[#f7f7f7] text-black hover:bg-black hover:text-white"
              }`}
          >
            All Printer Products
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter("category", c.slug)}
              className={`w-full text-left px-5 py-3 rounded-full text-[13px] font-bold transition ${category === c.slug
                ? "bg-black text-white"
                : "bg-[#f7f7f7] text-black hover:bg-black hover:text-white"
                }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setSearchParams({})}
        className="w-full h-[50px] rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
      >
        Reset Filters
      </button>
    </div>
  );

  const ProductCard = ({ p }) => {
    const isWishlisted = isInWishlist(p.id);
    const isCompared = isInCompare(p.id);
    const isAdded = addedItems[p.id];

    return (
      <div className="group">
        <div className="relative bg-[#f1f1f1] rounded-[10px] h-[330px] flex items-center justify-center p-8 overflow-hidden">
          <Link
            to={`/product/${p.slug}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={getImagePath(p.images)}
              alt={p.name}
              className="max-h-[235px] max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/logo/fabicon.avif";
              }}
            />
          </Link>

          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={() => toggleWishlist(p)}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition ${isWishlisted ? "text-red-500" : "text-black"
                }`}
            >
              <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            <button
              onClick={() => toggleCompare(p)}
              className={`w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition ${isCompared ? "text-[#d4aa72]" : "text-black"
                }`}
            >
              <ArrowLeftRight size={17} />
            </button>

            <Link
              to={`/product/${p.slug}`}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
            >
              <Eye size={17} />
            </Link>
          </div>
        </div>

        <div className="pt-4">
          <Link to={`/product/${p.slug}`}>
            <h3 className="text-[15px] font-extrabold text-black leading-snug line-clamp-2 min-h-[40px] hover:text-[#d4aa72] transition">
              {p.name}
            </h3>
          </Link>

          <div className="mt-3">
            <span className="text-[18px] font-extrabold text-black">
              ${Number(p.price || 0).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 mt-5">
            <button
              onClick={() => handleAddToCart(p)}
              disabled={isAdded}
              className={`w-full h-[42px] rounded-full border-2 border-black text-[13px] font-bold transition flex items-center justify-center gap-2 ${isAdded
                ? "bg-[#d4aa72] border-[#d4aa72] text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
                }`}
            >
              {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
              {isAdded ? "Added" : "Add to Cart"}
            </button>

            <button
              onClick={() => toggleCompare(p)}
              className={`w-full h-[42px] rounded-full text-[13px] font-bold transition ${isCompared
                ? "bg-black text-white"
                : "bg-[#f7f7f7] text-black hover:bg-black hover:text-white"
                }`}
            >
              {isCompared ? "Compared" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <SEO title="Shop Printers, Ink, Toner & Accessories" />

      <section className="w-full bg-white py-16">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="rounded-[14px] border-2 border-black p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="w-10 h-[2px] bg-[#d4aa72]" />
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                    Shop Collection
                  </span>
                </div>

                <h1 className="text-[42px] md:text-[64px] font-extrabold leading-[0.95] tracking-tight">
                  {heroTitle}
                </h1>

                <p className="mt-5 text-[16px] text-gray-500 max-w-[650px] leading-relaxed">
                  Browse printers, ink, toner, and useful accessories in one
                  organized catalog.
                </p>
              </div>

              <div className="rounded-[16px] bg-[#f1f1f1] px-8 py-6 flex items-center gap-5">
                <LayoutGrid size={28} className="text-[#d4aa72]" />
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Products Available
                  </p>
                  <p className="text-[34px] font-extrabold text-black leading-none">
                    {products.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-10 items-start">
          <aside className="hidden lg:block sticky top-28">
            <FilterSidebar />
          </aside>

          <main>
            <div className="rounded-[14px] border-2 border-black p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="relative w-full md:w-[430px]">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search printer products..."
                  value={search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="w-full h-[50px] bg-[#f7f7f7] border border-gray-200 rounded-full pl-12 pr-5 text-sm outline-none focus:border-black transition"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 h-[50px] rounded-full bg-black text-white text-[13px] font-bold flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>

                <div className="relative w-full md:w-[230px]">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className="w-full h-[50px] appearance-none bg-[#f7f7f7] border border-gray-200 rounded-full px-5 pr-10 text-[13px] font-bold outline-none focus:border-black"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="price_low">Price Low to High</option>
                    <option value="price_high">Price High to Low</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[430px] bg-gray-100 rounded-[10px] animate-pulse"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-[14px] border-2 border-dashed border-black py-28 text-center">
                <p className="text-[14px] font-bold text-gray-500">
                  No printer products found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {currentProducts.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-full text-[13px] font-extrabold transition ${currentPage === page
                          ? "bg-black text-white"
                          : "border-2 border-black text-black hover:bg-black hover:text-white"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return (
                    <span key={i} className="px-2">
                      ...
                    </span>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-[2000]"
            />

            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[330px] bg-white z-[2001] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[22px] font-extrabold text-black">
                  Filters
                </h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={24} />
                </button>
              </div>

              <FilterSidebar />

              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-8 h-[50px] rounded-full bg-black text-white text-[13px] font-bold"
              >
                Apply Filters
              </button>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}