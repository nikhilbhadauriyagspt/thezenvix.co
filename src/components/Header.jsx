// Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useGlobalData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  X,
  Menu,
  MapPin,
  CalendarDays,
  HelpCircle,
  ShieldCheck,
  Store,
  Grid2X2,
  ChevronDown,
  Flame,
  Loader2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import API_BASE_URL from "../config";

export default function Header() {
  const { cartCount, cartTotal, openCartDrawer, wishlist, wishlistCount, toggleWishlist } = useCart();
  const { categories: globalCategories, featuredProducts } = useGlobalData();
  const [displayCategories, setDisplayCategories] = useState([]);
  const navigate = useNavigate();

  const [drawerType, setDrawerType] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userCity, setUserCity] = useState("Loading...");

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 1 && featuredProducts) {
      const filtered = featuredProducts
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6);
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery, featuredProducts]);

  useEffect(() => {
    if (globalCategories.length > 0) {
      const printers = globalCategories.find((c) => c.slug === 'printers' || c.id === 46);
      setDisplayCategories(printers ? printers.children : globalCategories.filter(c => !c.name.toLowerCase().includes('laptop')));
    }
  }, [globalCategories]);

  // Auth States
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      let ipCity = "";
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        if (data && data.success && data.city) {
          ipCity = data.city;
          setUserCity(ipCity);
        }
      } catch (err) {
        console.error("IP Location error:", err);
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await res.json();

              const adminLevels = data.localityInfo?.administrative || [];

              // Priority search for major cities in administrative hierarchy
              const majorCity = adminLevels.find(level =>
                level.name.toLowerCase().includes('noida') ||
                level.name.toLowerCase().includes('delhi') ||
                level.name.toLowerCase().includes('gurgaon') ||
                level.name.toLowerCase().includes('ghaziabad') ||
                level.name.toLowerCase().includes('gautam buddha nagar')
              );

              let finalCity = majorCity?.name;

              // If it's Gautam Buddha Nagar, users usually prefer "Noida"
              if (finalCity && finalCity.toLowerCase().includes('gautam buddha nagar')) {
                finalCity = "Noida";
              }

              if (!finalCity) {
                if (ipCity.toLowerCase().includes('noida') &&
                  (data.city?.toLowerCase().includes('dadri') || data.locality?.toLowerCase().includes('dadri'))) {
                  finalCity = ipCity;
                } else {
                  finalCity = data.city || data.locality || ipCity || "Your location";
                }
              }

              // Final check for 'Dadri' specifically if user is in NCR
              if (finalCity.toLowerCase().includes('dadri')) {
                const isNCR = adminLevels.some(l =>
                  l.name.toLowerCase().includes('uttar pradesh') ||
                  l.name.toLowerCase().includes('delhi')
                );
                if (isNCR) finalCity = "Noida";
              }

              setUserCity(finalCity);
            } catch (err) {
              console.error("Reverse geocode error:", err);
              if (!ipCity) setUserCity("Your location");
            }
          },
          (error) => {
            console.warn("Geolocation denied or error:", error);
            if (!ipCity) setUserCity("Your location");
          },
          { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
        );
      } else if (!ipCity) {
        setUserCity("Your location");
      }
    };

    fetchLocation();
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const endpoint = authMode === "login" ? "/login" : "/register";
    const payload = authMode === "login"
      ? { type: 'user', identifier: authData.email, password: authData.password }
      : { type: 'user', name: authData.name, email: authData.email, password: authData.password };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        setUser(data.data);
        closeDrawer();
        setAuthData({ email: "", password: "", name: "", confirmPassword: "" });
      } else {
        setAuthError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setAuthError('Could not connect to server.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event('storage'));
    setUser(null);
    closeDrawer();
    navigate("/");
  };

  const navLinks = [
    { name: "About Us", path: "/about", icon: Store },
    { name: "Contact Us", path: "/contact", icon: HelpCircle },
    { name: "FAQs", path: "/faqs", icon: ShieldCheck },

  ];

  const openDrawer = (type) => setDrawerType(type);
  const closeDrawer = () => setDrawerType(null);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const path = imgs[0].replace(/\\/g, '/');
        const thumbPath = path.replace(/\.(png|jpg|jpeg|webp|avif)$/, '_thumb.avif');
        return thumbPath.startsWith('/') ? thumbPath : `/${thumbPath}`;
      }
    } catch (e) { }
    return "/logo/fabicon.avif";
  };

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-[999]  border-[#e5e5e5] ">
        {/* Top Green Bar */}
        <div className="w-full bg-[#d4aa72] text-white">
          <div className="max-w-[1800px] mx-auto h-[42px] px-4 flex items-center justify-between text-[15px] font-semibold">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Deliver to {userCity}</span>
            </div>

            <nav className="hidden lg:flex items-center">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center gap-2 px-4 border-l border-white/25 hover:text-white/80 transition"
                  >
                    <Icon size={16} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-[1800px] mx-auto h-[82px] px-4 flex items-center gap-5">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="/logo/logo.avif"
              alt="Logo"
              className="h-[60px] w-auto object-contain"
            />
          </Link>

          {/* Browse */}
          <button
            onClick={() => openDrawer("category")}
            className="hidden lg:flex items-center justify-between w-[180px] h-[46px] px-5 border-2 border-[#d4aa72] text-[#d4aa72] font-bold"
          >
            <span className="flex items-center gap-3">
              <Grid2X2 size={18} />
              Browse Now
            </span>

          </button>

          {/* Search */}
          <div className="hidden md:flex flex-1 h-[48px] bg-[#f1f1f1] rounded-[4px] items-center px-5 relative">
            <Flame size={18} className="text-orange-500 mr-3" />
            <input
              type="text"
              placeholder="Search for printers, ink, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setShowResults(true)}
              className="flex-1 bg-transparent outline-none text-[16px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                  setShowResults(false);
                }
              }}
            />
            <Search size={24} className="text-gray-400" />

            {/* Live Search Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[54px] left-0 right-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-xl border border-gray-100 overflow-hidden z-[1000]"
                >
                  <div className="p-2 max-h-[420px] overflow-y-auto custom-scrollbar">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">
                          Product Suggestions
                        </div>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            onClick={() => {
                              setShowResults(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all group"
                          >
                            <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0 p-1 flex items-center justify-center">
                              <img
                                src={getImagePath(product.images)}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[14px] text-gray-800 truncate group-hover:text-[#d4aa72] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-[12px] text-[#d4aa72] font-bold">
                                ${Number(product.price).toFixed(2)}
                              </p>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
                          </Link>
                        ))}
                        <Link
                          to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setShowResults(false)}
                          className="flex justify-center items-center h-[46px] mt-2 bg-[#f9f9f9] text-[13px] font-bold text-gray-600 hover:bg-black hover:text-white transition-all rounded-lg"
                        >
                          View all results for "{searchQuery}"
                        </Link>
                      </>
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-gray-400 text-sm">No products found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center h-full">
            <button
              onClick={() => openDrawer("signin")}
              className="flex items-center gap-3 px-5 border-r border-[#e5e5e5] font-bold"
            >
              <User size={27} />
              {user ? (
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[12px] text-gray-500 font-normal mb-1">Welcome</span>
                  <span className="text-[15px]">{user.name.split(' ')[0]}</span>
                </div>
              ) : "Sign In"}
            </button>

            <button
              onClick={() => openDrawer("wishlist")}
              className="relative flex items-center gap-3 px-5 border-r border-[#e5e5e5] font-bold"
            >
              <Heart size={27} />
              <span className="absolute top-[23px] left-[43px] bg-[#d4aa72] text-white text-[11px] w-[17px] h-[17px] rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
              Wishlist
            </button>

            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-3 px-5 font-bold"
            >
              <ShoppingBag size={29} />
              {cartCount > 0 && (
                <span className="absolute top-[23px] left-[43px] bg-[#d4aa72] text-white text-[11px] w-[17px] h-[17px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              Cart ${Number(cartTotal || 0).toFixed(2)}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden ml-auto"
          >
            <Menu size={30} />
          </button>
        </div>
      </header>

      {/* Side Drawers */}
      <AnimatePresence mode="wait">
        {drawerType && (
          <div className="fixed inset-0 z-[9999]">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/35"
            />

            {/* Left Drawer (Category) */}
            {drawerType === "category" && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute left-0 top-0 h-full w-[360px] md:w-[420px] bg-white shadow-2xl flex flex-col"
              >
                <button
                  onClick={closeDrawer}
                  className="absolute -right-[52px] top-[20px] w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-lg"
                >
                  <X size={22} />
                </button>

                <div className="px-6 py-7 flex flex-col h-full">
                  <div className="flex justify-center items-center gap-3 text-[20px] uppercase font-bold border-b pb-6">
                    <Grid2X2 size={28} className="text-[#d4aa72]" />
                    Browse Categories
                  </div>

                  <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-1 gap-3">
                      {displayCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          onClick={closeDrawer}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 group transition-all border border-transparent hover:border-gray-100"
                        >
                          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-2 group-hover:bg-white transition-colors border border-gray-50">
                            <img
                              src={`/category/${cat.slug}_thumb.avif`}
                              alt={cat.name}
                              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.src = "/logo/fabicon.avif";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[15px] text-gray-800 group-hover:text-[#d4aa72] transition-colors">
                              {cat.name}
                            </h4>
                            <p className="text-[12px] text-gray-400 font-medium">
                              Explore Products
                            </p>
                          </div>
                          <ChevronRight size={18} className="text-gray-300 group-hover:text-[#d4aa72] group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6 mt-auto">
                    <Link
                      to="/shop"
                      onClick={closeDrawer}
                      className="flex justify-center items-center w-full h-[52px] bg-[#203f2c] text-white rounded-[4px] font-bold uppercase tracking-wider hover:bg-black transition-all gap-3"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Right Drawers (Wishlist, Signin) */}
            {drawerType !== "category" && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute right-0 top-0 h-full w-[360px] md:w-[405px] bg-white shadow-2xl flex flex-col"
              >
                <button
                  onClick={closeDrawer}
                  className="absolute -left-[52px] top-[20px] w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow-lg"
                >
                  <X size={22} />
                </button>

                {drawerType === "wishlist" && (
                  <div className="px-6 py-7 flex flex-col h-full">
                    <div className="flex justify-center items-center gap-3 text-[20px] uppercase font-bold">
                      <Heart size={28} />
                      Wishlist ({wishlistCount})
                    </div>

                    <div className="border-t mt-6 pt-6 flex-1 overflow-y-auto custom-scrollbar">
                      {wishlistCount === 0 ? (
                        <div className="text-center py-10">
                          <div className="text-[16px] text-gray-500 mb-8">
                            No products in the wishlist.
                          </div>
                          <Link
                            to="/shop"
                            onClick={closeDrawer}
                            className="inline-flex bg-[#d4aa72] text-white px-8 py-3 rounded-[4px] font-bold uppercase tracking-wider hover:bg-black transition-all"
                          >
                            Return To Shop
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {wishlist.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                              <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 p-2">
                                <img
                                  src={getImagePath(item.images)}
                                  alt={item.name}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[14px] truncate">{item.name}</h4>
                                <p className="text-[#d4aa72] font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                                <button
                                  onClick={() => toggleWishlist(item)}
                                  className="text-[12px] text-gray-400 hover:text-red-500 mt-2 underline"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="pt-6">
                            <Link
                              to="/wishlist"
                              onClick={closeDrawer}
                              className="flex justify-center items-center w-full h-[52px] bg-[#203f2c] text-white rounded-[4px] font-bold uppercase tracking-wider hover:bg-black transition-all"
                            >
                              View Full Wishlist
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {drawerType === "signin" && (
                  <div className="px-6 py-7 h-full flex flex-col">
                    <div className="flex justify-center items-center gap-3 text-[20px] uppercase font-bold">
                      <User size={28} />
                      {user ? "My Account" : "Sign In"}
                    </div>

                    <div className="border-t mt-6 pt-6 flex-1 overflow-y-auto custom-scrollbar">
                      {user ? (
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-12 h-12 bg-[#d4aa72] text-white rounded-full flex items-center justify-center font-bold text-xl uppercase">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-lg">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Link
                              to="/profile"
                              onClick={closeDrawer}
                              className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 rounded-xl transition-colors font-semibold"
                            >
                              <User size={20} />
                              Profile Settings
                            </Link>
                            <Link
                              to="/orders"
                              onClick={closeDrawer}
                              className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 rounded-xl transition-colors font-semibold"
                            >
                              <ShoppingBag size={20} />
                              My Orders
                            </Link>
                            <Link
                              to="/wishlist"
                              onClick={closeDrawer}
                              className="flex items-center gap-3 w-full p-4 hover:bg-gray-50 rounded-xl transition-colors font-semibold"
                            >
                              <Heart size={20} />
                              Wishlist
                            </Link>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold mt-auto"
                          >
                            <LogOut size={20} />
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleAuthSubmit} className="space-y-5">
                          <div className="grid grid-cols-2 text-center uppercase text-[14px] font-bold border-b mb-6">
                            <button
                              type="button"
                              onClick={() => { setAuthMode("login"); setAuthError(""); }}
                              className={`pb-4 transition-all ${authMode === "login" ? "border-b-2 border-black" : "text-gray-400"}`}
                            >
                              Login
                            </button>
                            <button
                              type="button"
                              onClick={() => { setAuthMode("register"); setAuthError(""); }}
                              className={`pb-4 transition-all ${authMode === "register" ? "border-b-2 border-black" : "text-gray-400"}`}
                            >
                              Register
                            </button>
                          </div>

                          {authError && (
                            <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-lg text-center">
                              {authError}
                            </div>
                          )}

                          {authMode === "register" && (
                            <div className="space-y-1">
                              <label className="block text-[13px] font-bold text-gray-700">
                                Full Name *
                              </label>
                              <input
                                required
                                value={authData.name}
                                onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                                className="w-full h-[44px] border rounded-[4px] px-3 outline-none focus:border-black transition-all"
                                placeholder="John Doe"
                              />
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="block text-[13px] font-bold text-gray-700">
                              {authMode === "login" ? "Username or email *" : "Email address *"}
                            </label>
                            <input
                              required
                              type="email"
                              value={authData.email}
                              onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                              className="w-full h-[44px] border rounded-[4px] px-3 outline-none focus:border-black transition-all"
                              placeholder="your@email.com"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[13px] font-bold text-gray-700">
                              Password *
                            </label>
                            <input
                              required
                              type="password"
                              value={authData.password}
                              onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                              className="w-full h-[44px] border rounded-[4px] px-3 outline-none focus:border-black transition-all"
                              placeholder="••••••••"
                            />
                          </div>

                          {authMode === "login" && (
                            <label className="flex items-center gap-2 text-[13px] font-medium text-gray-600 cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                              Remember me
                            </label>
                          )}

                          <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full h-[52px] bg-[#203f2c] text-white rounded-[4px] font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-3"
                          >
                            {authLoading ? <Loader2 size={20} className="animate-spin" /> : (authMode === "login" ? "Login" : "Register")}
                          </button>

                          {authMode === "login" && (
                            <p className="text-center text-[13px] font-medium text-gray-500 hover:text-black cursor-pointer transition-all">
                              Lost your password?
                            </p>
                          )}
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999]">
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute left-0 top-0 h-full w-[310px] bg-white p-5">
            <div className="flex justify-between items-center border-b pb-4">
              <img src="/logo/logo.avif" alt="Logo" className="h-10" />
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="mt-5 space-y-2">
              <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 font-semibold">Home</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="block py-3 font-semibold">Shop</Link>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block py-3 font-semibold">Wishlist</Link>

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-3 font-semibold">My Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left py-3 font-semibold text-red-500">Sign Out</button>
                </>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); openDrawer("signin"); }}
                  className="block w-full text-left py-3 font-semibold"
                >
                  Sign In / Register
                </button>
              )}

              {navLinks.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setMobileOpen(false)} className="block py-3 font-semibold">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4aa72; }
      `}</style>
    </>
  );
}
