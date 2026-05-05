import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Loader2,
  CheckCircle2,
  Package,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

const paypalOptions = {
  "client-id": "Aa7mAnBKh44YCdokTrFjIP1wIB6mVVjrN8z-NZc_G2VLYJle_Xz9pMdOO7DRXx7zYT7Gh0dzbJUY9DDm",
  currency: "USD",
  intent: "capture"
};

export default function Checkout() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <CheckoutContent />
    </PayPalScriptProvider>
  );
}

function CheckoutContent() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'thezenvix.co',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      window.scrollTo(0, 0);
      setStep(2);
    }
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f5f5]">
        <div className="bg-white p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-3xl text-center max-w-md">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Package size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Your Cart is Empty</h2>
          <p className="text-slate-500 mb-10 font-medium">No items found in your cart to checkout.</p>
          <Link to="/shop" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#05718A] transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200">
            <ChevronLeft size={18} />
            Explore Printers
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f5f5]">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-16 border border-slate-100 shadow-2xl shadow-slate-200/60 text-center max-w-lg w-full rounded-[40px]"
        >
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-slate-900 tracking-tight">Order Confirmed!</h1>
          <p className="text-slate-500 mb-12 font-medium">
            Order Number: <span className="text-[#05718A] font-bold">#ORD-{orderId}</span>. <br />
            We've sent a confirmation email to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#05718A] transition-all shadow-lg shadow-slate-200">
              Track Order
            </Link>
            <Link to="/" className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
              Back to Home
            </Link>
          </div>
        </m.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-slate-900 pb-20">
      <SEO title="Secure Checkout | Fast Shipping on Printers | The Zenvix" />

      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-100 py-8 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-[1700px] mx-auto px-6 flex items-center justify-between">
          <Link to="/">
            <img src="/logo/logo.avif" alt="Logo" className="h-10" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#05718A] rounded-full"></div>
            <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Secure Checkout</span>
          </div>
          <div className="hidden md:block">
            <Link to="/cart" className="text-[12px] font-bold text-slate-400 hover:text-[#05718A] uppercase tracking-widest flex items-center gap-2 transition-colors">
              <ChevronLeft size={16} />
              Return to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* MAIN FORM AREA */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* STEP 1: SHIPPING */}
              <div className={`bg-white border rounded-[32px] shadow-xl shadow-slate-200/50 ${step === 1 ? 'border-[#05718A]' : 'border-slate-100'} p-10 transition-all`}>
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                  <div className="flex items-center gap-5">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${step > 1 ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                      {step > 1 ? <CheckCircle2 size={20} /> : '01'}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">Shipping Details</h3>
                  </div>
                  {step > 1 && (
                    <button onClick={() => setStep(1)} type="button" className="text-[11px] font-bold text-[#05718A] uppercase tracking-widest hover:underline transition-colors">Edit</button>
                  )}
                </div>

                <AnimatePresence>
                  {step === 1 ? (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                          <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="your@email.com" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                          <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Given name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                          <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Surname" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Delivery Address</label>
                          <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Street, Apartment, etc." className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                          <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">ZIP / Postal Code</label>
                          <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Code" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                          <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#05718A] focus:bg-white transition-all text-[15px] font-medium" />
                        </div>
                      </div>
                      <div className="pt-6">
                        <button type="submit" className="bg-slate-900 text-white px-12 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#05718A] transition-all active:scale-95 shadow-lg shadow-slate-200">
                          Continue to Payment
                        </button>
                      </div>
                    </m.div>
                  ) : (
                    <div className="text-[15px] text-slate-600 bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-2">
                      <p className="font-bold text-slate-900 text-lg">{formData.firstName} {formData.lastName}</p>
                      <p className="font-medium">{formData.address}</p>
                      <p className="font-medium">{formData.city}, {formData.zipCode}</p>
                      <p className="text-[#05718A] font-bold pt-4 uppercase text-xs tracking-widest">Phone: {formData.phone}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* STEP 2: PAYMENT */}
              <div className={`bg-white border rounded-[32px] shadow-xl shadow-slate-200/50 ${step === 2 ? 'border-[#05718A]' : 'border-slate-100'} p-10 transition-all`}>
                <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-50">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300'}`}>02</span>
                  <h3 className="text-2xl font-bold tracking-tight">Payment Method</h3>
                </div>

                <AnimatePresence>
                  {step === 2 && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                          onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className={`p-8 border-2 rounded-2xl cursor-pointer flex items-start gap-5 transition-all ${formData.paymentMethod === 'cod' ? 'border-[#05718A] bg-blue-50/20' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${formData.paymentMethod === 'cod' ? 'border-[#05718A]' : 'border-slate-200'}`}>
                            {formData.paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-[#05718A]" />}
                          </div>
                          <div>
                            <p className="font-bold text-[16px] tracking-tight">Cash on Delivery</p>
                            <p className="text-[13px] text-slate-500 font-medium mt-2 leading-relaxed">Pay with cash when your printer is delivered.</p>
                          </div>
                        </div>

                        <div
                          onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                          className={`p-8 border-2 rounded-2xl cursor-pointer flex items-start gap-5 transition-all ${formData.paymentMethod === 'paypal' ? 'border-[#05718A] bg-blue-50/20' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0 ${formData.paymentMethod === 'paypal' ? 'border-[#05718A]' : 'border-slate-200'}`}>
                            {formData.paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-[#05718A]" />}
                          </div>
                          <div>
                            <p className="font-bold text-[16px] tracking-tight">Digital Payment</p>
                            <p className="text-[13px] text-slate-500 font-medium mt-2 leading-relaxed">Pay securely via PayPal or Credit/Debit Card.</p>
                          </div>
                        </div>
                      </div>

                      {formData.paymentMethod === 'paypal' ? (
                        <div className="p-10 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "rect", color: "black" }}
                            createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toString() } }] })}
                            onApprove={async (data, actions) => {
                              const details = await actions.order.capture();
                              await handleOrderSuccess(details);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="pt-4">
                          <button
                            disabled={loading}
                            onClick={handleOrderSuccess}
                            type="button"
                            className="bg-slate-900 text-white px-12 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#05718A] transition-all active:scale-95 flex items-center gap-4 shadow-lg shadow-slate-200"
                          >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                              <>
                                Confirm Order
                                <ArrowRight size={18} />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 sticky top-32 rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50">
              <h3 className="text-xl font-bold mb-10 text-slate-900">Order Summary</h3>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
                </div>
                <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-lg">Total Amount</span>
                  <span className="font-bold text-3xl text-[#05718A] tracking-tight">${total.toLocaleString()}</span>
                </div>
              </div>

              <button
                disabled={loading || (step === 2 && formData.paymentMethod === 'paypal')}
                onClick={handleSubmit}
                className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-[#05718A] disabled:opacity-50 shadow-lg shadow-slate-200"
              >
                {step === 1 ? 'Go to Payment' : 'Place Order'}
              </button>

              <div className="mt-10 pt-10 border-t border-slate-50 space-y-6 text-center">
                <div className="flex items-center justify-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <CreditCard size={18} className="text-[#05718A]" />
                  <span>Verified Safe Payments</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


