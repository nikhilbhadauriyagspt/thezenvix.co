import React from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        name: "Inkjet Printers",
        image: "/banner/category-imges/inkjet-printers.png",
        link: "/shop?category=inkjet-printers",
    },
    {
        name: "Laser Printers",
        image: "/banner/category-imges/laser-printers.png",
        link: "/shop?category=laser-printers",
    },
    {
        name: "Large Format",
        image: "/banner/category-imges/large-format-printers.png",
        link: "/shop?category=large-format-printers",
    },
    {
        name: "Supertank Printers",
        image: "/banner/category-imges/supertank-printers.png",
        link: "/shop?category=supertank-printers",
    },
    {
        name: "Printer Accessories",
        image: "/banner/category-imges/printer-accessories.png",
        link: "/shop?category=printer-accessories",
    },
];



export default function CategoryHighlights() {
    return (
        <section className="w-full bg-[#fff] py-0 ">
            <div className="max-w-[1800px] mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-[36px] font-semibold text-black">
                        Category Highlights
                    </h2>
                    <p className="text-[14px] text-gray-500 mt-3">
                        Explore our premium printer collection designed for home and office use.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 gap-6">

                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            to={cat.link}
                            className="relative h-[550px] rounded-[18px] overflow-hidden group cursor-pointer block"
                        >
                            {/* Image */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-[20px] font-semibold">
                                    {cat.name}
                                </h3>

                                <p className="text-[13px] text-white/80 mt-1">
                                    Explore high-quality printing solutions.
                                </p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}