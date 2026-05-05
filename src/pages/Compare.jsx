import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { X, ShoppingCart, ArrowLeft, Info } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

export default function Compare() {
  const { compare, removeFromCompare, addToCart } = useCart();

  const parseImages = (imageStr) => {
    try {
      const images = JSON.parse(imageStr || '[]');
      return images.length > 0 ? `/${images[0].replace(/\\/g, '/')}` : '/logo/fabicon.avif';
    } catch {
      return '/logo/fabicon.avif';
    }
  };

  if (compare.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Info className="text-slate-400" size={40} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Comparison list is empty</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          You haven't added any products to compare yet. Add some products to see their features side by side.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#2f5cab] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#264f97] transition-all transform hover:scale-105"
        >
          <ArrowLeft size={18} />
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Product Comparison</h1>
        <p className="text-slate-500 mt-2">Compare features and specifications of your selected products.</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse bg-white rounded-xl shadow-sm border border-slate-200">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="w-1/4 p-6 text-left text-sm font-bold text-slate-500  tracking-wider">Features</th>
                {compare.map((product) => (
                  <th key={product.id} className="p-6 relative group border-l border-slate-200 min-w-[200px]">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label={`Remove ${product.name} from comparison`}
                      title="Remove from compare"
                    >
                      <X size={14} />
                    </button>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 mb-4 p-2 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                        <img
                          src={parseImages(product.images)}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-800 line-clamp-2 min-h-[40px] mb-2">
                        {product.name}
                      </h3>
                      <div className="text-lg font-black text-[#2f5cab] mb-4">
                        ${parseFloat(product.price).toLocaleString()}
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-[#2f5cab] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#234d98] transition-colors w-full justify-center"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-6 font-semibold text-slate-700 bg-slate-50/50">Availability</td>
                {compare.map((product) => (
                  <td key={product.id} className="p-6 text-center border-l border-slate-100">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 font-semibold text-slate-700 bg-slate-50/50">Brand</td>
                {compare.map((product) => (
                  <td key={product.id} className="p-6 text-center text-slate-600 border-l border-slate-100">
                    {product.brand_name || 'Generic'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 font-semibold text-slate-700 bg-slate-50/50">Category</td>
                {compare.map((product) => (
                  <td key={product.id} className="p-6 text-center text-slate-600 border-l border-slate-100">
                    {product.category_name || 'Printers'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 font-semibold text-slate-700 bg-slate-50/50 align-top">Description</td>
                {compare.map((product) => (
                  <td key={product.id} className="p-6 text-sm text-slate-500 border-l border-slate-100 leading-relaxed">
                    <div className="line-clamp-6">
                      {product.description || 'No description available for this product.'}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
