import React, { useRef, useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDeleteClick, onTogglePublish }) => {
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"];

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll to update active dot
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full animate-fade-in">
      {/* Image container with horizontal scroll */}
      <div className="p-4 flex flex-col items-center justify-center relative bg-[#fafafa]">
        
        <div 
          ref={scrollRef}
          className="w-full h-40 bg-gray-100 rounded-lg flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((imgUrl, idx) => (
            <div key={idx} className="w-full h-full shrink-0 snap-start flex items-center justify-center overflow-hidden">
              <img 
                src={imgUrl} 
                alt={`${product.name || 'Product'} ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Dynamic dots indicator */}
        {images.length > 1 ? (
          <div className="flex space-x-1.5 mt-3">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === activeIndex ? 'bg-[#f97316]' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex space-x-1.5 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h4 className="font-bold text-sm text-gray-900 mb-3 line-clamp-1">{product.name}</h4>
        
        <div className="space-y-2 text-xs text-gray-500 mb-6 flex-1">
          <div className="flex justify-between">
            <span>Product type -</span>
            <span className="font-medium text-gray-800">{product.type || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity Stock -</span>
            <span className="font-medium text-gray-800">{product.quantity || '0'}</span>
          </div>
          <div className="flex justify-between">
            <span>MRP -</span>
            <span className="font-medium text-gray-800">₹ {product.mrp || '0'}</span>
          </div>
          <div className="flex justify-between">
            <span>Selling Price -</span>
            <span className="font-medium text-gray-800">₹ {product.price || '0'}</span>
          </div>
          <div className="flex justify-between">
            <span>Brand Name -</span>
            <span className="font-medium text-gray-800 line-clamp-1 text-right max-w-[120px]">{product.brand || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Number of images -</span>
            <span className="font-medium text-gray-800">{images.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Exchange Eligibility -</span>
            <span className="font-medium text-gray-800 uppercase">{product.exchange || 'YES'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-auto">
          <button 
            onClick={() => onTogglePublish(product.id)}
            className={`flex-1 text-white text-xs font-semibold py-2 rounded-md transition-colors ${
              product.published ? 'bg-[#3bb800] hover:bg-[#2e8f00]' : 'bg-[#0D1B7E] hover:bg-[#0A1560]'
            }`}
          >
            {product.published ? 'Unpublish' : 'Publish'}
          </button>
          <button 
            onClick={() => onEdit(product)}
            className="flex-1 border border-gray-300 text-gray-700 text-xs font-semibold py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDeleteClick(product)}
            className="border border-gray-300 text-gray-400 p-2 rounded-md hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default ProductCard;
