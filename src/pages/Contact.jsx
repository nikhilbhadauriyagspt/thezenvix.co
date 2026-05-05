import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Package,
  ShoppingBag,
  FileText,
} from "lucide-react";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO title="Contact Us | Printer Products and Supplies" />

      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
            <div className="rounded-[14px] border-2 border-black p-8 md:p-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#d4aa72]" />
                <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                  Contact Our Store
                </span>
              </div>

              <h1 className="text-[30px] md:text-[50px] 2xl:text-[60px] font-extrabold leading-[0.95] tracking-tight">
                Have a Question About Our Products?
              </h1>

              <p className="mt-6 text-[16px] md:text-[18px] text-gray-600 leading-relaxed max-w-[760px]">
                Send us your question about printer products, orders, product
                availability, or general store information. We keep the process
                simple, clear, and easy to follow.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 h-[48px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
                >
                  Explore Catalog <ArrowRight size={16} />
                </Link>

                <a
                  href="mailto:info@thezenvix.co"
                  className="inline-flex items-center gap-3 h-[48px] px-8 rounded-full border-2 border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition"
                >
                  Email Us
                </a>
              </div>
            </div>

            <div className="rounded-[14px] bg-[#f1f1f1] p-8 min-h-[360px] flex flex-col justify-between">
              <div>
                <Mail size={34} className="text-[#d4aa72] mb-6" />
                <h2 className="text-[30px] font-extrabold leading-tight">
                  Store Email
                </h2>
                <p className="mt-4 text-[14px] text-gray-500 leading-relaxed">
                  Use this email for product questions, order-related messages,
                  and general store communication.
                </p>
              </div>

              <a
                href="mailto:info@thezenvix.co"
                className="mt-8 text-[18px] font-extrabold text-black hover:text-[#d4aa72] transition"
              >
                info@thezenvix.co
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pb-20">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
            <div className="space-y-6">
              <div className="rounded-[12px] border-2 border-black p-7">
                <MessageSquare size={26} className="text-[#d4aa72] mb-5" />
                <h3 className="text-[26px] font-extrabold leading-tight">
                  What can you write to us about?
                </h3>
                <p className="mt-4 text-[14px] text-gray-500 leading-relaxed">
                  Keep your message simple. Share product name, order detail, or
                  the information you are looking for.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: ShoppingBag,
                    title: "Product Questions",
                    desc: "Ask about printers, ink, toner, and accessories.",
                  },
                  {
                    icon: Package,
                    title: "Order Information",
                    desc: "Share your order details for basic order-related queries.",
                  },
                  {
                    icon: FileText,
                    title: "General Store Inquiry",
                    desc: "Send questions about availability, catalog, or policies.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-[20px] bg-[#f7f7f7] p-6 border border-gray-100"
                    >
                      <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
                        <Icon size={21} />
                      </div>
                      <h4 className="font-extrabold text-[15px] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[14px] bg-white border-2 border-black p-7 md:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-[#f1f1f1] text-black rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                    </div>

                    <h2 className="mt-8 text-[32px] font-extrabold text-black">
                      Message Sent
                    </h2>

                    <p className="mt-3 text-gray-500 max-w-md mx-auto">
                      Thank you for writing to us. Your message has been
                      received.
                    </p>

                    <button
                      onClick={() => setStatus(null)}
                      className="mt-8 h-[48px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
                    >
                      Send Another Message
                    </button>
                  </m.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <div>
                      <h2 className="text-[34px] font-extrabold text-black">
                        Send a Message
                      </h2>
                      <p className="mt-2 text-[14px] text-gray-500">
                        Fill the form and share your question clearly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black transition"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black transition"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Your phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="mt-2 w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black transition"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] font-bold text-black">
                          Subject
                        </label>
                        <div className="relative mt-2">
                          <select
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            className="w-full h-[50px] px-5 bg-[#f7f7f7] border border-gray-200 rounded-full outline-none focus:border-black appearance-none cursor-pointer transition"
                          >
                            <option>General Inquiry</option>
                            <option>Product Question</option>
                            <option>Order Information</option>
                            <option>Bulk Order Inquiry</option>
                          </select>
                          <ChevronDown
                            size={18}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[13px] font-bold text-black">
                        Your Message
                      </label>
                      <textarea
                        required
                        rows="6"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="mt-2 w-full py-5 px-5 bg-[#f7f7f7] border border-gray-200 rounded-[22px] outline-none focus:border-black transition resize-none"
                      />
                    </div>

                    <button
                      disabled={loading}
                      className="h-[52px] px-9 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition flex items-center gap-3 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Send Message <Send size={17} />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="text-red-500 font-bold text-xs uppercase tracking-widest">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}