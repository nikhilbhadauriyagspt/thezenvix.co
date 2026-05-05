import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from "framer-motion";
import { CartProvider } from './context/CartContext';
import { DataProvider } from './context/DataContext';

// Core Components (Immediate load for critical UI)
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import Header from './components/Header';
import Home from './pages/Home';

// Lazy load Layout/Utility components to reduce initial JS weight
const Footer = lazy(() => import('./components/Footer'));
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const SearchOverlay = lazy(() => import('./components/SearchOverlay'));
const BottomNav = lazy(() => import('./components/BottomNav'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));

// Lazy load non-critical pages
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const EditorialPolicy = lazy(() => import('./pages/EditorialPolicy'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Compare = lazy(() => import('./pages/Compare'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Profile = lazy(() => import('./pages/Profile'));
const UserLogin = lazy(() => import('./pages/UserLogin'));
const UserSignup = lazy(() => import('./pages/UserSignup'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

// Admin pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductManager = lazy(() => import('./pages/admin/ProductManager'));
const ProductForm = lazy(() => import('./pages/admin/ProductForm'));
const CategoryManager = lazy(() => import('./pages/admin/CategoryManager'));
const OrderManager = lazy(() => import('./pages/admin/OrderManager'));
const ContactManager = lazy(() => import('./pages/admin/ContactManager'));
const NewsletterManager = lazy(() => import('./pages/admin/NewsletterManager'));
const UserManager = lazy(() => import('./pages/admin/UserManager'));
const ImageManager = lazy(() => import('./pages/admin/ImageManager'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#05718A]"></div>
  </div>
);

// Layout wrapper for customer-facing pages
const ShopLayout = ({ children }) => (
  <div className="bg-white min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Suspense fallback={<div className="h-64 bg-slate-50" />}>
      <Footer />
    </Suspense>
  </div>
);

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <DataProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Toast />
            <Suspense fallback={null}>
              <CartDrawer />
              <SearchOverlay />
              <BottomNav />
              <CookieConsent />
            </Suspense>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<ShopLayout><Home /></ShopLayout>} />
                <Route path="/shop" element={<ShopLayout><Shop /></ShopLayout>} />
                <Route path="/category/:category" element={<ShopLayout><Shop /></ShopLayout>} />
                <Route path="/brand/:brand" element={<ShopLayout><Shop /></ShopLayout>} />
                <Route path="/product/:slug" element={<ShopLayout><ProductDetail /></ShopLayout>} />
                <Route path="/about" element={<ShopLayout><About /></ShopLayout>} />
                <Route path="/contact" element={<ShopLayout><Contact /></ShopLayout>} />
                <Route path="/cart" element={<ShopLayout><Cart /></ShopLayout>} />
                <Route path="/wishlist" element={<ShopLayout><Wishlist /></ShopLayout>} />
                <Route path="/compare" element={<ShopLayout><Compare /></ShopLayout>} />
                <Route path="/checkout" element={<ShopLayout><Checkout /></ShopLayout>} />
                <Route path="/orders" element={<ShopLayout><Orders /></ShopLayout>} />
                <Route path="/track-order" element={<ShopLayout><Orders /></ShopLayout>} />
                <Route path="/faqs" element={<ShopLayout><FAQ /></ShopLayout>} />
                <Route path="/profile" element={<ShopLayout><Profile /></ShopLayout>} />
                <Route path="/privacy-policy" element={<ShopLayout><PrivacyPolicy /></ShopLayout>} />
                <Route path="/cookie-policy" element={<ShopLayout><CookiePolicy /></ShopLayout>} />
                <Route path="/terms-and-conditions" element={<ShopLayout><TermsAndConditions /></ShopLayout>} />
                <Route path="/return-policy" element={<ShopLayout><ReturnPolicy /></ShopLayout>} />
                <Route path="/shipping-policy" element={<ShopLayout><ShippingPolicy /></ShopLayout>} />
                <Route path="/editorial-policy" element={<ShopLayout><EditorialPolicy /></ShopLayout>} />
                <Route path="/login" element={<ShopLayout><UserLogin /></ShopLayout>} />
                <Route path="/signup" element={<ShopLayout><UserSignup /></ShopLayout>} />

                {/* Admin Auth */}
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductManager />} />
                  <Route path="products/add" element={<ProductForm />} />
                  <Route path="products/edit/:id" element={<ProductForm />} />
                  <Route path="categories" element={<CategoryManager />} />
                  <Route path="orders" element={<OrderManager />} />
                  <Route path="contacts" element={<ContactManager />} />
                  <Route path="newsletter" element={<NewsletterManager />} />
                  <Route path="users" element={<UserManager />} />
                  <Route path="images" element={<ImageManager />} />
                  <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </DataProvider>
    </LazyMotion>
  );
}

export default App;
