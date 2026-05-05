import React, { useMemo } from "react";
import Hero from "@/components/Hero";
import CategoryCarousel from "@/components/CategoryCarousel";
import MidBannersRow from "@/components/MidBannersRow";
import AboutSection from "@/components/AboutSection";
import SEO from "@/components/SEO";
import ProductGrid from "@/components/ProductGrid";
import HowToBuy from "@/components/HowToBuy";
import { useGlobalData } from "../context/DataContext";
import PremiumProductGrid from "@/components/PremiumProductGrid";
import CategoryHighlights from "@/components/CategoryHighlights";
import BundleSaveSection from "@/components/BundleSaveSection";
import SEOTextSection from "@/components/SEOTextSection";

import Mainsecimg from "/midbanner/images-7.avif";

export default function Home() {
  const { categories, featuredProducts, loading } = useGlobalData();

  const processedData = useMemo(() => {
    const all = featuredProducts.filter(p =>
      !p.name.toLowerCase().includes('laptop') &&
      !p.name.toLowerCase().includes('macbook') &&
      !p.name.toLowerCase().includes('notebook')
    );

    const printers = all.filter(p =>
      p.name.toLowerCase().includes('printer') ||
      p.name.toLowerCase().includes('laserjet') ||
      p.name.toLowerCase().includes('pixma')
    );

    const printerParent = categories.find(cat => cat.slug === 'printers' || cat.id === 46);
    const categoriesToDisplay = printerParent?.children || categories.filter(c => !c.name.toLowerCase().includes('laptop'));

    return { all, printers, categoriesToDisplay };
  }, [categories, featuredProducts]);

  return (
    <div className="bg-[#f5f5f5] font-sans text-slate-900">
      <SEO
        title="The Zenvix | High-Performance Printing Solutions"
        description="Discover a wide range of high-performance printers, premium ink, and toner cartridges at The Zenvix. We provide professional business printing solutions with fast nationwide shipping."
        keywords="Buy Printers Online, Ink and Toner, LaserJet, OfficeJet, Printer Accessories, Business Printing Solutions"
      />
      <Hero products={processedData.all} />

      <CategoryHighlights />
      <PremiumProductGrid
        products={processedData.printers}
        title="Best Selling Printers"
        loading={loading}
      />
      <CategoryCarousel categories={processedData.categoriesToDisplay} loading={loading} />



      <BundleSaveSection products={processedData.printers} loading={loading} />

      <MidBannersRow />

      <ProductGrid
        products={processedData.all}
        loading={loading}
      />

      <AboutSection className="hidden" />
      <SEOTextSection className="hidden" />

    </div>
  );
}
