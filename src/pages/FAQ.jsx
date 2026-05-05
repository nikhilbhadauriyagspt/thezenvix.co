import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import { ChevronDown, Search, ArrowRight, Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse products, add items to your cart, and complete checkout using your preferred payment method.",
      },
      {
        q: "Do I need an account?",
        a: "You can checkout as a guest. Creating an account helps you track your orders easily.",
      },
      {
        q: "Can I change my order?",
        a: "Orders can be updated before shipping. Once dispatched, changes are not available.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Orders usually arrive within 3–7 business days depending on location.",
      },
      {
        q: "Will I get tracking details?",
        a: "Yes, tracking details are shared once your order is shipped.",
      },
    ],
  },
  {
    category: "Products & Catalog",
    questions: [
      {
        q: "What products are available?",
        a: "We offer printers, ink, toner, and useful accessories for daily use.",
      },
      {
        q: "How do I choose a product?",
        a: "Check product details, specifications, and pricing to select what fits your needs.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState("0-0");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccordion = (catIdx, qIdx) => {
    const id = `${catIdx}-${qIdx}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <SEO title="FAQ | Printer Products Information" />

      {/* HERO */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="rounded-[14px] border-2 border-black p-8 md:p-12 text-center">

            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-[#d4aa72]" />
              <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                FAQs
              </span>
            </div>

            <h1 className="text-[42px] md:text-[60px] font-extrabold leading-tight">
              Common Questions
            </h1>

            <p className="mt-4 text-gray-500 max-w-[600px] mx-auto">
              Find answers related to orders, products, and delivery.
            </p>

            {/* SEARCH */}
            <div className="mt-8 max-w-[500px] mx-auto relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[52px] bg-[#f7f7f7] border border-gray-200 rounded-full pl-12 pr-5 outline-none focus:border-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-16">
        <div className="max-w-[1000px] mx-auto px-4 space-y-16">

          {faqData.map((cat, catIdx) => {
            const filtered = cat.questions.filter(
              (q) =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (!filtered.length) return null;

            return (
              <div key={catIdx}>
                <h2 className="text-[28px] font-extrabold mb-6">
                  {cat.category}
                </h2>

                <div className="space-y-4">
                  {filtered.map((faq, qIdx) => {
                    const id = `${catIdx}-${qIdx}`;
                    const isOpen = openIndex === id;

                    return (
                      <div
                        key={qIdx}
                        className="border-2 border-black rounded-[12px] overflow-hidden"
                      >
                        <button
                          onClick={() => toggleAccordion(catIdx, qIdx)}
                          className="w-full px-6 py-5 flex justify-between items-center"
                        >
                          <span className="font-bold text-left">
                            {faq.q}
                          </span>

                          <ChevronDown
                            className={`transition ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <m.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                            >
                              <div className="px-6 pb-6 text-gray-600">
                                {faq.a}
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="rounded-[14px] border-2 border-black p-10 text-center">

            <h2 className="text-[32px] font-extrabold">
              Explore More Products
            </h2>

            <p className="mt-3 text-gray-500">
              Browse printers, ink, toner, and accessories in one place.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/shop"
                className="h-[50px] px-8 rounded-full bg-black text-white font-bold flex items-center gap-2 hover:bg-[#d4aa72]"
              >
                <ShoppingBag size={18} /> Shop Now
              </Link>

              <Link
                to="/contact"
                className="h-[50px] px-8 rounded-full border-2 border-black font-bold flex items-center gap-2 hover:bg-black hover:text-white"
              >
                <Package size={18} /> Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}