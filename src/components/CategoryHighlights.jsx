import React from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        name: "Inkjet Printers",
        base: "/banner/category-imges/inkjet-printers",
        link: "/shop?category=inkjet-printers",
    },
    {
        name: "Laser Printers",
        base: "/banner/category-imges/laser-printers",
        link: "/shop?category=laser-printers",
    },
    {
        name: "Large Format",
        base: "/banner/category-imges/large-format-printers",
        link: "/shop?category=large-format-printers",
    },
    {
        name: "Supertank Printers",
        base: "/banner/category-imges/supertank-printers",
        link: "/shop?category=supertank-printers",
    },
    {
        name: "Printer Accessories",
        base: "/banner/category-imges/printer-accessories",
        link: "/shop?category=printer-accessories",
    },
];

export default function CategoryHighlights() {
    return (
        <section className="w-full bg-white py-0">
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-[36px] font-semibold text-black">
                        Category Highlights
                    </h2>
                    <p className="text-[14px] text-gray-500 mt-3">
                        Explore our premium printer collection designed for home and office use.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
                    {categories.map((cat, index) => (
                        <Link
                            key={index}
                            to={cat.link}
                            className="relative h-[550px] rounded-[18px] overflow-hidden group cursor-pointer block bg-gray-100"
                        >
                            <picture>
                                <source 
                                    srcSet={`${cat.base}_thumb.avif 300w, ${cat.base}_med.avif 600w`} 
                                    sizes="(max-width: 640px) 300px, 600px"
                                    type="image/avif" 
                                />
                                <source 
                                    srcSet={`${cat.base}_thumb.webp 300w, ${cat.base}_med.webp 600w`} 
                                    sizes="(max-width: 640px) 300px, 600px"
                                    type="image/webp" 
                                />
                                <img
                                    src={`${cat.base}_med.avif`}
                                    alt={cat.name}
                                    width="413"
                                    height="689"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            </picture>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-[20px] font-semibold">{cat.name}</h3>
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