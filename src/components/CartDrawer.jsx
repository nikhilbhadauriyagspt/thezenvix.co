import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const path = imgs[0].replace(/\\/g, '/');
        return path.startsWith('/') ? path : `/${path}`;
      }
    } catch (e) { }
    return "/logo/fabicon.avif";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Overlay */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="absolute inset-0 bg-black/35"
          />

          {/* Drawer */}
          <m.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-0 h-full w-[360px] md:w-[405px] bg-white shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={closeCartDrawer}
              aria-label="Close cart drawer"
              className="absolute -left-[52px] top-[20px] w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-lg"
            >
              <X size={22} />
            </button>

            {/* Content */}
            <div className="px-6 py-7 flex flex-col h-full">
              <div className="flex justify-center items-center gap-3 text-[20px] uppercase font-bold">
                <ShoppingBag size={28} />
                Your Cart ({cartCount})
              </div>

              <div className="border-t mt-6 pt-6 flex-1 overflow-y-auto custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="text-[16px] text-gray-500 mb-8 font-medium">
                      Your cart is currently empty.
                    </div>
                    <Link
                      to="/shop"
                      onClick={closeCartDrawer}
                      className="inline-flex bg-[#d4aa72] text-white px-8 py-3 rounded-[4px] font-bold uppercase tracking-wider hover:bg-black transition-all"
                    >
                      Return To Shop
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 p-2">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-[14px] truncate leading-tight">{item.name}</h4>
                            <p className="text-[#d4aa72] font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border rounded-md h-[32px]">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 h-full hover:bg-gray-100 text-gray-400"
                              >
                                <Minus size={12} strokeWidth={3} />
                              </button>
                              <span className="px-2 text-[13px] font-bold border-x h-full flex items-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 h-full hover:bg-gray-100 text-gray-400"
                              >
                                <Plus size={12} strokeWidth={3} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t pt-6 mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Subtotal</span>
                    <span className="text-2xl font-bold text-black">${Number(cartTotal).toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      onClick={closeCartDrawer}
                      className="flex justify-center items-center w-full h-[52px] bg-[#203f2c] text-white rounded-[4px] font-bold uppercase tracking-wider hover:bg-black transition-all gap-3"
                    >
                      Checkout Now <ArrowRight size={18} />
                    </Link>
                    <Link
                      to="/cart"
                      onClick={closeCartDrawer}
                      className="flex justify-center items-center w-full h-[52px] bg-white border-2 border-[#d4aa72] text-[#d4aa72] rounded-[4px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </m.div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4aa72; }
      `}</style>
    </AnimatePresence>
  );
}
