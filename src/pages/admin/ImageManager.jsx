import React, { useState, useEffect } from 'react';
import { Image, CheckCircle2, AlertCircle, Loader2, RefreshCw, Filter } from 'lucide-react';

export default function ImageManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const toggleSelect = (img) => {
    if (selectedImages.find(i => i.path === img.path)) {
      setSelectedImages(selectedImages.filter(i => i.path !== img.path));
    } else {
      setSelectedImages([...selectedImages, img]);
    }
  };

  const handleConvert = async () => {
    if (selectedImages.length === 0) return;
    setConverting(true);
    try {
      const res = await fetch('/api/convert-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: selectedImages })
      });
      if (res.ok) {
        alert('Images converted successfully!');
        setSelectedImages([]);
        fetchImages();
      } else {
        alert('Failed to convert images.');
      }
    } catch (err) {
      console.error('Conversion error:', err);
    } finally {
      setConverting(false);
    }
  };

  const filteredImages = images.filter(img => {
    if (filter === 'pending') return !img.hasWebp || !img.hasAvif;
    if (filter === 'completed') return img.hasWebp && img.hasAvif;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Image Manager</h1>
          <p className="text-slate-500">Convert project images to WebP and AVIF formats.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchImages}
            disabled={loading || converting}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            title="Refresh list"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <button
            onClick={handleConvert}
            disabled={selectedImages.length === 0 || converting}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
              selectedImages.length > 0 
                ? 'bg-[#0096d6] text-white shadow-lg shadow-[#0096d6]/20' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {converting ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
            {converting ? 'Converting...' : `Convert ${selectedImages.length} Selected`}
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 text-slate-500 mr-2">
          <Filter size={18} />
          <span className="text-sm font-semibold">Filter:</span>
        </div>
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              filter === f 
                ? 'bg-blue-50 text-[#0096d6]' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="ml-auto text-xs font-bold text-slate-400">
          Showing {filteredImages.length} of {images.length} images
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <Loader2 size={40} className="text-[#0096d6] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Scanning project folders...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((img, idx) => {
            const isSelected = selectedImages.find(i => i.path === img.path);
            const isFullyOptimized = img.hasWebp && img.hasAvif;
            
            return (
              <div 
                key={idx}
                onClick={() => toggleSelect(img)}
                className={`group relative bg-white rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                  isSelected ? 'border-[#0096d6] ring-2 ring-blue-100' : 'border-slate-100'
                }`}
              >
                <div className="aspect-video w-full rounded-t-2xl overflow-hidden bg-slate-50 relative">
                  <img 
                    src={img.path} 
                    alt={img.name} 
                    className="w-full h-full object-contain"
                  />
                  {isFullyOptimized && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-sm">
                      <CheckCircle2 size={14} />
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                      <div className="bg-[#0096d6] text-white p-2 rounded-full">
                        <CheckCircle2 size={24} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <p className="text-sm font-bold text-slate-900 truncate" title={img.name}>
                    {img.name}
                  </p>
                  <p className="text-xs text-slate-500 mb-3">{img.folder}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge label="WebP" active={img.hasWebp} />
                    <StatusBadge label="AVIF" active={img.hasAvif} />
                    <StatusBadge label="Thumb" active={img.hasThumb} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredImages.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl">
          <Image size={48} className="text-slate-200 mb-4" />
          <p className="text-slate-500 font-medium">No images found for this filter.</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ label, active }) {
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider ${
      active ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-400'
    }`}>
      {label}
    </span>
  );
}
