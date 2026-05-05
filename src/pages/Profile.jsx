import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import API_BASE_URL from "../config";
import {
  User,
  ArrowRight,
  Package,
  ChevronRight,
  LogOut,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Mail,
  Clock,
  ExternalLink,
  Phone,
  MapPin,
} from "lucide-react";
import SEO from "@/components/SEO";

export default function Profile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zip_code || user?.zipCode || "",
  });

  const [securityForm, setSecurityForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === "success") setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully.");
      }
    } catch {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();

    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: securityForm.password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        showToast("Password updated successfully.");
        setSecurityForm({ password: "", confirmPassword: "" });
      }
    } catch {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <SEO title="My Account | Profile" />

      <section className="w-full bg-white py-14">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="rounded-[14px] border-2 border-black p-8 md:p-12">
            <nav className="flex items-center gap-2 text-[12px] font-bold text-gray-400 mb-6">
              <Link to="/" className="hover:text-[#d4aa72]">
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-black">My Account</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="w-10 h-[2px] bg-[#d4aa72]" />
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                    Account Area
                  </span>
                </div>

                <h1 className="text-[42px] md:text-[60px] font-extrabold leading-tight">
                  My Account
                </h1>

                <p className="mt-3 text-gray-500 max-w-[650px]">
                  Manage your profile details, view recent orders, and update
                  your account password.
                </p>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 h-[48px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
              >
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          <aside className="space-y-6">
            <div className="rounded-[14px] border-2 border-black p-7 bg-white">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="h-20 w-20 rounded-full bg-black text-white flex items-center justify-center text-3xl font-extrabold mb-4">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>

                <h2 className="text-[24px] font-extrabold text-black">
                  {user.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-[13px] mt-2">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { id: "profile", label: "Profile Details", icon: User },
                  { id: "orders", label: "My Orders", icon: Package },
                  { id: "security", label: "Password", icon: Shield },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-full text-[13px] font-bold transition ${activeTab === tab.id
                        ? "bg-black text-white"
                        : "bg-[#f7f7f7] text-black hover:bg-black hover:text-white"
                        }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}

                <div className="pt-5 mt-5 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-full text-[13px] font-bold text-red-500 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] bg-[#f7f7f7] p-7 border border-gray-100">
              <Package size={28} className="text-[#d4aa72] mb-5" />

              <h4 className="text-[22px] font-extrabold text-black">
                Orders & Account
              </h4>

              <p className="mt-3 text-gray-500 text-[14px] leading-relaxed">
                View your order activity, keep your details updated, and browse
                more printer products.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 h-[44px] px-6 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
              >
                Shop Products <ArrowRight size={15} />
              </Link>
            </div>
          </aside>

          <main>
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <m.div
                  key="profile"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-[14px] border-2 border-black p-7 md:p-10 bg-white"
                >
                  <div className="mb-9">
                    <h3 className="text-[32px] font-extrabold text-black">
                      Profile Details
                    </h3>
                    <p className="mt-2 text-[14px] text-gray-500">
                      Update your name, contact number, and delivery details.
                    </p>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Full Name
                        </label>
                        <input
                          required
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              name: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Phone Number
                        </label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Phone number"
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-black">
                        Address
                      </label>
                      <textarea
                        rows="4"
                        value={profileForm.address}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            address: e.target.value,
                          })
                        }
                        placeholder="Street address, apartment, suite..."
                        className="mt-2 w-full p-5 bg-[#f7f7f7] border border-gray-200 rounded-[22px] outline-none focus:border-black resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[13px] font-bold text-black">
                          City
                        </label>
                        <input
                          value={profileForm.city}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              city: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Postal Code
                        </label>
                        <input
                          value={profileForm.zipCode}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              zipCode: e.target.value,
                            })
                          }
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isUpdating}
                      className="h-[52px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition flex items-center gap-3 disabled:opacity-50"
                    >
                      {isUpdating ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Save Changes <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </form>
                </m.div>
              )}

              {activeTab === "orders" && (
                <m.div
                  key="orders"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="space-y-6"
                >
                  <div className="rounded-[14px] border-2 border-black p-7 md:p-10 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-[32px] font-extrabold text-black">
                        My Orders
                      </h3>
                      <p className="mt-2 text-[14px] text-gray-500">
                        {orders.length} order record found in your account.
                      </p>
                    </div>

                    <Link
                      to="/shop"
                      className="h-[48px] px-7 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition flex items-center gap-2"
                    >
                      Browse Products
                    </Link>
                  </div>

                  {loading ? (
                    <div className="h-[220px] rounded-[14px] bg-gray-100 animate-pulse" />
                  ) : orders.length === 0 ? (
                    <div className="rounded-[14px] bg-[#f7f7f7] py-24 text-center">
                      <Package size={48} className="text-gray-300 mx-auto mb-6" />
                      <p className="text-gray-500 font-bold">
                        No orders found yet.
                      </p>
                      <Link
                        to="/shop"
                        className="mt-6 inline-flex h-[46px] px-7 rounded-full bg-black text-white text-[13px] font-bold items-center hover:bg-[#d4aa72]"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5">
                      {orders.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="rounded-[14px] border-2 border-black p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                          <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-full bg-[#f7f7f7] flex items-center justify-center">
                              <Clock size={24} />
                            </div>

                            <div>
                              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                                Order #{order.id}
                              </p>
                              <p className="mt-1 text-[15px] font-extrabold text-black capitalize">
                                {String(order.status || "processing").replace(
                                  /_/g,
                                  " "
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-8">
                            <div className="text-right">
                              <p className="text-[12px] font-bold text-gray-400">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                              <p className="text-[22px] font-extrabold text-black">
                                ${Number(order.total_amount || 0).toLocaleString()}
                              </p>
                            </div>

                            <Link
                              to="/orders"
                              className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#d4aa72] transition"
                            >
                              <ExternalLink size={18} />
                            </Link>
                          </div>
                        </div>
                      ))}

                      <Link
                        to="/orders"
                        className="text-center h-[50px] rounded-full border-2 border-black flex items-center justify-center text-[13px] font-bold hover:bg-black hover:text-white transition"
                      >
                        View All Orders
                      </Link>
                    </div>
                  )}
                </m.div>
              )}

              {activeTab === "security" && (
                <m.div
                  key="security"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-[14px] border-2 border-black p-7 md:p-10 bg-white"
                >
                  <div className="mb-9">
                    <h3 className="text-[32px] font-extrabold text-black">
                      Change Password
                    </h3>
                    <p className="mt-2 text-[14px] text-gray-500">
                      Update your password to keep your account secure.
                    </p>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-7">
                    <div>
                      <label className="text-[13px] font-bold text-black">
                        New Password
                      </label>

                      <div className="relative mt-2">
                        <input
                          type={showPass ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={securityForm.password}
                          onChange={(e) =>
                            setSecurityForm({
                              ...securityForm,
                              password: e.target.value,
                            })
                          }
                          className="w-full h-[50px] pl-5 pr-14 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-black">
                        Confirm Password
                      </label>

                      <input
                        type={showPass ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={securityForm.confirmPassword}
                        onChange={(e) =>
                          setSecurityForm({
                            ...securityForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black"
                      />
                    </div>

                    <button
                      disabled={isUpdating}
                      className="h-[52px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition flex items-center gap-3 disabled:opacity-50"
                    >
                      {isUpdating ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Update Password <Shield size={17} />
                        </>
                      )}
                    </button>
                  </form>
                </m.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}