import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Layers } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function BundleSaveSection({ products = [], loading = false }) {
    const { addToCart, toggleWishlist, isInWishlist, toggleCompare } = useCart();
    const [bundleItems, setBundleItems] = useState([]);

    // Show 20 products as requested
    const bundleProducts = useMemo(() => products.slice(0, 20), [products]);

    const getImagePath = (images) => {
        try {
            const imgs = typeof images === "string" ? JSON.parse(images) : images;
            if (Array.isArray(imgs) && imgs.length > 0) {
                let path = String(imgs[0]).replace(/\\/g, "/").replace(/^public\//, "/");
                const base = path.substring(0, path.lastIndexOf("."));
                return `${base}_thumb.avif`;
            }
        } catch { }
        return "/logo/fabicon.avif";
    };

    // Calculate displayed price: Real price + 5% extra as requested
    const getDisplayedPrice = (product) => {
        const price = Number(product.price || 0);
        const sale = Number(product.sale_price || 0);
        const basePrice = sale > 0 && sale < price ? sale : price;
        return basePrice * 1.05; // 5% extra
    };

    // Subtotal based on displayed (inflated) prices
    const subtotal = bundleItems.reduce((sum, item) => sum + getDisplayedPrice(item), 0);

    const addToBundle = (product) => {
        const exists = bundleItems.some((item) => item.id === product.id);
        if (!exists) setBundleItems((prev) => [...prev, product]);
    };

    const removeBundleItem = (id) => {
        setBundleItems((prev) => prev.filter((item) => item.id !== id));
    };

    const addBundleToCart = () => {
        bundleItems.forEach((item) => addToCart(item));
        setBundleItems([]);
    };

    if (loading) {
        return (
            <section className="w-full bg-white py-16">
                <div className="max-w-[1800px] mx-auto px-4">
                    <div className="h-[500px] bg-gray-100 rounded-xl animate-pulse" />
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-[1800px] mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-[34px] md:text-[40px] font-extrabold text-black ">
                        Exclusive Printer Bundle Deals
                    </h2>
                    <p className="mt-2 text-[13px] text-gray-500">
                        Select 3 or more items and unlock an instant 5% extra discount.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-stretch">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {bundleProducts.map((product) => {
                            const originalPrice = Number(product.price || 0);
                            const displayedPrice = getDisplayedPrice(product);
                            const inWishlist = isInWishlist(product.id);
                            const isAdded = bundleItems.some(item => item.id === product.id);

                            return (
                                <div key={product.id} className="group">
                                    <div className="relative bg-[#f1f1f1] rounded-[8px] h-[325px] flex items-center justify-center p-7 overflow-hidden">
                                        <Link to={`/product/${product.slug}`}>
                                            <img
                                                src={getImagePath(product.images)}
                                                alt={product.name}
                                                className="max-h-[230px] max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/logo/fabicon.avif";
                                                }}
                                            />
                                        </Link>

                                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            <div className="relative group/tooltip">
                                                <button
                                                    onClick={() => toggleWishlist(product)}
                                                    aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
                                                >
                                                    <Heart size={15} fill={inWishlist ? "currentColor" : "none"} />
                                                </button>
                                                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none z-50">
                                                    {inWishlist ? "Remove Wishlist" : "Add Wishlist"}
                                                </span>
                                            </div>

                                            <div className="relative group/tooltip">
                                                <button
                                                    onClick={() => toggleCompare(product)}
                                                    aria-label="Compare Product"
                                                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
                                                >
                                                    <Layers size={15} />
                                                </button>
                                                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none z-50">
                                                    Compare
                                                </span>
                                            </div>

                                            <div className="relative group/tooltip">
                                                <Link
                                                    to={`/product/${product.slug}`}
                                                    aria-label="View Product Details"
                                                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
                                                >
                                                    <Eye size={15} />
                                                </Link>
                                                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition whitespace-nowrap pointer-events-none z-50">
                                                    Quick View
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <Link to={`/product/${product.slug}`}>
                                            <h3 className="text-[14px] font-extrabold text-black line-clamp-2 min-h-[38px] hover:text-[#d4aa72]">
                                                {product.name}
                                            </h3>
                                        </Link>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-black font-bold">
                                                ${displayedPrice.toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => addToBundle(product)}
                                            disabled={isAdded}
                                            className={`mt-4 w-full h-[42px] rounded-full border-2 text-[13px] font-bold transition ${isAdded
                                                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-default"
                                                : "border-black text-black hover:bg-black hover:text-white"
                                                }`}
                                        >
                                            {isAdded ? "Added to Bundle" : "Add to Bundle"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <aside className="relative">
                        <div className="border-2 border-black rounded-[10px] p-7 sticky top-[120px] h-fit z-10 bg-white">
                            <h3 className="text-[20px] font-extrabold text-black">
                                Bundle Summary
                            </h3>
                            <p className="text-[12px] text-gray-500 mt-1">
                                Add at least 3 products and Save 5%.
                            </p>

                            <div className="border-t mt-6 pt-6 space-y-4 min-h-[250px]">
                                {(() => {
                                    const displayItems = [];
                                    const minSlots = 3;
                                    const totalToShow = Math.max(minSlots, bundleItems.length);

                                    for (let i = 0; i < totalToShow; i++) {
                                        const item = bundleItems[i];
                                        if (item) {
                                            displayItems.push(
                                                <div key={item.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-300">
                                                    <img
                                                        src={getImagePath(item.images)}
                                                        alt={item.name}
                                                        className="w-[58px] h-[58px] rounded-full bg-gray-100 object-contain p-2 mix-blend-multiply"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-bold line-clamp-1">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-[12px] text-gray-500">
                                                            ${getDisplayedPrice(item).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeBundleItem(item.id)}
                                                        className="text-[20px] leading-none text-gray-400 hover:text-black transition"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            );
                                        } else {
                                            displayItems.push(
                                                <div key={`empty-${i}`} className="flex items-center gap-3 opacity-40">
                                                    <div className="w-[58px] h-[58px] rounded-full bg-gray-100 border-2 border-dashed border-gray-200" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="w-[80%] h-2 bg-gray-100 rounded" />
                                                        <div className="w-[55%] h-2 bg-gray-100 rounded" />
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                    return displayItems;
                                })()}
                            </div>

                            <div className="border-t mt-6 pt-5 flex items-center justify-between text-[15px] font-bold">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={addBundleToCart}
                                disabled={bundleItems.length < 3}
                                className={`mt-5 w-full h-[50px] rounded-full text-white text-[14px] font-bold transition ${bundleItems.length >= 3
                                    ? "bg-black hover:bg-[#d4aa72]"
                                    : "bg-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Add all to Cart (5% Discount Applied)
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
