import React from 'react';

const SEOTextSection = () => {
    return (
        <section className="bg-white py-16 md:py-24 border-t border-slate-100 hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                            Premier Destination for Professional <span className="text-[#05718A]">Imaging Hardware</span>
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed font-medium text-[15px] md:text-[16px]">
                            <p>
                                At The Zenvix, we pride ourselves on being a specialized retailer for high-performance
                                printing machines and professional office equipment. Our curated selection encompasses
                                a wide array of document production tools, from efficient inkjet systems for personal
                                workspaces to robust laser-based units for enterprise-level demands.
                            </p>
                            <p>
                                We understand that reliability is paramount when it comes to business hardware. That is
                                why every device in our inventory is selected for its technological excellence and
                                consistent output quality. By focusing on verified hardware from industry leaders,
                                we ensure that our customers receive only the most dependable imaging solutions
                                available in the market today.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Quality Genuine Supplies</h3>
                            <p className="text-slate-600 leading-relaxed font-medium text-[15px]">
                                Beyond our primary hardware collection, we provide an extensive range of authentic
                                supplies to maintain your imaging workflow. Our inventory includes high-capacity
                                toner cartridges, premium ink units, and essential maintenance kits, all designed
                                to work seamlessly with your specific hardware model for optimal results.
                            </p>
                        </div>

                        <div className="space-y-4 text-slate-600 leading-relaxed font-medium text-[15px]">
                            <p>
                                Choosing the right document hardware can be complex, which is why our platform
                                provides comprehensive technical data and clear product categories. We aim to
                                simplify the procurement process for both individual buyers and professional
                                organizations, offering a straightforward path to acquiring the latest
                                imaging technology with confidence.
                            </p>
                            <p>
                                Our commitment extends beyond the point of sale. We offer efficient nationwide
                                shipping and ensure that all equipment is protected by standard manufacturer
                                warranties. At The Zenvix, your professional productivity is our priority, and
                                we are here to provide the tools you need to succeed in every printing task.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SEOTextSection;
