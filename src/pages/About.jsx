import React from "react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Printer,
  Package,
  Truck,
  ShieldCheck,
  Search,
  CreditCard,
  Layers,
  Droplets,
  BadgeCheck,
  Sparkles,
  Heart,
  Globe,
} from "lucide-react";

export default function About() {
  const categories = [
    {
      title: "Printer Selection",
      desc: "A focused range of printers for home desks, workspaces, and everyday business printing needs.",
      icon: Printer,
    },
    {
      title: "Ink & Toner",
      desc: "Useful consumables listed with clear product details so customers can choose with confidence.",
      icon: Droplets,
    },
    {
      title: "Printer Accessories",
      desc: "Practical accessories, supplies, and add-ons arranged for simple browsing and easy ordering.",
      icon: Layers,
    },
  ];

  const steps = [
    {
      icon: Search,
      title: "Explore Products",
      text: "Browse categories, compare details, and choose what fits your printing needs.",
    },
    {
      icon: CreditCard,
      title: "Place Order",
      text: "Use a simple checkout flow with clear pricing and order details.",
    },
    {
      icon: Package,
      title: "Careful Packing",
      text: "Products are prepared with attention before they move for delivery.",
    },
    {
      icon: Truck,
      title: "Order Delivery",
      text: "Receive your selected printer products at your preferred address.",
    },
  ];

  const values = [
    {
      icon: BadgeCheck,
      title: "Clear Product Details",
      desc: "We keep listings easy to understand with practical information and clean presentation.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      desc: "A smooth shopping experience with protected checkout and transparent order flow.",
    },
    {
      icon: Heart,
      title: "Customer First",
      desc: "We focus on honest product presentation, simple choices, and a better buying experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO title="About Us | Printer Products and Supplies" />

      {/* Hero */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div className="rounded-[14px] border-2 border-black p-8 md:p-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#d4aa72]" />
                <span className="text-[12px] font-extrabold uppercase tracking-[0.25em] text-[#d4aa72]">
                  About Our Store
                </span>
              </div>

              <h1 className="text-[30px] md:text-[50px] 2xl:text-[60px] font-extrabold leading-[0.95] tracking-tight">
                Simple Shopping for Printer Products
              </h1>

              <p className="mt-6 text-[16px] md:text-[18px] text-gray-600 leading-relaxed max-w-[680px]">
                We built our store to make printer shopping easier, cleaner, and
                more practical. From printers to ink, toner, and accessories,
                every section is arranged to help customers browse useful
                products without confusion.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 h-[48px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
                >
                  Explore Catalog <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 h-[48px] px-8 rounded-full border-2 border-black text-black text-[13px] font-bold hover:bg-black hover:text-white transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative rounded-[14px] bg-[#f1f1f1] min-h-[430px] overflow-hidden flex items-center justify-center p-0">
              <img
                src="/about/main_about.avif"
                alt="Printer products"
                className="w-full max-h-full object-cover"
              />

            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="w-full bg-white py-14">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[34px] md:text-[42px] font-extrabold">
              What We Offer
            </h2>
            <p className="mt-2 text-[14px] text-gray-500">
              A focused collection made for everyday printing requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group bg-[#f7f7f7] rounded-[22px] p-8 border border-gray-100 hover:border-black transition"
                >
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6">
                    <Icon size={26} className="text-black" />
                  </div>
                  <h3 className="text-[20px] font-extrabold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
            <div className="rounded-[12px] border-2 border-black p-8 h-fit">
              <Sparkles size={26} className="text-[#d4aa72] mb-5" />
              <h2 className="text-[30px] font-extrabold leading-tight">
                Why We Started
              </h2>
              <p className="mt-4 text-[14px] text-gray-500 leading-relaxed">
                Printer buying can feel scattered when product details are hard
                to compare. Our goal is to keep things organized, direct, and
                easy to browse.
              </p>
            </div>

            <div className="bg-[#f1f1f1] rounded-[12px] p-8 md:p-12">
              <h3 className="text-[32px] md:text-[42px] font-extrabold leading-tight mb-6">
                A cleaner way to browse printer products.
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[15px] text-gray-600 leading-relaxed">
                <p>
                  We focus on useful printer products for homes, offices, and
                  daily workspaces. Our catalog is arranged around common needs,
                  so customers can move from category to product without feeling
                  overwhelmed.
                </p>

                <p>
                  Every section is built with clarity in mind: simple product
                  names, visible pricing, helpful categories, and a smooth route
                  from browsing to checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[34px] md:text-[42px] font-extrabold">
              How Shopping Works
            </h2>
            <p className="mt-2 text-[14px] text-gray-500">
              Simple steps from product discovery to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-[22px] bg-[#f7f7f7] p-7 border border-gray-100"
                >
                  <span className="absolute top-6 right-6 text-[28px] font-extrabold text-gray-200">
                    0{index + 1}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                    <Icon size={23} className="text-black" />
                  </div>
                  <h3 className="text-[17px] font-extrabold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-white py-16">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[22px] p-7 bg-[#f7f7f7] border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-5">
                      <Icon size={23} />
                    </div>
                    <h3 className="font-extrabold text-[16px] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[12px] bg-black text-white p-9">
              <Globe size={28} className="text-[#d4aa72] mb-6" />
              <h2 className="text-[32px] font-extrabold leading-tight">
                Built for simple online shopping.
              </h2>
              <p className="mt-5 text-[15px] text-gray-300 leading-relaxed">
                Our store is designed for customers who want a straightforward
                way to find printer products, review details, and place orders
                without unnecessary complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Authority Section */}
      <section className="w-full bg-[#f9f9f9] py-20 border-t border-gray-100 hidden">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-[28px] font-extrabold mb-6">Expertise in Imaging Technology</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-medium text-[15px]">
                <p>
                  The Zenvix is managed by a group of industry professionals with specialized experience in document production hardware.
                  Our team's collective knowledge in imaging science and hardware procurement ensures that every machine featured in our
                  store meets high standards of technical excellence and operational reliability.
                </p>
                <p>
                  We focus exclusively on providing a curated selection of professional-grade printers and original imaging supplies.
                  Our commitment to expertise means we provide detailed technical data for every listing, helping both home users
                  and business organizations make informed decisions based on accurate performance specifications.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[22px] border border-gray-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-black mb-6 border-b pb-4">Content Integrity & E-E-A-T</h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#d4aa72] font-bold shrink-0">E</div>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                    <span className="text-black font-extrabold">Experience:</span> Professional history in managing imaging technology and office hardware distribution.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#d4aa72] font-bold shrink-0">E</div>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                    <span className="text-black font-extrabold">Expertise:</span> Technical understanding of inkjet, laser, and thermal printing systems.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#d4aa72] font-bold shrink-0">T</div>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">
                    <span className="text-black font-extrabold">Trustworthiness:</span> High-integrity editorial standards and transparent procurement policies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-[0.2em] mb-2">Author: The Zenvix Editorial Team</p>
            <p className="text-[11px] text-gray-400 italic">Page Last Updated: May 06, 2026</p>
          </div>
        </div>
      </section>


    </div>
  );
}