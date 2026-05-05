import React from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  BadgeCheck,
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";

// Using .avif versions which are already available
import leftPrinterImg from "/about/main_about.avif";
import rightPrinterImg from "/about/main_about.avif";

export default function AboutSection() {
  const features = [
    {
      icon: <CheckCircle2 size={22} className="text-[#05718A]" />,
      title: "Quality Performance",
      desc: "Every printer is tested for clean, sharp results."
    },
    {
      icon: <Clock size={22} className="text-[#05718A]" />,
      title: "Fast Setup",
      desc: "Easy installation so you can start printing right away."
    },
    {
      icon: <ShieldCheck size={22} className="text-[#05718A]" />,
      title: "Official Warranty",
      desc: "Full brand warranty and dedicated support for every unit."
    },
    {
      icon: <Headphones size={22} className="text-[#05718A]" />,
      title: "Expert Support",
      desc: "Our technical team is always here to help with your queries."
    }
  ];

  return (
    <section className="w-full bg-[#fff] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-4 md:px-8 relative">
        <div className="absolute top-0 left-5 w-24 h-20 md:w-20 md:h-20 bg-blue-100 rounded-full blur-[40px] opacity-40" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
          {/* LEFT SIDE */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <div className="overflow-hidden rounded-[32px] shadow-2xl shadow-slate-200/50">
              <div className="overflow-hidden max-w-full">
                <img
                  src={leftPrinterImg}
                  alt="Premium printer setup"
                  className="w-full h-[320px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="pt-8 px-1 text-center lg:text-left">
              <p className="text-[15px] md:text-[17px] leading-relaxed text-slate-600 max-w-[700px] font-medium">
                We offer dependable printer solutions for home, office, and
                business use. From compact everyday printers to performance-ready
                machines, our collection is built for smooth output and easier workflow.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center mt-8 bg-slate-900 hover:bg-[#05718A] text-white text-xs md:text-[14px] font-bold uppercase tracking-widest px-10 py-4 rounded-xl transition-all shadow-xl shadow-slate-200"
              >
                Explore Collection
              </Link>
            </div>
          </m.div>

          {/* CENTER STAR - Hidden on mobile/tablet */}
          <div className="hidden xl:flex lg:col-span-1 justify-center pt-[200px]">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 flex items-center justify-center text-[#05718A] text-[120px] leading-none opacity-20">
                ✦
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-7 xl:col-span-6"
          >
            <div className="max-w-[800px] lg:ml-auto">
              <div className="mb-10 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-8 h-[2px] bg-[#05718A]"></div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-widest text-[#05718A] uppercase leading-none">
                    About The Zenvix
                  </h2>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                  Quality Printing for Every Need
                </h3>
                <p className="text-[15px] md:text-[17px] leading-relaxed text-slate-600 max-w-[700px] mx-auto lg:mx-0 font-medium">
                  Discover premium printers and accessories designed for reliable
                  performance, clean print quality, and smooth daily productivity.
                  Whether for work or personal use, we make printer shopping simple.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-8 w-full">
                  {features.map((item, idx) => (
                    <div key={idx} className="flex gap-5 group">
                      <div className="w-14 h-14 shrink-0 bg-blue-50 group-hover:bg-[#05718A] group-hover:text-white transition-colors rounded-2xl flex items-center justify-center">
                        {React.cloneElement(item.icon, { className: "group-hover:text-white transition-colors" })}
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">{item.title}</h3>
                        <p className="text-[13px] text-slate-500 mt-1 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[32px] overflow-hidden shrink-0 w-full md:w-[320px] lg:w-[350px] shadow-2xl shadow-slate-200/50">
                  <img
                    src={rightPrinterImg}
                    alt="Printer product display"
                    className="w-full h-[330px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
