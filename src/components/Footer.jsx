import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import API_BASE_URL from "../config";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const printers = data.data.find(
            (cat) => cat.slug === "printers" || cat.id === 46
          );

          if (printers?.children) {
            setCategories(printers.children.slice(0, 5));
          }
        }
      })
      .catch(() => { });
  }, []);

  return (
    <footer className="bg-white border-t border-black pt-20">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="rounded-[14px] border-2 border-black p-8 md:p-12 mb-16 text-center">
          <h2 className="text-[30px] md:text-[40px] font-extrabold text-black">
            Explore Printer Products
          </h2>

          <p className="mt-3 text-gray-500">
            Browse printers, ink, toner, and accessories in one place.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 h-[48px] px-8 rounded-full bg-black text-white text-[13px] font-bold hover:bg-[#d4aa72] transition"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          <div>
            <Link to="/">
              <img src="/logo/logo.avif" alt="Logo" className="h-10 mb-6" />
            </Link>

            <p className="text-[14px] text-gray-500 leading-relaxed">
              A simple online store for printers, ink, toner, and everyday
              printing products. Everything organized for easy browsing.
            </p>
          </div>

          <div>
            <h4 className="text-[14px] font-extrabold mb-6 uppercase text-black">
              Company
            </h4>

            <div className="space-y-3 text-[14px] text-gray-500">
              <Link to="/" className="block hover:text-[#d4aa72] transition">
                Home
              </Link>
              <Link to="/about" className="block hover:text-[#d4aa72] transition">
                About Us
              </Link>
              <Link to="/contact" className="block hover:text-[#d4aa72] transition">
                Contact
              </Link>
              <Link to="/shop" className="block hover:text-[#d4aa72] transition">
                Shop
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-extrabold mb-6 uppercase text-black">
              Products
            </h4>

            <div className="space-y-3 text-[14px] text-gray-500">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="block hover:text-[#d4aa72] transition"
                >
                  {cat.name}
                </Link>
              ))}

              {categories.length === 0 && (
                <Link to="/shop" className="block hover:text-[#d4aa72] transition">
                  All Printers
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-extrabold mb-6 uppercase text-black">
              Policies
            </h4>

            <div className="space-y-3 text-[14px] text-gray-500">
              <Link
                to="/shipping-policy"
                className="block hover:text-[#d4aa72] transition"
              >
                Shipping Policy
              </Link>
              <Link
                to="/return-policy"
                className="block hover:text-[#d4aa72] transition"
              >
                Return Policy
              </Link>
              <Link
                to="/privacy-policy"
                className="block hover:text-[#d4aa72] transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="block hover:text-[#d4aa72] transition"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/editorial-policy"
                className="block hover:text-[#d4aa72] transition"
              >
                Editorial Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-extrabold mb-6 uppercase text-black">
              Contact
            </h4>

            <div className="flex items-center gap-3 text-[14px] text-gray-500">
              <Mail size={18} className="shrink-0 text-[#d4aa72]" />
              <a
                href="mailto:info@thezenvix.co"
                className="hover:text-[#d4aa72] transition break-all"
              >
                info@thezenvix.co
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-500">
          <p>© {new Date().getFullYear()} The Zenvix. All rights reserved.</p>


          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/shipping-policy" className="hover:text-[#d4aa72] transition">
              Shipping
            </Link>
            <Link to="/return-policy" className="hover:text-[#d4aa72] transition">
              Returns
            </Link>
            <Link to="/privacy-policy" className="hover:text-[#d4aa72] transition">
              Privacy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="hover:text-[#d4aa72] transition"
            >
              Terms
            </Link>
          </div>
        </div>

        <div className="pb-12 text-[12px] text-gray-400 leading-relaxed max-w-[1200px] mx-auto text-center border-t border-slate-100 pt-8 mt-4">
          <p>
            Welcome to our online store, your destination for quality printers and high-quality refills. We offer a wide range of devices, from simple home models to efficient machines for business use. Our collection includes inkjet and laser options, along with all the ink and toner you need to keep them running smoothly. We are committed to providing reliable products and fast shipping across the country.
          </p>
        </div>
      </div>
    </footer>
  );
}