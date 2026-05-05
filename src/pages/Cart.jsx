import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ChevronLeft,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";
import SEO from "@/components/SEO";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${String(imgs[0]).replace(/\\/g, "/")}`;
      }
    } catch { }
    return "/logo/fabicon.avif";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 text-center">
        <SEO title="Shopping Cart | Printer Products" />

        <div className="max-w-[560px] rounded-[16px] border-2 border-black p-10 md:p-14">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#f1f1f1] flex items-center justify-center mb-7">
            <ShoppingCart size={34} className="text-black" />
          </div>

          <h1 className="text-[34px] md:text-[44px] font-extrabold text-black leading-tight">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500 text-[15px]">
            Browse printers, ink, toner, and accessories to add products to your cart.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 h-[50px] px-9 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
          >
            <ChevronLeft size={17} />
            Explore Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <SEO title="Shopping Cart | Printer Products" />

      <div className="max-w-[1800px] mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-[38px] md:text-[52px] font-extrabold text-black">
            Shopping Cart
          </h1>
          <p className="mt-2 text-[14px] text-gray-500">
            Review your selected printer products before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-10 items-start">
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[170px_1fr] gap-6 rounded-[14px] border-2 border-black p-5 md:p-6 bg-white"
              >
                <div className="h-[170px] bg-[#f1f1f1] rounded-[10px] flex items-center justify-center p-6">
                  <img
                    src={getImagePath(item.images)}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    onError={(e) => {
                      e.currentTarget.src = "/logo/fabicon.avif";
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.slug}`}>
                        <h2 className="text-[20px] md:text-[24px] font-extrabold text-black leading-tight line-clamp-2 hover:text-[#d4aa72] transition">
                          {item.name}
                        </h2>
                      </Link>

                      <p className="mt-2 text-[13px] text-gray-500">
                        Selected product in your shopping cart.
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-11 h-11 rounded-full bg-[#f7f7f7] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Quantity
                      </p>

                      <div className="inline-flex items-center rounded-full border-2 border-black overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-11 h-11 flex items-center justify-center hover:bg-black hover:text-white transition disabled:opacity-30"
                        >
                          <Minus size={15} strokeWidth={3} />
                        </button>

                        <span className="w-12 text-center font-extrabold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-11 h-11 flex items-center justify-center hover:bg-black hover:text-white transition"
                        >
                          <Plus size={15} strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Price
                      </p>
                      <p className="text-[26px] font-extrabold text-black">
                        ${Number(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 mt-4 h-[48px] px-7 rounded-full border-2 border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition"
            >
              <ChevronLeft size={17} />
              Continue Shopping
            </Link>
          </div>

          <div className="rounded-[14px] bg-white border-2 border-black p-7 sticky top-28">
            <div className="flex items-center gap-3 mb-7">
              <Package size={25} className="text-[#d4aa72]" />
              <h3 className="text-[26px] font-extrabold text-black">
                Order Summary
              </h3>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between text-[15px]">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-extrabold">${total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[15px]">
                <span className="text-gray-500">Shipping</span>
                <span className="font-extrabold text-[#d4aa72]">Calculated later</span>
              </div>

              <div className="border-t pt-6 flex justify-between items-end">
                <span className="font-extrabold text-[18px]">Total</span>
                <span className="font-extrabold text-[34px] text-black">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-7 w-full h-[54px] rounded-full bg-black text-white flex items-center justify-center gap-3 text-[13px] font-bold hover:bg-[#d4aa72] transition"
            >
              Checkout Now
              <ArrowRight size={18} />
            </Link>

            <div className="mt-7 rounded-[18px] bg-[#f7f7f7] p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-black" />
                <div>
                  <h4 className="text-[13px] font-extrabold text-black">
                    Secure Checkout
                  </h4>
                  <p className="text-[12px] text-gray-500 mt-1">
                    Your order details remain protected during checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}