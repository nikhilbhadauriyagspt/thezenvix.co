import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  Package,
  ChevronRight,
  Loader2,
  ArrowRight,
  Truck,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import API_BASE_URL from "../config";
import SEO from "@/components/SEO";

export default function Orders() {
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await res.json();
      if (data.status === "success") setOrders(data.data);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = [
    { key: "pending", label: "Order Placed", icon: Clock },
    { key: "processing", label: "Preparing Order", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <SEO title="My Orders | The Zenvix" />

      {/* HEADER */}
      <section className="py-14">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="rounded-[14px] border-2 border-black p-8 md:p-12">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-5">
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span className="text-black">Orders</span>
            </nav>

            <h1 className="text-[42px] md:text-[60px] font-extrabold">
              My Orders
            </h1>

            <p className="mt-3 text-gray-500">
              View your recent orders and track delivery status.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4">
        {loading ? (
          <div className="py-32 text-center">
            <Loader2 className="animate-spin mx-auto" size={40} />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 border-2 border-black rounded-[14px]">
            <Package size={40} className="mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
            <Link
              to="/shop"
              className="mt-5 inline-flex px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-[#d4aa72]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border-2 border-black rounded-[14px] p-6"
              >
                {/* TOP */}
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <p className="text-xs text-gray-400">
                      Order #{order.id}
                    </p>
                    <p className="font-bold">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-[20px] font-extrabold">
                    ${Number(order.total_amount).toLocaleString()}
                  </p>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <img
                          src="/logo/fabicon.avif"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-sm">
                          {item.product_name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>

                        <button
                          onClick={() =>
                            addToCart({
                              ...item,
                              name: item.product_name,
                            })
                          }
                          className="text-xs text-[#d4aa72] font-bold mt-1"
                        >
                          Buy Again
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ACTION */}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="mt-6 w-full h-[46px] bg-black text-white rounded-full font-bold hover:bg-[#d4aa72]"
                >
                  Track Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TRACK MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <m.div
              className="fixed inset-0 bg-black/60"
              onClick={() => setSelectedOrder(null)}
            />

            <m.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] max-w-[500px] p-8 rounded-[14px] border-2 border-black">
              <div className="flex justify-between mb-6">
                <h2 className="font-extrabold text-lg">
                  Order Status
                </h2>
                <button onClick={() => setSelectedOrder(null)}>
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                {statusMap.map((step) => {
                  const Icon = step.icon;
                  const active = selectedOrder.status === step.key;

                  return (
                    <div
                      key={step.key}
                      className={`flex items-center gap-4 ${active ? "text-black" : "text-gray-400"
                        }`}
                    >
                      <Icon size={20} />
                      <span className="font-bold">{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}